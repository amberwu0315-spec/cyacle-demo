// ==========================================
/**
 * Mock Data Definitions & Scenarios
 * 
 * 我们定义的 “场景 ABCD” 是为了区分同一份数据在不同界面下的用途和展示形态。
 *
 * [场景 A：管理列表页 (Management List)]
 * - 定义：L2 菜单点进去的主页面列表。
 * - 特点：全量数据。包括所有状态（启用、禁用、草稿、已删除），用于管理员进行维护和管理。
 * - 字段需求：最全。需要 ID、名称、状态、创建时间、更新时间、所有属性。
 *
 * [场景 B：首页/概览卡片 (Dashboard)]
 * - 定义：工作台首页 (Workbench) 或概览页上的小卡片。
 * - 特点：摘要数据。通常只取“最近更新”的前几条，或者“待办”状态的数据。
 * - 字段需求：极简。通常只需要 名称、状态、时间、关键指标（如进度%）。
 *
 * [场景 C：详情页/关联表格 (Detail View)]
 * - 定义：点进某个父级对象（如项目、研究对象）后，里面的 Tab 页或子表格。
 * - 特点：关联数据。例如“项目详情页”里的“成员列表”或“版本记录”。
 * - 注意：如果同一类数据出现在不同父级页面的详情里（例如“文献因子”既在“项目详情”也在“数据库详情”中出现），请拆分为 [场景 C1]、[场景 C2] 分别描述。
 * - 字段需求：与上下文相关。比如成员列表需要显示“角色”和“加入时间”。
 *
 * [场景 D：选择弹窗 (Selection Modal)]
 * - 定义：业务流程中的“选择对话框”（Picker）。
 * - 特点：可用数据。通常会过滤掉“已禁用”或“草稿”的数据，只展示能被引用的数据。
 * - 字段需求：辅助决策。除了名称，还需要显示规格、版本或来源，帮助用户选对东西。
 */

// ==========================================
// 核心业务数据 (对应 Workspace 下的 L2)
// ==========================================

// 1. 项目数据 (Entity: Project)
// --------------------------------------------------------
// [场景A-列表视图] L2 项目列表页 (Workbench / ProjectList)
//    - 用途：展示用户参与的所有项目，支持状态筛选（进行中、已归档）。
//    - 关注字段：status, updateTime, description
//
// [场景B-首页概览] 工作台首页 (WorkbenchHome)
//    - 用途：Dashboard 中的“通过最近访问”或“进行中项目”卡片。
//    - 业务逻辑：通常取 updateTime 最近的前 N 条。
// --------------------------------------------------------
export const projectData = [
    { id: '1', name: '演示门窗有限公司', object: '演示门窗有限公司', type: 'CFO', status: 'active', createTime: '2026-01-28', updateTime: '2026-01-28', description: '这是一个用于演示门窗产品碳足迹核算的项目' },
    { id: '2', name: '演示门窗有限公司-产品碳足迹认证', object: '演示门窗有限公司', type: 'CFP', status: 'active', createTime: '2026-01-21', updateTime: '2026-01-21', description: '用于认证的产品碳足迹计算' },
    { id: '3', name: '查理猫粮无限2', object: '查理猫粮无限公司', type: 'CFP', status: 'draft', createTime: '2026-01-12', updateTime: '2026-01-12', description: '高端猫粮生产线碳足迹评估' },
    { id: '4', name: '查理猫粮无限公司-产品碳足迹', object: '查理猫粮无限公司', type: 'CFP', status: 'archived', createTime: '2026-01-12', updateTime: '2026-01-12', description: '旧版数据封存' },
    { id: '5', name: '演示五金制品有限公司-产品碳足迹认证', object: '演示五金制品有限公司', type: 'CFP', status: 'active', createTime: '2025-12-31', updateTime: '2025-12-31', description: '五金配件出口认证项目' },
    { id: '6', name: '示例硅油生产股份有限公司-产品碳足迹', object: '示例硅油生产股份有限公司', type: 'CFP', status: 'active', createTime: '2025-12-30', updateTime: '2025-12-30', description: '硅油生产全生命周期评估' },
    { id: '7', name: '（整体引用）福华通达草甘膦-产品碳足迹认证', object: '福华通达化学股份公司', type: 'CFP', status: 'active', createTime: '2025-12-04', updateTime: '2025-12-04', description: '草甘膦原药生产碳足迹' },
    { id: '8', name: '索尼（中国）有限公司-产品碳足迹认证', object: '索尼（中国）有限公司', type: 'CFP', status: 'completed', createTime: '2025-10-23', updateTime: '2025-10-23', description: '消费电子产品碳足迹核算' }
];

