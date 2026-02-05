import React, { memo, useMemo, useState } from 'react';
// 1. 确保只使用 Tabler 图标
import {
    IconPackage,
    IconPlayerPause,
    IconLayoutGrid,
    IconBox,
    IconLink,
    IconCircleOff,
    IconLayersIntersect,
    IconGitBranch,
    IconChevronDown,
    IconChevronRight
} from '@tabler/icons-react';

// 2. 样式映射
const TEXT_STYLE_MAP = {
    normal: 'text-[#4D4D4D]',
    screened: 'text-[#4D4D4D]',
    excluded: 'text-[#4D4D4D] line-through',
    deleted: 'text-gray-400 line-through',
    added: 'text-emerald-600',
    modified: 'text-orange-500'
};

const shouldShowPercent = (node) => {
    if (!node || node.type !== 'process') return false;
    if (['excluded', 'screened', 'deleted'].includes(node.status)) return false;
    return node.subType !== 'split_ref';
};

const getNodeIcon = (node) => {
    if (!node) return () => null;
    const { type, subType, origin, status } = node;
    let BaseIcon = IconBox;
    if (type === 'product') BaseIcon = IconPackage;
    if (type === 'phase') BaseIcon = IconPlayerPause;
    if (type === 'module') BaseIcon = IconLayoutGrid;

    return ({ className }) => (
        <div className={`relative flex items-center justify-center ${className}`}>
            <BaseIcon
                className={`w-full h-full ${type === 'phase' ? 'rotate-90' : ''}`}
                stroke={origin === 'inherited' ? 1.5 : 2}
            />
            {subType === 'whole_ref' && <IconLayersIntersect className="absolute -top-1 -right-1 w-2.5 h-2.5 text-blue-600 bg-white rounded-full p-[1px]" />}
            {subType === 'split_ref' && <IconGitBranch className="absolute -top-1 -right-1 w-2.5 h-2.5 text-purple-600 bg-white rounded-full p-[1px]" />}
            {origin === 'inherited' && !subType && <IconLink className="absolute -bottom-1 -right-1 w-2.5 h-2.5 text-gray-400 bg-white rounded-full" />}
            {status === 'screened' && <IconCircleOff className="absolute w-full h-full text-gray-400 opacity-60" />}
        </div>
    );
};

const TreeNode = memo(({ node, level, expandedIds, selectedId, onToggle, onSelect }) => {
    if (!node) return null;
    const isExpanded = expandedIds?.includes(node.id);
    const isSelected = selectedId === node.id;
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;

    const IconComponent = useMemo(() => getNodeIcon(node), [node.type, node.subType, node.origin, node.status]);
    const textStyle = TEXT_STYLE_MAP[node.status] || TEXT_STYLE_MAP.normal;

    return (
        <div className="w-full">
            <div
                className={`group relative flex items-center h-[36px] cursor-pointer select-none transition-all pr-3 text-sm
          ${isSelected ? 'bg-[#087F9C] text-white' : `hover:bg-gray-50 ${textStyle}`}
        `}
                style={{ paddingLeft: `${level * 24 + 12}px` }}
                onClick={() => onSelect?.(node)}
            >
                <div
                    className="flex-none w-6 h-6 flex items-center justify-center mr-1 rounded hover:bg-black/5"
                    onClick={(e) => { e.stopPropagation(); onToggle?.(node.id); }}
                >
                    {hasChildren && (isExpanded ? <IconChevronDown className="w-4 h-4 opacity-70" /> : <IconChevronRight className="w-4 h-4 opacity-70" />)}
                </div>
                <div className="w-4 h-4 mr-2 flex-none"><IconComponent className="w-full h-full" /></div>
                <span className="truncate font-medium flex-1">{node.name || '未命名'}</span>
                {shouldShowPercent(node) && node.percent && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ml-auto font-mono ${isSelected ? 'bg-white/20 text-white' : 'bg-[#087F9C]/10 text-[#087F9C]'}`}>
                        {node.percent}
                    </span>
                )}
            </div>
            {isExpanded && hasChildren && (
                <div className="w-full">
                    {node.children.map(child => (
                        <TreeNode key={child.id} node={child} level={level + 1} expandedIds={expandedIds} selectedId={selectedId} onToggle={onToggle} onSelect={onSelect} />
                    ))}
                </div>
            )}
        </div>
    );
});

// 3. 核心容器组件
const L3AdvancedTree = ({ data = [], selectedId, onSelect }) => {
    const [expandedIds, setExpandedIds] = useState(['root']);
    const handleToggle = (id) => setExpandedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

    if (!Array.isArray(data) || data.length === 0) {
        return <div className="p-4 text-xs text-gray-400">数据加载中...</div>;
    }

    return (
        <div className="py-2 w-full">
            {data.map(node => (
                <TreeNode key={node.id} node={node} level={0} expandedIds={expandedIds} selectedId={selectedId} onToggle={handleToggle} onSelect={onSelect} />
            ))}
        </div>
    );
};

// 4. 关键修复：添加默认导出，解决父组件报错
export default L3AdvancedTree;