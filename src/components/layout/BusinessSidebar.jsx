import { IconShare, IconStack2, IconCpu, IconFlask, IconActivity, IconBook, IconLayoutGrid, IconShield } from '@tabler/icons-react';
import React from 'react';

// Now a Controlled Component
export default function BusinessSidebar({ activeL1, onSelectContent, activeTarget }) {

    const handleSelect = (target, title) => {
        onSelectContent(target, title);
    };

    const headerClass = "bg-gradient-to-br from-[#087F9C] to-[#065F75] p-4 text-white shrink-0";

    // Helper to render buttons
    // headerTitle is optional. If provided, it will be used for the page header instead of the button label.
    const renderBtn = (target, title, Icon, headerTitleOverride) => {
        const isActive = activeTarget === target;
        const baseClass = "w-full flex items-center gap-2 py-1.5 rounded px-2 transition-colors relative group";
        const activeClass = "bg-[#087F9C] text-white shadow-sm";
        const inactiveClass = "text-gray-700 hover:bg-gray-100";

        return (
            <button
                onClick={() => handleSelect(target, headerTitleOverride || title)}
                className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
            >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span className={`text-xs truncate ${isActive ? 'font-medium' : ''}`}>{title}</span>
            </button>
        );
    };

    let content = null;

    if (activeL1 === 'background_data') {
        content = (
            <>
                <div className={headerClass}>
                    <div className="flex flex-col items-center justify-center py-2">
                        <IconShare className="w-8 h-8 mb-2 opacity-90" />
                        <h2 className="text-base font-bold">背景数据</h2>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto py-2">
                    <div className="px-2 py-2">
                        {renderBtn('database_mgmt', '数据库管理', IconStack2)}
                    </div>
                    <div className="px-3 py-2">
                        <h3 className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">元件</h3>
                        {renderBtn('components', '元件', IconCpu)}
                    </div>
                    <div className="px-3 py-2">
                        <h3 className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">因子</h3>
                        {renderBtn('factors_literature', '文献因子', IconFlask)}
                        {renderBtn('factors_baseflow', '基本流', IconActivity)}
                        {renderBtn('factors_composite', '复合因子', IconStack2)}
                    </div>
                    <div className="px-3 py-2">
                        <h3 className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">文献</h3>
                        {renderBtn('literature', '文献', IconBook)}
                    </div>
                </div>
            </>
        );
    } else if (activeL1 === 'project_mgmt') {
        content = (
            <>
                <div className={headerClass}>
                    <div className="flex flex-col items-center justify-center py-2">
                        <IconLayoutGrid className="w-8 h-8 mb-2 opacity-90" />
                        <h2 className="text-base font-bold">项目</h2>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto py-2">
                    <div className="px-2 space-y-1">
                        {renderBtn('all_projects', '全部项目', IconLayoutGrid)}
                        {renderBtn('pcf', '产品碳足迹', IconLayoutGrid, '全部项目')}
                        {renderBtn('ocf', '组织碳足迹', IconLayoutGrid, '全部项目')}
                    </div>
                </div>
            </>
        );
    } else if (activeL1 === 'enterprise') {
        content = (
            <>
                <div className={headerClass}>
                    <div className="flex flex-col items-center justify-center py-2">
                        <IconShield className="w-8 h-8 mb-2 opacity-90" />
                        <h2 className="text-base font-bold">研究对象</h2>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto py-2">
                    <div className="px-2 py-2">
                        {renderBtn('all_objects', '全部', IconShield)}
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="w-[200px] h-full bg-[#FAFAFA] border-r border-gray-200 shrink-0 flex flex-col overflow-y-auto">
            {content}
        </div>
    );
}
