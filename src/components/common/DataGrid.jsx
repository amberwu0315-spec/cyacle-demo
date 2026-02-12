import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    IconAdjustmentsHorizontal,
    IconArrowDown,
    IconArrowUp,
    IconArrowsSort,
    IconColumns3,
    IconFilter,
    IconEyeOff,
    IconGripVertical,
    IconLayersIntersect,
    IconRotate,
    IconSortAscending,
    IconSortDescending
} from '@tabler/icons-react';

const DEFAULT_MIN_WIDTH = 100;
const DEFAULT_MAX_WIDTH = 700;
const DEFAULT_WIDTH = 160;
const DEFAULT_TABLE_WIDTH = 1200;
const SELECTION_COLUMN_WIDTH = 40;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const parseWidth = (width) => {
    if (typeof width === 'number' && !Number.isNaN(width)) {
        return width;
    }
    if (typeof width === 'string') {
        const px = width.match(/^(\d+(?:\.\d+)?)px$/);
        if (px) return Number(px[1]);
        const percent = width.match(/^(\d+(?:\.\d+)?)%$/);
        if (percent) {
            return (Number(percent[1]) / 100) * DEFAULT_TABLE_WIDTH;
        }
    }
    return null;
};

const inferAlignFromType = (dataType = 'text') => {
    if (dataType === 'number') return 'right';
    if (dataType === 'boolean') return 'center';
    return 'left';
};

const inferAlignFromClass = (className = '') => {
    if (className.includes('text-right')) return 'right';
    if (className.includes('text-center')) return 'center';
    if (className.includes('text-left')) return 'left';
    return null;
};

const normalizeColumn = (col, index, prevByKey = null) => {
    const key = String(col.key ?? col.id ?? `col_${index}`);
    const prev = prevByKey?.[key];
    const minWidth = col.minWidth ?? prev?.minWidth ?? DEFAULT_MIN_WIDTH;
    const maxWidth = col.maxWidth ?? prev?.maxWidth ?? DEFAULT_MAX_WIDTH;
    const configuredWidth = parseWidth(col.width);
    const dataType = col.dataType ?? prev?.dataType ?? 'text';
    const width = clamp(
        configuredWidth ?? prev?.width ?? DEFAULT_WIDTH,
        minWidth,
        maxWidth
    );

    return {
        ...col,
        key,
        title: col.title ?? key,
        dataType,
        minWidth,
        maxWidth,
        width,
        hidden: col.hidden ?? prev?.hidden ?? false,
        wrap: col.wrap ?? prev?.wrap ?? false,
        ellipsis: col.ellipsis ?? prev?.ellipsis ?? true,
        align: col.align ?? prev?.align ?? inferAlignFromClass(col.className) ?? inferAlignFromType(dataType),
        sortable: col.sortable ?? prev?.sortable ?? false,
        filterable: col.filterable ?? prev?.filterable ?? false,
        groupable: col.groupable ?? prev?.groupable ?? false,
        editable: col.editable ?? prev?.editable ?? false,
        lockPosition: col.lockPosition ?? prev?.lockPosition ?? index === 0,
        lockVisibility: col.lockVisibility ?? prev?.lockVisibility ?? index === 0
    };
};

const formatDate = (date, format = 'YYYY-MM-DD') => {
    if (!date || Number.isNaN(date.getTime())) return '-';
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    if (format === 'YYYY/MM/DD') return `${y}/${m}/${d}`;
    if (format === 'YYYY.MM.DD') return `${y}.${m}.${d}`;
    if (format === 'MM/DD/YYYY') return `${m}/${d}/${y}`;
    return `${y}-${m}-${d}`;
};

const optimizeDateRange = (raw) => {
    if (!raw || typeof raw !== 'string') return raw;
    const split = raw.split(/~|—|–/).map((s) => s.trim());
    if (split.length !== 2) return raw;
    const [startRaw, endRaw] = split;
    const start = new Date(startRaw);
    const end = new Date(endRaw);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return raw;

    const sameYear = start.getFullYear() === end.getFullYear();
    const sameMonth = sameYear && start.getMonth() === end.getMonth();
    const startIsYearStart = start.getMonth() === 0 && start.getDate() === 1;
    const endIsYearEnd = end.getMonth() === 11 && end.getDate() === 31;
    const endIsMonthEnd = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate() === end.getDate();

    if (sameYear && startIsYearStart && endIsYearEnd) return `${start.getFullYear()}年`;
    if (startIsYearStart && endIsYearEnd) return `${start.getFullYear()}年—${end.getFullYear()}年`;
    if (sameMonth && start.getDate() === 1 && endIsMonthEnd) return `${start.getFullYear()}年${start.getMonth() + 1}月`;
    if (sameYear && start.getDate() === 1 && endIsMonthEnd) {
        return `${start.getFullYear()}年${start.getMonth() + 1}月—${end.getMonth() + 1}月`;
    }
    return raw;
};

