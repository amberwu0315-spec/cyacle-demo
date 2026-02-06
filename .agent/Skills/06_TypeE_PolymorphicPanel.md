# Skill 06: L3 Polymorphic Detail (L3 多态详情面板)

## 1. 核心定义 (Identity)
* **核心职责:** 根据左侧树选中的节点类型（Product / Phase / Module / Process），动态渲染完全不同的详情视图。
* **架构模式:** **容器-积木模式 (Container-Bricks Pattern)**。
  * `L3DetailPanel` (Container): 负责路由判断 (`if/else`) 和数据获取。
  * `L3Bricks` (UI Library): 纯展示组件库，负责渲染具体的表单块。

## 2. 技术栈铁律 (Strict Tech Stack)
> **警告:** 必须严格遵守，否则会导致组件崩溃。

| 维度 | 强制规则 |
| :--- | :--- |
| **图标库** | **必须且只能**使用 `@tabler/icons-react`。 |
| **导出规范** | 所有积木组件 (Bricks) 使用命名导出 (`export const`)；主容器使用默认导出 (`export default`)。 |
| **防御渲染** | 必须处理 `node` 为空的情况 (显示 EmptyState)。 |

## 3. 视图路由真值表 (View Router Truth Table)

根据 `node.type` 和 `node.subType` 决定渲染哪些积木：

| 节点类型 | 渲染内容 (积木组合) | 关键逻辑 |
| :--- | :--- | :--- |
| **Product** | `Header` + `EmissionDetail(Chart)` | 显示 Top 10 环形图 |
| **Phase** | `Header` + `EmissionDetail(List)` | 仅显示列表，无图表 |
| **Module** | `Header` + `ImportantIssues` + `EmissionDetail` | 需额外显示“关键问题”警示条 |
| **Process** | `Header` + `ConfigParams` + `VarInfo` | **最复杂的表单页** |

## 4. 业务逻辑细节 (Business Logic Specs)

### A. 过程节点配置区 (`ConfigParams`)
根据 `subType` 切换表单形态：
* **Normal (常规):** 显示“活动水平 (Activity Level)”和“单位 (Unit)”输入框。
* **Split Ref (拆分引用):** * 显示“分配方式 (Mass/Economic)”下拉框。
    * 显示“分配系数 (%)”输入框。
    * **禁止**显示活动水平和单位（因为是继承的）。
* **Whole Ref (整体引用):** 显示“数据源卡片” (Source Card) 和版本号，只读。

### B. 编辑 vs 完成态
* **未完成 (Editing):** 输入框可编辑，显示 `HintSection` (提示区)。
* **已完成 (Completed):** * `Header` 显示最终排放数值 (Result)。
    * `ConfigParams` 变为**只读模式** (Read-only)。
    * `HintSection` 隐藏。
    * 底部追加 `AnalysisChart` (核算分析图表)。

## 5. 代码骨架 (The Golden Skeleton)

### Part A: 积木库 (L3Bricks.jsx)
```jsx
import { IconInfoCircle, IconAlertTriangle, IconPencil } from '@tabler/icons-react';

// 积木 1: 头部
export const L3Header = ({ node, showResult }) => (
  <div className="border-b p-6 flex justify-between">
    <h1>{node.name}</h1>
    {showResult && <span className="font-mono text-2xl">{node.value}</span>}
  </div>
);

// 积木 2: 参数配置 (多态核心)
export const ConfigParams = ({ node, mode }) => {
  const isRead = mode === 'read';
  // 根据 node.subType 渲染不同表单...
  return <div className="p-4 border rounded">...</div>;
};

```

### Part B: 主容器 (L3DetailPanel.jsx)

```jsx
import React from 'react';
import { L3Header, ConfigParams, EmptyState, EmissionDetail } from './L3Bricks';

export default function L3DetailPanel({ node }) {
  // 1. 防御性检查
  if (!node) return <div className="p-10">请选择节点</div>;

  const isCompleted = node.status === 'completed';

  return (
    <div className="flex flex-col h-full bg-white">
      <L3Header node={node} showResult={isCompleted} />
      
      <div className="flex-1 overflow-y-auto p-6">
        {/* 路由逻辑 */}
        {['product', 'phase', 'module'].includes(node.type) && (
           <EmissionDetail showChart={node.type === 'product'} />
        )}
        
        {node.type === 'process' && (
           <ConfigParams node={node} mode={isCompleted ? 'read' : 'edit'} />
        )}
      </div>
    </div>
  );
}