# 🧠 Product Logic & Interaction Spec (业务逻辑与交互剧本)

> **Role:** This document acts as the "State Machine" for the Single Page Application (SPA).
> **Responsibility:** Defines HOW the interface changes when users click.
> **Tech Stack:** Vanilla JavaScript (No Frameworks).

## 01. 核心状态定义 (Global State Machine)
The application has 3 primary view modes. JavaScript must toggle `hidden` classes to switch between them.

| Mode ID | 触发条件 (Trigger) | L2 状态 | L3 状态 | Main 内容区状态 | 备注 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **MODE_HOME** | L1 点击 "工作空间" | 隐藏 | **Hidden** | **Hidden** | **Dashboard View** | 纯净仪表盘 (No Header) |
| **MODE_L1_HEADER** | L1 点击 "背景/项目管理/企业" | 隐藏 | **Hidden** | **Visible** | **Dashboard View** | 顶部带 Header (16pt Title) |
| **MODE_WIDE** | L1 点击 "项目" -> L2 点击 "导航/基础/分配/模型" | **完整版** | **Hidden** | **Visible** | **Wide View** (撑满 w-full) | 适合表格/画布 |
| **MODE_SPLIT** | L1 点击 "项目" -> L2 点击 "核算" | **完整版** | **Visible** (Show) | **Split View** (被挤压 flex-1) | 核心核算页 |

---

## 02. 详细交互流程 (Interaction Flows)

### A. L1 侧边栏联动 (Global Navigation)
*   **Structure:**
    *   **Top Group (Dashboard Types):**
        *   User Profile (Avatar)
        *   Background Data (Database Icon)
        *   Project Management (Folder Icon)
        *   Enterprise/Objects (Building Icon)
    *   **Middle Group (Project Context):**
        *   **Project Tag (Green Document Icon):** This is the **ONLY** entry point to the "Project Layout" (L2 + L3 + Footer).
    *   **Bottom Group:**
        *   Notification Center (Bell)
        *   Settings (Gear)
        *   *Nothing else permitted here.*
*   **Interaction Logic:**
    *   **Mutually Exclusive:** Selection is strictly 1-of-N. Selecting "Project Tag" deselects "Background Data" and vice versa.
    *   **Dashboard Logic:** Clicking Top Group items switches the Main View to a **Dashboard Layout** (No L2, No L3, No Footer).
    *   **Project Logic:** Clicking "Project Tag" switches Main View to **Project Layout** (Has L2 bar, Has L3 sidebar, Has Footer).

### B. L2 业务切换 (Project Navigation)
*   **Visibility:** **ONLY** visible when "Project Tag" (L1) is active.
*   **Items:** Navigation, Basis, Allocation, Model, Accounting.
*   **Styling (Interaction):**
    *   **Active:** Icon Container = Cyan Bg (`#087F9C`) + White Icon. Label = Cyan Text (`#087F9C`).
    *   **Inactive:** Transparent Bg + Gray Icon + Gray Text.
*   **Header Sync:** The Top Header Title must update to show the **Name** of the active L2 item (e.g., "核算").
*   **Action:** Switches content within the Project Layout.
    *   *Accounting* -> `MODE_SPLIT`.
    *   *Others* -> `MODE_WIDE`.

### C. Footer 覆盖弹窗 (The Floating Panel)
*   **Visibility:** Only available in **Project Layout**.
*   **Function Lists:**
    *   **Left Group:** 信息 (Info), 产品 (Product), 数据 (Data), 数据源 (Source), 文档 (Docs), 地点 (Site).
    *   **Right Group:** 文献因子 (Lit Factor), 基本流 (Base Flow), 复合因子 (Comp Factor), 文献 (Literature), 元件 (Component).
*   **Auto-Close:** Switching **L1, L2, or L3** navigation **MUST** automatically close the open modal.
*   **Trigger:** Click ANY icon in the Footer.
    *   **Visual Logic:**
    *   **Layout:** The Modal (`#footer-modal`) floats *above* the Header, L3, and Content. Only the L2 Sidebar and Footer remain visible outside it.
    *   **Position:** `absolute top-0 left-0 bottom-[40px] right-0` relative to the `#right-zone`.
    *   **Styling:** Must look like a floating window with a **4px Cyan border** (`border-[#087F9C]`).
    *   **Title:** The Modal Title must **dynamically match** the name of the clicked footer button.
    *   **L3 Menu:** Background must be pure white (`bg-white`).
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
*   `compass` **导航** (Nav)
*   `server` **基础** (Basis)
*   `git-branch` **分配** (Alloc)
*   `box` **模型** (Model)
*   `calculator` **核算** (Acct) - *Triggers L3 Sidebar*

### C. L3 核算树形菜单 (Accounting Tree)
*仅在 L2="核算" 时显示。*

#### **Group 1: 核算 (Accounting)**
*   `file-text` **基本信息** (Basic Info) `key: acct_basic`
*   `settings` **模型配置与结果** (Config) `key: acct_config`
*   `calculator` **分析工具** (Tools) `key: acct_tools`
*   `bar-chart-3` **计算与分析** (Calc) `key: acct_calc`

#### **Group 2: 透视 (Perspective)**
*   `database` **活动数据** (Activity Data) `key: pers_activity`
*   `share-2` **因子数据** (Factor Data) `key: pers_factor`

#### **Group 3: 生成报告 (Report)**
*   `file-text` **报告信息** (Info) `key: rpt_info`
*   `upload` **导出数值** (Export) `key: rpt_export`
*   `file-box` **报告** (Main Report) `key: rpt_main`
*   `book-open` **凭证管理** (Vouchers) `key: rpt_voucher`
*   `file-text` **计算表** (Sheet) `key: rpt_sheet`

#### **Group 4: 对外申请 (Application)**
*   `share-2` **CPCD信息** (CPCD Info) `key: app_cpcd`

#### **Group 5: 对比 (Comparison)**
*   `file-text` **对比核算列表** (List) `key: cmp_list`
*   `settings` **对比配置调整** (Config) `key: cmp_config`
*   `file-box` **对比标识详情** (Detail) `key: cmp_detail`
*   `bar-chart-3` **对比分析结果** (Result) `key: cmp_result`

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