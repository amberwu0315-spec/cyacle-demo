# Technical Engineering Specifications (工程技术规范)

## 1. Core Stack (核心技术栈)
- **Framework:** React (Vanilla JS context, no TypeScript unless specified).
- **Styling:** Tailwind CSS.
  - 禁止使用行内 `style` (除非用于动态计算值)。
  - 禁止引入额外的 `.css` 文件，全部使用 Utility Classes。
- **Icons:** **必须且只能**使用 `@tabler/icons-react`。
  - 严禁使用 `lucide-react` 或其他图标库。
  - 命名规范：使用 `IconPackage`, `IconSettings` 等带 `Icon` 前缀的组件名。

## 2. Component Pattern (组件开发模式)
- **Export Rule (导出规则):**
  - 必须使用 `export default function ComponentName` 作为主导出。
  - 禁止仅使用命名导出 (Named Export)，以防止父组件引用报错。
- **Defensive Rendering (防御性渲染):**
  - 所有接收 `data`, `node`, `list` 等 props 的组件，**必须**在渲染前进行非空校验。
  - 示例：`if (!data) return <div>Loading...</div>;`
  - 禁止在未校验的情况下直接调用 `.map()` 或 `.filter()`。
- **Prop Independence (Props 独立性):**
  - UI 组件应尽量设计为“纯展示组件 (Dumb Component)”。
  - 尽量避免在组件内部直接调用 `useContext` (如 `useHeader`)，除非是全局布局组件。数据应优先通过 Props 传入。

## 3. File Structure (文件结构)
- **Atomic Design:** 复杂组件（如面板）应拆分为 `Bricks` (积木/子组件) 和 `Container` (容器/逻辑)。
- **No Residual Code:** 这里的代码必须是**生产级 (Production Ready)** 的，严禁包含 `// TODO`, `console.log` 或未使用的变量。