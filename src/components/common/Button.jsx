import React from 'react';

/**
 * Button - 通用按钮组件
 * 遵循设计系统的 T-Shirt Sizing 和 Variant 规范。
 */
const Button = React.forwardRef(({
    children,
    variant = 'filled', // filled | tonal | outline | ghost
    size = 'md',        // sm | md | lg
    icon: Icon,
    rightIcon: RightIcon,
    loading = false,
    disabled = false,
    className = '',
    type = 'button',
    onClick,
    title,
    ...props
}, ref) => {

    // 1. Sizing Config (Standardized Layout)
    const sizeConfig = {
        sm: {
            height: 'h-btn-sm',      // 24px
            padding: 'px-2',        // 8px
            fontSize: 'text-xs',    // 12px
            iconSize: 14,
            gap: 'gap-1',
            radius: 'rounded'       // 4px
        },
        md: {
            height: 'h-btn-md',      // 32px (Default)
            padding: 'px-btn-x-md', // 12px
            fontSize: 'text-[13px]',
            iconSize: 16,
            gap: 'gap-1.5',
            radius: 'rounded'    // 4px
        },
        lg: {
            height: 'h-btn-lg',      // 40px
            padding: 'px-btn-x-lg', // 20px
            fontSize: 'text-sm',    // 14px
            iconSize: 18,
            gap: 'gap-2',
            radius: 'rounded'    // 4px
        }
    };

    const config = sizeConfig[size] || sizeConfig.md;

    // 2. Variant Config (Visual Styles)
    const variantConfig = {
        filled: `bg-[#0ea5b7] text-white hover:bg-[#0b7285] hover:shadow-sm border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.05)] active:scale-95`,
        tonal: `bg-cyan-50 text-[#087F9C] hover:bg-cyan-100 border border-transparent active:scale-95`,
        outline: `bg-white text-slate-700 border border-slate-300 hover:border-[#0ea5b7] hover:text-[#0ea5b7] hover:bg-cyan-50/30 active:scale-95`,
        ghost: `bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent`
    };

    const styles = variantConfig[variant] || variantConfig.filled;

    // 3. Status Utilities
    const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none grayscale-[0.2]";
    const loadingStyles = "cursor-wait opacity-80";

    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            title={title}
            className={`
                relative flex items-center justify-center font-medium transition-all duration-200 select-none
                ${config.height} ${config.padding} ${config.fontSize} ${config.gap} ${config.radius}
                ${styles}
                ${disabled ? disabledStyles : ''}
                ${loading ? loadingStyles : ''}
                ${className}
            `}
            {...props}
        >
            {loading && (
                <svg className={`animate-spin ${variant === 'filled' ? 'text-white' : 'text-current'} w-3.5 h-3.5`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}

            {!loading && Icon && <Icon size={config.iconSize} stroke={1.5} />}

            {children && <span>{children}</span>}

            {!loading && RightIcon && <RightIcon size={config.iconSize} stroke={1.5} />}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
