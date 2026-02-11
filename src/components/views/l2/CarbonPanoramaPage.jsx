import React from 'react';
import { CanvasPage } from '../../layout/PageLayouts';
import { IconMap, IconChartPie, IconFilter } from '@tabler/icons-react';

const CarbonPanoramaPage = () => {
    return (
        <CanvasPage className="flex flex-col h-full bg-[#F5F6F8]">
            {/* Toolbar */}
            <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-700 flex items-center gap-2">
                        <IconMap size={20} className="text-[#087F9C]" />
                        区域排放分布
                    </span>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-100">
                        <span>2024年度</span>
                        <IconFilter size={14} />
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-[#087F9C] text-white text-sm font-medium rounded hover:bg-[#076A82] transition-colors shadow-sm">
                        导出报告
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 flex gap-4 overflow-hidden">
                {/* Visual Map Area */}
                <div className="flex-[2] bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Emissions</div>
                        <div className="text-xl font-bold text-[#087F9C]">842,931 <span className="text-sm font-normal text-gray-500">tCO2e</span></div>
                    </div>

                    {/* Placeholder for Map */}
                    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center bg-contain opacity-10 grayscale"></div>
                        <div className="text-center z-10">
                            <IconMap size={64} className="text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">Interactive Map Visualization</p>
                            <p className="text-gray-400 text-sm mt-1">Rendering WebGL Context...</p>
                        </div>

                        {/* Simulation Dots */}
                        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full"></div>

                        <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-orange-500 rounded-full animate-ping animation-delay-1000"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-orange-500 rounded-full"></div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                    {/* Sector Breakdown */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 shrink-0">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <IconChartPie size={18} className="text-[#087F9C]" />
                            行业排放占比
                        </h3>
                        <div className="space-y-3">
                            {[
                                { label: '能源消耗', pct: 45, color: 'bg-blue-500' },
                                { label: '工业生产', pct: 30, color: 'bg-cyan-500' },
                                { label: '运输物流', pct: 15, color: 'bg-teal-500' },
                                { label: '其他', pct: 10, color: 'bg-gray-300' },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">{item.label}</span>
                                        <span className="font-medium">{item.pct}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Emitters */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex-1">
                        <h3 className="font-bold text-gray-800 mb-4">重点排放源 Top 5</h3>
                        <div className="space-y-0 divide-y divide-gray-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="py-3 flex items-center justify-between group cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${i <= 3 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                                            {i}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900 group-hover:text-[#087F9C]">生产线 #{100 + i}</span>
                                            <span className="text-xs text-gray-400">华东厂区 - 车间A</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-gray-700">{800 - i * 50}</div>
                                        <div className="text-[10px] text-gray-400">tCO2e</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </CanvasPage>
    );
};

export default CarbonPanoramaPage;
