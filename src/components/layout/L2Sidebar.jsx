import { useState } from 'react';
import {
    IconCompass, IconShield, IconChevronLeft, IconChevronRight
} from '@tabler/icons-react';
import Tooltip from '../common/Tooltip';
import Button from '../common/Button';
import { ENTERPRISE_DETAIL_MENU_GROUPS } from '../../config/enterpriseDetailConfig';
import { getProjectDetailMenuGroupsByType } from '../../config/projectDetailConfig';
import { useUser } from '../../context/UserContext';
import { getL1SidebarHeaderMeta } from '../../config/appNavigationConfig';
import { buildBusinessSidebarGroups } from '../../config/businessTargetConfig';
import { resolveIconComponent } from '../../config/iconRegistry';

export default function L2Sidebar({
    activeL2,
    onSelect,
    activeL1,
    enterpriseName = '演示门窗有限公司',
    isDetailView = false,
    activeProjectType = null
}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { isWorkspaceTargetAllowed } = useUser();

    const projectGroups = getProjectDetailMenuGroupsByType(activeProjectType);

    const renderBtn = (item) => {
        const isActive = activeL2 === item.id;
        return (
            <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="group w-full flex flex-col items-center gap-1"
            >
                <div className={`w-10 h-10 rounded-md flex items-center justify-center transition-transform hover:scale-105 ${isActive ? 'bg-[#0ea5b7] text-white shadow-sm' : 'text-slate-500 bg-white hover:bg-slate-100'}`}>
                    <item.icon className="w-5 h-5" />
                </div>
                <span className={`text-[13px] font-medium whitespace-nowrap ${isActive ? 'text-[#0B7285]' : 'text-slate-500'}`}>
                    {item.label}
                </span>
            </button>
        )
    }

    // ==================== Configuration Objects ====================

    // 1. Enterprise Detail View Groups (Specific Company)
    const entGroups = ENTERPRISE_DETAIL_MENU_GROUPS;

    // 2. Business List Groups (workspace/background_data/project_mgmt/enterprise)
    const businessListGroups = buildBusinessSidebarGroups(activeL1, {
        predicate: (entry) => (
            activeL1 !== 'workspace' || isWorkspaceTargetAllowed(entry.id)
        )
    });

    // 3. Header Config (Blue Gradient Card)
    const headerMeta = getL1SidebarHeaderMeta(activeL1);

    // ==================== Logic Determination ====================
    const isEnterpriseDetail = activeL1 === 'enterprise' && isDetailView;
    const isProjectDetail = activeL1 === 'project_mgmt' && isDetailView;
    const isBusinessList = ['workspace', 'background_data', 'project_mgmt', 'enterprise'].includes(activeL1) && !isEnterpriseDetail && !isProjectDetail;

    // Only render the Collapsible Sidebar if we are in one of these modes
    if (isEnterpriseDetail || isBusinessList) {

        let displayGroups = [];
        if (isEnterpriseDetail) {
            displayGroups = entGroups;
        } else if (isBusinessList) {
            displayGroups = businessListGroups;
        }

        return (
            <div className={`${isCollapsed ? 'w-[56px]' : 'w-[206px]'} h-full bg-[#f8fbfd] border-r border-slate-200 flex flex-col shrink-0 transition-all duration-300 ease-in-out relative`}>
                {/* Header Card area */}
                <div className="p-2">
                    {isCollapsed ? (
                        <Tooltip
                            content={
                                isEnterpriseDetail ? enterpriseName :
                                    (isBusinessList ? headerMeta?.title : '导航')
                            }
                            placement="right"
                        >
                            <div className="bg-gradient-to-br from-[#0EA5B7] to-[#0B7285] rounded-md p-2 text-white shadow-md flex items-center justify-center cursor-default">
                                {isEnterpriseDetail ? <IconShield size={20} stroke={1.5} /> :
                                    (isBusinessList && headerMeta) ? (() => { const Icon = resolveIconComponent(headerMeta.iconKey); return <Icon size={20} stroke={1.5} />; })() :
                                        <IconCompass size={20} stroke={1.5} />
                                }
                            </div>
                        </Tooltip>
                    ) : (
                        // Expanded Header
                        isEnterpriseDetail ? (
                            <div className="bg-gradient-to-br from-[#0EA5B7] to-[#0B7285] rounded-md p-3 text-white shadow-md flex flex-col items-center justify-center text-center mb-1 overflow-hidden whitespace-nowrap">
                                <div className="w-8 h-8 rounded-md border-2 border-white/30 flex items-center justify-center mb-1.5 backdrop-blur-sm bg-white/10">
                                    <IconShield size={18} stroke={1.5} />
                                </div>
                                <div className="font-medium text-[13px] leading-tight w-full break-words px-1 truncate">{enterpriseName}</div>
                            </div>
                        ) : (isBusinessList && headerMeta) ? (
                            <div className="bg-gradient-to-br from-[#0EA5B7] to-[#0B7285] rounded-md p-3 text-white shadow-md flex flex-col items-center justify-center text-center mb-1 overflow-hidden">
                                <div className="w-8 h-8 mb-1.5 opacity-90 flex items-center justify-center">
                                    {(() => { const Icon = resolveIconComponent(headerMeta.iconKey); return <Icon size={28} stroke={1.5} />; })()}
                                </div>
                                <div className="font-medium text-[14px] leading-tight w-full mb-2">{headerMeta.title}</div>
                                <div className="text-[10px] text-white/80 leading-relaxed text-left px-1 opacity-90 font-light line-clamp-3">
                                    {headerMeta.desc}
                                </div>
                            </div>
                        ) : null
                    )}
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-1 space-y-4">
                    {displayGroups.map((group, idx) => (
                        <div key={idx}>
                            {!isCollapsed && group.title && (
                                <h3 className="text-[10px] font-semibold text-slate-400 mb-1.5 px-2 uppercase tracking-[0.08em] truncate">{group.title}</h3>
                            )}
                            {isCollapsed && idx > 0 && <div className="h-px bg-gray-100 my-2 mx-1"></div>}

                            <div className="space-y-1 flex flex-col items-center">
                                {group.items.map(item => {
                                    const isActive = activeL2 === item.id;
                                    const ItemIcon = resolveIconComponent(item.iconKey);
                                    // Strategy: Keep semantic button for complex layout, but enforce strict sizing
                                    const ButtonContent = (
                                        <button
                                            key={item.id}
                                            onClick={() => onSelect(item.id)}
                                            className={`
                                                relative flex items-center text-left rounded-md transition-all duration-200 group
                                                ${isCollapsed ? 'justify-center w-10 h-10 p-0' : 'w-full px-2 h-btn-lg items-start py-2'}
                                                ${isActive ? 'bg-[#e6f7fa] border border-[#bde8ef] shadow-sm' : 'hover:bg-white border border-transparent'}
                                            `}
                                        >
                                            {isActive && !isCollapsed && <span className="absolute left-0.5 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-[#0EA5B7]" />}
                                            <ItemIcon
                                                className={`
                                                    shrink-0 transition-colors 
                                                    ${isCollapsed ? 'w-5 h-5' : 'w-4 h-4 mt-0.5'}
                                                    ${isActive ? 'text-[#0B7285]' : 'text-slate-400 group-hover:text-slate-600'}
                                                `}
                                                stroke={1.5}
                                            />
                                            {!isCollapsed && (
                                                <div className="ml-2.5 min-w-0 flex-1">
                                                    <div className={`text-[13px] font-medium leading-none mb-1 truncate ${isActive ? 'text-[#0f172a]' : 'text-slate-700 group-hover:text-slate-900'}`}>{item.label}</div>
                                                    <div className={`text-[10px] leading-tight truncate ${isActive ? 'text-slate-500' : 'text-slate-400 group-hover:text-slate-500'}`}>{item.desc}</div>
                                                </div>
                                            )}
                                        </button>
                                    );

                                    if (isCollapsed) {
                                        return (
                                            <Tooltip key={item.id} content={`${item.label} - ${item.desc}`} placement="right">
                                                {ButtonContent}
                                            </Tooltip>
                                        );
                                    }
                                    return ButtonContent;
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Toggle */}
                <div className="p-2 border-t border-slate-200 flex justify-center">
                    <Button
                        variant="ghost"
                        size="md"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="rounded-full w-8 h-8 p-0 border border-slate-200 text-slate-500 hover:text-primary-action"
                        icon={isCollapsed ? IconChevronRight : IconChevronLeft}
                    />
                </div>
            </div>
        );
    }

    // ==================== Standard Project Layout (Left Nav - Not Sidebar) ====================
    return (
        <div className="w-[50px] h-full bg-[#f8fbfd] border-r border-slate-200 flex flex-col py-2 shrink-0 items-center gap-[4px]">
            {projectGroups.map((group, groupIndex) => (
                <div key={group.title || `project-group-${groupIndex}`} className="w-full flex flex-col items-center gap-[4px]">
                    {group.items.map(renderBtn)}
                    {groupIndex < projectGroups.length - 1 && (
                        <div className="border-b border-slate-200 w-6 mx-auto my-[4px]"></div>
                    )}
                </div>
            ))}
        </div>
    );
}
