import React from 'react';
import { CanvasPage } from '../../layout/PageLayouts';
import DataGrid from '../../common/DataGrid';
import StatusChip from '../../common/StatusChip';
import {
    ChevronRight,
    Database,
    FileText,
    Scale,
    Layers,
    ArrowUpRight
} from 'lucide-react';

const yearlyBars = [
    { year: '2020', quota: 45000, actual: 43000 },
    { year: '2021', quota: 46000, actual: 45500 },
    { year: '2022', quota: 48000, actual: 46000 },
    { year: '2023', quota: 49000, actual: 44500 },
    { year: '2024', quota: 50000, actual: 42000 }
];

const assetStructure = [
    { name: 'CEA 配额', value: 7500, color: '#1DA1F2' },
    { name: 'CCER (风电)', value: 3000, color: '#13B886' },
    { name: 'CCER (光伏)', value: 1500, color: '#F59F00' },
    { name: 'CCER (林业)', value: 500, color: '#8B5CF6' }
];

const assetRecords = [
    { id: 'TX001', date: '2024-12-15', type: 'CCER买入', amount: '2,000', price: '¥58.50', total: '¥117,000', status: '已完成' },
    { id: 'TX002', date: '2024-11-20', type: '配额卖出', amount: '1,500', price: '¥82.00', total: '¥123,000', status: '已完成' },
    { id: 'TX003', date: '2024-10-05', type: 'CCER置换', amount: '500', price: '-', total: '-', status: '审核中' },
    { id: 'TX004', date: '2024-06-30', type: '年度履约清缴', amount: '44,200', price: '-', total: '-', status: '已完成' }
];

const typeBadgeStyle = {
    CCER买入: 'qy-type-chip qy-type-chip--buy',
    配额卖出: 'qy-type-chip qy-type-chip--sell',
    CCER置换: 'qy-type-chip qy-type-chip--convert',
    年度履约清缴: 'qy-type-chip qy-type-chip--compliance'
};

const assetRecordColumns = [
    { title: '交易单号', key: 'id', width: 120, sortable: true, filterable: true, groupable: false },
    { title: '变动日期', key: 'date', width: 140, sortable: true, filterable: true, groupable: true, dataType: 'date' },
    {
        title: '交易类型',
        key: 'type',
        width: 150,
        sortable: true,
        filterable: true,
        groupable: true,
        render: (value) => (
            <span className={typeBadgeStyle[value] || 'qy-type-chip qy-type-chip--default'}>
                {value}
            </span>
        )
    },
    { title: '数量 (tCO₂e)', key: 'amount', width: 130, sortable: true, filterable: true, groupable: false, align: 'right' },
    { title: '单价 (RMB)', key: 'price', width: 130, sortable: true, filterable: true, groupable: false, align: 'right' },
    { title: '总额 (RMB)', key: 'total', width: 130, sortable: true, filterable: true, groupable: false, align: 'right' },
    {
        title: '状态',
        key: 'status',
        width: 120,
        sortable: true,
        filterable: true,
        groupable: true,
        render: (value) => (
            <StatusChip status={value} />
        )
    }
];

