# 内容编辑交互模式与控件规范

本文档定义了 Cyacle Carbon SPA 中三种核心的内容编辑交互模式及其所需的控件清单，确保产品交互的一致性和用户体验的流畅性。

---

## 零、 页面级交互模式 (Page Interactions)

### 0.1 顶部导航栏 (Header)
**定义**: 页面级别的状态展示与控制区域。

#### 标题 (Title)
1.  **静态/动态**:
    *   **浏览模式**: 标题应对应“当前所属的容器/上下文”（例如："项目列表"）。
    *   **创建/编辑模式**: 标题必须与**内容的名称字段**实时联动。
2.  **视觉层级 (Visual State)**:
    *   **有效内容**: 当存在具体内容时，使用**中性色**（例如 `text-gray-800`），保持专业与冷静。
    *   **占位状态**: 当内容为空时，必须使用**灰色/常规字重**（`text-gray-400 font-normal`）显示占位符（如 `<未命名>`），**严禁**使用高亮色，以免产生误导。

#### 操作 (Actions)
1.  **退出操作**: 在创建向导或独占式编辑页（Full Canvas）的左侧 Header，**必须**提供显式的“退出/取消”操作（通常是图标按钮），让用户能随时安全撤出流程。

---


### 📋 定义
在现有位置直接编辑单个字段或属性值，无需跳转或弹窗。

### 🎯 适用场景
- 编辑单个字段（文本、数字、日期、选择器等）
- 快速更新简单属性值
- 字段数量少（1-10个字段）
- 不涉及复杂的关联关系

### 🖱️ 交互流程
1. **默认状态**：显示只读内容
2. **悬停状态**：显示灰色背景 + 编辑按钮（图标+文字）
3. **激活编辑**：点击编辑按钮，原位切换为输入框
4. **编辑中**：显示输入框 + 保存按钮（绿色✓）+ 取消按钮（灰色✕）
5. **保存/取消**：返回只读状态

### 🎨 通用视觉规范

#### 字段布局规范
- **布局方式**：所有字段采用水平布局（Key-Value 水平展示）
- **字段结构**：
  - **Key 区域（字段标题）**：
    - **可选**: 字段标题非必须（例如页头标题编辑场景可省略 Key 区域）。
    - 支持标题文本 + 说明图标（可选）
    - 宽度：根据当前内容模块下最长的字段标题动态决定
    - 对齐：左对齐
    - 颜色：`text-gray-500`
  - **Value 区域（字段内容）**：
    - 支持多种形式：文本、数值、选择器、复选框等
    - 宽度：`flex-1`（占据剩余空间）
- **间距规则**：Key 和 Value 区域之间的水平间距为 **0px** (紧贴)。
- **标点规则**：若存在 Key，字段标题后必须使用**中文冒号** (：)。
- **禁止规则**：不允许标题在上、内容在下的垂直布局

#### 交互规范
- **悬停交互 (Hover)**：
  - 触发范围：仅 Value 区域 (Context-aware)
  - 视觉反馈：Value 区域背景变为 `bg-gray-50`
  - 操作按钮：显示“编辑”按钮（IconPencil + "编辑"文本）
    - 位置：**固定在 Value 区域最右侧**
    - 样式：白色背景，带边框，**禁止文字换行**
    - 遮罩：左侧带有渐变遮罩，避免覆盖过长文本
- **点击交互 (Click)**：
  - 点击“编辑”按钮进入编辑模式(`h-6`)
  - 颜色：默认 `text-gray-600`，悬停 `hover:text-[#087F9C]`
  - **长文本特殊处理**：当文本过长导致换行或溢出时，编辑按钮应**悬浮叠加**在文本末尾上方（Overlay），并带有背景遮挡，不应占用文本空间导致额外换行。
#### 方式 B：隐式提交（无需工具栏）
*   **适用范围**：单行文本、数值、日期、单选（Select）、数据卡片（DataCard）。
*   **触发方式**：
    *   **失去焦点 (Blur)**：文本、数值、日期字段在 Blur 时自动保存并退出。
    *   **选中即提交 (Selection)**：单选、数据卡片在用户选中某一项后，立即自动保存并退出。
