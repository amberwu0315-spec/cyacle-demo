import React from 'react';
import { CanvasPage } from '../../layout/PageLayouts';
import {
    IconChevronRight,
    IconDatabase,
    IconFileText,
    IconScale,
    IconStack2
} from '@tabler/icons-react';

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
    CCER买入: 'bg-emerald-50 text-emerald-600',
    配额卖出: 'bg-orange-50 text-orange-600',
    CCER置换: 'bg-slate-100 text-slate-600',
    年度履约清缴: 'bg-slate-100 text-slate-700'
};

const getStatusStyle = (status) => {
    if (status === '已完成') return 'text-emerald-600';
    return 'text-amber-600';
};

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
        <CanvasPage className="bg-[#F5F6F8] p-3">
            <div className="h-full flex flex-col gap-3 overflow-y-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-[40px] leading-9 font-semibold text-slate-900 flex items-center gap-2">
                            <IconStack2 size={26} className="text-cyan-600" />
                            碳资产管理
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">动态管理配额、CCER及碳资产账户，助力企业合规履约与资产增值</p>
                    </div>
                    <button className="h-9 px-4 rounded-md border border-slate-200 bg-white text-sm text-slate-700 font-medium">
                        资产交易
                    </button>
                </div>

                <div className="text-[40px] leading-8 font-semibold text-slate-800 flex items-center gap-1">
                    <IconFileText size={16} className="text-slate-500" />
                    企业碳账本
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
                    <div className="rounded-md border border-slate-200 bg-white p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-slate-600">年度履约配额总量</p>
                                <p className="text-[44px] leading-9 font-semibold text-slate-900 mt-1">
                                    50,000
                                    <span className="text-sm font-normal text-slate-500 ml-1">tCO₂e</span>
                                </p>
                            </div>
                            <IconScale size={24} className="text-slate-200" />
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">已核查排放量</span>
                                <span className="text-slate-700 font-medium">42,500</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-200 overflow-hidden mt-2">
                                <div className="h-full rounded-full bg-blue-500" style={{ width: '85%' }} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border border-slate-200 bg-white p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-slate-600">配额盈缺估算</p>
                                <p className="text-[44px] leading-9 font-semibold text-emerald-600 mt-1">
                                    +7,500
                                    <span className="text-sm font-normal text-slate-500 ml-1">tCO₂e</span>
                                </p>
                            </div>
                            <IconChevronRight size={24} className="text-emerald-100" />
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs">
                            <span className="h-6 px-2 rounded bg-emerald-50 text-emerald-600 inline-flex items-center font-medium">↗ 资产盈余</span>
                            <span className="text-slate-400">基于当前核查数据</span>
                        </div>
                    </div>

                    <div className="rounded-md border border-slate-200 bg-white p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-slate-600">CCER 持仓量</p>
                                <p className="text-[44px] leading-9 font-semibold text-slate-900 mt-1">
                                    5,000
                                    <span className="text-sm font-normal text-slate-500 ml-1">tCO₂e</span>
                                </p>
                            </div>
                            <IconDatabase size={24} className="text-orange-100" />
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

                    <div className="rounded-md border border-[#0B1938] bg-[#0F1D3A] p-4 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #2A4E86 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                        <div className="relative z-10">
                            <p className="text-slate-300 text-sm">碳资产预估总值</p>
                            <p className="text-[44px] leading-9 font-semibold text-white mt-1">
                                ¥125.00
                                <span className="text-sm font-normal text-slate-300 ml-1">万元</span>
                            </p>
                            <div className="mt-6 pt-3 border-t border-slate-700 text-xs flex items-center justify-between text-slate-300">
                                <span>参考最新碳交所收盘价</span>
                                <span className="text-emerald-300 font-medium">CEA: ¥82.5</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                    <section className="xl:col-span-2 rounded-md border border-slate-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[33px] leading-8 font-semibold text-slate-800">历年履约及排放趋势</h3>
                            <div className="text-xs text-slate-600 flex items-center gap-3">
                                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />配额总量</span>
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
                                        <div className="w-5 rounded-t bg-blue-500" style={{ height: `${(item.quota / maxBar) * 210}px` }} />
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

                    <section className="rounded-md border border-slate-200 bg-white p-4">
                        <h3 className="text-[33px] leading-8 font-semibold text-slate-800">资产持有结构</h3>
                        <div className="mt-3 flex justify-center">
                            <div className="w-40 h-40 rounded-full relative" style={{ background: donutGradient }}>
                                <div className="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center">
                                    <span className="text-3xl font-semibold text-slate-900">1.25</span>
                                    <span className="text-sm text-slate-500">万吨总量</span>
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

                <section className="rounded-md border border-slate-200 bg-white overflow-hidden pb-1">
                    <div className="h-11 px-4 border-b border-slate-200 flex items-center justify-between">
                        <h3 className="text-[33px] leading-8 font-semibold text-slate-800">资产变动记录</h3>
                        <button className="text-sm text-cyan-700 font-medium inline-flex items-center gap-1">
                            查看全部交易 <IconChevronRight size={14} />
                        </button>
                    </div>
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">交易单号</th>
                                <th className="px-4 py-3 text-left font-medium">变动日期</th>
                                <th className="px-4 py-3 text-left font-medium">交易类型</th>
                                <th className="px-4 py-3 text-left font-medium">数量 (tCO₂e)</th>
                                <th className="px-4 py-3 text-left font-medium">单价 (RMB)</th>
                                <th className="px-4 py-3 text-left font-medium">总额 (RMB)</th>
                                <th className="px-4 py-3 text-left font-medium">状态</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {assetRecords.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 text-slate-700">{row.id}</td>
                                    <td className="px-4 py-3 text-slate-700">{row.date}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeBadgeStyle[row.type]}`}>
                                            {row.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-700 font-medium">{row.amount}</td>
                                    <td className="px-4 py-3 text-slate-700">{row.price}</td>
                                    <td className="px-4 py-3 text-slate-700">{row.total}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center gap-1.5 ${getStatusStyle(row.status)}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${row.status === '已完成' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </CanvasPage>
    );
};

export default CarbonAssetMgmtPage;
