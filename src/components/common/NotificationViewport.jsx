import React from 'react';
import { IconX } from '@tabler/icons-react';
import { useNotification } from '../../context/NotificationContext';

const toneMap = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    error: 'border-rose-200 bg-rose-50 text-rose-800',
    warning: 'border-amber-200 bg-amber-50 text-amber-800',
    info: 'border-slate-200 bg-white text-slate-800'
};

export default function NotificationViewport() {
    const { notifications, removeNotification } = useNotification();

    if (!notifications.length) return null;

    return (
        <div className="pointer-events-none fixed top-4 right-4 z-[500] flex w-[320px] flex-col gap-2">
            {notifications.map((item) => (
                <div
                    key={item.id}
                    className={`pointer-events-auto rounded-md border px-3 py-2 shadow-sm ${toneMap[item.type] || toneMap.info}`}
                >
                    <div className="flex items-start gap-2">
                        <p className="flex-1 text-xs leading-5">{item.message}</p>
                        <button
                            onClick={() => removeNotification(item.id)}
                            className="mt-0.5 rounded p-0.5 text-current/70 hover:text-current"
                            title="关闭通知"
                        >
                            <IconX size={14} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