*   **交互增强**：
    *   **自动展开**：点击选择器（Select/DataCard）进入编辑态时，下拉面板必须**默认自动展开**，实现“点击即选”的极致体验。
    *   **一键退出**：选中后自动回到阅读态，减少用户点击次数。
#### 编辑工具栏
- **显示规则**:
  - **不需要工具栏**: 单行文本框 (Text)、数字 (Number)、日期 (Date)、单选选择器 (Select)。
    - *交互*: 选中即保存，或 Enter 键保存。
  - **需要工具栏**: 多行文本框 (Textarea)、多选选择器、富文本框。
- **视觉规范**:
  - 宽度：与字段控件宽度保持一致
  - 位置：浮动显示，4px 间距 (`mt-1`)
  - 层级：使用 `z-20` 或更高，确保不被内容模块遮挡
  - 操作按钮（24px × 24px）：
    - 保存：绿色图标 (`text-green-600`)
    - 取消：灰色图标 (`text-gray-600`)

#### 默认文案规范
- **占位符 (Placeholder)**：
  - **无标题字段**：默认为 **`<未命名>`**。
  - **文本输入类** (Text, Textarea, Number)：默认为 **“请输入”**。
  - **选择交互类** (Select, Date, DataCard)：默认为 **“请选择”**。

#### 尺寸规范
- **字段高度**：最小 36px (`h-9`)，根据内容自适应
- **字段间距**：2px (`gap-0.5`)
- **悬停背景**：`bg-gray-50`（仅 Value 区域）

---

### 📦 控件清单

#### 1.1 单行文本框 (Text Input)
**状态**: ✅ 已实现

**用途**: 
- 输入简短文本（如：名称、标题、代码）
- 字符长度限制在 50 字符以内

**规范**:
- **高度**: 36px
- **边框**: `border-gray-200`，聚焦时 `border-[#087F9C]`
- **圆角**: `rounded` (4px)
- **内边距**: `px-3`
- **占位符**: `placeholder-gray-400`

**示例**: 
```jsx
<EditableField 
    label="模型名称" 
    value={modelName}
    onSave={setModelName}
    type="text"
/>
```

---

#### 1.2 多行文本框 (Textarea)
**状态**: ✅ 已实现

**用途**: 
- 输入长文本（如：描述、备注、说明）
- 支持换行
- 字符长度 50+ 字符

**规范**:
- **最小高度**: 72px (2行)
- **最大高度**: 144px (4行)，超出滚动
- **自动扩展**: 可选，随内容增长
- **边框**: `border-gray-200`，聚焦时 `border-[#087F9C]`
- **圆角**: `rounded` (4px)
- **内边距**: `px-3 py-2`
- **字数统计**: 可选，右下角显示「xx/500」

**示例**: 
```jsx
<EditableField 
    label="项目描述" 
    value={description}
    onSave={setDescription}
    type="textarea"
    maxLength={500}
/>
```

---

#### 1.3 数字输入框 (Number Input)
**状态**: ✅ 已实现

**用途**: 
- 输入纯数字（如：数量、重量、价格）
- 可设置最小值、最大值、步长
- 可选单位后缀

**规范**:
- **高度**: 36px
- **宽度**: 根据内容调整（默认 80px-120px）
- **步进按钮**: 可选，右侧上下箭头
- **单位后缀**: 显示在输入框右侧（如：kg、元、%）
- **对齐方式**: 右对齐（数字习惯）
- **边框**: `border-gray-200`，聚焦时 `border-[#087F9C]`

**示例**: 
```jsx
<EditableField 
    label="产品重量" 
    value={weight}
    onSave={setWeight}
    type="number"
    unit="kg"
    min={0}
    max={10000}
    step={0.1}
/>
```

---

#### 1.4 选择器 (Select Dropdown)
**状态**: ✅ 已实现

**用途**: 
- 从预定义选项中选择一个
- 选项数量 2-20 个

**规范**:
- **高度**: 36px
- **边框**: `border-gray-200`，聚焦时 `border-[#087F9C]`
- **圆角**: `rounded` (4px)
- **内边距**: `px-3`
- **下拉图标**: `IconChevronDown` (16px)
- **选项悬停**: `bg-gray-50`
- **选中标记**: 主题色背景或 ✓ 图标

