// Single source of truth for workspace/background-data/project-mgmt/enterprise targets.
export const BUSINESS_ICON_KEYS = [
    'IconCompass',
    'IconMapPin',
    'IconDatabase',
    'IconStack2',
    'IconCpu',
    'IconFlask',
    'IconActivity',
    'IconBook',
    'IconLayoutGrid',
    'IconHexagon',
    'IconBuilding',
    'IconShield'
];

export const BUSINESS_TARGET_CONFIG = {
    workbench_home: {
        l1: 'workspace',
        label: '工作台',
        headerTitle: '工作台',
        rendererKey: 'workbench_home',
        isDefaultForL1: true,
        sidebar: {
            groupKey: 'workspace_core',
            groupLabel: null,
            groupOrder: 10,
            itemOrder: 10,
            desc: '个人工作总览与快捷入口',
            iconKey: 'IconCompass'
        }
    },
    carbon_panorama: {
        l1: 'workspace',
        label: '碳排放全景图',
        headerTitle: '碳排放全景图',
        rendererKey: 'carbon_panorama',
        sidebar: {
            groupKey: 'workspace_carbon',
            groupLabel: '碳排放&碳资产',
            groupOrder: 20,
            itemOrder: 10,
            desc: '企业碳排放宏观分布展示',
            iconKey: 'IconMapPin'
        }
    },
    carbon_asset_mgmt: {
        l1: 'workspace',
        label: '碳资产管理',
        headerTitle: '碳资产管理',
        rendererKey: 'carbon_asset_mgmt',
        sidebar: {
            groupKey: 'workspace_carbon',
            groupLabel: '碳排放&碳资产',
            groupOrder: 20,
            itemOrder: 20,
            desc: '管理配额、CCER等碳资产',
            iconKey: 'IconDatabase'
        }
    },

    database_mgmt: {
        l1: 'background_data',
        label: '数据库管理',
        headerTitle: '数据库管理',
        rendererKey: 'database_mgmt',
        isDefaultForL1: true,
        sidebar: {
            groupKey: 'bg_database',
            groupLabel: '数据库',
            groupOrder: 10,
            itemOrder: 10,
            desc: '管理背景数据库全集',
            iconKey: 'IconStack2'
        }
    },
    components: {
        l1: 'background_data',
        label: '元件',
        headerTitle: '元件',
        rendererKey: 'components',
        sidebar: {
            groupKey: 'bg_component',
            groupLabel: '元件',
            groupOrder: 20,
            itemOrder: 10,
            desc: '相同物质/活动的因子组',
            iconKey: 'IconCpu'
        }
    },
    factors_literature: {
        l1: 'background_data',
        label: '文献因子',
        headerTitle: '文献因子',
        rendererKey: 'factors_literature',
        sidebar: {
            groupKey: 'bg_factor',
            groupLabel: '因子',
            groupOrder: 30,
            itemOrder: 10,
            desc: '来源于文献的因子数据',
            iconKey: 'IconFlask'
        }
    },
    factors_baseflow: {
        l1: 'background_data',
        label: '基本流',
        headerTitle: '基本流',
        rendererKey: 'factors_baseflow',
        sidebar: {
            groupKey: 'bg_factor',
            groupLabel: '因子',
            groupOrder: 30,
            itemOrder: 20,
            desc: '基本物质流动的因子数据',
            iconKey: 'IconActivity'
        }
    },
    factors_composite: {
        l1: 'background_data',
        label: '复合因子',
        headerTitle: '复合因子',
        rendererKey: 'factors_composite',
        sidebar: {
            groupKey: 'bg_factor',
            groupLabel: '因子',
            groupOrder: 30,
            itemOrder: 30,
            desc: '建模计算获得的因子数据',
            iconKey: 'IconStack2'
        }
    },
    literature: {
        l1: 'background_data',
        label: '文献',
        headerTitle: '文献',
        rendererKey: 'literature',
        sidebar: {
            groupKey: 'bg_literature',
            groupLabel: '文献',
            groupOrder: 40,
            itemOrder: 10,
            desc: '因子来源的相关文件',
            iconKey: 'IconBook'
        }
    },

    all_projects: {
        l1: 'project_mgmt',
        label: '全部项目',
        headerTitle: '全部项目',
        rendererKey: 'project_management',
        projectFilterType: 'all',
        isDefaultForL1: true,
        sidebar: {
            groupKey: 'proj_list',
            groupLabel: '列表',
            groupOrder: 10,
            itemOrder: 10,
            desc: '查看所有碳核算项目',
            iconKey: 'IconLayoutGrid'
        }
    },
    pcf: {
        l1: 'project_mgmt',
        label: '产品碳足迹',
        headerTitle: '产品碳足迹',
        rendererKey: 'project_management',
        projectFilterType: 'pcf',
        sidebar: {
            groupKey: 'proj_type',
            groupLabel: '需求类型',
            groupOrder: 20,
            itemOrder: 10,
            desc: 'Product Carbon Footprint',
            iconKey: 'IconHexagon'
        }
    },
    ocf: {
        l1: 'project_mgmt',
        label: '组织碳足迹',
        headerTitle: '组织碳足迹',
        rendererKey: 'project_management',
        projectFilterType: 'ocf',
        sidebar: {
            groupKey: 'proj_type',
            groupLabel: '需求类型',
            groupOrder: 20,
            itemOrder: 20,
            desc: 'Org. Carbon Footprint',
            iconKey: 'IconBuilding'
        }
    },

    all_objects: {
        l1: 'enterprise',
        label: '全部服务企业',
        headerTitle: '全部服务企业',
        rendererKey: 'all_objects',
        isDefaultForL1: true,
        sidebar: {
            groupKey: 'ent_list',
            groupLabel: '列表',
            groupOrder: 10,
            itemOrder: 10,
            desc: '所有服务企业主体',
            iconKey: 'IconShield',
            label: '全部'
        }
    }
};

