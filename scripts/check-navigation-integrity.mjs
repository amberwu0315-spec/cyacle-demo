import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {
    ENTERPRISE_DETAIL_DEFAULT_L2,
    ENTERPRISE_DETAIL_ROUTE_IDS
} from '../src/config/enterpriseDetailConfig.js';
import {
    PROJECT_DETAIL_DEFAULT_L2,
    PROJECT_DETAIL_ROUTE_IDS,
    PROJECT_TYPE_ROUTE_MATRIX
} from '../src/config/projectDetailConfig.js';
import {
    BUSINESS_TARGET_CONFIG,
    BUSINESS_TARGET_ROUTE_IDS
} from '../src/config/businessTargetConfig.js';

const errors = [];
const warnings = [];
const CORE_BUSINESS_L1 = ['workspace', 'background_data', 'project_mgmt', 'enterprise'];

const duplicateRouteIds = ENTERPRISE_DETAIL_ROUTE_IDS.filter((routeId, index, arr) => (
    arr.indexOf(routeId) !== index
));
if (duplicateRouteIds.length > 0) {
    errors.push(`enterprise route ids duplicated: ${[...new Set(duplicateRouteIds)].join(', ')}`);
}

if (!ENTERPRISE_DETAIL_ROUTE_IDS.includes(ENTERPRISE_DETAIL_DEFAULT_L2)) {
    errors.push(
        `default enterprise L2 "${ENTERPRISE_DETAIL_DEFAULT_L2}" is missing in route ids`
    );
}

const duplicateProjectRouteIds = PROJECT_DETAIL_ROUTE_IDS.filter((routeId, index, arr) => (
    arr.indexOf(routeId) !== index
));
if (duplicateProjectRouteIds.length > 0) {
    errors.push(`project route ids duplicated: ${[...new Set(duplicateProjectRouteIds)].join(', ')}`);
}

if (!PROJECT_DETAIL_ROUTE_IDS.includes(PROJECT_DETAIL_DEFAULT_L2)) {
    errors.push(
        `default project L2 "${PROJECT_DETAIL_DEFAULT_L2}" is missing in route ids`
    );
}

const duplicateBusinessRouteIds = BUSINESS_TARGET_ROUTE_IDS.filter((routeId, index, arr) => (
    arr.indexOf(routeId) !== index
));
if (duplicateBusinessRouteIds.length > 0) {
    errors.push(`business route ids duplicated: ${[...new Set(duplicateBusinessRouteIds)].join(', ')}`);
}

const getBusinessL1ByTarget = (target) => BUSINESS_TARGET_CONFIG[target]?.l1 || null;

Object.entries(PROJECT_TYPE_ROUTE_MATRIX).forEach(([projectType, routeIds]) => {
    const invalidRouteIds = routeIds.filter((routeId) => !PROJECT_DETAIL_ROUTE_IDS.includes(routeId));
    if (invalidRouteIds.length > 0) {
        errors.push(
            `project type "${projectType}" has invalid route ids: ${invalidRouteIds.join(', ')}`
        );
    }
});

const projectLayoutPath = path.resolve(process.cwd(), 'src/components/views/ProjectLayout.jsx');
if (!fs.existsSync(projectLayoutPath)) {
    errors.push(`ProjectLayout not found: ${projectLayoutPath}`);
} else {
    const projectLayoutContent = fs.readFileSync(projectLayoutPath, 'utf8');
    const rendererMapMatch = projectLayoutContent.match(
        /const enterpriseDetailRenderers\s*=\s*\{([\s\S]*?)\n\s*\};/
    );

    if (!rendererMapMatch) {
        errors.push('cannot parse enterpriseDetailRenderers object in ProjectLayout.jsx');
    } else {
        const rendererIds = [...rendererMapMatch[1].matchAll(/^\s*([a-z0-9_]+)\s*:/gim)]
            .map((match) => match[1]);

        const missingInProjectLayout = ENTERPRISE_DETAIL_ROUTE_IDS.filter(
            (routeId) => !rendererIds.includes(routeId)
        );
        if (missingInProjectLayout.length > 0) {
            errors.push(
                `ProjectLayout missing enterprise routes: ${missingInProjectLayout.join(', ')}`
            );
        }

        const extraInProjectLayout = rendererIds.filter(
            (routeId) => !ENTERPRISE_DETAIL_ROUTE_IDS.includes(routeId)
        );
        if (extraInProjectLayout.length > 0) {
            warnings.push(
                `ProjectLayout has extra enterprise routes: ${extraInProjectLayout.join(', ')}`
            );
        }
    }
}

