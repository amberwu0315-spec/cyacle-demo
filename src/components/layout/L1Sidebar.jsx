/**
 * L1Sidebar - 一级导航侧边栏
 * * 🏢 角色：主电梯 / 楼层索引 (Main Elevator)
 * 📝 职责：
 * 1. 管理应用最顶层模块的切换 (Active L1)，如 workspace, background_data, enterprise。
 * 2. 也是 "Opened Tabs" (多标签页) 的停靠港湾。
 */
import { IconUserCircle, IconDatabase, IconLayoutKanban, IconBuilding, IconFileCode, IconBell, IconSettings, IconFileText, IconX, IconShield } from '@tabler/icons-react';
import Tooltip from '../common/Tooltip';
import { useEffect, useState } from 'react';
import { useAppNavigation } from '../../context/AppNavigationContext';
import { useUser } from '../../context/UserContext';

export default function L1Sidebar() {
    const {
        activeL1,
        setActiveL1,
        openedTabs,
        businessTarget,
        clickTab,
        closeTab
    } = useAppNavigation();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { isL1Allowed, getL1Label, currentRole, setCurrentRole } = useUser();

    // Redirect logic
    useEffect(() => {
        // [修复] 这里的逻辑是：如果当前不在 'project_tag' 也不在 'workspace'，且没有权限，才跳回 workspace
        // 防止系统因为不认识 'workspace' ID 而陷入死循环
        if (activeL1 !== 'project_tag' && activeL1 !== 'workspace' && !isL1Allowed(activeL1)) {
            setActiveL1('workspace');
        }
    }, [activeL1, isL1Allowed, setActiveL1]);

    // Define all possible items
    const allNavItems = [
        { id: 'workspace', icon: IconUserCircle, label: '工作空间' },
        { id: 'background_data', icon: IconDatabase, label: '背景数据' },
        { id: 'project_mgmt', icon: IconLayoutKanban, label: '项目管理' },
        { id: 'enterprise', icon: IconBuilding, label: '服务企业' },
    ];

    // [关键修复] 强制显示 workspace，即使 isL1Allowed 返回 false
    const visibleNavItems = allNavItems
        .filter(item => item.id === 'workspace' || isL1Allowed(item.id))
        .map(item => ({
            ...item,
            // 只有非 workspace 的项目才去尝试获取动态标签，防止报错
            label: item.id === 'workspace' ? item.label : getL1Label(item.id, item.label)
        }));

    return (
        <nav className="fixed left-0 top-0 bottom-0 w-fit flex flex-col items-center pt-4 pb-6 z-50 bg-[#1E2A32]">
            <div className="flex flex-col gap-[2px] w-full items-center px-1">
                {visibleNavItems.map((item) => {
                    const isActive = activeL1 === item.id;
                    return (
                        <Tooltip key={item.id} content={item.label} placement="right">
                            <button
                                onClick={() => setActiveL1(item.id)}
                                className={`group relative p-3 rounded-lg transition-colors ${isActive ? 'bg-white/10' : 'hover:bg-white/10'}`}
                            >
                                <item.icon
                                    className={`w-6 h-6 transition-colors ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}
                                />
                            </button>
                        </Tooltip>
                    )
                })}

                <div className="h-px bg-white/10 w-8 mx-auto my-[4px]"></div>

                {/* Project Tag */}
                <Tooltip content="项目标签" placement="right">
                    <button
                        onClick={() => setActiveL1('project_tag')}
                        className={`group relative p-3 rounded-lg transition-colors ${activeL1 === 'project_tag' ? 'bg-white/10' : 'hover:bg-white/10'}`}
                    >
                        <IconFileCode className={`w-6 h-6 transition-colors text-[#10B981] ${activeL1 === 'project_tag' ? '' : 'group-hover:text-[#34D399]'}`} />
                    </button>
                </Tooltip>

                {/* Render Opened Tabs if any exist */}
                {openedTabs.length > 0 && (
                    <>
                        <div className="h-px bg-white/10 w-8 mx-auto my-[4px] mt-2"></div>
                        <div className="flex flex-col gap-[2px] w-full items-center">
                            {openedTabs.map(tab => {
                                const isActive = businessTarget === tab.id;
                                // Determine Icon based on context
                                let TabIcon = IconFileText;
                                if (tab.l1Context === 'project_mgmt') TabIcon = IconLayoutKanban;
                                else if (tab.l1Context === 'enterprise') TabIcon = IconShield;

                                return (
                                    <Tooltip key={tab.id} content={tab.title} placement="right">
                                        <div className="relative group">
                                            <button
                                                onClick={() => clickTab(tab.id)}
                                                className={`p-3 rounded-lg transition-colors ${isActive ? 'bg-[#087F9C]/20 border border-[#087F9C]/50' : 'hover:bg-white/5 border border-transparent'}`}
                                            >
                                                <TabIcon
                                                    className={`w-6 h-6 transition-colors ${isActive ? 'text-[#087F9C]' : 'text-white/60 group-hover:text-white'}`}
                                                />
                                            </button>
                                            {/* Close Button - Top Right Badge Style */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    closeTab(tab.id, e);
                                                }}
                                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-[1px] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:scale-110"
                                            >
                                                <IconX size={10} stroke={3} />
                                            </button>
                                        </div>
                                    </Tooltip>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            <div className="mt-auto flex flex-col gap-[2px] w-full items-center px-1">
                <Tooltip content="通知中心" placement="right">
                    <button className="group relative p-3 hover:text-white transition-colors">
                        <IconBell className="w-6 h-6 text-white/70" />
                    </button>
                </Tooltip>

                <Tooltip content="设置" placement="right">
                    <div className="relative">
                        <button
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            className={`group relative p-3 transition-colors ${isSettingsOpen ? 'text-white bg-white/10 rounded-lg' : 'hover:text-white text-white/70'}`}
                        >
                            <IconSettings className="w-6 h-6" />
                        </button>

                        {/* Settings Popover */}
                        {isSettingsOpen && (
                            <>
                                {/* Backdrop to close */}
                                <div
                                    className="fixed inset-0 z-[60]"
                                    onClick={() => setIsSettingsOpen(false)}
                                ></div>

                                {/* Popover Content */}
                                <div className="absolute left-full bottom-0 ml-2 w-64 bg-[#1E2A32] border border-gray-700 shadow-xl rounded-lg p-4 z-[70] text-sm">
                                    <div className="text-white font-medium mb-3 pb-2 border-b border-gray-700">
                                        系统设置
                                    </div>

                                    {/* Role Switcher Section */}
                                    <div className="mb-4">
                                        <div className="text-gray-400 text-xs mb-2">演示：切换角色</div>
                                        {/* Use Internal Component */}
                                        <RoleSwitcher currentRole={currentRole} setCurrentRole={setCurrentRole} />
                                    </div>

                                    <div className="text-gray-500 text-xs italic">
                                        更多设置功能开发中...
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Tooltip>
            </div>
        </nav>
    );
}

// Internal component for the switcher to keep it self-contained
function RoleSwitcher({ currentRole, setCurrentRole }) {
    return (
        <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="w-full bg-black/20 border border-gray-600 rounded px-3 py-2 outline-none text-white text-xs cursor-pointer focus:border-[#087F9C] transition-colors"
        >
            <option value="ENTERPRISE">🏢 企业账号 (服务企业)</option>
            <option value="INDIVIDUAL">👤 个人/服务商 (研究对象)</option>
        </select>
    );
}