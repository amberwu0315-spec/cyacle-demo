import React from 'react';
import { IconCone } from '@tabler/icons-react';

export default function ComingSoon({ title = "功能建设中", subTitle = "攻城狮正在加班加点开发该模块..." }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50/50 p-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center max-w-md">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <IconCone className="w-8 h-8 text-primary animate-bounce" stroke={1.5} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{subTitle}</p>
                <div className="mt-6 px-4 py-2 bg-gray-100 rounded-md text-xs text-gray-400 font-mono">
                    Status: Pending Development
                </div>
            </div>
        </div>
    );
}
