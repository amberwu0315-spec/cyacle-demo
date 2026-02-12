import Tag from './Tag';

const normalizeStatus = (status) => String(status || '').trim().toLowerCase();

const STATUS_TONE_MAP = {
    '进行中': 'primary', // mapped to Tag primary
    running: 'primary',
    processing: 'primary',
    pending: 'warning',
    '审核中': 'warning',
    reviewing: 'warning',
    warning: 'warning',
    success: 'success',
    done: 'success',
    completed: 'success',
    active: 'success',
    '已完成': 'success',
    '已启用': 'success',
    '使用中': 'success',
    failed: 'danger',
    error: 'danger',
    rejected: 'danger',
    inactive: 'danger', // maybe neutral? but danger is safer for 'inactive' in some contexts
    obsolete: 'danger',
    '已淘汰': 'danger',
    queued: 'neutral',
    idle: 'neutral',
    draft: 'neutral',
    default: 'neutral',
    todo: 'neutral',
    '待开始': 'neutral'
};

export const resolveStatusTone = (status) => {
    const normalized = normalizeStatus(status);
    return STATUS_TONE_MAP[normalized] || STATUS_TONE_MAP.default;
};

// Simple Dot component for Status tags
const StatusDot = ({ className = '' }) => (
    <div className={`w-1.5 h-1.5 rounded-full bg-currentColor ${className}`} />
);

const StatusChip = ({ status = '-', className = '', showDot = true }) => {
    const variant = resolveStatusTone(status);

    return (
        <Tag
            variant={variant}
            shape="pill"
            size="sm"
            icon={showDot ? StatusDot : null}
            className={className}
        >
            {status || '-'}
        </Tag>
    );
};

export default StatusChip;
