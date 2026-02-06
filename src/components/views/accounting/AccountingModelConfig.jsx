import React, { useState, useMemo } from 'react';
// 1. 导入刚才修复的组件 (路径要对)
import L3AdvancedTree from './components/L3AdvancedTree';
import { L3DetailPanel } from './components/L3DetailPanel';

// 2. 内置测试数据 (Mock Data) - 升级至 v2.0 规范
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
    const [isVersionMode, setIsVersionMode] = useState(false);

    // 递归查找并修改节点
    const updateNodeInTree = (nodes, id, updateFn) => {
        return nodes.map(node => {
            if (node.id === id) return updateFn(node);
            if (node.children) return { ...node, children: updateNodeInTree(node.children, id, updateFn) };
            return node;
        });
    };

    // 1. 添加下级逻辑
    const handleAddChild = (parentId) => {
        const newId = `new_${Date.now()}`;
        setTreeData(prev => updateNodeInTree(prev, parentId, (parent) => {
            // 根据父节点类型决定子节点类型
            let childType = 'process';
            if (parent.type === 'product') childType = 'phase';
            if (parent.type === 'phase') childType = 'module';
            if (parent.type === 'module') childType = 'process';

            const newNode = {
                id: newId,
                name: `新建${childType === 'phase' ? '阶段' : childType === 'module' ? '模块' : '过程'}`,
                type: childType,
                origin: 'self',
                status: 'normal',
                calc_status: childType === 'process' ? 'pending' : undefined,
                children: []
            };

            return {
                ...parent,
                children: [...(parent.children || []), newNode]
            };
        }));
        setSelectedId(newId); // 自动选中新节点
    };

    // 2. 重命名逻辑
    const handleRename = (id, newName) => {
        setTreeData(prev => updateNodeInTree(prev, id, (node) => ({ ...node, name: newName })));
    };

    // 3. 删除/屏蔽逻辑
    const handleDelete = (id) => {
        const removeNode = (nodes) => {
            return nodes.filter(node => {
                if (node.id === id) {
                    if (node.origin === 'inherited') {
                        node.status = 'screened'; // 继承节点改为屏蔽
                        return true;
                    }
                    return false; // 自建节点直接删除
                }
                if (node.children) node.children = removeNode(node.children);
                return true;
            });
        };
        setTreeData(prev => removeNode([...prev]));
    };

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
            {/* 主内容区 */}
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