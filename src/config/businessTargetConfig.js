// Single source of truth for L1 business/workspace menu targets rendered by BusinessContent.
export const BUSINESS_TARGET_CONFIG = {
    workbench_home: { l1: 'workspace', label: '工作台' },
    carbon_panorama: { l1: 'workspace', label: '碳排放全景图' },
    carbon_asset_mgmt: { l1: 'workspace', label: '碳资产管理' },

    database_mgmt: { l1: 'background_data', label: '数据库管理' },
    components: { l1: 'background_data', label: '元件' },
    factors_literature: { l1: 'background_data', label: '文献因子' },
    factors_baseflow: { l1: 'background_data', label: '基本流' },
    factors_composite: { l1: 'background_data', label: '复合因子' },
    literature: { l1: 'background_data', label: '文献' },

    all_projects: { l1: 'project_mgmt', label: '全部项目' },
    pcf: { l1: 'project_mgmt', label: '产品碳足迹' },
    ocf: { l1: 'project_mgmt', label: '组织碳足迹' },

    all_objects: { l1: 'enterprise', label: '全部服务企业' }
};

export const BUSINESS_TARGET_ROUTE_IDS = Object.keys(BUSINESS_TARGET_CONFIG);
