import React from 'react';
import { CanvasPage } from '../../layout/PageLayouts';
import {
    IconActivity,
    IconBook,
    IconBuilding,
    IconChevronRight,
    IconCpu,
    IconFlask,
    IconMapPin,
    IconStack2,
    IconWorld
} from '@tabler/icons-react';

const topCapabilityCards = [
    { title: '元件', desc1: '基于同属性物质/活动的因子明', desc2: '细集合', icon: IconCpu, tone: 'text-cyan-600 bg-cyan-50' },
    { title: '文献因子', desc1: '溯源自权威学术文献的核算因', desc2: '子数据', icon: IconFlask, tone: 'text-indigo-500 bg-indigo-50' },
    { title: '复合因子', desc1: '基于科学建模计算生成的因子', desc2: '数据', icon: IconStack2, tone: 'text-purple-600 bg-purple-50' },
    { title: '文献', desc1: '支撑因子取值合理性的证明文', desc2: '件', icon: IconBook, tone: 'text-blue-600 bg-blue-50' }
];

const secondCapabilityCards = [
    { title: '供应链碳盘查', desc: '管理供应商信息及物料的产品碳足迹', icon: IconActivity, tone: 'text-cyan-600 bg-cyan-50' },
    { title: '组织碳盘查', desc: '国标行业系数库及组织碳核算工具', icon: IconBuilding, tone: 'text-cyan-600 bg-cyan-50' },
    { title: '园区碳足迹', desc: '园区入驻企业的组织碳盘查及填报', icon: IconMapPin, tone: 'text-cyan-600 bg-cyan-50' }
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
            <div className="h-1.5 w-16 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${value}%` }} />
            </div>
        </div>
    );
};

