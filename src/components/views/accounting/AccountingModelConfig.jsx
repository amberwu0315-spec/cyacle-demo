import React, { useState, useMemo } from 'react';
// 1. 确保路径正确引入组件
import L3AdvancedTree from './components/L3AdvancedTree';
import { L3DetailPanel } from './components/L3DetailPanel';

// 2. 内置测试数据 (Mock Data) - v2.0 规范
const MOCK_DATA = [
    {
        id: 'root',
        name: '碳纤维反重力飞行器',
        type: 'product',
        origin: 'self',
        status: 'normal',
        hasData: true,
        children: [
            {
                id: 'phase_1',
                name: '原材料获取',
                type: 'phase',
                origin: 'inherited',
                status: 'normal',
                is_changed: false,
                hasData: true,
                children: [
                    {
                        id: 'mod_1',
                        name: '复合材料模块',
                        type: 'module',
                        origin: 'inherited',
                        status: 'normal',
                        is_changed: true,
                        hasData: true,
                        children: [
                            {
                                id: 'proc_1',
                                name: '预浸料生产',
                                type: 'process',
                                origin: 'inherited',
                                status: 'normal',
                                calc_status: 'done',
                                value: 45.00
                            },
                            {
                                id: 'mod_metal',
                                name: '过期金属模块',
                                type: 'module',
                                origin: 'inherited',
                                status: 'excluded',
                                is_changed: false
                            }
                        ]
                    }
                ]
            },
            {
                id: 'phase_2',
                name: '生产制造 (自建阶段)',
                type: 'phase',
                origin: 'self',
                status: 'normal',
                children: []
            }
        ]
    }
];

export default function AccountingModelConfig() {
    const [treeData, setTreeData] = useState(MOCK_DATA);
    const [selectedId, setSelectedId] = useState('root');

    // 辅助工具：深度克隆数据 (用于安全的 State 更新)
    const cloneData = (data) => JSON.parse(JSON.stringify(data));

    // ----------------------------------------------------------------
    // 1. 添加下级逻辑
    // ----------------------------------------------------------------
    const handleAddChild = (parentId) => {
        const newData = cloneData(treeData);

        const findAndAdd = (nodes) => {
            for (let node of nodes) {
                if (node.id === parentId) {
                    // 只有非 Process 节点才能添加子级
                    if (node.type === 'process') return false;

                    // 根据父级类型自动决定子级类型
                    let childType = 'process';
                    if (node.type === 'product') childType = 'phase';
                    if (node.type === 'phase') childType = 'module';
                    if (node.type === 'module') childType = 'process';

                    const newNode = {
                        id: `new_${Date.now()}`,
                        name: `新建${childType === 'phase' ? '阶段' : childType === 'module' ? '模块' : '过程'}`,
                        type: childType,
                        origin: 'self',
                        status: 'normal',
                        calc_status: childType === 'process' ? 'pending' : undefined,
                        children: []
                    };

                    if (!node.children) node.children = [];
                    node.children.push(newNode);

                    // 自动选中新节点
                    setSelectedId(newNode.id);
                    return true;
                }
                if (node.children && findAndAdd(node.children)) return true;
            }
            return false;
        };

        if (findAndAdd(newData)) {
            setTreeData(newData);
        }
    };

    // ----------------------------------------------------------------
    // 2. 重命名逻辑
    // ----------------------------------------------------------------
    const handleRename = (id, newName) => {
        const newData = cloneData(treeData);
        const updateName = (nodes) => {
            for (let node of nodes) {
                if (node.id === id) {
                    node.name = newName;
                    return true;
                }
                if (node.children && updateName(node.children)) return true;
            }
            return false;
        };

        if (updateName(newData)) {
            setTreeData(newData);
        }
    };

    // ----------------------------------------------------------------
    // 3. 删除/屏蔽逻辑
    // ----------------------------------------------------------------
    const handleDelete = (id) => {
        const newData = cloneData(treeData);

        const processDelete = (nodes) => {
            return nodes.filter(node => {
                if (node.id === id) {
                    // 核心规则：继承节点(inherited)只能屏蔽，不能物理删除
                    if (node.origin === 'inherited') {
                        node.status = 'screened';
                        return true; // 保留节点，但状态变更为 screened
                    }
                    return false; // 自建节点(self)直接移除
                }
                if (node.children) {
                    node.children = processDelete(node.children);
                }
                return true;
            });
        };

        setTreeData(processDelete(newData));
    };

    // ----------------------------------------------------------------
    // 4. 拖拽移动逻辑 (核心新增)
    // ----------------------------------------------------------------
    const handleMoveNode = (draggedId, targetId) => {
        if (draggedId === targetId) return;

        const newData = cloneData(treeData);
        let draggedNode = null;

        // Step A: 找到并暂时移除被拖拽的节点
        const removeDragged = (nodes) => {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === draggedId) {
                    draggedNode = nodes[i];
                    nodes.splice(i, 1); // 移除
                    return true;
                }
                if (nodes[i].children && removeDragged(nodes[i].children)) return true;
            }
            return false;
        };

        // Step B: 将节点插入到目标节点内部
        const insertToTarget = (nodes) => {
            for (let node of nodes) {
                if (node.id === targetId) {
                    // 简单校验：Process不能作为容器
                    if (node.type === 'process') return false;

                    if (!node.children) node.children = [];
                    node.children.push(draggedNode);
                    return true;
                }
                if (node.children && insertToTarget(node.children)) return true;
            }
            return false;
        };

        // 执行移动操作
        if (removeDragged(newData)) {
            if (insertToTarget(newData)) {
                setTreeData(newData); // 只有成功移动才更新状态
            }
        }
    };

    // ----------------------------------------------------------------
    // 计算当前选中节点 (用于传给右侧详情面板)
    // ----------------------------------------------------------------
    const selectedNode = useMemo(() => {
        const findNode = (nodes) => {
            for (const node of nodes) {
                if (node.id === selectedId) return node;
                if (node.children) {
                    const found = findNode(node.children);
                    if (found) return found;
                }
            }
            return null;
        };
        return findNode(treeData);
    }, [treeData, selectedId]);

    return (
        <div className="flex flex-col h-full bg-[#f8fafc]">
            {/* 主内容区 Layout-A (左侧树 + 右侧内容) */}
            <div className="flex-1 flex overflow-hidden p-3 gap-3">
                {/* 左侧树：占 1/4 宽度 */}
                <div className="w-1/4 min-w-[300px] flex flex-col h-full overflow-hidden">
                    <L3AdvancedTree
                        data={treeData}
                        selectedId={selectedId}
                        onSelect={(node) => setSelectedId(node.id)}
                        onAddChild={handleAddChild}
                        onRename={handleRename}
                        onDelete={handleDelete}
                        onMoveNode={handleMoveNode} // 传入拖拽处理函数
                    />
                </div>

                {/* 右侧面板：占 3/4 宽度 */}
                <div className="flex-1 h-full overflow-hidden flex flex-col">
                    <L3DetailPanel node={selectedNode} />
                </div>
            </div>
        </div>
    );
}