/**
 * Dashboard - 仪表盘
 * 
 * 🏢 角色：大厅展示 (Lobby Display)
 * 📝 职责：
 * 1. 显示全局概览数据（目前是静态占位符）。
 * 2. 最基础的基础视图。
 */
export default function Dashboard() {
    return (
        <div className="w-full h-full flex flex-col p-8 overflow-y-auto bg-[#F5F6F8]">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-[16px] font-bold text-[#1F2937]">仪表盘 (Dashboard)</h1>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-[#F5F6F8] p-6 rounded-lg h-48 border border-gray-100"></div>
                <div className="bg-[#F5F6F8] p-6 rounded-lg h-48 border border-gray-100"></div>
                <div className="bg-[#F5F6F8] p-6 rounded-lg h-48 border border-gray-100"></div>
            </div>
        </div>
    );
}
