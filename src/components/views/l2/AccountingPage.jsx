import React, { useEffect, useState } from 'react';
import { useHeaderContext } from '../../../context/HeaderContext';
import { useNavigation } from '../../../context/NavigationContext';
import L3Sidebar from '../../layout/L3Sidebar';
import AccountingBasic from '../l3/AccountingBasic';
import AccountingModelConfig from '../accounting/AccountingModelConfig';
import ActivityDataView from '../shared/ActivityDataView';
import FactorDataView from '../shared/FactorDataView';
import ReportInfo from '../l3/ReportInfo';
import ReportExport from '../l3/ReportExport';
import InnerDrawer from '../../common/InnerDrawer';

// Wrapper for L3 Routing Logic
const AccountingPage = ({ activeL3, onL3Change }) => {
    const { setActions, setLayoutConfig } = useHeaderContext(); // Removed setBreadcrumbData logic as it's now in Header Widget
    const { activeMode } = useNavigation();

    // Default Selection Logic
    useEffect(() => {
        if (!activeL3 && onL3Change) {
            onL3Change('acct_basic');
        }
    }, [activeL3, onL3Change]);

    const [activeDrawer, setActiveDrawer] = useState(null);
    const closeDrawer = () => setActiveDrawer(null);

    useEffect(() => {
        // Since BreadcrumbWidget handles its own data via Context,
        // and Header Widgets handle logic, we just clear legacy actions.
        setActions(null);
        return () => setActions(null);
    }, [setActions]);

    // Dynamic Render Logic for L3 Content
    const renderL3Content = () => {
        switch (activeL3) {
            case 'acct_basic': return <AccountingBasic />;
            case 'acct_model_config': return <AccountingModelConfig />;
            case 'acct_calc': return <div className="p-10 text-gray-400">计算与分析 Placeholder</div>;
            case 'acct_tools': return <div className="p-10 text-gray-400">分析工具 Placeholder</div>;
            case 'acct_pers_activity': return <ActivityDataView />;
            case 'acct_pers_factor': return <FactorDataView />;
            case 'rpt_info': return <ReportInfo />;
            case 'rpt_export': return <ReportExport />;
            case 'rpt_voucher': return <div className="p-10 text-gray-400">凭证管理 Placeholder</div>;
            case 'rpt_sheet': return <div className="p-10 text-gray-400">计算表 Placeholder</div>;
            case 'app_cpcd': return <div className="p-10 text-gray-400">CPCD 申请单 Placeholder</div>;
            case 'cmp_list': return <div className="p-10 text-gray-400">对比列表 Placeholder</div>;
            case 'cmp_config': return <div className="p-10 text-gray-400">对比配置 Placeholder</div>;
            case 'cmp_detail': return <div className="p-10 text-gray-400">对比详情 Placeholder</div>;
            case 'cmp_result': return <div className="p-10 text-gray-400">对比结果 Placeholder</div>;
            default: return <AccountingBasic />;
        }
    };

    const isVersionMode = activeMode === 'version';

    return (
        <div className="w-full h-full flex flex-row relative overflow-hidden">
            {!isVersionMode && (
                <L3Sidebar activeL2="accounting" activeL3={activeL3 || 'acct_basic'} onSelect={onL3Change} />
            )}

            <main className="flex-1 bg-[#F5F6F8] relative flex flex-col overflow-hidden">
                {isVersionMode ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <div className="text-2xl font-semibold mb-2">版本模式 (Version Mode)</div>
                        <p>此处显示版本快照内容，不可编辑。</p>
                    </div>
                ) : (
                    renderL3Content()
                )}

                {/* Legacy Drawers */}
                <InnerDrawer
                    isOpen={activeDrawer === 'method'}
                    onClose={closeDrawer}
                    title="方法学设置"
                >
                    <div className="p-4">Methodology Content</div>
                </InnerDrawer>

                <InnerDrawer
                    isOpen={activeDrawer === 'overview'}
                    onClose={closeDrawer}
                    title="核算概览"
                >
                    <div className="p-4">Overview Content</div>
                </InnerDrawer>
            </main>
        </div>
    );
};

export default AccountingPage;
