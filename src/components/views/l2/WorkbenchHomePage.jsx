import React from 'react';
import { CanvasPage } from '../../layout/PageLayouts';
import DataGrid from '../../common/DataGrid';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import {
    IconActivity,
    IconBook,
    IconBuilding,
    IconChevronRight,
    IconCpu,
    IconFlask,
    IconMapPin,
    IconLayersIntersect,
    IconGlobe,
    IconExternalLink
} from '@tabler/icons-react';
import { useAppNavigation } from '../../../context/AppNavigationContext';

const topCapabilityCards = [
    {
        title: '元件',
        desc1: '同属性物质与活动的结构化',
        desc2: '因子集合',
        icon: IconCpu,
        tone: 'text-cyan-700 bg-cyan-50',
        navigate: { l1: 'background_data', target: 'components' }
    },
    {
        title: '文献因子',
        desc1: '来自权威文献的可追溯核算',
        desc2: '因子数据',
        icon: IconFlask,
        tone: 'text-indigo-600 bg-indigo-50',
        navigate: { l1: 'background_data', target: 'factors_literature' }
    },
    {
        title: '复合因子',
        desc1: '基于模型计算形成的多源',
        desc2: '综合因子',
        icon: IconLayersIntersect,
        tone: 'text-violet-600 bg-violet-50',
        navigate: { l1: 'background_data', target: 'factors_composite' }
    },
    {
        title: '文献',
        desc1: '支撑因子取值、模型设定与',
        desc2: '审计依据',
        icon: IconBook,
        tone: 'text-blue-700 bg-blue-50',
        navigate: { l1: 'background_data', target: 'literature' }
    }
];

const secondCapabilityCards = [
    {
        title: '供应链碳盘查',
        desc: '管理供应商与物料排放数据',
        icon: IconActivity,
        tone: 'text-cyan-700 bg-cyan-50',
        navigate: { l1: 'project_mgmt', target: 'all_projects' }
    },
    {
        title: '组织碳盘查',
        desc: '组织级核算、核查与汇总',
        icon: IconBuilding,
        tone: 'text-sky-700 bg-sky-50',
        navigate: { l1: 'project_mgmt', target: 'ocf' }
    },
    {
        title: '园区碳足迹',
        desc: '园区多主体排放管理与协同',
        icon: IconMapPin,
        tone: 'text-emerald-700 bg-emerald-50',
        navigate: { l1: 'enterprise', target: 'all_objects' }
    }
];

const recentProjects = [
    { name: 'qqq-组织碳足迹', customer: 'qqq', progress: 18, owner: '-' },
    { name: 'qy测试6', customer: '正经的测试企业数据多多', progress: 16, owner: '-' },
    { name: '正经的测试企业数据多多-产品碳足迹', customer: '正经的测试企业数据多多', progress: 14, owner: '-' },
    { name: '测试0107-组织碳足迹', customer: '测试0107', progress: 13, owner: '-' },
    { name: '测试0107-供应链排放管理', customer: '测试0107', progress: 12, owner: 'dev-01' }
];

const recentClients = [
    { name: 'testtest', industry: '-', location: '-', creator: 'dev-01' },
    { name: '测试0107', industry: '制造业', location: '上海市', creator: 'dev-01' },
    { name: '正经的测试企业数据多多', industry: '制造业', location: '北京市/大兴区', creator: 'di.yang' },
    { name: '测试1203', industry: '-', location: '-', creator: 'zhuwei.chen' },
    { name: '测试1203_复原', industry: '燃煤和无烟煤开采业', location: '北京市/昌平区', creator: 'dev-01' }
];

const newsItems = [
    { title: '轻工专题', desc: '轻工专题213' },
    { title: '测试优先级', desc: '优先级111' },
    { title: '资讯 | 商务部：拓展绿色贸易；英国强化供应链绿色声明监管，eBay发布气候转型路线图', desc: '资讯 | 商务部：拓展绿色贸易；英国强化供应链绿色声明监管，eBay发布气候转型路线图' },
    { title: 'CBAM深度分析｜中国企业是否被针对？背负了多少碳成本？', desc: 'CBAM深度分析｜中国企业是否被针对？背负了多少碳成本？' },
    { title: 'CBAM扩围敲警钟！汽车全产业链碳排放情况大摸底｜八大行业碳盘点', desc: 'CBAM扩围敲警钟！汽车全产业链碳排放情况大摸底｜八大行业碳盘点' }
];

