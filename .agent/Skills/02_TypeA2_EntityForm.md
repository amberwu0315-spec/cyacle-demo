# Skill 02: Entity Form (实体表单)

## 1. 核心定义 (Identity)
* **类型:** Type A-2 (Object Creator / Editor)
* **适用场景:** * **新建 (Create):** 从无到有创建新对象（如“新建项目”）。
    * **重塑 (Update):** 在抽屉中对对象属性进行全量编辑。
* **容器载体:** 必须嵌入在 **InnerDrawer (对象抽屉)** 或 **CenterModal (全局弹窗)** 中。

## 2. 交互宪法 (Interaction Constitution)
> 基于 `specs/02_interaction_rules.md`

| 阶段 | 规则 | AI 执行指令 |
| :--- | :--- | :--- |
| **初始化** | **缓冲模式 (Buffer)** | 使用 `react-hook-form` 建立独立的数据缓冲区，**严禁**直接修改从 Props 传进来的原始数据。 |
| **编辑中** | **脏检查 (Dirty Check)** | 监听表单状态。只有当 `isDirty === true` (有修改) 时，才高亮“保存”按钮。 |
| **校验** | **实时反馈** | 使用 Zod 或 Yup 进行 Schema 校验。错误信息显示在输入框下方 (text-red-500 text-xs)。 |
| **提交** | **事务性 (Transactional)** | 点击保存 -> `isLoading` (按钮转圈) -> 等待 API -> 成功关闭抽屉 / 失败显示 Toast。 |

## 3. DNA 配置 (The 7 Elements)

| 要素 | 策略 | 强制规则 (Rules) |
| :--- | :--- | :--- |
| **Props** | `initialValues`, `onSubmit`, `onCancel` | 必须接收初始值（新建为空对象）、提交回调、取消回调。 |
| **State** | `useForm` | **核心大脑**。管理所有字段的值、错误、脏状态。 |
| **DOM** | `FormBlock` + `Grid` | 使用 `FormBlock` (from Interaction Rules) 包裹字段。使用 Grid 布局控制一行放几个。 |
| **Inputs** | **原子组件复用** | **严禁**手写 input 标签。必须调用 `specs/02_interaction_rules.md` 定义的 `EditableField` (mode="edit") 或标准 Input 组件。 |
| **Effect** | `reset()` | 当 `initialValues` 变化时（如切换了编辑对象），必须调用 `form.reset(newValues)`。 |
| **Context** | 字典消费 | 下拉框选项需从 `useContext(DictContext)` 或 Props 获取，禁止写死。 |

## 4. 代码骨架 (Skeleton Template)

```javascript
// 示例：新建/编辑项目表单
import { useForm, Controller } from "react-hook-form";
// 引入你的 UI 组件
import { InnerDrawer, Button, Input, Select, FormBlock } from "@/components"; 

export const ProjectFormDrawer = ({ open, onClose, initialValues, onSubmit }) => {
  // 1. 初始化表单大脑
  const { control, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues: initialValues || { name: "", type: "PCF", description: "" } // 默认值
  });

  // 2. 提交处理
  const onValid = async (data) => {
    await onSubmit(data); // 等待父组件处理 API
    onClose(); // 成功后关闭
  };

  return (
    <InnerDrawer open={open} onClose={onClose} title={initialValues ? "编辑项目" : "新建项目"}>
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col h-full">
        
        {/* === 滚动内容区 === */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* 块级分组 */}
          <FormBlock title="基本信息">
            {/* 字段 1: 名称 (必填) */}
            <div className="space-y-1">
                <label className="text-sm text-gray-500">项目名称</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "项目名称不能为空" }}
                  render={({ field }) => (
                    <Input {...field} error={errors.name?.message} placeholder="请输入..." />
                  )}
                />
            </div>

            {/* 字段 2: 类型 (Select) */}
            <div className="space-y-1">
                <label className="text-sm text-gray-500">需求类型</label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} options={[{label:'PCF', value:'PCF'}, ...]} />
                  )}
                />
            </div>
          </FormBlock>
          
        </div>

        {/* === 底部操作栏 (固定) === */}
        <div className="flex-none p-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <Button variant="ghost" onClick={onClose}>取消</Button>
          <Button type="submit" loading={isSubmitting} disabled={!isDirty}>
            保存
          </Button>
        </div>

      </form>
    </InnerDrawer>
  );
};