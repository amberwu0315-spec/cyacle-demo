## 02. 🏗️ 全局导航骨架 (App Shell & Layout)

> **核心设计理念 (Core Concept):**
> 采用 **"Sidebar + Floating Workbench"** 结构。
> L1 是深色底座，占据左侧。
> 剩余所有内容（L2, L3, Header, Footer, Main）被包裹在一个 **"Workbench Container" (工作台大容器)** 中。
> 该容器悬浮于底座之上，四周留有间隙。

### 1. 📐 容器结构定义 (Container Structure)

#### **Layer 1: 视口底座 (Viewport Base)**
* **Body:** `bg-[#1E2A32]` (深色背景，与 L1 同色，作为整个页面的物理底层)。
* **L1 Global Nav:**
    * 定位：`fixed left-0 top-0 bottom-0`
    * 定位：`fixed left-0 top-0 bottom-0`
    * 宽度：**自适应** (由内容决定, 约 56px)
    * 间距：左右各 **4px** (`px-1`)，内容居中。
    * 内容：
        * Top: 5个白色图标，顶部对齐 (Top: 16px, Bottom: 24px)。
        * Spacing: 菜单间距 2px；分割线上下各 4px。
        * Bottom: 通知图标 + 用户头像 (mt-auto 底部对齐, 间距 2px)。

#### **Layer 2: 悬浮工作台 (The Floating Workbench)**
* **定义：** 这是一个包含 L2、Header、L3、Footer、Main 的**单一巨大容器**。
* **定位坐标 (Geometry):**
    * **Left:** `60px` (L1宽度 ~56px + 4px 间距)。
    * **Top:** `4px`
    * **Bottom:** `4px`
    * **Right:** `4px`
* **外观 (Appearance):**
    * `bg-white` (纯白背景)
    * `rounded-[12px]` (四个角均为 **12px** 大圆角，营造柔和悬浮感)
    * `overflow-hidden` (裁切内部内容，保证圆角不被遮挡)
    * `shadow-2xl` (深邃阴影，增强悬浮感)

### 2. 🧩 工作台内部布局 (Inside the Workbench)
> *注意：容器内部使用 Flexbox 布局，不再使用 Fixed 定位，以确保圆角和边框的完整性。*

* **根布局:** `flex flex-row h-full w-full` (左右分栏)

    * **Col 1: L2 业务导航 (Sidebar)**
        * **高度:** `h-full` (顶天立地，跟Workbench同高).
        * 宽度: `50px` (严格固定).
        * 样式: `bg-[#F8FAFB] border-r border-[#D6D9DC]`.

    * **Col 2: 内容主控区 (Right Zone)**
        * **宽度:** `flex-1` (填满剩余空间).
        * **布局:** `flex flex-col h-full` (上下分行).
        * **特征:** 此区域即为 Header 和 Footer 的容器，确保 Header/Footer 宽度一致。

        * **Row 1: Header 顶部栏**
            * 高度: `46px`.
            * 宽度: `100%` (填充 Right Zone).

        * **Row 2: 视口核心 (Viewport Core)**
            * 高度: `flex-1`.
            * 布局: `flex flex-row`.
            * **Item A: L3 菜单树:** Width `200px`.
            * **Item B: Main 画布:** `flex-1`.

        * **Row 3. 🦶 Footer 底部栏**
            * 高度: `38px` (固定).
            * 宽度: `100%` (填充 Right Zone, 与 Header 同宽).

### 3. 📏 内容区间距规范 (Content Area Spacing)
> **核心规则 (Core Rule):**
> 内容区（Main 画布）的所有间距统一使用 **12px** (`gap-3` 或 `p-3`)。

**适用范围:**
- **外边距 (Outer Margin):** 内容区容器的内边距 (`p-3`)
- **模块间距 (Module Gap):** 内容模块之间的间距 (`gap-3`)
- **Grid 布局:** 网格布局的 gap 值 (`gap-3`)

**示例:**
```html
<!-- 内容区容器 -->
<div class="flex-1 bg-[#F5F6F8] p-3">
  <!-- Grid 布局示例 -->
  <div class="grid grid-cols-2 gap-3">
    <div class="bg-white rounded-md p-6">模块 1</div>
    <div class="bg-white rounded-md p-6">模块 2</div>
  </div>
</div>

<!-- Flex 布局示例 -->
<div class="flex-1 bg-[#F5F6F8] p-3">
  <div class="flex flex-col gap-3">
    <div class="bg-white rounded-md p-6">模块 1</div>
    <div class="bg-white rounded-md p-6">模块 2</div>
  </div>
</div>
```



## 03. 🧩 通用组件语义化 (Common Components)

> **⚠️ 核心转译指令 (CRITICAL INSTRUCTION):**
> 本项目采用 **HTML + Tailwind** 技术栈，同时允许引入 **Mantine v7** 等组件库以提高效率。
> 1.  **优先复用**：尽量使用 Mantine 或其他现成组件，避免重复造轮子。
> 2.  **HTML基准**：如果手写组件，请参考下表中的 "HTML 实现参考" 直接使用对应的 **Franken UI (UIkit)** 类名或原生 HTML 标签。
> 3.  **视觉还原：** 必须应用 "视觉微调指令" 中的 Tailwind 类来覆盖默认样式，确保还原 Figma 设计。

