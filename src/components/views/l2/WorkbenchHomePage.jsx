import React from 'react';
import { CanvasPage } from '../../layout/PageLayouts';
import DataGrid from '../../common/DataGrid';
import {
    Activity,
    Book,
    Building,
    ChevronRight,
    Cpu,
    FlaskConical,
    MapPin,
    Layers,
    Globe
} from 'lucide-react';

const topCapabilityCards = [
    { title: '元件', desc1: '基于同属性物质/活动的因子明', desc2: '细集合', icon: Cpu, tone: 'text-cyan-600 bg-cyan-50' },
    { title: '文献因子', desc1: '溯源自权威学术文献的核算因', desc2: '子数据', icon: FlaskConical, tone: 'text-indigo-500 bg-indigo-50' },
    { title: '复合因子', desc1: '基于科学建模计算生成的因子', desc2: '数据', icon: Layers, tone: 'text-purple-600 bg-purple-50' },
    { title: '文献', desc1: '支撑因子取值合理性的证明文', desc2: '件', icon: Book, tone: 'text-blue-600 bg-blue-50' }
];

const secondCapabilityCards = [
    { title: '供应链碳盘查', desc: '管理供应商信息及物料的产品碳足迹', icon: Activity, tone: 'text-cyan-600 bg-cyan-50' },
    { title: '组织碳盘查', desc: '国标行业系数库及组织碳核算工具', icon: Building, tone: 'text-cyan-600 bg-cyan-50' },
    { title: '园区碳足迹', desc: '园区入驻企业的组织碳盘查及填报', icon: MapPin, tone: 'text-cyan-600 bg-cyan-50' }
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
    '快速了解研究对象',
    '快速了解不同因子类型',
    '如何管理活动数据'
];

const ProgressBar = ({ value }) => {
    return (
        <div className="inline-flex items-center gap-1.5">
            <span className="text-[12px] text-gray-500">启动准备</span>
            <div className="h-1.5 w-16 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${value}%` }} />
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
    return (
        <CanvasPage className="bg-[#F5F6F8] p-3">
            <div className="h-full flex flex-col gap-3 overflow-y-auto">
                <div className="h-10 px-1 flex items-center justify-between text-sm">
                    <div className="text-gray-800 font-semibold">欢迎进入缝缝补补事务所🎉</div>
                    <div className="text-gray-700 font-semibold">2月12日 周四</div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-6 gap-3">
                    <div className="xl:col-span-5 rounded-lg shadow-sm border border-cyan-200 bg-gradient-to-r from-cyan-500 to-sky-400 px-5 py-4 text-white">
                        <div className="flex items-start justify-between gap-4">
                            <div className="max-w-3xl">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                                        <Globe size={22} strokeWidth={1.8} />
                                    </div>
                                    <div>
                                        <div className="text-3xl leading-8 tracking-tight font-semibold">青钥</div>
                                        <div className="text-sm text-white/85 tracking-wide">Cyacle</div>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-white/95">
                                    通过产品全生命周期建模与精准量化核算，青钥为您提供专业的碳管理工具集，助力您高效完成数据收集、模型建立与认证报告。
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-1 rounded-lg shadow-sm border border-cyan-200 bg-[#CDEFFF] p-3 flex flex-col justify-between">
                        <div className="text-sm font-semibold text-cyan-900">青钥·碳管理人 Club</div>
                        <ul className="text-[12px] text-cyan-900 space-y-1 mt-1">
                            <li>• 学习碳核算实操技巧</li>
                            <li>• 交流青钥·Cyacle 使用经验</li>
                        </ul>
                        <div className="mt-2 self-end w-[78px] h-[78px] bg-white rounded-sm border border-cyan-200 p-1">
                            <div className="h-full w-full grid grid-cols-7 gap-[2px]">
                                {Array.from({ length: 49 }).map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`${idx % 3 === 0 || idx % 7 === 0 ? 'bg-cyan-500' : 'bg-cyan-100'} rounded-[1px]`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
                    {topCapabilityCards.map((item) => (
                        <button
                            key={item.title}
                            className="rounded-md shadow-sm border border-gray-200 bg-white px-5 py-5 flex items-center justify-between hover:border-cyan-300 transition-colors text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.tone}`}>
                                    <item.icon size={24} strokeWidth={1.8} />
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-gray-900">{item.title}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{item.desc1}</div>
                                    <div className="text-xs text-gray-500">{item.desc2}</div>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-cyan-600 shrink-0" />
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                    {secondCapabilityCards.map((item) => (
                        <button
                            key={item.title}
                            className="rounded-md shadow-sm border border-gray-200 bg-white px-5 py-5 flex items-center justify-between hover:border-cyan-300 transition-colors text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.tone}`}>
                                    <item.icon size={24} strokeWidth={1.8} />
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-gray-900">{item.title}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-cyan-600 shrink-0" />
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                    <section className="rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden">
                        <div className="h-10 px-4 border-b border-gray-200 flex items-center justify-between">
                            <span className="text-base text-gray-700 font-semibold">近期项目</span>
                            <ChevronRight size={16} className="text-cyan-600" />
                        </div>
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
                    </section>

                    <section className="rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden">
                        <div className="h-10 px-4 border-b border-gray-200 flex items-center justify-between">
                            <span className="text-base text-gray-700 font-semibold">近期服务客户</span>
                            <ChevronRight size={16} className="text-cyan-600" />
                        </div>
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
                    </section>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 pb-2">
                    <section className="rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden">
                        <div className="h-10 px-4 border-b border-gray-200 flex items-center justify-between">
                            <span className="text-base text-gray-700 font-semibold">行业资讯</span>
                            <ChevronRight size={16} className="text-cyan-600" />
                        </div>
                        <div className="px-4 py-3 space-y-3">
                            {newsItems.map((item, idx) => (
                                <div key={item.title} className="flex items-start gap-3">
                                    {idx < 3 ? (
                                        <span className="w-5 h-5 rounded bg-cyan-100 text-cyan-700 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                                            {idx + 1}
                                        </span>
                                    ) : (
                                        <span className="w-5 h-5 rounded border border-gray-300 text-gray-400 text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                            文
                                        </span>
                                    )}
                                    <div className="min-w-0">
                                        <p className="text-sm text-gray-800 leading-5">{item.title}</p>
                                        <p className="text-xs text-gray-500 leading-5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden">
                        <div className="h-10 px-4 border-b border-gray-200 flex items-center justify-between">
                            <span className="text-base text-gray-700 font-semibold">帮助中心</span>
                            <ChevronRight size={16} className="text-cyan-600" />
                        </div>
                        <div className="px-4 py-3 space-y-3">
                            {helpItems.map((item) => (
                                <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                                    <span className="w-4 h-4 rounded-[3px] border border-gray-300 bg-white shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </CanvasPage>
    );
};

export default WorkbenchHomePage;
