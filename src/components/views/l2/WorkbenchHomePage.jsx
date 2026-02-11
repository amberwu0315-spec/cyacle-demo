import React from 'react';
import { CanvasPage } from '../../layout/PageLayouts';
import { IconLayoutDashboard, IconClock, IconListCheck, IconChartBar } from '@tabler/icons-react';

import { projectData } from '../../../data/mockData';

const WorkbenchHomePage = () => {
    // Quick Stats Mock Data
    const stats = [
        { label: '进行中的项目', value: '12', icon: IconListCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: '本月碳排放总量 (tCO2e)', value: '1,245.8', icon: IconChartBar, color: 'text-green-600', bg: 'bg-green-50' },
        { label: '待处理任务', value: '5', icon: IconClock, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <CanvasPage className="p-6 bg-[#F5F6F8]">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-[#087F9C] to-[#0D9488] rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">欢迎回来，管理员</h1>
                            <p className="text-blue-50 opacity-90">今天是 2024年10月24日，星期四。您有 5 个待处理事项。</p>
                        </div>
                        <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                            <IconLayoutDashboard size={32} stroke={1.5} />
                        </div>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-default">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} stroke={1.5} />
                            </div>
                            <div>
                                <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                                <div className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Projects Placeholder */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[300px]">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <IconListCheck size={20} className="text-gray-400" />
                        最近访问的项目
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projectData.slice(0, 6).map((item) => (
                            <div key={item.id} className="p-4 border border-gray-100 rounded-lg hover:border-[#087F9C] hover:bg-blue-50/30 transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">{item.type}</div>
                                    <span className="text-gray-400 text-xs">{item.updateTime}</span>
                                </div>
                                <h3 className="font-medium text-gray-900 mb-1 group-hover:text-[#087F9C] truncate" title={item.name}>{item.name}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CanvasPage>
    );
};

export default WorkbenchHomePage;
