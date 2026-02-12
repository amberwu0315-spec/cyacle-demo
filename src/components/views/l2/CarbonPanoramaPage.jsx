import React, { useMemo } from 'react';
import { CanvasPage } from '../../layout/PageLayouts';
import {
    IconActivity,
    IconChartBar,
    IconChevronRight,
    IconCheck,
    IconFlask,
    IconLayoutGrid,
    IconRotate
} from '@tabler/icons-react';

const years = ['2020', '2021', '2022', '2023', '2024'];
const areaSeries = [50000, 41000, 39000, 36000, 30000];

const productRanking = [
    { name: '10kV配电变压器', value: 9075.12, unit: 'kgCO₂e/件' },
    { name: '超高压海底电缆', value: 2599.67, unit: 'kgCO₂e/m' },
    { name: 'PCB线路板', value: 109.26, unit: 'kgCO₂e/㎡' },
    { name: '单相璧挂智能电能表', value: 59.35, unit: 'kgCO₂e/个' },
    { name: '储能电芯', value: 36.01, unit: 'kgCO₂e/MWh' }
];

const sourceRanking = [
    { name: '净购电力产生的排放', value: 24321.82, percent: 81.35 },
    { name: '化石燃料燃烧排放', value: 5576.66, percent: 18.65 }
];

const MetricCard = ({ title, value, unit, trend, icon: Icon, footer, progress }) => {
    return (
        <div className="rounded-md border border-slate-200 bg-white p-4 min-h-[122px] flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="text-xs text-slate-500">{title}</p>
                    <p className="mt-1 text-[40px] leading-9 font-semibold text-slate-900">
                        {value}
                        <span className="ml-1 text-sm font-normal text-slate-500">{unit}</span>
                    </p>
                </div>
                <span className="w-8 h-8 rounded-md bg-slate-100 text-slate-500 flex items-center justify-center">
                    <Icon size={16} />
                </span>
            </div>
            {progress ? (
                <div className="mt-2">
                    <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full rounded-full bg-cyan-600" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            ) : (
                <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="text-emerald-600 font-medium">↘ {trend}</span>
                    <span className="text-slate-400">{footer}</span>
                </div>
            )}
        </div>
    );
};

