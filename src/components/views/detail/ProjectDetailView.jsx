import React from 'react';
import { IconArrowLeft } from '@tabler/icons-react';

/**
 * ProjectDetailView - 项目详情页占位符
 */
const ProjectDetailView = ({ data }) => {
    return (
        <div className="h-full flex flex-col p-6 bg-white animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[#087F9C]/10 flex items-center justify-center text-[#087F9C]">
                    <span className="text-xl font-bold">P</span>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{data?.name || '未命名项目'}</h1>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <span>ID: {data?.id || '---'}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>{data?.type || '未知类型'}</span>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 flex-1">
                <h3 className="text-lg font-medium text-gray-800 mb-4">项目详情</h3>
                <div className="grid grid-cols-2 gap-4 max-w-2xl">
                    <div className="space-y-1">
                        <label className="text-xs text-gray-500">名称</label>
                        <p className="text-sm font-medium">{data?.name}</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-gray-500">类型</label>
                        <p className="text-sm font-medium">{data?.type}</p>
                    </div>
                    {/* Add more mock fields as needed */}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-gray-400 text-sm text-center">
                        此处将展示完整的项目表单内容<br />
                        (Tab System Demo)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailView;
