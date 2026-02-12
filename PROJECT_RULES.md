# Project Development Rules

## 1. Interaction & Interface Development
*   **Mandatory Workflow**: All changes related to UI (Interface) or UX (Interaction) MUST follow the **Interaction & Interface Development Workflow** (`.agent/workflows/交互与界面开发工作流.md`).
*   **Avoidance Guide**: Adherence to the **Experience Review & Avoidance Guide** (`经验复盘与避坑指南.md`) is required before implementation.

## 2. Footer Model 统一规则
*   `产品 / 数据 / 数据源 / 地点 / 文献因子 / 基本流 / 复合因子 / 文献 / 元件` 默认展示表格视图。
*   双击表格行进入“卡片列表详情视图”。
*   详情右侧顶部栏点击“收起”必须返回表格视图。
*   `文献因子 / 基本流 / 复合因子 / 文献 / 元件` 与 `L1 背景数据` 的 `L2` 菜单复用同一份数据源。
*   `产品 / 数据 / 数据源 / 地点` 与 `L1 服务企业/研究对象` 业务菜单复用同一份数据源。

## 3. ContentModule 样式铁律
*   `ContentModule` 必须通过 `type` 区分两类样式：
    - `detail`: 有标题栏（`ModuleHeader`）的详情模块。
    - `global`: 无标题栏的全局信息模块。
*   `type="auto"` 为默认行为：检测到 `ModuleHeader` 自动判定为 `detail`，否则判定为 `global`。
*   禁止再在业务页面自行拼装“看起来像内容模块”的样式容器替代 `ContentModule`。
*   禁止给内容模块写死高度；高度必须由内容撑开（`h-auto / h-fit`）。
*   任何模块内部弹出元素（tooltip、下拉、工具栏）必须可见，禁止容器裁切。

## 4. 状态标签统一规则
*   全站状态展示统一使用 `StatusChip`（`src/components/common/StatusChip.jsx`），禁止页面内再写一套临时状态 badge。
*   状态视觉映射统一走 `qy-status-chip` 及其语义变体（`success / processing / warning / danger / neutral`）。
*   非状态型标签（如交易类型）统一使用 `qy-type-chip`，保持字重、圆角、边框风格一致。