const CarbonPanoramaPage = () => {
    const chartGeometry = useMemo(() => {
        const width = 1060;
        const height = 290;
        const leftPadding = 58;
        const rightPadding = 24;
        const topPadding = 24;
        const bottomPadding = 44;
        const yMax = 60000;
        const yMin = 0;
        const usableWidth = width - leftPadding - rightPadding;
        const usableHeight = height - topPadding - bottomPadding;

        const points = areaSeries.map((value, index) => {
            const x = leftPadding + (usableWidth * index) / (areaSeries.length - 1);
            const y = topPadding + ((yMax - value) / (yMax - yMin)) * usableHeight;
            return { x, y };
        });

        const linePath = points.map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - bottomPadding} L ${points[0].x} ${height - bottomPadding} Z`;

        return {
            width,
            height,
            leftPadding,
            topPadding,
            bottomPadding,
            linePath,
            areaPath
        };
    }, []);

    return (
        <CanvasPage className="bg-[#F5F6F8] p-3">
            <div className="h-full flex flex-col gap-3 overflow-y-auto">
                <div className="rounded-md border border-slate-200 bg-white px-3 py-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="h-8 px-3 rounded-md border border-slate-200 bg-slate-50 text-xs text-slate-700 flex items-center gap-1.5">
                            <IconCheck size={14} className="text-cyan-600" />
                            管理状态
                            <strong className="text-slate-900">已核查</strong>
                        </span>
                        <span className="h-8 px-3 rounded-md border border-slate-200 bg-slate-50 text-xs text-slate-700 flex items-center gap-1.5">
                            <IconFlask size={14} className="text-emerald-600" />
                            核算机构
                            <strong className="text-slate-900">SGS 通标</strong>
                        </span>
                        <span className="h-8 px-3 rounded-md border border-slate-200 bg-slate-50 text-xs text-slate-700 flex items-center gap-1.5">
                            <IconLayoutGrid size={14} className="text-sky-600" />
                            核算认证标准
                            <strong className="text-slate-900">《企业温室气体排放核算与报告指南及电设施》</strong>
                        </span>
                    </div>
                    <div className="h-8 rounded-md border border-slate-200 bg-slate-50 px-2 flex items-center gap-1">
                        {years.map((year) => (
                            <button
                                key={year}
                                className={`px-3 h-6 rounded text-xs ${year === '2024' ? 'bg-white border border-slate-200 text-slate-900' : 'text-slate-500'}`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                    <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <MetricCard
                            title="年度碳排放总量"
                            value="29,898.49"
                            unit="tCO₂e"
                            trend="14.9%"
                            footer="较去年同期"
                            icon={IconChartBar}
                        />
                        <MetricCard
                            title="年度能源消耗总量"
                            value="128,450"
                            unit="MWh"
                            trend="1.2%"
                            footer="较去年同期"
                            icon={IconActivity}
                        />
                        <MetricCard
                            title="综合碳排放效益"
                            value="0.85"
                            unit="亿元"
                            trend="5.6%"
                            footer="较去年同期"
                            icon={IconFlask}
                        />
                        <MetricCard
                            title="清洁能源占比"
                            value="81.3"
                            unit="%"
                            icon={IconRotate}
                            progress={81.3}
                        />
                    </div>

                    <section className="rounded-md border border-slate-200 bg-white p-4">
                        <h3 className="text-sm font-semibold text-slate-800">排放类别占比</h3>
                        <div className="mt-3 flex justify-center">
                            <div className="w-36 h-36 rounded-full relative" style={{ background: 'conic-gradient(#3B82F6 0 78%, #F97316 78% 100%)' }}>
                                <div className="absolute inset-4 rounded-full bg-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center gap-4 text-xs">
                            <span className="inline-flex items-center gap-1.5 text-blue-600">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                净购电力产生的排放
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-orange-500">
                                <span className="w-2 h-2 rounded-full bg-orange-500" />
                                化石燃料燃烧排放
                            </span>
                        </div>
                    </section>
                </div>

                <section className="rounded-md border border-slate-200 bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                                <IconChartBar size={14} className="text-slate-400" />
                                碳排及能源趋势分析
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">查看企业近期的排放与能耗动态变化</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {['总碳排放趋势', '总能源消耗趋势', '碳排放强度', '能源消耗强度', '碳排放密度', '能源消耗密度'].map((tab, idx) => (
                                <button
                                    key={tab}
                                    className={`h-7 px-3 rounded-full text-xs border ${idx === 0 ? 'border-emerald-400 text-emerald-600 bg-emerald-50' : 'border-transparent text-slate-500 bg-slate-100'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                            <div className="ml-1 h-7 px-1 rounded-md border border-slate-200 flex items-center gap-1">
                                <button className="h-5 px-2 rounded text-xs bg-slate-100 text-slate-700">按年</button>
                                <button className="h-5 px-2 rounded text-xs text-slate-500">按月</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <svg viewBox={`0 0 ${chartGeometry.width} ${chartGeometry.height}`} className="w-full h-[260px]">
                            <defs>
                                <linearGradient id="carbonAreaFill" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.06" />
                                </linearGradient>
                            </defs>
                            {[60000, 45000, 30000, 15000, 0].map((tick, idx) => {
                                const y = chartGeometry.topPadding + idx * ((chartGeometry.height - chartGeometry.topPadding - chartGeometry.bottomPadding) / 4);
                                return (
                                    <g key={tick}>
                                        <line
                                            x1={chartGeometry.leftPadding}
                                            x2={chartGeometry.width - 24}
                                            y1={y}
                                            y2={y}
                                            stroke="#DCE4EC"
                                            strokeDasharray="4 4"
                                        />
                                        <text x={12} y={y + 4} fontSize="11" fill="#94A3B8">{tick.toLocaleString()}</text>
                                    </g>
                                );
                            })}
                            <path d={chartGeometry.areaPath} fill="url(#carbonAreaFill)" />
                            <path d={chartGeometry.linePath} fill="none" stroke="#10B981" strokeWidth="3" />
                            {years.map((year, idx) => {
                                const x = chartGeometry.leftPadding + ((chartGeometry.width - chartGeometry.leftPadding - 24) * idx) / (years.length - 1);
                                return (
                                    <text key={year} x={x - 12} y={chartGeometry.height - 12} fontSize="11" fill="#94A3B8">
                                        {year}
                                    </text>
                                );
                            })}
                        </svg>
                    </div>
                </section>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 pb-2">
                    <section className="rounded-md border border-slate-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-800">产品碳足迹排行 (Top 5)</h3>
                            <span className="text-[11px] px-2 py-1 rounded bg-slate-100 text-slate-500">产品层面</span>
                        </div>
                        <div className="mt-2 space-y-4">
                            {productRanking.map((item, idx) => {
                                const width = idx === 0 ? 100 : (item.value / productRanking[0].value) * 100;
                                return (
                                    <div key={item.name}>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="inline-flex items-center gap-2 text-slate-700">
                                                <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 text-[10px] flex items-center justify-center font-semibold">
                                                    {idx + 1}
                                                </span>
                                                {item.name}
                                            </span>
                                            <span className="font-semibold text-slate-900">
                                                {item.value.toFixed(2)}
                                                <span className="ml-1 text-[11px] font-normal text-slate-500">{item.unit}</span>
                                            </span>
                                        </div>
                                        <div className="mt-2 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                            <div className="h-full rounded-full bg-blue-500" style={{ width: `${width}%` }} />
                                        </div>
                                        <div className="mt-1 text-right text-[11px] text-slate-400">Click for details</div>
                                    </div>
                                );
                            })}
                        </div>
                        <button className="mt-4 text-xs text-slate-500 inline-flex items-center gap-1 hover:text-cyan-700">
                            查看全部产品碳核算详情 <IconChevronRight size={12} />
                        </button>
                    </section>

                    <section className="rounded-md border border-slate-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-800">排放源排行</h3>
                            <span className="text-[11px] px-2 py-1 rounded bg-slate-100 text-slate-500">组织层面</span>
                        </div>
                        <div className="mt-3 space-y-6">
                            {sourceRanking.map((item, idx) => (
                                <div key={item.name}>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="inline-flex items-center gap-2 text-slate-700">
                                            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 text-[10px] flex items-center justify-center font-semibold">
                                                {idx + 1}
                                            </span>
                                            {item.name}
                                        </span>
                                        <span className="font-semibold text-slate-900">
                                            {item.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            <span className="ml-1 text-[11px] font-normal text-slate-500">tCO₂e</span>
                                        </span>
                                    </div>
                                    <div className="mt-2 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${item.percent}%` }} />
                                    </div>
                                    <div className="mt-1 text-right text-[11px] text-slate-400">{item.percent}% of total</div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-6 text-xs text-slate-500 inline-flex items-center gap-1 hover:text-cyan-700">
                            查看全部组织碳核算详情 <IconChevronRight size={12} />
                        </button>
                    </section>
                </div>
            </div>
        </CanvasPage>
    );
};

export default CarbonPanoramaPage;
