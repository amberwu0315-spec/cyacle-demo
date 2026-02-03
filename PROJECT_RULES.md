# CYACLE PROJECT RULES (项目铁律)

> **⚠️ CRITICAL (警告)**: 
> 本文件是项目的**唯一真理源 (Single Source of Truth)**。
> 所有 AI 助手在进行修改前，必须优先遵守本文件。
> 原 `container_logic.md` 已被废弃并合并至此。

## 1. 页面布局 (Page Layout)

### 🔵 顶部栏规则 (Header Rules)

#### L2二级页面差异化规则 (L2 Header Differentiation)

并非所有二级页面都相同。请严格遵守以下模块区分：

**A. 简单模式 (Simple L2)**  
**适用模块**: `Navigation`, `Basis`, `Allocation`, `Model` (列表页)  
**组件配置**: 
*   **左侧**: `Title` (仅显示模块/项目标题，无面包屑)。
*   **右侧**: `View Actions` (必须有)，`Business Actions` (仅Allocation/Model有)。
*   **禁止**: 禁止出现面包屑、方法学、模式切换。

**B. 复杂模式 (Complex L2 - Accounting)**  
**适用模块**: `Accounting` (核算)  
**组件配置**:
1.  **Breadcrumb (面包屑)**: 显示完整路径 (e.g. `Model > Accounting`)。
2.  **Methodology (方法学)**: 必须显示。
3.  **Overview (概览)**: 仅在 Config 模式下。
4.  **Mode Switch (模式切换)**: 显示 [配置模式] / [版本模式]。
5.  **Divider (分割线)**: 区分业务与视图操作。
6.  **View Actions (视图操作)**: 必须有。

#### 核心组件定义 (Widget Definitions)
以下定义了系统支持的标准 Header 组件：

| Widget ID | 描述 | 行为规范 |
| :--- | :--- | :--- |
| **Breadcrumb** | 面包屑 | 点击可触发下拉菜单切换上下文。 |
| **ModeSwitch** | 模式切换 | Tab 样式，切换 Config/Version。 |
| **Methodology**| 方法学 | 通常在右侧区域第一个。 |
| **Overview** | 概览 | 通常紧随方法学之后。 |
| **ViewActions**| 视图组 | 包含回退/前进/新窗口。前必须有分割线(Divider)如果前面有其他组件。 |

---

### 🦶 Footer Modal 规则 (Footer Modal Rules)

#### 定位铁律 (Position - CRITICAL)

**⚠️ 绝对定位规则**：
*   **Position**: `absolute top-0 left-0 bottom-[40px] right-0`
*   **相对于**: `#right-zone` (Header + Content 的父容器)
*   **禁止**: 使用 `fixed` 定位或修改 bottom 值

#### 覆盖范围 (Coverage - MUST FOLLOW)

**必须覆盖**:
*   Header (顶部栏)
*   L3 Sidebar (侧边菜单，如存在)
*   Main Content (主内容区)

**必须显示**:
*   L1 Sidebar (60px 全局侧边栏)
*   L2 Sidebar (50px 业务功能条)
*   Footer Bar (38px 底部栏)

**验证标准**: Footer 栏必须始终可见并可点击切换模块。

#### 样式规则 (Styling)

*   **边框**: `border-4 border-[#087F9C]` + `rounded-t-lg`
*   **背景**: `bg-white/95 backdrop-blur-sm`
*   **Z-Index**: `z-50` (高于内容，低于全局弹窗)

#### 标准结构 (Structure)

**顶部栏 (40px)**:
*   左侧：动态标题（匹配 Footer 按钮名称）
*   右侧：业务功能组 + 分割线 + View 功能组
    *   Business: 版本历史/删除/添加（根据模块类型）
    *   View: 打开独立窗口、关闭（所有模块统一）

**内容区**:
*   背景色: `bg-[#F5F6F8]`
*   内边距: `p-3` (遵循12px统一间距规则)

#### 交互规则 (Interaction)

*   点击 Footer 按钮打开对应模块
*   点击已激活按钮关闭 Modal (Toggle)
*   切换 L1/L2/L3 导航自动关闭 Modal
*   激活按钮显示 `bg-[#087F9C]` 背景色

---

## 2. 视觉规范 (Visual consistency)

### 🟢 颜色 (Colors)
*   **主色 (Primary)**: `#087F9C` (Deep Cyan)
*   **选中状态 (Selected)**: 背景色必须使用主色，图标/文字转为白色。
*   **复选框 (Checkbox)**: 选中时背景必须是 `#087F9C`。

### 🔘 状态 (States)
*   **Disabled (禁用)**: 必须有 Tooltip 解释为什么被禁用 (e.g., "无上一步记录")。

### 📐 间距 (Spacing)
*   **内容区统一间距**: 页面内容区的所有间距（Padding, Gap）**必须统一为 12px** (`p-3` / `gap-3`)。禁止使用 `p-4` 或其他数值。

## 3. 交互模式 (Interaction)

### 🖱️ 原位编辑 (Inline Editing)
*   所有属性修改应优先使用原位编辑（悬停显示编辑笔），而非弹窗。

### 📦 容器行为 (Container Behavior)
*   **View Group (视图功能组)**: 仅在 L1="项目标签" 时出现。
*   **Scoped History**: `[<]` 和 `[>]` 按钮仅在当前项目上下文内有效。
