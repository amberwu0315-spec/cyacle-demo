import NavigationPage from './l2/NavigationPage';
import BasisPage from './l2/BasisPage';
import AllocationPage from './l2/AllocationPage';
import ModelPage from './l2/ModelPage';
import AccountingPage from './l2/AccountingPage';

export default function ProjectLayout({ mode, activeL2, activeL3, onL3Change }) {

    // Route based on activeL2
    const renderPage = () => {
        switch (activeL2) {
            case 'navigation':
                return <NavigationPage />;
            case 'basis':
                return <BasisPage />;
            case 'allocation':
                return <AllocationPage />;
            case 'model':
                return <ModelPage />;
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