export const BUSINESS_TARGET_ROUTE_IDS = Object.keys(BUSINESS_TARGET_CONFIG);
export const BUSINESS_RENDERER_KEYS = [
    ...new Set(BUSINESS_TARGET_ROUTE_IDS.map((targetId) => BUSINESS_TARGET_CONFIG[targetId]?.rendererKey).filter(Boolean))
];

const toTargetEntry = (targetId) => ({ id: targetId, ...BUSINESS_TARGET_CONFIG[targetId] });
const byOrder = (a, b) => {
    const aGroupOrder = Number.isFinite(a?.sidebar?.groupOrder) ? a.sidebar.groupOrder : 999;
    const bGroupOrder = Number.isFinite(b?.sidebar?.groupOrder) ? b.sidebar.groupOrder : 999;
    if (aGroupOrder !== bGroupOrder) return aGroupOrder - bGroupOrder;

    const aItemOrder = Number.isFinite(a?.sidebar?.itemOrder) ? a.sidebar.itemOrder : 999;
    const bItemOrder = Number.isFinite(b?.sidebar?.itemOrder) ? b.sidebar.itemOrder : 999;
    if (aItemOrder !== bItemOrder) return aItemOrder - bItemOrder;

    return String(a?.label || '').localeCompare(String(b?.label || ''), 'zh-CN');
};

export const getBusinessTargetMeta = (targetId) => BUSINESS_TARGET_CONFIG[targetId] || null;

export const getBusinessTargetEntriesByL1 = (l1) => (
    BUSINESS_TARGET_ROUTE_IDS
        .filter((targetId) => BUSINESS_TARGET_CONFIG[targetId]?.l1 === l1)
        .map(toTargetEntry)
        .sort(byOrder)
);

export const buildBusinessSidebarGroups = (l1, options = {}) => {
    const predicate = typeof options?.predicate === 'function'
        ? options.predicate
        : () => true;
    const entries = getBusinessTargetEntriesByL1(l1).filter(predicate);
    const groupedMap = entries.reduce((acc, entry) => {
        if (!entry?.sidebar) {
            return acc;
        }
        const groupKey = entry.sidebar.groupKey || '__default__';
        if (!acc[groupKey]) {
            acc[groupKey] = {
                groupKey,
                title: entry.sidebar.groupLabel ?? null,
                groupOrder: Number.isFinite(entry.sidebar.groupOrder) ? entry.sidebar.groupOrder : 999,
                items: []
            };
        }
        acc[groupKey].items.push({
            id: entry.id,
            label: entry.sidebar.label || entry.label,
            desc: entry.sidebar.desc || '',
            iconKey: entry.sidebar.iconKey || null,
            itemOrder: Number.isFinite(entry.sidebar.itemOrder) ? entry.sidebar.itemOrder : 999
        });
        return acc;
    }, {});

    return Object.values(groupedMap)
        .sort((a, b) => a.groupOrder - b.groupOrder)
        .map((group) => ({
            title: group.title,
            items: group.items
                .sort((a, b) => a.itemOrder - b.itemOrder || String(a.label).localeCompare(String(b.label), 'zh-CN'))
                .map(({ itemOrder, ...rest }) => rest)
        }));
};