const l2SidebarPath = path.resolve(process.cwd(), 'src/components/layout/L2Sidebar.jsx');
if (!fs.existsSync(l2SidebarPath)) {
    errors.push(`L2Sidebar not found: ${l2SidebarPath}`);
} else {
    const l2SidebarContent = fs.readFileSync(l2SidebarPath, 'utf8');
    if (!l2SidebarContent.includes('getProjectDetailMenuGroupsByType')) {
        errors.push('L2Sidebar does not use getProjectDetailMenuGroupsByType');
    }
    if (!l2SidebarContent.includes('activeProjectType')) {
        errors.push('L2Sidebar missing activeProjectType input');
    }

    const workspaceGroupsMatch = l2SidebarContent.match(
        /const workspaceGroups\s*=\s*\[([\s\S]*?)\n\s*\];/
    );
    if (!workspaceGroupsMatch) {
        errors.push('cannot parse workspaceGroups array in L2Sidebar.jsx');
    }

    const businessGroupsMatch = l2SidebarContent.match(
        /const businessGroups\s*=\s*\{([\s\S]*?)\n\s*\};/
    );
    if (!businessGroupsMatch) {
        errors.push('cannot parse businessGroups object in L2Sidebar.jsx');
    } else {
        const workspaceIds = workspaceGroupsMatch
            ? [...workspaceGroupsMatch[1].matchAll(/id:\s*'([a-z0-9_]+)'/gim)].map((match) => match[1])
            : [];
        const businessGroupIds = [...businessGroupsMatch[1].matchAll(/id:\s*'([a-z0-9_]+)'/gim)]
            .map((match) => match[1]);
        const uniqueSidebarBusinessIds = [...new Set([...workspaceIds, ...businessGroupIds])];

        const missingInBusinessConfig = uniqueSidebarBusinessIds.filter(
            (routeId) => !BUSINESS_TARGET_ROUTE_IDS.includes(routeId)
        );
        if (missingInBusinessConfig.length > 0) {
            errors.push(
                `L2Sidebar business ids missing in businessTargetConfig: ${missingInBusinessConfig.join(', ')}`
            );
        }

        const missingInSidebar = BUSINESS_TARGET_ROUTE_IDS.filter(
            (routeId) => !uniqueSidebarBusinessIds.includes(routeId)
        );
        if (missingInSidebar.length > 0) {
            errors.push(
                `businessTargetConfig ids missing in L2Sidebar businessGroups: ${missingInSidebar.join(', ')}`
            );
        }
    }
}

const workbenchPath = path.resolve(process.cwd(), 'src/components/layout/Workbench.jsx');
if (!fs.existsSync(workbenchPath)) {
    errors.push(`Workbench not found: ${workbenchPath}`);
} else {
    const workbenchContent = fs.readFileSync(workbenchPath, 'utf8');
    if (!workbenchContent.includes('activeProjectType')) {
        errors.push('Workbench does not wire activeProjectType to sidebar');
    }
}

const appNavigationContextPath = path.resolve(process.cwd(), 'src/context/AppNavigationContext.jsx');
if (!fs.existsSync(appNavigationContextPath)) {
    errors.push(`AppNavigationContext not found: ${appNavigationContextPath}`);
} else {
    const appNavContent = fs.readFileSync(appNavigationContextPath, 'utf8');
    const defaultTargetMapMatch = appNavContent.match(
        /const DEFAULT_TARGET_MAP\s*=\s*\{([\s\S]*?)\n\};/
    );

    if (!defaultTargetMapMatch) {
        errors.push('cannot parse DEFAULT_TARGET_MAP in AppNavigationContext.jsx');
    } else {
        const defaultMappings = [...defaultTargetMapMatch[1].matchAll(/([a-z0-9_]+)\s*:\s*'([a-z0-9_]+)'/gim)]
            .map((match) => ({ l1: match[1], target: match[2] }));
        const requiredL1Keys = ['workspace', 'background_data', 'project_mgmt', 'enterprise', 'project_tag'];
        const mapL1Keys = defaultMappings.map((item) => item.l1);
        const missingRequiredL1Keys = requiredL1Keys.filter((l1) => !mapL1Keys.includes(l1));
        if (missingRequiredL1Keys.length > 0) {
            errors.push(
                `DEFAULT_TARGET_MAP missing required l1 keys: ${missingRequiredL1Keys.join(', ')}`
            );
        }

        defaultMappings.forEach(({ l1, target }) => {
            if (!BUSINESS_TARGET_ROUTE_IDS.includes(target)) {
                errors.push(`DEFAULT_TARGET_MAP target "${target}" for "${l1}" is not in businessTargetConfig`);
                return;
            }

            const targetL1 = getBusinessL1ByTarget(target);
            if (!targetL1) {
                errors.push(`cannot resolve l1 for DEFAULT_TARGET_MAP target "${target}"`);
                return;
            }

            if (CORE_BUSINESS_L1.includes(l1) && targetL1 !== l1) {
                errors.push(
                    `DEFAULT_TARGET_MAP l1 "${l1}" points to target "${target}" owned by "${targetL1}"`
                );
            }

            if (l1 === 'project_tag' && targetL1 !== 'project_mgmt') {
                errors.push(
                    `DEFAULT_TARGET_MAP l1 "project_tag" should point to project_mgmt target, got "${target}"`
                );
            }
        });
    }
}

