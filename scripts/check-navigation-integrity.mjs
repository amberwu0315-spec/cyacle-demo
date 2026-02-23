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
    BUSINESS_ICON_KEYS,
    BUSINESS_RENDERER_KEYS,
    BUSINESS_TARGET_CONFIG,
    BUSINESS_TARGET_ROUTE_IDS
} from '../src/config/businessTargetConfig.js';
import {
    APP_NAV_HEADER_ICON_KEYS,
    APP_NAV_L1_CONFIG,
    APP_NAV_L1_IDS
} from '../src/config/appNavigationConfig.js';
import {
    DEFAULT_ICON_KEY,
    ICON_REGISTRY
} from '../src/config/iconRegistry.js';

const errors = [];
const warnings = [];
const CORE_BUSINESS_L1 = ['workspace', 'background_data', 'project_mgmt', 'enterprise'];
const REQUIRED_L1_KEYS = ['workspace', 'background_data', 'project_mgmt', 'enterprise', 'project_tag'];

const ensureUnique = (items, label) => {
    const duplicates = items.filter((item, index, arr) => arr.indexOf(item) !== index);
    if (duplicates.length > 0) {
        errors.push(`${label} duplicated: ${[...new Set(duplicates)].join(', ')}`);
    }
};

const parseObjectKeys = (content, objectName) => {
    const match = content.match(
        new RegExp(`const\\s+${objectName}\\s*=\\s*\\{([\\s\\S]*?)\\n\\s*\\};`)
    );
    if (!match) {
        return null;
    }
    return [...match[1].matchAll(/^\s*([a-z0-9_]+)\s*:/gim)].map((m) => m[1]);
};

ensureUnique(ENTERPRISE_DETAIL_ROUTE_IDS, 'enterprise route ids');
ensureUnique(PROJECT_DETAIL_ROUTE_IDS, 'project route ids');
ensureUnique(BUSINESS_TARGET_ROUTE_IDS, 'business target route ids');
ensureUnique(BUSINESS_ICON_KEYS, 'business icon keys');
ensureUnique(APP_NAV_HEADER_ICON_KEYS, 'app-nav header icon keys');
ensureUnique(APP_NAV_L1_IDS, 'app navigation l1 ids');

const registryKeys = Object.keys(ICON_REGISTRY);
if (!registryKeys.includes(DEFAULT_ICON_KEY)) {
    errors.push(`icon registry missing DEFAULT_ICON_KEY: ${DEFAULT_ICON_KEY}`);
}
BUSINESS_ICON_KEYS.forEach((iconKey) => {
    if (!registryKeys.includes(iconKey)) {
        errors.push(`business icon key "${iconKey}" is not registered in ICON_REGISTRY`);
    }
});
APP_NAV_HEADER_ICON_KEYS.forEach((iconKey) => {
    if (!registryKeys.includes(iconKey)) {
        errors.push(`app-nav header icon key "${iconKey}" is not registered in ICON_REGISTRY`);
    }
});

if (!ENTERPRISE_DETAIL_ROUTE_IDS.includes(ENTERPRISE_DETAIL_DEFAULT_L2)) {
    errors.push(`default enterprise L2 "${ENTERPRISE_DETAIL_DEFAULT_L2}" is missing in enterprise routes`);
}
if (!PROJECT_DETAIL_ROUTE_IDS.includes(PROJECT_DETAIL_DEFAULT_L2)) {
    errors.push(`default project L2 "${PROJECT_DETAIL_DEFAULT_L2}" is missing in project routes`);
}

REQUIRED_L1_KEYS.forEach((l1) => {
    if (!APP_NAV_L1_CONFIG[l1]) {
        errors.push(`APP_NAV_L1_CONFIG missing required key: ${l1}`);
    }
});

