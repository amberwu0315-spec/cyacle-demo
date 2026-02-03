import React, { useEffect, useState } from 'react';
import { useHeaderContext } from '../../../context/HeaderContext';
import { IconFilter, IconBox, IconCheck } from '@tabler/icons-react';

const AllocationPage = () => {
    const { setActions, setTitleOverride, setLayoutConfig } = useHeaderContext();

    // 层级1：筛选器状态
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        setTitleOverride('分配规则');
        setLayoutConfig('title-only');
        setActions(null);

        return () => {
            setActions(null);
            setTitleOverride(null);
        };
    }, [setActions, setTitleOverride, setLayoutConfig]);

    // 模拟数据
    const allocations = [
        { id: 1, name: '按产量分配', type: '数量分配', status: '已启用', description: '根据产品产量进行碳排放分配' },
        { id: 2, name: '按价值分配', type: '经济分配', status: '已启用', description: '根据产品经济价值进行分配' },
        { id: 3, name: '按质量分配', type: '物理分配', status: '草稿', description: '根据产品质量进行物理分配' }
    ];

    // 渲染筛选器
    const renderFilters = () => (
        <div className="flex items-center gap-3 p-3 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <IconFilter size={16} />
                <span className="font-medium">筛选：</span>
            </div>

            <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:border-[#087F9C] focus:outline-none focus:border-[#087F9C] transition-colors"
            >
                <option value="all">全部类型</option>
                <option value="quantity">数量分配</option>
                <option value="economic">经济分配</option>
                <option value="physical">物理分配</option>
            </select>

            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:border-[#087F9C] focus:outline-none focus:border-[#087F9C] transition-colors"
            >
                <option value="all">全部状态</option>
                <option value="enabled">已启用</option>
                <option value="draft">草稿</option>
            </select>
        </div>
    );

    // 渲染大卡片列表
    const renderCardList = () => (
        <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
                {allocations.map((allocation) => (
                    <div
                        key={allocation.id}
                        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-[#087F9C] cursor-pointer transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                <IconBox size={32} />
                            </div>
                            <div className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${allocation.status === '已启用'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {allocation.status === '已启用' && <IconCheck size={14} />}
                                <span>{allocation.status}</span>
                            </div>
                        </div>

                        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-[#087F9C] mb-2">
                            {allocation.name}
                        </h3>

                        <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">类型：</span>
                                <span className="text-gray-700">{allocation.type}</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 line-clamp-2">
                            {allocation.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="w-full h-full flex flex-col bg-[#F5F6F8]">
            {/* 层级1：筛选器 */}
            {renderFilters()}

            {/* 层级2：大卡片列表 */}
            <div className="flex-1 overflow-y-auto">
                {renderCardList()}
            </div>
        </div>
    );
};

export default AllocationPage;
