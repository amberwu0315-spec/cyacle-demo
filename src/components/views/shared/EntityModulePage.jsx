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
    detailSections = null
}) {
    const { setActions } = usePagePresentation();
    const persistKey = `cyacle:created:${title}`;
    const uiPersistKey = `cyacle:page-ui:${title}`;
    const [mode, setMode] = useState(() => {
        const saved = readStore(uiPersistKey, {});
        return saved?.mode || 'list';
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

    if (mode === 'detail') {
        return (
            <EntityMasterDetailPage
                listTitle={title}
                listData={rows}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onCollapse={() => setMode('list')}
                sections={detailSections || undefined}
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
