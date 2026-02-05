---
name: 页面布局规范
description: 统合 Cyacle 项目中标准页面模板（SingleColumn, DoubleColumn, Canvas）的选择与 Header 注入规范。
---

# Cyacle 页面布局 (Page Layouts) 规范

此 Skill 用于指导如何选择合适的页面模板以及如何与系统 Header 进行交互。

## 01. 核心模板 (Core Templates)

### A. 单栏页面 (SingleColumnPage)
- **特性**: 自动垂直滚动，垂直堆叠。
- **场景**: 表单页、设置页、简单信息展示。

### B. 双栏页面 (DoubleColumnPage)
- **特性**: 内部区域独立滚动，通常左 25% 右 75%。
- **变体**:
    - `standard`: 左右独立，无联动。
    - `sidebar`: 左侧为导航/配置，右侧为受控内容（左侧常 Sticky）。

### C. 画布页面 (CanvasPage)
- **特性**: **锁死滚动条 (Fixed)**，由内容组件自行处理滚动。
- **场景**: 复杂 DataGrid、仪表盘、地图、编辑器。

## 02. Header 注入模式

所有页面必须通过 `useHeaderContext` 与顶部栏通信。
- **左侧 (Zone L)**: 标题、面包屑、上下文指示器。
- **右侧 (Zone R)**: 业务操作按钮（创建、导出、AI操作）。

## 03. 工作台几何规范 (Workbench Geometry)

- **容器**: `bg-white`, `rounded-[12px]`, `shadow-2xl`。
- **内容间距**: 主画布内间距统一为 `12px` (`p-3`)。
- **间距基数**: 所有 Gap 和 Padding 必须基于 `4px/8px/12px` 体系。
