import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';

// Reusable Content Module Wrapper (Component D)
export const ContentModule = ({ children, className = '' }) => {
    return (
        <div className={`w-full h-auto bg-white rounded-md shadow-sm overflow-hidden border border-gray-100 ${className}`}>
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
    iconBadgeTooltip = ''
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const badgeRef = useRef(null);

    // Only show bottom border if it's NOT an accordion, OR if it IS an accordion and IS open
    const showBorder = !isAccordion || (isAccordion && isOpen);

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

                <h3 className="text-base font-semibold text-[#4D4D4D] select-none">{title}</h3>

                {/* Icon Badge - 4px spacing from title */}
                {IconBadge && (
                    <div
                        ref={badgeRef}
                        className="relative ml-1"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <IconBadge className="text-gray-400 hover:text-[#087F9C] transition-colors cursor-help" size={16} />

                        {/* Portal Tooltip */}
                        {showTooltip && iconBadgeTooltip && (
                            <PortalTooltip text={iconBadgeTooltip} parentRef={badgeRef} />
                        )}
                    </div>
                )}

                {subTitle && (
                    <span className="text-xs text-gray-400 font-normal ml-1">{subTitle}</span>
                )}

                {/* Toggle Switch in Left Zone (8px from title) */}
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
