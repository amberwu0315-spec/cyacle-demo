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
import { literatureData } from '../../../data/mockData';

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

    const columns = [
        { title: '文献名称', key: 'name', width: '40%', className: 'font-medium' },
        { title: '来源', key: 'source', width: '10%', className: 'text-sm text-gray-500' },
        { title: '文献类型', key: 'docType', width: '18%', className: 'text-sm text-gray-500' },
        { title: '出版时间', key: 'publishYear', width: '10%', className: 'text-sm text-gray-500' },
        { title: '期刊名/出版社', key: 'journal', width: '14%', className: 'text-sm text-gray-500' },
        { title: '创建用户', key: 'creator', width: '8%', className: 'text-sm text-gray-500' }
    ];

    return (
        <StandardBusinessLayout
            title="文献"
            filterOptions={filterOptions}
            showFilters={false}
            showGridToolbar={false}
            setHeaderActions={setActions}
            columns={columns}
            data={literatureData}
        />
    );
};

export default LiteraturePage;
