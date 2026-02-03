import React, { useEffect } from 'react';
import { IconFilter, IconSearch, IconPlus } from '@tabler/icons-react';
import { useHeaderContext } from '../../../context/HeaderContext';

const DatabaseManagementPage = () => {
    const { setActions } = useHeaderContext();

    // 设置Header的创建按钮
    useEffect(() => {
        setActions(
            <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white bg-[#087F9C] hover:bg-[#076A82] rounded transition-colors">
                <IconPlus size={16} />
                <span>创建</span>
            </button>
        );
        return () => setActions(null);
    }, [setActions]);

    return (
        <div className="h-full w-full flex flex-col p-3 bg-[#F5F6F8]">
            {/* 搜索栏 */}
            <div className="mb-3">
                <div className="relative max-w-md">
                    <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="搜索数据库..."
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded hover:border-[#087F9C] focus:outline-none focus:border-[#087F9C] transition-colors"
                    />
                </div>
            </div>

            {/* 筛选器 */}
            <div className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IconFilter size={14} />
                    <span className="text-xs font-medium">筛选：</span>
                </div>
                <select className="px-2 py-1 text-xs border border-gray-200 rounded hover:border-[#087F9C] focus:outline-none focus:border-[#087F9C] transition-colors">
                    <option value="all">全部来源</option>
                    <option value="standard">标准数据库</option>
                    <option value="custom">自定义数据库</option>
                </select>
                <select className="px-2 py-1 text-xs border border-gray-200 rounded hover:border-[#087F9C] focus:outline-none focus:border-[#087F9C] transition-colors">
                    <option value="all">全部状态</option>
                    <option value="active">启用中</option>
                    <option value="inactive">已停用</option>
                </select>
            </div>

            {/* 表格 */}
            <div className="bg-white rounded border border-gray-200 overflow-hidden flex-1 flex flex-col">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 font-medium text-xs">数据库名称</th>
                            <th className="px-4 py-3 font-medium text-xs">来源</th>
                            <th className="px-4 py-3 font-medium text-xs">版本</th>
                            <th className="px-4 py-3 font-medium text-xs">条目数</th>
                            <th className="px-4 py-3 font-medium text-xs text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">CL</div>
                                    <span className="text-sm">CLCD-China-2024</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                                <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs">标准</span>
                            </td>
                            <td className="px-4 py-3 text-gray-500 text-sm">v1.2.0</td>
                            <td className="px-4 py-3 text-gray-500 text-sm">4,231</td>
                            <td className="px-4 py-3 text-right text-[#087F9C] hover:underline cursor-pointer text-sm">管理</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">EI</div>
                                    <span className="text-sm">Ecoinvent v3.9</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                                <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs">标准</span>
                            </td>
                            <td className="px-4 py-3 text-gray-500 text-sm">v3.9.1</td>
                            <td className="px-4 py-3 text-gray-500 text-sm">18,500</td>
                            <td className="px-4 py-3 text-right text-[#087F9C] hover:underline cursor-pointer text-sm">管理</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">GD</div>
                                    <span className="text-sm">GaBi Database</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs">自定义</span>
                            </td>
                            <td className="px-4 py-3 text-gray-500 text-sm">v2024.1</td>
                            <td className="px-4 py-3 text-gray-500 text-sm">12,840</td>
                            <td className="px-4 py-3 text-right text-[#087F9C] hover:underline cursor-pointer text-sm">管理</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DatabaseManagementPage;
