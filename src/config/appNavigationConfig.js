export const APP_NAV_HEADER_ICON_KEYS = [
    'IconCompass',
    'IconShare',
    'IconLayoutGrid',
    'IconShield'
];

export const APP_NAV_L1_CONFIG = {
    workspace: {
        defaultTarget: 'workbench_home',
        defaultL2: 'workbench_home',
        defaultL3: null,
        sidebarHeader: {
            title: '工作空间',
            desc: '您的个人工作中心，概览核心指标与待办事项。',
            iconKey: 'IconCompass'
        }
    },
    background_data: {
        defaultTarget: 'database_mgmt',
        defaultL2: null,
        defaultL3: null,
        sidebarHeader: {
            title: '背景数据',
            desc: '聚焦排放因子与文献数据，为碳足迹核算提供权威依据。',
            iconKey: 'IconShare'
        }
    },
    project_mgmt: {
        defaultTarget: 'all_projects',
        defaultL2: null,
        defaultL3: null,
        sidebarHeader: {
            title: '项目',
            desc: '管理覆盖碳核算全生命周期，涵盖核算、建模及执行。',
            iconKey: 'IconLayoutGrid'
        }
    },
    enterprise: {
        defaultTarget: 'all_objects',
        defaultL2: null,
        defaultL3: null,
        sidebarHeader: {
            title: '服务企业',
            desc: '围绕服务企业构建数据管理体系，提供清晰的数据信息。',
            iconKey: 'IconShield'
        }
    },
    project_tag: {
        // project_tag is a dedicated project-detail context, not a business target l1.
        defaultTarget: 'all_projects',
        defaultL2: 'navigation',
        defaultL3: 'acct_basic',
        sidebarHeader: null
    }
};

export const APP_NAV_L1_IDS = Object.keys(APP_NAV_L1_CONFIG);

export const getL1Defaults = (l1) => APP_NAV_L1_CONFIG[l1] || APP_NAV_L1_CONFIG.workspace;

export const getL1SidebarHeaderMeta = (l1) => getL1Defaults(l1).sidebarHeader || null;
