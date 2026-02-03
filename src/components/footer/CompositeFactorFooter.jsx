import React from 'react';
import StandardFooter from './StandardFooter';

const CompositeFactorFooter = ({ onClose }) => {
    const filterOptions = {
        types: [
            { value: 'calculated', label: '计算型' },
            { value: 'derived', label: '派生型' }
        ],
        statuses: [
            { value: 'active', label: '启用' },
            { value: 'inactive', label: '停用' }
        ]
    };

    return <StandardFooter title="复合因子" onClose={onClose} filterOptions={filterOptions} />;
};

export default CompositeFactorFooter;
