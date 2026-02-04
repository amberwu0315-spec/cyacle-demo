import NavigationPage from './l2/NavigationPage';
import BasisPage from './l2/BasisPage';
import AllocationPage from './l2/AllocationPage';
import ModelPage from './l2/ModelPage';
import ModelLevelPage from './l2/ModelLevelPage'; // Import Dimension B View
import AccountingPage from './l2/AccountingPage';
import { useNavigation } from '../../context/NavigationContext';

export default function ProjectLayout({ mode, activeL2, activeL3, onL3Change, activeL1 }) {
    const { activeDimension } = useNavigation();

    // Route based on activeDimension (Context Priority)
    // Workbench syncs activeL2 -> activeDimension, but Context can also be set internally (e.g. Breadcrumb)
    const effectiveDimension = activeDimension || activeL2;

    const renderPage = () => {
        // Special Case: Research Object Detail View
        if (activeL1 === 'enterprise') {
            return (
                <div className="flex-1 flex items-center justify-center bg-white m-3 rounded-lg border border-gray-100 shadow-sm">
                    <div className="text-center text-gray-400">
                        <p className="text-lg font-medium mb-1">研究对象详情页</p>
                        <p className="text-xs">此处将展示企业/工厂的详细信息 (Data ID: {activeL2})</p>
                    </div>
                </div>
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
        <div className="w-full h-full flex flex-col bg-[#F5F6F8]">
            {/* Note: Components handle their own padding/layout structure inside */}
            {renderPage()}
        </div>
    );
}
