import React, { useState, useEffect } from 'react';
import { useHeaderContext } from '../../context/HeaderContext';
import { useNavigation } from '../../context/NavigationContext';
import { NAV_SCHEME } from '../../config/navigationConfig';

// Import Widgets
import ViewActionGroup from './ViewActionGroup';
import BreadcrumbWidget from './header_widgets/BreadcrumbWidget';
import ModeSwitchWidget from './header_widgets/ModeSwitchWidget';
import MethodologyWidget from './header_widgets/MethodologyWidget';
import OverviewWidget from './header_widgets/OverviewWidget';
import TitleWidget from './header_widgets/TitleWidget';
import BusinessActionsWidget from './header_widgets/BusinessActionsWidget';

const Header = ({
    title = 'Cyacle',
    defaultActions = [] // For legacy pages or fallback
}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { activeDimension, activeMode } = useNavigation();
    const { titleOverride, actions } = useHeaderContext();

    // Now ALL configured dimensions use widget layout.
    // If activeDimension is not in NAV_SCHEME, we fall back to generic layout.
    const isWidgetLayout = activeDimension && NAV_SCHEME[activeDimension];

    const targetWidgets = isWidgetLayout
        ? (NAV_SCHEME[activeDimension]?.modes[activeMode]?.headerWidgets || [])
        : [];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const renderWidget = (widgetId) => {
        switch (widgetId) {
            case 'breadcrumb': return <BreadcrumbWidget key="bread" />;
            case 'title': return <TitleWidget key="title" />;

            case 'mode_switch': return <ModeSwitchWidget key="mode" />;
            case 'methodology': return <MethodologyWidget key="meth" />;
            case 'overview': return <OverviewWidget key="over" />;

            case 'business_actions': return <BusinessActionsWidget key="biz" />;

            case 'view_actions':
                return ( // Container for default view actions
                    <div key="view" className="flex items-center gap-0">
                        {defaultActions}
                    </div>
                );
            default: return null;
        }
    };

    // Rule: Breadcrumb OR Title is Left. Everything else is Right.
    const leftWidgets = targetWidgets.filter(wId => wId === 'breadcrumb' || wId === 'title');
    const rightWidgets = targetWidgets.filter(wId => wId !== 'breadcrumb' && wId !== 'title');

    return (
        <header
            className={`sticky top-0 z-50 bg-white transition-shadow duration-200 px-4 flex items-center justify-between ${isScrolled ? 'shadow-md' : 'shadow-sm'
                }`}
            style={{ height: '46px' }}
        >
            {isWidgetLayout ? (
                // --- Universal Widget Layout ---
                <>
                    {/* LEFT ZONE */}
                    <div className="flex items-center gap-3">
                        {leftWidgets.map(wId => renderWidget(wId))}
                    </div>

                    {/* RIGHT ZONE */}
                    <div className="flex items-center gap-4">
                        {rightWidgets.map((wId, index) => {
                            // Special Divider Logic: 
                            // If this widget is 'view_actions', AND it is NOT the first/only item on the right
                            // (i.e. there are business items before it), put a divider.
                            if (wId === 'view_actions' && index > 0) {
                                return (
                                    <React.Fragment key={wId}>
                                        <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
                                        {renderWidget(wId)}
                                    </React.Fragment>
                                );
                            }
                            return renderWidget(wId);
                        })}

                        {/* Fallback: If config didn't specify business_actions but they exist in Context, 
                            and we didn't render them via widget, assume legacy 'actions' injection?
                            NO, we enforce config. If you want actions, add 'business_actions' to config.
                            BUT, for safety during migration, we can append if not configured.
                         */}
                    </div>
                </>
            ) : (
                // --- Fallback Legacy Layout (For Dashboard / Unknown L1) ---
                <>
                    <div className="flex items-center gap-3">
                        <h1 className="text-base font-medium text-gray-800 tracking-tight">
                            {titleOverride || title}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {actions}
                        {defaultActions}
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
