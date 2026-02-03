# 🧠 Container Logic & Behavior Spec (容器逻辑与行为定义)

> **Role:** This document complements `design_system.md` (Visuals) and `product_logic.md` (Flows) by defining the internal **"Business Logic"** of complex containers.
> **Responsibility:** Defines state management, data driving rules, and dynamic behaviors.

## 01. 顶部栏容器 (Top Header Container)

### A. 逻辑维度定义的 (Logic Dimensions)

### B. Widget-Based Dynamic Header (Widget 化动态顶部栏)

> **Core Change:** The header is no longer a static layout. It is composed of a list of "Widgets" defined by the current `NavConfig`.

| Widget ID | 描述 (Description) | 动态逻辑 (Dynamic Logic) |
| :--- | :--- | :--- |
| **Breadcrumb** | 面包屑导航 | **Left Zone**. 显示 `Model > Accounting`。点击可触发下拉菜单切换上下文。 |
| **ModeSwitch** | 模式切换器 | **Right Zone**. Tab 样式 (Segmented Control)。切换 [配置模式] / [版本模式]。 |
| **Methodology** | 方法学设置 | **Right Zone**. 在 Config/Version 模式下均显示 (视配置而定)。 |
| **Overview** | 概览按钮 | **Right Zone**. 仅在 Accounting Config Mode 下显示。 |
| **ViewActions** | 视图功能组 | **Right Zone**. 最后显示。与左侧组件有分割线 (`|`)。 |
| **BusinessActions** | 业务按钮组 | **Right Zone**. (如新建、删除)。 |

*   **Layout Logic:**
    *   **Left Zone:** Breadcrumb ONLY.
    *   **Right Zone:** Methodology -> Overview -> ModeSwitch -> | -> ViewActions.

### B. 交互状态机 (Interaction State Machine)
*(Refer to original file for details)*

---

## 02. Page-Specific Header Configurations (页面级 Header 配置映射)

> **核心原则:**
> 1.  **View Group (视图功能组)**: 仅在 L1="项目标签(Project Tag)" 时出现。包含 `[<]`, `[>]`, `[Pop-out]`。与业务组用分割线隔开。
> 2.  **Universal Tooltips (全局提示)**: 
>     *   **所有顶部功能图标** (包括置灰状态) 鼠标移入必须展示 Tooltip。
>     *   **置灰说明**: 若按钮为 Disabled (如无历史记录)，Tooltip 需解释原因 (e.g., "无上一步记录")。
> 3.  **Scoped History (项目专属历史)**: 
>     *   `[<]` 和 `[>]` 按钮 **仅在当前项目范围内有效**。
>     *   置灰 Tooltip: "无上一步记录 (No History)" / "无下一步记录 (No Forward)"。

### 1. L2 - 导航 (Navigation)
*   **Header Type**: `Title Only`
*   **Left Title**: `Project Name` (Dynamic)
*   **Right Actions**:
    *   **Group 1 (Business)**:
        *   `[Icon] 关注/取消关注`: Toggle Star. (Tooltip: "关注" / "取消关注").
        *   `[Icon] 删除`: Confirmation Modal. (Tooltip: "删除").
    *   **Divider**: `Visible`
    *   **Group 2 (View)**: `[Icon] Back`, `[Icon] Forward`, `[Icon] New Window`

### 2. L2 - 基础 (Basis)
*   **Header Type**: `Title Only`
*   **Left Title**: `Project Name` (Dynamic)
*   **Right Actions**:
    *   **Group 1 (Business)**: `None`
    *   **Divider**: `Hidden`
    *   **Group 2 (View)**: `[Icon] Back`, `[Icon] Forward`, `[Icon] New Window`

### 3. L2 - 分配 (Allocation)
*   **Header Type**: `Title Only`
*   **Left Title**: "分配规则" (Fixed)
*   **Right Actions**:
    *   **Group 1 (Business)**:
        *   `[Fill Button] 创建`: Create Modal. (Tooltip: "创建分配规则").
    *   **Divider**: `Visible`
    *   **Group 2 (View)**: `[Icon] Back`, `[Icon] Forward`, `[Icon] New Window`

### 4. L2 - 模型 (Model)
*   **Header Type**: `Widget Based`
*   **Config Mode**: `[Breadcrumb, Methodology, ViewActions]` (Implied Config Mode Only, No Switcher).
*   **Version Mode**: *Not applicable via Switcher*.
*   **SideNav Scope**: 
    *   **Accounting Group**: Basic, ModelConfig.
    *   **Perspective Group**: Activity Data, Factor Data.
*   **Defaults**: Auto-selects `Basic (mod_basic)`. No Create/AI Actions.

### 5. L2 - 核算 (Accounting)
*   **Header Type**: `Widget Based`
*   **Config Mode**: `[Breadcrumb, Methodology, Overview, ModeSwitch | ViewActions]`
    *   *Interaction*: Breadcrumb is interactive (Context Switcher). Sidebar is Visible.
*   **Version Mode**: `[Breadcrumb, Methodology, ModeSwitch | ViewActions]`
    *   *Interaction*: Breadcrumb is read-only. **Sidebar is Hidden**. Main Area shows placeholder.
*   **SideNav Scope**: Accounting Level Tree (Groups: Accounting, Output, Additional).