**示例**: 
```jsx
<EditableField 
    label="系统边界" 
    value={systemBoundary}
    onSave={setSystemBoundary}
    type="select"
    options={[
        { value: '从摇篮到大门', label: '从摇篮到大门' },
        { value: '从摇篮到坟墓', label: '从摇篮到坟墓' }
    ]}
/>
```

---

#### 1.5 日期选择器 (Date Picker)
**状态**: ✅ 已实现

**用途**: 
- 选择日期（年-月-日）
- 可选：包含时间（年-月-日 时:分）

**规范**:
- **高度**: 36px
- **格式**: `YYYY-MM-DD` 或 `YYYY-MM-DD HH:mm`
- **日历图标**: `IconCalendar` (16px)
- **日历面板**: 
  - 弹出位置：输入框下方，自动调整避免溢出
  - 快捷选择：今天、昨天、上周、上月
- **边框**: `border-gray-200`，聚焦时 `border-[#087F9C]`

**示例**: 
```jsx
<EditableField 
    label="核算周期" 
    value={accountingPeriod}
    onSave={setAccountingPeriod}
    type="date"
/>
```

---

#### 1.6 时间选择器 (Time Picker)
**状态**: 🚧 待实现

**用途**: 
- 选择时间（时:分 或 时:分:秒）
- 独立于日期

**规范**:
- **高度**: 36px
- **格式**: `HH:mm` 或 `HH:mm:ss`
- **时钟图标**: `IconClock` (16px)
- **下拉面板**: 
  - 时/分/秒滚动选择器
  - 或时间段快捷选择
- **边框**: `border-gray-200`，聚焦时 `border-[#087F9C]`

**示例**: 
```jsx
<EditableField 
    label="开始时间" 
    value={startTime}
    onSave={setStartTime}
    type="time"
/>
```

---

#### 1.7 数据卡片选择器 (Data Card Selector)
**状态**: ✅ 已实现（极简版）

**用途**: 
- 从对象列表中选择一个
- 显示为芯片样式
- 对象有多个属性字段

**规范**:
- **显示样式**: 
  - 只读：芯片样式（`px-3 py-1.5 bg-gray-50 border border-gray-200 rounded`）
  - 编辑：下拉选择或打开选择器弹窗
- **芯片内容**: 显示对象的主要标识（如：名称）
- **选择器弹窗**: 
  - 可选：打开抽屉，显示对象列表和详细信息
  - 支持搜索、过滤

**示例**: 
```jsx
<EditableField 
    label="地理边界" 
    value={geoBoundary}
    onSave={setGeoBoundary}
    type="dataCard"
    dataCardOptions={[
        { id: 'loc1', name: '演示门窗生产地' },
        { id: 'loc2', name: '中国-广东省-深圳市' }
    ]}
/>
```

---

#### 1.8 开关 (Toggle Switch)
**状态**: ✅ 已实现

**用途**: 
- 二选一：是/否、开/关、显示/隐藏
- 即时生效，无需保存按钮

**规范**:
- **尺寸**: 宽 32px (`w-8`)，高 16px (`h-4`)
- **滑块**: 宽高 12px (`w-3 h-3`)
- **颜色**: 
  - 关闭：`bg-gray-200`
  - 开启：`bg-[#087F9C]`
- **动画**: `transition-all duration-200`
- **位置**: 标题行右侧

**示例**: 
```jsx
<ModuleHeader 
    title="特殊排放分析"
    toggle={<ToggleSwitch checked={showSpecialEmission} onChange={setShowSpecialEmission} />}
/>
```

---

#### 1.9 复选框 (Checkbox)
**状态**: ✅ 已实现

**用途**: 
- 多选：可选择 0 到多个选项
- 单个复选：确认操作（如：同意条款）

**规范**:
- **尺寸**: 16px (`w-4 h-4`)
- **颜色**: 
  - 未选中：`border-gray-300`
  - 选中：`accent-color: #087F9C`
