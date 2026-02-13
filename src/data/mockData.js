export const projectData = [
  { id: '1', name: '演示门窗有限公司', object: '演示门窗有限公司', type: 'CFO', status: 'active', createTime: '2026-01-28', updateTime: '2026-01-28', description: '这是一个用于演示门窗产品碳足迹核算的项目' },
  { id: '2', name: '演示门窗有限公司-产品碳足迹认证', object: '演示门窗有限公司', type: 'CFP', status: 'active', createTime: '2026-01-21', updateTime: '2026-01-21', description: '用于认证的产品碳足迹计算' },
  { id: '3', name: '查理猫粮无限2', object: '查理猫粮无限公司', type: 'CFP', status: 'draft', createTime: '2026-01-12', updateTime: '2026-01-12', description: '高端猫粮生产线碳足迹评估' }
];

export const researchObjectData = [
  { id: '1', name: '工厂-演示', shortName: '演示企业', industry: '汽车制造业', location: '亚洲/中国/浙江省/嘉兴市', creator: '13310128160', createTime: '2026-01-21 10:28:12', status: 'active' },
  { id: '2', name: '宁波2', shortName: 'N2', industry: '汽车制造业', location: '亚洲/中国/浙江省', creator: 'Minth_JX', createTime: '2025-10-13 19:31:00', status: 'active' }
];

export const databaseData = [
  { id: '1', name: 'BASIC_FLOW', source: '标准', version: '2025.1', year: '2025', fullName: 'BASIC_FLOW 2025.1', permission: '可使用', count: '10000', avatarText: 'BF', avatarBg: 'bg-blue-100', avatarColor: 'text-blue-600', status: 'active' },
  { id: '2', name: 'CPCD', source: '标准', version: '1.0', year: '2025', fullName: 'CPCD 1.0', permission: '可使用', count: '158160', avatarText: 'CP', avatarBg: 'bg-green-100', avatarColor: 'text-green-600', status: 'active' },
  { id: '3', name: 'Amber.wu的工作空间自建数据库', source: '自建', version: '2026', year: '2026', fullName: 'Amber.wu workspace DB', permission: '可使用', count: '11', avatarText: 'AW', avatarBg: 'bg-orange-100', avatarColor: 'text-orange-600', status: 'active' }
];

export const modelData = [
  { id: 'm1', name: '注塑工艺模型', type: 'Process', category: '加工', creator: 'User A', updateTime: '2024-10-20', status: 'active', description: '通用注塑工艺，包含电力与冷却水消耗' },
  { id: 'm2', name: '公路运输-柴油货车', type: 'Transport', category: '运输', creator: 'User B', updateTime: '2024-10-18', status: 'active', description: '国V排放标准，载重10吨' }
];

