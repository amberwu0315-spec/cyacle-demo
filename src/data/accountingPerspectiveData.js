export const activityDataRecords = [
  {
    id: 'act_1',
    recordName: '24年上半年三氯化磷工序30%液碱投料',
    processName: '30%液碱',
    value: '120',
    unit: 't',
    description: '根据生产车间负责人提供的投入产出台账记录'
  },
  {
    id: 'act_2',
    recordName: '24年上半年三氯化磷工序液氯投料',
    processName: '液氯',
    value: '101418',
    unit: 't',
    description: '根据生产车间负责人提供的投入产出台账记录'
  },
  {
    id: 'act_3',
    recordName: '24年上半年三氯化磷工序外购电',
    processName: '外购电',
    value: '2047533.48',
    unit: 'kW·h',
    description: '根据分电表台账数据，结合全厂自发电和外购电比例折算得到'
  },
  {
    id: 'act_4',
    recordName: '24年上半年三氯化磷工序自发电',
    processName: '自发电',
    value: '527563',
    unit: 'kW·h',
    description: '根据分电表台账数据，结合全厂自发电和外购电比例折算得到'
  },
  {
    id: 'act_5',
    recordName: '24年上半年三氯化磷工序蒸汽',
    processName: '自产蒸汽（低压）',
    value: '5291',
    unit: 't',
    description: '根据分表台账数据'
  },
  {
    id: 'act_6',
    recordName: '24年上半年清釜废渣产生量',
    processName: '清釜废渣',
    value: '31674.5',
    unit: 'kg',
    description: '根据危废台账'
  },
  {
    id: 'act_7',
    recordName: '24年上半年三氯化磷工序黄磷投料',
    processName: '黄磷',
    value: '29123.17',
    unit: 't',
    description: '根据生产车间负责人提供的投入产出台账记录'
  }
];

export const factorDataRecords = [
  {
    id: 'fac_1',
    factorType: 'LCIA',
    factorName: 'CN-SWG（西南区）-market for electricity, medium voltage',
    processName: '外购电',
    value: '0.3410652',
    unit: 'kgCO₂e/kW·h',
    source: 'Amber.wu的工作空间自建数据库',
    period: '2021'
  },
  {
    id: 'fac_2',
    factorType: 'LCIA',
    factorName: 'ROW-market for hazardous waste, for incineration',
    processName: '清釜废渣',
    value: '2.547087',
    unit: 'kgCO₂e/kg',
    source: 'Amber.wu的工作空间自建数据库',
    period: '2011'
  },
  {
    id: 'fac_3',
    factorType: 'LCIA',
    factorName: '黄磷',
    processName: '黄磷',
    value: '11.357227',
    unit: 'kgCO₂e/kg',
    source: 'Amber.wu的工作空间自建数据库',
    period: '2021'
  }
];

export const reportExportSettings = {
  precision: '最大精度'
};

export const reportExportStageRecords = [
  {
    id: 'stage_1',
    stageName: '原材料获取',
    emission: '3.221248445271907579870582641968',
    ratio: '99.28%'
  },
  {
    id: 'stage_2',
    stageName: '生产制造',
    emission: '0.023505206591667191269117836931',
    ratio: '0.72%'
  },
  {
    id: 'stage_total',
    stageName: '合计',
    emission: '3.244753651863574771139700478899',
    ratio: '100%',
    countable: false
  }
];

export const reportExportProcessRecords = [
  {
    id: 'proc_1',
    stageName: '原材料获取',
    processName: '黄磷',
    emission: '2.576412355103117344229527364188',
    ratio: '79.40%'
  },
  {
    id: 'proc_2',
    stageName: '原材料获取',
    processName: '液氯',
    emission: '0.643817852247194630139670257828',
    ratio: '19.84%'
  },
  {
    id: 'proc_3',
    stageName: '生产制造',
    processName: '自产蒸汽（低压）',
    emission: '0.014037491697509251907168018303',
    ratio: '0.43%'
  },
  {
    id: 'proc_4',
    stageName: '生产制造',
    processName: '外购电',
    emission: '0.005439673616528374825040077873',
    ratio: '0.17%'
  },
  {
    id: 'proc_5',
    stageName: '生产制造',
    processName: '自发电',
    emission: '0.003399609744289381717959026867',
    ratio: '0.10%'
  },
  {
    id: 'proc_6',
    stageName: '生产制造',
    processName: '30%液碱',
    emission: '0.001018237921595605501385019952',
    ratio: '0.03%'
  },
  {
    id: 'proc_7',
    stageName: '生产制造',
    processName: '清釜废渣',
    emission: '0.000628431533340182818950713888',
    ratio: '0.02%'
  },
  {
    id: 'proc_total',
    stageName: '合计',
    processName: '-',
    emission: '3.244753651863574771139700478899',
    ratio: '100%',
    countable: false
  }
];
