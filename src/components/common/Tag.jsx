import React from 'react';
import { IconX } from '@tabler/icons-react';

/**
 * Tag Component
 * 
 * Standardized chip/badge component for the application.
 * 
 * @param {React.ReactNode} children - Content of the tag
 * @param {React.ElementType} icon - Optional icon component (e.g., Tabler Icons)
 * @param {Function} onDelete - Optional callback for delete action. If provided, a delete button will render.
 * @param {string} className - Additional custom classes
 * @param {string} variant - 'default' | 'primary' | 'warning' | 'error' | 'success' (Currently default maps to cyan theme)
 */
const Tag = ({
    children,
    icon: Icon,
    onDelete,
    className = '',
    variant = 'default',
    shape = 'rect', // 'rect' | 'pill'
    size = 'md',     // 'xs' | 'sm' | 'md'
    ...rest
}) => {
    // 形状类
    const shapeClasses = shape === 'pill' ? 'rounded-full px-3' : 'rounded px-2';

    // 尺寸与字号类 (统一 12px text-xxs)
    const sizeClasses = {
        xs: 'h-5 gap-1 px-1.5 text-[10px]',
        sm: 'h-6 gap-1 px-2 text-xxs',
        md: 'h-7 gap-1.5 px-2.5 text-xxs',
    }[size] || 'h-7 gap-1.5 px-2.5 text-xxs';

    // 基础样式
    const baseStyles = `inline-flex items-center justify-center transition-colors border font-medium whitespace-nowrap ${shapeClasses} ${sizeClasses}`;

    // 变体样式
    const variantStyles = {
        default: "bg-cyan-50 border-cyan-100 text-primary-action",
        primary: "bg-blue-50 border-blue-100 text-blue-700",
        success: "bg-green-50 border-green-100 text-green-700",
        warning: "bg-orange-50 border-orange-100 text-orange-700",
        danger: "bg-red-50 border-red-100 text-red-700",
        neutral: "bg-gray-50 border-gray-200 text-gray-700",
    };

    const resolvedVariantClass = variantStyles[variant] || variantStyles.default;

    return (
        <div className={`${baseStyles} ${resolvedVariantClass} ${className}`} {...rest}>
            {Icon && <Icon size={size === 'xs' ? 10 : 12} className="shrink-0" />}
            <span className="truncate">{children}</span>
            {onDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(e);
                    }}
                    className="ml-0.5 rounded-full hover:bg-black/5 p-0.5 transition-colors shrink-0 flex items-center justify-center"
                    type="button"
                >
                    <IconX size={size === 'xs' ? 10 : 12} />
                </button>
            )}
        </div>
    );
};

export default Tag;
