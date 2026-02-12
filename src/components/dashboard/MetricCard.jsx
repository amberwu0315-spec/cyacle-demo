import React from 'react';
import { cn } from '../../utils/cn'; // Assuming you have a cn utility, otherwise use template literals or classnames

const MetricCard = ({
    title,
    value,
    unit,
    trend,
    icon: Icon,
    footer,
    progress,
    className
}) => {
    return (
        <div className={`rounded-sm shadow-sm border border-slate-200 bg-white p-4 min-h-[116px] flex flex-col justify-between group hover:border-[#7dd3df] transition-colors ${className || ''}`}>
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="text-[12px] text-slate-500">{title}</p>
                    <p className="mt-1 text-[30px] leading-none font-semibold text-slate-900">
                        {value}
                        {unit && <span className="ml-1 text-[12px] font-normal text-slate-500">{unit}</span>}
                    </p>
                </div>
                {Icon && (
                    <span className="w-8 h-8 rounded-sm bg-slate-100 text-slate-500 flex items-center justify-center">
                        <Icon size={16} strokeWidth={1.8} />
                    </span>
                )}
            </div>
            {progress !== undefined ? (
                <div className="mt-2">
                    <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full rounded-full bg-[#0EA5B7]" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            ) : (
                <div className="mt-2 flex items-center gap-2 text-xs">
                    {trend && <span className="text-[#22A06B] font-medium">↘ {trend}</span>}
                    {footer && <span className="text-slate-400">{footer}</span>}
                </div>
            )}
        </div>
    );
};

export default MetricCard;
