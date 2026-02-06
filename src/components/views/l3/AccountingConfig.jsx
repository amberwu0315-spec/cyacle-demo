import { IconAdjustmentsHorizontal, IconChartBar } from '@tabler/icons-react';

export default function AccountingConfig() {
    return (
        <div className="w-full h-full p-3 overflow-y-auto">
            {/* Layout-A: 12-Column Grid */}
            <div className="grid grid-cols-12 gap-3 h-full">

                {/* Left Panel (4 cols) */}
                <div className="col-span-4 bg-white rounded-lg shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] flex flex-col h-full overflow-hidden">

                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {/* Mock Form Items */}
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500">计算模型</label>
                            <select className="w-full h-8 px-2 text-sm border border-gray-200 rounded-lg text-gray-600 focus:border-[#087F9C] focus:outline-none">
                                <option>IPCC 2006 标准版</option>
                                <option>ISO 14067</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500">地理边界</label>
                            <select className="w-full h-8 px-2 text-sm border border-gray-200 rounded-lg text-gray-600 focus:border-[#087F9C] focus:outline-none">
                                <option>中国区域电网</option>
                                <option>华东电网</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Right Panel (8 cols) */}
                <div className="col-span-8 bg-white rounded-lg shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] flex flex-col h-full overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-gray-700 flex items-center gap-2">
                            <IconChartBar className="w-4 h-4 text-[#087F9C]" /> 实时结果
                        </h3>
                    </div>
                    <div className="flex-1 p-6 flex items-center justify-center bg-gray-50/50">
                        <div className="text-center text-gray-400">
                            <IconChartBar className="w-12 h-12 mx-auto mb-2 opacity-30" />
                            <p>结果可视化区域</p>
                            <p className="text-xs mt-1">Layout-A: Left(4) + Right(8)</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
