import React from 'react';

const normalizeStatus = (status) => String(status || '').trim().toLowerCase();

const STATUS_TONE_MAP = {
    '进行中': 'processing',
    running: 'processing',
    processing: 'processing',
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
    inactive: 'danger',
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

const StatusChip = ({ status = '-', className = '', showDot = true }) => {
    const tone = resolveStatusTone(status);
    return (
        <span className={`qy-status-chip qy-status-chip--${tone} ${className}`}>
            {showDot && <span className="qy-status-chip__dot" />}
            <span>{status || '-'}</span>
        </span>
    );
};

export default StatusChip;
