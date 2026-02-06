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

#### 3. 研究对象详情页 (Enterprise Detail View)
*   **Trigger:** Click on an Enterprise row in `L1: Enterprise` List.
*   **Behavior Rule:**
    *   **Sidebar Card (Identity)**: A specialized blue card at the top of the L2 sidebar.
        *   **Content**: DISPLAYS the **Entity Name** (e.g., "Demonstration Window Co., Ltd.").
        *   **Persistence**: MUST remain **FIXED**. Changing L2 menu items NEVER changes this card's text.
    *   **Page Header (Context)**: The white top bar of the main content area.
        *   **Content**: DISPLAYS the **Active Menu Name** (e.g., "Project", "Info", "Locations").
        *   **Dynamic**: Updates instantly on L2 menu click to show functional context.
    *   **Default Selection**:
        *   Entering the detail view MUST default to **"Project"** (`ent_projects`).

    *   **Default Selection**:
        *   Entering the detail view MUST default to **"Project"** (`ent_projects`).

#### 4. 业务列表页 (Business List Views)
*   **Header Title Rule:**
    *   **L1 Background Data** -> Default Header: **"数据库管理" (Database Management)**
    *   **L1 Project Management** -> Default Header: **"全部项目" (All Projects)**
    *   **L1 Enterprise List** -> Default Header: **"全部研究对象" (All Research Objects)**
*   **Rationale:** The Header MUST always display the **Active Functional Context**, not the generic L1 category name.
*   **Visibility:** Only available in **Project Layout**.
*   **Function Lists:**
    *   **Left Group:** 信息 (Info), 产品 (Product), 数据 (Data), 数据源 (Source), 文档 (Docs), 地点 (Site).
    *   **Right Group:** 文献因子 (Lit Factor), 基本流 (Base Flow), 复合因子 (Comp Factor), 文献 (Literature), 元件 (Component).
*   **Auto-Close:** Switching **L1, L2, or L3** navigation **MUST** automatically close the open modal.
*   **Trigger:** Click ANY icon in the Footer.
    *   **Visual Logic:** Refer to `PROJECT_RULES.md` (Footer Modal Rules).
    *   **Title:** The Modal Title must **dynamically match** the name of the clicked footer button.
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

### C. L3 高级业务树 (L3 Advanced Tree)

> **核心职责 (Core Responsibility):** 执行严格的“血统权限控制”（自建 vs 继承），渲染 Product -> Phase -> Module -> Process 的四层结构。
> **Icon System:** 必须且只能使用 `@tabler/icons-react`。

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

### B. 继承与血统规则 (Inheritance & Lineage)

#### 1. 血统定义 (Lineage Definitions)
所有树节点必须标记 `origin` 属性以区分数据来源：
*   **自建 (self)**: 用户在当前核算/模型中手动创建的节点。
*   **继承 (inherited)**: 来源于模板、预定义模型或上游引用，用户仅具有有限的编辑权限。

#### 2. 权限与行为矩阵 (Permission Matrix)
根据 `origin` 决定节点的操作权限：

| 动作 | 🟢 自建节点 (origin: 'self') | 🔒 继承节点 (origin: 'inherited') | 备注 |
| :--- | :--- | :--- | :--- |
| **新增同级** | ✅ 允许 | ❌ 禁止 | 保护原有模型层级骨架 |
| **新增下级** | ✅ 允许 | ✅ 允许 | 继承节点下只能挂载自建子节点 |
| **删除/屏蔽** | ✅ **物理删除** | 🛡️ **屏蔽 (Screened)** | 继承节点不可物理消失 |
| **重置/同步** | ❌ (不适用) | ✅ 允许 | 仅当 `is_changed: true` 时可用 |
| **拖拽操作** | ✅ 允许移动 | ❌ 位置锁死 | 骨架节点不可移动位置 |

#### 3. 节点状态精细化 (Refined Status)
*   **常规 (Normal)**: `text-[#4D4D4D]`，继承节点未变更。
*   **被屏蔽 (Screened)**: `text-gray-400`，继承节点被标记为不参与核算（软删除）。
*   **被排除 (Excluded)**: `line-through text-gray-400`，因业务逻辑被显式排除计算。
*   **已新增 (Added)**: `text-emerald-600`，本次操作中新创建的自建节点。
*   **已变更 (Modified)**: `text-orange-500`，继承节点的属性已被修改。

#### 4. 核算状态与百分比 (Calc Status & Badge)
仅 **Process (过程)** 节点显示百分比仪表盘，逻辑如下：
*   **判定前提**: 排除“被屏蔽”、“被排除”、“拆分引用”节点。
*   **配置中 (pending)**: 显示 `- -%` (黄标 `bg-yellow-100`)。
*   **配置完成 (done)**: 显示 `具体数值%` (蓝标 `bg-blue-100`)。
*   **异常 (error)**: 显示 `- -%` (红标 `bg-red-100`)。

#### 5. 差异化对比 (Comparison/Diff Policy)
*   **严格限制**: 「L3-模型配置与结果」页面 (`acct_model_config`) 的左侧树状节点**禁止展示**任何与 Diff (差异对比) 相关的内容或视觉标识。
*   **专属页面**: 所有与 Diff 相关的数据详情和对比逻辑**仅在**「L3-对比标识详情」页面 (`cmp_detail`) 中展示。

#### 6. 树形交互与视觉逻辑 (Tree UI Logic)
*   **缩进与占位 (Indentation)**: 若节点不具备展开/收起功能（如 Product 或无子节点的 Process），则前面**禁止**留出三角图标的占位空间，内容整体左移。
*   **连线逻辑 (Lineage Lines)**: 引导线**仅**在 Phase (阶段) 和 Module (模块) 节点下方显示，用于引导其子节点。
*   **垂直对齐 (Vertical Alignment)**: Module 节点的图标必须与上级 Phase 的**图标**左侧垂直对齐；Process 节点的图标必须与上级 Module 的**图标**左侧垂直对齐。
*   **悬停逻辑 (Hover)**: 「过程」节点悬停时，**保留**百分比 Badge 显示，并在其左侧呼出“更多 (IconDots)”菜单。
*   **全黑规范 (Coloring)**: 常规状态下全树文本强制纯黑纹，禁止灰色。
