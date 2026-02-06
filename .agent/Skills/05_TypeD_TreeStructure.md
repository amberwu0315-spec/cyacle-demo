# Skill 05: L3 Advanced Tree (L3 高级业务树) v2.1

## 1. 核心定义 (Identity)

* **类型:** Type D (Recursive Business Tree)
* **核心职责:** 渲染 Product -> Phase -> Module -> Process 的四层结构，并执行严格的“血统权限控制”（自建 vs 继承）。
* **适用场景:** 核算模型配置、BOM 结构管理、多态数据对比。

## 2. 技术栈铁律 (Strict Tech Stack)

> **警告:** 违反以下规则将导致运行时白屏或构建失败。

| 维度 | 强制规则 | 代码映射 |
| --- | --- | --- |
| **图标库** | **必须且只能**使用 `@tabler/icons-react`。 | `import { IconPackage, ... } from '@tabler/icons-react'` |
| **导出规范** | **必须**使用 `export default`。 | `export default function L3AdvancedTree...` |
| **防御渲染** | **必须**校验数据存在性。 | `if (!data) return <Placeholder />` |
| **内容限制** | **严禁**在配置页面 (`acct_model_config`) 渲染 Diff 相关逻辑。 | 对比逻辑仅限 `cmp_detail` 页面使用。 |
| **样式方案** | Tailwind CSS Utility Classes。 | 允许使用动态 style 计算 Padding。 |

## 3. UI 工程规范 (UI Engineering Specs) v2.1

> **核心变更:** 引入“轨道对齐”策略与像素级尺寸约束。

### A. 容器与尺寸 (Container & Dimensions)

* **布局模式:** Flexbox (`flex items-center`)
* **高度约束:**
    * **Level 0 (核算产品):** `36px` (`h-[36px]`) —— *强调根节点权重*
    * **Level 1+ (阶段/模块/过程):** `32px` (`h-[32px]`) —— *标准行高*
* **内边距 (Padding):**
    * 水平: `8px` (`px-2`)
    * 垂直: `6px` (`py-1.5`) —— *控制 Hover 色块呼吸感*
* **圆角:** `4px` (`rounded`)

### B. 内部元素布局 (Inner Layout)

从左至右严格排列：

1.  **箭头容器 (Arrow Box)**
    * **尺寸:** `20px × 20px` (固定)
    * **内容:** `8px` 三角形图标 (居中)
    * **右间距:** `2px` (`mr-0.5`)
    * **逻辑:** 非产品节点**常驻显示**。无子级时显示灰色空箭头；Process 节点显示空白占位以保持对齐。

2.  **业务图标 (Icon Box)**
    * **尺寸:** `16px × 16px` (固定)
    * **右间距:** `8px` (`mr-2`)

3.  **节点名称 (Label)**
    * **排版:** `text-sm` (14px), `leading-none`
    * **修正:** `pt-[1px]` (确保在 32px 高度内视觉绝对居中)

4.  **右侧操作区 (Right Actions)**
    * **更多菜单 (Three Dots):**
        * 尺寸: `14px × 14px`
        * 位置: 紧贴 Badge 左侧 (`mr-[2px]`)
        * 触发: 仅 `group-hover` 显示
    * **百分比标签 (Badge):**
        * 位置: 最右侧 (`ml-auto`)
        * 排版: `text-[10px] font-mono`
        * 内边距: `px-1.5 py-0.5`

### C. 阶梯缩进与对齐 (Indentation - Rail Alignment)

采用**轨道对齐 (Rail Alignment)** 策略，而非简单的倍数缩进。

| 层级 | 外部缩进 (Margin-Left) | 对齐逻辑 | 计算公式 |
| --- | --- | --- | --- |
| **Level 0 (Product)** | `0px` | 内容始于容器内部 Padding (8px) | 基准 |
| **Level 1 (Phase)** | `8px` | 左边缘对齐 Level 0 的**图标左边缘** | L0 Padding (8px) |
| **Level 2+** | `上级 + 20px` | 整体右移一个“箭头容器”宽度 | Prev Margin + 20px |

