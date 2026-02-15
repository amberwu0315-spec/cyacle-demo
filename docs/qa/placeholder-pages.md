# 占位/半成品页面台账

> 目标：标记当前“可演示但未实装”的页面或模块，避免在评审时误判为完整功能。

## 状态定义
- `placeholder`：结构占位，业务数据/交互尚未落地。
- `partial`：主流程可跑通，但部分模块仍为模拟数据或简化实现。
- `done`：已完成实装（从本表移除即可）。

## 当前清单
| 路径 | 状态 | 现状说明 | 下一步 |
|---|---|---|---|
| `src/components/views/Dashboard.jsx` | placeholder | 仪表盘为静态展示块，未接入真实业务模块。 | 后续按真实首页组件替换。 |
| `src/components/views/BusinessContent.jsx` | partial | 未识别的 `target` 会落入“开发中”占位页。 | 新增业务目标时同步补齐映射与渲染器。 |
| `src/components/views/shared/EntityMasterDetailPage.jsx` | partial | 默认 `sections` 为占位文案，依赖业务页覆盖。 | 各业务页逐步替换为真实详情模块。 |
| `src/components/views/detail/ProjectDetailView.jsx` | placeholder | 项目详情为示意结构，非完整业务页。 | 若恢复使用该页，需补齐表单与动作链路。 |
| `src/components/views/l3/AccountingCalc.jsx` | placeholder | 图表区块为白板占位，未接入真实计算结果。 | 对接核算结果数据后替换占位块。 |
| `src/components/views/l3/AccountingTools.jsx` | partial | 页面可用，但大量依赖本地模拟数据与简化逻辑。 | 迭代时按模块逐项替换模拟数据。 |
| `src/components/views/accounting/components/L3AdvancedTree.jsx` | partial | 无数据时展示“暂无数据结构”占位提示。 | 引入真实结构数据后完善空态策略。 |

## 维护规则
- 每次将占位项转为实装后，必须同步更新：
  - `docs/qa/placeholder-pages.md`
  - `docs/qa/page-inventory-55.md`
  - 对应用例文件（`docs/qa/test-cases/`）
