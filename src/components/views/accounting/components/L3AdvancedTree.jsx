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
import {
    CALC_STATUSES,
    NODE_ORIGINS,
    NODE_STATUSES,
    NODE_TYPES,
    PROCESS_SUB_TYPES,
    canAddChild,
    canDeleteOrScreen,
    canExpand,
    canRename,
    canResetInherited,
    canShowPercentBadge,
    getNodeTextClass
} from '../modelRules';

// ============================================================================
// 1. 样式与常量定义
// ============================================================================

// 布局常量 (像素级控制)
const BASE_PADDING = 8;     // 根节点左边距
const LEVEL_INDENT = 24;    // 层级缩进
const ARROW_WIDTH = 20;     // 箭头容器宽度

// ============================================================================
// 2. 子组件定义
// ============================================================================

const PercentageBadge = ({ node }) => {
    if (!canShowPercentBadge(node)) {
        return null;
    }
    const statusMap = {
        [CALC_STATUSES.PENDING]: { style: 'bg-yellow-100 text-yellow-700', text: '- -%' },
        [CALC_STATUSES.ERROR]: { style: 'bg-red-100 text-red-700', text: '- -%' },
        [CALC_STATUSES.DONE]: { style: 'bg-blue-100 text-blue-700', text: `${node.value?.toFixed(2)}%` }
    };
    const conf = statusMap[node.calc_status] || statusMap[CALC_STATUSES.PENDING];

    return (
        <span className={`h-4 rounded-[4px] px-1.5 text-[9px] font-medium leading-4 ${conf.style} shrink-0 group-hover:hidden border border-white/70`}>
            {conf.text}
        </span>
    );
};

