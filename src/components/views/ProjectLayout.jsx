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

export default function ProjectLayout({ mode, activeL2, activeL3, onL3Change, activeL1 }) {
    const { activeDimension } = useNavigation();

    // Route based on activeDimension (Context Priority)
    // Workbench syncs activeL2 -> activeDimension, but Context can also be set internally (e.g. Breadcrumb)
    const effectiveDimension = activeDimension || activeL2;

    const renderPage = () => {
        // Special Case: Research Object Detail View
        // Special Case: Research Object Detail View (dimension A/B/C)
        if (activeL1 === 'enterprise') {
            switch (activeL2) {
                case 'ent_info':
                    // Basic Info - Reuse Create Page in Edit/View Mode or Placeholder
                    // As per requirement, we focus on create flows, but we need a default view.
                    // For now, render a simple placeholder or the Create page in a specific mode if needed.
                    // Let's use a meaningful placeholder for "Service Enterprise Info"
                    return (
                        <div className="flex-1 flex items-center justify-center bg-white m-3 rounded-md border border-gray-100 shadow-sm">
                            <div className="text-center text-gray-400">
                                <p className="text-lg font-medium mb-1">服务企业信息</p>
                                <p className="text-xs">此处展示企业基本信息与工商信息</p>
                            </div>
                        </div>
                    );
                case 'ent_products':
                    return <ProductPage />;
                case 'ent_locations':
                    return <LocationPage />;
                case 'ent_data':
                    return <DataPage />;
                case 'ent_datasources':
                    return <DataSourcePage />;
                case 'ent_docs':
                    return <DocumentPage showAddButton={true} />;
                default:
                    // Fallback
                    return (
                        <div className="flex-1 flex items-center justify-center bg-white m-3 rounded-md border border-gray-100 shadow-sm">
                            <div className="text-center text-gray-400">
                                <p>未知的模块: {activeL2}</p>
                            </div>
                        </div>
                    );
            }
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
        <div className="w-full h-full flex flex-col bg-[#F5F6F8]">
            {/* Note: Components handle their own padding/layout structure inside */}
            {renderPage()}
        </div>
    );
}
