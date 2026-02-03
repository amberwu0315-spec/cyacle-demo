import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { useHeaderContext } from '../../../context/HeaderContext';

const LiteraturePage = () => {
    const { setActions } = useHeaderContext();

    const filterOptions = {
        types: [
            { value: 'journal', label: '期刊论文' },
            { value: 'standard', label: '标准文件' },
            { value: 'report', label: '研究报告' }
        ],
        statuses: [
            { value: 'active', label: '有效' },
            { value: 'archived', label: '已归档' }
        ]
    };

    return <StandardBusinessLayout title="文献" filterOptions={filterOptions} setHeaderActions={setActions} />;
};

export default LiteraturePage;
