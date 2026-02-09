/**
 * LiteraturePage - 文献管理
 * 
 * 🏢 角色：图书馆 (Library)
 * 📝 职责：管理所有的参考文献（PDF/Link）。
 * 1. 作为数据来源的凭证。
 */
import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';

const LiteraturePage = () => {
    const { setActions } = usePagePresentation();

    const filterOptions = {
        types: [
            { value: 'journal', label: '期刊论文' },
            { value: 'standard', label: '标准文件' },
            { value: 'report', label: '研究报告' }
        ],
        statuses: [
            { value: 'active', label: '有效' },
            { value: 'archived', label: '已归档' }
        ]
    };

    return <StandardBusinessLayout title="文献" filterOptions={filterOptions} setHeaderActions={setActions} />;
};

export default LiteraturePage;
