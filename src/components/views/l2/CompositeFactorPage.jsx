import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { useHeaderContext } from '../../../context/HeaderContext';

const CompositeFactorPage = () => {
    const { setActions } = useHeaderContext();

    const filterOptions = {
        types: [
            { value: 'emission', label: '排放因子' },
            { value: 'resource', label: '资源因子' },
            { value: 'impact', label: '影响因子' }
        ],
        statuses: [
            { value: 'published', label: '已发布' },
            { value: 'draft', label: '草稿' }
        ]
    };

    return <StandardBusinessLayout title="复合因子" filterOptions={filterOptions} setHeaderActions={setActions} />;
};

export default CompositeFactorPage;