- **状态规范**:
  | 状态 | 视觉表现 | 说明 |
  | :--- | :--- | :--- |
  | **未勾选** (Unchecked) | 白底，灰色边框 (`border-gray-300`) | 默认状态 |
  | **已勾选** (Checked) | 青色背景 (`bg-[#087F9C]`)，白色对号 | 选中状态 |
  | **部分勾选** (Indeterminate) | 青色背景 (`bg-[#087F9C]`)，白色横杠 | 表示部分子项选中 |
  | **已勾选置灰** (Checked Disabled) | 灰色背景 (`bg-gray-200`)，深灰对号 | 不可操作 |
  | **未勾选置灰** (Unchecked Disabled) | 浅灰背景 (`bg-gray-100`)，灰色边框 | 不可操作 |
- **圆角**: `rounded` (2px)
- **标签位置**: 复选框右侧，间距 8px (`gap-2`)

**示例**: 
```jsx
<label className="flex items-center gap-2">
    <input 
        type="checkbox" 
        checked={analysisMethod.exclusion}
        onChange={(e) => setAnalysisMethod({...analysisMethod, exclusion: e.target.checked})}
        className="w-4 h-4 border-gray-300 rounded"
    />
    排除计算
</label>
```

---

#### 1.10 单选按钮 (Radio Button)
**状态**: 🚧 待实现

**用途**: 
- 单选：从 2-5 个选项中选择一个
- 选项互斥

**规范**:
- **尺寸**: 16px (`w-4 h-4`)
- **形状**: 圆形
- **颜色**: 
  - 未选中：`border-gray-300`
  - 选中：`accent-color: #087F9C`
- **标签位置**: 单选按钮右侧，间距 8px (`gap-2`)
- **布局**: 水平排列或垂直堆叠

**示例**: 
```jsx
<div className="flex flex-col gap-2">
    <label className="flex items-center gap-2">
        <input type="radio" name="reportType" value="simple" className="w-4 h-4" />
        简化报告
    </label>
    <label className="flex items-center gap-2">
        <input type="radio" name="reportType" value="full" className="w-4 h-4" />
        完整报告
    </label>
</div>
```

---

#### 1.11 颜色选择器 (Color Picker)
**状态**: 🚧 待实现

**用途**: 
- 选择颜色
- 用于样式定制、标签颜色等

**规范**:
- **触发器**: 色块 + 颜色值（如：`#087F9C`）
- **色块尺寸**: 24px × 24px
- **边框**: `border-gray-300`
- **弹出面板**: 
  - 预设色板
  - HSL/RGB 调节器
  - 透明度滑块（可选）

**示例**: 
```jsx
<EditableField 
    label="标签颜色" 
    value={tagColor}
    onSave={setTagColor}
    type="color"
/>
```

---

#### 1.12 文件上传 (File Upload)
**状态**: 🚧 待实现

**用途**: 
- 上传单个文件
- 支持图片、文档、数据文件

**规范**:
- **触发器**: 
  - 按钮样式：「选择文件」或「上传」按钮
  - 拖放区域：虚线边框，显示「拖放文件至此」
- **文件限制**: 
  - 类型过滤（如：`.xlsx, .csv`）
  - 大小限制（如：最大 10MB）
- **进度显示**: 上传中显示进度条
- **预览**: 
  - 图片：缩略图
  - 文档：文件名 + 文件图标

**示例**: 
```jsx
<EditableField 
    label="附件" 
    value={attachment}
    onSave={setAttachment}
    type="file"
    accept=".pdf,.xlsx,.csv"
    maxSize={10 * 1024 * 1024} // 10MB
/>
```

---

#### 1.13 滑块 (Slider)
**状态**: 🚧 待实现

**用途**: 
- 在范围内选择数值（如：0-100）
- 可视化比例调整

**规范**:
- **高度**: 4px (轨道)
- **滑块**: 圆形，直径 16px
- **颜色**: 
  - 已选部分：`bg-[#087F9C]`
  - 未选部分：`bg-gray-200`
- **数值显示**: 滑块上方或右侧显示当前值
- **刻度**: 可选，显示关键刻度值

**示例**: 
```jsx
<EditableField 
    label="置信度" 
    value={confidence}
    onSave={setConfidence}
    type="slider"
    min={0}
    max={100}
    step={5}
    unit="%"
/>
```

---

### 📦 容器组件

#### FormBlock
**状态**: ✅ 已实现

**用途**: 
- 包裹多个 EditableField
- 提供统一的间距和布局

