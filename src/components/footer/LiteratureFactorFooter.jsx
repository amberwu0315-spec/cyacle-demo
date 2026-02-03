import React from 'react';
import StandardFooter from './StandardFooter';

const LiteratureFactorFooter = ({ onClose }) => {
    const filterOptions = {
        types: [
            { value: 'emission', label: '排放因子' },
            { value: 'energy', label: '能源因子' }
        ],
        statuses: [
            { value: 'verified', label: '已审核' },
            { value: 'pending', label: '待审核' }
        ]
    };

    return <StandardFooter title="文献因子" onClose={onClose} filterOptions={filterOptions} />;
};

export default LiteratureFactorFooter;