const CarbonAssetMgmtPage = () => {
    const maxBar = 60000;
    const totalAssets = assetStructure.reduce((sum, item) => sum + item.value, 0);
    const donutGradient = `conic-gradient(
        ${assetStructure[0].color} 0 ${(assetStructure[0].value / totalAssets) * 360}deg,
        ${assetStructure[1].color} ${(assetStructure[0].value / totalAssets) * 360}deg ${((assetStructure[0].value + assetStructure[1].value) / totalAssets) * 360}deg,
        ${assetStructure[2].color} ${((assetStructure[0].value + assetStructure[1].value) / totalAssets) * 360}deg ${((assetStructure[0].value + assetStructure[1].value + assetStructure[2].value) / totalAssets) * 360}deg,
        ${assetStructure[3].color} ${((assetStructure[0].value + assetStructure[1].value + assetStructure[2].value) / totalAssets) * 360}deg 360deg
    )`;

    return (
        <CanvasPage className="bg-[var(--qy-bg-canvas)] p-3">
            <div className="h-full flex flex-col gap-3 overflow-y-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                            <Layers size={22} className="text-cyan-700" />
                            碳资产管理
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">动态管理配额、CCER及碳资产账户，支持履约评估与资产运营决策</p>
                    </div>
                    <button className="h-9 px-4 rounded-md border border-slate-200 bg-white text-sm text-slate-700 font-medium shadow-sm hover:bg-slate-50">
                        资产交易
                    </button>
                </div>

                <div className="text-base font-semibold text-slate-800 flex items-center gap-1.5">
                    <FileText size={16} className="text-slate-400" />
                    企业碳账本
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
                    <div className="qy-kpi-card">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="qy-subtle-label">年度履约配额总量</p>
                                <p className="qy-value-main mt-1">
                                    50,000
                                    <span className="qy-value-unit">tCO₂e</span>
                                </p>
                            </div>
                            <Scale size={24} className="text-slate-300" />
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">已核查排放量</span>
                                <span className="text-slate-700 font-medium">42,500</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-200 overflow-hidden mt-2">
                                <div className="h-full rounded-full bg-cyan-600" style={{ width: '85%' }} />
                            </div>
                        </div>
                    </div>

                    <div className="qy-kpi-card">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="qy-subtle-label">配额盈缺估算</p>
                                <p className="text-2xl font-semibold text-emerald-600 mt-0.5">
                                    +7,500
                                    <span className="qy-value-unit">tCO₂e</span>
                                </p>
                            </div>
                            <ArrowUpRight size={24} className="text-emerald-300" />
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs">
                            <span className="h-6 px-2 rounded bg-emerald-50 text-emerald-600 inline-flex items-center font-medium">↗ 资产盈余</span>
                            <span className="text-slate-400">基于当前核查数据</span>
                        </div>
                    </div>

                    <div className="qy-kpi-card">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="qy-subtle-label">CCER 持仓量</p>
                                <p className="qy-value-main mt-1">
                                    5,000
                                    <span className="qy-value-unit">tCO₂e</span>
                                </p>
                            </div>
                            <Database size={24} className="text-amber-300" />
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <p className="text-slate-400 text-xs">风电项目</p>
                                <p className="text-slate-700 font-medium">3,000</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs">光伏项目</p>
                                <p className="text-slate-700 font-medium">1,500</p>
                            </div>
                        </div>
                    </div>

                    <div className="qy-kpi-card qy-kpi-card--dark p-4 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #3e6a9c 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                        <div className="relative z-10">
                            <p className="text-slate-300 text-xs">碳资产预估总值</p>
                            <p className="text-2xl font-semibold text-white mt-0.5">
                                ¥125.00
                                <span className="text-xs font-normal text-slate-300 ml-1">万元</span>
                            </p>
                            <div className="mt-6 pt-3 border-t border-slate-700 text-xs flex items-center justify-between text-slate-300">
                                <span>参考最新碳交所收盘价</span>
                                <span className="text-emerald-300 font-medium">CEA: ¥82.5</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                    <section className="xl:col-span-2 qy-card p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-slate-800">历年履约及排放趋势</h3>
                            <div className="text-xs text-slate-600 flex items-center gap-3">
                                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-600" />配额总量</span>
                                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-800" />实际排放</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            {[60000, 45000, 30000, 15000, 0].map((tick) => (
                                <div key={tick} className="h-12 border-t border-dashed border-slate-200 relative">
                                    <span className="absolute left-0 -top-2 text-xs text-slate-400">{tick}</span>
                                </div>
                            ))}
                            <div className="mt-[-240px] h-[240px] flex items-end justify-around px-12">
                                {yearlyBars.map((item) => (
                                    <div key={item.year} className="w-20 flex items-end gap-1 justify-center">
                                        <div className="w-5 rounded-t bg-cyan-600" style={{ height: `${(item.quota / maxBar) * 210}px` }} />
                                        <div className="w-5 rounded-t bg-slate-800" style={{ height: `${(item.actual / maxBar) * 210}px` }} />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2 flex justify-around text-sm text-slate-500 px-10">
                                {yearlyBars.map((item) => (
                                    <span key={item.year}>{item.year}</span>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="qy-card p-4">
                        <h3 className="text-base font-semibold text-slate-800">资产持有结构</h3>
                        <div className="mt-3 flex justify-center">
                            <div className="w-40 h-40 rounded-full relative" style={{ background: donutGradient }}>
                                <div className="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center">
                                    <span className="text-2xl font-semibold text-slate-900">1.25</span>
                                    <span className="text-xs text-slate-500">万吨总量</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            {assetStructure.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-sm">
                                    <span className="inline-flex items-center gap-2 text-slate-700">
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                        {item.name}
                                    </span>
                                    <span className="text-slate-700 font-medium">{item.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <section className="qy-card overflow-hidden pb-1">
                    <div className="qy-panel-header">
                        <h3 className="qy-section-title">资产变动记录</h3>
                        <button className="text-sm text-cyan-700 font-medium inline-flex items-center gap-1">
                            查看全部交易 <ChevronRight size={14} />
                        </button>
                    </div>
                    <DataGrid
                        title="资产变动记录"
                        columns={assetRecordColumns}
                        rows={assetRecords}
                        rowKey="id"
                        storageKey="workspace:asset-records"
                        className="border-0 rounded-none"
                        showToolbar={false}
                        showFooter={false}
                        rowSelection={{ enabled: true, mode: 'checkbox', multiple: true }}
                    />
                </section>
            </div>
        </CanvasPage>
    );
};

export default CarbonAssetMgmtPage;
