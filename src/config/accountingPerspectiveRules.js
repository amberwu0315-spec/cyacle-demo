const defaultTableView = [{ value: 'table', label: '表格' }];

const ratioView = [{ value: 'ratio', label: '排放占比' }];

export const activityDataViewRules = {
  title: '活动数据',
  searchKeys: ['recordName', 'processName', 'value', 'unit', 'description'],
  dataControllerConfig: {
    title: '数据记录',
    controllerLabel: '标准',
    defaultView: 'table',
    viewOptions: defaultTableView,
    columnSettingsPlaceholder: '活动数据列设置将按核算规则持续补充。'
  },
  columns: [
    {
      title: '数据记录名称',
      key: 'recordName',
      width: '34%',
      sortable: true,
      filterable: true,
      groupable: false,
      asLink: true,
      headerMenu: { sort: true, filter: true, group: false, visibility: true, align: true }
    },
    {
      title: '关联单元过程',
      key: 'processName',
      width: '20%',
      sortable: true,
      filterable: true,
      groupable: false,
      asLink: true,
      headerMenu: { sort: true, filter: true, group: false, visibility: true, align: true }
    },
    {
      title: '数值',
      key: 'value',
      width: '12%',
      sortable: true,
      filterable: false,
      groupable: false,
      headerMenu: { sort: true, filter: false, group: false, visibility: true, align: true }
    },
    {
      title: '单位',
      key: 'unit',
      width: '10%',
      sortable: true,
      filterable: true,
      groupable: false,
      headerMenu: { sort: true, filter: true, group: false, visibility: true, align: true }
    },
    {
      title: '数据描述',
      key: 'description',
      width: '24%',
      sortable: false,
      filterable: true,
      groupable: false,
      wrap: true,
      headerMenu: { sort: false, filter: true, group: false, visibility: true, align: true }
    }
  ]
};

export const factorDataViewRules = {
  title: '因子数据',
  searchKeys: ['factorType', 'factorName', 'processName', 'value', 'unit', 'source', 'period'],
  dataControllerConfig: {
    title: '因子',
    controllerLabel: '标准',
    defaultView: 'table',
    viewOptions: defaultTableView,
    columnSettingsPlaceholder: '因子数据列设置将按数据库规则持续补充。'
  },
  columns: [
    {
      title: '因子类型',
      key: 'factorType',
      width: '12%',
      sortable: false,
      filterable: true,
      groupable: false,
      asTypeBadge: true,
      headerMenu: { sort: false, filter: true, group: false, visibility: true, align: false }
    },
    {
      title: '因子名称',
      key: 'factorName',
      width: '24%',
      sortable: true,
      filterable: true,
      groupable: false,
      asLink: true,
      headerMenu: { sort: true, filter: true, group: false, visibility: true, align: true }
    },
    {
      title: '关联单元过程',
      key: 'processName',
      width: '16%',
      sortable: true,
      filterable: true,
      groupable: false,
      asLink: true,
      headerMenu: { sort: true, filter: true, group: false, visibility: true, align: true }
    },
    {
      title: '数值',
      key: 'value',
      width: '10%',
      sortable: true,
      filterable: false,
      groupable: false,
      headerMenu: { sort: true, filter: false, group: false, visibility: true, align: true }
    },
    {
      title: '单位',
      key: 'unit',
      width: '14%',
      sortable: false,
      filterable: true,
      groupable: false,
      headerMenu: { sort: false, filter: true, group: false, visibility: true, align: true }
    },
    {
      title: '数据来源',
      key: 'source',
      width: '16%',
      sortable: false,
      filterable: true,
      groupable: false,
      headerMenu: { sort: false, filter: true, group: false, visibility: true, align: true }
    },
    {
      title: '数据时间区间',
      key: 'period',
      width: '8%',
      sortable: true,
      filterable: true,
      groupable: false,
      headerMenu: { sort: true, filter: true, group: false, visibility: true, align: true }
    }
  ]
};

export const reportExportStageRules = {
  title: '阶段',
  searchKeys: ['stageName', 'emission', 'ratio'],
  dataControllerConfig: {
    title: '阶段',
    controllerLabel: '排放占比',
    defaultView: 'ratio',
    viewOptions: ratioView,
    columnSettingsPlaceholder: '阶段列设置将按导出模板规则补充。'
  },
  columns: [
    {
      title: '阶段',
      key: 'stageName',
      width: '36%',
      sortable: true,
      filterable: true,
      groupable: false,
      headerMenu: { sort: true, filter: true, group: false, visibility: true, align: true }
    },
    {
      title: '核算单元排放量(kgCO₂e)',
      key: 'emission',
      width: '36%',
      sortable: true,
      filterable: false,
      groupable: false,
      headerMenu: { sort: true, filter: false, group: false, visibility: true, align: true }
    },
    {
      title: '排放占比',
      key: 'ratio',
      width: '28%',
      sortable: true,
      filterable: true,
      groupable: false,
      headerMenu: { sort: true, filter: true, group: false, visibility: true, align: true }
    }
  ]
};

export const reportExportProcessRules = {
  title: '单元过程',
  searchKeys: ['stageName', 'processName', 'emission', 'ratio'],
  dataControllerConfig: {
    title: '单元过程',
    controllerLabel: '排放占比',
    defaultView: 'ratio',
    viewOptions: ratioView,
    columnSettingsPlaceholder: '单元过程列设置将按导出模板规则补充。'
  },
  columns: [
    {
      title: '阶段',
      key: 'stageName',
      width: '16%',
      sortable: true,
      filterable: true,
      groupable: false,
      headerMenu: { sort: true, filter: true, group: false, visibility: true, align: true }
    },
    {
      title: '单元过程',
      key: 'processName',
      width: '24%',
      sortable: true,
      filterable: true,
      groupable: false,
      headerMenu: { sort: true, filter: true, group: false, visibility: true, align: true }
    },
    {
      title: '核算单元排放量(kgCO₂e)',
      key: 'emission',
      width: '36%',
      sortable: true,
      filterable: false,
      groupable: false,
      headerMenu: { sort: true, filter: false, group: false, visibility: true, align: true }
    },
    {
      title: '排放占比',
      key: 'ratio',
      width: '24%',
      sortable: true,
      filterable: true,
      groupable: false,
      headerMenu: { sort: true, filter: true, group: false, visibility: true, align: true }
    }
  ]
};
