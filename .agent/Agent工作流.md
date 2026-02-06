AGENT SYSTEM INSTRUCTIONS (ROOT)
⚠️ 第0条铁律：语言强制约束 (Language Override)
CRITICAL (关键)：此规则优先级高于所有其他指令。

强制输出语言：简体中文

所有回复内容必须使用简体中文。

禁止出现英文思维痕迹或中英夹杂。

允许例外： 代码关键字、库名、变量名。

自检机制： 生成前问自己："我是否在用中文思考？"

⚠️ 第1条铁律：原型优先原则 (Prototype First)
CRITICAL (关键)：一切为了演示效果 (All for Demo)，无需对后端负责。

视觉欺骗 (Visual Deception)：

允许并在必要时必须使用硬编码 Mock 数据、前端状态模拟（上传中/成功）、setTimeout 延迟。

禁止为了“代码复用”或“数据范式”而牺牲前端渲染的直接性。

体验过剩 (Over-Engineering)：

允许为了微交互（Hover、点击波纹、Fitts定律优化）编写看似“冗余”的 DOM 结构。

无后端假设：

严禁以“后端难以实现”为由砍掉交互细节。数据结构怎么方便前端展示就怎么写。

2. 知识锚点 (Knowledge Anchors) - 🚨 最重要部分
为了防止你“失忆”，在编写任何功能前，必须强制检索以下定义：

交互模式库: @Skills/ 文件夹

录入/编辑: 必须阅读 01_TypeA1_AtomicEdit.md 和 02_TypeA2_EntityForm.md。

禁止原生: 严禁使用 <input>, <select> 或 Mantine 原生 TextInput。必须使用 Skill 中定义的 <EditableField />。

全局规范: @Specs/ 文件夹

视觉: 01_design_system.md (颜色/间距)。

交互: 02_interaction_rules.md (脏检查/Loading延迟)。

3. 技术栈锁定 (Tech Stack)
样式体系： - Tailwind CSS：用于布局 (Layout) 和间距 (Spacing)。

Mantine v7：用于基础组件 (Components) 和 Hooks。

理由：v7 已移除 CSS-in-JS，改用 CSS Modules。

原则： 优先使用 Skill 封装组件 > Mantine 现成组件 > 手写 HTML。

4. 拒绝偷懒 (Anti-Laziness)
完整输出： 禁止使用 "// ... rest of code"。

即插即用： 每次变更输出完整函数，确保我可以无缝替换。

深度思考： 代码前必须包含 <Thoughts> 块，解释实现路径。

5. 交互原型实现细节 (Prototype Implementation)
模拟延迟: 所有的保存/上传操作必须包含 await new Promise(r => setTimeout(r, 600)) 以模拟真实感。

视觉闭环: 操作后必须有明确的 UI 状态变更（如：变成已保存状态、出现 Toast、列表刷新）。

校验降级: 仅需前端视觉层面的简单校验 (required), 无需复杂的 Zod Schema。

AG 启动握手协议: 如果你理解了以上指令，请在每次对话开始时，先列出你要检索的 Skill 文件名，再开始工作。