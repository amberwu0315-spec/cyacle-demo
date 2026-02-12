import React from 'react';

const KpiCard = ({
    title,
    value,
    unit,
    icon: Icon,
    variant = 'default', // 'default' | 'dark'
    children, // Allow custom content for footer/extra details
    className = ''
}) => {
    // Base classes derived from index.css logic but inline/composable
    const baseClasses = "rounded-sm p-4 border border-slate-200 shadow-[0_8px_20px_rgba(15,23,42,0.04)]";

    // Variant styles
    const styles = {
        default: {
            container: "bg-gradient-to-b from-white to-[#f9fcff] border-slate-200",
            label: "text-[11px] font-medium text-slate-500", // qy-subtle-label matches
            value: "text-[26px] font-semibold leading-none text-slate-900 tracking-[-0.02em]", // qy-value-main matches
            unit: "ml-1 text-[11px] font-normal text-slate-400", // qy-value-unit matches
            iconColor: "text-slate-300"
        },
        dark: {
            container: "border-[#0f2f52] bg-[radial-gradient(circle_at_top_right,#1d4f7a_0%,#0f2e4f_45%,#0a1e35_100%)] shadow-[0_10px_28px_rgba(11,30,52,0.35)] relative overflow-hidden",
            label: "text-slate-300 text-xs",
            value: "text-2xl font-semibold text-white mt-0.5",
            unit: "text-xs font-normal text-slate-300 ml-1",
            iconColor: "text-white/50" // generic fallback if icon used in dark mode
        }
    };

    const currentStyle = styles[variant];

    return (
        <div className={`${baseClasses} ${currentStyle.container} ${className}`}>
            {variant === 'dark' && (
                <div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #3e6a9c 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            )}

            <div className={`flex items-start justify-between ${variant === 'dark' ? 'relative z-10' : ''}`}>
                <div>
                    <p className={currentStyle.label}>{title}</p>
                    <p className={`${currentStyle.value} mt-1`}>
                        {value}
                        {unit && <span className={currentStyle.unit}>{unit}</span>}
                    </p>
                </div>
                {Icon && <Icon size={24} className={className.includes('text-') ? '' : currentStyle.iconColor} />}
                {/* Note: Icon color can be overridden by passing a customized Icon component or className, 
                    but here we provide a sensible default if not handled externally. 
                    In usage, we often pass specific colors to the Icon component itself. */}
            </div>

            {(children) && (
                <div className={`mt-4 pt-3 ${variant === 'dark' ? 'border-t border-slate-700 relative z-10' : 'border-t border-slate-200'}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default KpiCard;
