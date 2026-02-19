# TC-AccountingDrawer-Methodology-001

## 用例信息
- 用例ID：TC-AccountingDrawer-Methodology-001
- 页面/模块：AccountingPage Drawer: acct_methodology
- 用例标题：核算页方法学抽屉可打开关闭
- 优先级：P0
- 前置条件：
  - 应用可正常启动
  - 当前账号可进入 L1 项目标签 -> L2 核算
- 测试数据：无需新增数据

## 测试步骤
1. 进入核算页面。
2. 点击 Header 的方法学设置。
3. 关闭抽屉。

## 预期结果
1. 页面展示正常。
2. 方法学抽屉成功打开。
3. 抽屉可关闭且页面交互恢复。

## 结果记录
- 执行日期：2026-02-14
- 执行人：Codex（Playwright UI 回归）
- 执行结果：Pass
- 缺陷链接：
- 备注：Drawer 打开/关闭链路通过。
