import React from 'react';
import { IconFilter, IconListDetails } from '@tabler/icons-react';

const hasDisplayValue = (value) => value !== null && value !== undefined && value !== '';
const toDisplayValue = (value) => {
    if (!hasDisplayValue(value)) {
        return '-';
    }
    if (typeof value === 'boolean') {
        return value ? '是' : '否';
    }
    return value;
};

export const sourceBadgeClass = (source) => (
    source === '标准'
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-sky-50 text-sky-700 border-sky-200'
);

export function SourceBadge({ source = '自建' }) {
    return (
        <span className={`inline-flex items-center h-6 px-2 rounded text-xs border ${sourceBadgeClass(source)}`}>
            {source}
        </span>
    );
}

export function DetailInfoRows({ rows = [] }) {
    return (
        <div className="p-4 space-y-3 text-sm">
            {rows.map((row) => (
                <div key={row.label} className="grid grid-cols-[110px_1fr] gap-2">
                    <div className="text-slate-500">{row.label}</div>
                    <div className="text-slate-800 break-all">{toDisplayValue(row.value)}</div>
                </div>
            ))}
        </div>
    );
}

export function TinyToolbar({
    placeholder = '名称或其他',
    rightSlot = null
}) {
    return (
        <div className="flex items-center justify-between gap-2 p-3 border-b border-slate-100">
            <div className="relative w-full max-w-[260px]">
                <IconFilter size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    readOnly
                    value=""
                    placeholder={placeholder}
                    className="w-full h-8 pl-7 pr-2 text-xs border border-slate-200 rounded bg-white text-slate-500"
                />
            </div>
            <div className="shrink-0 flex items-center gap-2 text-slate-400">
                {rightSlot}
                <IconListDetails size={16} />
            </div>
        </div>
    );
}

export function PlainTable({ columns = [], rows = [] }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-[#eaf5f9] text-slate-600">
                        {columns.map((col) => (
                            <th key={col.key} className="text-left font-medium px-3 py-2 whitespace-nowrap">
                                {col.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? rows.map((row, index) => (
                        <tr key={`${row.id || index}`} className="border-b border-slate-100">
                            {columns.map((col) => (
                                <td key={col.key} className="px-3 py-2 text-slate-700 align-top">
                                    {toDisplayValue(row[col.key])}
                                </td>
                            ))}
                        </tr>
                    )) : (
                        <tr>
                            <td className="px-3 py-6 text-slate-400" colSpan={columns.length || 1}>
                                暂无数据
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td className="px-3 py-2 text-slate-500" colSpan={columns.length || 1}>
                            共{rows.length}项
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export function TwoLineListItem(item, isSelected) {
    const title = item?.name || item?.nameCN || item?.title || '-';
    const subtitle = item?.nameEN || item?.type || item?.docType || item?.sourceDB || '';

    return (
        <div
            className={`px-3 py-2 border-b border-slate-100 ${isSelected ? 'bg-[#0EA5B7] text-white' : 'hover:bg-slate-50 text-slate-800'
                }`}
        >
            <div className="text-sm truncate font-medium">{title}</div>
            <div className={`text-xs truncate mt-0.5 ${isSelected ? 'text-cyan-100' : 'text-slate-500'}`}>
                {subtitle || '-'}
            </div>
        </div>
    );
}
