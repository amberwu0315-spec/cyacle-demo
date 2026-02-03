import React from 'react';
import { IconSettings } from '@tabler/icons-react';

const MethodologyWidget = () => {
    return (
        <button className="flex items-center gap-1.5 px-2 py-1 text-[13px] text-gray-600 hover:text-[#087F9C] hover:bg-cyan-50 rounded transition-colors ml-2">
            <IconSettings size={14} />
            <span>方法学设置</span>
        </button>
    );
};

export default MethodologyWidget;
