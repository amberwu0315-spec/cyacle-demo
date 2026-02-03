# 🧠 Product Logic & Interaction Spec (业务逻辑与交互剧本)

> **Role:** This document acts as the "State Machine" for the Single Page Application (SPA).
> **Responsibility:** Defines HOW the interface changes when users click.
> **Tech Stack:** Vanilla JavaScript (No Frameworks).

## 01. 核心状态定义 (Global State Machine)
The application has 3 primary view modes. JavaScript must toggle `hidden` classes to switch between them.

| Mode ID | 触发条件 (Trigger) | L2 状态 | L3 状态 | Main 内容区状态 | 备注 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **MODE_HOME** | L1 点击 "工作空间" | 隐藏 | **Hidden** | **Hidden** | **Dashboard View** | 纯净仪表盘 (No Header) |
| **MODE_MANAGEMENT** | L1 点击 "背景/项目管理/企业" | **Visible** | **Hidden** | **Visible** | **Admin/Mgmt View** | 全屏管理视图，带L2侧边栏，复用业务实体。 |
| **MODE_WIDE** | L1 点击 "项目" -> L2 点击 "导航/基础/分配/模型" | **完整版** | **Hidden** | **Visible** | **Wide View** (撑满 w-full) | 适合表格/画布 |
| **MODE_SPLIT** | L1 点击 "项目" -> L2 点击 "核算" | **完整版** | **Visible** (Show) | **Split View** (被挤压 flex-1) | 核心核算页 |

---

## 02. 详细交互流程 (Interaction Flows)

### A. L1 侧边栏联动 (Global Navigation)
*   **Structure**: (See `design_system.md` for visual layout)
    *   **Top Group**: Dashboard Types (Workspace, Background, Project, Enterprise).
    *   **Middle Group**: Project Context (Project Tag).
    *   **Bottom Group**: Utilities (Notifications, Settings).
*   **Interaction Logic:**
    *   **Mutually Exclusive:** Selection is strictly 1-of-N.
    *   **Dashboard Logic:** Top Group -> Dashboard Layout.
    *   **Project Logic:** Project Tag -> Project Layout.

### B. L2 导航体系 (Navigation Systems)

#### 1. 项目上下文中 (Project Context)
*   **Trigger:** L1 = "Project Tag"
*   **Items:** Navigation, Basis, Allocation, Model, Accounting.
*   **Layout:** Standard L2 + L3 (optional) + Footer.

#### 2. 背景数据管理中 (Background Data Management)
*   **Trigger:** L1 = "Background Data"
*   **Items:** **Database Management** + **Shared Business Entities** (Components, Factors, etc.).
*   **Logic (Dual Entry Pattern):**
    *   这里的菜单项与 **Footer** 中的"右侧业务组"是**同一套实体**。
    *   **区别**: 
        *   此处是**管理视图** (全屏维护，增删改查)。
        *   Footer是**引用视图** (弹窗选择，项目内使用)。
    *   **Default**: 默认选中 "Database Management"。

### C. Footer 覆盖弹窗 (The Floating Panel)
*   **Visibility:** Only available in **Project Layout**.
*   **Function Lists:**
    *   **Left Group:** 信息 (Info), 产品 (Product), 数据 (Data), 数据源 (Source), 文档 (Docs), 地点 (Site).
    *   **Right Group:** 文献因子 (Lit Factor), 基本流 (Base Flow), 复合因子 (Comp Factor), 文献 (Literature), 元件 (Component).
*   **Auto-Close:** Switching **L1, L2, or L3** navigation **MUST** automatically close the open modal.
*   **Trigger:** Click ANY icon in the Footer.
    *   **Visual Logic:** Refer to `PROJECT_RULES.md` (Footer Modal Rules).
    *   **Title:** The Modal Title must **dynamically match** the name of the clicked footer button.
*   **Interaction Logic:**
    *   **Active State:** The clicked footer button must show an active state.
    *   **Toggle:** Clicking active button closes the modal.

---

## 03. 数据结构映射 (Data Schema)

> **核心职责 (Core Responsibility):**
> 此处定义所有导航菜单的完整列表、中文名称、ID以及对应的图标语义。
> **Icon System:** 使用 Lucide React Icons。

### A. L1 全局侧边栏 (Global Sidebar)
> **Universal Tooltip Rule**: All icons MUST display a tooltip on hover with the format "Name (English Name)".

