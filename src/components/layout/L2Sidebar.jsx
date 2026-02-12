import { useState } from 'react';
import {
    IconCompass, IconServer, IconGitBranch, IconBox, IconCalculator, IconShield, IconLayoutGrid, IconBuilding,
    IconMapPin, IconHexagon, IconDatabase, IconFileText, IconChevronLeft, IconChevronRight,
    IconShare, IconStack2, IconCpu, IconFlask, IconActivity, IconBook, IconWorld
} from '@tabler/icons-react';
import Tooltip from '../common/Tooltip';

export default function L2Sidebar({ activeL2, onSelect, activeL1, enterpriseName = '演示门窗有限公司', isDetailView = false }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Standard Project Items
    const items = [
        { id: 'navigation', icon: IconCompass, label: '导航' },
        { id: 'basis', icon: IconServer, label: '基础' },
        { id: 'allocation', icon: IconGitBranch, label: '分配' },
    ];
    const group2 = [
        { id: 'model', icon: IconBox, label: '模型' },
        { id: 'accounting', icon: IconCalculator, label: '核算' },
    ];

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
    const entGroups = [
        { title: '项目', items: [{ id: 'ent_projects', icon: IconLayoutGrid, label: '项目', desc: '管理碳核算项目及进度' }] },
        {
            title: '基础', items: [
                { id: 'ent_info', icon: IconBuilding, label: '信息', desc: '管理基本信息与概况' },
                { id: 'ent_locations', icon: IconMapPin, label: '地点', desc: '管理各生产经营场所地点' }
            ]
        },
        {
            title: '业务', items: [
                { id: 'ent_products', icon: IconHexagon, label: '产品', desc: '录入及管理产品信息' },
                { id: 'ent_data', icon: IconDatabase, label: '数据', desc: '录入及管理活动数据' },
                { id: 'ent_datasources', icon: IconServer, label: '数据源', desc: '管理数据来源及属性' },
                { id: 'ent_docs', icon: IconFileText, label: '文档', desc: '管理发票等数据支撑材料' }
            ]
        }
    ];

    // 2. Business List Groups (Background, Projects, Ent List)
    const workspaceGroups = [
        { title: null, items: [{ id: 'workbench_home', icon: IconCompass, label: '工作台', desc: '个人工作总览与快捷入口' }] }, // Using Compass as placeholder if Dashboard not imported
        {
            title: '碳排放&碳资产', items: [
                { id: 'carbon_panorama', icon: IconMapPin, label: '碳排放全景图', desc: '企业碳排放宏观分布展示' },
                { id: 'carbon_asset_mgmt', icon: IconDatabase, label: '碳资产管理', desc: '管理配额、CCER等碳资产' }
            ]
        }
    ];

    const businessGroups = {
        'workspace': workspaceGroups,
        'background_data': [
            { title: '数据库', items: [{ id: 'database_mgmt', icon: IconStack2, label: '数据库管理', desc: '管理背景数据库全集' }] },
            { title: '元件', items: [{ id: 'components', icon: IconCpu, label: '元件', desc: '相同物质/活动的因子组' }] },
            {
                title: '因子', items: [
                    { id: 'factors_literature', icon: IconFlask, label: '文献因子', desc: '来源于文献的因子数据' },
                    { id: 'factors_baseflow', icon: IconActivity, label: '基本流', desc: '基本物质流动的因子数据' },
                    { id: 'factors_composite', icon: IconStack2, label: '复合因子', desc: '建模计算获得的因子数据' }
                ]
            },
            { title: '文献', items: [{ id: 'literature', icon: IconBook, label: '文献', desc: '因子来源的相关文件' }] }
        ],
        'project_mgmt': [
            { title: '列表', items: [{ id: 'all_projects', icon: IconLayoutGrid, label: '全部项目', desc: '查看所有碳核算项目' }] },
            {
                title: '需求类型', items: [
                    { id: 'pcf', icon: IconHexagon, label: '产品碳足迹', desc: 'Product Carbon Footprint' },
                    { id: 'ocf', icon: IconBuilding, label: '组织碳足迹', desc: 'Org. Carbon Footprint' }
                ]
            }
        ],
        'enterprise': [ // ActiveL1=enterprise but NOT detail view
            { title: '列表', items: [{ id: 'all_objects', icon: IconShield, label: '全部', desc: '所有服务企业主体' }] }
        ]
    };

    // 3. Header Config (Blue Gradient Card)
    const headerConfig = {
        'workspace': { title: '工作空间', icon: IconCompass, desc: '您的个人工作中心，概览核心指标与待办事项。' },
        'background_data': { title: '背景数据', icon: IconShare, desc: '聚焦排放因子与文献数据，为碳足迹核算提供权威依据。' },
        'project_mgmt': { title: '项目', icon: IconLayoutGrid, desc: '管理覆盖碳核算全生命周期，涵盖核算、建模及执行。' },
        'enterprise': { title: '服务企业', icon: IconShield, desc: '围绕服务企业构建数据管理体系，提供清晰的数据信息。' }
    };

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
            displayGroups = businessGroups[activeL1] || [];
        }

        return (
            <div className={`${isCollapsed ? 'w-[56px]' : 'w-[206px]'} h-full bg-[#f8fbfd] border-r border-slate-200 flex flex-col shrink-0 transition-all duration-300 ease-in-out relative`}>
                {/* Header Card area */}
                <div className="p-2">
                    {isCollapsed ? (
                        <Tooltip
                            content={
                                isEnterpriseDetail ? enterpriseName :
                                    (isBusinessList ? headerConfig[activeL1]?.title : '导航')
                            }
                            placement="right"
                        >
                            <div className="bg-gradient-to-br from-[#0EA5B7] to-[#0B7285] rounded-md p-2 text-white shadow-md flex items-center justify-center cursor-default">
                                {isEnterpriseDetail ? <IconShield size={20} stroke={1.5} /> :
                                    (isBusinessList && headerConfig[activeL1]) ? (() => { const Icon = headerConfig[activeL1].icon; return <Icon size={20} stroke={1.5} />; })() :
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
                        ) : (isBusinessList && headerConfig[activeL1]) ? (
                            <div className="bg-gradient-to-br from-[#0EA5B7] to-[#0B7285] rounded-md p-3 text-white shadow-md flex flex-col items-center justify-center text-center mb-1 overflow-hidden">
                                <div className="w-8 h-8 mb-1.5 opacity-90 flex items-center justify-center">
                                    {(() => { const Icon = headerConfig[activeL1].icon; return <Icon size={28} stroke={1.5} />; })()}
                                </div>
                                <div className="font-medium text-[14px] leading-tight w-full mb-2">{headerConfig[activeL1].title}</div>
                                <div className="text-[10px] text-white/80 leading-relaxed text-left px-1 opacity-90 font-light line-clamp-3">
                                    {headerConfig[activeL1].desc}
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
                                    const ButtonContent = (
                                        <button
                                            key={item.id}
                                            onClick={() => onSelect(item.id)}
                                            className={`
                                                relative flex items-center text-left rounded-md transition-all duration-200 group
                                                ${isCollapsed ? 'justify-center w-10 h-10 p-0' : 'w-full p-2 items-start'}
                                                ${isActive ? 'bg-[#e6f7fa] border border-[#bde8ef] shadow-sm' : 'hover:bg-white border border-transparent'}
                                            `}
                                        >
                                            {isActive && !isCollapsed && <span className="absolute left-0.5 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-[#0EA5B7]" />}
                                            <item.icon
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
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0EA5B7] transition-colors"
                    >
                        {isCollapsed ? <IconChevronRight size={16} /> : <IconChevronLeft size={16} />}
                    </button>
                </div>
            </div>
        );
    }

    // ==================== Standard Project Layout (Left Nav - Not Sidebar) ====================
    return (
        <div className="w-[50px] h-full bg-[#f8fbfd] border-r border-slate-200 flex flex-col py-2 shrink-0 items-center gap-[4px]">
            {items.map(renderBtn)}
            <div className="border-b border-slate-200 w-6 mx-auto my-[4px]"></div>
            {group2.map(renderBtn)}
        </div>
    );
}
