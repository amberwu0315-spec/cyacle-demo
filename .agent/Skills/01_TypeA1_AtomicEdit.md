---
name: 原位编辑规范
description: 用于实现和维护 Cyacle 项目中原位编辑 (Inline Editing) 交互模式的规范与最佳实践。
---

# Cyacle 原位编辑 (In-place Editing) 规范

此 Skill 用于指导 AI 在 Cyacle Carbon SPA 项目中实现或修改原位编辑交互。必须严格遵循 `项目核心规则.md`、`交互模式.md` 和 `设计系统规范.md`。

## 01. 核心铁律 (Core Rules)

1.  **原位优先**: 属性编辑应优先采用原位编辑模式，避免过度的弹窗干扰。
2.  **水平布局 (Key-Value Alignment)**:
    - 采用水平对齐，**禁止**标题在上、内容在下的垂直布局。
    - 标签 (Key) 后必须使用**中文冒号 (：)**。
    - 标签与数值 (Value) 间距为 **0px**。
3.  **零跳变控制**:
    - 单行控件锁定高度为 `36px` (`h-9`)，确保切换时布局无跳变。
4.  **智能提交行为**:
    - **隐式提交**: 单行文本、数值、选择器在失去焦点 (Blur) 或选中后应自动保存并退出。
    - **显式提交**: 仅多行文本 (Textarea)、多选等复杂场景使用编辑工具栏 (Save/Cancel)。

## 02. 视觉规范 (Visual Specs)

| 状态 | 样式要求 | Tailwind 类名参考 |
| :--- | :--- | :--- |
| **只读态** | 纯文本展示，无背景边框 | `text-sm text-gray-900` |
| **悬停态** | 值区域背景变色，右侧显示“编辑”按钮 | `bg-gray-50`, `opacity-100` (Pencil Button) |
| **编辑态** | 切换为 Mantine 输入控件，自动聚焦 | `TextInput`, `Select`, `NumberInput` |
| **渐变遮罩** | 编辑按钮左侧需带有渐变效果，防止覆盖文本 | `bg-gradient-to-l from-gray-50 to-transparent` |

## 03. 代码模式 (Code Patterns)

项目已封装通用组件 `EditableField.jsx`。请优先复用此组件。

### A. 基础文本编辑 (Basic Text)
```jsx
<EditableField 
    label="模型名称" 
    value={modelName}
    onSave={(val) => setModelName(val)}
    type="text"
/>
```

### B. 选择器编辑 (Select Dropdown)
*注意：进入编辑态时，下拉面板必须默认自动展开。*
```jsx
<EditableField 
    label="计入方式" 
    value={method}
    onSave={setMethod}
    type="select"
    options={[
        { value: 'exclusion', label: '排除计算' },
        { value: 'inclusion', label: '包含计算' }
    ]}
/>
```

### C. 多行文本编辑 (Textarea with Toolbar)
```jsx
<EditableField 
    label="项目备注" 
    value={memo}
    onSave={setMemo}
    type="textarea"
    rows={4}
    maxLength={500}
/>
```

## 04. 常见误区 (Anti-patterns & Warnings)

- ❌ **误区：** 在原位编辑器中使用过大的 Padding。
  - ✅ **正确：** 遵循 `design_system.md` 的零边距规则。
- ❌ **误区：** 忘记在 Select 自动打开下拉框。
  - ✅ **正确：** 使用 `useCombobox` 或在进入编辑态后触发弹出。
- ❌ **误区：** 使用英文冒号或不带冒号。
  - ✅ **正确：** 统一使用中文冒号 `：`。
- ❌ **误区：** 输入框在选中后需要二次确认保存（针对单选）。
  - ✅ **正确：** 实行“选中即提交”的极致体验。

## 05. 组件扩展规则 (Extension Protocol)
当 `EditableField` 现有的 `type` 无法满足需求时（例如需要 ColorPicker 或 DateRange），严禁拆开重写。
必须遵循以下模式扩展：

1.  **Prop 扩展**: 在 `EditableField` 内部增加新的 `type` 枚举。
2.  **渲染隔离**: 在 `renderEditInput` switch 语句中增加 case。
3.  **样式继承**: 新的输入控件必须包裹在统一的 Wrapper 中，继承 `h-9` 高度和 `text-sm` 字体，严禁破坏行高。
