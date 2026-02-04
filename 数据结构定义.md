# 💽 数据模型字典 (Data Schema Registry)

> **⚠️ CRITICAL**: 本文档定义系统核心实体的数据结构。
> 所有 Mock Data、API 接口定义、以及前端 PropTypes/TypeScript 接口必须严格遵守此处的字段命名与类型定义。

---

## 1. 核心实体 (Core Entities)

### 🏗️ Project (项目)
**定义**: 管理碳核算的顶层容器。

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` (UUID) | 唯一标识符 |
| `name` | `string` | 项目名称 (Title) |
| `research_object_name` | `string` | 所属研究对象 (Enterprise) |
| `type` | `enum` | 需求类型: `"PCF"` (产品碳足迹) \| `"OCF"` (组织碳足迹) |
| `description` | `string` | 项目备注/描述 |
| `standard` | `string` | 采用标准 (e.g., "ISO 14067") |
| `owner` | `string` | 负责人名称 |
| `created_at` | `date` | 创建时间 (YYYY-MM-DD) |
| `updated_at` | `date` | 更新时间 (YYYY-MM-DD) |
| `status` | `enum` | 状态: `"draft"` \| `"archived"` |

### 📦 Model (模型)
**定义**: 项目下的具体核算单元（如某个具体产品的模型）。

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` (UUID) | 唯一标识符 |
| `project_id` | `string` (UUID) | 所属项目 ID |
| `name` | `string` | 模型名称 |
| `type` | `enum` | 类型: `"product"` (产品) \| `"part"` (零部件) \| `"material"` (材料) |
| `lifecycle_stage` | `enum` | 生命周期阶段: `"cradle_to_gate"` (摇篮到大门) \| `"cradle_to_grave"` (摇篮到坟墓) |
| `functional_unit` | `string` | 功能单位 (e.g., "1 kg", "1 piece") |
| `status` | `enum` | 状态: `"draft"` \| `"published"` |
| `version` | `string` | 版本号 (e.g., "v1.0") |

---

## 2. 基础数据库 (Background Data)

### 🧪 Factor (排放因子)
**定义**: 用于计算碳排放的基础系数数据。

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` (UUID) | 唯一标识符 |
| `name` | `string` | 因子名称 |
| `category` | `string` | 分类 (e.g., "Electricity", "Transport") |
| `value` | `number` | 排放数值 (CO2e) |
| `unit` | `string` | 单位 (e.g., "kgCO2e/kWh") |
| `source` | `string` | 数据来源 (e.g., "Ecoinvent 3.8", "CLCD") |
| `region` | `string` | 适用区域 (e.g., "CN", "EU", "Global") |
| `year` | `number` | 数据年份 |
| `quality_score` | `number` | 数据质量评分 (1-5) |

### 🏭 Component (元件/零部件)
**定义**: 预定义的、可复用的零部件数据。

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` (UUID) | 唯一标识符 |
| `name` | `string` | 元件名称 |
| `material_type` | `string` | 材质类型 (e.g., "Steel", "Plastic") |
| `weight` | `number` | 重量 |
| `weight_unit` | `string` | 重量单位 (e.g., "kg") |
| `processing_method`| `string` | 加工工艺描述 |

---

## 3. 核算过程 (Accounting Process)

### 🔄 UnitProcess (单元过程)
**定义**: 碳核算流程中的最小活动节点。

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` (UUID) | 唯一标识符 |
| `model_id` | `string` (UUID) | 所属模型 ID |
| `name` | `string` | 过程名称 (e.g., "Injection Molding") |
| `type` | `enum` | 类型: `"production"` \| `"transport"` \| `"usage"` |
| `input_flows` | `Flow[]` | 输入流 (原料、能源) |
| `output_flows` | `Flow[]` | 输出流 (产品、废弃物) |

### 🌊 Flow (流)
**定义**: 单元过程的输入或输出物质。

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` (UUID) | 唯一标识符 |
| `name` | `string` | 流名称 |
| `amount` | `number` | 数量 |
| `unit` | `string` | 单位 |
| `factor_id` | `string` (UUID) | 关联的排放因子 ID (Optional) |

---

## 4. L2 页面特定数据 (Page Specific Schemas)

