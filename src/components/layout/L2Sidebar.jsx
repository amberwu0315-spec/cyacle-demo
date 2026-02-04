import { IconCompass, IconServer, IconGitBranch, IconBox, IconCalculator, IconShield, IconLayoutGrid, IconBuilding, IconMapPin, IconHexagon, IconDatabase, IconFileText } from '@tabler/icons-react';

export default function L2Sidebar({ activeL2, onSelect, activeL1, enterpriseName = '演示门窗有限公司' }) {

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
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-105 ${isActive ? 'bg-[#087F9C] text-white' : 'text-gray-500'}`}>
                    <item.icon className="w-5 h-5" />
                </div>
                <span className={`text-[14px] font-medium whitespace-nowrap ${isActive ? 'text-[#087F9C]' : 'text-gray-500'}`}>
                    {item.label}
                </span>
            </button>
        )
    }

    // ==================== Enterprise Layout (Research Object) ====================
    if (activeL1 === 'enterprise') {
        const entGroups = [
            {
                title: '项目',
                items: [
                    { id: 'ent_projects', icon: IconLayoutGrid, label: '项目', desc: '管理碳核算项目及进度' }
                ]
            },
            {
                title: '基础',
                items: [
                    { id: 'ent_info', icon: IconBuilding, label: '信息', desc: '管理基本信息与概况' },
                    { id: 'ent_locations', icon: IconMapPin, label: '地点', desc: '管理各生产经营场所地点' }
                ]
            },
            {
                title: '业务',
                items: [
                    { id: 'ent_products', icon: IconHexagon, label: '产品', desc: '录入及管理产品信息' },
                    { id: 'ent_data', icon: IconDatabase, label: '数据', desc: '录入及管理活动数据' },
                    { id: 'ent_datasources', icon: IconServer, label: '数据源', desc: '管理数据来源及属性' },
                    { id: 'ent_docs', icon: IconFileText, label: '文档', desc: '管理发票等数据支撑材料' }
                ]
            }
        ];

        return (
            <div className="w-[240px] h-full bg-white border-r border-gray-200 flex flex-col shrink-0">
                {/* Header Card */}
                <div className="p-3">
                    <div className="bg-gradient-to-br from-[#087F9C] to-[#0D9488] rounded-lg p-4 text-white shadow-md flex flex-col items-center justify-center text-center">
                        <div className="w-10 h-10 rounded-lg border-2 border-white/30 flex items-center justify-center mb-2">
                            <IconShield size={20} stroke={1.5} />
                        </div>
                        <div className="font-medium text-sm truncate w-full">{enterpriseName}</div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
                    {entGroups.map((group, idx) => (
                        <div key={idx}>
                            <h3 className="text-xs font-medium text-gray-500 mb-2 px-2">{group.title}</h3>
                            <div className="space-y-1">
                                {group.items.map(item => {
                                    const isActive = activeL2 === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => onSelect(item.id)}
                                            className={`w-full flex items-start text-left p-2 rounded-lg transition-colors group ${isActive ? 'bg-[#087F9C] text-white' : 'hover:bg-gray-50 text-gray-700'}`}
                                        >
                                            <item.icon className={`w-5 h-5 mt-0.5 shrink-0 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} stroke={1.5} />
                                            <div className="ml-3">
                                                <div className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>{item.label}</div>
                                                <div className={`text-xs mt-0.5 ${isActive ? 'text-white/80' : 'text-gray-400'}`}>{item.desc}</div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ==================== Standard Project Layout ====================
    return (
        <div className="w-[50px] h-full bg-[#F8FAFB] border-r border-[#D6D9DC] flex flex-col py-2 shrink-0 items-center gap-[4px]">
            {items.map(renderBtn)}
            <div className="border-b border-gray-200 w-6 mx-auto my-[4px]"></div>
            {group2.map(renderBtn)}
        </div>
    );
}
