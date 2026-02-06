import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { NAV_SCHEME, SIDEBAR_GROUPS } from '../../config/navigationConfig';

export default function L3Sidebar({ activeL3, onSelect }) {
    const { activeDimension, activeMode } = useNavigation();

    // 1. Resolve Configuration
    // Fallback safely if config is missing (though it shouldn't be)
    const currentScheme = NAV_SCHEME[activeDimension]?.modes[activeMode] || {};
    const groupIds = currentScheme.sidebarGroups || [];

    // 2. Render Helper
    const renderGroup = (groupId) => {
        const groupDef = SIDEBAR_GROUPS[groupId];
        if (!groupDef) return null;

        return (
            <div key={groupId} className="mb-5">
                {/* Group Title (Optional logic if needed, style similar to legacy) */}
                {groupDef.title && (
                    <div className="mb-2">
                        {/* Optional Separator or Icon Logic could go here */}
                        <h3 className="text-[11px] font-normal text-gray-400 mb-2 pl-3 uppercase tracking-wider">
                            {groupDef.title}
                        </h3>
                    </div>
                )}

                <ul className="flex flex-col gap-0.5 px-2">
                    {groupDef.items.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => onSelect(item.id)}
                                className={`w-full h-[32px] flex items-center gap-2 px-3 text-[13px] rounded-lg text-left transition-colors ${activeL3 === item.id
                                    ? 'bg-[#087F9C] text-white shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <item.icon className="w-4 h-4 opacity-80" />
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="w-[200px] h-full bg-white border-r border-gray-200 shrink-0 flex flex-col relative" id="l3-sidebar">
            <div className="flex-1 overflow-y-auto py-6">
                {groupIds.map(groupId => renderGroup(groupId))}
            </div>
        </div>
    );
}
