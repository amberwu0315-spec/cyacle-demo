/**
 * AccountingModelConfig - 核算模型配置 (L3主控台)
 * 
 * 🏢 角色：BOM 结构设计师 (BOM Designer)
 * 📝 职责：
 * 1. 管理核心的树状结构 (L3AdvancedTree)。
 * 2. 协调左侧树与右侧详情面板 (L3DetailPanel) 的交互。
 * 3. 处理增删改查、拖拽移动等核心数据操作。
 */
import React, { useState, useMemo, useEffect } from 'react';
// 1. 确保路径正确引入组件
import L3AdvancedTree from './components/L3AdvancedTree';
import { L3DetailPanel } from './components/L3DetailPanel';
import { useNotification } from '../../../context/NotificationContext';
import { ACCOUNTING_COMPARE_TREE_MOCK, ACCOUNTING_CONFIG_TREE_MOCK } from './modelMockData';
import {
    CALC_STATUSES,
    NODE_ORIGINS,
    NODE_STATUSES,
    NODE_TYPES,
    PROCESS_SUB_TYPES,
    canDropNode,
    getChildType,
    shouldDeletePhysically
} from './modelRules';

export default function AccountingModelConfig({ menuMode = 'config', onSnapshotChange = null }) {
    const { addNotification } = useNotification();
    const initialTree = menuMode === 'compare' ? ACCOUNTING_COMPARE_TREE_MOCK : ACCOUNTING_CONFIG_TREE_MOCK;
    const [treeData, setTreeData] = useState(initialTree);
    const [selectedId, setSelectedId] = useState(initialTree[0]?.id || null);

    useEffect(() => {
        const nextTree = menuMode === 'compare' ? ACCOUNTING_COMPARE_TREE_MOCK : ACCOUNTING_CONFIG_TREE_MOCK;
        setTreeData(nextTree);
        setSelectedId(nextTree[0]?.id || null);
    }, [menuMode]);

    // 辅助工具：深度克隆数据 (用于安全的 State 更新)
    const cloneData = (data) => JSON.parse(JSON.stringify(data));
    const makeNodeId = () => `new_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const findNodeById = (nodes, id) => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children?.length) {
                const found = findNodeById(node.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    const hasDescendant = (node, childId) => {
        if (!node?.children?.length) return false;
        for (const child of node.children) {
            if (child.id === childId) return true;
            if (hasDescendant(child, childId)) return true;
        }
        return false;
    };

    // ----------------------------------------------------------------
    // 1. 添加下级逻辑
    // ----------------------------------------------------------------
    const handleAddChild = (parentId) => {
        const newData = cloneData(treeData);

        const findAndAdd = (nodes) => {
            for (let node of nodes) {
                if (node.id === parentId) {
                    // 只有非 Process 节点才能添加子级
                    if (node.type === NODE_TYPES.PROCESS) return false;

                    // 根据父级类型自动决定子级类型
                    const childType = getChildType(node.type);
                    if (!childType) return false;

                    const newNode = {
                        id: makeNodeId(),
                        name: `新建${childType === NODE_TYPES.PHASE ? '阶段' : childType === NODE_TYPES.MODULE ? '模块' : '过程'}`,
                        type: childType,
                        origin: NODE_ORIGINS.SELF,
                        status: NODE_STATUSES.NORMAL,
                        subType: childType === NODE_TYPES.PROCESS ? PROCESS_SUB_TYPES.NORMAL : undefined,
                        calc_status: childType === NODE_TYPES.PROCESS ? CALC_STATUSES.PENDING : undefined,
                        hasData: false,
                        children: []
                    };

                    if (!node.children) node.children = [];
                    node.children.push(newNode);
                    node._forceExpand = true;

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
            addNotification('已添加下级节点', 'success');
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
            addNotification('节点已重命名', 'success');
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
                    // 核心规则：继承节点只能屏蔽，自建节点才物理删除
                    if (!shouldDeletePhysically(node)) {
                        node.status = NODE_STATUSES.SCREENED;
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
        addNotification('节点操作已执行', 'success');
    };

    // ----------------------------------------------------------------
    // 4. 拖拽移动逻辑 (核心新增)
    // ----------------------------------------------------------------
    const handleMoveNode = (draggedId, targetId) => {
        if (draggedId === targetId) return;

        const newData = cloneData(treeData);
        const draggedNode = findNodeById(newData, draggedId);
        const targetNode = findNodeById(newData, targetId);
        if (!draggedNode || !targetNode) return;
        if (hasDescendant(draggedNode, targetId)) {
            addNotification('不能把父节点拖进自己的子节点里', 'warning');
            return;
        }
        if (!canDropNode(draggedNode, targetNode)) {
            addNotification('当前拖拽不符合规则', 'warning');
            return;
        }

        // Step A: 找到并暂时移除被拖拽的节点
        const removeDragged = (nodes) => {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === draggedId) {
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
                addNotification('节点已移动', 'success');
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

    useEffect(() => {
        if (!onSnapshotChange) {
            return;
        }
        onSnapshotChange({
            menuMode,
            selectedId,
            treeData: JSON.parse(JSON.stringify(treeData))
        });
    }, [menuMode, selectedId, treeData, onSnapshotChange]);

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
