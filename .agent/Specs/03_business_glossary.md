# 📖 领域术语表 (Domain Glossary)

> **⚠️ CRITICAL (关键)**:
> 本文档定义了项目中所有专业术语的中英文对照标准。
> AI 在生成文案、起草文档或编写代码注释时，必须严格遵守此映射表，严禁混用或创造新词。

---

## 1. 核心概念 (Core Concepts)

### A. 基础术语
| English Term | Chinese Standard | Alias (禁止使用) | Definition |
| :--- | :--- | :--- | :--- |
| **Allocation** | **分配** | 分摊, 配额 | 将环境负荷划分给副产品或回收过程的方法。 |
| **Unit Process** | **单元过程** | 单位流程, 单体过程, 工序 | 生命周期评估中进行输入输出数据收集的最小单元。 |
| **Functional Unit** | **功能单位** | 功能单元 | 用来量化产品系统性能的参照单位 (如 "1 kg 钢材")。 |
| **System Boundary** | **系统边界** | 系统范围 | 纳入核算范围的生命周期阶段集合。 |
| **Cut-off Criteria** | **取舍准则** | 截止标准, 切断规则 | 决定哪些物质或能量流因贡献微小而被忽略的规则。 |

### B. 数据分类
| English Term | Chinese Standard | Description |
| :--- | :--- | :--- |
| **Foreground Data** | **前景数据** | 企业可以直接采集、控制的特定数据 (如某工厂实际电耗)。 |
| **Background Data** | **背景数据** | 无法直接测量，需引用通用数据库的数据 (如国家电网平均排放因子)。 |
| **Activity Data** | **活动数据** | 量化单元过程活动的物理量 (如 用电度数、燃油升数)。 |
| **Emission Factor** | **排放因子** | 将活动数据转化为温室气体排放量的系数。 |

---

## 2. 业务缩写 (Acronyms)

| Acronym | Full Name | Chinese Standard |
| :--- | :--- | :--- |
| **LCA** | **Life Cycle Assessment** | 生命周期评价 |
| **CFP** | **Product Carbon Footprint** | 产品碳足迹 |
| **CFO** | **Organizational Carbon Footprint** | 组织碳足迹 |
| **GWP** | **Global Warming Potential** | 全球变暖潜势 |
| **PCR** | **Product Category Rules** | 产品类别规则 |
| **BOM** | **Bill of Materials** | 物料清单 |

---

## 3. 系统特定名词 (System Specifics)

| English Term | Chinese Standard | Context |
| :--- | :--- | :--- |
| **Project Tag** | **项目标签** | 左侧 L1 导航栏中代表具体项目的图标/入口。 |
| **Context Mode** | **上下文模式** | L2 Header 显示项目名称而非功能名称的状态。 |
| **Footer Modal** | **底部抽屉** | 点击底部 Footer 按钮后唤起的覆盖式面板。 |
| **Workspace** | **工作空间** | 用户的顶层容器，包含所有项目。 |
| **Lineage** | **血统/来源** | 标识数据节点的原始出处（自建或继承）。 |
| **Screened** | **被屏蔽** | 继承节点被软删除的状态，不参与核算。 |
| **Origin** | **来源属性** | 节点对象中的关键标识字段（`self` / `inherited`）。 |
| **Calc Status** | **核算状态** | 节点当前的计算进度（待处理、完成、异常）。 |
