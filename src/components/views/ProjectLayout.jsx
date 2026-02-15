/**
 * ProjectLayout - 项目视图布局
 * 
 * 🏢 角色：项目指挥部 (Project HQ)
 * 📝 职责：
 * 1. 负责渲染具体的 L2 模块页面（如 AllocationPage, BasisPage, ModelPage）。
 * 2. 它的结构通常是：Sidebar(L2) + Header + L2 Page Content。
 * 3. 它是“项目模式”下的主要容器。
 */
import NavigationPage from './l2/NavigationPage';
import BasisPage from './l2/BasisPage';
import AllocationPage from './l2/AllocationPage';
import ModelPage from './l2/ModelPage';
import ModelLevelPage from './l2/ModelLevelPage'; // Import Dimension B View
import AccountingPage from './l2/AccountingPage';
import ProductPage from './l2/ProductPage';
import LocationPage from './l2/LocationPage';
import DataPage from './l2/DataPage';
import DataSourcePage from './l2/DataSourcePage';
import DocumentPage from './l2/DocumentPage';
import { useNavigation } from '../../context/NavigationContext';
import { useAppNavigation } from '../../context/AppNavigationContext';
import { useData } from '../../context/DataContext';
import ProjectManagementModule from './shared/ProjectManagementModule';
import { ENTERPRISE_DETAIL_ROUTE_IDS } from '../../config/enterpriseDetailConfig';
import EnterpriseInfoContent from './shared/EnterpriseInfoContent';

const EnterprisePlaceholderPage = ({ title, description }) => (
    <div className="flex-1 flex items-center justify-center bg-white m-3 rounded-md border border-gray-100 shadow-sm">
        <div className="text-center text-gray-400">
            <p className="text-lg font-medium mb-1">{title}</p>
            <p className="text-xs">{description}</p>
        </div>
    </div>
);

const ENTERPRISE_ROUTE_ALIAS_MAP = {
    all_projects: 'ent_projects',
    all_objects: 'ent_projects',
    info: 'ent_info',
    product: 'ent_products',
    products: 'ent_products',
    location: 'ent_locations',
    locations: 'ent_locations',
    data: 'ent_data',
    datasource: 'ent_datasources',
    datasources: 'ent_datasources',
    docs: 'ent_docs',
    documents: 'ent_docs'
};

const resolveEnterpriseRouteId = (routeId) => {
    const normalized = String(routeId ?? '').trim().toLowerCase();
    if (!normalized) return '';
    if (ENTERPRISE_ROUTE_ALIAS_MAP[normalized]) {
        return ENTERPRISE_ROUTE_ALIAS_MAP[normalized];
    }
    return normalized;
};

export default function ProjectLayout({ mode, activeL2, activeL3, onL3Change, activeL1 }) {
    const { activeDimension } = useNavigation();
    const { businessTarget, openedTabs, openTab } = useAppNavigation();
    const { projects, researchObjects, addProject } = useData();

    const activeEnterpriseTab = openedTabs.find(
        (tab) => tab.id === businessTarget && tab.l1Context === 'enterprise'
    );
    const activeEnterprise = activeEnterpriseTab?.data || null;
    const activeEnterpriseName = activeEnterprise?.name || activeEnterpriseTab?.title || '';
    const resolvedEnterpriseObject = activeEnterpriseName
        ? {
            ...(activeEnterprise || {}),
            id: activeEnterprise?.id || activeEnterpriseName,
            name: activeEnterpriseName
        }
        : null;

    const enterpriseDetailRenderers = {
        ent_projects: () => {
            if (!resolvedEnterpriseObject) {
                return (
                    <EnterprisePlaceholderPage
                        title="服务企业项目"
                        description="未找到当前服务企业上下文，请从服务企业列表重新进入详情。"
                    />
                );
            }
            return (
                <ProjectManagementModule
                    projects={projects}
                    researchObjects={researchObjects}
                    onAddProject={addProject}
                    onOpenProject={(project) => openTab(project, { l1Context: 'project_mgmt' })}
                    defaultType="all"
                    title="项目"
                    scopeKey={`ent_projects:${resolvedEnterpriseObject.id}`}
                    forceResearchObject={resolvedEnterpriseObject}
                />
            );
        },
        ent_info: () => <EnterpriseInfoContent entity={resolvedEnterpriseObject} />,
        ent_products: () => <ProductPage />,
        ent_locations: () => <LocationPage />,
        ent_data: () => <DataPage />,
        ent_datasources: () => <DataSourcePage />,
        ent_docs: () => <DocumentPage showAddButton masterDetailOnly />
    };

    const missingEnterpriseRoutes = ENTERPRISE_DETAIL_ROUTE_IDS.filter((routeId) => !enterpriseDetailRenderers[routeId]);
    if (import.meta.env.DEV && missingEnterpriseRoutes.length > 0) {
        console.warn(`[ProjectLayout] Missing enterprise route renderers: ${missingEnterpriseRoutes.join(', ')}`);
    }

    // Route based on activeDimension (Context Priority)
    // Workbench syncs activeL2 -> activeDimension, but Context can also be set internally (e.g. Breadcrumb)
    const effectiveDimension = activeDimension || activeL2;

    const renderPage = () => {
        // Special Case: Research Object Detail View
        // Special Case: Research Object Detail View (dimension A/B/C)
        if (activeL1 === 'enterprise') {
            const resolvedRouteId = resolveEnterpriseRouteId(activeL2);
            const renderer = enterpriseDetailRenderers[resolvedRouteId];
            if (renderer) {
                return renderer();
            }
            return (
                <EnterprisePlaceholderPage
                    title={`未知的模块: ${activeL2 || '(empty)'}`}
                    description="该路由未映射到企业详情页面。"
                />
            );
        }

        switch (effectiveDimension) {
            case 'navigation':
                return <NavigationPage />;
            case 'basis':
                return <BasisPage />;
            case 'allocation':
                return <AllocationPage />;
            case 'model':
                return <ModelPage />; // L2 Model Page (List)
            case 'model_level':
                return <ModelLevelPage activeL3={activeL3} onL3Change={onL3Change} />; // Dimension B View
            case 'accounting':
                // Accounting has its own internal L3 routing
                return <AccountingPage activeL3={activeL3} onL3Change={onL3Change} />;
            default:
                // Fallback to Navigation if unknown
                return <NavigationPage />;
        }
    };

    return (
        <div className="w-full h-full min-h-0 min-w-0 flex flex-col bg-[#F5F6F8]">
            {/* Note: Components handle their own padding/layout structure inside */}
            {renderPage()}
        </div>
    );
}
