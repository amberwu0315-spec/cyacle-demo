# Skill 03: Data Display (数据展示)

## 1. 核心定义 (Identity)
* **类型:** Type B (Read-Only Presenter)
* **适用场景:** * **List/Grid:** 数据卡片列表（如项目列表）。
    * **Table:** 业务数据表格（如排放因子库）。
    * **Detail:** 只读详情页的信息展示。
* **核心职责:** 负责将后端数据 (`JSON`) 转化为符合视觉规范的 DOM 结构，处理加载与空状态。

## 2. 交互宪法 (Interaction Constitution)
> 视觉样式严格遵循 `specs/01_design_system.md` 和 `specs/06_ui_framework.md`

| 状态 | 规则 | AI 执行指令 |
| :--- | :--- | :--- |
| **Loading** | **骨架屏 (Skeleton)** | **严禁**使用简单的 "Loading..." 文字。必须根据展示类型（卡片/表格）渲染对应的 `animate-pulse` 骨架占位图。 |
| **Empty** | **占位提示** | 当 `data.length === 0` 时，必须显示标准的 Empty State 组件（图标+文案），并提供“新建”按钮的插槽。 |
| **Error** | **容错显示** | 某个字段缺失时，显示 `-` 或 `--`，**严禁**直接崩溃或显示 `undefined`/`null`。 |
| **Hover** | **操作浮现** | 对于卡片/表格行，操作按钮（编辑/删除）默认隐藏/低透明度，Hover 时高亮显示。 |

## 3. DNA 配置 (The 7 Elements)

| 要素 | 策略 | 强制规则 (Rules) |
| :--- | :--- | :--- |
| **Props** | `data`, `loading`, `columns` | 组件必须设计为“受控”的，数据完全由父组件传入。不自行请求 API。 |
| **DOM** | **语义化标签** | 表格必须用 `<table>` (或 `role="table"`)，列表使用 `<ul>/<li>` 或 `Grid`。 |
| **Mapping** | **配置化渲染** | 表格列定义必须通过 `columns` 数组配置，禁止在 JSX 里硬编码每一列。 |
| **Slot** | **自定义渲染** | 支持 `renderCell` 或 `slot`，以便在纯文本列表中插入“状态标签”或“操作按钮”。 |
| **Format** | **数据清洗** | 日期必须格式化 (YYYY-MM-DD)，金额/数值必须千分位分隔。 |
| **Performance**| **分页/虚拟化** | 超过 100 条数据时，建议使用分页或虚拟滚动。 |

## 4. 模式详解与代码骨架 (Patterns & Skeletons)

### 模式 A: 数据卡片网格 (Data Card Grid)
> 对应 `specs` 中的 "01. 数据卡片"

* **布局:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
* **骨架代码:**

```javascript
// DataCardGrid.jsx
export const DataCardGrid = ({ data, loading, onItemClick, renderActions }) => {
  // 1. 处理 Loading
  if (loading) {
    return <div className="grid...">{/* 渲染 6 个 SkeletonCard */}</div>;
  }

  // 2. 处理 Empty
  if (!data?.length) {
    return <EmptyState title="暂无数据" />;
  }

  // 3. 渲染列表
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((item) => (
        <div key={item.id} 
             className="group relative bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-[#EDF7FA] p-4 transition-all border border-transparent hover:border-[#D6D9DC]"
             onClick={() => onItemClick(item)}
        >
          {/* 头部：图标 + 名称 */}
          <div className="flex items-center gap-3 mb-3">
             <ItemIcon type={item.type} />
             <h3 className="font-medium text-gray-900 group-hover:text-[#087F9C]">{item.name}</h3>
          </div>
          
          {/* 内容：关键指标 (根据 spec 只有 Detail 模式才显示) */}
          <div className="text-xs text-gray-500 space-y-1">
             <div>ID: {item.shortId}</div>
             <div>更新于: {item.updateTime}</div>
          </div>

          {/* 悬浮操作栏 (Absolute) */}
          <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
            {renderActions?.(item)}
          </div>
        </div>
      ))}
    </div>
  );
};


### 模式 B: 业务表格 (Object Table)
> 对应 specs 中的 "03. 对象表格"

* 样式: 斑马纹，固定行高。
* **骨架代码:**
// ObjectTable.jsx
export const ObjectTable = ({ columns, data, loading }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left">
        {/* 表头: 灰色背景 */}
        <thead className="text-gray-500 bg-[#EDF7FA] h-9">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 font-medium">{col.title}</th>
            ))}
            <th className="px-4 text-right">操作</th>
          </tr>
        </thead>
        
        {/* 表体 */}
        <tbody className="divide-y divide-gray-100">
          {data.map((row, index) => (
            <tr key={row.id} className={`h-9 hover:bg-blue-50 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
              {columns.map((col) => (
                <td key={col.key} className="px-4 text-gray-700">
                  {/* 支持自定义 render 函数，否则直接显示文本 */}
                  {col.render ? col.render(row[col.key], row) : row[col.key] || '-'}
                </td>
              ))}
              {/* 固定操作列 */}
              <td className="px-4 text-right">
                 <ActionButtons row={row} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};