### D. 连接线规范 (Guide Line)

*仅在展开且有子节点时显示的垂直辅助线。*

* **水平位置 (Left):** `当前 Margin-Left + 10px - 0.5px`
    * *注: 10px 为箭头容器中心，-0.5px 为像素居中修正*
* **垂直起始 (Top):**
    * 父级为 Product: `36px`
    * 父级为其他: `32px`
* **垂直结束 (Bottom):** `10px` (底部留白，不贯穿，避免粘连下一行)
* **样式:** `w-[1px] bg-gray-200`

## 4. 视觉逻辑真值表 (Visual Truth Table)

### A. 图标映射系统 (Icon Mapping)

| 节点类型 | 基础图标 (Tabler) | 样式修饰 |
| --- | --- | --- |
| **Product** | `IconPackage` | - |
| **Phase** | `IconPlayerPause` | 必须添加 `rotate-90` (旋转90度) |
| **Module** | `IconLayoutGrid` | - |
| **Process** | `IconBox` | - |

### B. 颜色与交互态 (Colors & States)

| 状态 | 样式规则 | 备注 |
| --- | --- | --- |
| **默认** | 文字 `gray-900` | **严禁使用灰色文字** (除非被屏蔽) |
| **Hover** | 背景 `gray-50` | - |
| **Selected** | 背景 `#087F9C`, 文字 `White` | **注意:** 选中高亮区与左侧引导线必须保持 **4px** 物理间距 |
| **Screened** | 图标增加 `IconCircleOff` 遮罩 | 透明度 60% |
| **Excluded** | 文字 `gray-400` + `line-through` | - |

### C. 百分比仪表盘 (Percentage Badge)

> **显示前提:** 仅 Process 节点显示，且**排除**以下情况：被屏蔽、被排除、拆分引用(Split Ref)。

| 状态 | 判定逻辑 | 样式 (Tailwind) | 内容 |
| --- | --- | --- | --- |
| **配置中** | `calc_status === 'pending'` | `bg-yellow-100 text-yellow-700` | 空值 (`- -%`) |
| **配置完成** | `calc_status === 'done'` | `bg-blue-100 text-blue-700` | 具体数值 (保留2位小数) |
| **异常** | `calc_status === 'error'` | `bg-red-100 text-red-700` | 空值 (`- -%`) |

## 5. 权限与行为矩阵 (Permission & Behavior)

> 核心逻辑：操作前必须校验 `node.origin`。

### A. 血统权限 (Lineage Rules)

| 动作 | 🟢 自建节点 (origin: 'self') | 🔒 继承节点 (origin: 'inherited') |
| --- | --- | --- |
| **新增同级** | ✅ 允许 | ❌ 禁止 |
| **新增下级** | ✅ 允许 | ✅ 允许 (下级只能是自建) |
| **删除/屏蔽** | ✅ **删除** (物理消失) | 🛡️ **屏蔽** (软删除 `screened`) |
| **重置/同步** | ❌ (无此概念) | ✅ 允许 (仅当 `is_changed: true`) |
| **拖拽操作** | ✅ 只有它可以移动 | ❌ 位置锁死 |

### B. 拖拽物理定律

1.  **自建入继承:** ✅ 允许。
2.  **继承入自建:** ❌ **绝对禁止**。
3.  **核算产品:** ❌ 不可拖拽。

## 6. 交互触发规范

* **点击箭头:** `onToggle` (仅折叠/展开，不触发选中，Product 禁止折叠)。
* **单击整行:** `onSelect` (右侧面板加载)。
* **双击整行:** `onRename` (仅限有权限节点)。
* **悬停 (Hover):** 显示 `[+]` 和 `[...]` 操作图标；**特例**：Process 节点悬停时隐藏百分比 Badge。