import { IconFilter, IconDownload, IconPlus } from '@tabler/icons-react';

export default function PerspectiveData({ title }) {
    return (
        <div className="flex flex-col h-full">


            {/* Main Table (Layout-C Spec) */}
            <div className="flex-1 overflow-auto p-0 bg-white">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-[#F8FAFB] text-gray-500 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">名称</th>
                            <th className="px-6 py-3">类别</th>
                            <th className="px-6 py-3">数值 (kgCO2e)</th>
                            <th className="px-6 py-3">状态</th>
                            <th className="px-6 py-3 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-3 font-mono text-xs">DAT-00{i}</td>
                                <td className="px-6 py-3 text-gray-800 font-medium">示例数据项 {i}</td>
                                <td className="px-6 py-3"><span className="px-2 py-0.5 rounded bg-gray-100 text-xs">Raw Material</span></td>
                                <td className="px-6 py-3 font-mono">1,20{i}.50</td>
                                <td className="px-6 py-3"><span className="text-green-600 text-xs flex items-center gap-1">● Active</span></td>
                                <td className="px-6 py-3 text-right text-[#087F9C] cursor-pointer hover:underline">Edit</td>
                            </tr>
                        ))}
                        {/* Empty Spacer */}
                        <tr>
                            <td colSpan="6" className="px-6 py-12 text-center text-gray-400 bg-[#F8FAFB]/30">
                                ... 更多数据 ...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
