import React from 'react';
import StandardFooter from './StandardFooter';

const LocationFooter = ({ onClose }) => {
    const filterOptions = {
        types: [
            { value: 'production', label: '生产地' },
            { value: 'warehouse', label: '仓储地' },
            { value: 'sales', label: '销售地' }
        ],
        statuses: [
            { value: 'active', label: '运营中' },
            { value: 'closed', label: '已关闭' }
        ]
    };

    return <StandardFooter title="地点" onClose={onClose} filterOptions={filterOptions} />;
};

export default LocationFooter;
