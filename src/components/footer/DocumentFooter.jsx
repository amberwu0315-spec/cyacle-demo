import React from 'react';
import StandardFooter from './StandardFooter';

// 文档页面的布局
const DocumentFooter = ({ onClose }) => {
    // 强制使用 docs 作为 moduleKey，以便StandardFooter能够正确地分发到 DocumentPage
    return <StandardFooter moduleKey="docs" onClose={onClose} />;
};

export default DocumentFooter;
