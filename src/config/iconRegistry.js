import {
    IconActivity,
    IconBook,
    IconBuilding,
    IconCompass,
    IconCpu,
    IconDatabase,
    IconFlask,
    IconHexagon,
    IconLayoutGrid,
    IconMapPin,
    IconShare,
    IconShield,
    IconStack2
} from '@tabler/icons-react';

export const ICON_REGISTRY = {
    IconCompass,
    IconShare,
    IconLayoutGrid,
    IconShield,
    IconMapPin,
    IconDatabase,
    IconStack2,
    IconCpu,
    IconFlask,
    IconActivity,
    IconBook,
    IconHexagon,
    IconBuilding
};

export const DEFAULT_ICON_KEY = 'IconStack2';
const warnedKeys = new Set();

export const resolveIconComponent = (iconKey, options = {}) => {
    const resolved = ICON_REGISTRY[iconKey];
    if (resolved) {
        return resolved;
    }

    if (import.meta.env.DEV && iconKey && options?.warn !== false && !warnedKeys.has(iconKey)) {
        warnedKeys.add(iconKey);
        console.warn(`[iconRegistry] unknown icon key "${iconKey}", fallback to ${DEFAULT_ICON_KEY}`);
    }

    return ICON_REGISTRY[DEFAULT_ICON_KEY];
};
