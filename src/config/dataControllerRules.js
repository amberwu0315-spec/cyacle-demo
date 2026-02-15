const normalizeOptions = (items = []) => {
    if (!Array.isArray(items)) return [];
    return items
        .map((item) => {
            if (item && typeof item === 'object') {
                return {
                    value: String(item.value ?? ''),
                    label: item.label ?? String(item.value ?? ''),
                    disabled: Boolean(item.disabled)
                };
            }
            return {
                value: String(item ?? ''),
                label: String(item ?? ''),
                disabled: false
            };
        })
        .filter((item) => item.value.length > 0);
};

export const DEFAULT_DATA_CONTROLLER_LABEL = '标准';

export const DEFAULT_DATA_CONTROLLER_VIEW_OPTIONS = [
    { value: 'table', label: '表格' }
];

export const buildStandardDataControllerRules = ({
    title = '列表',
    filterOptions = {},
    controllerLabel = DEFAULT_DATA_CONTROLLER_LABEL,
    viewOptions = DEFAULT_DATA_CONTROLLER_VIEW_OPTIONS,
    defaultView = 'table',
    columnSettingsPlaceholder = '列设置功能将在后续版本开放。'
} = {}) => {
    const { types = [], statuses = [] } = filterOptions || {};
    const normalizedTypes = normalizeOptions(types);
    const normalizedStatuses = normalizeOptions(statuses);

    const normalizedViews = normalizeOptions(viewOptions);

    return {
        controllerLabel,
        defaultView,
        searchRule: {
            id: 'search',
            type: 'search',
            label: '搜索',
            placeholder: `${title}名称或其他`
        },
        filterRules: [
            normalizedTypes.length > 0
                ? {
                    id: 'type',
                    type: 'select',
                    label: '类型',
                    allValue: 'all',
                    allLabel: '全部类型',
                    options: normalizedTypes
                }
                : null,
            normalizedStatuses.length > 0
                ? {
                    id: 'status',
                    type: 'select',
                    label: '状态',
                    allValue: 'all',
                    allLabel: '全部状态',
                    options: normalizedStatuses
                }
                : null
        ].filter(Boolean),
        viewOptions: normalizedViews.length > 0
            ? normalizedViews
            : DEFAULT_DATA_CONTROLLER_VIEW_OPTIONS,
        columnSettingsPlaceholder
    };
};
