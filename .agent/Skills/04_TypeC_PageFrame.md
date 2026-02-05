# Skill 04: Page Frame (页面骨架)

## 1. 核心定义 (Identity)
* **类型:** Type C (Layout Container)
* **适用场景:** 所有 L2/L3 业务页面的**顶层容器**。
* **核心职责:** * 负责页面的宏观布局（单栏/双栏/画布）。
    * 负责与全局 Workbench Header 通信（注入标题和操作按钮）。
    * **不负责**具体的业务内容渲染（那是 Skill 02/03 的事）。

## 2. 交互宪法 (Interaction Constitution)
> 严格遵循 `specs/06_ui_framework.md` 定义的 "Workbench Geometry"

| 区域 | 规则 | AI 执行指令 |
| :--- | :--- | :--- |
| **容器** | **统一外壳** | 所有页面必须被包裹在三大核心模板组件之一中，**严禁**直接从 `<div>` 开始写页面。 |
| **Header** | **远程注入** | 页面**严禁**自带 Header DOM。必须通过 `useHeaderContext` 将标题和按钮“传送”到全局 Header 中。 |
| **Scroll** | **滚动托管** | * **Single:** 容器负责滚动。 * **Double:** 左右独立滚动。 * **Canvas:** 锁死无滚动（由内部组件接管）。 |
| **Spacing**| **统一间距** | 默认内边距统一为 `p-3` (12px)，模块间距 `gap-3`。 |

## 3. DNA 配置 (The 7 Elements)

| 要素 | 策略 | 强制规则 (Rules) |
| :--- | :--- | :--- |
| **Template** | **组件复用** | 必须从 `@/components/layout` 引入 `<SingleColumnPage>`, `<DoubleColumnPage>` 或 `<CanvasPage>`。 |
| **Hook** | `useHeaderContext` | 进入页面时，必须调用 `setHeader({ title: "...", actions: [...] })`。 |
| **Effect** | **清理机制** | 组件卸载 (Unmount) 时，Header 配置会自动重置（由 Context 内部处理），无需手动清理。 |
| **Layout** | **响应式** | 双栏布局在移动端应自动堆叠 (Stack)，但在本项目 (SPA) 中主要针对 Desktop 优化。 |

## 4. 模式详解与代码骨架 (Patterns & Skeletons)

### 模式 A: 单栏页面 (SingleColumnPage)
> 最常用的业务页面（表单、详情、设置）。

```javascript
import { useEffect } from "react";
import { SingleColumnPage } from "@/components/layout";
import { useHeaderContext } from "@/context/HeaderContext";
import { Button } from "@/components/ui";

export const ProjectSettingsPage = () => {
  const { setHeader } = useHeaderContext();

  // 1. 注入 Header (标题 + 操作)
  useEffect(() => {
    setHeader({
      title: "项目设置",
      breadcrumb: ["项目", "配置"], // 可选
      rightZone: (
        <div className="flex gap-2">
          <Button variant="outline">重置</Button>
          <Button>保存</Button>
        </div>
      )
    });
  }, [setHeader]);

  // 2. 渲染内容 (自动垂直滚动)
  return (
    <SingleColumnPage>
       <div className="bg-white p-6 rounded-lg shadow-sm">
         {/* 业务内容 */}
       </div>
       <div className="bg-white p-6 rounded-lg shadow-sm">
         {/* 更多内容 */}
       </div>
    </SingleColumnPage>
  );
};

### 模式 B: 双栏页面 (DoubleColumnPage)
> 适用于左侧导航/目录，右侧内容的场景。
import { DoubleColumnPage } from "@/components/layout";
// ... imports

export const KnowledgeBasePage = () => {
  // ... setHeader 逻辑同上

  return (
    <DoubleColumnPage
      // 变体: standard (独立) | sidebar (左侧吸顶)
      variant="sidebar" 
      
      // 左栏渲染 (25% width)
      leftRender={
        <div className="bg-white h-full rounded-lg p-4">
          <MenuTree />
        </div>
      }
      
      // 右栏渲染 (75% width)
      rightRender={
        <div className="bg-white min-h-full rounded-lg p-6">
          <ArticleContent />
        </div>
      }
    />
  );
};


### 模式 C: 画布页面 (CanvasPage)
> 适用于 DataGrid、地图、全屏编辑器。
import { CanvasPage } from "@/components/layout";

export const DataGridPage = () => {
  // Canvas 页面的 Header 通常包含视图切换器
  useEffect(() => {
    setHeader({
      title: "排放因子库",
      rightZone: <ViewSwitcher />
    });
  }, []);

  return (
    <CanvasPage>
      {/* 这里的 div 会撑满剩余空间，且没有外层滚动条 */}
      <div className="h-full w-full bg-white rounded-lg overflow-hidden">
        <ComplexDataGrid />
      </div>
    </CanvasPage>
  );
};
