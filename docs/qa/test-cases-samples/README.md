# TC 样本库（仅参考）

> 目的：保留少量代表性样本，帮助快速理解历史测试写法。  
> 注意：本目录不是主执行资产，不要求持续逐条维护。

## 样本选择原则
- 只保留类型代表性，不追求页面覆盖率。
- 覆盖类型：`page / create / footer / drawer / regression`。

## 当前样本（8条）
- `TC-AppNavigation-Regression-001.md`（regression）
- `TC-WorkbenchHomePage-001.md`（page，入口跳转）
- `TC-DocumentPage-001.md`（page，列表/详情/创建）
- `TC-CreateDatabaseManagementPage-001.md`（create，高风险校验）
- `TC-CreateBasicFlowPage-001.md`（create，基础创建链路）
- `TC-BasicFlowFooter-001.md`（footer，列表/详情/创建）
- `TC-DocumentFooter-001.md`（footer，无创建入口变体）
- `TC-AccountingDrawer-Overview-001.md`（drawer）

## 执行依据
- 回归执行以 `docs/system/rules.md`、`docs/system/regression-triggers.md`、`docs/system/regression-matrix-template.md` 为准。
