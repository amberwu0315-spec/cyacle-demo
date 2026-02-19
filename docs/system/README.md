# 个人回归护栏系统

## 目标
- 在半成品和高频迭代阶段，用低维护成本保证核心质量。
- 不再以“维护大量 TC”为核心，而以“规则 + 触发器 + 轻量矩阵”为核心。

## 目录
- `docs/system/rules.md`：规则库（判断标准，最高优先级）
- `docs/system/regression-triggers.md`：改动触发器（决定这次测什么）
- `docs/system/regression-matrix-template.md`：执行载体（勾选+备注）

## 每次迭代怎么用（5 分钟启动）
1. 标记本次改动类型（导航/创建/校验/权限/全局组件等）。
2. 打开 `regression-triggers.md` 找到对应行，得到必回归范围与规则编号。
3. 复制 `regression-matrix-template.md`，只勾选本次涉及项并补 1 行备注。
4. 执行高收益自动检查：`npm run check:navigation`、`npm run check:qa-freeze`。
5. 提测前执行快速兜底：`npm run qa:quick`。

## 升级机制（小步快跑）
- 每次迭代只做：
  - 新增或修订 `1-2` 条规则；或
  - 清理 `1-2` 个反模式。
- 不做整套重写；先保证规则可执行、可检查，再逐步扩展。

## 与旧 TC 的关系
- `docs/qa/test-cases/` 现在是跳转目录，不再存放 TC 资产。
- 历史 TC 冻结在 `docs/qa/_legacy_test-cases/`（只读）。
- 样本 TC 位于 `docs/qa/test-cases-samples/`。
- 现在以 `docs/system` 下三份文档为准。
