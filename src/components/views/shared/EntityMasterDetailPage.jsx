import React from 'react';
import { IconChevronLeft } from '@tabler/icons-react';
import MasterDetailPageTemplate from '../../layout/templates/MasterDetailPageTemplate';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';

const DEFAULT_SECTIONS = [
    { title: '基本信息', placeholder: '模块占位：后续补充业务内容。' },
    { title: '更多信息', placeholder: '模块占位：后续补充业务内容。' },
    { title: '关联数据', placeholder: '模块占位：后续补充业务内容。' }
];

const pickName = (item) => (
    item?.name
    || item?.nameCN
    || item?.title
    || item?.code
    || item?.id
    || '未命名'
);

const buildSummary = (item = {}) => {
    const ignoreKeys = new Set(['id']);
    return Object.entries(item)
        .filter(([key, value]) => !ignoreKeys.has(key) && value !== null && value !== undefined && value !== '')
        .slice(0, 4);
};

export default function EntityMasterDetailPage({
    listTitle = '列表',
    listData = [],
    selectedId = null,
    onSelect = () => { },
    onCollapse = null,
    sections = DEFAULT_SECTIONS,
    managePageHeader = true,
    showAddButton = false,
    onAdd = () => { }
}) {
    const selectedItem = listData.find((item) => String(item.id) === String(selectedId));
    const summaryFields = buildSummary(selectedItem || {});

    return (
        <MasterDetailPageTemplate
            listTitle={listTitle}
            listData={listData}
            selectedId={selectedId}
            onSelect={onSelect}
            showAddButton={showAddButton}
            onAdd={onAdd}
            managePageHeader={managePageHeader}
            detailHeaderSlot={(
                <div className="w-full flex items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold text-slate-800 truncate">
                        {pickName(selectedItem)}
                    </h2>
                    {onCollapse && (
                        <button
                            type="button"
                            onClick={onCollapse}
                            className="inline-flex items-center gap-1 px-2 h-7 rounded border border-slate-200 text-xs text-slate-600 hover:text-[#0EA5B7] hover:border-[#0EA5B7] transition-colors"
                            title="收起并返回表格"
                        >
                            <IconChevronLeft size={14} />
                            返回列表
                        </button>
                    )}
                </div>
            )}
            detailContentSlot={(
                <div className="space-y-3">
                    <ContentModule>
                        <ModuleHeader title="详情概览" />
                        <div className="p-3 grid grid-cols-2 gap-3 text-sm">
                            {summaryFields.length > 0 ? summaryFields.map(([key, value]) => (
                                <div key={key} className="min-w-0">
                                    <div className="text-xs text-slate-400 mb-1">{key}</div>
                                    <div className="text-slate-700 truncate">{String(value)}</div>
                                </div>
                            )) : (
                                <div className="col-span-2 text-slate-500">暂无可展示字段</div>
                            )}
                        </div>
                    </ContentModule>

                    {sections.map((section) => (
                        <ContentModule key={section.title}>
                            <ModuleHeader title={section.title} />
                            <div className="p-3 text-sm text-slate-500">{section.placeholder}</div>
                        </ContentModule>
                    ))}
                </div>
            )}
        />
    );
}
