import React, { memo, useMemo, useState } from 'react';
// 1. 严格从 Tabler 导入
import { 
  IconPackage, IconPlayerPause, IconLayoutGrid, IconBox, 
  IconLink, IconCircleOff, IconLayersIntersect, IconGitBranch, 
  IconChevronDown, IconChevronRight 
} from '@tabler/icons-react';

// 2. 样式映射表
const TEXT_STYLE_MAP = {
  normal: 'text-[#4D4D4D]',
  screened: 'text-[#4D4D4D]',
  excluded: 'text-[#4D4D4D] line-through',
  deleted: 'text-gray-400 line-through',
  added: 'text-emerald-600',
  modified: 'text-orange-500'
};

// 3. 逻辑判断：拆分引用不显示百分比
const shouldShowPercent = (node) => {
  if (!node || node.type !== 'process') return false;
  if (['excluded', 'screened', 'deleted'].includes(node.status)) return false;
  if (node.subType === 'split_ref') return false; // 关键逻辑
  return true;
};

// 4. 节点组件 (Memoized)
const TreeNode = memo(({ node, level, expandedIds, selectedId, onToggle, onSelect }) => {
  if (!node) return null; // 防御性检查

  // ... Icon 计算逻辑 (参考上方真值表) ...
  // ... 渲染逻辑 ...
  
  return (
    <div 
      className={`... ${isSelected ? 'bg-[#087F9C] text-white' : ''}`}
      onClick={() => onSelect(node)} // 选中
    >
      <div onClick={(e) => { e.stopPropagation(); onToggle(node.id); }}>
        {/* 箭头图标 */}
      </div>
      {/* 内容 */}
    </div>
  );
});

// 5. 主容器 (必须默认导出)
export default function L3AdvancedTree({ data, selectedId, onSelect }) {
  // 防御：无数据时不渲染空 Map 导致报错
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="p-4 text-gray-400 text-xs">暂无数据</div>;
  }
  
  return (
    <div className="py-2">
      {data.map(node => <TreeNode key={node.id} node={node} ... />)}
    </div>
  );
}