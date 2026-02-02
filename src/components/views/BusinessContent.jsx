import { IconStack2 } from '@tabler/icons-react';

export default function BusinessContent({ activeL1, target }) {

    // Default Placeholder
    if (target !== 'database_mgmt') {
        return (
            <div className="h-full flex flex-col p-8">
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-8 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IconStack2 className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Content for {target}</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            此模块的功能正在开发中...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Database Mgmt Table
    return (
        <div className="h-full flex flex-col p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">数据库管理</h1>
                <div className="flex gap-2">
                    <input type="text" placeholder="搜索数据库..." className="px-4 py-2 border border-gray-200 rounded-md text-sm w-64 focus:outline-none focus:border-[#087F9C]" />
                    <button className="bg-[#087F9C] text-white px-4 py-2 rounded-md text-sm hover:bg-[#065F75] transition-colors">
                        新建数据库
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 font-medium">数据库名称</th>
                            <th className="px-6 py-3 font-medium">来源</th>
                            <th className="px-6 py-3 font-medium">版本</th>
                            <th className="px-6 py-3 font-medium">条目数</th>
                            <th className="px-6 py-3 font-medium text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50/50">
                            <td className="px-6 py-4 font-medium text-gray-900">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">CL</div>
                                    CLCD-China-2024
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-500"><span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs">标准</span></td>
                            <td className="px-6 py-4 text-gray-500">v1.2.0</td>
                            <td className="px-6 py-4 text-gray-500">4,231</td>
                            <td className="px-6 py-4 text-right text-[#087F9C] hover:underline cursor-pointer">管理</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                            <td className="px-6 py-4 font-medium text-gray-900">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">EI</div>
                                    Ecoinvent v3.9
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-500"><span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs">标准</span></td>
                            <td className="px-6 py-4 text-gray-500">v3.9.1</td>
                            <td className="px-6 py-4 text-gray-500">18,500</td>
                            <td className="px-6 py-4 text-right text-[#087F9C] hover:underline cursor-pointer">管理</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
