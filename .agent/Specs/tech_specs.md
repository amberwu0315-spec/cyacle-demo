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
  - 子组件 (Sub-components) 使用命名导出 `export const SubName = ...`。
- **Defensive Rendering (防御性渲染):**
  - 所有接收 `data`, `node` 的组件，**必须**在渲染前进行非空校验。
  - 示例：`if (!node) return <EmptyState />;`
  - 禁止在未校验的情况下直接调用 `.map()`。

## 3. Project Structure (项目结构)
- **Atomic Design:**
  - `components/views/`: 页面级视图 (Page Views)。
  - `components/views/[module]/components/`: 模块专用组件 (Local Components)。
- **Bricks Pattern:**
  - 复杂 UI 必须拆分为 `Container` (逻辑层) 和 `Bricks` (展示层/积木)。

## 4. Environment Safety (环境安全)
- **No Residual Code:** 严禁在最终代码中保留 `console.log`、`// TODO` 或未使用的 import。
- **Context Usage:** 使用 `useContext` 时必须处理 Context 为 `undefined` 的情况 (即组件在 Provider 外部渲染时的回退逻辑)。