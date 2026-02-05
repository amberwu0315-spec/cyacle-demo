# Skill 06: Polymorphic Panel (多态面板)

## 1. 核心定义 (Identity)
* **类型:** Type E (Contextual Router & Composer)
* **适用场景:** L3 核算页面的右侧详情区。
* **核心职责:** 将“节点类型”与“业务状态”映射为具体的**组件积木组合**，管理面板内的空状态、提示区与对比模式。

## 2. 交互宪法 (Interaction Constitution)

| 规则 | 定义 | AI 执行指令 |
| :--- | :--- | :--- |
| **层级特异性** | **Product > Phase > Module** | **产品级**独占 Top10 图表；**模块级**独占重要问题识别；**阶段级**只有基础表格。 |
| **提示区逻辑** | **自动消隐** | `HintSection` 默认显示。当 `status === 'completed'` (已完成) 时，必须自动卸载/隐藏该区域。 |
| **过程分流** | **SubType 分流** | 过程节点必须根据 `subType` (常规/拆分/整体) 渲染完全不同的配置表单，不可混用。 |
| **对比穿透** | **Props Drilling** | 若 `context === 'compare'`，必须向所有子积木 (`ConfigParams`, `VarInfo`, `Header`) 传入 `compareMode={true}` 以触发 Diff 高亮。 |

## 3. DNA 配置 (The 7 Elements)

| 要素 | 策略 | 强制规则 (Rules) |
| :--- | :--- | :--- |
| **Structure**| **Stack** | 垂直堆叠布局 (`flex-col space-y-4`)。 |
| **Guard** | **Null Check** | 切换节点时，若 `node` 为空或数据未加载，显示骨架屏。 |
| **Routing** | **Strict Map** | 严禁使用 `if-else` 面条代码，必须遵循下方的 "Routing Map" 进行组件组装。 |

## 4. 详细路由逻辑矩阵 (The Routing Map)

### A. 聚合层级 (Aggregation Layers)

| 节点类型 | 内容状态 | 渲染积木栈 (从上到下) | 关键业务特征 |
| :--- | :--- | :--- | :--- |
| **产品 (Product)** | **空状态** | 1. `Header` (Title Only)<br>2. `HintSection`<br>3. `EmptyState` (Action: Add Phase) | |
| **产品 (Product)** | **有内容** | 1. `Header` (Title + Result)<br>2. **`ChartSection` (Top 10)**<br>3. `EmissionDetail` (Tabs: Phase/Module/Process) | **唯一拥有 Top 10 图表** |
| **阶段 (Phase)** | **空状态** | 1. `Header` (Title Only)<br>2. `HintSection`<br>3. `EmptyState` (Action: Add Module) | |
| **阶段 (Phase)** | **有内容** | 1. `Header` (Title + Result + Func)<br>2. `EmissionDetail` (Tabs: Module/Process) | 无图表，仅表格 |
| **模块 (Module)** | **空状态** | 1. `Header` (Title + Func)<br>2. `HintSection`<br>3. `EmptyState` (Action: Add Process) | |
| **模块 (Module)** | **有内容** | 1. `Header` (Title + Result + Func)<br>2. `EmissionDetail` (Tabs: Process)<br>3. **`ImportantIssues`** | **独有：重要问题识别列表** |

### B. 原子过程 (Atomic Process)

| 子类型 | 配置进度 | 渲染积木栈 (从上到下) | 积木状态定义 |
| :--- | :--- | :--- | :--- |
| **常规 (Normal)** | **配置中** | 1. `Header` (Title + Func)<br>2. `HintSection`<br>3. `ConfigParams` (Form Mode)<br>4. `VarInfo` (Disabled) | **配置参数:** 输入框+单位选择<br>**变量信息:** 置灰不可点 |
| **常规 (Normal)** | **已完成** | 1. `Header` (Title + Result + Func)<br>2. `HintSection` (Hidden)<br>3. `ConfigParams` (Read Mode)<br>4. `VarInfo` (Active)<br>5. **`AnalysisResult`** | **配置参数:** 纯文本+编辑钮<br>**新增:** 结果分析图表 |
| **拆分 (Split)** | **配置中** | 1. `Header` (Title + Func)<br>2. `HintSection`<br>3. `ConfigParams` (**Split Rules**)<br>4. `VarInfo` | **配置参数:** 拆分比例分配表单 |
| **拆分 (Split)** | **已完成** | 1. `Header` (Title + Func)<br>2. `HintSection` (Hidden)<br>3. `ConfigParams` (Split Read)<br>4. `VarInfo` | **特例:** 完成态**不显示**结果分析区 |
| **整体 (Whole)** | **(默认)**| 1. `Header` (Title + Result + Func)<br>2. `HintSection` (Hidden)<br>3. `ConfigParams` (**Source Card**)<br>4. `VarInfo`<br>5. **`AnalysisResult`** | **配置参数:** 引用源只读卡片 |