### 🏢 ResearchObject (研究对象)
**定义**: L1列表及L2基础页面展示的企业或工厂主体信息。

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` (UUID) | 唯一标识符 |
| `name` | `string` | 企业全称 |
| `short_name` | `string` | 企业简称 (List View) |
| `industry` | `string` | 所属行业 (e.g., "建筑装饰", "金属制品") |
| `location` | `string` | 所在地 (e.g., "河南省/鹤壁市") |
| `creator_name` | `string` | 创建人 (e.g., "133...", "nan.shi") |
| `created_at` | `datetime` | 创建时间 (YYYY-MM-DD HH:mm:ss) |
| `address` | `string` | 详细经营地址 (Detail View) |
| `contact_name` | `string` | 联系人姓名 (Detail View) |
| `contact_email` | `string` | 联系人邮箱 (Detail View) |
| `introduction` | `string` | 企业简介 (Detail View) |

### 🏷️ TypeViewSetting (类型视图配置)
**定义**: L2基础页面中配置的层级类型映射规则。

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `number` | 唯一标识符 |
| `source` | `string` | 数据来源库 (e.g., "数据库A") |
| `level1_type` | `string` | 一级分类 (e.g., "建筑材料") |
| `level2_type` | `string` | 二级分类 (e.g., "门窗系统") |

### 📝 ProjectBasicInfo (项目基础扩展)
**定义**: L2基础页面展示的项目元数据 (映射至核心 Project 实体)。

| Field | Type | Map to Core |
| :--- | :--- | :--- |
| `demand_type` | `string` | `Project.type` ("产品碳足迹") |
| `creator` | `string` | `Project.owner` |
| `create_time` | `datetime` | `Project.created_at` |
| `update_time` | `datetime` | `Project.updated_at` |
| `remark` | `string` | `Project.description` |

### 📊 AccountingBasicInfo (核算基础信息)
**定义**: L3核算页面展示的核心模型配置信息 (Module: 基础信息)。

| Field | Type | Description |
| :--- | :--- | :--- |
| `model_name` | `string` | 模型名称 |
| `system_boundary` | `enum` | 系统边界 ("从摇篮到大门" \| "从摇篮到坟墓") |
| `accounting_period` | `date` | 核算周期 (YYYY-MM) |
| `geo_boundary` | `object` | 地理边界 `{id, name}` |

### 🧮 AnalysisSettings (分析设置)
**定义**: L3核算页面中的高级分析开关与阈值配置 (Module: 分析设置)。

| Field | Type | Description |
| :--- | :--- | :--- |
| `is_exclusion_enabled` | `boolean` | 启用排除计算 |
| `exclusion_threshold_importance` | `number` | 排除计算-重要性阈值 (%) |
| `exclusion_threshold_cut_off` | `number` | 排除计算-排除性阈值 (%) |
| `is_data_quality_enabled` | `boolean` | 启用数据质量打分 (System Mandatory) |
| `is_sensitivity_enabled` | `boolean` | 启用敏感性分析 |
| `sensitivity_threshold` | `number` | 敏感性分析-波动区间 (%) |
| `sensitivity_method_fluctuation` | `boolean` | 敏感性方法-按重要数据波动区间分析 |
| `sensitivity_method_uncertainty` | `boolean` | 敏感性方法-按重要数据不确定性分析 |
| `is_issues_enabled` | `boolean` | 启用重要问题识别 (System Mandatory) |
| `quantification_method_deduction` | `boolean` | 温室气体量化-排放因子法 |
| `quantification_method_mass_balance`| `boolean` | 温室气体量化-质量守恒法 |

### ⚙️ AccountingMethodConfig (核算设置)
**定义**: L3核算页面中的方法学标准配置 (Module: 核算设置)。

| Field | Type | Description |
| :--- | :--- | :--- |
| `standard` | `enum` | 项目执行标准 ("ISO 14067") |
| `report_template` | `enum` | 适用报告模板 ("通用产品碳足迹报告") |
| `quality_system` | `enum` | 质量打分体系 ("蒙特卡洛法", "误差传递法") |
| `is_multi_language` | `boolean` | 需要多语言报告 |
