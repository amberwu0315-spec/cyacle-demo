# Skill 05: L3 Advanced Tree (L3 高级业务树) v2.0

## 1. 核心定义 (Identity)

* **类型:** Type D (Recursive Business Tree)
* **核心职责:** 渲染 Product -> Phase -> Module -> Process 的四层结构，并执行严格的“血统权限控制”（自建 vs 继承）。
* **适用场景:** 核算模型配置、BOM 结构管理、多态数据对比。

## 2. 技术栈铁律 (Strict Tech Stack)

> **警告:** 违反以下规则将导致运行时白屏或构建失败。

| 维度 | 强制规则 | 代码映射 |
| --- | --- | --- |
| **图标库** | **必须且只能**使用 `@tabler/icons-react`。 | `import { IconPackage, ... } from '@tabler/icons-react'` |
| **导出规范** | **必须**使用 `export default`。 | `export default function L3AdvancedTree...` |
| **防御渲染** | **必须**校验数据存在性。 | `if (!data) return <Placeholder />` |
| **样式方案** | Tailwind CSS Utility Classes。 | 禁止行内 Style (动态 Padding 除外)。 |

## 3. 视觉逻辑真值表 (Visual Truth Table)

### A. 图标映射系统 (Icon Mapping)

| 节点类型 | 基础图标 (Tabler) | 样式修饰 |
| --- | --- | --- |
| **Product** | `IconPackage` | - |
| **Phase** | `IconPlayerPause` | 必须添加 `rotate-90` (旋转90度) |
| **Module** | `IconLayoutGrid` | - |
| **Process** | `IconBox` | - |

### B. 叠加状态 (Overlays)

*图标需包裹在 `relative` 容器中，叠加图标绝对定位到右上角或右下角。*

| 业务场景 | 叠加图标 | 样式规则 |
| --- | --- | --- |
| **整体引用 (Whole Ref)** | `IconLayersIntersect` | 右上角，蓝字白底圆角 |
| **拆分引用 (Split Ref)** | `IconGitBranch` | 右上角，紫字白底圆角 |
| **继承来源 (Inherited)** | `IconLink` | 右下角，灰字白底 |
| **被屏蔽 (Screened)** | `IconCircleOff` | 居中覆盖，灰色，透明度 60% |

### C. 节点文本状态

| 状态 (Status) | 文本样式 | 备注 |
| --- | --- | --- |
| `normal` | `text-[#4D4D4D]` | 默认状态 |
| `screened` (屏蔽) | `text-gray-400` | 继承节点被软删除时 |
| `excluded` (排除) | `line-through text-gray-400` | 排除计算 |
| `added` (新增) | `text-emerald-600` | 本次会话新增 |
| `modified` (变更) | `text-orange-500` | 继承节点属性被覆写 |

### D. 百分比仪表盘 (Percentage Badge)

> **显示前提:** 仅 Process 节点显示，且**排除**以下情况：被屏蔽、被排除、拆分引用(Split Ref)。

| 状态 | 判定逻辑 | 样式 (Tailwind) | 内容 |
| --- | --- | --- | --- |
| **配置中** | `calc_status === 'pending'` | `bg-yellow-100 text-yellow-700` | 空值 (`- -%`) |
| **配置完成** | `calc_status === 'done'` | `bg-blue-100 text-blue-700` | 具体数值 (保留2位小数) |
| **异常** | `calc_status === 'error'` | `bg-red-100 text-red-700` | 空值 (`- -%`) |

## 4. 权限与行为矩阵 (Permission & Behavior)

> 这是业务逻辑的核心。所有操作前必须先校验 `node.origin`。

### A. 血统权限 (Lineage Rules)

| 动作 | 🟢 自建节点 (origin: 'self') | 🔒 继承节点 (origin: 'inherited') | 逻辑备注 |
| --- | --- | --- | --- |
| **新增同级** | ✅ 允许 | ❌ 禁止 | 不能破坏父模型的层级结构 |
| **新增下级** | ✅ 允许 | ✅ 允许 | *特例：* 继承节点下只能挂自建节点 |
| **删除/屏蔽** | ✅ **删除** (物理消失) | 🛡️ **屏蔽** (软删除 `screened`) | 继承节点永远存在，不可物理删除 |
| **重置/同步** | ❌ (无此概念) | ✅ 允许 | 仅当继承节点 `is_changed: true` 时可用 |
| **拖拽操作** | ✅ 只有它可以移动 | ❌ 位置锁死 | 继承节点是骨架，不可移动 |

