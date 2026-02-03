import React from 'react';
import StandardFooter from './StandardFooter';

const ProductFooter = ({ onClose }) => {
    const filterOptions = {
        types: [
            { value: 'material', label: '原材料' },
            { value: 'component', label: '部件' },
            { value: 'product', label: '成品' }
        ],
        statuses: [
            { value: 'active', label: '启用' },
            { value: 'disabled', label: '停用' }
        ]
    };

    return <StandardFooter title="产品" onClose={onClose} filterOptions={filterOptions} />;
};

export default ProductFooter;
