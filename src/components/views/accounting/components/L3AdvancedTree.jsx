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
    IconTriangleFilled,
    IconChevronRight,
    IconChevronDown
} from '@tabler/icons-react';

// ============================================================================
// 1. 样式与常量定义
// ============================================================================

// 状态文本颜色映射
const TEXT_STYLE_MAP = {
    normal: 'text-gray-900',
    screened: 'text-gray-400',
    excluded: 'text-gray-400 line-through',
    added: 'text-emerald-700',
    modified: 'text-amber-600'
};

// 权限校验
const canRename = (node) => node?.origin === 'self';
const canReset = (node) => node?.origin === 'inherited' && node?.is_changed;

// 布局常量 (像素级控制)
const LEVEL_INDENT = 24; // 每一级缩进 24px
const BASE_PADDING = 8;  // 根节点左边距 8px
const ARROW_WIDTH = 20;  // 箭头容器宽度 20px

// ============================================================================
// 2. 子组件定义
// ============================================================================

// 百分比徽标
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
        <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded-md ${conf.style} shrink-0 group-hover:hidden border border-transparent`}>
            {conf.text}
        </span>
    );
};

// 节点图标渲染器
const NodeIcon = ({ node, isSelected }) => {
    const { type, subType, origin, status } = node;
    let BaseIcon = IconBox;
    if (type === 'product') BaseIcon = IconPackage;
    if (type === 'phase') BaseIcon = IconPlayerPause;
    if (type === 'module') BaseIcon = IconLayoutGrid;

    // Phase 图标需要旋转 90 度
    const rotateClass = type === 'phase' ? 'rotate-90' : '';
    // 继承节点的线条细一点
    const strokeWidth = origin === 'inherited' ? 1.5 : 2;

    return (
        <div className="relative w-4 h-4 flex items-center justify-center">
            <BaseIcon className={`w-full h-full ${rotateClass}`} stroke={strokeWidth} />

            {/* 状态叠加图标 */}
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
                <IconCircleOff className="absolute inset-0 w-full h-full text-gray-400 opacity-60" />
            )}
        </div>
    );
};

// 右键菜单
const ContextMenu = ({ x, y, node, onClose, onAddChild, onRename, onDelete }) => {
    if (!node) return null;
    const items = [
        { label: '重命名', icon: IconEdit, action: () => onRename?.(node.id, 'start'), disabled: !canRename(node) },
        { label: node.origin === 'self' ? '物理删除' : '屏蔽节点', icon: IconTrash, action: () => onDelete?.(node.id), danger: node.origin === 'self' },
        { label: '添加下级', icon: IconPlus, action: () => onAddChild?.(node.id), disabled: node.type === 'process' },
        { label: '重置更改', icon: IconRefresh, action: () => console.log('Reset'), disabled: !canReset(node) },
    ];

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
            <div
                className="fixed z-50 bg-white shadow-xl rounded-lg border border-gray-100 py-1 min-w-[140px] animate-in fade-in zoom-in duration-75"
                style={{ top: y, left: x }}
            >
                {items.map((item, idx) => (
                    <button
                        key={idx}
                        disabled={item.disabled}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors text-left
                            ${item.disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'}
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
    onToggle, onSelect, onContextMenu, editingId, onRenameComplete, onMoveNode, onAddChild
}) => {
    if (!node) return null;

    // 状态判定
    const isExpanded = expandedIds?.includes(node.id);
    const isSelected = selectedId === node.id;
    const isEditing = editingId === node.id;
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;

    // [新规则] Phase 和 Module 无论有无子节点，始终显示展开箭头
    const showExpandArrow = node.type === 'phase' || node.type === 'module';

    // 样式计算
    const textStyle = TEXT_STYLE_MAP[node.status] || TEXT_STYLE_MAP.normal;
    const rowHeight = node.type === 'product' ? 'h-[36px]' : 'h-[32px]';

    // 对齐计算 (Rail Alignment)
    // Level 0: pl-2 (8px)
    // Level 1: pl-[28px] (8 + 20) -> 箭头对齐父级图标
    // Level 2+: +24px per level
    const paddingLeft = level === 0 ? BASE_PADDING : (BASE_PADDING + 20 + (level - 1) * LEVEL_INDENT);

    // 拖拽逻辑
    const handleDragStart = (e) => {
        if (node.origin === 'inherited' || node.type === 'product') {
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
        e.stopPropagation();
        const draggedId = e.dataTransfer.getData('nodeId');
        if (draggedId && draggedId !== node.id) {
            onMoveNode?.(draggedId, node.id);
        }
    };

    // 编辑状态管理
    const [tempName, setTempName] = useState(node.name);
    useEffect(() => { if (isEditing) setTempName(node.name); }, [isEditing, node.name]);

    return (
        <div className="w-full relative">
            {/* 1. 节点行内容 */}
            <div
                draggable={node.origin === 'self' && node.type !== 'product'}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`group relative flex items-center ${rowHeight} cursor-pointer select-none transition-all pr-2 text-sm rounded mx-1
                    ${isSelected ? 'bg-[#087F9C] text-white shadow-sm z-10' : `hover:bg-gray-100 ${textStyle}`}
                `}
                style={{ paddingLeft: `${paddingLeft}px` }}
                onClick={() => onSelect?.(node)}
                onDoubleClick={() => canRename(node) && onRenameComplete(node.id, 'start')}
                onContextMenu={(e) => { e.preventDefault(); onContextMenu(e, node); }}
            >
                {/* A. 展开/折叠箭头 (固定 20px 宽) */}
                <div
                    className={`flex-none w-5 h-5 flex items-center justify-center mr-0.5 rounded hover:bg-black/5 transition-colors 
                        ${showExpandArrow ? 'visible' : 'invisible'}
                    `}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (showExpandArrow) onToggle?.(node.id);
                    }}
                >
                    <IconTriangleFilled
                        className={`w-2 h-2 transition-transform duration-200 
                            ${isExpanded ? 'rotate-180 opacity-80' : 'rotate-90 opacity-40'}
                            ${isSelected ? 'text-white' : 'text-gray-600'}
                        `}
                    />
                </div>

                {/* B. 业务图标 (固定 16px 宽) */}
                <div className="flex-none w-4 h-4 mr-2">
                    <NodeIcon node={node} isSelected={isSelected} />
                </div>

                {/* C. 节点名称 / 编辑框 */}
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
                    <span className="truncate font-medium flex-1 pt-[1px]">{node.name || '未命名'}</span>
                )}

                {/* D. 右侧操作区 (Badge + Icons) */}
                {!isEditing && (
                    <div className="flex items-center gap-1 ml-auto pl-2">
                        <PercentageBadge node={node} />

                        {/* 悬停显示的操作按钮 */}
                        <div className={`hidden group-hover:flex items-center gap-0.5 ${isSelected ? 'text-white/90' : 'text-gray-400'}`}>
                            {node.type !== 'process' && (
                                <button className="p-0.5 rounded hover:bg-black/10" onClick={(e) => { e.stopPropagation(); onAddChild?.(node.id); }}>
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

            {/* 2. 子节点渲染 (递归) */}
            {isExpanded && hasChildren && (
                <div className="w-full relative">
                    {/* === 垂直连接线 (Guide Line) ===
                        计算逻辑：父级 Padding + 箭头容器一半 (10px) - 线宽修正 (0.5px)
                    */}
                    <div
                        className="absolute border-l border-gray-200 z-0 pointer-events-none"
                        style={{
                            left: `${paddingLeft + 10 - 0.5}px`,
                            top: '0px',
                            bottom: '10px' // 底部留白，不连到底
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
                            onMoveNode={onMoveNode}
                            onAddChild={onAddChild}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

// ============================================================================
// 4. 主导出组件
// ============================================================================

export default function L3AdvancedTree({ data = [], selectedId, onSelect, onAddChild, onRename, onDelete, onMoveNode }) {
    const [expandedIds, setExpandedIds] = useState(['root']); // 默认展开根节点
    const [searchQuery, setSearchQuery] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [menu, setMenu] = useState(null);

    // 搜索过滤与路径展开
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

    // 搜索时自动展开
    useEffect(() => {
        if (searchQuery && matchIds.length > 0) {
            setExpandedIds(prev => Array.from(new Set([...prev, ...matchIds])));
        }
    }, [matchIds, searchQuery]);

    // 切换展开/折叠
    const handleToggle = (id) => {
        // Product (Level 0) 通常不允许折叠，这里做一个防御性判断
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
        if (node && node.type === 'product') return; // 禁止折叠根节点

        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleRenameComplete = (id, action, newName) => {
        if (action === 'start') setEditingId(id);
        else {
            if (action === 'save' && newName?.trim()) {
                onRename?.(id, newName);
            }
            setEditingId(null);
        }
    };

    const handleContextMenu = (e, node) => {
        setMenu({ x: e.clientX, y: e.clientY, node });
    };

    if (!Array.isArray(data) || data.length === 0) {
        return <div className="p-4 text-xs text-gray-400 flex justify-center">暂无数据结构</div>;
    }

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
            {/* Search Header */}
            <div className="p-2 border-b border-gray-50 bg-gray-50/30">
                <div className="relative group">
                    <IconSearch className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-[#087F9C]" />
                    <input
                        type="text"
                        placeholder="搜索结构..."
                        className="w-full pl-7 pr-2 py-1.5 text-xs bg-white border border-gray-200 rounded focus:outline-none focus:border-[#087F9C] focus:ring-1 focus:ring-[#087F9C]/20 transition-all placeholder:text-gray-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Tree Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
                {filteredData.map(node => (
                    <TreeNode
                        key={node.id}
                        node={node}
                        level={0}
                        expandedIds={expandedIds}
                        selectedId={selectedId}
                        // focusPath={focusPath} // 可选：如果需要面包屑高亮
                        onToggle={handleToggle}
                        onSelect={onSelect}
                        onContextMenu={handleContextMenu}
                        editingId={editingId}
                        onRenameComplete={handleRenameComplete}
                        onMoveNode={onMoveNode}
                        onAddChild={onAddChild}
                    />
                ))}
            </div>

            {/* Context Menu Portal */}
            {menu && (
                <ContextMenu
                    {...menu}
                    onClose={() => setMenu(null)}
                    onAddChild={onAddChild}
                    onRename={(id, action) => handleRenameComplete(id, action)}
                    onDelete={onDelete}
                />
            )}
        </div>
    );
}