import { IconBox, IconFileText, IconSettings, IconChartBar, IconUpload, IconShare, IconActivity, IconDatabase, IconFileSpreadsheet, IconCalculator, IconNetwork, IconTopologyStar, IconStack2, IconCpu, IconBook } from '@tabler/icons-react';

export default function L3Sidebar({ activeL2, activeL3, onSelect }) {

    // Group 1-A: 核算 (Accounting Module)
    const renderAccountingModule = () => (
        <div className="mb-3">
            <div className="flex items-center gap-2 mb-2 px-2">
                <IconBox className="w-4 h-4 text-gray-400" />
                <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            <h3 className="text-[11px] font-normal text-gray-400 mb-2 pl-2 uppercase tracking-wider">核算</h3>
            <ul className="flex flex-col gap-0.5">
                <li>
                    <button
                        onClick={() => onSelect('acct_basic')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'acct_basic' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconFileText className="w-4 h-4 opacity-80" /> 基本信息
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect('acct_config')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'acct_config' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconSettings className="w-4 h-4 opacity-80" /> 模型配置与结果
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect('acct_tools')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'acct_tools' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconCalculator className="w-4 h-4 opacity-80" /> 分析工具
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect('acct_calc')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'acct_calc' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconChartBar className="w-4 h-4 opacity-80" /> 计算与分析
                    </button>
                </li>
            </ul>
        </div>
    );

    // Group 1-B: 透视 (Perspective Module)
    const renderPerspectiveModule = () => (
        <div className="mb-3">
            <h3 className="text-[11px] font-normal text-gray-400 mb-2 pl-2 uppercase tracking-wider">透视</h3>
            <ul className="flex flex-col gap-0.5">
                <li>
                    <button
                        onClick={() => onSelect('pers_activity')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'pers_activity' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconDatabase className="w-4 h-4 opacity-80" /> 活动数据
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect('pers_factor')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'pers_factor' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconShare className="w-4 h-4 opacity-80" /> 因子数据
                    </button>
                </li>
            </ul>
        </div>
    );

    // Group 2-A: 生成报告 (Report Module)
    const renderReportModule = () => (
        <div className="mb-3">
            <div className="flex items-center gap-2 mb-2 px-2">
                <IconFileText className="w-4 h-4 text-gray-400" />
                <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            <h3 className="text-[11px] font-normal text-gray-400 mb-2 pl-2 uppercase tracking-wider">生成报告</h3>
            <ul className="flex flex-col gap-0.5">
                <li>
                    <button
                        onClick={() => onSelect('rpt_info')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'rpt_info' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconFileText className="w-4 h-4 opacity-80" /> 报告信息
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect('rpt_export')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'rpt_export' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconUpload className="w-4 h-4 opacity-80" /> 导出数值
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect('rpt_main')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'rpt_main' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconFileSpreadsheet className="w-4 h-4 opacity-80" /> 报告
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect('rpt_voucher')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'rpt_voucher' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconBook className="w-4 h-4 opacity-80" /> 凭证管理
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect('rpt_sheet')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'rpt_sheet' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconFileText className="w-4 h-4 opacity-80" /> 计算表
                    </button>
                </li>
            </ul>
        </div>
    );

    // Group 2-B: 对外申请 (Application Module)
    const renderApplicationModule = () => (
        <div className="mb-3">
            <h3 className="text-[11px] font-normal text-gray-400 mb-2 pl-2 uppercase tracking-wider">对外申请</h3>
            <ul className="flex flex-col gap-0.5">
                <li>
                    <button
                        onClick={() => onSelect('app_cpcd')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'app_cpcd' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconShare className="w-4 h-4 opacity-80" /> CPCD信息
                    </button>
                </li>
            </ul>
        </div>
    );

    // Group 3: 对比 (Comparison Module)
    const renderComparisonModule = () => (
        <div className="mb-3">
            <div className="flex items-center gap-2 mb-2 px-2">
                <IconStack2 className="w-4 h-4 text-gray-400" />
                <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            <h3 className="text-[11px] font-normal text-gray-400 mb-2 pl-2 uppercase tracking-wider">对比</h3>
            <ul className="flex flex-col gap-0.5">
                <li>
                    <button
                        onClick={() => onSelect('cmp_list')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'cmp_list' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconFileText className="w-4 h-4 opacity-80" /> 对比核算列表
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect('cmp_config')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'cmp_config' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconSettings className="w-4 h-4 opacity-80" /> 对比配置调整
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect('cmp_detail')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'cmp_detail' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconFileSpreadsheet className="w-4 h-4 opacity-80" /> 对比标识详情
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => onSelect('cmp_result')}
                        className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-md text-left transition-colors ${activeL3 === 'cmp_result' ? 'bg-[#087F9C] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <IconChartBar className="w-4 h-4 opacity-80" /> 对比分析结果
                    </button>
                </li>
            </ul>
        </div>
    );

    return (
        <div className="w-[200px] h-full bg-white border-r border-gray-200 shrink-0 flex flex-col relative" id="l3-sidebar">
            <div className="flex-1 overflow-y-auto px-2 py-6">
                {/* Big Group 1 (Accounting + Perspective) */}
                <div className="mb-5">
                    {renderAccountingModule()}
                    {renderPerspectiveModule()}
                </div>

                {/* Big Group 2 (Report + Application) */}
                <div className="mb-5">
                    {renderReportModule()}
                    {renderApplicationModule()}
                </div>

                {/* Big Group 3 (Comparison) */}
                <div className="mb-5">
                    {renderComparisonModule()}
                </div>
            </div>
        </div>
    );
}
