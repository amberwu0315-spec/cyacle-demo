import React, { useEffect, useMemo, useState } from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import EntityMasterDetailPage from './EntityMasterDetailPage';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import { buildCreatedEntityRow } from '../../../utils/createEntityRow';
import { readStore, writeStore } from '../../../utils/persistStore';

export default function EntityModulePage({
    title,
    filterOptions = { types: [], statuses: [] },
    columns = [],
    data = [],
    createComponent: CreateComponent = null,
    showAddButton = true,
    onCreateSaved = null,
    detailSections = null,
    defaultMode = 'list',
    masterDetailOnly = false,
    renderDetailHeader = null,
    renderDetailContent = null,
    listItemRenderer = null
}) {
    const { setActions } = usePagePresentation();
    const persistKey = `cyacle:created:${title}`;
    const uiPersistKey = `cyacle:page-ui:${title}`;
    const [mode, setMode] = useState(() => {
        const saved = readStore(uiPersistKey, {});
        if (masterDetailOnly) {
            return saved?.mode === 'create' ? 'create' : 'detail';
        }
        // 主从页入口规则：默认先展示列表，仅通过双击行进入详情
        // 因此不使用持久化的 detail 作为初始态，避免刷新后直接落在详情页
        if (saved?.mode === 'create') {
            return 'create';
        }
        return defaultMode;
    }); // list | create | detail
    const [selectedId, setSelectedId] = useState(() => {
        const saved = readStore(uiPersistKey, {});
        return saved?.selectedId ?? null;
    });
    const [createdRows, setCreatedRows] = useState(() => {
        const persisted = readStore(persistKey, []);
        return Array.isArray(persisted) ? persisted : [];
    });

    useEffect(() => {
        if (!masterDetailOnly) {
            setMode((prev) => (prev === 'create' ? 'create' : 'list'));
        }
    }, [masterDetailOnly]);

    useEffect(() => {
        if (masterDetailOnly) {
            setActions(null);
        }
    }, [masterDetailOnly, setActions]);

    useEffect(() => {
        const persisted = readStore(persistKey, []);
        setCreatedRows(Array.isArray(persisted) ? persisted : []);
    }, [persistKey]);

    useEffect(() => {
        writeStore(persistKey, createdRows);
    }, [persistKey, createdRows]);

    useEffect(() => {
        writeStore(uiPersistKey, {
            mode,
            selectedId
        });
    }, [uiPersistKey, mode, selectedId]);

    const rows = useMemo(() => {
        const baseRows = Array.isArray(data) ? data : [];
        if (!createdRows.length) {
            return baseRows;
        }
        const baseIds = new Set(baseRows.map((item) => String(item?.id)));
        const uniqueCreatedRows = createdRows.filter((item) => !baseIds.has(String(item?.id)));
        return [...uniqueCreatedRows, ...baseRows];
    }, [createdRows, data]);

    useEffect(() => {
        if (mode === 'detail' && selectedId !== null && !rows.some((item) => String(item.id) === String(selectedId))) {
            setMode('list');
            setSelectedId(null);
        }
    }, [mode, selectedId, rows]);

    useEffect(() => {
        if (masterDetailOnly && mode === 'list') {
            setMode('detail');
        }
    }, [masterDetailOnly, mode]);

    useEffect(() => {
        if ((mode === 'detail' || masterDetailOnly) && selectedId === null && rows.length > 0) {
            setSelectedId(rows[0].id);
        }
    }, [masterDetailOnly, mode, rows, selectedId]);

    if (mode === 'create' && CreateComponent) {
        return (
            <div className="h-full bg-white">
                <CreateComponent
                    onCancel={() => setMode('list')}
                    onSave={(payload) => {
                        const createdRow = buildCreatedEntityRow({
                            moduleKey: title,
                            label: title,
                            payload,
                            columns,
                            existingCount: rows.length
                        });
                        setCreatedRows((prev) => [createdRow, ...prev]);
                        setSelectedId(createdRow.id);
                        onCreateSaved?.(createdRow);
                        setMode('detail');
                    }}
                />
            </div>
        );
    }

    if (mode === 'detail' || masterDetailOnly) {
        return (
            <EntityMasterDetailPage
                listTitle={title}
                listData={rows}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onCollapse={masterDetailOnly ? null : () => setMode('list')}
                sections={detailSections || undefined}
                showAddButton={Boolean(CreateComponent && showAddButton)}
                onAdd={() => setMode('create')}
                renderDetailHeader={renderDetailHeader}
                renderDetailContent={renderDetailContent}
                listItemRenderer={listItemRenderer}
            />
        );
    }

    return (
        <StandardBusinessLayout
            title={title}
            filterOptions={filterOptions}
            showFilters={false}
            showGridToolbar={false}
            setHeaderActions={setActions}
            onCreate={CreateComponent && showAddButton ? () => setMode('create') : undefined}
            onRowDoubleClick={(row) => {
                setSelectedId(row?.id);
                setMode('detail');
            }}
            columns={columns}
            data={rows}
        />
    );
}
