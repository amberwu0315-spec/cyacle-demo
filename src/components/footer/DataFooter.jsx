import React from 'react';
import StandardFooter from './StandardFooter';

const DataFooter = ({ onClose }) => {
    const filterOptions = {
        types: [
            { value: 'input', label: '输入数据' },
            { value: 'output', label: '输出数据' }
        ],
        statuses: [
            { value: 'verified', label: '已核验' },
            { value: 'unverified', label: '待核验' }
        ]
    };

    return <StandardFooter title="数据记录" onClose={onClose} filterOptions={filterOptions} />;
};

export default DataFooter;
