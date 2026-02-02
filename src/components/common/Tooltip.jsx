import React, { useState } from 'react';

const Tooltip = ({ content, children, placement = 'bottom', disabled = false }) => {
    const [isVisible, setIsVisible] = useState(false);

    if (!content) return children;

    // Position styles
    const positionStyles = {
        top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
        bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
        left: 'right-full mr-2 top-1/2 -translate-y-1/2',
        right: 'left-full ml-2 top-1/2 -translate-y-1/2'
    };

    return (
        <div
            className="relative flex items-center" // relative for positioning, flex for layout preservation
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            {isVisible && (
                <div className={`absolute ${positionStyles[placement]} z-50 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-200`}>
                    {content}
                    {/* Arrow (Optional, keeping it simple for now) */}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
