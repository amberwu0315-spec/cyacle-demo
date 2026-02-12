import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';

// Reusable Content Module Wrapper (Component D)
// Principle: "外圆内方、高度自适、状态显性、间距统一"
export const ContentModule = ({ children, className = '', type = 'detail', status = '' }) => {
    // 状态显性: Added (Green), Deleted (Red)
    const statusClasses = {
        added: 'border-l-4 border-[#29AC68]',
        deleted: 'border-l-4 border-[#E38585]',
    };

    return (
        <div
            className={`w-full h-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 ${status ? statusClasses[status] : ''} ${className}`}
            data-type={type}
            data-status={status}
        >
            {children}
        </div>
    );
};

// Portal Tooltip Component
const PortalTooltip = ({ text, parentRef }) => {
    const [coords, setCoords] = useState(null);

    useEffect(() => {
        if (!parentRef.current) return;

        const updatePosition = () => {
            const rect = parentRef.current.getBoundingClientRect();
            setCoords({
                top: rect.top - 8, // 8px spacing above
                left: rect.left + rect.width / 2
            });
        };

        updatePosition();

        // Update on scroll/resize to keep position correct if user scrolls while hovering
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [parentRef]);

    if (!coords) return null;

    return createPortal(
        <div
            className="fixed px-3 py-2 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap z-[9999]"
            style={{
                top: coords.top,
                left: coords.left,
                transform: 'translate(-50%, -100%)',
                pointerEvents: 'none'
            }}
        >
            {text}
            {/* Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
        </div>,
        document.body
    );
};

// Reusable Module Header (Header Composition Rules)
export const ModuleHeader = ({
    title,
    icon: Icon,
    actions,
    isAccordion,
    isOpen,
    onToggle,
    subTitle,
    toggle,
    iconBadge: IconBadge,
    iconBadgeTooltip = '',
    status = '' // Inherit or pass status for title styling
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const badgeRef = useRef(null);

    // Only show bottom border if it's NOT an accordion, OR if it IS an accordion and IS open
    const showBorder = !isAccordion || (isAccordion && isOpen);

    // 状态显性: Title styling based on status
    const titleClasses = {
        added: 'text-[#29AC68]',
        deleted: 'text-[#C6C6C6] line-through',
        default: 'text-[#4D4D4D]'
    };

    return (
        <div className={`flex items-center justify-between px-3 py-2 bg-white min-h-[48px] ${showBorder ? 'border-b border-gray-100' : ''}`}>
            {/* Zone L: Title Variants + Toggle */}
            <div className={`flex items-center gap-2 ${isAccordion ? 'cursor-pointer' : ''}`} onClick={isAccordion ? onToggle : undefined}>
                {isAccordion && (
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        {isOpen ? <IconChevronDown size={18} /> : <IconChevronRight size={18} />}
                    </button>
                )}

                {Icon && <Icon className="text-gray-500" size={18} />}

                <h3 className={`text-base font-semibold select-none ${status ? titleClasses[status] : titleClasses.default}`}>
                    {title}
                </h3>

                {/* Icon Badge ... (keep as is) ... */}
                {IconBadge && (
                    <div
                        ref={badgeRef}
                        className="relative ml-1"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <IconBadge className="text-gray-400 hover:text-[#087F9C] transition-colors cursor-help" size={16} />

                        {showTooltip && iconBadgeTooltip && (
                            <PortalTooltip text={iconBadgeTooltip} parentRef={badgeRef} />
                        )}
                    </div>
                )}

                {subTitle && (
                    <span className="text-xs text-gray-400 font-normal ml-1">{subTitle}</span>
                )}

                {toggle && (
                    <div className="ml-2">
                        {toggle}
                    </div>
                )}
            </div>

            {/* Zone R: Action Variants */}
            {actions && (
                <div className="flex items-center gap-2">
                    {actions}
                </div>
            )}
        </div>
    );
};
