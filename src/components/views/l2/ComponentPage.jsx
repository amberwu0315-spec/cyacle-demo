import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { useHeaderContext } from '../../../context/HeaderContext';

const ComponentPage = () => {
    const { setActions } = useHeaderContext();

    const filterOptions = {
        types: [
            { value: 'mechanical', label: '机械元件' },
            { value: 'electronic', label: '电子元件' },
            { value: 'structural', label: '结构元件' }
        ],
        statuses: [
            { value: 'in_use', label: '使用中' },
            { value: 'obsolete', label: '已淘汰' }
        ]
    };

    return <StandardBusinessLayout title="元件" filterOptions={filterOptions} setHeaderActions={setActions} />;
};

export default ComponentPage;
