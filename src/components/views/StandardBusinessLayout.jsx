import React, { useState, useEffect } from 'react';
import { IconPlus, IconFilter, IconSearch } from '@tabler/icons-react';

/**
 * StandardBusinessLayout - 标准背景数据页面布局
 * 
 * 用于创建带有筛选器+表格的标准背景数据页面
 * 复用 StandardFooter 的结构，但适配为全页面布局
 * 
 * Props:
 * - title: 页面标题
 * - filterOptions: 筛选器配置 { types: [], statuses: [] }
 * - showSearch: 是否显示搜索框
 * - setHeaderActions: Header action setter from useHeaderContext
 */
const StandardBusinessLayout = ({
    title,
    filterOptions = {},
    showSearch = true,
    setHeaderActions,
    defaultFilterType = 'all',
    onRowClick
}) => {
    const [filterType, setFilterType] = useState(defaultFilterType);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Update filterType when defaultFilterType changes (e.g. switching sidebar items)
    useEffect(() => {
        setFilterType(defaultFilterType);
    }, [defaultFilterType]);

    // 设置Header的创建按钮
    useEffect(() => {
        if (setHeaderActions) {
            setHeaderActions(
                <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white bg-[#087F9C] hover:bg-[#076A82] rounded transition-colors">
                    <IconPlus size={16} />
                    <span>创建</span>
                </button>
            );
        }
        return () => {
            if (setHeaderActions) {
                setHeaderActions(null);
            }
        };
    }, [setHeaderActions]);

    // 渲染搜索栏
    const renderSearchBar = () => {
        if (!showSearch) return null;

        return (
            <div className="mb-3">
                <div className="relative max-w-md">
                    <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder={`搜索${title}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded hover:border-[#087F9C] focus:outline-none focus:border-[#087F9C] transition-colors"
                    />
                </div>
            </div>
        );
    };

    // 渲染筛选器
    const renderFilters = () => {
        const { types = [], statuses = [] } = filterOptions;

        // 如果没有筛选项，不渲染筛选器
        if (types.length === 0 && statuses.length === 0) {
            return null;
        }

        return (
            <div className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IconFilter size={14} />
                    <span className="text-xs font-medium">筛选：</span>
                </div>

                {types.length > 0 && (
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-2 py-1 text-xs border border-gray-200 rounded hover:border-[#087F9C] focus:outline-none focus:border-[#087F9C] transition-colors"
                    >
                        <option value="all">全部类型</option>
                        {types.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                )}

                {statuses.length > 0 && (
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-2 py-1 text-xs border border-gray-200 rounded hover:border-[#087F9C] focus:outline-none focus:border-[#087F9C] transition-colors"
                    >
                        <option value="all">全部状态</option>
                        {statuses.map(status => (
                            <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                    </select>
                )}
            </div>
        );
    };

    // 渲染表格容器(占位符 -> 临时列表用于测试Tab)
    const renderTable = () => {
        const mockData = [
            { id: '101', name: '演示项目-门窗生产', type: '产品碳足迹', status: '进行中' },
            { id: '102', name: '集团2024碳核算', type: '组织碳足迹', status: '已完成' },
            { id: '103', name: '新工艺研发测试', type: '产品碳足迹', status: '草稿' },
        ];

        return (
            <div className="bg-white rounded border border-gray-200 flex-1 flex flex-col overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 font-medium text-xs">项目名称</th>
                            <th className="px-4 py-3 font-medium text-xs">类型</th>
                            <th className="px-4 py-3 font-medium text-xs">状态</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {mockData.map(item => (
                            <tr
                                key={item.id}
                                onClick={() => onRowClick && onRowClick(item)}
                                className="hover:bg-blue-50 cursor-pointer transition-colors"
                            >
                                <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                                <td className="px-4 py-3 text-gray-500">{item.type}</td>
                                <td className="px-4 py-3 text-gray-500">{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 text-center text-xs text-gray-400 border-t border-gray-100 mt-auto">
                    点击列表行以打开详情标签页
                </div>
            </div>
        );
    };

    return (
        <div className="h-full w-full flex flex-col p-3 bg-[#F5F6F8]">
            {/* 搜索栏 */}
            {renderSearchBar()}

            {/* 筛选器 */}
            {renderFilters()}

            {/* 表格容器 */}
            {renderTable()}
        </div>
    );
};

export default StandardBusinessLayout;