Object.entries(APP_NAV_L1_CONFIG).forEach(([l1, cfg]) => {
    const target = cfg?.defaultTarget;
    if (!target || !BUSINESS_TARGET_CONFIG[target]) {
        errors.push(`APP_NAV_L1_CONFIG "${l1}" has invalid defaultTarget: ${String(target)}`);
        return;
    }
    const ownerL1 = BUSINESS_TARGET_CONFIG[target]?.l1;
    if (CORE_BUSINESS_L1.includes(l1) && ownerL1 !== l1) {
        errors.push(`APP_NAV_L1_CONFIG "${l1}" defaultTarget "${target}" belongs to "${ownerL1}"`);
    }
    if (l1 === 'project_tag' && ownerL1 !== 'project_mgmt') {
        errors.push(`APP_NAV_L1_CONFIG "project_tag" defaultTarget should belong to "project_mgmt", got "${target}"`);
    }

    const headerIconKey = cfg?.sidebarHeader?.iconKey;
    if (headerIconKey && !registryKeys.includes(headerIconKey)) {
        errors.push(`APP_NAV_L1_CONFIG "${l1}" has unknown sidebarHeader.iconKey: ${headerIconKey}`);
    }
});

Object.entries(BUSINESS_TARGET_CONFIG).forEach(([targetId, meta]) => {
    if (!meta || typeof meta !== 'object') {
        errors.push(`BUSINESS_TARGET_CONFIG "${targetId}" must be an object`);
        return;
    }
    if (!CORE_BUSINESS_L1.includes(meta.l1)) {
        errors.push(`BUSINESS_TARGET_CONFIG "${targetId}" has invalid l1: ${String(meta.l1)}`);
    }
    if (!meta.label) {
        errors.push(`BUSINESS_TARGET_CONFIG "${targetId}" missing label`);
    }
    if (!meta.headerTitle) {
        errors.push(`BUSINESS_TARGET_CONFIG "${targetId}" missing headerTitle`);
    }
    if (!meta.rendererKey) {
        errors.push(`BUSINESS_TARGET_CONFIG "${targetId}" missing rendererKey`);
    }

    if (!meta.sidebar || typeof meta.sidebar !== 'object') {
        errors.push(`BUSINESS_TARGET_CONFIG "${targetId}" missing sidebar config`);
        return;
    }

    const iconKey = meta.sidebar.iconKey;
    if (!iconKey || !BUSINESS_ICON_KEYS.includes(iconKey)) {
        errors.push(`BUSINESS_TARGET_CONFIG "${targetId}" has invalid sidebar.iconKey: ${String(iconKey)}`);
    } else if (!registryKeys.includes(iconKey)) {
        errors.push(`BUSINESS_TARGET_CONFIG "${targetId}" iconKey is not registered: ${iconKey}`);
    }
    if (typeof meta.sidebar.groupKey !== 'string' || meta.sidebar.groupKey.length === 0) {
        errors.push(`BUSINESS_TARGET_CONFIG "${targetId}" missing sidebar.groupKey`);
    }
    if (!Number.isFinite(meta.sidebar.groupOrder)) {
        errors.push(`BUSINESS_TARGET_CONFIG "${targetId}" sidebar.groupOrder must be a number`);
    }
    if (!Number.isFinite(meta.sidebar.itemOrder)) {
        errors.push(`BUSINESS_TARGET_CONFIG "${targetId}" sidebar.itemOrder must be a number`);
    }
});

CORE_BUSINESS_L1.forEach((l1) => {
    const targets = BUSINESS_TARGET_ROUTE_IDS.filter((targetId) => BUSINESS_TARGET_CONFIG[targetId]?.l1 === l1);
    if (targets.length === 0) {
        errors.push(`business l1 "${l1}" has no targets`);
        return;
    }

    const defaults = targets.filter((targetId) => Boolean(BUSINESS_TARGET_CONFIG[targetId]?.isDefaultForL1));
    if (defaults.length !== 1) {
        errors.push(`business l1 "${l1}" should have exactly one isDefaultForL1 target, got ${defaults.length}`);
        return;
    }
    const navDefault = APP_NAV_L1_CONFIG[l1]?.defaultTarget;
    if (defaults[0] !== navDefault) {
        errors.push(`business l1 "${l1}" default mismatch: isDefaultForL1="${defaults[0]}", appNav="${navDefault}"`);
    }
});

Object.entries(PROJECT_TYPE_ROUTE_MATRIX).forEach(([projectType, routeIds]) => {
    const invalidRouteIds = routeIds.filter((routeId) => !PROJECT_DETAIL_ROUTE_IDS.includes(routeId));
    if (invalidRouteIds.length > 0) {
        errors.push(`project type "${projectType}" has invalid route ids: ${invalidRouteIds.join(', ')}`);
    }
});

