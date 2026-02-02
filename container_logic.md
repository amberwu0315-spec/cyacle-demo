# 🧠 Container Logic & Behavior Spec (容器逻辑与行为定义)

> **Role:** This document complements `design_system.md` (Visuals) and `product_logic.md` (Flows) by defining the internal **"Business Logic"** of complex containers.
> **Responsibility:** Defines state management, data driving rules, and dynamic behaviors.

## 01. 顶部栏容器 (Top Header Container)

### A. 逻辑维度定义的 (Logic Dimensions)

| 维度 (Dimension) | 定义逻辑 (Definition) | 具体业务规则 (Business Rules) | React Props / State 映射 |
| :--- | :--- | :--- | :--- |
| **1. 静态配置 (Static)** | **物理布局** | 高度固定 `46px` (Token: `Header-Height`)，背景色 #FFFFFF，底部带 `Shadow-SM`。 | `className`, `style={{ height: theme.headerHeight }}` |
| | **基础结构配置** | 决定左侧区域显示模式 (Logo / 标题 / 面包屑)。**原 `headerSkeleton` 重命名为 `layoutConfig`**。 | `prop: layoutConfig` ('title-only', 'breadcrumb', 'custom') |
| | **右侧区域预设** | 默认占位区，支持挂载通用功能 (如通知/设置) 或业务按钮。 | `prop: defaultActions` (Array) |
| **2. 驱动显示 (Driven)** | **标题动态化** | **Priority Rule**: 优先显示 Props 传入的 `title`；若为空，则回退显示当前 Route 的 `meta.title`；若加载中，显示 Loading Skeleton。 | `prop: title` ?? `route.meta.title` |
| | **模式切换** | 监听全局 `EditMode` 状态。编辑模式下，Header 可能变为特定颜色或显示“未保存”提示。 | `context: { isEditMode }` |
| | **吸顶状态** | 监听页面滚动 (`useScroll`)。滚动超过 0px 时增加 `border-b` 或阴影层级。 | `state: isScrolled` (Boolean) |
| **3. 动态加载 (Dynamic)** | **功能区插槽** | **控制反转 (IoC)**: 不由路由静态配置。而是由**当前激活的页面组件 (Page)** 通过 `Portal` 或 `useHeaderActions` 钩子动态注入按钮。 | `Slot: <HeaderActionPortal>` |
| | | *示例*: 详情页加载完成后，注入 [保存, 取消] 按钮；列表页注入 [新建, 导出] 按钮。 | |
| | **面包屑/历史** | **明确交互**: 点击面包屑文本 -> 跳转上级路由 (Parent)。**移除最左侧返回箭头** (User Request)。 | `prop: breadcrumbData` (Parent + Siblings) |

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
*   **Header Type**: `Title Only`
*   **Left Title**: "模型管理" (Fixed)
*   **Right Actions**:
    *   **Group 1 (Business)**: 
        *   `[Fill Button] 创建`: Create Modal. (Tooltip: "创建新模型").
        *   `[Icon] AI 生成`: AI Modal. (Tooltip: "AI 生成").
    *   **Divider**: `Visible`
    *   **Group 2 (View)**: `[Icon] Back`, `[Icon] Forward`, `[Icon] New Window`

### 5. L2 - 核算 (Accounting)
*   **Header Type**: `Breadcrumb Switcher` (No Back Arrow)
*   **Left Title**: `Model Name` > `Accounting Name`
*   **Right Actions**:
    *   **Group 1 (Business)**:
        *   **Style**: Clean Text Link style (Transparent bg, hover gray). **No Divider** between buttons.
        *   `[Icon+Text] 方法学设置`: Tooltip "方法学设置". Open InnerDrawer.
        *   `[Icon+Text] 概览`: Tooltip "核算概览". Open InnerDrawer.
    *   **Divider**: `Visible` (Separating Business & View groups)
    *   **Group 2 (View)**: `[Icon] Back`, `[Icon] Forward`, `[Icon] New Window`
