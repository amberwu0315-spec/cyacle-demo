# 测试用例入口（跳转目录）

> 本目录只保留导航说明，不再存放或维护页面级 TC 文件。

## 当前执行依据（主）
- `docs/system/rules.md`
- `docs/system/regression-triggers.md`
- `docs/system/regression-matrix-template.md`

## 参考目录（辅）
- 样本：`docs/qa/test-cases-samples/`
- 冻结历史：`docs/qa/_legacy_test-cases/`

## 使用约束
- 不在本目录新增 TC 文件。
- 新增需求优先更新规则/触发器/矩阵，不新增成批 TC。
- 结构护栏命令：`npm run check:qa-freeze`（发现误放文件会直接失败）。
