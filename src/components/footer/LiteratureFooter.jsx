import React from 'react';
import StandardFooter from './StandardFooter';

const LiteratureFooter = ({ onClose }) => {
    const filterOptions = {
        types: [
            { value: 'journal', label: '期刊论文' },
            { value: 'standard', label: '标准文件' },
            { value: 'report', label: '研究报告' }
        ],
        statuses: [
            { value: 'indexed', label: '已索引' },
            { value: 'pending', label: '待索引' }
        ]
    };

    return <StandardFooter title="文献" onClose={onClose} filterOptions={filterOptions} />;
};

export default LiteratureFooter;