### B. 拖拽物理定律 (Drag & Drop Physics)

1. **自建入继承:** ✅ 允许。可以将“自建节点”拖入“继承节点”内部（作为子项扩展）。
2. **继承入自建:** ❌ **绝对禁止**。父模型的数据不能归属于子模型的私有结构。
3. **核算产品:** ❌ 不可拖拽。

## 5. 交互触发规范 (Interaction Triggers)

### A. 鼠标交互 (Mouse Events)

| 区域/动作 | 触发行为 | 备注 |
| --- | --- | --- |
| **点击箭头 (Chevron)** | `onToggle` | 仅展开/折叠，**不触发**选中，需 `stopPropagation` |
| **单击整行 (Row)** | `onSelect` | 选中高亮，右侧面板加载 |
| **双击整行 (Row)** | `onRename` | 原地激活文本编辑框 (仅限有重命名权限的节点) |
| **悬停 (Hover)** | `showQuickActions` | 在最右侧浮现 `[+]` (添加) 和 `[...]` (更多) 按钮 |
| **右键 (Context Menu)** | `openContextMenu` | 根据 **Permission A** 表渲染菜单项 (置灰不可用项) |

### B. 搜索与聚焦 (Global Features)

1. **搜索模式:** 仅支持搜索名称。匹配项高亮，非匹配项保持原样或自动折叠。
2. **聚焦模式:**
* 默认：除了已屏蔽 (`screened`) 的节点，其他全部勾选。
* 视图：聚焦选中节点时，其**上级节点**显示为面包屑灰 (`text-gray-300`)，其**下级节点**正常显示。



## 6. 标准代码骨架 (The Golden Skeleton)

```jsx
import React, { memo } from 'react';
import { 
  IconPackage, IconPlayerPause, IconLayoutGrid, IconBox, 
  IconLink, IconCircleOff, IconLayersIntersect, IconGitBranch 
} from '@tabler/icons-react';

// 1. 权限校验辅助函数
const canDelete = (node) => node.origin === 'self';
const canAddSibling = (node) => node.origin === 'self';

// 2. Badge 渲染器
const PercentageBadge = ({ node }) => {
  // 排除逻辑：SplitRef / 屏蔽 / 排除 不显示
  if (node.subType === 'split_ref' || ['screened', 'excluded'].includes(node.status)) {
    return null;
  }

  // 状态颜色逻辑
  const statusMap = {
    pending: { style: 'bg-yellow-100 text-yellow-700', text: '- -%' },
    error:   { style: 'bg-red-100 text-red-700',    text: '- -%' },
    done:    { style: 'bg-blue-100 text-blue-700',   text: `${node.value?.toFixed(2)}%` }
  };

  const conf = statusMap[node.calc_status] || statusMap.pending;

  return (
    <span className={`px-2 py-0.5 text-xs rounded-full ${conf.style}`}>
      {conf.text}
    </span>
  );
};

// 3. 节点组件
const TreeNode = memo(({ node, isSelected, onSelect, onToggle }) => {
  // 计算名称样式
  let textClass = 'text-[#4D4D4D]';
  if (node.status === 'screened') textClass = 'text-gray-400';
  if (node.status === 'excluded') textClass = 'line-through text-gray-400';
  if (node.origin === 'inherited' && node.is_changed) textClass = 'text-orange-500';

  return (
    <div 
      className={`group flex items-center justify-between hover:bg-gray-50 ${isSelected ? '!bg-[#087F9C] !text-white' : ''}`}
      onClick={() => onSelect(node)}
      onContextMenu={(e) => { e.preventDefault(); /* 触发右键菜单 */ }}
    >
      <div className="flex items-center gap-2">
        {/* 左侧箭头与图标区域 */}
        <span onClick={(e) => { e.stopPropagation(); onToggle(node.id); }}>
          {/* Chevron Icon */}
        </span>
        
        {/* 节点名称 */}
        <span className={`truncate ${textClass}`}>
          {node.title}
        </span>
      </div>

      {/* 右侧区域：Badge + 悬停操作 */}
      <div className="flex items-center gap-2 pr-2">
        <PercentageBadge node={node} />
        
        {/* Hover 快捷操作 (Group Hover) */}
        <div className="hidden group-hover:flex gap-1 text-gray-400">
           {/* [+] Icon */}
           {/* [...] Icon */}
        </div>
      </div>
    </div>
  );
});

export default function L3AdvancedTree({ data, ...props }) {
  if (!data) return null;
  // ... 递归渲染逻辑
}

```