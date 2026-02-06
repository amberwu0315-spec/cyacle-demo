import React, { memo, useMemo, useState, useEffect } from 'react';
import {
    IconPackage,
    IconPlayerPause,
    IconLayoutGrid,
    IconBox,
    IconLink,
    IconCircleOff,
    IconLayersIntersect,
    IconGitBranch,
    IconPlus,
    IconDots,
    IconSearch,
    IconTrash,
    IconEdit,
    IconRefresh,
    IconTriangleFilled
} from '@tabler/icons-react';

// 1. 样式映射 (v2.0 精细化状态)
const TEXT_STYLE_MAP = {
    normal: 'text-gray-900',
    screened: 'text-gray-400',
    excluded: 'text-gray-400 line-through',
    added: 'text-gray-900',
    modified: 'text-gray-900'
};

// 2. 权限校验辅助
const canRename = (node) => node?.origin === 'self';
const canReset = (node) => node?.origin === 'inherited' && node?.is_changed;

// 3. 百分比仪表盘组件 (v2.0)
const PercentageBadge = ({ node }) => {
    if (!node || node.type !== 'process' || node.subType === 'split_ref' || ['screened', 'excluded'].includes(node.status)) {
        return null;
    }

    const statusMap = {
        pending: { style: 'bg-yellow-100 text-yellow-700', text: '- -%' },
        error: { style: 'bg-red-100 text-red-700', text: '- -%' },
        done: { style: 'bg-blue-100 text-blue-700', text: `${node.value?.toFixed(2)}%` }
    };

    const conf = statusMap[node.calc_status] || statusMap.pending;

    return (
        <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full ${conf.style} shrink-0 group-hover:hidden`}>
            {conf.text}
        </span>
    );
};

// 4. 图标生成逻辑
const getNodeIcon = (node) => {
    if (!node) return () => null;
    const { type, subType, origin, status } = node;
    let BaseIcon = IconBox;
    if (type === 'product') BaseIcon = IconPackage;
    if (type === 'phase') BaseIcon = IconPlayerPause;
    if (type === 'module') BaseIcon = IconLayoutGrid;

    return ({ className, isSelected }) => (
        <div className={`relative flex items-center justify-center ${className}`}>
            <BaseIcon
                className={`w-full h-full ${type === 'phase' ? 'rotate-90' : ''}`}
                stroke={origin === 'inherited' ? 1.5 : 2}
            />
            {subType === 'whole_ref' && (
                <IconLayersIntersect className={`absolute -top-1 -right-1 w-2.5 h-2.5 text-blue-600 ${isSelected ? 'bg-[#087F9C]' : 'bg-white'} rounded-full p-[1px]`} />
            )}
            {subType === 'split_ref' && (
                <IconGitBranch className={`absolute -top-1 -right-1 w-2.5 h-2.5 text-purple-600 ${isSelected ? 'bg-[#087F9C]' : 'bg-white'} rounded-full p-[1px]`} />
            )}
            {origin === 'inherited' && !subType && (
                <IconLink className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 text-gray-400 ${isSelected ? 'bg-[#087F9C]' : 'bg-white'} rounded-full`} />
            )}
            {status === 'screened' && (
                <IconCircleOff className="absolute w-full h-full text-gray-400 opacity-60" />
            )}
        </div>
    );
};

