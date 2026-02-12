/**
 * Header - 顶部导航栏 / 页面呈现控制
 * 
 * 🏢 角色：门面装修 (Storefront / Facade)
 * 📝 职责：
 * 1. 显示当前页面的标题（TitleWidget）。
 * 2. 提供视图级别的操作（ViewActionGroup）。
 * 3. 承载业务内容的自定义操作（BusinessActions）。
 * 4. 它的内容由 `PagePresentationContext` 动态驱动。
 */
import React, { useState, useEffect } from 'react';
import { usePagePresentation } from '../../context/PagePresentationContext';
import { useNavigation } from '../../context/NavigationContext';
import { NAV_SCHEME } from '../../config/navigationConfig';

// Import Widgets
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
    const { actions, titleOverride, layoutConfig } = usePagePresentation();
    const { activeDimension: navDimension, activeMode: navMode } = useNavigation();

    const pageLayoutConfig = (layoutConfig && typeof layoutConfig === 'object')
        ? layoutConfig
        : null;
    const activeDimension = pageLayoutConfig?.activeDimension || navDimension;
    const activeMode = pageLayoutConfig?.activeMode || navMode || 'config';

    // Now ALL configured dimensions use widget layout.
    // If activeDimension is not in NAV_SCHEME, we fall back to generic layout.
    const isWidgetLayout = Boolean(activeDimension && NAV_SCHEME[activeDimension]);

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
            case 'title': return <TitleWidget key="title" title={title} />;

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
            className={`sticky top-0 z-50 bg-white border-b border-slate-200 transition-shadow duration-200 px-4 flex items-center justify-between ${isScrolled ? 'shadow-sm' : 'shadow-none'
                }`}
            style={{ height: '44px' }}
        >
            {isWidgetLayout ? (
                // --- Universal Widget Layout ---
                <>
                    {/* LEFT ZONE */}
                    <div className="flex items-center gap-3 min-w-0">
                        {leftWidgets.map(wId => renderWidget(wId))}
                    </div>

                    {/* RIGHT ZONE */}
                    <div className="flex items-center gap-3">
                        {rightWidgets.map((wId, index) => {
                            // Special Divider Logic: 
                            // If this widget is 'view_actions', AND it is NOT the first/only item on the right
                            // (i.e. there are business items before it), put a divider.
                            if (wId === 'view_actions' && index > 0) {
                                return (
                                    <React.Fragment key={wId}>
                                        <div className="w-[1px] h-4 bg-slate-200 mx-1"></div>
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
