export const TREE_MODES = {
    CONFIG: 'config',
    COMPARE: 'compare'
};

export const NODE_TYPES = {
    PRODUCT: 'product',
    PHASE: 'phase',
    MODULE: 'module',
    PROCESS: 'process'
};

export const NODE_ORIGINS = {
    SELF: 'self',
    INHERITED: 'inherited'
};

export const NODE_STATUSES = {
    NORMAL: 'normal',
    EXCLUDED: 'excluded',
    SCREENED: 'screened',
    ADDED: 'added',
    DELETED: 'deleted',
    MODIFIED: 'modified'
};

export const PROCESS_SUB_TYPES = {
    NORMAL: 'normal',
    WHOLE_REF: 'whole_ref',
    SPLIT_REF: 'split_ref'
};

export const CALC_STATUSES = {
    PENDING: 'pending',
    DONE: 'done',
    ERROR: 'error'
};

export const STATUS_TEXT_CLASS = {
    [NODE_STATUSES.NORMAL]: 'text-gray-900',
    [NODE_STATUSES.SCREENED]: 'text-gray-900',
    [NODE_STATUSES.EXCLUDED]: 'text-gray-900 line-through',
    [NODE_STATUSES.ADDED]: 'text-emerald-700',
    [NODE_STATUSES.MODIFIED]: 'text-amber-600',
    [NODE_STATUSES.DELETED]: 'text-gray-400 line-through'
};

const CHILD_TYPE_MAP = {
    [NODE_TYPES.PRODUCT]: NODE_TYPES.PHASE,
    [NODE_TYPES.PHASE]: NODE_TYPES.MODULE,
    [NODE_TYPES.MODULE]: NODE_TYPES.PROCESS
};

const LEVEL_PRIORITY = {
    [NODE_TYPES.PRODUCT]: 1,
    [NODE_TYPES.PHASE]: 2,
    [NODE_TYPES.MODULE]: 3,
    [NODE_TYPES.PROCESS]: 4
};

export const getNodeTextClass = (node) => {
    return STATUS_TEXT_CLASS[node?.status] || STATUS_TEXT_CLASS[NODE_STATUSES.NORMAL];
};

export const canShowPercentBadge = (node) => {
    if (!node || node.type !== NODE_TYPES.PROCESS) return false;
    if (node.subType === PROCESS_SUB_TYPES.SPLIT_REF) return false;
    if ([NODE_STATUSES.SCREENED, NODE_STATUSES.EXCLUDED, NODE_STATUSES.DELETED].includes(node.status)) return false;
    return true;
};

export const canExpand = (node) => {
    if (!node) return false;
    return node.type === NODE_TYPES.PHASE || node.type === NODE_TYPES.MODULE;
};

export const canAddChild = (node) => {
    if (!node) return false;
    return node.type !== NODE_TYPES.PROCESS && node.status !== NODE_STATUSES.DELETED;
};

export const canRename = (node) => {
    if (!node) return false;
    return node.type !== NODE_TYPES.PRODUCT || node.origin === NODE_ORIGINS.SELF;
};

export const canDeleteOrScreen = (node) => {
    if (!node) return false;
    if (node.type === NODE_TYPES.PRODUCT) return false;
    return true;
};

export const shouldDeletePhysically = (node) => node?.origin === NODE_ORIGINS.SELF;

export const canResetInherited = (node) => {
    return node?.origin === NODE_ORIGINS.INHERITED && Boolean(node?.is_changed);
};

export const getChildType = (parentType) => CHILD_TYPE_MAP[parentType] || null;

export const isConfiguredNode = (node) => {
    if (!node) return false;
    if (node.type !== NODE_TYPES.PROCESS) {
        return node.hasData !== false;
    }
    return node.calc_status === CALC_STATUSES.DONE;
};

export const isProcessReadOnly = (node) => node?.origin === NODE_ORIGINS.INHERITED;

export const getSummaryTabs = (nodeType) => {
    if (nodeType === NODE_TYPES.PRODUCT) return ['阶段', '模块', '过程'];
    if (nodeType === NODE_TYPES.PHASE) return ['模块', '过程'];
    if (nodeType === NODE_TYPES.MODULE) return ['过程'];
    return [];
};

export const canDropNode = (draggedNode, targetNode) => {
    if (!draggedNode || !targetNode) return false;
    if (targetNode.type === NODE_TYPES.PROCESS) return false;
    if (draggedNode.id === targetNode.id) return false;
    if (LEVEL_PRIORITY[targetNode.type] !== LEVEL_PRIORITY[draggedNode.type] - 1) return false;

    // 规则：继承节点不能拖到自建节点下
    if (draggedNode.origin === NODE_ORIGINS.INHERITED && targetNode.origin === NODE_ORIGINS.SELF) return false;

    return true;
};