const formatCellValue = (value, column) => {
    if (value === null || value === undefined || value === '') return '-';
    const dataType = column.dataType ?? 'text';
    if (column.valueFormatter) return column.valueFormatter(value, column);

    if (dataType === 'number') {
        const num = Number(value);
        if (Number.isNaN(num)) return String(value);
        if (column.numberFormat === 'currency') return `¥${num.toLocaleString('en-US')}`;
        if (column.numberFormat === 'percent') return `${num}%`;
        return num.toLocaleString('en-US');
    }

    if (dataType === 'datetime') {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return String(value);
        return `${formatDate(date, column.dateFormat || 'YYYY-MM-DD')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }

    if (dataType === 'date') {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return String(value);
        return formatDate(date, column.dateFormat || 'YYYY-MM-DD');
    }

    if (dataType === 'dateRange') {
        return optimizeDateRange(String(value));
    }

    if (dataType === 'boolean') {
        return value ? '是' : '否';
    }

    if (dataType === 'enum' && Array.isArray(column.options)) {
        const found = column.options.find((option) => {
            if (typeof option === 'object') return String(option.value) === String(value);
            return String(option) === String(value);
        });
        if (!found) return String(value);
        return typeof found === 'object' ? found.label : found;
    }

    return String(value);
};

const compareValues = (a, b, column) => {
    const dataType = column.dataType ?? 'text';

    if (a === null || a === undefined || a === '') return 1;
    if (b === null || b === undefined || b === '') return -1;

    if (dataType === 'number') {
        const na = Number(a);
        const nb = Number(b);
        if (Number.isNaN(na) && Number.isNaN(nb)) return 0;
        if (Number.isNaN(na)) return 1;
        if (Number.isNaN(nb)) return -1;
        return na - nb;
    }

    if (dataType === 'datetime' || dataType === 'date') {
        const ta = new Date(a).getTime();
        const tb = new Date(b).getTime();
        if (Number.isNaN(ta) && Number.isNaN(tb)) return 0;
        if (Number.isNaN(ta)) return 1;
        if (Number.isNaN(tb)) return -1;
        return ta - tb;
    }

    return String(a).localeCompare(String(b), 'zh-CN');
};

const getRowStateClasses = (rowState, selected) => {
    if (rowState === 'disabled') return 'bg-slate-100 text-slate-400';
    if (rowState === 'locked') return 'bg-slate-100 text-slate-500';
    if (rowState === 'warning') return 'bg-rose-50';
    if (rowState === 'submitting') return 'bg-slate-100 text-slate-500 animate-pulse';
    if (rowState === 'focused') return 'bg-cyan-50 ring-1 ring-cyan-400/40';
    if (rowState === 'error') return 'bg-rose-50 text-rose-700';
    if (selected) return 'bg-blue-50';
    return 'bg-white';
};

const DataGrid = ({
    columns = [],
    rows = [],
    rowKey = 'id',
    title = 'DataGrid',
    emptyText = '暂无数据',
    className = '',
    storageKey,
    enableViewConfig = true,
    enableColumnMenu = true,
    rowSelection = { enabled: false, mode: 'checkbox', multiple: false },
    defaultSort = null,
    defaultGroupBy = null,
    onRowClick,
    onRowDoubleClick,
    onSelectionChange,
    onCellEdit,
    showToolbar = true,
    showFooter = true,
    footerText,
    compact = false,
    minTableWidth = 0
}) => {
    const gridRef = useRef(null);
    const configRef = useRef(null);
    const menuRef = useRef(null);
    const resizeStateRef = useRef(null);

    const loadStoredColumns = () => {
        if (!storageKey) return null;
        try {
            const raw = window.localStorage.getItem(storageKey);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : null;
        } catch {
            return null;
        }
    };

    const [columnStates, setColumnStates] = useState(() => {
        const stored = loadStoredColumns();
        const prevByKey = stored
            ? Object.fromEntries(stored.map((item) => [String(item.key), item]))
            : null;
        return columns.map((col, index) => normalizeColumn(col, index, prevByKey));
    });

    const [sortState, setSortState] = useState(() => (
        defaultSort && defaultSort.key
            ? { key: String(defaultSort.key), order: defaultSort.order === 'desc' ? 'desc' : 'asc' }
            : { key: null, order: null }
    ));
    const [filters, setFilters] = useState({});
    const [groupBy, setGroupBy] = useState(defaultGroupBy);
    const [collapsedGroups, setCollapsedGroups] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [lastSelectedRowId, setLastSelectedRowId] = useState(null);
    const [configOpen, setConfigOpen] = useState(false);
    const [menuColumnKey, setMenuColumnKey] = useState(null);
    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');
    const [localEdits, setLocalEdits] = useState({});

    useEffect(() => {
        const prevByKey = Object.fromEntries(columnStates.map((item) => [String(item.key), item]));
        setColumnStates(columns.map((col, index) => normalizeColumn(col, index, prevByKey)));
    }, [columns]);

    useEffect(() => {
        if (!storageKey) return;
        try {
            window.localStorage.setItem(
                storageKey,
                JSON.stringify(columnStates.map((col) => ({
                    key: col.key,
                    width: col.width,
                    hidden: col.hidden,
                    align: col.align,
                    wrap: col.wrap
                })))
            );
        } catch {
            // ignore localStorage errors
        }
    }, [columnStates, storageKey]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (configOpen && configRef.current && !configRef.current.contains(event.target)) {
                setConfigOpen(false);
            }
            if (menuColumnKey && menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuColumnKey(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [configOpen, menuColumnKey]);

    const stopResize = () => {
        resizeStateRef.current = null;
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', stopResize);
    };

    const handleResizeMove = (event) => {
        if (!resizeStateRef.current) return;
        const { key, startX, startWidth, minWidth, maxWidth } = resizeStateRef.current;
        const nextWidth = clamp(startWidth + (event.clientX - startX), minWidth, maxWidth);
        setColumnStates((prev) => prev.map((col) => (
            col.key === key ? { ...col, width: nextWidth } : col
        )));
    };

    const startResize = (event, column) => {
        event.preventDefault();
        event.stopPropagation();
        if (column.lockPosition) return;
        resizeStateRef.current = {
            key: column.key,
            startX: event.clientX,
            startWidth: column.width,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth
        };
        window.addEventListener('mousemove', handleResizeMove);
        window.addEventListener('mouseup', stopResize);
    };

    useEffect(() => () => stopResize(), []);

    const visibleColumns = useMemo(() => columnStates.filter((col) => !col.hidden), [columnStates]);
    const columnMap = useMemo(
        () => Object.fromEntries(columnStates.map((col) => [col.key, col])),
        [columnStates]
    );

    const resolveRowId = (row, index) => {
        const raw = typeof rowKey === 'function' ? rowKey(row, index) : row?.[rowKey];
        return raw ?? `row_${index}`;
    };

    const rowEntries = useMemo(
        () => rows.map((row, index) => ({
            row,
            index,
            id: String(resolveRowId(row, index))
        })),
        [rows, rowKey]
    );

    useEffect(() => {
        const validIds = new Set(rowEntries.map((entry) => entry.id));
        setSelectedRowKeys((prev) => prev.filter((id) => validIds.has(String(id))));
    }, [rowEntries]);

    const selectableRowIds = useMemo(
        () => rowEntries
            .filter((item) => item.row?.rowState !== 'disabled' && item.row?.rowState !== 'locked')
            .map((item) => item.id),
        [rowEntries]
    );

    const getValue = (row, columnKey, rowId) => {
        const editKey = `${rowId}:${columnKey}`;
        if (Object.prototype.hasOwnProperty.call(localEdits, editKey)) {
            return localEdits[editKey];
        }
        return row?.[columnKey];
    };

    const processedEntries = useMemo(() => {
        const filtered = rowEntries.filter(({ row, id: rowId }) => {
            return Object.entries(filters).every(([key, keyword]) => {
                if (!keyword) return true;
                const value = getValue(row, key, rowId);
                const normalized = String(value ?? '').toLowerCase();
                return normalized.includes(String(keyword).toLowerCase());
            });
        });

        if (!sortState.key || !sortState.order) return filtered;
        const sortColumn = columnMap[sortState.key];
        if (!sortColumn) return filtered;

        const sorted = [...filtered].sort((a, b) => {
            const va = getValue(a.row, sortState.key, a.id);
            const vb = getValue(b.row, sortState.key, b.id);
            const result = compareValues(va, vb, sortColumn);
            return sortState.order === 'asc' ? result : -result;
        });

        return sorted;
    }, [rowEntries, filters, sortState, columnMap, localEdits]);

    const processedRows = useMemo(
        () => processedEntries.map((entry) => entry.row),
        [processedEntries]
    );
    const processedRowIds = useMemo(
        () => processedEntries.map((entry) => entry.id),
        [processedEntries]
    );

    const groupedRows = useMemo(() => {
        if (!groupBy) return null;
        const groupColumn = columnMap[groupBy];
        if (!groupColumn) return null;

        const groups = {};
        processedEntries.forEach((entry) => {
            const raw = getValue(entry.row, groupBy, entry.id);
            const label = formatCellValue(raw, groupColumn) || '-';
            if (!groups[label]) groups[label] = [];
            groups[label].push(entry);
        });
        return groups;
    }, [processedEntries, groupBy, columnMap]);

    const selectedSet = useMemo(() => new Set(selectedRowKeys.map(String)), [selectedRowKeys]);

    useEffect(() => {
        if (!onSelectionChange) return;
        const selectedRows = rowEntries
            .filter((entry) => selectedSet.has(entry.id))
            .map((entry) => entry.row);
        onSelectionChange(selectedRows, selectedRowKeys);
    }, [selectedRowKeys, rowEntries, onSelectionChange, selectedSet]);

    const updateSelection = (next) => {
        setSelectedRowKeys(next);
    };

    const toggleSelectAll = () => {
        if (!rowSelection?.enabled || rowSelection?.mode !== 'checkbox') return;
        const allSelected = selectableRowIds.length > 0 && selectableRowIds.every((id) => selectedSet.has(id));
        if (allSelected) {
            updateSelection([]);
            setLastSelectedRowId(null);
        } else {
            updateSelection(selectableRowIds);
            setLastSelectedRowId(selectableRowIds.at(-1) ?? null);
        }
    };

    const toggleRowSelection = (rowEntry, forceChecked = null, event = null) => {
        if (!rowSelection?.enabled) return;
        if (rowEntry?.row?.rowState === 'disabled' || rowEntry?.row?.rowState === 'locked') return;

        const id = rowEntry.id;
        const currentlySelected = selectedSet.has(id);
        const nextChecked = forceChecked === null ? !currentlySelected : forceChecked;
        const isMetaToggle = Boolean(event?.metaKey || event?.ctrlKey);
        const isRangeSelect = Boolean(event?.shiftKey && rowSelection.multiple && lastSelectedRowId);

        if (isRangeSelect) {
            const startIndex = processedRowIds.indexOf(lastSelectedRowId);
            const endIndex = processedRowIds.indexOf(id);
            if (startIndex >= 0 && endIndex >= 0) {
                const [from, to] = startIndex < endIndex ? [startIndex, endIndex] : [endIndex, startIndex];
                const rangeIds = processedRowIds.slice(from, to + 1);
                const next = new Set(selectedSet);
                rangeIds.forEach((rowId) => {
                    if (nextChecked) next.add(rowId);
                    else next.delete(rowId);
                });
                updateSelection(Array.from(next));
                return;
            }
        }

        if (rowSelection.multiple) {
            if (rowSelection.mode === 'click' && !isMetaToggle && forceChecked === null) {
                updateSelection(nextChecked ? [id] : []);
            } else {
                const next = new Set(selectedSet);
                if (nextChecked) next.add(id);
                else next.delete(id);
                updateSelection(Array.from(next));
            }
        } else {
            updateSelection(nextChecked ? [id] : []);
        }

        if (nextChecked) {
            setLastSelectedRowId(id);
        }
    };

    const resetView = () => {
        setColumnStates(columns.map((col, index) => normalizeColumn(col, index, null)));
        setSortState({ key: null, order: null });
        setFilters({});
        setGroupBy(null);
        setCollapsedGroups({});
    };

    const moveColumn = (columnKey, direction) => {
        setColumnStates((prev) => {
            const index = prev.findIndex((col) => col.key === columnKey);
            if (index < 0) return prev;
            const target = index + direction;
            if (target < 0 || target >= prev.length) return prev;
            if (prev[index].lockPosition || prev[target].lockPosition) return prev;
            const next = [...prev];
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
    };

    const setColumnPatch = (columnKey, patch) => {
        setColumnStates((prev) => prev.map((col) => (
            col.key === columnKey ? { ...col, ...patch } : col
        )));
    };

    const startEdit = (row, rowIndex, column, currentValue) => {
        if (!column.editable) return;
        if (row?.rowState === 'disabled' || row?.rowState === 'locked') return;
        const id = String(resolveRowId(row, rowIndex));
        setEditingCell({ rowId: id, columnKey: column.key, rowIndex });
        setEditingValue(currentValue ?? '');
    };

    const commitEdit = () => {
        if (!editingCell) return;
        const { rowId, columnKey } = editingCell;
        setLocalEdits((prev) => ({
            ...prev,
            [`${rowId}:${columnKey}`]: editingValue
        }));
        if (onCellEdit) {
            const row = rows.find((item, index) => String(resolveRowId(item, index)) === rowId);
            onCellEdit({
                rowId,
                columnKey,
                value: editingValue,
                row
            });
        }
        setEditingCell(null);
    };

    const cancelEdit = () => {
        setEditingCell(null);
    };

    const totalWidth = useMemo(() => {
        const sum = visibleColumns.reduce((acc, col) => acc + (col.width || DEFAULT_WIDTH), 0);
        return sum + (rowSelection?.enabled && rowSelection?.mode === 'checkbox' ? SELECTION_COLUMN_WIDTH : 0);
    }, [visibleColumns, rowSelection]);

    const renderCellEditor = (column) => {
        if (column.dataType === 'boolean') {
            return (
                <label className="inline-flex items-center gap-2 text-xs">
                    <input
                        type="checkbox"
                        checked={Boolean(editingValue)}
                        onChange={(event) => setEditingValue(event.target.checked)}
                        className="rounded border-slate-300"
                    />
                    <span>{editingValue ? '是' : '否'}</span>
                </label>
            );
        }

        if (column.dataType === 'enum' && Array.isArray(column.options)) {
            return (
                <select
                    value={String(editingValue ?? '')}
                    onChange={(event) => setEditingValue(event.target.value)}
                    className="w-full h-8 px-2 border border-slate-300 rounded text-xs"
                    autoFocus
                >
                    {column.options.map((option) => {
                        if (typeof option === 'object') {
                            return (
                                <option key={String(option.value)} value={String(option.value)}>
                                    {option.label}
                                </option>
                            );
                        }
                        return (
                            <option key={String(option)} value={String(option)}>
                                {String(option)}
                            </option>
                        );
                    })}
                </select>
            );
        }

        return (
            <input
                type={column.dataType === 'number' ? 'number' : 'text'}
                value={editingValue ?? ''}
                onChange={(event) => setEditingValue(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') commitEdit();
                    if (event.key === 'Escape') cancelEdit();
                }}
                onBlur={commitEdit}
                className="w-full h-8 px-2 border border-slate-300 rounded text-xs"
                autoFocus
            />
        );
    };

    const showCheckboxSelection = rowSelection?.enabled && rowSelection?.mode === 'checkbox';

    const allChecked = showCheckboxSelection
        && selectableRowIds.length > 0
        && selectableRowIds.every((id) => selectedSet.has(id));
    const indeterminate = showCheckboxSelection
        && !allChecked
        && selectableRowIds.some((id) => selectedSet.has(id));

    const dataRows = groupedRows
        ? Object.entries(groupedRows).map(([groupValue, groupItems]) => ({
            type: 'group',
            groupValue,
            rows: groupItems
        }))
        : [{ type: 'flat', rows: processedEntries }];

    return (
        <div ref={gridRef} className={`relative bg-white border border-slate-200 rounded-md flex flex-col min-h-0 ${className}`}>
            {showToolbar && (
                <div className="h-10 px-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                            <IconColumns3 size={14} />
                            {title}
                        </span>
                        {sortState.key && (
                            <span className="inline-flex items-center gap-1 px-2 h-6 rounded bg-white border border-slate-200">
                                {sortState.order === 'asc' ? <IconSortAscending size={12} /> : <IconSortDescending size={12} />}
                                排序: {columnMap[sortState.key]?.title}
                            </span>
                        )}
                        {groupBy && (
                            <span className="inline-flex items-center gap-1 px-2 h-6 rounded bg-white border border-slate-200">
                                <IconLayersIntersect size={12} />
                                分组: {columnMap[groupBy]?.title}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {enableViewConfig && (
                            <button
                                type="button"
                                onClick={() => setConfigOpen((prev) => !prev)}
                                className="h-7 px-2 rounded border border-slate-200 bg-white text-xs text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                            >
                                <IconAdjustmentsHorizontal size={14} />
                                视图配置
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={resetView}
                            className="h-7 px-2 rounded border border-slate-200 bg-white text-xs text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                        >
                            <IconRotate size={14} />
                            重置
                        </button>
                    </div>
                </div>
            )}

            {configOpen && (
                <div
                    ref={configRef}
                    className={`absolute right-3 ${showToolbar ? 'top-11' : 'top-2'} z-30 w-80 bg-white border border-slate-200 rounded-md shadow-lg p-3`}
                >
                    <div className="text-sm font-medium text-slate-700 mb-2">列布局</div>
                    <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
                        {columnStates.map((col, index) => (
                            <div key={col.key} className="h-8 px-2 rounded border border-slate-200 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2 min-w-0">
                                    <IconGripVertical size={12} className="text-slate-400 shrink-0" />
                                    <input
                                        type="checkbox"
                                        checked={!col.hidden}
                                        disabled={col.lockVisibility}
                                        onChange={(event) => setColumnPatch(col.key, { hidden: !event.target.checked })}
                                        className="rounded border-slate-300"
                                    />
                                    <span className="truncate text-slate-700">{col.title}</span>
                                </div>
                                <div className="inline-flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => moveColumn(col.key, -1)}
                                        disabled={index === 0 || col.lockPosition}
                                        className="w-5 h-5 rounded border border-slate-200 text-slate-500 disabled:opacity-40 inline-flex items-center justify-center"
                                    >
                                        <IconArrowUp size={12} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveColumn(col.key, 1)}
                                        disabled={index === columnStates.length - 1 || col.lockPosition}
                                        className="w-5 h-5 rounded border border-slate-200 text-slate-500 disabled:opacity-40 inline-flex items-center justify-center"
                                    >
                                        <IconArrowDown size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-auto">
                <table className="text-sm border-collapse table-fixed min-w-full" style={{ width: `${Math.max(totalWidth, minTableWidth)}px` }}>
                    <colgroup>
                        {showCheckboxSelection && <col style={{ width: `${SELECTION_COLUMN_WIDTH}px` }} />}
                        {visibleColumns.map((col) => (
                            <col key={col.key} style={{ width: `${col.width}px` }} />
                        ))}
                    </colgroup>
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                        <tr>
                            {showCheckboxSelection && (
                                <th className="h-9 px-2 border-r border-slate-200 sticky left-0 z-20 bg-slate-50">
                                    <input
                                        ref={(node) => {
                                            if (!node) return;
                                            node.indeterminate = indeterminate;
                                        }}
                                        type="checkbox"
                                        checked={allChecked}
                                        onChange={toggleSelectAll}
                                        className="rounded border-slate-300"
                                    />
                                </th>
                            )}
                            {visibleColumns.map((col, index) => {
                                const stickyLeft = showCheckboxSelection ? SELECTION_COLUMN_WIDTH : 0;
                                const isSticky = col.lockPosition && index === 0;
                                const currentFilter = filters[col.key] ?? '';
                                const canSort = Boolean(col.sortable);
                                const canFilter = Boolean(col.filterable);
                                const canGroup = Boolean(col.groupable);
                                return (
                                    <th
                                        key={col.key}
                                        className={`relative h-9 px-2 border-r border-slate-200 font-medium ${isSticky ? 'sticky z-20 bg-slate-50' : ''}`}
                                        style={isSticky ? { left: stickyLeft } : undefined}
                                    >
                                        <div className="h-full flex items-center justify-between gap-2 min-w-0">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (!canSort) return;
                                                    setSortState((prev) => {
                                                        if (prev.key !== col.key) return { key: col.key, order: 'asc' };
                                                        if (prev.order === 'asc') return { key: col.key, order: 'desc' };
                                                        if (prev.order === 'desc') return { key: null, order: null };
                                                        return { key: col.key, order: 'asc' };
                                                    });
                                                }}
                                                className={`flex items-center gap-1 min-w-0 text-left ${canSort ? '' : 'cursor-default'}`}
                                            >
                                                <span className="truncate">{col.title}</span>
                                                {sortState.key === col.key && (
                                                    sortState.order === 'asc'
                                                        ? <IconSortAscending size={12} className="text-slate-500 shrink-0" />
                                                        : <IconSortDescending size={12} className="text-slate-500 shrink-0" />
                                                )}
                                            </button>
                                            <div className="inline-flex items-center gap-1 shrink-0">
                                                {canFilter && currentFilter && (
                                                    <span className="w-4 h-4 rounded bg-blue-100 text-blue-600 inline-flex items-center justify-center">
                                                        <IconFilter size={10} />
                                                    </span>
                                                )}
                                                {enableColumnMenu && (
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setMenuColumnKey((prev) => prev === col.key ? null : col.key);
                                                        }}
                                                        className="w-5 h-5 rounded hover:bg-slate-200 text-slate-500 inline-flex items-center justify-center"
                                                    >
                                                        <IconArrowsSort size={12} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {menuColumnKey === col.key && (
                                            <div
                                                ref={menuRef}
                                                className="absolute right-2 top-8 z-30 w-52 bg-white border border-slate-200 rounded-md shadow-lg p-2 space-y-1 text-xs"
                                            >
                                                <button
                                                    type="button"
                                                    disabled={!canSort}
                                                    className="w-full h-7 px-2 rounded hover:bg-slate-100 text-left inline-flex items-center gap-2 disabled:opacity-40"
                                                    onClick={() => {
                                                        setSortState({ key: col.key, order: 'asc' });
                                                        setMenuColumnKey(null);
                                                    }}
                                                >
                                                    <IconSortAscending size={12} />
                                                    升序
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={!canSort}
                                                    className="w-full h-7 px-2 rounded hover:bg-slate-100 text-left inline-flex items-center gap-2 disabled:opacity-40"
                                                    onClick={() => {
                                                        setSortState({ key: col.key, order: 'desc' });
                                                        setMenuColumnKey(null);
                                                    }}
                                                >
                                                    <IconSortDescending size={12} />
                                                    降序
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={!canGroup}
                                                    className="w-full h-7 px-2 rounded hover:bg-slate-100 text-left inline-flex items-center gap-2 disabled:opacity-40"
                                                    onClick={() => {
                                                        setGroupBy((prev) => (prev === col.key ? null : col.key));
                                                        setMenuColumnKey(null);
                                                    }}
                                                >
                                                    <IconLayersIntersect size={12} />
                                                    {groupBy === col.key ? '取消分组' : '按此列分组'}
                                                </button>
                                                {canFilter ? (
                                                    <label className="block pt-1">
                                                        <span className="text-[11px] text-slate-400">筛选（包含）</span>
                                                        <input
                                                            type="text"
                                                            value={currentFilter}
                                                            onChange={(event) => setFilters((prev) => ({
                                                                ...prev,
                                                                [col.key]: event.target.value
                                                            }))}
                                                            className="mt-1 w-full h-7 px-2 border border-slate-200 rounded"
                                                            placeholder={`筛选${col.title}`}
                                                        />
                                                    </label>
                                                ) : (
                                                    <div className="pt-1 text-[11px] text-slate-400">此列不支持筛选</div>
                                                )}
                                                <div className="h-px bg-slate-200 my-1" />
                                                <button
                                                    type="button"
                                                    disabled={col.lockVisibility}
                                                    className="w-full h-7 px-2 rounded hover:bg-slate-100 text-left inline-flex items-center gap-2 disabled:opacity-40"
                                                    onClick={() => {
                                                        setColumnPatch(col.key, { hidden: true });
                                                        setMenuColumnKey(null);
                                                    }}
                                                >
                                                    <IconEyeOff size={12} />
                                                    隐藏此列
                                                </button>
                                                <div className="grid grid-cols-3 gap-1">
                                                    {['left', 'center', 'right'].map((align) => (
                                                        <button
                                                            key={align}
                                                            type="button"
                                                            onClick={() => setColumnPatch(col.key, { align })}
                                                            className={`h-6 rounded border ${col.align === align ? 'border-cyan-500 text-cyan-600' : 'border-slate-200 text-slate-500'}`}
                                                        >
                                                            {align === 'left' ? '左' : align === 'center' ? '中' : '右'}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div
                                            role="presentation"
                                            onMouseDown={(event) => startResize(event, col)}
                                            className={`absolute top-0 right-0 w-1 h-full ${col.lockPosition ? 'cursor-not-allowed' : 'cursor-col-resize hover:bg-cyan-500/50'}`}
                                        />
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {processedRows.length === 0 && (
                            <tr>
                                <td colSpan={visibleColumns.length + (showCheckboxSelection ? 1 : 0)} className="h-28 text-center text-slate-400">
                                    {emptyText}
                                </td>
                            </tr>
                        )}

                        {dataRows.map((bucket) => {
                            if (bucket.type === 'group') {
                                const isCollapsed = collapsedGroups[bucket.groupValue];
                                return (
                                    <React.Fragment key={`group:${bucket.groupValue}`}>
                                        <tr className="bg-slate-50">
                                            <td colSpan={visibleColumns.length + (showCheckboxSelection ? 1 : 0)} className="h-8 px-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setCollapsedGroups((prev) => ({
                                                        ...prev,
                                                        [bucket.groupValue]: !prev[bucket.groupValue]
                                                    }))}
                                                    className="inline-flex items-center gap-2 text-xs font-medium text-slate-600"
                                                >
                                                    <IconArrowsSort size={12} className={`${isCollapsed ? '' : 'rotate-90'} transition-transform`} />
                                                    {bucket.groupValue}
                                                    <span className="text-slate-400">{bucket.rows.length}</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {!isCollapsed && bucket.rows.map((entry) => {
                                            const rowId = entry.id;
                                            const selected = selectedSet.has(rowId);
                                            const rowState = entry.row.rowState ?? (selected ? 'selected' : 'default');
                                            return (
                                                <tr
                                                    key={rowId}
                                                    className={`${getRowStateClasses(rowState, selected)} ${compact ? 'h-8' : 'h-9'} hover:bg-slate-50 transition-colors`}
                                                    onClick={(event) => {
                                                        if (rowSelection?.enabled && rowSelection.mode === 'click') {
                                                            toggleRowSelection(entry, null, event);
                                                        }
                                                        onRowClick?.(entry.row, entry.index, event);
                                                    }}
                                                    onDoubleClick={(event) => onRowDoubleClick?.(entry.row, entry.index, event)}
                                                >
                                                    {showCheckboxSelection && (
                                                        <td className="px-2 border-r border-slate-200 sticky left-0 z-10 bg-inherit">
                                                            <input
                                                                type="checkbox"
                                                                checked={selected}
                                                                disabled={rowState === 'disabled' || rowState === 'locked'}
                                                                onChange={(event) => toggleRowSelection(entry, event.target.checked, event)}
                                                                className="rounded border-slate-300"
                                                            />
                                                        </td>
                                                    )}
                                                    {visibleColumns.map((col, colIndex) => {
                                                        const stickyLeft = showCheckboxSelection ? SELECTION_COLUMN_WIDTH : 0;
                                                        const isSticky = col.lockPosition && colIndex === 0;
                                                        const value = getValue(entry.row, col.key, rowId);
                                                        const editing = editingCell
                                                            && editingCell.rowId === rowId
                                                            && editingCell.columnKey === col.key;
                                                        const rendered = col.render
                                                            ? col.render(value, entry.row)
                                                            : formatCellValue(value, col);
                                                        const alignClass = col.align === 'right'
                                                            ? 'text-right'
                                                            : col.align === 'center'
                                                                ? 'text-center'
                                                                : 'text-left';
                                                        const contentClass = col.wrap
                                                            ? 'whitespace-normal break-words'
                                                            : col.ellipsis
                                                                ? 'truncate'
                                                                : '';
                                                        const primitive = typeof rendered === 'string' || typeof rendered === 'number';
                                                        return (
                                                            <td
                                                                key={`${rowId}:${col.key}`}
                                                                className={`px-2 border-r border-slate-200 text-slate-700 align-middle ${alignClass} ${isSticky ? 'sticky z-10 bg-inherit' : ''}`}
                                                                style={isSticky ? { left: stickyLeft } : undefined}
                                                                onDoubleClick={() => startEdit(entry.row, entry.index, col, value)}
                                                            >
                                                                {editing ? (
                                                                    <div className="py-1">
                                                                        {renderCellEditor(col)}
                                                                    </div>
                                                                ) : (
                                                                    <div className={`${contentClass}`} title={primitive ? String(rendered) : undefined}>
                                                                        {rendered}
                                                                    </div>
                                                                )}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            }

                            return bucket.rows.map((entry) => {
                                const rowId = entry.id;
                                const selected = selectedSet.has(rowId);
                                const rowState = entry.row.rowState ?? (selected ? 'selected' : 'default');
                                return (
                                    <tr
                                        key={rowId}
                                        className={`${getRowStateClasses(rowState, selected)} ${compact ? 'h-8' : 'h-9'} hover:bg-slate-50 transition-colors`}
                                        onClick={(event) => {
                                            if (rowSelection?.enabled && rowSelection.mode === 'click') {
                                                toggleRowSelection(entry, null, event);
                                            }
                                            onRowClick?.(entry.row, entry.index, event);
                                        }}
                                        onDoubleClick={(event) => onRowDoubleClick?.(entry.row, entry.index, event)}
                                    >
                                        {showCheckboxSelection && (
                                            <td className="px-2 border-r border-slate-200 sticky left-0 z-10 bg-inherit">
                                                <input
                                                    type="checkbox"
                                                    checked={selected}
                                                    disabled={rowState === 'disabled' || rowState === 'locked'}
                                                    onChange={(event) => toggleRowSelection(entry, event.target.checked, event)}
                                                    className="rounded border-slate-300"
                                                />
                                            </td>
                                        )}
                                        {visibleColumns.map((col, colIndex) => {
                                            const stickyLeft = showCheckboxSelection ? SELECTION_COLUMN_WIDTH : 0;
                                            const isSticky = col.lockPosition && colIndex === 0;
                                            const value = getValue(entry.row, col.key, rowId);
                                            const editing = editingCell
                                                && editingCell.rowId === rowId
                                                && editingCell.columnKey === col.key;
                                            const rendered = col.render
                                                ? col.render(value, entry.row)
                                                : formatCellValue(value, col);
                                            const alignClass = col.align === 'right'
                                                ? 'text-right'
                                                : col.align === 'center'
                                                    ? 'text-center'
                                                    : 'text-left';
                                            const contentClass = col.wrap
                                                ? 'whitespace-normal break-words'
                                                : col.ellipsis
                                                    ? 'truncate'
                                                    : '';
                                            const primitive = typeof rendered === 'string' || typeof rendered === 'number';
                                            return (
                                                <td
                                                    key={`${rowId}:${col.key}`}
                                                    className={`px-2 border-r border-slate-200 text-slate-700 align-middle ${alignClass} ${isSticky ? 'sticky z-10 bg-inherit' : ''}`}
                                                    style={isSticky ? { left: stickyLeft } : undefined}
                                                    onDoubleClick={() => startEdit(entry.row, entry.index, col, value)}
                                                >
                                                    {editing ? (
                                                        <div className="py-1">
                                                            {renderCellEditor(col)}
                                                        </div>
                                                    ) : (
                                                        <div className={`${contentClass}`} title={primitive ? String(rendered) : undefined}>
                                                            {rendered}
                                                        </div>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            });
                        })}
                    </tbody>
                </table>
            </div>

            {showFooter && (
                <div className="h-8 px-3 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
                    <span>{footerText || `共 ${processedRows.length} 条记录`}</span>
                    {rowSelection?.enabled && (
                        <span>已选中 {selectedRowKeys.length} 条</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default DataGrid;
