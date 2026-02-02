import { IconUserCircle, IconDatabase, IconLayoutKanban, IconBuilding, IconFileCode, IconBell, IconSettings } from '@tabler/icons-react';
import Tooltip from '../common/Tooltip';

export default function L1Sidebar({ activeL1, onSelect }) {

    const navItems = [
        { id: 'home', icon: IconUserCircle, label: '工作空间 (Workspace)' },
        { id: 'background_data', icon: IconDatabase, label: '背景数据 (Background Data)' },
        { id: 'project_mgmt', icon: IconLayoutKanban, label: '项目管理 (Project Management)' },
        { id: 'enterprise', icon: IconBuilding, label: '企业/对象 (Enterprise)' },
    ];

    return (
        <nav className="fixed left-0 top-0 bottom-0 w-fit flex flex-col items-center pt-4 pb-6 z-50 bg-[#1E2A32]">
            <div className="flex flex-col gap-[2px] w-full items-center px-1">
                {navItems.map((item) => {
                    const isActive = activeL1 === item.id;
                    return (
                        <Tooltip key={item.id} content={item.label} placement="right">
                            <button
                                onClick={() => onSelect(item.id)}
                                className={`group relative p-3 rounded-xl transition-colors ${isActive ? 'bg-white/10' : 'hover:bg-white/10'}`}
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
                <Tooltip content="项目标签 (Project Tag)" placement="right">
                    <button
                        onClick={() => onSelect('project_tag')}
                        className={`group relative p-3 rounded-xl transition-colors ${activeL1 === 'project_tag' ? 'bg-white/10' : 'hover:bg-white/10'}`}
                    >
                        <IconFileCode className={`w-6 h-6 transition-colors text-[#10B981] ${activeL1 === 'project_tag' ? '' : 'group-hover:text-[#34D399]'}`} />
                    </button>
                </Tooltip>
            </div>

            <div className="mt-auto flex flex-col gap-[2px] w-full items-center px-1">
                <Tooltip content="通知中心 (Notifications)" placement="right">
                    <button className="group relative p-3 hover:text-white transition-colors">
                        <IconBell className="w-6 h-6 text-white/70" />
                    </button>
                </Tooltip>

                <Tooltip content="设置 (Settings)" placement="right">
                    <button className="group relative p-3 hover:text-white transition-colors">
                        <IconSettings className="w-6 h-6 text-white/70" />
                    </button>
                </Tooltip>
            </div>
        </nav>
    );
}
