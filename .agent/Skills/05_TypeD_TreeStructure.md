---
name: 层级树规范
description: 用于维护 Cyacle 项目中树形结构、层级导航和状态指示条的规范。
---

# Cyacle 层级与树形菜单 (Hierarchy Tree) 规范

此 Skill 涵盖了 L3 菜单树、状态节点树以及层级关系的可视化规范。

## 01. 物理结构 (Anatomy)

- **引导线 (Guide Line)**: 左侧必须包含 `1px` 垂直线，颜色 `#D6D9DC`。
- **缩进法则**: 每增加一级嵌套，`padding-left` 增加 `24px` (`pl-6`)。
- **高度约束**: 菜单项固定高度为 `30px`。

## 02. 状态指示条 (Indicator Strip)

在节点行最右侧（`absolute right-0`）必须包含 **3px 宽的内容状态指示条**。

## 03. 全量状态机 (Full State Machine)

| 状态 | 文本样式 | 装饰/指示条 |
| :--- | :--- | :--- |
| **Stable (正常)** | `#4D4D4D` | 默认图标 |
| **Modified (变更)** | `#F97316` (Oragne) | 橙色指示条 |
| **Added (新增)** | `#10B981` (Green) | 绿色指示条 |
| **Deleted (删除)** | `gray-400` + 中划线 | 红色指示条 |
| **Excluded (排除)** | `black` + 中划线 | 透明/无指示条 |

## 04. 交互热区 (Interaction Hotspots)
- **图标区 (Arrow)**: 仅触发 `toggleExpand()` (展开/收起)。
- **复选框区**: 触发多选逻辑。
- **文字主体区**: 触发右侧主内容刷新。
