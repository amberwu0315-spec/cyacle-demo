import React, { useState, useEffect } from 'react';
import { IconArrowLeft, IconChevronDown, IconBell, IconSettings } from '@tabler/icons-react';
import { useHeaderContext } from '../../context/HeaderContext';

const Header = ({
    layoutConfig = 'title-only', // 'title-only' | 'breadcrumb'
    title = 'Cyacle Dashboard',
    breadcrumbData = [], // Array of { label, onClick, isLeaf }
    defaultActions = []
}) => {
    const { actions, titleOverride, layoutConfig: ctxLayoutConfig, breadcrumbData: ctxBreadcrumbData } = useHeaderContext();
    const [isScrolled, setIsScrolled] = useState(false);

    // Context takes precedence over props if set (though here we default context to initial values, so we might need check)
    // Actually, usually context is the source of truth for dynamic pages. Props can be initial defaults.
    const activeLayout = ctxLayoutConfig || layoutConfig;
    const activeBreadcrumbs = ctxBreadcrumbData.length > 0 ? ctxBreadcrumbData : breadcrumbData;

    // Monitor Scroll for Shadow Effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const displayTitle = titleOverride || title;

    return (
        <header
            className={`sticky top-0 z-50 bg-white transition-shadow duration-200 px-4 flex items-center justify-between ${isScrolled ? 'shadow-md' : 'shadow-sm'
                }`}
            style={{ height: '46px' }}
        >
            {/* Left Zone */}
            <div className="flex items-center gap-3">
                {activeLayout === 'title-only' && (
                    <h1 className="text-base font-medium text-gray-800 tracking-tight">
                        {displayTitle}
                    </h1>
                )}

                {activeLayout === 'breadcrumb' && (
                    <nav className="flex items-center gap-1 text-sm">
                        {/* Back Arrow Removed as per user request */}
                        {activeBreadcrumbs.map((item, index) => (
                            <div key={index} className="flex items-center gap-1">
                                {index > 0 && <span className="text-gray-300">/</span>}

                                {item.isLeaf ? (
                                    <span className="font-medium text-gray-900 px-1">
                                        {item.label}
                                    </span>
                                ) : (
                                    <button
                                        onClick={item.onClick}
                                        className="text-gray-500 hover:text-gray-800 px-1 py-0.5 rounded hover:bg-gray-50 transition-colors"
                                    >
                                        {item.label}
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Sibling Dropdown Trigger Example */}
                        {activeBreadcrumbs.length > 0 && (
                            <button className="text-gray-400 hover:text-gray-700 p-0.5 rounded ml-1">
                                <IconChevronDown size={14} />
                            </button>
                        )}
                    </nav>
                )}
            </div>

            {/* Right Zone: Actions */}
            <div className="flex items-center gap-3">
                {/* Dynamic Actions Injected from Page */}
                {actions && (
                    <div className="flex items-center gap-2 border-r border-gray-200 pr-3 mr-1">
                        {actions}
                    </div>
                )}

                {/* Default / Global Actions */}
                <div className="flex items-center gap-1">
                    {defaultActions}
                </div>
            </div>
        </header>
    );
};

export default Header;
