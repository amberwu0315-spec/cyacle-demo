import React from 'react';
import StandardFooter from './StandardFooter';

const BasicFlowFooter = ({ onClose }) => {
    const filterOptions = {
        types: [
            { value: 'material', label: '物质流' },
            { value: 'energy', label: '能量流' }
        ],
        statuses: [
            { value: 'published', label: '已发布' },
            { value: 'draft', label: '草稿' }
        ]
    };

    return <StandardFooter title="基本流" onClose={onClose} filterOptions={filterOptions} />;
};

export default BasicFlowFooter;
