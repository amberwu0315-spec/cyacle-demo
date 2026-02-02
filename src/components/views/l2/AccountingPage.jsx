import React, { useEffect, useState } from 'react';
import { useHeaderContext } from '../../../context/HeaderContext';
import { IconSettings, IconFileText } from '@tabler/icons-react';
import L3Sidebar from '../../layout/L3Sidebar';
import AccountingBasic from '../l3/AccountingBasic';
import AccountingConfig from '../l3/AccountingConfig';
import AccountingCalc from '../l3/AccountingCalc';
import AccountingTools from '../l3/AccountingTools';
import ActivityData from '../l3/ActivityData';
import FactorData from '../l3/FactorData';
import ReportInfo from '../l3/ReportInfo';
import ReportExport from '../l3/ReportExport';
import PerspectiveData from '../l3/PerspectiveData';
import InnerDrawer from '../../common/InnerDrawer';
import Tooltip from '../../common/Tooltip';

// Wrapper for L3 Routing Logic (Extracted from ProjectLayout)
const AccountingPage = ({ activeL3, onL3Change }) => {
    const { setActions, setLayoutConfig, setBreadcrumbData } = useHeaderContext();
    const [selectedMethod, setSelectedMethod] = useState('GWP100');

    // Drawer State: 'method' | 'overview' | null
    const [activeDrawer, setActiveDrawer] = useState(null);

    const toggleDrawer = (drawerName) => {
        if (activeDrawer === drawerName) {
            setActiveDrawer(null); // Close if clicking same
        } else {
            setActiveDrawer(drawerName); // Open new
        }
    };

    const closeDrawer = () => setActiveDrawer(null);

    // Close logic when clicking outside is now handled by the main container's onClick
    const handleContentClick = (e) => {
        // Only close if a drawer is open
        if (activeDrawer) {
            setActiveDrawer(null);
        }
    };

    useEffect(() => {
        // 1. Set Layout to Breadcrumb
        setLayoutConfig('breadcrumb');

        // 2. Set Breadcrumb Data
        setBreadcrumbData([
            { label: 'My Model A', onClick: () => console.log('Go Model'), isLeaf: false },
            { label: 'Accounting V1', isLeaf: true }
        ]);

        // 3. Set Actions
        setActions(
            <div className="flex items-center gap-2">
                <Tooltip content="方法学设置">
                    <button
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${activeDrawer === 'method'
                            ? 'bg-[#087F9C] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-100' // Removed bg-gray-100 default
                            }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleDrawer('method');
                        }}
                    >
                        <IconSettings size={14} />
                        <span>{selectedMethod}</span>
                    </button>
                </Tooltip>

                {/* Divider Removed */}

                <Tooltip content="核算概览">
                    <button
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${activeDrawer === 'overview'
                            ? 'bg-[#087F9C] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleDrawer('overview');
                        }}
                    >
                        <IconFileText size={16} />
                        <span>概览</span>
                    </button>
                </Tooltip>
            </div>
        );

        return () => {
            setActions(null);
            setLayoutConfig('title-only'); // Reset to default
            setBreadcrumbData([]);
        };
    }, [setActions, setLayoutConfig, setBreadcrumbData, selectedMethod, activeDrawer]);

    // Dynamic Render Logic for L3 Content (Reused)
    const renderL3Content = () => {
        switch (activeL3) {
            case 'acct_basic': return <AccountingBasic />;
            case 'acct_config': return <AccountingConfig />;
            case 'acct_calc': return <AccountingCalc />;
            case 'acct_tools': return <AccountingTools />;
            case 'pers_activity': return <ActivityData />;
            case 'pers_factor': return <FactorData />;
            case 'rpt_info': return <ReportInfo />;
            case 'rpt_export': return <ReportExport />;
            case 'app_cpcd': return <AccountingBasic />; // Reuse
            default: return <AccountingBasic />; // Default fallback
        }
    };

    return (
        <div className="w-full h-full flex flex-row relative overflow-hidden">
            {/* L3 Sidebar */}
            <L3Sidebar activeL2="accounting" activeL3={activeL3} onSelect={onL3Change} />

            {/* Main Canvas + Drawers Container */}
            <main className="flex-1 bg-[#F5F6F8] relative flex flex-col overflow-hidden" onClick={handleContentClick}>
                {renderL3Content()}

                {/* Non-blocking Drawers (Inside Main) */}
                <InnerDrawer
                    isOpen={activeDrawer === 'method'}
                    onClose={closeDrawer}
                    title="方法学设置 (Methodology)"
                >
                    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">选择默认方法</label>
                            <select
                                value={selectedMethod}
                                onChange={(e) => setSelectedMethod(e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                            >
                                <option value="GWP100">GWP100 - 温室气体</option>
                                <option value="CML2001">CML2001 - 基准</option>
                                <option value="ReCiPe">ReCiPe - Endpoint</option>
                            </select>
                        </div>
                    </div>
                </InnerDrawer>

                <InnerDrawer
                    isOpen={activeDrawer === 'overview'}
                    onClose={closeDrawer}
                    title="核算概览 (Overview)"
                >
                    <div className="space-y-4 text-sm text-gray-600" onClick={(e) => e.stopPropagation()}>
                        <p>当前核算任务的摘要信息...</p>
                        <div className="bg-gray-50 p-3 rounded border border-gray-100">
                            <span className="text-xs text-gray-400">Total Status</span>
                            <div className="font-bold text-green-600">Calculated</div>
                        </div>
                    </div>
                </InnerDrawer>
            </main>
        </div>
    );
};

export default AccountingPage;
