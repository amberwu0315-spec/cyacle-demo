/**
 * AccountingPage - 核算模型主页
 * 
 * 🏢 角色：核算工作室 (Accounting Studio)
 * 📝 职责：
 * 1. 提供"清单"、"计算"、"结果"三级视图的切换。
 * 2. 是核心的业务生产页面之一。
 */
import React, { useEffect, useState } from 'react';
import { IconLoader2 } from '@tabler/icons-react'; // [新增] 用于 Loading 图标
import { usePagePresentation } from '../../../context/PagePresentationContext';
import { useNavigation } from '../../../context/NavigationContext';
import L3Sidebar from '../../layout/L3Sidebar';
import InnerDrawer from '../../common/InnerDrawer';
import ComingSoon from '../../common/ComingSoon';

// L3 Views
import AccountingBasic from '../l3/AccountingBasic';
import AccountingModelConfig from '../accounting/AccountingModelConfig';
import ActivityDataView from '../shared/ActivityDataView';
import FactorDataView from '../shared/FactorDataView';
import ReportInfo from '../l3/ReportInfo';
import ReportExport from '../l3/ReportExport';

// Wrapper for L3 Routing Logic
const AccountingPage = ({ activeL3, onL3Change }) => {
    const { setActions } = usePagePresentation();
    const { activeMode } = useNavigation();

    // [新增] 页面加载状态：用于模拟切换 Tab 时的接口请求延迟
    const [isPageLoading, setIsPageLoading] = useState(false);

    // Default Selection Logic
    useEffect(() => {
        if (!activeL3 && onL3Change) {
            onL3Change('acct_basic');
        }
    }, [activeL3, onL3Change]);

    // [新增] 监听 activeL3 变化，触发“假”加载效果
    useEffect(() => {
        // 只有在非 Version 模式下，且有 activeL3 变化时才触发
        if (activeMode !== 'version') {
            setIsPageLoading(true);
            // 随机延迟 300ms - 600ms，模拟真实感
            const timeout = setTimeout(() => {
                setIsPageLoading(false);
            }, 300 + Math.random() * 300);
            return () => clearTimeout(timeout);
        }
    }, [activeL3, activeMode]);

    const [activeDrawer, setActiveDrawer] = useState(null);
    const closeDrawer = () => setActiveDrawer(null);

    useEffect(() => {
        setActions(null);
        return () => setActions(null);
    }, [setActions]);

    // Dynamic Render Logic for L3 Content
    const renderL3Content = () => {
        switch (activeL3) {
            case 'acct_basic': return <AccountingBasic />;
            case 'acct_model_config': return <AccountingModelConfig />;
            case 'acct_calc': return <ComingSoon title="计算与分析" />;
            case 'acct_tools': return <ComingSoon title="分析工具" />;
            case 'acct_pers_activity': return <ActivityDataView />;
            case 'acct_pers_factor': return <FactorDataView />;
            case 'rpt_info': return <ReportInfo />;
            case 'rpt_export': return <ReportExport />;
            case 'rpt_voucher': return <ComingSoon title="凭证管理" />;
            case 'rpt_sheet': return <ComingSoon title="计算表" />;
            case 'app_cpcd': return <ComingSoon title="CPCD信息" />;
            case 'cmp_list': return <ComingSoon title="对比核算列表" />;
            case 'cmp_config': return <ComingSoon title="对比配置调整" />;
            case 'cmp_detail': return <ComingSoon title="对比标识详情" />;
            case 'cmp_result': return <ComingSoon title="对比分析结果" />;
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
                    // [修改] 增加 Loading 状态判断
                    <React.Fragment>
                        {isPageLoading ? (
                            // Loading State: 居中显示加载动画，带轻微呼吸效果
                            <div className="flex-1 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-10 transition-all duration-300">
                                <div className="flex flex-col items-center gap-3 p-6 rounded-lg">
                                    <IconLoader2 className="animate-spin text-[#087F9C]" size={36} stroke={1.5} />
                                    <span className="text-sm font-medium text-gray-500 animate-pulse">数据加载中...</span>
                                </div>
                            </div>
                        ) : (
                            // Content State: 加载完成后淡入显示
                            <div className="flex-1 flex flex-col h-full overflow-hidden animate-in fade-in duration-500">
                                {renderL3Content()}
                            </div>
                        )}
                    </React.Fragment>
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