const NodeIcon = ({ node, isSelected }) => {
    const { type, subType, origin, status } = node;
    let BaseIcon = IconBox;
    if (type === NODE_TYPES.PRODUCT) BaseIcon = IconPackage;
    if (type === NODE_TYPES.PHASE) BaseIcon = IconPlayerPause;
    if (type === NODE_TYPES.MODULE) BaseIcon = IconLayoutGrid;

    const rotateClass = type === NODE_TYPES.PHASE ? 'rotate-90' : '';
    const strokeWidth = origin === NODE_ORIGINS.INHERITED ? 1.5 : 2;

    return (
        <div className={`relative w-4 h-4 flex items-center justify-center rounded-md ${isSelected ? 'bg-white/10' : 'bg-slate-50'}`}>
            <BaseIcon className={`w-full h-full ${rotateClass}`} stroke={strokeWidth} />

            {subType === PROCESS_SUB_TYPES.WHOLE_REF && (
                <IconLayersIntersect className={`absolute -top-1 -right-1 w-2.5 h-2.5 text-blue-600 ${isSelected ? 'bg-[#087F9C]' : 'bg-white'} rounded-full p-[1px]`} />
            )}
            {subType === PROCESS_SUB_TYPES.SPLIT_REF && (
                <IconGitBranch className={`absolute -top-1 -right-1 w-2.5 h-2.5 text-purple-600 ${isSelected ? 'bg-[#087F9C]' : 'bg-white'} rounded-full p-[1px]`} />
            )}
            {origin === NODE_ORIGINS.INHERITED && !subType && (
                <IconLink className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 text-gray-400 ${isSelected ? 'bg-[#087F9C]' : 'bg-white'} rounded-full`} />
            )}
            {status === NODE_STATUSES.SCREENED && (
                <IconCircleOff className="absolute inset-0 w-full h-full text-gray-400 opacity-60" />
            )}
        </div>
    );
};

const ContextMenu = ({ x, y, node, onClose, onAddChild, onRename, onDelete }) => {
    if (!node) return null;
    const items = [
        { label: '重命名', icon: IconEdit, action: () => onRename?.(node.id, 'start'), disabled: !canRename(node) },
        { label: node.origin === NODE_ORIGINS.SELF ? '删除节点' : '屏蔽节点', icon: IconTrash, action: () => onDelete?.(node.id), disabled: !canDeleteOrScreen(node), danger: node.origin === NODE_ORIGINS.SELF },
        { label: '添加下级', icon: IconPlus, action: () => onAddChild?.(node.id), disabled: !canAddChild(node) },
        { label: '恢复默认设置', icon: IconRefresh, action: () => { }, disabled: !canResetInherited(node) },
    ];

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
            <div
                className="fixed z-50 min-w-[160px] rounded-xl border border-slate-200 bg-white/95 py-1.5 shadow-[0_16px_32px_rgba(15,23,42,0.18)] backdrop-blur-sm animate-in fade-in zoom-in duration-75"
                style={{ top: y, left: x }}
            >
                {items.map((item, idx) => (
                    <button
                        key={idx}
                        disabled={item.disabled}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors text-left
                            ${item.disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50'}
                            ${item.danger ? 'text-red-600' : 'text-gray-700'}
                        `}
                        onClick={() => { item.action(); onClose(); }}
                    >
                        <item.icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </>
    );
};

// ============================================================================
// 3. 递归节点组件 (核心逻辑)
// ============================================================================

const TreeNode = memo(({
    node, level, expandedIds, selectedId, focusPath,
    onToggle, onSelect, onContextMenu, editingId, onRenameComplete, onMoveNode, onAddChild,
    onForceExpand,
    parentLineX = 0
}) => {
    const isExpanded = Boolean(node && expandedIds?.includes(node.id));
    const isSelected = Boolean(node && selectedId === node.id);
    const isEditing = Boolean(node && editingId === node.id);
    const hasChildren = Array.isArray(node?.children) && node.children.length > 0;

    // Product 节点永不显示展开箭头，其他节点如果是 Phase/Module 常驻显示
    const showExpandArrow = Boolean(node && node.type !== NODE_TYPES.PRODUCT && canExpand(node));

    const textStyle = node ? getNodeTextClass(node) : '';
    const rowHeight = node?.type === NODE_TYPES.PRODUCT ? 'h-[36px]' : 'h-[32px]';

    // --- 智能对齐计算 (V3.0 Radial Alignment) ---
    // 基准：行容器距离父级引导线固定 4px (Requirement 9)
    const paddingLeft = level === 0 ? BASE_PADDING : (parentLineX + 4);

    // 线条对齐：引导线位于当前层级展开图标的中心 (Padding + 10px)
    const lineLeft = paddingLeft + 10;
    // --- 条件引导线逻辑 ---
    const showGuideLine = useMemo(() => {
        if (!node) return false;
        if (!isExpanded || !hasChildren || level === 0) return false;
        if (node.type === NODE_TYPES.PHASE) {
            // 阶段节点：仅当有模块或过程子节点时显示
            return node.children.some(c => c.type === NODE_TYPES.MODULE || c.type === NODE_TYPES.PROCESS);
        }
        if (node.type === NODE_TYPES.MODULE) {
            // 模块节点：仅当有过程子节点时显示
            return node.children.some(c => c.type === NODE_TYPES.PROCESS);
        }
        return false;
    }, [isExpanded, hasChildren, level, node.type, node.children]);

    // 拖拽逻辑保持不变
    const handleDragStart = (e) => {
        if (node.type === NODE_TYPES.PRODUCT) {
            e.preventDefault();
            return;
        }
        e.dataTransfer.setData('nodeId', node.id);
        e.dataTransfer.effectAllowed = 'move';
    };
    const handleDragOver = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; };
    const handleDrop = (e) => {
        e.preventDefault(); e.stopPropagation();
        const draggedId = e.dataTransfer.getData('nodeId');
        if (draggedId && draggedId !== node.id) onMoveNode?.(draggedId, node.id);
    };

    const [tempName, setTempName] = useState(node?.name || '');
    useEffect(() => { if (isEditing) setTempName(node?.name || ''); }, [isEditing, node?.name]);

    if (!node) return null;

    const bgGap = parentLineX > 0 ? parentLineX + 4 : 0;
    const bgOpacity = isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';
    const bgColor = isSelected ? 'ac-row-selected' : 'ac-row-hover';

    return (
        <div className="w-full">
            {/* Row Wrapper: 只包裹当前行，避免选中背景延伸到子树 */}
            <div className="relative">
                {/* Background Layer (Selection/Hover) */}
                <div
                    className={`absolute inset-y-0.5 right-1 rounded transition-all duration-150 ${bgOpacity} ${bgColor} z-0`}
                    style={{ left: `${bgGap}px` }}
                />

                {/* Node Row Content */}
                <div
                draggable={node.origin === 'self' && node.type !== 'product'}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`group relative flex items-center ${rowHeight} cursor-pointer select-none transition-all pr-2 text-sm z-10 rounded-md
                    ${isSelected ? 'text-white' : textStyle}
                `}
                style={{ paddingLeft: `${paddingLeft}px` }}
                onClick={() => onSelect?.(node)}
                onDoubleClick={() => canRename(node) && onRenameComplete(node.id, 'start')}
                onContextMenu={(e) => { e.preventDefault(); onContextMenu(e, node); }}
                >
                {/* 1. 展开/折叠箭头 (Product 节点完全移除此 DOM) */}
                {node.type !== NODE_TYPES.PRODUCT && node.type !== NODE_TYPES.PROCESS && (
                    <div
                        className={`flex-none w-[20px] h-[20px] flex items-center justify-center mr-0.5 rounded transition-all z-10
                            ${showExpandArrow ? 'visible opacity-100' : 'invisible opacity-0'}
                            ${isSelected ? 'bg-transparent' : 'bg-white/70'}
                        `}
                        onClick={(e) => { e.stopPropagation(); if (showExpandArrow) onToggle?.(node.id); }}
                    >
                        <IconTriangleFilled
                            className={`w-2 h-2 transition-transform duration-200 
                                ${isExpanded ? 'rotate-180' : 'rotate-90'}
                                ${isSelected ? 'text-white' : 'text-gray-500'}
                            `}
                        />
                    </div>
                )}

                {/* 1.5 过程节点占位符 (为了让图标对齐父级模块图标: 4px gap + 8px spacer + 8px icon_half = 20px from line) */}
                {node.type === NODE_TYPES.PROCESS && (
                    <div className="flex-none w-[8px] h-[20px] z-10" />
                )}

                {/* 2. 业务图标 */}
                <div className="flex-none w-4 h-4 mr-2">
                    <NodeIcon node={node} isSelected={isSelected} />
                </div>

                {/* 3. 名称 / 编辑 */}
                {isEditing ? (
                    <input
                        autoFocus
                        className="flex-1 min-w-0 bg-white text-gray-900 px-1 py-0.5 rounded border border-[#087F9C] outline-none text-xs -ml-1 h-6"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onBlur={() => onRenameComplete(node.id, 'save', tempName)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onRenameComplete(node.id, 'save', tempName);
                            if (e.key === 'Escape') onRenameComplete(node.id, 'cancel');
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <span className="truncate font-medium flex-1 pt-[1px] tracking-[0.005em]">{node.name || '未命名'}</span>
                )}

                {/* 4. 右侧操作区 */}
                {!isEditing && (
                    <div className="flex items-center gap-1 ml-auto pl-2">
                        <PercentageBadge node={node} />
                        <div className={`hidden group-hover:flex items-center gap-0.5 ${isSelected ? 'text-white/90' : 'text-gray-400'}`}>
                            {canAddChild(node) && (
                                <button className="p-0.5 rounded hover:bg-black/10" onClick={(e) => { e.stopPropagation(); onForceExpand?.(node.id); onAddChild?.(node.id); }}>
                                    <IconPlus className="w-3.5 h-3.5" />
                                </button>
                            )}
                            <button className="p-0.5 rounded hover:bg-black/10" onClick={(e) => { e.stopPropagation(); onContextMenu(e, node); }}>
                                <IconDots className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                )}
                </div>
            </div>

            {/* Children Container & Guide Line */}
            {isExpanded && hasChildren && (
                <div className="w-full relative">
                    {/* Vertical Guide Line (Level 0 不显示最外层连线) */}
                    {showGuideLine && (
                        <div
                            className="absolute border-l border-gray-200 z-0 pointer-events-none"
                            style={{
                                left: `${lineLeft}px`,
                                top: '0px',
                                bottom: '16px' // 底部留白，刚好到最后一个子节点的中心
                            }}
                        />
                    )}

                    {node.children.map(child => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            level={level + 1}
                            expandedIds={expandedIds}
                            selectedId={selectedId}
                            focusPath={focusPath}
                            parentLineX={level > 0 ? lineLeft : 0}
                            onToggle={onToggle}
                            onSelect={onSelect}
                            onContextMenu={onContextMenu}
                            editingId={editingId}
                            onRenameComplete={onRenameComplete}
                            onMoveNode={onMoveNode}
                            onAddChild={onAddChild}
                            onForceExpand={onForceExpand}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

// ============================================================================
// 4. 主容器
// ============================================================================

export default function L3AdvancedTree({ data = [], selectedId, onSelect, onAddChild, onRename, onDelete, onMoveNode }) {
    const collectAllExpandableIds = (nodes) => {
        const ids = [];
        const walk = (list) => {
            (list || []).forEach((node) => {
                if (Array.isArray(node.children) && node.children.length > 0) {
                    ids.push(node.id);
                    walk(node.children);
                }
            });
        };
        walk(nodes);
        return ids;
    };

    const [expandedIds, setExpandedIds] = useState(() => collectAllExpandableIds(data));
    const [searchQuery, setSearchQuery] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [menu, setMenu] = useState(null);

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
                    if (filteredChildren.length > 0) idsToExpand.add(node.id);
                }
                return acc;
            }, []);
        };
        return { filteredData: filterNode(data), matchIds: Array.from(idsToExpand) };
    }, [data, searchQuery]);

    useEffect(() => {
        if (searchQuery && matchIds.length > 0) {
            setExpandedIds(prev => Array.from(new Set([...prev, ...matchIds])));
        }
    }, [matchIds, searchQuery]);

    useEffect(() => {
        setExpandedIds(collectAllExpandableIds(data));
    }, [data]);

    const handleToggle = (id) => {
        const findNode = (nodes) => {
            for (let n of nodes) {
                if (n.id === id) return n;
                if (n.children) {
                    const res = findNode(n.children);
                    if (res) return res;
                }
            }
            return null;
        };
        const node = findNode(data);
        if (node && node.type === NODE_TYPES.PRODUCT) return; // 禁止折叠根节点
        setExpandedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleRenameComplete = (id, action, newName) => {
        if (action === 'start') setEditingId(id);
        else {
            if (action === 'save' && newName?.trim()) onRename?.(id, newName);
            setEditingId(null);
        }
    };

    const handleContextMenu = (e, node) => setMenu({ x: e.clientX, y: e.clientY, node });
    const forceExpandNode = (id) => setExpandedIds(prev => (prev.includes(id) ? prev : [...prev, id]));

    if (!Array.isArray(data) || data.length === 0) {
        return <div className="p-4 text-xs text-gray-400 flex justify-center">暂无数据结构</div>;
    }

    return (
        <div className="ac-tree-shell flex h-full flex-col overflow-hidden">
            <div className="border-b border-slate-100 bg-gradient-to-r from-[#f7fcff] to-[#f3f8fb] px-3 py-2.5">
                <div className="mb-2 flex items-center justify-between">
                    <div className="text-[11px] font-semibold tracking-[0.06em] text-slate-500">模型结构树</div>
                    <div className="rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] text-cyan-700">{data.length} 个根节点</div>
                </div>
                <div className="relative group">
                    <IconSearch className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-[#087F9C]" />
                    <input
                        type="text"
                        placeholder="搜索结构..."
                        className="ac-tree-search w-full rounded-md py-1.5 pl-7 pr-2 text-xs transition-all placeholder:text-gray-300 focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-4 pt-2">
                {filteredData.map(node => (
                    <TreeNode
                        key={node.id}
                        node={node}
                        level={0}
                        expandedIds={expandedIds}
                        selectedId={selectedId}
                        onToggle={handleToggle}
                        onSelect={onSelect}
                        onContextMenu={handleContextMenu}
                        editingId={editingId}
                        onRenameComplete={handleRenameComplete}
                        onMoveNode={onMoveNode}
                        onAddChild={onAddChild}
                        onForceExpand={forceExpandNode}
                    />
                ))}
            </div>

            {menu && (
                <ContextMenu
                    {...menu}
                    onClose={() => setMenu(null)}
                    onAddChild={(id) => { forceExpandNode(id); onAddChild?.(id); }}
                    onRename={(id, action) => handleRenameComplete(id, action)}
                    onDelete={onDelete}
                />
            )}
        </div>
    );
}
