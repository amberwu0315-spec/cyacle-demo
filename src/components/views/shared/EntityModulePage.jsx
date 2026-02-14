import React, { useState } from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import EntityMasterDetailPage from './EntityMasterDetailPage';
import { usePagePresentation } from '../../../context/PagePresentationContext';

export default function EntityModulePage({
    title,
    filterOptions = { types: [], statuses: [] },
    columns = [],
    data = [],
    createComponent: CreateComponent = null,
    onCreateSaved = null,
    detailSections = null
}) {
    const { setActions } = usePagePresentation();
    const [mode, setMode] = useState('list'); // list | create | detail
    const [selectedId, setSelectedId] = useState(null);

    if (mode === 'create' && CreateComponent) {
        return (
            <div className="h-full bg-white">
                <CreateComponent
                    onCancel={() => setMode('list')}
                    onSave={(payload) => {
                        onCreateSaved?.(payload);
                        setMode('list');
                    }}
                />
            </div>
        );
    }

    if (mode === 'detail') {
        return (
            <EntityMasterDetailPage
                listTitle={title}
                listData={data}
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
            onCreate={CreateComponent ? () => setMode('create') : undefined}
            onRowDoubleClick={(row) => {
                setSelectedId(row?.id);
                setMode('detail');
            }}
            columns={columns}
            data={data}
        />
    );
}
