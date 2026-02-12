import {
  productFooterData,
  dataRecordData,
  dataSourceData,
  locationData,
  literatureFactorData,
  basicFlowData,
  compositeFactorData,
  literatureData,
  componentData
} from './mockData';

const placeholderModules = [
  { title: '基本信息', placeholder: '模块占位：后续补充业务内容。' },
  { title: '更多信息', placeholder: '模块占位：后续补充业务内容。' },
  { title: '关联数据', placeholder: '模块占位：后续补充业务内容。' }
];

export const footerModelConfig = {
  product: {
    title: '产品',
    rows: productFooterData,
    columns: [
      { title: '名称', key: 'name', width: '24%' },
      { title: '规格型号', key: 'spec', width: '18%' },
      { title: '描述方式类型', key: 'descType', width: '14%' },
      { title: '描述方式说明', key: 'desc', width: '20%' },
      { title: '基准流', key: 'basicFlow', width: '18%' },
      { title: '创建时间', key: 'createdAt', width: '14%' },
      { title: '创建人', key: 'creator', width: '8%' }
    ],
    modules: placeholderModules
  },
  data: {
    title: '数据记录',
    rows: dataRecordData,
    columns: [
      { title: '名称', key: 'name', width: '20%' },
      { title: '数值', key: 'value', width: '10%' },
      { title: '单位', key: 'unit', width: '8%' },
      { title: '时间区间', key: 'period', width: '10%' },
      { title: '相关地点', key: 'location', width: '10%' },
      { title: '证明文档', key: 'proof', width: '16%' },
      { title: '来源类型', key: 'sourceType', width: '12%' },
      { title: '更新时间', key: 'updatedAt', width: '10%' },
      { title: '状态', key: 'status', width: '10%' }
    ],
    modules: placeholderModules
  },
  datasource: {
    title: '数据来源对象',
    rows: dataSourceData,
    columns: [
      { title: '名称', key: 'name', width: '24%' },
      { title: '类型', key: 'type', width: '12%' },
      { title: '关联数据记录条数', key: 'linkedRecords', width: '16%' },
      { title: '创建人', key: 'creator', width: '14%' },
      { title: '创建时间', key: 'createdAt', width: '17%' },
      { title: '更新时间', key: 'updatedAt', width: '17%' }
    ],
    modules: placeholderModules
  },
  location: {
    title: '地点管理',
    rows: locationData,
    columns: [
      { title: '名称', key: 'name', width: '18%' },
      { title: '地点简称', key: 'shortName', width: '10%' },
      { title: '地点类型', key: 'locationType', width: '14%' },
      { title: '所在地', key: 'region', width: '18%' },
      { title: '详细地址', key: 'address', width: '18%' },
      { title: '更新时间', key: 'updatedAt', width: '12%' },
      { title: '创建人', key: 'creator', width: '10%' },
      { title: '创建时间', key: 'createdAt', width: '12%' }
    ],
    modules: placeholderModules
  },
  factors: {
    title: '文献因子',
    rows: literatureFactorData,
    columns: [
      { title: '来源', key: 'source', width: '8%' },
      { title: '名称（中文）', key: 'nameCN', width: '20%' },
      { title: '名称（英文）', key: 'nameEN', width: '24%' },
      { title: '来源数据库', key: 'sourceDB', width: '12%' },
      { title: '数据类型', key: 'type', width: '10%' },
      { title: '时间代表性', key: 'time', width: '10%' },
      { title: '地理代表性', key: 'geo', width: '10%' },
      { title: '技术代表性', key: 'tech', width: '10%' }
    ],
    modules: placeholderModules
  },
  baseflow: {
    title: '基本流',
    rows: basicFlowData,
    columns: [
      { title: '来源', key: 'source', width: '8%' },
      { title: '名称（中文）', key: 'nameCN', width: '20%' },
      { title: '名称（英文）', key: 'nameEN', width: '24%' },
      { title: '来源数据库', key: 'sourceDB', width: '12%' },
      { title: '数据类型', key: 'type', width: '10%' },
      { title: '时间代表性', key: 'time', width: '10%' },
      { title: '地理代表性', key: 'geo', width: '10%' },
      { title: '技术代表性', key: 'tech', width: '10%' }
    ],
    modules: placeholderModules
  },
  composite: {
    title: '复合因子',
    rows: compositeFactorData,
    columns: [
      { title: '名称（中文）', key: 'nameCN', width: '24%' },
      { title: '名称（英文）', key: 'nameEN', width: '24%' },
      { title: '关联元件', key: 'refComponent', width: '12%' },
      { title: '来源数据库', key: 'sourceDB', width: '16%' },
      { title: '时间代表性', key: 'time', width: '10%' },
      { title: '地理代表性', key: 'geo', width: '10%' },
      { title: '技术代表性', key: 'tech', width: '10%' }
    ],
    modules: placeholderModules
  },
  literature: {
    title: '文献',
    rows: literatureData,
    columns: [
      { title: '文献名称', key: 'name', width: '40%' },
      { title: '来源', key: 'source', width: '12%' },
      { title: '文献类型', key: 'docType', width: '16%' },
      { title: '出版时间', key: 'publishYear', width: '10%' },
      { title: '期刊名/出版社', key: 'journal', width: '14%' },
      { title: '创建用户', key: 'creator', width: '8%' }
    ],
    modules: placeholderModules
  },
  component: {
    title: '元件',
    rows: componentData,
    columns: [
      { title: '元件名称', key: 'name', width: '26%' },
      { title: '来源', key: 'source', width: '10%' },
      { title: '单位组', key: 'unitGroup', width: '12%' },
      { title: '元件类型', key: 'type', width: '16%' },
      { title: '基准单位', key: 'refUnit', width: '10%' },
      { title: '更新时间', key: 'updateTime', width: '16%' }
    ],
    modules: placeholderModules
  }
};
