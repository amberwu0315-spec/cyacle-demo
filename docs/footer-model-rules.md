# Footer Model 交互与数据规则

## 交互
- 默认是表格视图。
- 双击任意行进入卡片列表详情视图。
- 详情右侧顶部“收起”返回表格视图。

## 数据
- 企业侧菜单（产品、数据、数据源、地点）统一来自 `footerEnterpriseSharedData`。
- 背景数据菜单（文献因子、基本流、复合因子、文献、元件）统一来自 `footerBackgroundSharedData`。
- `L1` 和对应 `L2` 只维护一份数据，禁止复制冗余。

## 内容模块
- 当前阶段仅实现模块骨架。
- 业务字段以“模块占位：后续补充业务内容”占位。

## ContentModule 统一规范
- 有标题（`ModuleHeader`）的模块使用详情样式（detail）。
- 无标题模块使用全局样式（global）。
- 默认 `type="auto"` 自动判定，避免页面级重复定义样式。

## 标签样式规范
- 状态标签统一使用 `StatusChip` 组件，避免各页面重复维护样式。
- 状态语义统一映射为：`success / processing / warning / danger / neutral`。
- 非状态型标签（如交易类型）统一使用 `qy-type-chip` 样式族。
