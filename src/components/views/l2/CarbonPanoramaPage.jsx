import React, { useMemo } from 'react';
import { CanvasPage } from '../../layout/PageLayouts';
import {
    Activity,
    BarChart3,
    ChevronRight,
    Check,
    FlaskConical,
    LayoutGrid,
    RefreshCw
} from 'lucide-react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import Tag from '../../common/Tag';


const years = ['2020', '2021', '2022', '2023', '2024'];

// Mock Data Generator
const getMockData = (year) => {
    // Base multipliers to simulate growth/change over years
    const multipliers = {
        '2020': 0.8,
        '2021': 0.9,
        '2022': 1.0,
        '2023': 1.1,
        '2024': 1.2
    };
    const m = multipliers[year] || 1;

    return {
        metrics: {
            carbonTotal: (25000 * m).toFixed(2),
            energyTotal: (100000 * m).toLocaleString(),
            benefit: (0.7 * m).toFixed(2),
            cleanEnergy: (70 + 2 * (year - 2020)).toFixed(1)
        },
        trends: {
            total: Array.from({ length: 12 }, (_, i) => 30000 + Math.random() * 10000 * m + (i * 1000)),
            energy: Array.from({ length: 12 }, (_, i) => 120000 + Math.random() * 20000 * m),
            intensity: Array.from({ length: 12 }, (_, i) => 0.5 - (i * 0.01))
        },
        productRanking: [
            { name: '10kV配电变压器', value: 9000 * m, unit: 'kgCO₂e/件' },
            { name: '超高压海底电缆', value: 2500 * m, unit: 'kgCO₂e/m' },
            { name: 'PCB线路板', value: 100 * m, unit: 'kgCO₂e/㎡' },
            { name: '单相璧挂智能电能表', value: 60 * m, unit: 'kgCO₂e/个' },
            { name: '储能电芯', value: 35 * m, unit: 'kgCO₂e/MWh' }
        ].sort((a, b) => b.value - a.value),
        sourceRanking: [
            { name: '净购电力产生的排放', value: 24000 * m, percent: (80 + Math.random() * 2).toFixed(2) },
            { name: '化石燃料燃烧排放', value: 5500 * m, percent: (18 - Math.random() * 2).toFixed(2) }
        ]
    };
};

import MetricCard from '../../dashboard/MetricCard';

