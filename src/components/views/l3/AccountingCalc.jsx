import React, { useState } from 'react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';

// L3: 计算与分析 (AccountingCalc)
const AccountingCalc = () => {
    // Page-level Tab State
    const [activePageTab, setActivePageTab] = useState('chart'); // 'chart' | 'lci'

    return (
        <div className="flex flex-col gap-3 p-3 w-full h-full overflow-y-auto bg-[#F5F6F8]">
            {/* Page-level Tabs (Pill Style) */}
            <div className="flex items-center gap-1">
                <button
                    onClick={() => setActivePageTab('chart')}
                    className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${activePageTab === 'chart' ? 'bg-[#087F9C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    结果图表
                </button>
                <button
                    onClick={() => setActivePageTab('lci')}
                    className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${activePageTab === 'lci' ? 'bg-[#087F9C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    LCI结果
                </button>
            </div>

            {/* Module 1 */}
            <ContentModule>
                <ModuleHeader
                    title="全方法学贡献"
                    subTitle={<span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">与当前方法学无关</span>}
                    actions={
                        <div className="flex bg-gray-100 rounded p-0.5">
                            <button className="px-3 py-1 text-xs font-medium bg-white shadow-sm rounded text-gray-800">阶段</button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">模块</button>
                        </div>
                    }
                />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 2 */}
            <ContentModule>
                <ModuleHeader
                    title="单一方法学贡献"
                    subTitle="单位：KgCO2e"
                    actions={
                        <div className="flex bg-gray-100 rounded p-0.5">
                            <button className="px-3 py-1 text-xs font-medium bg-white shadow-sm rounded text-gray-800">阶段</button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">模块</button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">单元过程</button>
                        </div>
                    }
                />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 3 */}
            <ContentModule>
                <ModuleHeader
                    title="敏感性分析"
                    subTitle={<span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">与当前方法学无关</span>}
                />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 4 */}
            <ContentModule>
                <ModuleHeader
                    title="不确定性-蒙特卡罗模拟结果"
                    actions={
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">节点选择器</span>
                            {/* Mock Dropdown */}
                            <div className="w-24 h-6 bg-gray-50 border border-gray-200 rounded"></div>
                        </div>
                    }
                />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>
        </div>
    );
};

export default AccountingCalc;