*   **Top Group (核心入口)**
    *   `user-circle-2` **工作空间** (Workspace)
    *   `database` **背景数据** (Background Data)
    *   `folder-kanban` **项目管理** (Project Management)
    *   `building-2` **企业/对象** (Enterprise/Objects)
*   **Project Context (项目环境)**
    *   `file-code` **项目标签** (Project Tag) - *Unique Entry Point for L2/L3*
*   **Bottom Group**
    *   `bell` **通知中心** (Notifications)
    *   `settings` **设置** (Settings)

### B. L2 业务功能条 (Project Navigation)
### B. L2 业务功能条 (Project Navigation)
*   `compass` **导航** (Nav)
*   `server` **基础** (Basis)
*   `git-branch` **分配** (Alloc)
*   `box` **模型** (Model) - *Triggers Model Level Sidemenu (Dimension B)*
*   `calculator` **核算** (Acct) - *Triggers Accounting Level Sidemenu (Dimension A)*

### C. L3 多维树形菜单 (Multi-Level Tree)

> **New Logic:** The menu structure now depends on the Active L2 Item (Dimension) and Content Mode.

#### **Dimension A: 核算层级 (Accounting Level)**
*Triggered when L2 = "Accounting"*

**Group 1: 核算 (Accounting)**
*   `file-text` **基本信息** (Basic Info) `key: acct_basic`
*   `settings` **模型配置与结果** (Model Config & Results) `key: acct_model_config`
*   `calculator` **分析工具** (Tools) `key: acct_tools`
*   `bar-chart-3` **计算与分析** (Calc) `key: acct_calc`
*   `database` **透视-活动数据** (Pers: Activity) `key: acct_pers_activity` *Shared Component*
*   `share-2` **透视-因子数据** (Pers: Factor) `key: acct_pers_factor` *Shared Component*

**Group 2: 产出 (Output)**
*   `file-text` **报告信息** (Info) `key: rpt_info`
*   `upload` **导出数值** (Export) `key: rpt_export`
*   `book-open` **凭证管理** (Vouchers) `key: rpt_voucher`
*   `file-text` **计算表** (Sheet) `key: rpt_sheet`
*   `share-2` **申请单-CPCD** (CPCD) `key: app_cpcd`

**Group 3: 附加 (Additional)**
*   `file-text` **对比列表** (Comparison List) `key: cmp_list`
*   `settings` **配置调整** (Config) `key: cmp_config`
*   `file-box` **标识详情** (Detail) `key: cmp_detail`
*   `bar-chart-3` **分析结果** (Result) `key: cmp_result`

#### **Dimension B: 模型层级 (Model Level)**
*Triggered when L2 = "Model"*

**Group 1: 核算 (Accounting)**
*   `file-text` **基本信息** (Basic Info) `key: mod_basic`
*   `settings` **模型配置** (Model Config) `key: mod_model_config` *Distinct from Accounting Level*

**Group 2: 透视 (Perspective)**
*   `database` **活动数据** (Activity Data) `key: mod_pers_activity` *Shared Component*
*   `share-2` **因子数据** (Factor Data) `key: mod_pers_factor` *Shared Component*

### D. Footer 底部功能表 (Entity Properties)
*点击触发底部 Modal 弹窗。*

#### **Left Group (Entity Info)**
*   `building` **信息** (Info)
*   `package` **产品** (Product)
*   `database` **数据** (Data)
*   `server` **数据源** (Source)
*   `file-box` **文档** (Docs)
*   `map-pin` **地点** (Site)

#### **Right Group (Traceability)**
*   `network` **文献因子** (Lit Factor)
*   `workflow` **基本流** (Base Flow)
*   `layers` **复合因子** (Comp Factor)
*   `book-open` **文献** (Literature)
*   `cpu` **元件** (Component)

---

## 04. 业务逻辑规则 (Business Rules)

### A. 表单字段逻辑 (Form Field Logic)

#### 1. 分析设置 (Analysis Settings)
*   **强制启用字段 (Mandatory Fields)**:
    *   **数据质量打分 (Data Quality Score)**: 必须始终开启 (`Checked`) 且不可更改 (`Disabled`)。
        *   *业务原因*: 系统核心算法依赖，不可关闭。
        *   *Tooltip*: "作用：根据参数的数据评分，计算出整体产品碳排放计算质量评分的方法；"
    *   **重要问题识别 (Important Issue Identification)**: 必须始终开启 (`Checked`) 且不可更改 (`Disabled`)。
        *   *业务原因*: 报告合规性要求，必须展示。
        *   *Tooltip*: "作用：展示并说明对产品碳足迹排放影响最大的模块的方法；"