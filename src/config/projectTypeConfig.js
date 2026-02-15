export const PROJECT_TYPE_DEFINITIONS = {
    pcf: {
        id: 'pcf',
        legacyId: 'CFP',
        label: '产品碳足迹',
        labelWithCode: '产品碳足迹 (CFP)',
        tagVariant: 'success'
    },
    ocf: {
        id: 'ocf',
        legacyId: 'CFO',
        label: '组织碳足迹',
        labelWithCode: '组织碳足迹 (CFO)',
        tagVariant: 'primary'
    }
};

const TYPE_ALIAS_MAP = {
    pcf: 'pcf',
    cfp: 'pcf',
    '产品碳足迹': 'pcf',
    ocf: 'ocf',
    cfo: 'ocf',
    '组织碳足迹': 'ocf'
};

export const PROJECT_TYPE_IDS = Object.keys(PROJECT_TYPE_DEFINITIONS);

export const normalizeProjectType = (rawType) => {
    const normalized = String(rawType || '').trim();
    if (!normalized) {
        return '';
    }

    const lowered = normalized.toLowerCase();
    return TYPE_ALIAS_MAP[lowered] || TYPE_ALIAS_MAP[normalized] || '';
};

export const toLegacyProjectType = (rawType, fallback = '') => {
    const normalized = normalizeProjectType(rawType);
    if (!normalized) {
        return fallback;
    }
    return PROJECT_TYPE_DEFINITIONS[normalized]?.legacyId || fallback;
};

export const getProjectTypeLabel = (rawType, options = {}) => {
    const { withCode = false, fallback = '-' } = options;
    const normalized = normalizeProjectType(rawType);
    if (!normalized) {
        return fallback;
    }

    const def = PROJECT_TYPE_DEFINITIONS[normalized];
    return withCode ? def.labelWithCode : def.label;
};

export const getProjectTypeTagVariant = (rawType, fallback = 'primary') => {
    const normalized = normalizeProjectType(rawType);
    if (!normalized) {
        return fallback;
    }
    return PROJECT_TYPE_DEFINITIONS[normalized]?.tagVariant || fallback;
};

export const getProjectTypeOptions = (options = {}) => {
    const { withCode = true, useLegacyValue = true } = options;
    return PROJECT_TYPE_IDS.map((typeId) => {
        const def = PROJECT_TYPE_DEFINITIONS[typeId];
        return {
            value: useLegacyValue ? def.legacyId : def.id,
            label: withCode ? def.labelWithCode : def.label
        };
    });
};

