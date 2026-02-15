# 导航回归矩阵（P0）

## 1. 目的
用于覆盖 `AppNavigationContext` 主链路的高风险回归场景，确保以下行为稳定：
- L1/L2/L3 切换
- 浏览器前进/后退
- URL 参数与页面状态同步
- 刷新恢复与非法参数兜底

## 2. 适用范围
- 代码涉及以下任一文件时必须执行：
  - `src/context/AppNavigationContext.jsx`
  - `src/components/layout/Workbench.jsx`
  - `src/components/views/MainContent.jsx`
  - `src/components/views/BusinessContent.jsx`
  - `src/components/views/ProjectLayout.jsx`
  - `src/components/layout/L1Sidebar.jsx`
  - `src/components/layout/L2Sidebar.jsx`

## 3. 执行前置
- 本地运行 `npm run dev`
- 清空或记录当前 `localStorage`（避免历史脏状态误导）
- 使用同一浏览器窗口执行完整链路（包含前进/后退）

## 4. P0 场景矩阵
| 用例ID | 场景 | 操作步骤（简） | 预期结果 |
|---|---|---|---|
| NAV-P0-001 | L1 基础切换 | `workspace -> background_data -> project_mgmt -> enterprise` | 页面均可达；URL 中 `l1` 与当前一致；无白屏/报错 |
| NAV-P0-002 | L2 菜单切换 | 在 `background_data` 连续切换 `database_mgmt/components/factors_literature` | URL 中 `target` 同步；标题与内容同步更新 |
| NAV-P0-003 | 项目详情 Tab 打开 | 在 `project_mgmt` 列表打开一个项目详情 Tab | 生成 `detail_*` 目标；进入项目详情视图；Tab 可见 |
| NAV-P0-004 | 服务企业详情 Tab 打开 | 在 `enterprise` 列表打开一个企业详情 Tab | 进入 `ent_*` 详情路由；左侧菜单和标题正确 |
| NAV-P0-005 | Tab 关闭回退 | 关闭当前激活的详情 Tab | 自动回到对应 L1 默认目标（非空白态） |
| NAV-P0-006 | 浏览器后退/前进 | 在项目详情内切换多个 L2/L3 后执行浏览器后退/前进 | 视图状态与 URL 一致回放；无错位 |
| NAV-P0-007 | 刷新恢复 | 在任意业务页面刷新 | 刷新后停留在同一可达页面；参数与展示一致 |
| NAV-P0-008 | 非法 URL 参数兜底 | 手动输入非法 `l1/l2/target` 参数并回车 | 自动回退到可用默认页，不出现不可恢复状态 |
| NAV-P0-009 | 跨 L1 深链跳转 | 从工作台卡片跨 L1 跳转到目标页面 | 目标页面正确落位，`l1/l2/target` 组合有效 |
| NAV-P0-010 | 角色切换兜底 | 切换角色后访问受限目标 | 自动落到该角色允许的页面，无死循环跳转 |

## 5. 记录要求
- 结果回填到：
  - `docs/qa/acceptance-checklist.md`
  - `docs/qa/stage-review-log.md`
- 若失败，必须记录：
  - 失败用例ID
  - 复现步骤
  - 预期/实际差异
  - 关联代码文件
