import { IconCompass, IconServer, IconGitBranch, IconBox, IconCalculator } from '@tabler/icons-react';

export default function L2Sidebar({ activeL2, onSelect }) {

    const items = [
        { id: 'navigation', icon: IconCompass, label: '导航' },
        { id: 'basis', icon: IconServer, label: '基础' },
        { id: 'allocation', icon: IconGitBranch, label: '分配' },
    ];

    const group2 = [
        { id: 'model', icon: IconBox, label: '模型' },
        { id: 'accounting', icon: IconCalculator, label: '核算' },
    ];

    const renderBtn = (item) => {
        const isActive = activeL2 === item.id;
        return (
            <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="group w-full flex flex-col items-center gap-1"
            >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-105 ${isActive ? 'bg-[#087F9C] text-white' : 'text-gray-500'}`}>
                    <item.icon className="w-5 h-5" />
                </div>
                <span className={`text-[14px] font-medium whitespace-nowrap ${isActive ? 'text-[#087F9C]' : 'text-gray-500'}`}>
                    {item.label}
                </span>
            </button>
        )
    }

    return (
        <div className="w-[50px] h-full bg-[#F8FAFB] border-r border-[#D6D9DC] flex flex-col py-2 shrink-0 items-center gap-[4px]">
            {items.map(renderBtn)}
            <div className="border-b border-gray-200 w-6 mx-auto my-[4px]"></div>
            {group2.map(renderBtn)}
        </div>
    );
}