const WorkbenchHomePage = () => {
    return (
        <CanvasPage className="bg-[#ECF2F6] p-3">
            <div className="h-full flex flex-col gap-3 overflow-y-auto">
                <div className="h-10 px-1 flex items-center justify-between text-sm">
                    <div className="text-gray-800 font-semibold">欢迎进入测试企业的工作空间👋</div>
                    <div className="text-gray-700 font-semibold">2月12日 周四</div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-6 gap-3">
                    <div className="xl:col-span-5 rounded-md border border-cyan-200 bg-gradient-to-r from-cyan-500 to-sky-400 px-5 py-4 text-white">
                        <div className="flex items-start justify-between gap-4">
                            <div className="max-w-3xl">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                                        <IconWorld size={22} stroke={1.8} />
                                    </div>
                                    <div>
                                        <div className="text-[40px] leading-8 tracking-tight font-semibold">青矜</div>
                                        <div className="text-[12px] text-white/85 tracking-wide">Cyacle</div>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-white/95">
                                    通过产品全生命周期建模与精准量化核算，青矜为您提供专业的碳管理工具集，
                                    助力您高效完成数据收集、模型建立与认证报告。
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-1 rounded-md border border-cyan-200 bg-[#CDEFFF] p-3 flex flex-col justify-between">
                        <div className="text-[13px] font-semibold text-cyan-900">青矜·碳管理人 Club</div>
                        <ul className="text-[12px] text-cyan-900 space-y-1 mt-1">
                            <li>• 学习碳核算实操技巧</li>
                            <li>• 交流青矜·Cyacle 使用经验</li>
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
                            className="rounded-md border border-slate-200 bg-white px-5 py-5 flex items-center justify-between hover:border-cyan-300 transition-colors text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.tone}`}>
                                    <item.icon size={24} stroke={1.8} />
                                </div>
                                <div>
                                    <div className="text-[33px] leading-8 font-medium text-slate-900">{item.title}</div>
                                    <div className="text-xs text-slate-500">{item.desc1}</div>
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
                            className="rounded-md border border-slate-200 bg-white px-5 py-5 flex items-center justify-between hover:border-cyan-300 transition-colors text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.tone}`}>
                                    <item.icon size={24} stroke={1.8} />
                                </div>
                                <div>
                                    <div className="text-[33px] leading-8 font-medium text-slate-900">{item.title}</div>
                                    <div className="text-xs text-slate-500">{item.desc}</div>
                                </div>
                            </div>
                            <IconChevronRight size={16} className="text-cyan-600 shrink-0" />
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                    <section className="rounded-md border border-slate-200 bg-white overflow-hidden">
                        <div className="h-10 px-4 border-b border-slate-200 flex items-center justify-between">
                            <span className="text-sm text-slate-700 font-medium">近期项目</span>
                            <IconChevronRight size={16} className="text-cyan-600" />
                        </div>
                        <table className="w-full text-xs">
                            <thead className="bg-cyan-50 text-slate-600">
                                <tr>
                                    <th className="px-3 py-2 text-left font-medium">项目名称</th>
                                    <th className="px-3 py-2 text-left font-medium">服务客户</th>
                                    <th className="px-3 py-2 text-left font-medium">项目进度</th>
                                    <th className="px-3 py-2 text-left font-medium">项目负责人</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {recentProjects.map((row) => (
                                    <tr key={row.name} className="hover:bg-slate-50">
                                        <td className="px-3 py-3 text-cyan-700 font-medium">{row.name}</td>
                                        <td className="px-3 py-3 text-slate-700">{row.customer}</td>
                                        <td className="px-3 py-3"><ProgressBar value={row.progress} /></td>
                                        <td className="px-3 py-3 text-slate-700">{row.owner}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    <section className="rounded-md border border-slate-200 bg-white overflow-hidden">
                        <div className="h-10 px-4 border-b border-slate-200 flex items-center justify-between">
                            <span className="text-sm text-slate-700 font-medium">近期服务客户</span>
                            <IconChevronRight size={16} className="text-cyan-600" />
                        </div>
                        <table className="w-full text-xs">
                            <thead className="bg-cyan-50 text-slate-600">
                                <tr>
                                    <th className="px-3 py-2 text-left font-medium">名称</th>
                                    <th className="px-3 py-2 text-left font-medium">所属行业</th>
                                    <th className="px-3 py-2 text-left font-medium">所在地</th>
                                    <th className="px-3 py-2 text-left font-medium">创建人</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {recentClients.map((row) => (
                                    <tr key={row.name} className="hover:bg-slate-50">
                                        <td className="px-3 py-3 text-cyan-700 font-medium">{row.name}</td>
                                        <td className="px-3 py-3 text-slate-700">{row.industry}</td>
                                        <td className="px-3 py-3 text-slate-700">{row.location}</td>
                                        <td className="px-3 py-3 text-slate-700">{row.creator}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 pb-2">
                    <section className="rounded-md border border-slate-200 bg-white overflow-hidden">
                        <div className="h-10 px-4 border-b border-slate-200 flex items-center justify-between">
                            <span className="text-sm text-slate-700 font-medium">行业资讯</span>
                            <IconChevronRight size={16} className="text-cyan-600" />
                        </div>
                        <div className="px-4 py-3 space-y-3">
                            {newsItems.map((item, idx) => (
                                <div key={item.title} className="flex items-start gap-3">
                                    {idx < 3 ? (
                                        <span className="w-5 h-5 rounded bg-cyan-100 text-cyan-700 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                                            {idx + 1}
                                        </span>
                                    ) : (
                                        <span className="w-5 h-5 rounded border border-slate-300 text-slate-400 text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                            文
                                        </span>
                                    )}
                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-800 leading-5">{item.title}</p>
                                        <p className="text-xs text-slate-500 leading-5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-md border border-slate-200 bg-white overflow-hidden">
                        <div className="h-10 px-4 border-b border-slate-200 flex items-center justify-between">
                            <span className="text-sm text-slate-700 font-medium">帮助中心</span>
                            <IconChevronRight size={16} className="text-cyan-600" />
                        </div>
                        <div className="px-4 py-3 space-y-3">
                            {helpItems.map((item) => (
                                <div key={item} className="flex items-center gap-3 text-sm text-slate-700">
                                    <span className="w-4 h-4 rounded-[3px] border border-slate-300 bg-white shrink-0" />
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