**规范**:
- **内边距**: 上 8px (`pt-2`)，左右下 12px (`px-3 pb-3`)
- **字段间距**: 2px (`gap-0.5`)
- **背景**: `bg-white`

---

## 二、对象管理：身份管理、属性管理 (Object Management)

### 📋 定义
管理具有独立身份的对象实体，包括创建、编辑、删除对象及其属性。

### 🎯 适用场景
- 管理多个独立对象（如：数据卡片、排放因子、参数配置）
- 对象具有多个属性字段（5+个字段）
- 需要批量操作（添加、删除、排序）
- 对象之间可能存在关联关系

---

### 📦 控件清单

#### 2.1 对象卡片 (Object Card)
**状态**: 🚧 待实现

**用途**: 
- 展示对象的关键信息
- 快速浏览和访问

**规范**:
- **尺寸**: 最小宽度 280px，高度自适应
- **布局**: 网格 3-4 列（响应式）
- **结构**:
  - **头部**: 对象名称 + 状态标签（可选）
  - **内容**: 2-4 个关键属性
  - **底部**: 操作按钮（编辑、删除）
- **卡片样式**:
  - 背景: `bg-white`
  - 边框: `border border-gray-200`
  - 圆角: `rounded-lg` (8px)
  - 阴影: `shadow-sm`，悬停 `shadow-md`
  - 内边距: `p-4`
- **交互**:
  - 点击卡片：打开详情抽屉
  - 悬停：显示完整操作菜单

**示例**:
```jsx
<ObjectCard
    title="演示门窗生产地"
    status="已验证"
    fields={[
        { label: '区域', value: '中国-广东省' },
        { label: '类型', value: '生产基地' }
    ]}
    onEdit={handleEdit}
    onDelete={handleDelete}
/>
```

---

#### 2.2 对象抽屉 (Object Drawer)
**状态**: 🚧 待实现

**用途**: 
- 创建或编辑对象的所有属性
- 从右侧滑入，不打断当前上下文

**规范**:
- **宽度**: 400-600px（根据内容复杂度）
- **结构**:
  - **顶部**: 标题（「新建XX」或「编辑XX」）+ 关闭按钮
  - **内容区**: 表单字段（可滚动）
  - **底部**: 操作栏（保存 + 取消按钮，固定在底部）
- **样式**:
  - 背景遮罩: `bg-black/30`
  - 抽屉背景: `bg-white`
  - 阴影: `shadow-2xl`
- **动画**: 
  - 进入: `translate-x-0` (从右侧滑入)
  - 退出: `translate-x-full`
  - 时长: `duration-300`

**示例**:
```jsx
<ObjectDrawer
    isOpen={isDrawerOpen}
    onClose={closeDrawer}
    title="编辑地理边界"
    onSave={handleSave}
>
    <FormField label="名称" value={name} onChange={setName} />
    <FormField label="区域" value={region} onChange={setRegion} type="select" />
    {/* 更多字段 */}
</ObjectDrawer>
```

---

#### 2.3 对象表格 (Object Table)
**状态**: 🚧 待实现

**用途**: 
- 紧凑展示大量对象
- 支持排序、筛选、分页

**规范**:
- **行高**: 48px
- **斑马纹**: 奇数行 `bg-white`，偶数行 `bg-gray-50`
- **悬停**: `hover:bg-blue-50`
- **表头**:
  - 背景: `bg-gray-100`
  - 字体: `font-semibold text-sm`
  - 排序图标: 可点击列标题切换升序/降序
- **操作列**: 
  - 位置: 最右侧，固定宽度 80-120px
  - 按钮: 编辑、删除图标按钮
- **展开行**:
  - 点击行展开完整详情面板
  - 面板背景: `bg-gray-50`，内边距 `p-4`

**示例**:
```jsx
<ObjectTable
    columns={[
        { key: 'name', label: '名称', sortable: true },
        { key: 'region', label: '区域', sortable: true },
        { key: 'type', label: '类型', sortable: false }
    ]}
    data={locations}
    onEdit={handleEdit}
    onDelete={handleDelete}
    expandable={true}
/>
```

---

#### 2.4 对象搜索栏 (Object Search Bar)
**状态**: 🚧 待实现