// 2. 研究对象数据 (Entity: ResearchObject)
// --------------------------------------------------------
// [场景A-列表视图] L2 碳全景页 (Carbon Panorama)
//    - 用途：企业/组织维度的资产总览。
//
// [场景D-选择弹窗] 创建项目时的对象选择 (Project Creation)
//    - 用途：新建项目时，必须选择一个关联的研究对象（主体）。
//    - 业务逻辑：强制单选，且必须是 status='active'。
// --------------------------------------------------------
export const researchObjectData = [
    { id: '1', name: '演示门窗有限公司', shortName: '演示门窗有限公司', industry: '建筑装饰、装修和其他建筑业', location: '河南省/鹤壁市', creator: '13310128160', createTime: '2026-01-21 10:28:12', status: 'active' },
    { id: '2', name: '用来删除的研究对象', shortName: '-', industry: '-', location: '-', creator: '13310128160', createTime: '2026-01-13 11:25:21', status: 'inactive' },
    { id: '3', name: '查理猫粮无限公司', shortName: '-', industry: '-', location: '-', creator: '13310128160', createTime: '2026-01-12 16:29:14', status: 'active' },
    { id: '4', name: '演示五金制品有限公司', shortName: '演示五金', industry: '金属制品业', location: '江苏省/南通市/崇川区', creator: '13310128160', createTime: '2025-12-31 13:56:26', status: 'active' },
    { id: '5', name: '示例硅油生产股份有限公司', shortName: '示例硅油', industry: '化学原料和化学制品制造业', location: '上海市/宝山区', creator: '13310128160', createTime: '2025-12-12 15:17:54', status: 'active' },
    { id: '6', name: '福华通达化学股份公司', shortName: '福华通达', industry: '化学原料和化学制品制造业', location: '四川省/乐山市', creator: 'nan.shi', createTime: '2025-11-10 14:48:05', status: 'active' },
    { id: '7', name: '索尼（中国）有限公司', shortName: '索尼', industry: '通用设备制造业', location: '北京市/朝阳区', creator: 'nan.shi', createTime: '2025-10-23 17:01:21', status: 'active' }
];

// ==========================================
// 背景数据 (对应 Background Data 下的 L2)
// ==========================================

// 3. 数据库实体 (Entity: Database) 
// --------------------------------------------------------
// [场景A-管理列表] L2 数据库管理页 (DatabaseManagementPage)
//    - 用途：管理员查看已购买或接入的所有数据库状态。
//
// --------------------------------------------------------
export const databaseData = [
    { id: '1', name: 'Ecoinvent', source: '自建', version: '1.0', year: '2025', fullName: '123123123123123', permission: '可使用', count: '-', avatarText: 'EI', avatarBg: 'bg-blue-100', avatarColor: 'text-blue-600', status: 'active' },
    { id: '2', name: '测试无权限', source: '标准', version: '1', year: '2020', fullName: '测试无权限', permission: '可使用', count: '-', avatarText: 'T1', avatarBg: 'bg-purple-100', avatarColor: 'text-purple-600', status: 'active' },
    { id: '3', name: '测试企业的工作...', source: '自建', version: '1.0', year: '2025', fullName: '测一下数据库全称的搜索', permission: '可使用', count: '-', avatarText: 'T2', avatarBg: 'bg-orange-100', avatarColor: 'text-orange-600', status: 'active' },
    { id: '4', name: 'Ecoinvent', source: '标准', version: '3.11', year: '2024', fullName: 'Ecoinvent', permission: '可使用', count: '-', avatarText: 'EI', avatarBg: 'bg-green-100', avatarColor: 'text-green-600', status: 'active' },
    { id: '5', name: 'CNDB', source: '标准', version: '2025', year: '2025', fullName: 'CNDB', permission: '可使用', count: '-', avatarText: 'CN', avatarBg: 'bg-yellow-100', avatarColor: 'text-yellow-600', status: 'active' }
];

// 4. 模型/计算实体 (Entity: Model/Process)
// --------------------------------------------------------
// [场景A-管理列表] L2 模型层级页 (ModelLevelPage)
//    - 用途：管理员或建模师查看所有“单元过程”模型。
//
// [场景D-选择弹窗] L3 过程引用 (Process Reference)
//    - 用途：在构建某个产品的生命周期时，引用已有的单元过程（比如引用一个“注塑工艺”）。
//    - 业务逻辑：展示全量的数据
//    - 关注字段：name, type, category, creator, updateTime, status, description    
// --------------------------------------------------------
export const modelData = [
    { id: 'm1', name: '注塑工艺模型', type: 'Process', category: '加工', creator: 'User A', updateTime: '2024-10-20', status: 'active', description: '通用注塑工艺，包含电力与冷却水消耗' },
    { id: 'm2', name: '公路运输-柴油货车', type: 'Transport', category: '运输', creator: 'User B', updateTime: '2024-10-18', status: 'active', description: '国V排放标准，载重10吨' },
    { id: 'm3', name: 'PET颗粒生产', type: 'Material', category: '原材料', creator: 'System', updateTime: '2024-09-15', status: 'active', description: '聚酯切片生产过程' },
    { id: 'm4', name: '废纸板回收', type: 'End-of-Life', category: '废弃处置', creator: 'User A', updateTime: '2024-08-30', status: 'draft', description: '打包回收处理' }
];