export const footerEnterpriseSharedData = {
  products: [
    {
      id: 'p1',
      name: '160/275(300)kV 3x2500mm² 铝芯交联聚乙烯绝缘光纤复合海底电缆',
      spec: '超高压海底电缆|HYJLQF41-FI3×2500+2×48B1',
      descType: '功能单位',
      desc: '1米160/275(300)kV 3×2500mm²铝芯交联聚乙烯绝缘光纤复合海底电缆',
      basicFlow: '1米160/275(300)kV 3×2500mm²铝芯交联聚乙烯绝缘光纤复合海底电缆',
      createdAt: '2025-10-13 19:31',
      creator: '-',
      nameEN: '160/275(300)kV 3x2500mm² aluminum core cross-linked polyethylene insulated optical fiber composite submarine cable'
    },
    {
      id: 'p2',
      name: '新增产品',
      spec: '一根记号笔',
      descType: '声明单位',
      desc: '-',
      basicFlow: '-',
      createdAt: '2025-10-13 19:31',
      creator: '-',
      nameEN: '-'
    }
  ],
  dataRecords: [
    { id: 'd1', name: '化粪池2025', value: '223,436', unit: 'kg', period: '-', location: '-', proof: '-', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd2', name: '湖州-溢散量', value: '645', unit: 'kg', period: '-', location: '-', proof: '-', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd3', name: '液氨', value: '50,000', unit: 'kg', period: '-', location: '-', proof: '-', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd4', name: '化粪池甲烷溢散量', value: '69.81', unit: 'kg', period: '-', location: '-', proof: '-', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd5', name: '修理费', value: '1,323', unit: '万元', period: '-', location: '-', proof: '发票示例.png', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd6', name: '铝及铝合金线材', value: '140,456', unit: 'kg', period: '-', location: '-', proof: '-', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd7', name: 'R410加注量', value: '0.01', unit: 'kg', period: '-', location: '-', proof: '空调制冷示例.xlsx', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd8', name: '湖州-汽油', value: '140,981', unit: 'kg', period: '-', location: '-', proof: '汽油发票示例.png', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd9', name: '钢板', value: '124,214', unit: 'kg', period: '-', location: '-', proof: '-', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd10', name: '合金-25', value: '109', unit: 'kg', period: '-', location: '宁波2', proof: '-', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd11', name: '租赁费2025', value: '1,246', unit: '万元', period: '-', location: '-', proof: '发票示例.png', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd12', name: '合金铅-24', value: '19,281', unit: 'kg', period: '2024年', location: '宁波', proof: '-', sourceType: '各项明细记录表/台账', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd13', name: '液氨2025', value: '5,643', unit: 'kg', period: '-', location: '-', proof: '-', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd14', name: '聚氯乙烯', value: '937,336', unit: 'kg', period: '-', location: '-', proof: '-', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: 'polyvinyl chloride' },
    { id: 'd15', name: '汽油用量', value: '134,850', unit: 'kg', period: '-', location: '-', proof: '汽油发票示例.png', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd16', name: '咨询服务费2025', value: '435', unit: '万元', period: '-', location: '-', proof: '发票示例.png', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd17', name: '废电缆的处置2025', value: '4,676', unit: 'kg', period: '-', location: '-', proof: '-', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd18', name: '诉讼费', value: '112.14', unit: '万元', period: '-', location: '-', proof: '发票示例.png', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd19', name: '聚氨酯', value: '1,000', unit: 'kg', period: '-', location: '-', proof: '-', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' },
    { id: 'd20', name: '信息化建设费2025', value: '643', unit: '万元', period: '-', location: '-', proof: '发票示例.png', sourceType: '-', updatedAt: '2025-10-13', status: '正常状态', nameEN: '-' }
  ],
  dataSources: [
    {
      id: 's1', name: '这是数据来源', type: '电表', linkedRecords: 0, creator: '13310128160',
      createdAt: '2026-02-12 14:57', updatedAt: '2026-02-12 14:57', code: '-', uncertainty: '1%', description: '-'
    }
  ],
  locations: [
    {
      id: 'l1', name: '宁波2', shortName: 'N2', locationType: '生产工厂地点', region: '亚洲-中国-浙江省',
      address: '甬江大道1号', updatedAt: '2025-10-13', creator: 'Minth_JX', createdAt: '2025-10-13',
      latlng: '29.877025° N, 121.56545° E', defaultMaintained: true, nameEN: 'Ningbo 2', addressEN: 'No. 1 Yongjiang Avenue'
    },
    {
      id: 'l2', name: '宁波', shortName: 'F1', locationType: '生产工厂地点', region: '亚洲-中国-浙江省',
      address: '南站东路19号', updatedAt: '2025-10-13', creator: 'Minth_JX', createdAt: '2025-10-13',
      latlng: '-', defaultMaintained: false, nameEN: 'Ningbo', addressEN: '-'
    }
  ]
};

export const footerBackgroundSharedData = {
  literatureFactors: [
    { id: 'lf1', source: '标准', nameCN: '猪', nameEN: 'Pig', sourceDB: 'CPCD', type: 'LCIA', time: '2010', geo: '全球', tech: '全球平均' },
    { id: 'lf2', source: '标准', nameCN: '2019年全国电网平均排放因子', nameEN: '2019 National Grid Average Emission Factor', sourceDB: 'CPCD', type: 'LCIA', time: '2019', geo: '全球', tech: '全国平均' },
    { id: 'lf3', source: '标准', nameCN: '氧化钕', nameEN: 'Neodymium oxide', sourceDB: 'CPCD', type: 'LCIA', time: '2018', geo: '全球', tech: '具体工艺' },
    { id: 'lf4', source: '标准', nameCN: '聚氯乙烯', nameEN: 'Polyvinyl Chloride', sourceDB: 'CPCD', type: 'LCIA', time: '2020', geo: '全球', tech: '全国平均' },
    { id: 'lf5', source: '标准', nameCN: '金属铜', nameEN: 'Copper metal', sourceDB: 'CPCD', type: 'LCIA', time: '2019', geo: '全球', tech: '全国平均' }
  ],
  basicFlows: [
    { id: 'bf1', source: '标准', nameCN: 'chloromethane', nameEN: 'chloromethane', sourceDB: 'BASIC_FLOW 2025.1', type: 'LCI', time: '2025', geo: '全球', tech: '-' },
    { id: 'bf2', source: '标准', nameCN: 'gas, natural', nameEN: 'gas, natural', sourceDB: 'BASIC_FLOW 2025.1', type: 'LCI', time: '2025', geo: '全球', tech: '-' },
    { id: 'bf3', source: '标准', nameCN: 'gas, mine, off-gas, process, coal mining', nameEN: 'gas, mine, off-gas, process, coal mining', sourceDB: 'BASIC_FLOW 2025.1', type: 'LCI', time: '2025', geo: '全球', tech: '-' },
    { id: 'bf4', source: '标准', nameCN: 'magnesium', nameEN: 'magnesium', sourceDB: 'BASIC_FLOW 2025.1', type: 'LCI', time: '2025', geo: '全球', tech: '-' },
    { id: 'bf5', source: '标准', nameCN: 'net operating surplus', nameEN: 'net operating surplus', sourceDB: 'BASIC_FLOW 2025.1', type: 'LCI', time: '2025', geo: '全球', tech: '-' }
  ],
  compositeFactors: [
    { id: 'cf1', nameCN: '12328%氯化钙', nameEN: '12328% Calcium Chloride', refComponent: '氯化钙', sourceDB: 'Amber.wu的工作空间自建数据库', time: '-', geo: '-', tech: '-' },
    { id: 'cf2', nameCN: '钙锌稳定剂', nameEN: 'Calcium Zinc Stabilizer', refComponent: '钙锌稳定剂', sourceDB: 'shipin_d的工作空间', time: '2024', geo: '中国', tech: '-' },
    { id: 'cf3', nameCN: '五金', nameEN: 'Hardware', refComponent: '五金', sourceDB: 'shipin_d的工作空间', time: '2024', geo: '中国', tech: '-' },
    { id: 'cf4', nameCN: '硬脂酸锌', nameEN: 'Zinc stearate', refComponent: '硬脂酸锌', sourceDB: 'shipin_d的工作空间', time: '2017', geo: '中国', tech: '-' },
    { id: 'cf5', nameCN: '清洗剂', nameEN: 'Cleaning agent', refComponent: '清洗剂', sourceDB: 'shipin_d的工作空间', time: '2011', geo: '全球', tech: '3' },
    { id: 'cf6', nameCN: '31%甲醇钠溶液（甲醇溶液）', nameEN: '31% Sodium Methoxide Solution (in Methanol)', refComponent: '甲醇钠', sourceDB: 'Amber.wu的工作空间自建数据库', time: '2024', geo: '全球', tech: '-' }
  ],
  literature: [
    { id: 'doc1', name: '中山华明荣科技股份有限公司民众分公司技改扩建项目', source: '自建', docType: '报告', publishYear: '2017', journal: '-', creator: '-' },
    { id: 'doc2', name: '热电联产的产品碳足迹量化与评价', source: '自建', docType: '期刊文章或杂志', publishYear: '2024', journal: '-', creator: '-' },
    { id: 'doc3', name: '钢铁工业二氧化碳排放计算方法实例研究', source: '自建', docType: '期刊文章或杂志', publishYear: '2019', journal: '-', creator: '-' },
    { id: 'doc4', name: 'Valfidus - AUK_Carbon_Footprint_2024_Final_Report', source: '自建', docType: '期刊文章或杂志', publishYear: '2024', journal: '-', creator: '-' },
    { id: 'doc5', name: '杭州之江新材料有限公司：碳足迹报告2023年度', source: '自建', docType: '期刊文章或杂志', publishYear: '2023', journal: '-', creator: '-' }
  ],
  components: [
    { id: 'c1', name: '粗钢-高炉/转炉直接还原法-氢气输入', source: '标准', unitGroup: '质量', type: '其他类-排放因子类', refUnit: '千克', status: 'in_use', updateTime: '2026-02-12 00:10:24' },
    { id: 'c2', name: '凳子', source: '标准', unitGroup: '单个计量单位', type: '其他类-排放因子类', refUnit: '个', status: 'in_use', updateTime: '2026-02-05 00:09:42' },
    { id: 'c3', name: '椅子', source: '标准', unitGroup: '单个计量单位', type: '其他类-排放因子类', refUnit: '个', status: 'in_use', updateTime: '2026-02-05 00:09:36' },
    { id: 'c4', name: '餐椅', source: '标准', unitGroup: '单个计量单位', type: '其他类-排放因子类', refUnit: '个', status: 'in_use', updateTime: '2026-02-05 00:09:31' },
    { id: 'c5', name: '小功率电机', source: '标准', unitGroup: '单个计量单位', type: '其他类-排放因子类', refUnit: '个', status: 'in_use', updateTime: '2026-02-05 00:05:34' }
  ]
};

export const productFooterData = footerEnterpriseSharedData.products;
export const dataRecordData = footerEnterpriseSharedData.dataRecords;
export const dataSourceData = footerEnterpriseSharedData.dataSources;
export const locationData = footerEnterpriseSharedData.locations;

export const literatureFactorData = footerBackgroundSharedData.literatureFactors;
export const basicFlowData = footerBackgroundSharedData.basicFlows;
export const compositeFactorData = footerBackgroundSharedData.compositeFactors;
export const documentData = footerBackgroundSharedData.literature;
export const componentData = footerBackgroundSharedData.components;

export const allocationData = [
  {
    id: 1,
    name: '全厂产品碳排量分配',
    type: '物理量法',
    status: '已启用',
    description: '本报告在涉及温室气体核算涉及不同产品碳分配的情况下采用了物理量法，即基于产量（kg）为单位进行分配的方法。空调以分段的原则将部分散逸性温室气体排放量按照产量比进行分配。',
    method: 'Physical',
    createdAt: '2026-02-13 10:43:53',
    updatedAt: '2026-02-13 10:43:53',
    formula: 'E分产品 = E总体 × (Q分产品/Q全厂)',
    variables: [
      { symbol: 'E分产品', type: '-', description: '本报告所指某产品的温室气体排放量' },
      { symbol: 'E总体', type: '-', description: '所有产品的温室气体排放量' },
      { symbol: 'Q分产品', type: '特定性质', description: '本报告所指某产品的总的产量' },
      { symbol: 'Q全厂', type: '全部性质', description: '所有产品的总产量' }
    ],
    applications: [
      { name: '如村', certificationStatus: '确定合格', period: '2024年', ratio: 'Q如村/Q全厂', result: '-' },
      { name: '示例门窗', certificationStatus: '确定合格', period: '2024年', ratio: 'Q示例/Q全厂', result: '-' }
    ]
  }
];

export const commonOptions = {
  industries: ['汽车制造业', '化学原料和化学制品制造业', '金属制品业', '通用设备制造业'],
  locations: ['浙江省/宁波市', '上海市', '北京市'],
  projectTypes: [
    { value: 'CFO', label: '组织碳足迹 (CFO)' },
    { value: 'CFP', label: '产品碳足迹 (CFP)' }
  ]
};
