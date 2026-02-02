import React, { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';

// Toggle Switch Component (Local Helper)
const ToggleSwitch = ({ checked, onChange }) => (
    <div
        className={`relative inline-block w-8 h-4 rounded-full cursor-pointer transition-colors ${checked ? 'bg-[#087F9C]' : 'bg-gray-200'}`}
        onClick={() => onChange(!checked)}
    >
        <div className={`absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`}></div>
    </div>
);

// L3: 报告信息 (ReportInfo)
const ReportInfo = () => {
    // State for Toggles
    const [showSpecialEmission, setShowSpecialEmission] = useState(true);
    const [showUncertainty, setShowUncertainty] = useState(true);
    const [showInstructions, setShowInstructions] = useState(true);

    return (
        <div className="flex flex-col gap-3 p-3 w-full h-full overflow-y-auto bg-[#F5F6F8]">
            {/* Module 1: 报告编写属性 */}
            <ContentModule>
                <ModuleHeader title="报告编写属性" />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 2: 报告研究范围 */}
            <ContentModule>
                <ModuleHeader title="报告研究范围" />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 3: 特殊排放分析 (带显隐开关) */}
            <ContentModule>
                <ModuleHeader
                    title="特殊排放分析"
                    toggle={<ToggleSwitch checked={showSpecialEmission} onChange={setShowSpecialEmission} />}
                />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 4: 研究结论 */}
            <ContentModule>
                <ModuleHeader title="研究结论" />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 5: 改进建议 */}
            <ContentModule>
                <ModuleHeader title="改进建议" />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 6: 模型不确定性描述 (带显隐开关 + 添加功能) */}
            <ContentModule>
                <ModuleHeader
                    title="模型不确定性描述"
                    toggle={<ToggleSwitch checked={showUncertainty} onChange={setShowUncertainty} />}
                    actions={
                        <button className="flex items-center gap-1 text-xs text-[#087F9C] font-medium hover:text-[#066c85]">
                            <IconPlus size={14} /> 添加功能
                        </button>
                    }
                />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 7: 特殊说明 (带显隐开关) */}
            <ContentModule>
                <ModuleHeader
                    title="特殊说明"
                    toggle={<ToggleSwitch checked={showInstructions} onChange={setShowInstructions} />}
                />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 8: 导出设置 */}
            <ContentModule>
                <ModuleHeader title="导出设置" />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>
        </div>
    );
};

export default ReportInfo;
