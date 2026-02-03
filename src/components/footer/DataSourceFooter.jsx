import React from 'react';
import StandardFooter from './StandardFooter';

const DataSourceFooter = ({ onClose }) => {
    const filterOptions = {
        types: [
            { value: 'database', label: '数据库' },
            { value: 'literature', label: '文献' },
            { value: 'measurement', label: '实测' }
        ],
        statuses: [
            { value: 'active', label: '启用' },
            { value: 'archived', label: '归档' }
        ]
    };

    return <StandardFooter title="数据源" onClose={onClose} filterOptions={filterOptions} />;
};

export default DataSourceFooter;
