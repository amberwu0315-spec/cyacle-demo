/**
 * NavigationPage - L2 导航页 (Project Dashboard)
 * 
 * 🏢 角色：项目的“驾驶舱”
 * 📝 职责：
 * 1. 展示项目核心信息概览。
 * 2. 提供核算任务的进度追踪。
 * 3. 显示操作日志。
 */
import React, { useEffect, useState } from 'react';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import StatusChip from '../../common/StatusChip';
import {
    IconChartPie,
    IconListCheck,
    IconInfoCircle,
    IconHistory,
    IconArrowRight,
    IconLoader2
} from '@tabler/icons-react';

// Mock Data for Demo
const MOCK_PROJECT = {
    name: '演示门窗有限公司-产品碳足迹认证',
    id: 'PRJ-20260211-001',
    manager: 'Sarah Chen',
    deadline: '2026-03-15',
    status: '进行中',
    progress: 65,
    description: '针对2025年度生产的铝合金门窗产品进行全生命周期碳足迹核算，旨在满足欧盟出口合规要求。'
};

const MOCK_ACCOUNTS = [
    { id: 1, name: '主产品生产阶段核算', status: '进行中', progress: 80, owner: 'Mike' },
    { id: 2, name: '上游原材料运输核算', status: '已完成', progress: 100, owner: 'Sarah' },
    { id: 3, name: '废弃处置阶段模拟', status: '待开始', progress: 0, owner: 'Pending' },
];

const MOCK_LOGS = [
    { id: 1, user: 'Mike', action: '更新了模型参数', time: '10分钟前', type: 'update' },
    { id: 2, user: 'Sarah', action: '完成了运输核算', time: '2小时前', type: 'complete' },
    { id: 3, user: 'System', action: '自动备份数据', time: 'Yesterday', type: 'system' },
    { id: 4, user: 'Mike', action: '创建了新项目', time: '2天前', type: 'create' },
];

const NavigationPage = () => {
    const { setActions, setLayoutConfig } = usePagePresentation();

    // 模拟加载效果
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // 头部配置
    useEffect(() => {
        setActions(null);
    }, [setActions]);

    // 组件：进度条
    const ProgressBar = ({ value, color = 'bg-[#087F9C]' }) => (
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
                className={`h-full ${color} transition-all duration-500`}
                style={{ width: `${value}%` }}
            />
        </div>
    );

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-[#F5F6F8]">
                <div className="flex flex-col items-center gap-2 text-gray-400">
                    <IconLoader2 className="animate-spin" size={24} />
                    <span className="text-sm">加载项目数据...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-3 bg-[#F5F6F8] overflow-y-auto">
            <div className="max-w-7xl mx-auto h-full grid grid-cols-12 gap-3">

                {/* Left Column: Main Business (8 cols) */}
                <div className="col-span-8 flex flex-col gap-3">

                    {/* 1. Project Progress Card */}
                    <div className="bg-white rounded-md border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <IconChartPie size={20} className="text-[#087F9C]" />
                                项目总进度
                            </h3>
                            <span className="text-2xl font-bold text-[#087F9C]">{MOCK_PROJECT.progress}%</span>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">整体完成度</span>
                                    <span className="text-gray-900 font-medium">65/100</span>
                                </div>
                                <ProgressBar value={65} />
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                                <div className="text-center">
                                    <div className="text-xs text-gray-500 mb-1">数据收集</div>
                                    <div className="text-sm font-medium text-green-600">90%</div>
                                </div>
                                <div className="text-center border-l border-gray-100">
                                    <div className="text-xs text-gray-500 mb-1">模型构建</div>
                                    <div className="text-sm font-medium text-blue-600">60%</div>
                                </div>
                                <div className="text-center border-l border-gray-100">
                                    <div className="text-xs text-gray-500 mb-1">报告编制</div>
                                    <div className="text-sm font-medium text-gray-400">0%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Accounting List Card */}
                    <div className="bg-white rounded-md border border-gray-200 flex-1 shadow-sm flex flex-col">
                        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center h-14 shrink-0">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <IconListCheck size={20} className="text-[#087F9C]" />
                                核算任务列表
                            </h3>
                            <button className="text-xs text-[#087F9C] hover:underline flex items-center gap-1">
                                查看全部 <IconArrowRight size={12} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3">任务名称</th>
                                        <th className="px-4 py-3">负责人</th>
                                        <th className="px-4 py-3">进度</th>
                                        <th className="px-4 py-3 w-28">状态</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {MOCK_ACCOUNTS.map(task => (
                                        <tr key={task.id} className="hover:bg-gray-50 transition-colors hidden-action-row">
                                            <td className="px-4 py-3 font-medium text-gray-700">{task.name}</td>
                                            <td className="px-4 py-3 text-gray-500">{task.owner}</td>
                                            <td className="px-4 py-3 w-1/3">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 rounded-full"
                                                            style={{ width: `${task.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-gray-400 w-8">{task.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <StatusChip status={task.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Info & Logs (4 cols) */}
                <div className="col-span-4 flex flex-col gap-3">

                    {/* 1. Project Info Card */}
                    <div className="bg-white rounded-md border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <IconInfoCircle size={20} className="text-gray-600" />
                                项目信息
                            </h3>
                            <button className="text-xs text-gray-400 hover:text-gray-600">编辑</button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">项目名称</label>
                                <div className="text-sm font-medium text-gray-800">{MOCK_PROJECT.name}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">负责人</label>
                                    <div className="text-sm text-gray-800">{MOCK_PROJECT.manager}</div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">截止日期</label>
                                    <div className="text-sm text-gray-800">{MOCK_PROJECT.deadline}</div>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">描述</label>
                                <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-2 rounded">
                                    {MOCK_PROJECT.description}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Logs Card */}
                    <div className="bg-white rounded-md border border-gray-200 flex-1 shadow-sm flex flex-col">
                        <div className="px-4 py-3 border-b border-gray-100 h-14 flex items-center shrink-0">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <IconHistory size={20} className="text-gray-600" />
                                相关日志
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            <div className="relative pl-4 space-y-6">
                                {/* Timeline Line */}
                                <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                                {MOCK_LOGS.map(log => (
                                    <div key={log.id} className="relative pl-4">
                                        {/* Dot */}
                                        <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-white border-2 border-blue-400 z-10"></div>

                                        <div className="text-sm text-gray-800">
                                            <span className="font-medium text-blue-600">{log.user}</span> {log.action}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-0.5">{log.time}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NavigationPage;
