# 历史 TC 冻结目录（LEGACY / READ-ONLY）

> 本目录仅用于历史追溯与兜底参考，不再维护。

## 当前执行依据（以此为准）
- `docs/system/rules.md`
- `docs/system/regression-triggers.md`
- `docs/system/regression-matrix-template.md`

## 目录定位
- `docs/qa/test-cases/`：跳转目录（无 TC 资产）
- `docs/qa/test-cases-samples/`：类型代表样本
- `docs/qa/_legacy_test-cases/`：冻结历史

## 冻结约束
- 不新增、不改写、不回填执行记录。
- 仅允许在删除前做一次归档操作。

## 删除条件（写死）
仅当以下条件同时满足，才允许删除本目录：
1. 连续 `2` 个迭代本目录无改动。
2. 连续 `2` 个迭代回归均由 `rules/triggers/matrix` 驱动。
3. 删除前创建归档 tag：`legacy-tc-freeze-YYYYMMDD`（例如 `legacy-tc-freeze-20260219`）。
