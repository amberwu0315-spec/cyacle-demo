import React, { useState } from 'react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';

// L3: 分析工具 (AccountingTools)
const AccountingTools = () => {
    // Page-level Tab State
    const [activePageTab, setActivePageTab] = useState('exclusion');

    return (
        <div className="flex flex-col gap-3 p-3 w-full h-full overflow-y-auto bg-[#F5F6F8]">
            {/* Page-level Tabs (Pill Style) */}
            <div className="flex items-center gap-1">
                <button
                    onClick={() => setActivePageTab('exclusion')}
                    className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${activePageTab === 'exclusion' ? 'bg-[#087F9C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    排除计算
                </button>
                <button
                    onClick={() => setActivePageTab('quality')}
                    className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${activePageTab === 'quality' ? 'bg-[#087F9C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    数据质量打分
                </button>
                <button
                    onClick={() => setActivePageTab('sensitivity')}
                    className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${activePageTab === 'sensitivity' ? 'bg-[#087F9C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    敏感性分析
                </button>
                <button
                    onClick={() => setActivePageTab('issues')}
                    className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${activePageTab === 'issues' ? 'bg-[#087F9C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    重要问题识别
                </button>
            </div>

            {/* Module 1 */}
            <ContentModule>
                <ModuleHeader title="阈值参数" />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 2 */}
            <ContentModule>
                <ModuleHeader title="已排除项列表" />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 3 */}
            <ContentModule>
                <ModuleHeader title="未排除项列表" />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>
        </div>
    );
};

export default AccountingTools;
