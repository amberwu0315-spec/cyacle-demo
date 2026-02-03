import React, { useState } from 'react';
import { IconPlus, IconFilter } from '@tabler/icons-react';
import FooterModal from './FooterModal';

/**
 * StandardFooter - 标准 Footer 模块模板
 * 
 * 用于创建带有筛选器+表格的标准 Footer 模块
 * 
 * Props:
 * - title: 标题
 * - onClose: 关闭回调
 * - filterOptions: 筛选器配置 { types: [], statuses: [] }
 */
const StandardFooter = ({ title, onClose, filterOptions = {} }) => {
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // 业务功能组 - 添加按钮(填充样式)
    const businessActions = (
        <button
            className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-[#087F9C] hover:bg-[#076A82] rounded transition-colors"
            title="添加"
        >
            <IconPlus size={14} />
            <span>添加</span>
        </button>
    );

    // 渲染筛选器
    const renderFilters = () => {
        const { types = [], statuses = [] } = filterOptions;

        return (
            <div className="flex items-center gap-3 p-3 bg-white border-b border-gray-200">
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

    // 渲染表格容器(占位符)
    const renderTable = () => (
        <div className="p-3">
            <div className="bg-white rounded border border-gray-200 p-6 text-center">
                <p className="text-sm text-gray-500">表格内容待补充</p>
                <p className="text-xs text-gray-400 mt-1">将在后续迭代中添加具体表格实现</p>
            </div>
        </div>
    );

    return (
        <FooterModal
            title={title}
            businessActions={businessActions}
            onClose={onClose}
        >
            {/* 层级1：筛选器 */}
            {renderFilters()}

            {/* 层级2：表格容器 */}
            {renderTable()}
        </FooterModal>
    );
};

export default StandardFooter;
