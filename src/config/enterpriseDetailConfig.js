import {
    IconLayoutGrid,
    IconBuilding,
    IconMapPin,
    IconHexagon,
    IconDatabase,
    IconServer,
    IconFileText
} from '@tabler/icons-react';

// Single source of truth for enterprise-detail navigation.
export const ENTERPRISE_DETAIL_DEFAULT_L2 = 'ent_projects';

export const ENTERPRISE_DETAIL_TITLE_MAP = {
    ent_projects: '项目',
    ent_info: '服务企业信息',
    ent_locations: '地点管理',
    ent_products: '产品',
    ent_data: '数据记录',
    ent_datasources: '数据来源对象',
    ent_docs: '文档管理'
};

export const ENTERPRISE_DETAIL_MENU_GROUPS = [
    {
        title: '项目',
        items: [
            { id: 'ent_projects', icon: IconLayoutGrid, label: '项目', desc: '管理碳核算项目及进度' }
        ]
    },
    {
        title: '基础',
        items: [
            { id: 'ent_info', icon: IconBuilding, label: '信息', desc: '管理基本信息与概况' },
            { id: 'ent_locations', icon: IconMapPin, label: '地点', desc: '管理各生产经营场所地点' }
        ]
    },
    {
        title: '业务',
        items: [
            { id: 'ent_products', icon: IconHexagon, label: '产品', desc: '录入及管理产品信息' },
            { id: 'ent_data', icon: IconDatabase, label: '数据', desc: '录入及管理活动数据' },
            { id: 'ent_datasources', icon: IconServer, label: '数据源', desc: '管理数据来源及属性' },
            { id: 'ent_docs', icon: IconFileText, label: '文档', desc: '管理发票等数据支撑材料' }
        ]
    }
];

export const ENTERPRISE_DETAIL_ROUTE_IDS = ENTERPRISE_DETAIL_MENU_GROUPS
    .flatMap((group) => group.items)
    .map((item) => item.id);