// 5. 元件 (Entity: Component)
// --------------------------------------------------------
// [场景A-管理列表] L2 元件库页面 (ComponentPage)
//    - 用途：展示全量元件数据（包括已淘汰的），供管理员进行维护、新增或状态变更。
//    - 关注字段：name, source, unitGroup, type, refUnit, status, updateTime
//
// [场景D-选择弹窗] L3 产品结构搭建 (BOM Building)
//    - 用途：在搭建产品结构时，从库中选择元件。
//    - 业务逻辑：展示全量的数据
//    - 关注字段：name, source, unitGroup, type, refUnit, status, updateTime
// --------------------------------------------------------
export const componentData = [
    { id: 'c1', name: '邻苯二甲酸二(2-乙基己)酯（DEHP', source: '自建', unitGroup: '常量单位', type: '原料-排放因子类', refUnit: '百分百', status: 'in_use', updateTime: '2025-02-11' },
    { id: 'c2', name: '邻苯二甲酸二(2-乙基己)酯（DEHP）', source: '标准', unitGroup: '质量', type: '其他类-排放因子类', refUnit: '千克', status: 'in_use', updateTime: '2025-02-10' },
    { id: 'c3', name: '邻苯二甲酸二(2-丙基庚)酯 (DPHP)', source: '标准', unitGroup: '质量', type: '其他类-排放因子类', refUnit: '千克', status: 'in_use', updateTime: '2025-02-09' },
    { id: 'c4', name: '邻苯二甲酸二(2-乙基己)酯（DEHP', source: '自建', unitGroup: '能量', type: '其他类-排放因子类', refUnit: '千瓦时', status: 'in_use', updateTime: '2025-02-08' }
];

// 7. 文献因子数据 (Entity: LiteratureFactor)
// --------------------------------------------------------
// [场景A-管理列表] L2 文献因子 (LiteratureFactor/LiteraturePage)
//    - 用途：展示系统中所有的文献因子数据。
//    - 关注字段：source, nameCN, nameEN, sourceDB, type, time, geo, tech
//
// [场景C-详情页] L2 元件详情 (LiteratureDetail)
//    - 用途：查看元件相关联的文献因子
//    - 关注字段：source, nameCN, nameEN, sourceDB, type, time, geo, tech
//
// [场景D-选择弹窗] L3 建模引用
//    - 用途：在建模过程中，排放因子配置项选择文献因子。
//    - 关注字段：source, nameCN, nameEN, sourceDB, type, time, geo, tech
// --------------------------------------------------------
export const literatureFactorData = [
    { id: 'lf1', source: '标准', nameCN: '国内飞机航程', nameEN: 'Domestic flight journey', sourceDB: 'CPCD 1', type: 'LCIA', time: '2020', geo: '全球', tech: '地区平均' },
    { id: 'lf2', source: '标准', nameCN: '市政污泥填埋', nameEN: 'Landfill of municipal sludge', sourceDB: 'CPCD 1', type: 'LCIA', time: '2016', geo: '全球', tech: '全国平均' },
    { id: 'lf3', source: '标准', nameCN: '苹果桌面电脑-24-inch iMac ...', nameEN: 'Apple desktop computer - 2...', sourceDB: 'CPCD 1', type: 'LCIA', time: '2021', geo: '亚洲/中国', tech: '全球平均' },
    { id: 'lf4', source: '标准', nameCN: '小麦', nameEN: 'Wheat', sourceDB: 'CPCD 1', type: 'LCIA', time: '2020', geo: '全球', tech: '地区平均' },
    { id: 'lf5', source: '标准', nameCN: '苹果桌面电脑-21.5-inch iMa...', nameEN: 'Apple Desktop Computer - ...', sourceDB: 'CPCD 1', type: 'LCIA', time: '2021', geo: '亚洲/中国', tech: '全球平均' }
];

