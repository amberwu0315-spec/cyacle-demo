import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    IconAdjustmentsHorizontal,
    IconChevronDown,
    IconFilter,
    IconRotate,
    IconSearch
} from '@tabler/icons-react';

const DEFAULT_VIEW_OPTIONS = [{ value: 'table', label: '表格' }];

const DataController = ({
    controllerLabel = '标准',
    conditionItems = [],
    showViewSettings = true,
    viewOptions = DEFAULT_VIEW_OPTIONS,
    activeView = 'table',
    onViewChange,
    onReset,
    resetDisabled = true,
    columnSettingsPlaceholder = '列设置功能将在后续版本开放。'
}) => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const filterRef = useRef(null);
    const viewRef = useRef(null);

    const normalizedConditionItems = useMemo(
        () => (Array.isArray(conditionItems) ? conditionItems : []),
        [conditionItems]
    );

    const normalizedViewOptions = useMemo(() => {
        if (!Array.isArray(viewOptions) || viewOptions.length === 0) {
            return DEFAULT_VIEW_OPTIONS;
        }
        return viewOptions.map((item) => ({
            value: String(item?.value ?? ''),
            label: item?.label ?? String(item?.value ?? ''),
            disabled: Boolean(item?.disabled)
        })).filter((item) => item.value.length > 0);
    }, [viewOptions]);

    const activeConditionCount = useMemo(
        () => normalizedConditionItems.reduce((count, item) => (
            item?.isActive ? count + 1 : count
        ), 0),
        [normalizedConditionItems]
    );

    useEffect(() => {
        const onWindowMouseDown = (event) => {
            if (filterOpen && filterRef.current && !filterRef.current.contains(event.target)) {
                setFilterOpen(false);
            }
            if (viewOpen && viewRef.current && !viewRef.current.contains(event.target)) {
                setViewOpen(false);
            }
        };

        window.addEventListener('mousedown', onWindowMouseDown);
        return () => window.removeEventListener('mousedown', onWindowMouseDown);
    }, [filterOpen, viewOpen]);

    return (
        <div className="mb-3 flex items-center justify-between gap-2">
            <div ref={filterRef} className="relative">
                <button
                    type="button"
                    onClick={() => setFilterOpen((prev) => !prev)}
                    className="h-9 px-3 rounded-md border border-cyan-300 bg-[#f5fcff] text-cyan-700 text-sm inline-flex items-center gap-1.5 hover:bg-[#edf8fc]"
                >
                    <IconFilter size={15} />
                    <span>{controllerLabel}</span>
                    {activeConditionCount > 0 && (
                        <span className="min-w-5 h-5 px-1 rounded-full bg-cyan-100 text-cyan-700 text-[11px] inline-flex items-center justify-center">
                            {activeConditionCount}
                        </span>
                    )}
                    <IconChevronDown size={14} />
                </button>

                {filterOpen && (
                    <div className="absolute left-0 top-11 z-30 w-[440px] max-w-[calc(100vw-2.5rem)] rounded-md border border-slate-200 bg-white p-3 shadow-lg">
                        <div className="text-xs font-medium text-slate-500 mb-2">筛选条件</div>
                        <div className="space-y-2">
                            {normalizedConditionItems.length === 0 && (
                                <div className="h-10 rounded border border-dashed border-slate-200 text-xs text-slate-400 inline-flex items-center justify-center w-full">
                                    当前暂无可配置条件
                                </div>
                            )}

                            {normalizedConditionItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-2">
                                    <span className="h-8 px-2 rounded border border-slate-200 bg-slate-50 text-xs text-slate-500 inline-flex items-center whitespace-nowrap">
                                        {item.label}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        {item.type === 'search' ? (
                                            <div className="relative">
                                                <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    type="text"
                                                    value={item.value ?? ''}
                                                    onChange={(event) => item.onChange?.(event.target.value)}
                                                    placeholder={item.placeholder || '输入关键词'}
                                                    className="w-full h-8 pl-8 pr-2 rounded border border-slate-200 text-xs text-slate-700 hover:border-cyan-400 focus:outline-none focus:border-cyan-500"
                                                />
                                            </div>
                                        ) : (
                                            <select
                                                value={item.value ?? item.allValue ?? 'all'}
                                                onChange={(event) => item.onChange?.(event.target.value)}
                                                className="w-full h-8 px-2 rounded border border-slate-200 text-xs text-slate-700 hover:border-cyan-400 focus:outline-none focus:border-cyan-500"
                                            >
                                                <option value={item.allValue ?? 'all'}>{item.allLabel ?? '全部'}</option>
                                                {(item.options || []).map((option) => (
                                                    <option key={String(option.value)} value={String(option.value)}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {showViewSettings && (
                <div ref={viewRef} className="relative flex items-center gap-2">
                    <button
                        type="button"
                        disabled={resetDisabled}
                        onClick={() => onReset?.()}
                        className="h-8 px-2.5 rounded border border-slate-200 bg-white text-xs text-slate-600 inline-flex items-center gap-1 hover:text-slate-900 disabled:opacity-40 disabled:hover:text-slate-600"
                    >
                        <IconRotate size={14} />
                        重置
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewOpen((prev) => !prev)}
                        className="h-8 px-2.5 rounded border border-slate-200 bg-white text-xs text-slate-600 inline-flex items-center gap-1 hover:text-slate-900"
                    >
                        <IconAdjustmentsHorizontal size={14} />
                        视图设置
                        <IconChevronDown size={14} />
                    </button>

                    {viewOpen && (
                        <div className="absolute right-0 top-10 z-30 w-72 rounded-md border border-slate-200 bg-white p-3 shadow-lg">
                            <div className="text-sm font-medium text-slate-700">视图选项</div>
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                {normalizedViewOptions.map((item) => {
                                    const isActive = activeView === item.value;
                                    return (
                                        <button
                                            key={item.value}
                                            type="button"
                                            disabled={item.disabled}
                                            onClick={() => onViewChange?.(item.value)}
                                            className={`h-14 rounded-md border text-sm inline-flex items-center justify-center ${isActive ? 'border-cyan-500 bg-cyan-500 text-white' : 'border-slate-200 text-slate-700 bg-white'} disabled:opacity-40`}
                                        >
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="h-px bg-slate-200 my-3" />

                            <div className="text-sm font-medium text-slate-700">列设置</div>
                            <div className="mt-2 h-14 rounded-md border border-dashed border-slate-200 bg-slate-50 px-3 text-xs text-slate-500 inline-flex items-center">
                                {columnSettingsPlaceholder}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DataController;
