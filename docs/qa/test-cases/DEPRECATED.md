# DEPRECATED

`docs/qa/test-cases/` 已退化为跳转目录。  
回归执行统一以 `docs/system/` 下三份文档为准：

- `docs/system/rules.md`
- `docs/system/regression-triggers.md`
- `docs/system/regression-matrix-template.md`

## 冻结说明
- 历史 TC 已迁移到：`docs/qa/_legacy_test-cases/`（只读冻结）。
- 代表样本位于：`docs/qa/test-cases-samples/`。

## 删除条件（写死）
仅当以下条件同时满足，才允许删除 `docs/qa/_legacy_test-cases/`：
1. 连续 `2` 个迭代该目录无任何改动。
2. 近 `2` 个迭代回归执行完全由 `rules/triggers/matrix` 驱动，无旧 TC 依赖。
3. 删除前创建归档 tag：`legacy-tc-freeze-YYYYMMDD`（例如 `legacy-tc-freeze-20260219`）。