// 8. 基本流数据 (Entity: BasicFlow)
// --------------------------------------------------------
// [场景A-管理列表] L2 基本流 (BasicFlowPage)
//    - 用途：展示基础物质流数据。
// [场景C-详情页] L2 计算与分析详情 (BasicFlowDetail)
//    - 用途：查看物质的理化性质、CAS号、同义词及相关的环境影响类别。
//    - 关注字段：source, nameCN, nameEN, sourceDB, type, time, geo, tech
// --------------------------------------------------------
export const basicFlowData = [
    { id: 'bf1', source: '标准', nameCN: 'chloromethane', nameEN: 'chloromethane', sourceDB: 'BASIC_FLOW 2025.1', type: 'LCI', time: '2025', geo: '全球' },
    { id: 'bf2', source: '标准', nameCN: 'gas, natural', nameEN: 'gas, natural', sourceDB: 'BASIC_FLOW 2025.1', type: 'LCI', time: '2025', geo: '全球' },
    { id: 'bf3', source: '标准', nameCN: 'gas, mine, off-gas, process,...', nameEN: 'gas, mine, off-gas, process,...', sourceDB: 'BASIC_FLOW 2025.1', type: 'LCI', time: '2025', geo: '全球' },
    { id: 'bf4', source: '标准', nameCN: 'magnesium', nameEN: 'magnesium', sourceDB: 'BASIC_FLOW 2025.1', type: 'LCI', time: '2025', geo: '全球' },
    { id: 'bf5', source: '标准', nameCN: 'net operating surplus', nameEN: 'net operating surplus', sourceDB: 'BASIC_FLOW 2025.1', type: 'LCI', time: '2025', geo: '全球' }
];

// 9. 复合因子数据 (Entity: CompositeFactor)
// --------------------------------------------------------
// [场景A-管理列表] L2 复合因子 (CompositeFactorPage)
//    - 用途：展示由多个基础因子组合而成的复合因子。
//    - 关注字段：nameCN, nameEN, sourceDB, type, time, geo, tech

// [场景C-详情页] L2 复合因子详情 (CompositeFactorDetail)
//    - 用途：查看复合因子的计算公式、构成组件及其有效期。
//    - 关注字段：nameCN, nameEN, sourceDB, type, time, geo, tech

// [场景D-选择弹窗] L3 建模引用
//    - 用途：在建模过程中，排放因子配置项选择复合因子。
//    - 关注字段：nameCN, nameEN, sourceDB, type, time, geo, tech
// --------------------------------------------------------
export const compositeFactorData = [
    { id: 'cf1', nameCN: '31%甲醇钠溶液（甲醇溶液）', nameEN: '31% Sodium Methoxide Solution (in Methanol)', refComponent: '甲醇钠', sourceDB: '查理的工作空间', time: '2026', geo: '全球', tech: '3' }
];

// 10. 分配规则实体 (Entity: AllocationRule)
// --------------------------------------------------------
// [场景A-管理列表] L2 分配页面 (AllocationPage)
//    - 用途：展示所有分配规则配置，供用户管理。
//
// [场景C-详情页] L2 分配规则详情 (AllocationRuleDetail)
//    - 用途：查看分配规则的具体公式参数、适用产品范围及历史变更记录。
//    - 关注字段：formulaParams, applicableProducts, changeLog
//
// [场景D-选择弹窗] L3 建模 (Allocation Config)
//    - 用途：在为多产出过程配置分配时，选择适用的分配规则。
//    - 业务逻辑：根据过程类型（热/电/物理）筛选推荐的分配方式。
// --------------------------------------------------------
export const allocationData = [
    { id: 1, name: '按产量分配', type: '数量分配', status: '已启用', description: '根据产品产量进行碳排放分配', method: 'Physical' },
    { id: 2, name: '按价值分配', type: '经济分配', status: '已启用', description: '根据产品经济价值进行分配', method: 'Economic' },
    { id: 3, name: '按质量分配', type: '物理分配', status: '草稿', description: '根据产品质量进行物理分配', method: 'Physical' },
    { id: 4, name: '按能量分配', type: '物理分配', status: '已停用', description: '根据产品热值进行分配（适用于燃料）', method: 'Physical' }
];

// ==========================================
// 通用/基础配置 (被多个模块引用)
// ==========================================
export const commonOptions = {
    industries: [
        '农副食品加工业',
        '化学原料和化学制品制造业',
        '金属制品业',
        '通用设备制造业',
        '汽车制造业',
        '电气机械和器材制造业',
        '计算机、通信和其他电子设备制造业',
        '建筑装饰、装修和其他建筑业'
    ],
    locations: [
        '北京市',
        '上海市',
        '广东省/广州市',
        '江苏省/南京市',
        '浙江省/杭州市',
        '四川省/成都市'
    ],
    projectTypes: [
        { value: 'CFO', label: '组织碳足迹 (CFO)' },
        { value: 'CFP', label: '产品碳足迹 (CFP)' }
    ]
};
