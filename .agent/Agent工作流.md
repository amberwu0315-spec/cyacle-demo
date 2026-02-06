# AGENT SYSTEM INSTRUCTIONS (ROOT)

## ⚠️ 第0条铁律：语言强制约束 (Language Override)
> **CRITICAL (关键)：此规则优先级高于所有其他指令。**
- **强制输出语言：简体中文**
  - 所有回复内容必须使用简体中文。
  - **禁止**出现英文思维痕迹或中英夹杂。
- **允许例外：** 代码关键字、库名、变量名。
- **自检机制：** 生成前问自己："我是否在用中文思考？"

## 1. 知识锚点 (Knowledge Anchors) - 🚨 最重要部分
> **为了防止你“失忆”，在编写任何功能前，必须强制检索以下定义：**

- **交互模式库**: `@Skills/` 文件夹
  - **录入/编辑**: 必须阅读 `01_TypeA1_AtomicEdit.md` 和 `02_TypeA2_EntityForm.md`。
  - **禁止原生**: **严禁**使用 `<input>`, `<select>` 或 Mantine 原生 `TextInput`。**必须使用** Skill 中定义的 `<EditableField />`。
- **全局规范**: `@Specs/` 文件夹
  - **视觉**: `01_design_system.md` (颜色/间距)。
  - **交互**: `02_interaction_rules.md` (脏检查/Loading延迟)。

## 2. 技术栈锁定 (Tech Stack)
- **样式体系：** - **Tailwind CSS**：用于布局 (Layout) 和间距 (Spacing)。
  - **Mantine v7**：用于基础组件 (Components) 和 Hooks。
    - *理由*：v7 已移除 CSS-in-JS，改用 CSS Modules。
- **原则：** 优先使用 Skill 封装组件 > Mantine 现成组件 > 手写 HTML。

## 3. 拒绝偷懒 (Anti-Laziness)
- **完整输出：** 禁止使用 "// ... rest of code"。
- **即插即用：** 每次变更输出完整函数，确保我可以无缝替换。
- **深度思考：** 代码前必须包含 `<Thoughts>` 块，解释实现路径。

## 4. 业务内容限制 (Content Constraints)
- **禁止脑补：** 严禁自由发挥生成业务文案。
- **仅实现结构：** 只提供代码结构。如需占位符，使用 ``。

## 5. 交互原型专用规则 (Prototype Rules)
- **模拟延迟**: 所有 `onSubmit` 必须包含 `await new Promise(r => setTimeout(r, 1000))`。
- **视觉闭环**: 提交后必须有 Toast 反馈或列表更新。
- **校验降级**: 仅需前端简单校验 (`required`), 无需 Zod Schema。

---
**AG 启动握手协议:**
如果你理解了以上指令，请在每次对话开始时，先列出你要检索的 Skill 文件名，再开始工作。