## 5. 标准积木库详解 (Module Specifications)

### [M01] Header (动态头部)
* **Props:** `node`, `status`
* **显示逻辑:**
    * **Empty:** 仅显示图标 + 标题。
    * **Configuring:** 增加“功能按钮区” (如重置)。
    * **Completed:** 增加“评估结果区” (数值/单位/不确定性Badge) + “功能按钮区”。

### [M02] EmissionDetail (排放详情)
* **Props:** `tabs` (Array), `showChart` (Boolean)
* **逻辑:**
    * 包含 Tab 切换器 (Phase / Module / Process)。
    * **Top 10 Chart:** 仅当 `showChart=true` (产品级) 时渲染 ECharts 环形图。
    * **Table:** 渲染当前层级下的所有子节点列表。

### [M03] ConfigParams (配置参数 - 核心)
* **Props:** `subType`, `mode` ('edit' | 'read'), `compareMode`
* **变体 (Variants):**
    * **Input Form (常规-编辑):** `Input` (活动水平) + `Select` (单位)。支持脏检查自动保存。
    * **Text Display (常规-只读):** 纯数值文本 + “编辑”Icon。
    * **Split Rule (拆分):** 分配方式选择 (质量/价值) + 百分比输入。
    * **Source Card (引用):** 来源库/版本号/原过程名称 (Skill 03 Card)。

### [M04] VarInfo (变量信息)
* **Props:** `disabled` (Boolean), `compareMode`
* **逻辑:**
    * 渲染输入流 (Input Flow) 和输出流 (Output Flow) 列表。
    * `disabled=true` 时，列表透明度降低，禁止点击跳转。

### [M05] ImportantIssues (重要问题)
* **Props:** `issues` (Array)
* **逻辑:** 仅模块级显示。渲染红/黄/蓝预警条目列表。

## 6. 代码骨架 (Smart Router Skeleton)

```javascript
export const L3DetailPanel = ({ node, context = 'config' }) => {
  if (!node) return <div className="flex h-full items-center justify-center text-gray-400">请选择节点</div>;

  const isCompare = context === 'compare';
  // 核心状态推导
  const isCompleted = node.status === 'completed' || node.subType === 'whole_ref';
  const showHint = !isCompleted; 

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto custom-scrollbar">
      {/* 1. Header: 根据完成状态显示结果区 */}
      <L3Header node={node} showResult={isCompleted} />

      {/* 2. Hint: 完成后自动隐藏 */}
      {showHint && (
        <div className="px-6 pt-4">
          <HintSection hints={node.hints || []} />
        </div>
      )}

      <div className="p-6 space-y-6 flex-1">
        {/* === 分支 A: 聚合视图 (Product/Phase/Module) === */}
        {['product', 'phase', 'module'].includes(node.type) && (
          node.hasData ? (
            <>
              {/* 产品级独有 Top10 图表 */}
              <EmissionDetail 
                node={node} 
                showChart={node.type === 'product'} 
              />
              {/* 模块级独有重要问题 */}
              {node.type === 'module' && <ImportantIssues issues={node.issues} />}
            </>
          ) : (
            <EmptyState type={`add_${getNextLevel(node.type)}`} />
          )
        )}

        {/* === 分支 B: 原子视图 (Process) === */}
        {node.type === 'process' && (
          <>
            {/* 配置参数: 核心多态区域 */}
            <ConfigParams 
              node={node}
              mode={isCompleted ? 'read' : 'edit'}
              compareMode={isCompare}
            />

            {/* 变量信息: 正常显示 */}
            <VarInfo 
              node={node} 
              compareMode={isCompare}
            />

            {/* 分析结果: 仅完成态显示 (拆分引用除外) */}
            {isCompleted && node.subType !== 'split_ref' && (
              <AnalysisResult node={node} />
            )}
          </>
        )}
      </div>
    </div>
  );
};