const projectLayoutPath = path.resolve(process.cwd(), 'src/components/views/ProjectLayout.jsx');
if (!fs.existsSync(projectLayoutPath)) {
    errors.push(`ProjectLayout not found: ${projectLayoutPath}`);
} else {
    const projectLayoutContent = fs.readFileSync(projectLayoutPath, 'utf8');
    const rendererIds = parseObjectKeys(projectLayoutContent, 'enterpriseDetailRenderers');
    if (!rendererIds) {
        errors.push('cannot parse enterpriseDetailRenderers object in ProjectLayout.jsx');
    } else {
        const missing = ENTERPRISE_DETAIL_ROUTE_IDS.filter((routeId) => !rendererIds.includes(routeId));
        const extra = rendererIds.filter((routeId) => !ENTERPRISE_DETAIL_ROUTE_IDS.includes(routeId));
        if (missing.length > 0) {
            errors.push(`ProjectLayout missing enterprise routes: ${missing.join(', ')}`);
        }
        if (extra.length > 0) {
            warnings.push(`ProjectLayout has extra enterprise routes: ${extra.join(', ')}`);
        }
    }
}

const businessContentPath = path.resolve(process.cwd(), 'src/components/views/BusinessContent.jsx');
if (!fs.existsSync(businessContentPath)) {
    errors.push(`BusinessContent not found: ${businessContentPath}`);
} else {
    const businessContent = fs.readFileSync(businessContentPath, 'utf8');
    const newRendererIds = parseObjectKeys(businessContent, 'BUSINESS_RENDERERS');
    if (newRendererIds) {
        const missingRendererKeys = BUSINESS_RENDERER_KEYS.filter((rendererKey) => !newRendererIds.includes(rendererKey));
        if (missingRendererKeys.length > 0) {
            errors.push(`BusinessContent missing BUSINESS_RENDERERS keys: ${missingRendererKeys.join(', ')}`);
        }
    } else {
        const oldRendererIds = parseObjectKeys(businessContent, 'BUSINESS_TARGET_RENDERERS');
        if (!oldRendererIds) {
            errors.push('cannot parse BUSINESS_RENDERERS or BUSINESS_TARGET_RENDERERS in BusinessContent.jsx');
        } else {
            const missingTargets = BUSINESS_TARGET_ROUTE_IDS.filter((routeId) => !oldRendererIds.includes(routeId));
            const extraTargets = oldRendererIds.filter((routeId) => !BUSINESS_TARGET_ROUTE_IDS.includes(routeId));
            if (missingTargets.length > 0) {
                errors.push(`BusinessContent missing business target renderers: ${missingTargets.join(', ')}`);
            }
            if (extraTargets.length > 0) {
                warnings.push(`BusinessContent has extra business target renderers: ${extraTargets.join(', ')}`);
            }
        }
    }
}

const workbenchHomePagePath = path.resolve(process.cwd(), 'src/components/views/l2/WorkbenchHomePage.jsx');
if (!fs.existsSync(workbenchHomePagePath)) {
    errors.push(`WorkbenchHomePage not found: ${workbenchHomePagePath}`);
} else {
    const content = fs.readFileSync(workbenchHomePagePath, 'utf8');
    const cardMappings = [
        ...content.matchAll(
            /navigate:\s*\{\s*l1:\s*'([a-z0-9_]+)'\s*,\s*target:\s*'([a-z0-9_]+)'\s*\}/gim
        )
    ].map((match) => ({ l1: match[1], target: match[2] }));

    if (cardMappings.length === 0) {
        warnings.push('WorkbenchHomePage has no parseable card navigate mappings');
    } else {
        cardMappings.forEach(({ l1, target }) => {
            const targetMeta = BUSINESS_TARGET_CONFIG[target];
            if (!targetMeta) {
                errors.push(`WorkbenchHomePage target "${target}" is not in BUSINESS_TARGET_CONFIG`);
                return;
            }
            if (targetMeta.l1 !== l1) {
                errors.push(`WorkbenchHomePage navigate l1 "${l1}" mismatches target "${target}" owned by "${targetMeta.l1}"`);
            }
        });
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
