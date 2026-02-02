import React from 'react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';

// L3: 因子数据 (FactorData)
const FactorData = () => {
    return (
        <div className="flex flex-col gap-3 p-3 w-full h-full overflow-y-auto bg-[#F5F6F8]">
            {/* Module 1 */}
            <ContentModule>
                <ModuleHeader title="因子数据" />
                <div className="h-[300px] w-full bg-white"></div>
            </ContentModule>
        </div>
    );
};

export default FactorData;
