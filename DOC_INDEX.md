# 项目文档索引 (Documentation Index)

> **使用说明：** AI 助手看到此文件后，应**依次读取**以下所有文档，作为工作的上下文基础。

---

## 🔴 核心规则文档（必读）

### 1. AI 行为准则
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/AGENTS.md`  
**作用**: 定义 AI 助手的工作方式、语言要求、代码输出规范。

### 2. 项目技术铁律
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/PROJECT_RULES.md`  
**作用**: **最高优先级**的业务规则和设计决策（如 L2 Header 差异化、间距统一为 12px）。

### 3. 设计系统规范
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/design_system.md`  
**作用**: 视觉变量（颜色、间距）、组件构造、布局模板。

### 4. 产品逻辑与路由
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/product_logic.md`  
**作用**: 页面流转关系、菜单结构、导航逻辑。

### 5. 交互模式定义
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/interaction_patterns.md`  
**作用**: 组件交互行为（点击、悬停、编辑模式）。

---

## 📋 使用方式

**对话开始时，用户只需说：**
> "读取 DOC_INDEX"

AI 会自动加载以上所有文档，无需逐一指定。

---

## 📄 页面配置文档

### L2 基础页面 (Basis Page)
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/views/l2/BasisPage.jsx`  
**配置内容**:
- **研究对象模块**: 只读字段(名称、地址、联系人名称、联系人邮箱、介绍)，名称字段带链接功能
- **类型视图-设置列表模块**: 可编辑表格(来源、一级类型、二级类型)，来源为标签形式，支持点对点编辑，点击添加按钮生成空数据行
- **基础信息模块**: 项目需求类型(只读)、创建人(只读)、创建时间(只读)、更新时间(只读)、项目备注(可编辑多行文本)

### L2 模型页面 (Model Page)
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/views/l2/ModelPage.jsx`  
**层级结构**:
- **层级1 - 筛选器**: 类型筛选(全部类型/产品模型/部件模型/材料模型)、状态筛选(全部状态/已发布/草稿)
- **层级2 - 视图切换Tab**: 总览视图(默认选中)、引用视图、继承视图
- **层级3 - 内容区**:
  - 总览视图: 大卡片列表展示，包含模型图标、版本、名称、类型、状态等信息
  - 引用视图: 网状图展示(需集成 D3.js 或 Cytoscape.js)
  - 继承视图: 脑图展示(需集成 MindMap 或 Markmap)

### L2 分配页面 (Allocation Page)
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/views/l2/AllocationPage.jsx`  
**层级结构**:
- **层级1 - 筛选器**: 类型筛选(全部类型/数量分配/经济分配/物理分配)、状态筛选(全部状态/已启用/草稿)
- **层级2 - 大卡片列表**: 网格布局展示分配规则，包含规则图标、状态、名称、类型、描述等信息

---

## 📦 Footer 模块配置

### Footer - 信息 (Info)
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/footer/InfoFooter.jsx`  
**顶部栏**:
- 左侧标题: "信息"(固定)
- 右侧业务功能组: 版本历史图标、删除图标
- 右侧View功能组: 打开独立窗口、关闭
**内容区**: 两列布局
- 左列(2/3宽度): 基本信息模块、其他信息模块
- 右列(1/3宽度): 工商信息模块、联系人信息模块

### Footer - 产品 (Product)
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/footer/ProductFooter.jsx`  
**顶部栏**: 标题"产品" + 添加按钮(填充样式) + View功能组  
**内容区**: 筛选器 + 表格容器(待补充)

### Footer - 数据 (Data)
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/footer/DataFooter.jsx`  
**顶部栏**: 标题"数据记录" + 添加按钮(填充样式) + View功能组  
**内容区**: 筛选器 + 表格容器(待补充)

### Footer - 数据源 (DataSource)
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/footer/DataSourceFooter.jsx`  
**顶部栏**: 标题"数据源" + 添加按钮(填充样式) + View功能组  
**内容区**: 筛选器 + 表格容器(待补充)

### Footer - 文献因子 (LiteratureFactor)
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/footer/LiteratureFactorFooter.jsx`  
**顶部栏**: 标题"文献因子" + 添加按钮(填充样式) + View功能组  
**内容区**: 筛选器 + 表格容器(待补充)

### Footer - 基本流 (BasicFlow)
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/footer/BasicFlowFooter.jsx`  
**顶部栏**: 标题"基本流" + 添加按钮(填充样式) + View功能组  
**内容区**: 筛选器 + 表格容器(待补充)

### Footer - 复合因子 (CompositeFactor)
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/footer/CompositeFactorFooter.jsx`  
**顶部栏**: 标题"复合因子" + 添加按钮(填充样式) + View功能组  
**内容区**: 筛选器 + 表格容器(待补充)

### Footer - 文献 (Literature)
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/footer/LiteratureFooter.jsx`  
**顶部栏**: 标题"文献" + 添加按钮(填充样式) + View功能组  
**内容区**: 筛选器 + 表格容器(待补充)

### Footer - 元件 (Component)
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/footer/ComponentFooter.jsx`  
**顶部栏**: 标题"元件" + 添加按钮(填充样式) + View功能组  
**内容区**: 筛选器 + 表格容器(待补充)

### Footer - 地点 (Location)
**路径**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/footer/LocationFooter.jsx`  
**顶部栏**: 标题"地点" + 添加按钮(填充样式) + View功能组  
**内容区**: 筛选器 + 表格容器(待补充)

---

## ⚠️ 关键修复记录

### EditableField 组件 - 防止编辑按钮被遮挡
**问题**: `EditableField` 组件中的编辑按钮使用了 `overflow-hidden`，导致hover时出现的编辑按钮被容器遮挡  
**修复**: 将 `overflow-hidden` 改为 `overflow-visible`，确保编辑按钮完整显示  
**文件**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/common/EditableField.jsx` (第230行)  
**规则**: 所有包含弹出元素(按钮、tooltip等)的容器都不应使用 `overflow-hidden`

### ContentModule 组件 - 防止遮挡内部弹出元素
**问题**: 内容模块容器使用 `overflow-hidden` 导致内部的 tooltip、工具栏等弹出元素被遮挡  
**修复**: `ContentModule` 组件使用 `overflow-visible`，确保所有内部弹出组件正常显示  
**文件**: `/Users/wuyuhui/Desktop/Cyacle-UX/src/components/common/ContentModule.jsx`  
**规则**: 所有容器组件都不应该遮挡内部的弹出元素（tooltip、下拉菜单、工具栏等）
