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
**适用模块**: 
- **项目类**: `Navigation`, `Basis`, `Allocation`, `Model` (列表页)
- **背景数据类**: `Database Management` (数据库管理), `Component` (元件), `BasicFlow` (基本流), `CompositeFactor` (复合因子), `LiteratureFactor` (文献因子), `Literature` (文献)
- **L1业务类**: `Project Management` (全部项目/PCF/OCF), `Research Objects` (研究对象)

**组件配置**: 
*   **左侧**: `Title` (仅显示模块标题，无面包屑)。
    *   **⚠️ 标题来源铁律**: 
        *   **标准项目模式**: L2 Navigation/Basis 等页面标题必须**显示当前项目名称** (如 "My Green Project")，严禁强制显示为 "Navigation" 或 "Basis"。
        *   **详情页模式**: 必须显示**当前标签页名称**。
        *   页面组件 (`NavigationPage.jsx` 等) **严禁**使用 `setTitleOverride` 硬编码标题，标题必须由 `Workbench` 统一托管。
*   **右侧**: `Business Actions` (必须位于Header右侧)，`View Actions` (仅项目类模块有，背景数据类无)。
*   **禁止**: 禁止出现面包屑、方法学、模式切换。

**⚠️ 背景数据类特殊铁律 (Background Data Specials)**:
1.  **动作归位**: "创建/添加"等页面级核心操作按钮**严禁**放置在内容区，必须通过 `useHeaderContext` 注入到 Header 右侧区域。
2.  **全宽布局**: 内容区域必须使用 `w-full` 撑满容器，严禁在右侧预留非必要的空白区域。布局顺序统一为：Header > (Search) > Filter > Table。

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

### 🗂️ 标签页与详情视图 (Tabs & Detail Views)

#### 标签页定位 (Tab Location - CRITICAL)
*   **唯一位置**: 已打开的标签页通过 `Icon` 的形式展示在 **L1 Sidebar (左侧深色导航栏)** 的下半部分。
*   **严禁**: 严禁在 Business Sidebar (白色侧边栏) 或 Top Bar 展示标签页列表。
*   **持久化**: 标签页状态必须在 `App.jsx` 提升管理，切换 L1 模块时**不应被清空**。

#### 详情页视图统一 (Detail View Unification)
*   **视图复用**: 打开任何详情页（无论是"项目详情"还是"研究对象详情"），都必须渲染完整的 **Project Layout**。
    *   **L2 Sidebar**: 必须显示项目标准导航 (Navigation, Basis, Allocation, Model, etc.)。
    *   **Main Content**: 必须渲染 `ProjectLayout` 组件。
*   **上下文切换**: 点击 L1 侧边栏的标签图标时：
    1.  自动跳转到该标签所属的 L1 上下文（图标应根据模块区分，如项目显示 Kanban 图标，对象显示 Shield 图标）。
    2.  L2 Sidebar 默认选中 `Navigation`。

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