const workbenchHomePagePath = path.resolve(process.cwd(), 'src/components/views/l2/WorkbenchHomePage.jsx');
if (!fs.existsSync(workbenchHomePagePath)) {
    errors.push(`WorkbenchHomePage not found: ${workbenchHomePagePath}`);
} else {
    const workbenchHomePageContent = fs.readFileSync(workbenchHomePagePath, 'utf8');
    const cardMappings = [
        ...workbenchHomePageContent.matchAll(
            /navigate:\s*\{\s*l1:\s*'([a-z0-9_]+)'\s*,\s*target:\s*'([a-z0-9_]+)'\s*\}/gim
        )
    ].map((match) => ({ l1: match[1], target: match[2] }));

    if (cardMappings.length === 0) {
        errors.push('WorkbenchHomePage has no parseable card navigate mappings');
    } else {
        cardMappings.forEach(({ l1, target }) => {
            if (!BUSINESS_TARGET_ROUTE_IDS.includes(target)) {
                errors.push(`WorkbenchHomePage target "${target}" is not in businessTargetConfig`);
                return;
            }
            const targetL1 = getBusinessL1ByTarget(target);
            if (targetL1 && targetL1 !== l1) {
                errors.push(
                    `WorkbenchHomePage navigate l1 "${l1}" mismatches target "${target}" owned by "${targetL1}"`
                );
            }
        });

        const cardL1Set = new Set(cardMappings.map((item) => item.l1));
        const missingCoreCardL1 = ['background_data', 'project_mgmt', 'enterprise']
            .filter((l1) => !cardL1Set.has(l1));
        if (missingCoreCardL1.length > 0) {
            warnings.push(
                `WorkbenchHomePage card mappings missing core l1 entries: ${missingCoreCardL1.join(', ')}`
            );
        }
    }
}

const businessContentPath = path.resolve(process.cwd(), 'src/components/views/BusinessContent.jsx');
if (!fs.existsSync(businessContentPath)) {
    errors.push(`BusinessContent not found: ${businessContentPath}`);
} else {
    const businessContent = fs.readFileSync(businessContentPath, 'utf8');
    const rendererMatch = businessContent.match(
        /const BUSINESS_TARGET_RENDERERS\s*=\s*\{([\s\S]*?)\n\};/
    );
    if (!rendererMatch) {
        errors.push('cannot parse BUSINESS_TARGET_RENDERERS object in BusinessContent.jsx');
    } else {
        const rendererIds = [...rendererMatch[1].matchAll(/^\s*([a-z0-9_]+)\s*:/gim)]
            .map((match) => match[1]);

        const missingInRenderers = BUSINESS_TARGET_ROUTE_IDS.filter(
            (routeId) => !rendererIds.includes(routeId)
        );
        if (missingInRenderers.length > 0) {
            errors.push(
                `BusinessContent missing business target renderers: ${missingInRenderers.join(', ')}`
            );
        }

        const extraRenderers = rendererIds.filter(
            (routeId) => !BUSINESS_TARGET_ROUTE_IDS.includes(routeId)
        );
        if (extraRenderers.length > 0) {
            warnings.push(
                `BusinessContent has extra business target renderers: ${extraRenderers.join(', ')}`
            );
        }
    }
}

if (warnings.length > 0) {
    warnings.forEach((msg) => console.warn(`[check:navigation] warn: ${msg}`));
}

if (errors.length > 0) {
    errors.forEach((msg) => console.error(`[check:navigation] error: ${msg}`));
    process.exit(1);
}

console.log(
    `[check:navigation] ok: ${ENTERPRISE_DETAIL_ROUTE_IDS.length} enterprise routes, ${PROJECT_DETAIL_ROUTE_IDS.length} project routes, ${BUSINESS_TARGET_ROUTE_IDS.length} business routes verified`
);
