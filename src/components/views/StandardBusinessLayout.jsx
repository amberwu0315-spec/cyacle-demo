/**
 * StandardBusinessLayout - 标准背景数据页面布局
 * 
 * 🏢 角色：标准作业车间 (Standard Workshop)
 * 📝 职责：提供一个统一的“筛选器+表格”模板。
 * 1. 自动处理 Header 的搜索框和筛选按钮逻辑。
 * 2. 也是 CanvasPage 的一种具体实现。
 */
import React, { useState, useEffect, useMemo } from 'react';
import { usePagePresentation } from '../../context/PagePresentationContext';
import { IconPlus, IconFilter, IconSearch } from '@tabler/icons-react';
import { CanvasPage } from '../layout/PageLayouts';
import DataGrid from '../common/DataGrid';

/**
 * 用于创建带有筛选器+表格的标准背景数据页面
 * 复用 StandardFooter 的结构，但适配为全页面布局
 * 
 * Props:
 * - title: 页面标题
 * - filterOptions: 筛选器配置 { types: [], statuses: [] }
 * - showSearch: 是否显示搜索框
 * - setHeaderActions: Header action setter from usePagePresentation
 */
const StandardBusinessLayout = ({
    title,
    filterOptions = {},
    showSearch = true,
    showFilters = true,
    showGridToolbar = true,
    setHeaderActions,
    onCreate,
    defaultFilterType = 'all',
    onRowClick,
    columns,
    data
}) => {
    const [filterType, setFilterType] = useState(defaultFilterType);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const safeData = Array.isArray(data) ? data : [];

    const filteredData = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return safeData.filter((item) => {
            const typeCandidate = item?.type ?? item?.category ?? item?.kind;
            const statusCandidate = item?.status;

            const typeMatched = filterType === 'all'
                || !typeCandidate
                || String(typeCandidate).toLowerCase() === filterType.toLowerCase();

            const statusMatched = filterStatus === 'all'
                || !statusCandidate
                || String(statusCandidate).toLowerCase() === filterStatus.toLowerCase();

            const searchMatched = !normalizedQuery || Object.values(item || {}).some((val) => (
                val !== null
                && val !== undefined
                && String(val).toLowerCase().includes(normalizedQuery)
            ));

            return typeMatched && statusMatched && searchMatched;
        });
    }, [safeData, filterType, filterStatus, searchQuery]);

    const { setShowHeader } = usePagePresentation(); // Only using setShowHeader now

    // Update filterType when defaultFilterType changes
    useEffect(() => {
        setFilterType(defaultFilterType);
    }, [defaultFilterType]);

    // 🔴 Hide System Header (User Requirement)
    // 🔴 Also resolves 'Maximum update depth exceeded' by removing setHeaderActions loop
    useEffect(() => {
        if (setShowHeader) {
            setShowHeader(false);
        }
        return () => {
            if (setShowHeader) {
                setShowHeader(true);
            }
        };
    }, [setShowHeader]);

    // 🟢 Render Local Header (Title + Create Button)
    const renderLocalHeader = () => {
        return (
            <div className="flex items-center justify-between mb-4 shrink-0">
                <h1 className="text-lg font-bold text-gray-800">{title}</h1>
                {onCreate && (
                    <button
                        onClick={onCreate}
                        className="flex items-center gap-1.5 h-btn-md px-btn-x-md text-[13px] font-medium text-white bg-primary-action hover:bg-primary-emphasize rounded-sm transition-colors"
                    >
                        <IconPlus size={16} />
                        <span>创建</span>
                    </button>
                )}
            </div>
        );
    };

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
                        className="w-full pl-9 pr-4 py-1.5 text-[13px] border border-slate-300 rounded-md bg-white hover:border-[#0EA5B7] focus:outline-none focus:border-[#0EA5B7] transition-colors"
                    />
                </div>
            </div>
        );
    };

    // 渲染筛选器
    const renderFilters = () => {
        if (!showFilters) {
            return null;
        }

        const { types = [], statuses = [] } = filterOptions;

        // 如果没有筛选项，不渲染筛选器
        if (types.length === 0 && statuses.length === 0) {
            return null;
        }

        return (
            <div className="flex items-center gap-3 p-3 bg-[#edf4f7] rounded-md border border-slate-200 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IconFilter size={14} />
                    <span className="text-xs font-medium">筛选：</span>
                </div>

                {types.length > 0 && (
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-2 py-1 text-xs border border-slate-300 rounded-md bg-white hover:border-[#0EA5B7] focus:outline-none focus:border-[#0EA5B7] transition-colors"
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
                        className="px-2 py-1 text-xs border border-slate-300 rounded-md bg-white hover:border-[#0EA5B7] focus:outline-none focus:border-[#0EA5B7] transition-colors"
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

    // 渲染表格容器
    const renderTable = () => {
        // Fallback if no columns/data provided
        if (!columns || !data) {
            return <div className="p-4 text-center text-gray-400">No data available</div>;
        }

        const normalizedColumns = columns.map((col, index) => ({
            ...col,
            sortable: col.sortable ?? true,
            filterable: col.filterable ?? true,
            groupable: col.groupable ?? index === 0,
            editable: col.editable ?? false
        }));

        const storageKey = `std-grid:${title}`;

        return (
            <DataGrid
                title={title}
                columns={normalizedColumns}
                rows={filteredData}
                rowKey={(row, index) => row?.id ?? `${title}-${index}`}
                onRowClick={(row) => onRowClick?.(row)}
                storageKey={storageKey}
                emptyText={`暂无${title}数据`}
                className="flex-1"
                rowSelection={{ enabled: false, mode: 'click', multiple: false }}
                showToolbar={showGridToolbar}
                showFooter
                minTableWidth={960}
            />
        );
    };

    return (
        <CanvasPage className="p-4 bg-[#F5F6F8] flex flex-col h-full overflow-hidden">
            {/* Local Header */}
            {renderLocalHeader()}

            {/* 搜索栏 */}
            {renderSearchBar()}

            {/* 筛选器 */}
            {renderFilters()}

            {/* 表格容器 */}
            {renderTable()}
        </CanvasPage>
    );
};

export default StandardBusinessLayout;