const helpItems = [
    '账号与工作空间设置',
    '快速了解碳核算项目',
    '快速了解服务企业',
    '快速了解不同因子类型',
    '如何管理活动数据'
];

const quickIndicators = [
    { label: '活跃项目', value: 58, unit: '个' },
    { label: '待处理任务', value: 23, unit: '项' },
    { label: '本周录入数据', value: 1263, unit: '条' }
];

const formatToday = () => {
    const now = new Date();
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${now.getMonth() + 1}月${now.getDate()}日 ${weekdays[now.getDay()]}`;
};

const ProgressBar = ({ value }) => {
    return (
        <div className="inline-flex items-center gap-1.5">
            <span className="text-[12px] text-slate-500">启动准备</span>
            <div className="h-1.5 w-16 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full bg-cyan-600" style={{ width: `${value}%` }} />
            </div>
        </div>
    );
};

const recentProjectsColumns = [
    {
        title: '项目名称',
        key: 'name',
        width: 280,
        sortable: true,
        filterable: true,
        groupable: false,
        render: (value) => <span className="text-cyan-700 font-medium">{value}</span>
    },
    {
        title: '服务客户',
        key: 'customer',
        width: 220,
        sortable: true,
        filterable: true,
        groupable: true
    },
    {
        title: '项目进度',
        key: 'progress',
        width: 170,
        sortable: true,
        filterable: false,
        groupable: false,
        render: (value) => <ProgressBar value={value} />
    },
    {
        title: '项目负责人',
        key: 'owner',
        width: 140,
        sortable: true,
        filterable: true,
        groupable: true
    }
];

const recentClientsColumns = [
    {
        title: '名称',
        key: 'name',
        width: 220,
        sortable: true,
        filterable: true,
        groupable: false,
        render: (value) => <span className="text-cyan-700 font-medium">{value}</span>
    },
    {
        title: '所属行业',
        key: 'industry',
        width: 180,
        sortable: true,
        filterable: true,
        groupable: true
    },
    {
        title: '所在地',
        key: 'location',
        width: 190,
        sortable: true,
        filterable: true,
        groupable: true
    },
    {
        title: '创建人',
        key: 'creator',
        width: 140,
        sortable: true,
        filterable: true,
        groupable: true
    }
];

const WorkbenchHomePage = () => {
    const { setActiveL1, setBusinessTarget } = useAppNavigation();

    const handleNavigation = (l1, target) => {
        const nextL2 = l1 === 'project_tag'
            ? 'navigation'
            : l1 === 'workspace'
                ? 'workbench_home'
                : null;
        const nextL3 = l1 === 'project_tag' ? 'acct_basic' : null;
        setActiveL1(l1);
        if (target) {
            setBusinessTarget(target, {
                l1Override: l1,
                l2Override: nextL2,
                l3Override: nextL3
            });
        }
    };

    const handleExternalLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <CanvasPage className="bg-[var(--qy-bg-canvas)] p-3">
            <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-y-auto">
                <div className="h-10 px-1 flex items-center justify-between text-sm">
                    <div className="text-slate-800 font-semibold tracking-[0.01em]">青钥工作台</div>
                    <div className="text-slate-600 font-medium">{formatToday()}</div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-6 gap-3">
                    <div className="xl:col-span-4 rounded-sm border border-cyan-200 bg-gradient-to-br from-[#0b7e95] via-[#0e95ae] to-[#209fcb] px-5 py-4 text-white shadow-[0_12px_26px_rgba(14,149,174,0.24)]">
                        <div className="flex items-start justify-between gap-4">
                            <div className="max-w-3xl">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                                        <IconGlobe size={21} stroke={1.8} />
                                    </div>
                                    <div>
                                        <div className="text-3xl leading-8 tracking-tight font-semibold">青钥</div>
                                        <div className="text-sm text-white/85 tracking-[0.08em]">CYACLE CARBON SUITE</div>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-white/95 max-w-[680px]">
                                    聚焦碳核算全流程，统一管理数据采集、因子建模、核算任务与审计材料，
                                    让复杂碳管理工作保持专业、可追溯、可交付。
                                </p>
                            </div>
                        </div>
                    </div>
                    <ContentModule className="xl:col-span-2 bg-gradient-to-br from-white to-[#f4fbfd]">
                        <ModuleHeader title="运营快照" />
                        <div className="p-4 pt-0">
                            <div className="mt-3 grid grid-cols-3 gap-3">
                                {quickIndicators.map((item) => (
                                    <div key={item.label} className="rounded-sm border border-slate-200 bg-white px-3 py-2.5">
                                        <div className="text-[11px] text-slate-500">{item.label}</div>
                                        <div className="mt-1 text-[24px] leading-none font-semibold text-slate-900">
                                            {item.value.toLocaleString()}
                                            <span className="ml-1 text-[11px] font-normal text-slate-500">{item.unit}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 text-[12px] text-slate-500 leading-5">
                                聚焦高频指标，支持长时间巡检场景下的快速阅读与对比。
                            </div>
                        </div>
                    </ContentModule>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
                    {topCapabilityCards.map((item) => (
                        <button
                            key={item.title}
                            onClick={() => handleNavigation(item.navigate.l1, item.navigate.target)}
                            className="qy-grid-card text-left flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.tone}`}>
                                    <item.icon size={22} strokeWidth={1.8} />
                                </div>
                                <div>
                                    <div className="text-base font-semibold text-slate-900">{item.title}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{item.desc1}</div>
                                    <div className="text-xs text-slate-500">{item.desc2}</div>
                                </div>
                            </div>
                            <IconChevronRight size={16} className="text-cyan-600 shrink-0" />
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                    {secondCapabilityCards.map((item) => (
                        <button
                            key={item.title}
                            onClick={() => handleNavigation(item.navigate.l1, item.navigate.target)}
                            className="qy-grid-card text-left flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.tone}`}>
                                    <item.icon size={22} strokeWidth={1.8} />
                                </div>
                                <div>
                                    <div className="text-base font-semibold text-slate-900">{item.title}</div>
                                    <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                                </div>
                            </div>
                            <IconChevronRight size={16} className="text-cyan-600 shrink-0" />
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                    <ContentModule>
                        <ModuleHeader
                            title="近期项目"
                            onClick={() => handleNavigation('project_mgmt')}
                            actions={<IconChevronRight size={16} className="text-cyan-700" />}
                        />
                        <DataGrid
                            title="近期项目"
                            columns={recentProjectsColumns}
                            rows={recentProjects}
                            rowKey="name"
                            storageKey="workspace:recent-projects"
                            className="border-0 rounded-none"
                            showToolbar={false}
                            showFooter={false}
                            enableViewConfig={false}
                            enableColumnMenu={false}
                            compact
                        />
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader
                            title="近期服务客户"
                            onClick={() => handleNavigation('enterprise')}
                            actions={<IconChevronRight size={16} className="text-cyan-700" />}
                        />
                        <DataGrid
                            title="近期服务客户"
                            columns={recentClientsColumns}
                            rows={recentClients}
                            rowKey="name"
                            storageKey="workspace:recent-clients"
                            className="border-0 rounded-none"
                            showToolbar={false}
                            showFooter={false}
                            enableViewConfig={false}
                            enableColumnMenu={false}
                            compact
                        />
                    </ContentModule>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 pb-2">
                    <ContentModule>
                        <ModuleHeader
                            title="行业资讯"
                            icon={IconExternalLink}
                            onClick={() => handleExternalLink('https://www.carbonnt.com/news')}
                            actions={<IconChevronRight size={16} className="text-cyan-700" />}
                        />
                        <div className="px-4 py-3 space-y-3">
                            {newsItems.map((item, idx) => (
                                <div key={item.title} className="flex items-start gap-3">
                                    {idx < 3 ? (
                                        <span className="w-5 h-5 rounded-sm bg-cyan-100 text-cyan-700 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                                            {idx + 1}
                                        </span>
                                    ) : (
                                        <span className="w-5 h-5 rounded-sm border border-slate-300 text-slate-400 text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                            文
                                        </span>
                                    )}
                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-800 leading-5">{item.title}</p>
                                        <p className="text-xs text-slate-500 leading-5 line-clamp-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader
                            title="帮助中心"
                            icon={IconExternalLink}
                            onClick={() => handleExternalLink('https://doc.cyacle.cn/')}
                            actions={<IconChevronRight size={16} className="text-cyan-700" />}
                        />
                        <div className="px-4 py-3 space-y-3">
                            {helpItems.map((item) => (
                                <div key={item} className="flex items-center gap-3 text-sm text-slate-700">
                                    <span className="w-4 h-4 rounded-sm border border-slate-300 bg-white shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </ContentModule>
                </div>
            </div>
        </CanvasPage>
    );
};

export default WorkbenchHomePage;