**用途**: 
- 快速搜索和过滤对象

**规范**:
- **高度**: 40px
- **布局**: 搜索框 + 筛选按钮
- **搜索框**:
  - 图标: `IconSearch` (18px) 左侧
  - 占位符: 「搜索...」
  - 清除按钮: `IconX`，输入内容后出现
- **筛选器**: 
  - 按钮: 「筛选」+ `IconFilter` 图标
  - 点击展开下拉菜单或抽屉
  - 筛选项: 复选框、日期范围等

**示例**:
```jsx
<ObjectSearchBar
    placeholder="搜索地理边界..."
    onSearch={handleSearch}
    filters={[
        { key: 'type', label: '类型', options: ['生产基地', '仓库'] },
        { key: 'verified', label: '已验证', type: 'toggle' }
    ]}
    onFilter={handleFilter}
/>
```

---

#### 2.5 对象列表操作栏 (Object Toolbar)
**状态**: 🚧 待实现

**用途**: 
- 提供批量操作、添加、导入导出功能

**规范**:
- **高度**: 48px
- **布局**: 左侧主要操作，右侧辅助功能
- **主要操作**:
  - 「+ 添加」按钮（主题色，突出）
  - 批量删除（选中项 > 0 时显示）
- **辅助功能**:
  - 导入/导出按钮
  - 视图切换（卡片 ↔ 表格）
  - 更多操作菜单

**示例**:
```jsx
<ObjectToolbar
    onAdd={handleAdd}
    selectedCount={selectedItems.length}
    onBatchDelete={handleBatchDelete}
    onImport={handleImport}
    onExport={handleExport}
    viewMode="card" // 'card' | 'table'
    onViewModeChange={setViewMode}
/>
```

---

## 三、结构管理：层级管理 (Hierarchy Management)

### 📋 定义
管理具有父子关系、树形结构的数据，支持层级展开/折叠、拖拽排序、层级调整。

### 🎯 适用场景
- 树形数据结构（如：产品结构树、组织架构、分类体系）
- 需要可视化层级关系
- 支持拖拽调整父子关系
- 支持层级展开/折叠

---

### 📦 控件清单

#### 3.1 树形列表 (Tree List)
**状态**: 🚧 待实现

**用途**: 
- 展示层级结构数据
- 支持展开/折叠子节点

**规范**:
- **行高**: 36px
- **缩进**: 每层 24px
- **展开图标**:
  - 折叠: `IconChevronRight` (16px)
  - 展开: `IconChevronDown` (16px)
  - 位置: 节点文字左侧 4px
  - 叶子节点: 无图标或占位符
- **连接线**: 
  - 可选: 显示虚线连接父子节点
  - 颜色: `border-gray-200`
- **交互**:
  - 点击展开图标: 展开/折叠子节点
  - 点击节点文字: 选中节点（高亮）
  - 双击节点: 进入编辑模式或打开详情

**示例**:
```jsx
<TreeList
    data={productStructure}
    expandable={true}
    showLines={true}
    onNodeClick={handleNodeClick}
    onNodeExpand={handleNodeExpand}
/>
```

---

#### 3.2 树节点 (Tree Node)
**状态**: 🚧 待实现

**用途**: 
- 树形列表中的单个节点
- 显示节点信息和操作

**规范**:
- **结构**:
  - 展开图标（如有子节点）
  - 节点图标（可选，如：文件夹、文档）
  - 节点文字
  - 操作按钮（悬停显示）
- **状态样式**:
  - 默认: `text-gray-800`
  - 悬停: `bg-gray-50`
  - 选中: `bg-blue-50 text-[#087F9C] font-medium`
  - 拖拽中: `opacity-50`
- **操作按钮**:
  - 「+ 添加同级」
  - 「+ 添加子级」
  - 「✏️ 编辑」
  - 「✕ 删除」

**示例**:
```jsx
<TreeNode
    node={node}
    level={0}
    isExpanded={expanded[node.id]}
    isSelected={selected === node.id}
    onExpand={handleExpand}
    onSelect={handleSelect}
    onAddSibling={handleAddSibling}
    onAddChild={handleAddChild}
    onEdit={handleEdit}
    onDelete={handleDelete}
/>
```

---

