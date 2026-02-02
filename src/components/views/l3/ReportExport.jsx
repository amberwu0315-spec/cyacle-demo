import React from 'react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';

// L3: 导出数值 (ReportExport)
const ReportExport = () => {
    return (
        <div className="flex flex-col gap-3 p-3 w-full h-full overflow-y-auto bg-[#F5F6F8]">
            {/* Module 1: 导出设置 */}
            <ContentModule>
                <ModuleHeader title="导出设置" />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 2: 阶段 */}
            <ContentModule>
                <ModuleHeader title="阶段" />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>

            {/* Module 3: 单元过程 */}
            <ContentModule>
                <ModuleHeader title="单元过程" />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>
        </div>
    );
};

export default ReportExport;
