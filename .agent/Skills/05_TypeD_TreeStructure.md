# Skill 05: L3 Advanced Tree (L3 高级业务树) v3.0

## 1. 核心定义 (Identity)

* **类型:** Type D (Recursive Business Tree)
* **核心职责:** 渲染 Product -> Phase -> Module -> Process 的四层结构。

## 2. 视觉精度规范 (V3.0 Precision Rules)

### A. 轴向对齐与间距 (Axial Alignment & Spacing)
1.  **4px 律 (4px Law)**: 每一级子节点行（Row Container）距离其父层级引导线的水平间距固定为 **4px**。
2.  **过程垂直对齐 (Process Axial Alignment)**: 过程（Process）节点的业务图标必须精准对齐在父级模块（Module）节点的业务图标正下方。
3.  **对齐逻辑映射**:
    *   **Module**: `RowStart + 28px` 为模块图标中心（包含 20px 展开箭头 + 8px 间距）。
    *   **Process**: `RowStart + 14px` 为过程图标中心。
    *   通过此差额 (`28 - 14`) 保证不同 RowStart 的节点图标共轴。

### B. 连接线渲染 (Connector Rendering)
1.  **连线终点**: 垂直引导线必须恰好结束于最后一个子节点行的**水平中轴线**（中心位置），禁止向下穿出。
2.  **条件性**: 仅在存在有效下级时显示（阶段下有模块/过程，模块下有过程）。
3.  **轨道位置**: 引导线始终位于父级展开图标的**垂直中轴线**处。

### C. 选中与交互 (Selection & Interaction)
1.  **独立选中**: 选中高亮 (`bg-[#087F9C]`) 仅对当前行生效，严禁包含下级节点。
2.  **图标方案**: 
    - 展开图标背景为纯白色，**无边框、无阴影**。
    - 选中时，图标背景变为透明（透出底色），图标本身变为白色 (`text-white`)。
3.  **文本着色**: 统一使用 `text-gray-900`。

## 3. 层级架构约束
*   **五级限制**: 严禁跳级，严禁出现同层级混合类型。
*   核算产品 (L0) -> 阶段 (L1) -> 模块 (L2) -> 过程 (L3)。