# 用例信息
- 用例ID：`TC-AppNavigation-Regression-001`
- 页面/模块：全局导航（L1/L2/L3 + URL 同步）
- 用例标题：导航主链路回归（矩阵执行）
- 优先级：`P0`
- 前置条件：
  - 启动开发环境 `npm run dev`
  - 浏览器可访问应用首页
- 测试数据：
  - 至少存在 1 条项目数据与 1 条服务企业数据

## 测试步骤
1. 按 `docs/qa/navigation-regression-matrix.md` 依次执行 `NAV-P0-001` 至 `NAV-P0-010`。
2. 记录每条场景的执行结果与失败截图/日志。
3. 将结果同步回填至 `docs/qa/acceptance-checklist.md` 与 `docs/qa/stage-review-log.md`。

## 预期结果
1. 全部 `NAV-P0-*` 场景执行通过。
2. 未出现白屏、死循环跳转、URL 与页面状态错位。
3. 如存在失败项，能够提供完整复现信息并定位到相关代码文件。

## 结果记录
- 执行日期：
- 执行人：
- 执行结果：`Pass / Fail / Blocked`
- 缺陷链接：
- 备注：
