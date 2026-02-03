import React from 'react';
import { IconX } from '@tabler/icons-react';

/**
 * BusinessTabBar - 业务标签栏组件
 * 
 * Props:
 * - tabs: 标签数组 [{ id, title, icon, isClosable }]
 * - activeTabId: 当前激活的标签ID
 * - onTabClick: (id) => void
 * - onTabClose: (id, e) => void
 */
const BusinessTabBar = ({
    tabs = [],
    activeTabId,
    onTabClick,
    onTabClose
}) => {
    return (
        <div className="flex items-end w-full bg-[#f0f2f5] border-b border-gray-200 px-2 pt-2 gap-1 overflow-x-auto shrink-0 hide-scrollbar">
            {tabs.map((tab) => {
                const isActive = activeTabId === tab.id;
                const Icon = tab.icon;

                return (
                    <div
                        key={tab.id}
                        title={tab.title}
                        onClick={() => onTabClick(tab.id)}
                        className={`
                            group relative flex items-center gap-2 px-4 py-2 text-xs cursor-pointer select-none transition-all rounded-t-md min-w-[120px] max-w-[200px]
                            ${isActive
                                ? 'bg-white text-[#087F9C] font-medium border-t-2 border-t-[#087F9C] border-x border-gray-200 shadow-sm z-10 -mb-[1px] pb-[9px]'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border border-transparent hover:text-gray-700'
                            }
                        `}
                    >
                        {/* 选中状态遮挡底部边框 */}
                        {isActive && <div className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-white" />}

                        {Icon && <Icon size={14} className={isActive ? 'text-[#087F9C]' : 'text-gray-400'} />}

                        <span className="truncate flex-1">{tab.title}</span>

                        {tab.isClosable && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTabClose(tab.id, e);
                                }}
                                className={`
                                    p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity
                                    ${isActive
                                        ? 'hover:bg-red-50 text-gray-400 hover:text-red-500'
                                        : 'hover:bg-gray-300 text-gray-400'
                                    }
                                `}
                            >
                                <IconX size={12} />
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default BusinessTabBar;