// 5. 上下文菜单组件
const ContextMenu = ({ x, y, node, onClose, onAddChild, onRename, onDelete }) => {
    if (!node) return null;

    const items = [
        { label: '重命名', icon: IconEdit, onClick: () => onRename?.(node.id, 'start'), disabled: !canRename(node) },
        { label: node.origin === 'self' ? '物理删除' : '屏蔽节点', icon: IconTrash, onClick: () => onDelete?.(node.id), danger: node.origin === 'self' },
        { label: '添加下级', icon: IconPlus, onClick: () => onAddChild?.(node.id), disabled: node.type === 'process' },
        { label: '重置更改', icon: IconRefresh, onClick: () => console.log('Reset'), disabled: !canReset(node) },
    ];

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
            <div
                className="fixed z-50 bg-white shadow-xl rounded-lg border border-gray-100 py-1 min-w-[140px] animate-in fade-in zoom-in duration-100"
                style={{ top: y, left: x }}
            >
                {items.map((item, idx) => (
                    <button
                        key={idx}
                        disabled={item.disabled}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors
                            ${item.disabled ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:bg-gray-50'}
                            ${item.danger ? 'text-red-500' : 'text-gray-700'}
                        `}
                        onClick={() => { item.onClick(); onClose(); }}
                    >
                        <item.icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </>
    );
};

// 6. 节点组件
const TreeNode = memo(({ node, level, expandedIds, selectedId, focusPath, onToggle, onSelect, onContextMenu, editingId, onRenameComplete, onMoveNode, onAddChild }) => {
    if (!node) return null;
    const isExpanded = expandedIds?.includes(node.id);
    const isSelected = selectedId === node.id;
    const isEditing = editingId === node.id;
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;

    const IconComponent = useMemo(() => getNodeIcon(node), [node.type, node.subType, node.origin, node.status]);

    // 计算综合样式
    const textStyle = TEXT_STYLE_MAP[node.status] || TEXT_STYLE_MAP.normal;

    const [tempName, setTempName] = useState(node.name);

    useEffect(() => {
        if (isEditing) setTempName(node.name);
    }, [isEditing, node.name]);

    // D&D Logic
    const handleDragStart = (e) => {
        if (node.origin === 'inherited') {
            e.preventDefault();
            return;
        }
        e.dataTransfer.setData('nodeId', node.id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('nodeId');
        if (draggedId && draggedId !== node.id) {
            onMoveNode?.(draggedId, node.id); // 使用透传下来的真实函数
        }
    };

    return (
        <div className="w-full">
            <div
                draggable={node.origin === 'self' && node.type !== 'product'}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`group relative flex items-center h-[36px] cursor-pointer select-none transition-all pr-3 text-sm rounded
                    ${isSelected ? 'bg-[#087F9C] text-white shadow-sm z-10' : `hover:bg-gray-50 ${textStyle}`}
                `}
                style={{
                    paddingLeft: `${node.type === 'product' ? 8 : level * 24 + 12}px`,
                    marginLeft: `${node.type === 'product' ? 8 : (level - 1) * 24 + 27.5}px`,
                    marginRight: '8px'
                }}
                onClick={() => onSelect?.(node)}
                onDoubleClick={() => canRename(node) && onRenameComplete(node.id, 'start')}
                onContextMenu={(e) => { e.preventDefault(); onContextMenu(e, node); }}
            >
                {/* 展开/折叠箭头 */}
                <div
                    className="flex-none w-6 h-6 flex items-center justify-center mr-1 rounded hover:bg-black/5"
                    onClick={(e) => { e.stopPropagation(); node.type !== 'product' && onToggle?.(node.id); }}
                >
                    {node.type !== 'product' && hasChildren && (
                        <IconTriangleFilled
                            className={`w-2.5 h-2.5 opacity-80 transition-transform duration-200 ${isExpanded ? 'rotate-180' : 'rotate-90'}`}
                        />
                    )}
                </div>

                {/* 节点图标 */}
                <div className="w-4 h-4 mr-2 flex-none">
                    <IconComponent className="w-full h-full" isSelected={isSelected} />
                </div>

                {/* 节点名称 / 编辑框 */}
                {isEditing ? (
                    <input
                        autoFocus
                        className="flex-1 bg-white text-gray-900 px-1 py-0.5 rounded border border-blue-400 outline-none text-xs -ml-1 h-6"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onBlur={() => onRenameComplete(node.id, 'save', tempName)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onRenameComplete(node.id, 'save', tempName);
                            if (e.key === 'Escape') onRenameComplete(node.id, 'cancel');
                        }}
                    />
                ) : (
                    <span className="truncate font-medium flex-1">{node.name || '未命名'}</span>
                )}

                {/* 右侧：Badge + 悬停操作 */}
                {!isEditing && (
                    <div className="flex items-center gap-2 ml-auto">
                        <PercentageBadge node={node} />
                        <div className={`hidden group-hover:flex items-center gap-1 ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                            {node.type !== 'process' && (
                                <IconPlus className="w-3.5 h-3.5 hover:text-current translate-y-[0.5px]" onClick={(e) => { e.stopPropagation(); onAddChild?.(node.id); }} />
                            )}
                            <IconDots className="w-3.5 h-3.5 hover:text-current" onClick={(e) => { e.stopPropagation(); onContextMenu(e, node); }} />
                        </div>
                    </div>
                )}
            </div>

            {isExpanded && hasChildren && (
                <div className="w-full relative">
                    {/* 纵向连线 */}
                    <div
                        className="absolute border-l border-gray-100 z-20 pointer-events-none"
                        style={{
                            left: `${node.type === 'product' ? 15.5 : level * 24 + 23.5}px`,
                            top: '-4px',
                            bottom: '18px'
                        }}
                    />
                    {node.children.map(child => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            level={level + 1}
                            expandedIds={expandedIds}
                            selectedId={selectedId}
                            focusPath={focusPath}
                            onToggle={onToggle}
                            onSelect={onSelect}
                            onContextMenu={onContextMenu}
                            editingId={editingId}
                            onRenameComplete={onRenameComplete}
                            onMoveNode={onMoveNode} // 传递给递归子节点
                            onAddChild={onAddChild}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

// 7. 主容器组件
export default function L3AdvancedTree({ data = [], selectedId, onSelect, onAddChild, onRename, onDelete, onMoveNode }) {
    const [expandedIds, setExpandedIds] = useState(['root']);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [menu, setMenu] = useState(null);

    // 搜索过滤与路径展开逻辑
    const { filteredData, matchIds } = useMemo(() => {
        if (!searchQuery) return { filteredData: data, matchIds: [] };
        const query = searchQuery.toLowerCase();
        const idsToExpand = new Set();

        const filterNode = (nodes) => {
            return nodes.reduce((acc, node) => {
                const matchName = node.name.toLowerCase().includes(query);
                const filteredChildren = node.children ? filterNode(node.children) : [];
                if (matchName || filteredChildren.length > 0) {
                    acc.push({ ...node, children: filteredChildren });
                    if (filteredChildren.length > 0) {
                        idsToExpand.add(node.id);
                    }
                }
                return acc;
            }, []);
        };
        return { filteredData: filterNode(data), matchIds: Array.from(idsToExpand) };
    }, [data, searchQuery]);

    // 搜索时自动展开相关节点
    useEffect(() => {
        if (searchQuery && matchIds.length > 0) {
            setExpandedIds(prev => Array.from(new Set([...prev, ...matchIds])));
        }
    }, [matchIds, searchQuery]);

    // Focus Mode: 找到到选中节点的路径
    const focusPath = useMemo(() => {
        if (!selectedId) return [];
        const path = [];
        const findPath = (nodes, currentPath) => {
            for (const node of nodes) {
                if (node.id === selectedId) {
                    path.push(...currentPath);
                    return true;
                }
                if (node.children && findPath(node.children, [...currentPath, node.id])) {
                    return true;
                }
            }
            return false;
        };
        findPath(data, []);
        return path;
    }, [data, selectedId]);

    const handleToggle = (id) => {
        // 查找节点，如果是 product 则禁止收纳
        const findAndToggle = (nodes) => {
            for (const n of nodes) {
                if (n.id === id) {
                    if (n.type === 'product') return; // 禁止收纳产品
                    setExpandedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
                    return;
                }
                if (n.children) findAndToggle(n.children);
            }
        };
        findAndToggle(data);
    };

    const handleRenameComplete = (id, action, newName) => {
        if (action === 'start') setEditingId(id);
        else {
            if (action === 'save') {
                onRename?.(id, newName);
            }
            setEditingId(null);
        }
    };

    const handleContextMenu = (e, node) => {
        setMenu({ x: e.clientX, y: e.clientY, node });
    };

    const handleAddChildAndExpand = (parentId) => {
        onAddChild?.(parentId);
        setExpandedIds(prev => Array.from(new Set([...prev, parentId])));
    };

    if (!Array.isArray(data) || data.length === 0) {
        return <div className="p-4 text-xs text-gray-400">数据加载中...</div>;
    }

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {/* 顶部搜索栏 */}
            <div className="p-3 border-b border-gray-50 bg-gray-50/30">
                <div className="relative group">
                    <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-[#087F9C]" />
                    <input
                        type="text"
                        placeholder="搜索名称..."
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#087F9C] focus:ring-2 focus:ring-[#087F9C]/10 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* 树主体 */}
            <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
                {filteredData.map(node => (
                    <TreeNode
                        key={node.id}
                        node={node}
                        level={0}
                        expandedIds={expandedIds}
                        selectedId={selectedId}
                        focusPath={focusPath}
                        onToggle={handleToggle}
                        onSelect={onSelect}
                        onContextMenu={handleContextMenu}
                        editingId={editingId}
                        onRenameComplete={handleRenameComplete}
                        onMoveNode={onMoveNode} // 传递给根节点
                        onAddChild={handleAddChildAndExpand}
                    />
                ))}
            </div>

            {/* 上下文菜单 Portal */}
            {menu && (
                <ContextMenu
                    {...menu}
                    onClose={() => setMenu(null)}
                    onAddChild={handleAddChildAndExpand}
                    onRename={(id, action) => handleRenameComplete(id, action)}
                    onDelete={onDelete}
                />
            )}
        </div>
    );
}