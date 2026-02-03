import React from 'react';
import StandardFooter from './StandardFooter';

const ComponentFooter = ({ onClose }) => {
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

    return <StandardFooter title="元件" onClose={onClose} filterOptions={filterOptions} />;
};

export default ComponentFooter;