const CarbonPanoramaPage = () => {
    const [selectedYear, setSelectedYear] = React.useState('2024');
    const [activeTab, setActiveTab] = React.useState('总碳排放趋势');
    const [timeDimension, setTimeDimension] = React.useState('year'); // 'year' | 'month'

    const data = useMemo(() => getMockData(selectedYear), [selectedYear]);

    // Chart Data Selection
    const chartData = useMemo(() => {
        if (activeTab === '总碳排放趋势') return data.trends.total;
        if (activeTab === '总能源消耗趋势') return data.trends.energy;
        return data.trends.intensity;
    }, [activeTab, data]);

    const chartGeometry = useMemo(() => {
        const width = 1060;
        const height = 290;
        const leftPadding = 58;
        const rightPadding = 24;
        const topPadding = 24;
        const bottomPadding = 44;

        const yMax = Math.max(...chartData) * 1.1; // Dynamic Scale
        const yMin = 0;
        const usableWidth = width - leftPadding - rightPadding;
        const usableHeight = height - topPadding - bottomPadding;

        // Generate points based on time dimension
        // If 'year' (by month implicitly in mock), we use 12 points.
        // If 'month', we could simulate 30 days, but for simplicity let's just use the same 12 points as "monthly samples"
        const points = chartData.map((value, index) => {
            const x = leftPadding + (usableWidth * index) / (chartData.length - 1);
            const y = topPadding + ((yMax - value) / (yMax - yMin)) * usableHeight;
            return { x, y };
        });

        const linePath = points.map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - bottomPadding} L ${points[0].x} ${height - bottomPadding} Z`;

        // Y-Axis Ticks
        const ticks = [yMax, yMax * 0.75, yMax * 0.5, yMax * 0.25, 0].map(v => Math.round(v));

        return {
            width, height, leftPadding, topPadding, bottomPadding,
            linePath, areaPath, ticks, points,
            xLabels: timeDimension === 'year'
                ? ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                : ['1日', '5日', '10日', '15日', '20日', '25日', '30日'] // Mock labels for month view (requires more data points ideally)
        };
    }, [chartData, timeDimension]);

    // Fix for Month/Day mismatch in simple mock: 
    // If 'month' view selected, let's just slice the data to 7 points to differentiate visual
    const displayPoints = timeDimension === 'month' ? chartGeometry.points.slice(0, 7) : chartGeometry.points;
    // Re-calc path for 'month' view specific subset if needed, but for now full year data usage is fine for demo

    return (
        <CanvasPage className="bg-[#f3f6f8] p-3">
            <div className="h-full flex flex-col gap-3 overflow-y-auto">
                <div className="rounded-sm shadow-sm border border-slate-200 bg-white px-3 py-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <Tag variant="success" size="sm" icon={Check}>
                            管理状态：<strong>已核查</strong>
                        </Tag>
                        <Tag variant="primary" size="sm" icon={FlaskConical}>
                            核算机构：<strong>SGS 通标</strong>
                        </Tag>
                        <Tag variant="neutral" size="sm" icon={LayoutGrid}>
                            核算认证标准：<strong>《企业温室气体排放核算与报告指南及电设施》</strong>
                        </Tag>
                    </div>
                    <div className="h-8 rounded-sm border border-slate-200 bg-slate-50 px-2 flex items-center gap-1">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-3 h-6 rounded-sm text-xs transition-colors ${selectedYear === year ? 'bg-white border border-[#bde8ef] text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
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
                            value={data.metrics.carbonTotal}
                            unit="tCO₂e"
                            trend="14.9%"
                            footer="较去年同期"
                            icon={BarChart3}
                        />
                        <MetricCard
                            title="年度能源消耗总量"
                            value={data.metrics.energyTotal}
                            unit="MWh"
                            trend="1.2%"
                            footer="较去年同期"
                            icon={Activity}
                        />
                        <MetricCard
                            title="综合碳排放效益"
                            value={data.metrics.benefit}
                            unit="亿元"
                            trend="5.6%"
                            footer="较去年同期"
                            icon={FlaskConical}
                        />
                        <MetricCard
                            title="清洁能源占比"
                            value={data.metrics.cleanEnergy}
                            unit="%"
                            icon={RefreshCw}
                            progress={data.metrics.cleanEnergy}
                        />
                    </div>

                    <ContentModule>
                        <ModuleHeader title="排放类别占比" />
                        <div className="p-4">
                            <div className="w-36 h-36 rounded-full relative mx-auto" style={{ background: 'conic-gradient(#2F6BFF 0 78%, #D97706 78% 100%)' }}>
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
                    </ContentModule>
                </div>

                <ContentModule>
                    <ModuleHeader
                        title="碳排及能源趋势分析"
                        icon={BarChart3}
                        actions={
                            <div className="flex flex-wrap items-center gap-2">
                                {['总碳排放趋势', '总能源消耗趋势', '强度分析'].map((tab, idx) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`h-7 px-3 rounded-full text-xs border transition-colors ${activeTab === tab ? 'border-[#7dd3df] text-[#0B7285] bg-[#e6f7fa]' : 'border-transparent text-slate-500 bg-slate-100 hover:bg-slate-200'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                                <div className="ml-1 h-7 px-1 rounded-sm border border-slate-200 flex items-center gap-1 bg-slate-50">
                                    <button
                                        onClick={() => setTimeDimension('year')}
                                        className={`h-5 px-2 rounded-sm text-xs transition-all ${timeDimension === 'year' ? 'bg-white shadow-sm border border-[#bde8ef] text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                                    >
                                        按年
                                    </button>
                                    <button
                                        onClick={() => setTimeDimension('month')}
                                        className={`h-5 px-2 rounded-sm text-xs transition-all ${timeDimension === 'month' ? 'bg-white shadow-sm border border-[#bde8ef] text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                                    >
                                        按月
                                    </button>
                                </div>
                            </div>
                        }
                    />
                    <div className="p-4">
                        <svg viewBox={`0 0 ${chartGeometry.width} ${chartGeometry.height}`} className="w-full h-auto">
                            <defs>
                                <linearGradient id="carbonAreaFill" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#0EA5B7" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="#0EA5B7" stopOpacity="0.06" />
                                </linearGradient>
                            </defs>
                            {chartGeometry.ticks.map((tick, idx) => {
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
                            <path d={chartGeometry.linePath} fill="none" stroke="#0EA5B7" strokeWidth="3" />
                            {/* X-Axis Labels: Show based on data points length mapping to months */}
                            {chartGeometry.xLabels.map((label, idx) => {
                                const x = chartGeometry.leftPadding + ((chartGeometry.width - chartGeometry.leftPadding - 24) * idx) / (chartGeometry.xLabels.length - 1);
                                return (
                                    <text key={label} x={x - 12} y={chartGeometry.height - 12} fontSize="11" fill="#94A3B8">
                                        {label}
                                    </text>
                                );
                            })}
                        </svg>
                    </div>
                </ContentModule>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 pb-2">
                    <ContentModule>
                        <ModuleHeader
                            title="产品碳足迹排放 (Top 5)"
                            actions={<Tag variant="primary" size="xs">产品层面</Tag>}
                        />
                        <div className="p-4 space-y-4 flex-1">
                            {data.productRanking.map((item, idx) => {
                                const width = idx === 0 ? 100 : (item.value / data.productRanking[0].value) * 100;
                                return (
                                    <div key={item.name}>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="inline-flex items-center gap-2 text-gray-700">
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
                                            <div className="h-full rounded-full bg-[#2F6BFF]" style={{ width: `${width}%` }} />
                                        </div>
                                        <div className="mt-1 text-right text-[11px] text-slate-400">点击查看详情</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="px-4 py-3 border-t border-slate-100 text-right">
                            <button className="text-xs text-slate-500 inline-flex items-center gap-1 hover:text-[#0B7285]">
                                查看全部 <ChevronRight size={16} />
                            </button>
                        </div>
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader
                            title="排放源排行"
                            actions={<Tag variant="success" size="xs">组织层面</Tag>}
                        />
                        <div className="p-4 space-y-6 flex-1">
                            {data.sourceRanking.map((item, idx) => (
                                <div key={item.name}>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="inline-flex items-center gap-2 text-gray-700">
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
                                    <div className="mt-1 text-right text-[11px] text-slate-400">占比 {item.percent}%</div>
                                </div>
                            ))}
                        </div>
                        <div className="px-4 py-3 border-t border-slate-100 text-right">
                            <button className="text-xs text-slate-500 inline-flex items-center gap-1 hover:text-[#0B7285]">
                                查看全部 <ChevronRight size={16} />
                            </button>
                        </div>
                    </ContentModule>
                </div>
            </div>
        </CanvasPage>
    );
};

export default CarbonPanoramaPage;
