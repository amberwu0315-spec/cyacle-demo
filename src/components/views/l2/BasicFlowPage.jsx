import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { useHeaderContext } from '../../../context/HeaderContext';

const BasicFlowPage = () => {
    const { setActions } = useHeaderContext();

    const filterOptions = {
        types: [
            { value: 'material', label: '物料流' },
            { value: 'energy', label: '能源流' },
            { value: 'waste', label: '废物流' }
        ],
        statuses: [
            { value: 'active', label: '已启用' },
            { value: 'draft', label: '草稿' }
        ]
    };

    return <StandardBusinessLayout title="基本流" filterOptions={filterOptions} setHeaderActions={setActions} />;
};

export default BasicFlowPage;
