/**
 * StandardBusinessLayout - 标准背景数据页面布局
 * 
 * 🏢 角色：标准作业车间 (Standard Workshop)
 * 📝 职责：提供一个统一的“筛选器+表格”模板。
 * 1. 自动处理 Header 的搜索框和筛选按钮逻辑。
 * 2. 也是 CanvasPage 的一种具体实现。
 */
import React, { useState, useEffect, useMemo } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { CanvasPage } from '../layout/PageLayouts';
import DataGrid from '../common/DataGrid';
import DataController from '../common/DataController';
import { buildStandardDataControllerRules } from '../../config/dataControllerRules';

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
    onRowDoubleClick,
    defaultFilterType = 'all',
    onRowClick,
    columns,
    data,
    dataControllerConfig = {}
}) => {
    const [filterType, setFilterType] = useState(defaultFilterType);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeView, setActiveView] = useState(dataControllerConfig.defaultView || 'table');

    const safeData = Array.isArray(data) ? data : [];

    const controllerRules = useMemo(() => buildStandardDataControllerRules({
        title,
        filterOptions,
        ...dataControllerConfig
    }), [title, filterOptions, dataControllerConfig]);

    const filterValueMap = {
        type: filterType,
        status: filterStatus
    };

    const filterSetterMap = {
        type: setFilterType,
        status: setFilterStatus
    };

    const hasActiveConditions = useMemo(() => {
        const hasSearch = showSearch && searchQuery.trim().length > 0;
        if (hasSearch) return true;
        if (!showFilters) return false;

        return controllerRules.filterRules.some((rule) => {
            const value = filterValueMap[rule.id];
            return value !== undefined && value !== (rule.allValue ?? 'all');
        });
    }, [showSearch, searchQuery, showFilters, controllerRules.filterRules, filterValueMap]);

    const conditionItems = useMemo(() => {
        const items = [];
        if (showSearch && controllerRules.searchRule) {
            items.push({
                ...controllerRules.searchRule,
                value: searchQuery,
                isActive: searchQuery.trim().length > 0,
                onChange: setSearchQuery
            });
        }

        if (showFilters) {
            controllerRules.filterRules.forEach((rule) => {
                const value = filterValueMap[rule.id] ?? rule.allValue ?? 'all';
                const setter = filterSetterMap[rule.id];
                if (!setter) return;
                items.push({
                    ...rule,
                    value,
                    isActive: value !== (rule.allValue ?? 'all'),
                    onChange: setter
                });
            });
        }

        return items;
    }, [showSearch, showFilters, controllerRules, searchQuery, filterValueMap, filterSetterMap]);

    const showDataController = conditionItems.length > 0 || showGridToolbar;

    const filteredData = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return safeData.filter((item) => {
            const typeCandidate = item?.type ?? item?.category ?? item?.kind;
            const statusCandidate = item?.status;

            const typeMatched = !showFilters || filterType === 'all'
                || !typeCandidate
                || String(typeCandidate).toLowerCase() === filterType.toLowerCase();

            const statusMatched = !showFilters || filterStatus === 'all'
                || !statusCandidate
                || String(statusCandidate).toLowerCase() === filterStatus.toLowerCase();

            const searchMatched = !showSearch || !normalizedQuery || Object.values(item || {}).some((val) => (
                val !== null
                && val !== undefined
                && String(val).toLowerCase().includes(normalizedQuery)
            ));

            return typeMatched && statusMatched && searchMatched;
        });
    }, [safeData, filterType, filterStatus, searchQuery, showFilters, showSearch]);

    // Update filterType when defaultFilterType changes (e.g. switching sidebar items)
    useEffect(() => {
        setFilterType(defaultFilterType);
    }, [defaultFilterType]);

    useEffect(() => {
        setActiveView(controllerRules.defaultView || 'table');
    }, [controllerRules.defaultView]);

    // 使用 ref 保持 onCreate 的最新引用，避免 useEffect 依赖变化导致死循环
    const onCreateRef = React.useRef(onCreate);
    useEffect(() => {
        onCreateRef.current = onCreate;
    }, [onCreate]);

    // 设置Header的创建按钮
    useEffect(() => {
        if (setHeaderActions && typeof setHeaderActions === 'function') {
            // 只有当提供了 onCreate 回调时才显示创建按钮
            // 使用 ref.current 判断是否有回调，但注意这里只是初始化判断
            // 如果 onCreate 动态变为 null，这里可能需要调整逻辑，但一般 onCreate 是静态传递的
            if (onCreateRef.current) {
                setHeaderActions(
                    <button
                        onClick={() => onCreateRef.current?.()}
                        className="flex items-center gap-1.5 h-btn-md px-btn-x-md text-[13px] font-medium text-white bg-primary-action hover:bg-primary-emphasize rounded-sm transition-colors"
                    >
                        <IconPlus size={16} />
                        <span>创建</span>
                    </button>
                );
            } else {
                setHeaderActions(null);
            }
        }
        return () => {
            if (setHeaderActions && typeof setHeaderActions === 'function') {
                setHeaderActions(null);
            }
        };
    }, [setHeaderActions]); // 移除 onCreate 依赖，打破死循环

    const handleResetConditions = () => {
        setSearchQuery('');
        setFilterType(defaultFilterType);
        setFilterStatus('all');
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
                onRowDoubleClick={(row) => onRowDoubleClick?.(row)}
                storageKey={storageKey}
                emptyText={`暂无${title}数据`}
                className="flex-1"
                rowSelection={{ enabled: false, mode: 'click', multiple: false }}
                showToolbar={false}
                showFooter
                minTableWidth={960}
            />
        );
    };

    return (
        <CanvasPage className="p-3 bg-[#F5F6F8]">
            {showDataController && (
                <DataController
                    controllerLabel={controllerRules.controllerLabel}
                    conditionItems={conditionItems}
                    showViewSettings={showGridToolbar}
                    viewOptions={controllerRules.viewOptions}
                    activeView={activeView}
                    onViewChange={setActiveView}
                    onReset={handleResetConditions}
                    resetDisabled={!hasActiveConditions}
                    columnSettingsPlaceholder={controllerRules.columnSettingsPlaceholder}
                />
            )}

            {renderTable()}
        </CanvasPage>
    );
};

export default StandardBusinessLayout;
