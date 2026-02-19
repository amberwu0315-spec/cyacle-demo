# TC-CreateLiteratureFactorPage-001

## 用例信息
- 用例ID：TC-CreateLiteratureFactorPage-001
- 页面/模块：CreateLiteratureFactorPage
- 用例标题：文献因子创建页可进入并取消返回
- 优先级：P0
- 前置条件：
  - 应用可正常启动
  - 当前账号可进入 L1 背景数据 -> L2 文献因子
- 测试数据：无需新增数据

## 测试步骤
1. 进入文献因子列表页。
2. 点击创建进入创建页。
3. 点击取消返回列表。

## 预期结果
1. 列表页展示正常。
2. 可进入文献因子创建页。
3. 取消后可返回列表页。

## 结果记录
- 执行日期：2026-02-14
- 执行人：Codex（Playwright UI 回归）
- 执行结果：Pass
- 缺陷链接：
- 备注：创建入口与取消返回链路通过。
