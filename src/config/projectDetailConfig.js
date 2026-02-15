import {
    IconCompass,
    IconServer,
    IconGitBranch,
    IconBox,
    IconCalculator
} from '@tabler/icons-react';
import { normalizeProjectType } from './projectTypeConfig.js';

export const PROJECT_DETAIL_DEFAULT_L2 = 'navigation';

export const PROJECT_DETAIL_MENU_GROUPS = [
    {
        title: '基础流程',
        items: [
            { id: 'navigation', icon: IconCompass, label: '导航' },
            { id: 'basis', icon: IconServer, label: '基础' },
            { id: 'allocation', icon: IconGitBranch, label: '分配' }
        ]
    },
    {
        title: '模型与核算',
        items: [
            { id: 'model', icon: IconBox, label: '模型' },
            { id: 'accounting', icon: IconCalculator, label: '核算' }
        ]
    }
];

export const PROJECT_DETAIL_ROUTE_IDS = PROJECT_DETAIL_MENU_GROUPS
    .flatMap((group) => group.items)
    .map((item) => item.id);

// 当前两类项目先保持同一套流程，后续新增差异只需要改这里。
export const PROJECT_TYPE_ROUTE_MATRIX = {
    pcf: PROJECT_DETAIL_ROUTE_IDS,
    ocf: PROJECT_DETAIL_ROUTE_IDS
};

export const getProjectDetailRouteIdsByType = (rawType) => {
    const normalizedType = normalizeProjectType(rawType);
    if (!normalizedType) {
        return PROJECT_DETAIL_ROUTE_IDS;
    }
    return PROJECT_TYPE_ROUTE_MATRIX[normalizedType] || PROJECT_DETAIL_ROUTE_IDS;
};

export const getProjectDetailMenuGroupsByType = (rawType) => {
    const allowed = new Set(getProjectDetailRouteIdsByType(rawType));
    return PROJECT_DETAIL_MENU_GROUPS
        .map((group) => ({
            ...group,
            items: group.items.filter((item) => allowed.has(item.id))
        }))
        .filter((group) => group.items.length > 0);
};