#### 3.3 拖拽指示器 (Drag Indicator)
**状态**: 🚧 待实现

**用途**: 
- 拖拽节点时显示插入位置
- 提供视觉反馈

**规范**:
- **插入线**:
  - 宽度: 父节点宽度
  - 粗细: 2px
  - 颜色: `bg-[#087F9C]`
  - 动画: 稍微跳动或闪烁
- **目标区域高亮**:
  - 拖拽到某节点上方: 节点上边缘显示插入线
  - 拖拽到某节点内部: 节点背景高亮 `bg-blue-100`
  - 拖拽到某节点下方: 节点下边缘显示插入线

**示例**:
```jsx
<DragIndicator
    position="above" // 'above' | 'inside' | 'below'
    targetNode={targetNode}
/>
```

---

#### 3.4 可视化树图 (Visual Tree Graph)
**状态**: 🚧 待实现（可选，需额外库）

**用途**: 
- 图形化展示树形结构
- 更直观的层级关系

**规范**:
- **节点样式**:
  - 形状: 圆角矩形
  - 最小宽度: 120px
  - 背景: `bg-white`
  - 边框: `border-gray-300`，选中 `border-[#087F9C]`
  - 阴影: `shadow-sm`
- **连线样式**:
  - 类型: 贝塞尔曲线或直角连线
  - 颜色: `stroke-gray-300`
  - 宽度: 2px
- **布局**:
  - 垂直树（从上到下）
  - 水平树（从左到右）
- **交互**:
  - 缩放: 滚轮或双指缩放
  - 平移: 拖拽空白区域
  - 节点拖拽: 调整层级关系

**技术栈**: 
- React Flow (推荐)
- D3.js
- 或自定义 SVG

**示例**:
```jsx
<VisualTreeGraph
    data={productStructure}
    layout="vertical" // 'vertical' | 'horizontal'
    editable={true}
    onNodeDrag={handleNodeDrag}
/>
```

---

## 🎯 控件选择指南

| 数据类型 | 推荐控件 | 备选控件 |
|---------|---------|---------|
| 短文本 | 单行文本框 | - |
| 长文本 | 多行文本框 | - |
| 整数/小数 | 数字输入框 | 滑块 |
| 预定义选项（2-20个） | 选择器 | 单选按钮 |
| 日期 | 日期选择器 | - |
| 时间 | 时间选择器 | - |
| 日期+时间 | 日期选择器（带时间） | - |
| 是/否 | 开关 | 单选按钮 |
| 多选 | 复选框 | - |
| 单选（2-5个） | 单选按钮 | 选择器 |
| 颜色 | 颜色选择器 | 单行文本框 |
| 文件 | 文件上传 | - |
| 范围数值 | 滑块 | 数字输入框 |
| 关联对象 | 数据卡片选择器 | 选择器 |

---

## 📝 实现优先级

### 第一阶段（已完成）✅
- [x] 单行文本框
- [x] 选择器
- [x] 日期选择器
- [x] 数据卡片选择器（极简版）
- [x] 开关
- [x] 复选框
- [x] FormBlock 容器

### 第二阶段（高优先级）
- [ ] 多行文本框
- [ ] 数字输入框
- [ ] 对象卡片
- [ ] 对象抽屉
- [ ] 对象操作栏

### 第三阶段（中优先级）
- [ ] 单选按钮
- [ ] 文件上传
- [ ] 对象表格
- [ ] 对象搜索栏
- [ ] 树形列表
- [ ] 树节点

### 第四阶段（低优先级/可选）
- [ ] 时间选择器
- [ ] 颜色选择器
- [ ] 滑块
- [ ] 拖拽指示器
- [ ] 可视化树图

---

## 🚀 下一步

请您：
1. **审阅控件清单**：是否有遗漏或需要调整的控件？
2. **确认优先级**：我们先实现哪个阶段的控件？
3. **指定具体场景**：选择一个具体的使用场景，我们来实现对应的控件和交互

例如：
- 「我想先完善基本信息页面，需要多行文本框和数字输入框」
- 「我想实现地理边界的对象管理，需要对象卡片和抽屉」
- 「我想实现产品结构树，需要树形列表」

这样我们就可以逐步建立完整、统一的组件库！