| 组件名称 (Figma) | 场景 | 🔧 HTML 实现参考 (Franken UI Class) | 🎨 视觉微调指令 (Tailwind) |
| :--- | :--- | :--- | :--- |
| **侧边栏菜单项** | 导航类 | `uk-nav-default` (Nav) | 选中态：左侧 `border-l-2` 实色边条，背景色 `#F5F6F8`。 |
| **顶部面包屑** | 导航类 | `uk-breadcrumb` | 仅在 **复杂 L2 (Complex L2)** 模块中使用 (如多维分析页)。 |
| **分栏页签** | 导航类 | `uk-tab` + `uk-switcher` | 极简线框模式；选中项下方 `2px` 高亮；无背景色。 |
| **标准输入框** | 数据输入 | `uk-input` | 高度 `h-9` (36px)；圆角 `Radius-SM` (4px)。 |
| **下拉选择器** | 数据输入 | `uk-select` | 弹出层需遵循 `Z-Index-Nav`；悬浮态背景变深。 |
| **复选/单选框** | 数据输入 | `uk-checkbox` / `uk-radio` | 选中色使用 `Success` (#3BAA6D) 或品牌色。 |
| **日期选择器** | 数据输入 | `input[type="date"]` (或 `uk-form-custom`) | 弹出层阴影使用 `Shadow-MD`；对齐方式固定。 |
| **核心数据表格** | 数据展示 | `uk-table` (`uk-table-divider`) | 表头 `#EDF7FA` 底色；行高 `36px`；文字 `14px`。 |
| **表单字段间距** | 布局规则 | N/A | 字段标题(Key)与内容(Value)之间水平间距为 **0px**。<br>标题宽度规则：<br>≤4字: 80px<br>≤6字: 100px<br>≤10字: 140px<br>标点符号：统一使用**中文冒号** (：)。 |
| **状态标签 (Tag)** | 数据展示 | `uk-label` | 圆角 `Radius-SM` (2px)；不同语义色背景透明度 10%。 |
| **树形折叠结构** | 数据展示 | `uk-accordion` | 嵌套层级内缩 `Spacing-LG` (16px)；移除默认外边框。 |
| **属性展示卡片** | 数据展示 | `uk-card` (`uk-card-default`) | 背景色 `#FAFAFA`；阴影 `Shadow-SM`；Padding `16px`。 |
| **提示信息** | 数据展示 | `Tooltip.jsx` (Custom React) | 黑底白字；延迟触发；支持 Disabled 状态提示。 |
| **全局对话框** | 反馈交互 | `CenterModal.jsx` (Custom React) | 遮罩层 `backdrop-blur-sm`；白色圆角卡片；支持自定义 Footer。 |
| **操作侧滑抽屉** | 反馈交互 | `InnerDrawer.jsx` (Custom React) | **非阻塞式 (Non-blocking)**；位于内容区内部右侧；无遮罩；点击外部关闭。 |
| **确认气泡框** | 反馈交互 | `uk-modal-dialog` | 用于“删除”等危险操作；取消键灰色，确认键红色。 |
| **骨架屏 (加载)** | 反馈交互 | `animate-pulse` (Tailwind原生) | 用于表格和卡片的异步加载；灰度使用 `Canvas-BG` 色值。 |

## 04. 💥 非标组件语义化 (Non-standard Components)

> **⚠️ 构建指令 (Construction Instruction):**
> 此类组件无法直接调用现成库。请基于 **HTML + Tailwind** 原子类，严格按照下述物理结构（Anatomy）进行“搭积木”式构建。
> **交互逻辑：** 必须使用 `data-state` 属性标记节点状态，以便 GSAP 或 JS 脚本进行控制。

### 🌲 组件 A: 结构管理-状态节点树 (Status Tree)
> **ID:** `Complex-Nav-Tree`
> **原型参考:** 概念上映射 Shadcn `Accordion` (折叠) + `Checkbox` (多选)，但需完全自定义 DOM 结构。

#### 1. 🏗️ 物理结构拆解 (Anatomy)
- **Container (容器):** 使用 `<ul>` 和 `<li>` 结构。
- **Indentation (缩进):** 每增加一级嵌套 (`ul > li > ul`), `padding-left` 增加 `24px` (`pl-6`)。
- **Guide Line (引导线):** 左侧必须包含 `1px` 垂直线，颜色 `#D6D9DC`，用于指示层级关系。
*   **Layout E (Business Menu)**:
    *   **适用场景**: 需要双层侧边栏导航的复杂业务模块 (具体配置参考 `DOC_INDEX.md`).
    *   **结构**: L1 Sidebar -> **300px Sidebar** -> Content Area.
    *   **侧边栏 (300px)**:
        *   **Header Card**: 渐变背景, 图标+标题+描述.
        *   **Menu List**: 分组列表.
        *   **选中态**: 青色背景 (`#087F9C`), 白色文字.
    *   **隐藏组件**: 此模式下 **隐藏** 50px L2 Sidebar.

- **Row Layout (行原子结构):**
  - **Zone A (前缀):** `flex-none` | 包含折叠箭头 (Chevron) + 复选框 (`uk-checkbox`)。
  - **Zone B (主体):** `flex-1` | 包含节点名称 (`text-[14px]`) + 状态图标。
  - **Zone C (后缀):** `absolute right-0` | **状态指示条** (宽 `3px` 垂直色块)。

#### 2. 🚦 全量状态机 (Full State Machine)
> **AI 渲染逻辑:** 根据节点的 `status` 属性，应用以下样式组合。

| 业务状态 | 文本样式 (Text Class) | 图标/装饰 (Decoration) | 交互响应 (Interaction) |
| :--- | :--- | :--- | :--- |
| **Stable (正常)** | `text-[#4D4D4D]` | 显示类型图标 | 默认 Hover/Click |
| **Modified (变更)** | `text-[#F97316]` (Orange) | 显示类型图标 | 默认 Hover/Click |
| **Deleted (删除)** | `text-gray-400 line-through` | 文字带中划线 | **禁用**编辑，仅查看 |
| **Added (新增)** | `text-[#10B981]` (Green) | 显示类型图标 | 默认 Hover/Click |
| **Blocked (屏蔽)** | `text-[#4D4D4D] opacity-50` | 图标换为“禁止”符号 | 默认 Hover/Click |
| **Excluded (排除)** | `text-black line-through` | 文字带中划线 | 默认 Hover/Click |

#### 3. 🖱️ 交互热区协议 (Interaction Protocols)
- **Arrow Area:** 点击 `Chevron` 图标 -> 仅触发 `toggleExpand()` (展开/收起)。
- **Checkbox Area:** 点击复选框 -> 触发 `toggleSelection()` (多选逻辑)。
- **Text Area:** 点击文字主体 -> 触发 `MapsToNode()` (右侧内容刷新)。
- **Empty State:** 若节点下无子项，点击展开时显示 "No Data" 占位符，**禁止**显示红框报错。

---

### 📊 组件 B: 对象管理-数据卡片 (Data Card System)
> **ID:** `Data-Card-System`
> **原型参考:** 来源于截图提取 + 用户补充规则.
> **适用场景:** 数据列表、历史记录、日志条目.

#### 1. 🏗️ 物理结构拆解 (Anatomy)
- **Container (容器):** `flex flex-col` (垂直布局).
- **Dimensions (尺寸):**
    - **Width:** Fluid (自适应).
    - **Padding:** `p-1` (4px).
    - **Gap:** `gap-1` (4px).
    - **Radius:** `rounded-[4px]`.
- **Styling (样式):**
    - **Background:** Transparent (Default) / `bg-[#EDF7FA]` (Hover).
    - **Alignment:** `items-start` (Left aligned).
    - **Height:** Auto (Determined by content).

#### 2. 📋 规格变体 (Specification Variants)

**Spec 1: 极简模式 (Minimal)**
*   **结构**: 仅包含名称.
*   **场景**: 简单列表选择.
*   **内容**: `[Name]`

**Spec 2: 标准模式 (Standard)**
*   **结构**: 图标标签 + 名称.
*   **场景**: 需要区分类型的对象列表.
*   **内容**: `[Icon Tag] + [Name]`
*   *UI Detail*: Icon container w/ bg-gray-100.

**Spec 3: 详情模式 (Rich Detail)**
*   **结构**: 
    - Row 1: `[Icon Tag] + [Name]` (主要信息)
    - Row 2: `[Value] + [Unit] / [Formula]` (关键数值信息)
*   **场景**: 计算结果、复杂知识库列表.

**Spec 4: 综合模式 (Comprehensive)**
*   **结构**: 
    - **Header**: 同 Spec 3 (Icon + Name + Value).
    - **Body (Collapsed)**: Hidden.
    - **Body (Expanded)**: 显示更多信息字段 (More Info).
    - **Trigger**: 右侧 Chevron 图标控制展开/收起.
*   **场景**: 复杂对象，需在列表页直接查看详细属性.

#### 3. 🚦 交互状态机 (Interaction States)
- **Default (默认):**
    - **Primary Text:** `text-gray-900`.
    - **Meta Text:** `text-gray-500`.
    - **Background:** Transparent.
- **Hover (悬停):**
    - **Background:** `bg-[#EDF7FA]` (Cyan Tint).
    - **Text:** Primary text becomes `text-[#087F9C]`.
    - **Action Reveal:** 右侧浮现操作按钮组 (Replace, Delete).
- **Delete (删除):**
    - **Container:** Opacity 50%.
    - **Text:** `text-gray-400` + `line-through`.
    - **Icon:** Shows Trash icon.

#### 4. 🔡 文字排版 (Typography)
- **Main Content:** `text-sm` (14px) / `font-normal`.
- **Meta Info/Value:** `text-xs` (12px) / `font-medium`.

---

### ✍️ 组件 C: 录入-替换符文本框 (Input-Replacement)
> **ID:** `Smart-Input-Text`
> *[待补充:请在此处描述文本框如何处理变量替换、高亮逻辑]*

---

### 📦 组件 D: 标准内容模块 (Standard Content Module)
> **ID:** `Standard-Content-Module`
> **原型参考:** 通用内容容器,用于承载各类业务内容

#### 1. 🎨 基础视觉规范 (Base Visual Specs)
**所有内容模块共享的基础样式:**

| 属性 | 截图取值 | Tailwind 类名 | 说明 |
| :--- | :--- | :--- | :--- |
| **Geometry** | `border-radius: 6px` | `rounded-md` | 严格对齐截图的 6px 圆角 |
| **Shadow** | `0 1px 3px 0 rgba...` | `shadow-sm` | 极轻微阴影 |
| **Background** | `#FFFFFF` | `bg-white` | 纯白背景 |

#### 2. 📐 响应式布局法则 (Responsive Layout Rules)
*   **Width (宽度):** `w-full` (100% Parent). 根据屏幕宽度和父容器自适应 (Screen Adaptable).
*   **Height (高度):** `h-fit` or `auto`. 由实际内容撑开 (Content Driven). 禁止写死高度.
*   **Structure:**
    *   **Header:** Flex Row, `border-b border-gray-100` (Divider).
#### 3. 🧩 头部组合规则 (Header Composition Rules)
> **核心逻辑:** 头部由 **左侧标题区 (Zone L)** 和 **右侧操作区 (Zone R)** 组合而成.
> **Flex Layout:** `justify-between items-center`.

**Zone L: 标题区变体 (Title Variants)**
*   **L1 (Basic):** 纯标题文本 (Case 1).
*   **L2 (Icon-Pre):** 图标 + 标题 (Case 5).
*   **L3 (Tag-Post):** 标题 + 状态标签/Tag (Case 4).
*   **L4 (Meta-Sub):** 标题 + 辅助说明文本 (Case 6).
*   **L5 (Accordion):** Chevron 图标 + 标题 (可折叠) (Case 7).

**Zone R: 操作区变体 (Action Variants)**
*   **R1 (Empty):** 无操作 (Case 1).
*   **R2 (Functions):** 单个/多个图标、文字按钮 (Case 2).
*   **R3 (Tabs):** 视图切换 / Tab 选项卡 (Case 2).
*   **R4 (Switch):** 内容显隐开关 (Case 3).

**组合示例 (Common Patterns):**
- **基础展现:** L1 + R1.
- **业务操作:** L1 + R2.
- **带 icon 标题:** L2 + R1.
- **状态标题:** L3 + R2.
- **折叠面板:** L5 + R1/R2.



---

#### 2. 📊 Type 1: 全局信息模块 (Global Info Module)
> **用途:** 展示全局性的、聚合的、概览性的信息和功能
> **属性标识:** `data-type="global"`

**典型场景:**
- 仪表盘统计卡片
- 全局配置面板
- 批量操作工具栏
- 数据汇总表格

**布局特征:**
- **推荐布局:** Grid 网格布局 (`grid grid-cols-2 gap-4` 或 `grid grid-cols-3 gap-6`)
- **尺寸:** 固定高度或紧凑型 (`h-[200px]` 或 `h-fit`)
- **内边距:** 紧凑型 (`p-4` 或 `p-6`)
- **内容密度:** 高密度，强调数据可读性

**组件结构:**
```html
<!-- 全局信息模块示例 -->
<div class="bg-white rounded-md shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] overflow-hidden p-6" data-type="global">
  <!-- Header: 标题 + 操作按钮 -->
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-sm font-medium text-gray-700">统计概览</h3>
    <button class="text-xs text-gray-500 hover:text-gray-700">查看详情</button>
  </div>
  
  <!-- Content: 数据展示区 -->
  <div class="grid grid-cols-2 gap-4">
    <div class="text-center">
      <div class="text-2xl font-bold text-gray-900">1,234</div>
      <div class="text-xs text-gray-500">总数</div>
    </div>
    <div class="text-center">
      <div class="text-2xl font-bold text-[#087F9C]">56</div>
      <div class="text-xs text-gray-500">进行中</div>
    </div>
  </div>
</div>
```

---

#### 3. 📝 Type 2: 详情信息模块 (Detail Info Module)
> **用途:** 展示单个实体的详细信息和相关操作
> **属性标识:** `data-type="detail"`

**典型场景:**
- 对象属性编辑器
- 详情查看面板
- 表单录入区域
- 关联数据展示

**布局特征:**
- **推荐布局:** Flex 垂直堆叠 (`flex flex-col`)
- **尺寸:** 自适应高度 (`h-full` 或 `min-h-[400px]`)
- **内边距:** 标准型 (`p-6` 或 `p-8`)
- **内容密度:** 中低密度，强调信息层次和编辑交互

**组件结构:**
```html
<!-- 详情信息模块示例 -->
<div class="bg-white rounded-md shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] overflow-hidden h-full flex flex-col" data-type="detail">
  <!-- Header: 标题栏 -->
  <div class="border-b border-gray-100 px-6 py-4">
    <h2 class="text-base font-medium text-gray-800">对象详情</h2>
  </div>
  
  <!-- Content: 详情内容区 -->
  <div class="flex-1 p-6 overflow-y-auto">
    <!-- 字段组 1 -->
    <div class="mb-6">
      <h3 class="text-sm font-medium text-gray-700 mb-3">基本信息</h3>
      <div class="space-y-2">
        <div class="flex items-center">
          <span class="text-sm text-gray-500 w-20">名称:</span>
          <span class="text-sm text-gray-900">示例对象</span>
        </div>
        <div class="flex items-center">
          <span class="text-sm text-gray-500 w-20">类型:</span>
          <span class="text-sm text-gray-900">产品</span>
        </div>
      </div>
    </div>
    
    <!-- 字段组 2 -->
    <div class="mb-6">
      <h3 class="text-sm font-medium text-gray-700 mb-3">扩展属性</h3>
      <!-- 更多字段... -->
    </div>
  </div>
  
  <!-- Footer: 操作按钮 (可选) -->
  <div class="border-t border-gray-100 px-6 py-4 flex justify-end gap-2">
    <button class="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200">取消</button>
    <button class="px-4 py-2 text-sm text-white bg-[#087F9C] rounded hover:bg-[#076A82]">保存</button>
  </div>
</div>
```

---

#### 4. 🚦 状态变体 (Status Variants)
**适用于两种类型的模块，通过 `data-status` 属性响应不同状态，使用 4px 左侧边框作为视觉指示器。**

| 状态 | data-status 值 | 左侧边框 | 标题样式 | Tailwind 类名 |
| :--- | :--- | :--- | :--- | :--- |
| **Default (默认)** | 无 | 无边框 | `text-gray-800` | 基础样式 |
| **Added (新增)** | `"added"` | 4px 绿色 (#29AC68) | `text-[#29AC68]` | `border-l-4 border-[#29AC68]` |
| **Deleted (删除)** | `"deleted"` | 4px 红色 (#E38585) | `text-[#C6C6C6] line-through` | `border-l-4 border-[#E38585]` |

**状态示例:**
```html
<!-- Added 状态 (全局模块) -->
<div class="bg-white rounded-md shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] overflow-hidden border-l-4 border-[#29AC68] p-6" 
     data-type="global" 
     data-status="added">
  <h3 class="text-sm font-medium text-[#29AC68]">新增统计卡片</h3>
  <!-- 内容... -->
</div>

<!-- Deleted 状态 (详情模块) -->
<div class="bg-white rounded-md shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] overflow-hidden border-l-4 border-[#E38585] h-full flex flex-col" 
     data-type="detail" 
     data-status="deleted">
  <div class="border-b border-gray-100 px-6 py-4">
    <h2 class="text-base font-medium text-[#C6C6C6] line-through">已删除对象</h2>
  </div>
  <!-- 内容... -->
</div>
```

---

#### 5. 🎯 使用场景总结

**全局信息模块 (Global):**
- Dashboard 仪表盘页面
- 数据概览页面
- 多对象批量操作界面
- 统计报表展示

**详情信息模块 (Detail):**
- 单对象编辑页面
- 属性查看/修改面板
- 表单录入界面
- Footer Modal 弹窗内容区


---

### 🌲 组件 E: 结构管理-层级节点树 (Hierarchy Tree)
> **ID:** `Simple-Nav-Tree`
> *[待补充:与 Status Tree 的区别是什么?]*



## 06. 🧭 导航与图标语义系统 (Navigation & Iconography)

> **技术规范 (Technical Spec):**
> * **图标库:** 使用 **Lucide Icons** (CDN)。
> * **L2 特殊布局:** L2 导航必须采用 **"Icon Top + Text Bottom"** 的垂直堆叠布局。

### 1. 🌍 L1 全局侧边栏 (Global Sidebar)
*布局规则：Flex Column。宽 74px。纯图标模式 (Icon Only)。*
*间距规则：Group 内图标间距 14px；分割线垂直间距 8px。*

**视觉样式 (Visual Style):**
*   **Icon Size**: 24px (w-6 h-6)
*   **Color (Inactive)**: `text-gray-400`
*   **Color (Active)**: `text-white`
*   **Background (Active)**: `bg-white/10` (Rounded)

### 2. 🗂️ L2 业务功能条 (Sub Nav Strip)
*布局规则：垂直布局 (Column)。宽度严格固定 **50px**。**图标在上，文字在下**。*
*间距规则：菜单项之间间距 4px；分割线垂直间距 4px。*
*字体：14px (text-sm)，居中对齐，不缩放。*

**选中态样式 (Active State):**
*   **Background**: `bg-[#087F9C]` (青色)
*   **Text/Icon**: `text-white`
*   **Shape**: `rounded-lg` (圆角矩形)

### 3. 🌲 L3 树形菜单 (Tree Menu)
*位于 Workbench 左侧容器 (Width: 200px)。*

#### **样式规范 (Styling Specifications)**

**菜单项基础样式:**
- **固定高度**: `30px` (`h-[30px]`)
- **左右内边距**: `8px` (`px-2`)
- **文字大小**: `14px` (`text-sm`)
- **圆角**: `4px` (`rounded`)
- **默认状态**: 灰色文字 `text-gray-600`, Hover `bg-gray-100`。
- **选中状态**: `bg-[#087F9C]` (青色), 文字白色 `text-white`。

**分组标题样式:**
- **文字大小**: `11px` (`text-[11px]`)
- **字重**: `font-normal` (400)
- **颜色**: `text-gray-400`
- **装饰**: 左侧带 icon + 分割线。

*(具体菜单业务列表请参考 `product_logic.md`)*

### 4. 🦶 Footer 底部属性栏 (Entity Properties Bar)
*布局规则：Flex Row。高度 40px。*
*样式：图标在左，文字在右 (Row 布局)。Text-xs。*

**Button Style:**
- **Padding**: `px-2`
- **Height**: `h-full`
- **Active**: `bg-[#087F9C]` text-white.
- **Inactive**: bg-white text-gray-700.

## 07. 📐 页面布局模版与映射 (Page Layout Templates)
*(保留布局模板定义，移除具体的业务路由映射表，只保留示例)*

> **核心逻辑 (Core Logic):**
> 不同的入口对应不同的布局模式。布局类型由业务逻辑决定。

### 1. 模版定义 (Template Definitions)

> **✨ 2026 新版布局系统**:
> 我们提供三个核心组件 (Page Components) 来覆盖 90% 的业务场景。请直接使用这些组件包裹您的页面内容。

#### 📄 A. 单栏页面 (SingleColumnPage)
*   **组件名**: `<SingleColumnPage>`
*   **物理特性**: `type="scroll"` (自动垂直滚动)
*   **核心布局**: 单列垂直堆叠 (`flex-col gap-4`)
*   **适用场景**:
    *   普通表单页 / 设置页
    *   详情阅览页
    *   简单的信息流展示
*   **代码示例**:
    ```jsx
    <SingleColumnPage>
      <Header />
      <CardA />
      <CardB />
    </SingleColumnPage>
    ```

#### 📑 B. 双栏页面 (DoubleColumnPage)
*   **组件名**: `<DoubleColumnPage>`
*   **物理特性**:
    *   **布局合并**: 外层为统一画布 (Canvas-like)，内部通过**分割线**区分左右区域，**无间距 (No Gap)**。
    *   **Header 互斥**: 使用此布局时，系统级 L3 Header 会自动隐藏，由组件内部的 `LeftHeader` / `RightHeader` 接管顶部操作。
    *   **滚动行为**: 内部区域独立滚动 (`overflow-y-auto`)。
    *   **默认比例**: 左侧 25% (1/4)，右侧 75% (3/4)。
*   **变体配置 (`variant`)**:
    *   `"standard"` (默认): **独立关系 (Independent)**。左栏与右栏内容无直接从属/联动逻辑，各自承载独立信息（如 Dashboard 的不同卡片）。
    *   `"sidebar"`: **从属关系 (Dependent)**。左栏为导航/配置项，右栏为受控内容。左栏 Sticky 吸顶以保持随时可操作。
*   **代码示例**:
    ```jsx
    // 场景：从属关系 (左侧目录吸顶)
    <DoubleColumnPage
      variant="sidebar" 
      leftRender={<StickyMenu />}
      rightRender={<LongContent />}
    />
    ```

#### 🖥️ C. 画布页面 (CanvasPage)
*   **组件名**: `<CanvasPage>`
*   **物理特性**: `type="fixed"` (**锁死无滚动条**, 适合内部自行处理滚动的组件)
*   **核心布局**: 自由布局 / 填充 (`flex-1`)
*   **适用场景**:
    *   **独占式工具**: 地图、绘图板、IDE 编辑器
    *   **复杂表格**: 需要固定表头和翻页器的 DataGrid (StandardBusinessLayout)
    *   **仪表盘**: 需要精确像素控制的 Dashboard
*   **代码示例**:
    ```jsx
    <CanvasPage>
      <Toolbar />
      <ComplexGrid className="flex-1 overflow-auto" /> {/* 内部处理滚动 */}
      <Footer />
    </CanvasPage>
    ```

----

### 2. 旧版布局映射 (Deprecated Mapping)
*(仅供参考，新开发请使用上述组件)*
*   **Template A (Split)** -> **DoubleColumnPage**
*   **Template B (Stack)** -> **SingleColumnPage**
*   **Template C (Toolbar)** -> **CanvasPage** (Typical DataGrid pattern)
*   **Template D (Dashboard)** -> **SingleColumnPage** (Grid inside) or **CanvasPage** (Fixed Grid)



---

## 08. 📋 页面顶栏组件 (Page Toolbar Component)

> **设计理念 (Design Philosophy):**
> 页面顶栏采用**模块化组合**方式，而非固定模板。通过组合不同的功能区块（Left Zone + Right Zone）来满足各种业务需求。

### 1. 🏗️ 基础结构 (Base Structure)

**布局模式**: 左右两端对齐 (`justify-between`)

```html
<div class="bg-white rounded-md p-3 flex items-center justify-between">
  <!-- Left Zone: 标题/面包屑 -->
  <div class="flex items-center gap-2">
    <!-- 左侧内容 -->
  </div>
  
  <!-- Right Zone: 功能按钮组 -->
  <div class="flex items-center gap-3">
    <!-- 右侧内容 -->
  </div>
</div>
```

**视觉规范**:
- **高度**: 约 48px (`p-3` + 内容高度)
- **内边距**: 12px (`p-3`)
- **背景**: 白色 (`bg-white`)
- **圆角**: 6px (`rounded-md`)

---

### 2. 📍 Left Zone 变体 (Left Zone Variants)

#### Variant A: 纯标题
```html
<h2 class="text-base font-medium text-gray-800">页面标题</h2>
```

#### Variant B: 面包屑导航
```html
<nav class="flex items-center gap-2 text-sm">
  <span class="text-gray-500">项目</span>
  <span class="text-gray-400">/</span>
  <span class="text-gray-500">模块 A</span>
  <span class="text-gray-400">/</span>
  <span class="text-gray-500">模块 B</span>
  <span class="text-gray-400">/</span>
  <span class="text-gray-900 font-medium">详情信息</span>
</nav>
```

#### Variant C: 标题 + 副标题
```html
<div class="flex flex-col">
  <h2 class="text-base font-medium text-gray-800">主标题</h2>
  <p class="text-xs text-gray-500">副标题或描述信息</p>
</div>
```

---

### 3. 🎛️ Right Zone 变体 (Right Zone Variants)

#### Variant A: View 切换器 (视图模式)
```html
<div class="flex items-center gap-1 bg-gray-100 rounded p-1">
  <button class="p-1.5 rounded hover:bg-white transition-colors" title="列表视图">
    <svg class="w-4 h-4 text-gray-600"><!-- List Icon --></svg>
  </button>
  <button class="p-1.5 rounded bg-white shadow-sm" title="网格视图">
    <svg class="w-4 h-4 text-gray-900"><!-- Grid Icon --></svg>
  </button>
  <button class="p-1.5 rounded hover:bg-white transition-colors" title="表格视图">
    <svg class="w-4 h-4 text-gray-600"><!-- Table Icon --></svg>
  </button>
</div>
```

#### Variant B: 业务功能按钮组
```html
<div class="flex items-center gap-2">
  <button class="px-3 py-1.5 text-sm bg-[#087F9C] text-white rounded hover:bg-[#076A82] transition-colors">
    新建
  </button>
  <button class="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
    导出
  </button>
  <button class="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
    批量操作
  </button>
</div>
```

#### Variant C: 模式开关 (Toggle Switch)
```html
<div class="flex items-center gap-1 bg-gray-100 rounded p-1">
  <button class="px-3 py-1.5 text-xs bg-white rounded shadow-sm font-medium text-gray-900">
    编辑模式
  </button>
  <button class="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 transition-colors">
    预览模式
  </button>
</div>
```

#### Variant D: 通用功能图标组
```html
<div class="flex items-center gap-1">
  <button class="p-1.5 rounded hover:bg-gray-100 transition-colors" title="刷新">
    <svg class="w-4 h-4 text-gray-600"><!-- RefreshCw Icon --></svg>
  </button>
  <button class="p-1.5 rounded hover:bg-gray-100 transition-colors" title="导出">
    <svg class="w-4 h-4 text-gray-600"><!-- Download Icon --></svg>
  </button>
  <button class="p-1.5 rounded hover:bg-gray-100 transition-colors" title="设置">
    <svg class="w-4 h-4 text-gray-600"><!-- Settings Icon --></svg>
  </button>
</div>
```

#### Variant E: 搜索框
```html
<div class="relative">
  <input 
    type="text" 
    placeholder="搜索..." 
    class="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded w-64 focus:outline-none focus:ring-2 focus:ring-[#087F9C] focus:border-transparent"
  />
  <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-2"><!-- Search Icon --></svg>
</div>
```

---

### 4. 🎨 组合示例 (Combination Examples)

#### 示例 1: 左侧标题
**适用场景**: 简单页面，无需额外功能

```html
<div class="bg-white rounded-md p-3 flex items-center justify-between">
  <h2 class="text-base font-medium text-gray-800">页面标题</h2>
</div>
```

---

#### 示例 2: 左侧标题 + 右侧 View 功能区
**适用场景**: 数据展示页面，支持多种视图模式

```html
<div class="bg-white rounded-md p-3 flex items-center justify-between">
  <!-- Left Zone -->
  <h2 class="text-base font-medium text-gray-800">数据列表</h2>
  
  <!-- Right Zone: View Switcher -->
  <div class="flex items-center gap-1 bg-gray-100 rounded p-1">
    <button class="p-1.5 rounded hover:bg-white transition-colors">
      <svg class="w-4 h-4 text-gray-600"><!-- List Icon --></svg>
    </button>
    <button class="p-1.5 rounded bg-white shadow-sm">
      <svg class="w-4 h-4 text-gray-900"><!-- Grid Icon --></svg>
    </button>
  </div>
</div>
```

---

#### 示例 3: 左侧面包屑 + 右侧复合功能区
**适用场景**: 复杂业务页面，需要多种操作和视图切换

```html
<div class="bg-white rounded-md p-3 flex items-center justify-between">
  <!-- Left Zone: Breadcrumb -->
  <nav class="flex items-center gap-2 text-sm">
    <span class="text-gray-500">项目</span>
    <span class="text-gray-400">/</span>
    <span class="text-gray-500">模块 A</span>
    <span class="text-gray-400">/</span>
    <span class="text-gray-500">模块 B</span>
    <span class="text-gray-400">/</span>
    <span class="text-gray-900 font-medium">详情信息</span>
  </nav>
  
  <!-- Right Zone: Business Actions + Mode Switch + View Switcher -->
  <div class="flex items-center gap-3">
    <!-- 业务功能按钮 -->
    <div class="flex items-center gap-2">
      <button class="px-3 py-1.5 text-sm bg-[#087F9C] text-white rounded hover:bg-[#076A82]">
        新建
      </button>
      <button class="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
        导出
      </button>
    </div>
    
    <!-- 分隔线 -->
    <div class="h-6 w-px bg-gray-200"></div>
    
    <!-- 模式开关 -->
    <div class="flex items-center gap-1 bg-gray-100 rounded p-1">
      <button class="px-3 py-1.5 text-xs bg-white rounded shadow-sm font-medium">编辑</button>
      <button class="px-3 py-1.5 text-xs text-gray-600">预览</button>
    </div>
    
    <!-- 分隔线 -->
    <div class="h-6 w-px bg-gray-200"></div>
    
    <!-- View 切换 -->
    <div class="flex items-center gap-1 bg-gray-100 rounded p-1">
      <button class="p-1.5 rounded hover:bg-white">
        <svg class="w-4 h-4 text-gray-600"><!-- List Icon --></svg>
      </button>
      <button class="p-1.5 rounded bg-white shadow-sm">
        <svg class="w-4 h-4 text-gray-900"><!-- Grid Icon --></svg>
      </button>
    </div>
  </div>
</div>
```

---

#### 示例 4: 左侧标题 + 右侧通用功能
**适用场景**: 详情查看页面，提供刷新、导出等通用操作

```html
<div class="bg-white rounded-md p-3 flex items-center justify-between">
  <!-- Left Zone -->
  <h2 class="text-base font-medium text-gray-800">对象详情</h2>
  
  <!-- Right Zone: Common Actions -->
  <div class="flex items-center gap-1">
    <button class="p-1.5 rounded hover:bg-gray-100 transition-colors" title="刷新">
      <svg class="w-4 h-4 text-gray-600"><!-- RefreshCw Icon --></svg>
    </button>
    <button class="p-1.5 rounded hover:bg-gray-100 transition-colors" title="导出">
      <svg class="w-4 h-4 text-gray-600"><!-- Download Icon --></svg>
    </button>
    <button class="p-1.5 rounded hover:bg-gray-100 transition-colors" title="设置">
      <svg class="w-4 h-4 text-gray-600"><!-- Settings Icon --></svg>
    </button>
  </div>
</div>
```

---

### 5. 🎯 组合指南 (Composition Guide)

| Left Zone | Right Zone | 典型场景 |
| :--- | :--- | :--- |
| 纯标题 | 无 | 简单展示页 |
| 纯标题 | View 切换器 | 数据列表页 |
| 纯标题 | 通用功能 | 详情查看页 |
| 面包屑 | 业务功能 + View 切换 | 复杂业务页 |
| 面包屑 | 业务功能 + 模式开关 + View 切换 | 编辑/预览页 |
| 标题 + 副标题 | 搜索框 + 业务功能 | 管理后台页 |

> **💡 提示**: 
> - 使用**分隔线** (`<div class="h-6 w-px bg-gray-200"></div>`) 来分隔不同功能组
> - 右侧功能区建议不超过 **3 个功能组**，避免过于拥挤
### 🏗️ 组件 H: 复合实体卡片 (Complex Entity Card)
> **ID:** `Complex-Entity-Card`
> **原型参考:** 来源于截图提取 (Large Card with Sub-items).
> **适用场景:** 模型定义、BOM 结构、复杂对象展示.

#### 1. 🏗️ 物理结构拆解 (Anatomy)
- **Container (容器):**
    - **Style:** `bg-white`, `rounded-[12px]`, `border` (Default gray / Active blue).
    - **Padding:** `p-4` (16px).
    - **Gap:** `gap-4` (Between Header and Body).
- **Header (头部):**
    - **Left:** Icon + Title (H3).
    - **Right:** Primary Action (e.g., "+ Add Product").
-*   **Header 配置**:
    *   `leftHeader`: `{ title: string, operation: string, onExit: function }`
        *   `title`: 菜单名称（如“项目”、“成员”），大号加粗字体。
        *   `operation`: 操作类型（如“创建”、“编辑”），小号灰色字体，紧随标题之后的辅助信息。
        *   `onExit`: 退出按钮的回调，显示为退出图标。
    *   `rightHeader`: `{ title: string, businessActions: JSX, viewActions: JSX }`
        *   `title`: 右侧内容标题（如“未命名项目”）。
    - **Divider:** Optional border-bottom.
- **BodySplit (分栏内容):**
    - **Left Zone (Attributes, ~35%):** 
        - 垂直堆叠的 Key-Value 属性对.
        - Label: `text-gray-500`. Value: `text-gray-900` or Tag.
    - **Right Zone (Relations, ~65%):**
        - **Sub-item List (从属列表):** 垂直排列的子对象卡片.
        - **Sub-item Style:** Flex Row (Image + Text + Actions).

#### 2. 📋 关系模式 (Relationship Patterns)
**Pattern A: 单层结构 (Flat)**
*   左侧属性 + 右侧简单列表 (无嵌套).
*   适用于属性多、子项少的简单模型.

**Pattern B: 从属结构 (Hierarchical)**
*   **Parent (Card):** 模型本身 (The "Large Card").
*   **Children (List):** 右侧列表项代表子节点 (e.g., Output Products).
*   **Interaction:** 
    *   双击右侧子项 -> 进入下一级 or 弹出详情.
    *   Hover 子项 -> 显示高亮链接/操作.

#### 3. 🎨 视觉细节 (Visual Specs)
*   **Selected State:** Container border becomes `#087F9C` (2px).
*   **Sub-item Hover:** Background `#F8FAFB`, Title Color `#087F9C`.
### 📐 组件 I: 规则定义卡片 (Rule Definition Card)
> **ID:** `Rule-Definition-Card`
> **原型参考:** 来源于截图提取 (Math/Formula Card).
> **适用场景:** 分配规则详情、计算公式展示、文档化说明.

#### 1. 🏗️ 物理结构拆解 (Anatomy)
- **Container (容器):** `bg-white`, `rounded-[12px]`, `p-6`.
- **Header (顶部信息):**
    - **Title:** `text-lg font-medium text-gray-900`.
    - **Meta:** `text-xs text-gray-400` (e.g., Creation Time) - Right Aligned.
    - **Actions:** Optional Icon Menu (`...`).
- **Body (核心内容):**
    - **Formula Block:** 核心公式展示区. 
        - Style: `font-mono` or MathJax style.
        - Layout: Indented or Centered.
    - **Variable List:** 变量定义列表.
        - Format: `[Symbol]: [Definition]`.
        - Style: `text-sm text-gray-600`, `leading-loose`.
- **Footer (底部描述):**
    - **Divider:** `border-t border-gray-100` (top margin).
    - **Description:** 纯文本描述段落 `text-sm text-gray-500`.

#### 2. 🎨 视觉细节 (Visual Specs)
*   **Math Typography:** 使用衬线体或等宽字体强调公式变量 (e.g., $E_{total}$).
*   **Spacing:** 内容块之间 `gap-6` (24px) 以增加呼吸感 (Document style).
*   **Icons:** 状态图标 (e.g., Warning/Error) 可跟随标题.








