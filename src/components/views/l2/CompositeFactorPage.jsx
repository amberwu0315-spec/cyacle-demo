/**
 * CompositeFactorPage - 复合因子管理
 * 
 * 🏢 角色：配方库 (Composite Factors)
 * 📝 职责：管理组合的环境影响因子（如“中国电网混合排放因子”）。
 * 1. 它通常由多个基本流组合而成。
 */
import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import { compositeFactorData } from '../../../data/mockData';

const CompositeFactorPage = () => {
    const { setActions } = usePagePresentation();

    const filterOptions = {
        types: [
            { value: 'emission', label: '排放因子' },
            { value: 'resource', label: '资源因子' },
            { value: 'impact', label: '影响因子' }
        ],
        statuses: [
            { value: 'published', label: '已发布' },
            { value: 'draft', label: '草稿' }
        ]
    };

    const columns = [
        { title: '中文名称', key: 'nameCN', width: '25%', className: 'font-medium' },
        { title: '英文名称', key: 'nameEN', width: '25%', className: 'text-sm text-gray-500' },
        { title: '关联元件', key: 'refComponent', width: '15%', className: 'text-sm text-gray-500' },
        { title: '来源库', key: 'sourceDB', width: '15%', className: 'text-sm text-gray-500' },
        { title: '时间', key: 'time', width: '10%', className: 'text-sm text-gray-500' },
        { title: '地理', key: 'geo', width: '10%', className: 'text-sm text-gray-500' },
        { title: '技术', key: 'tech', width: '10%', className: 'text-sm text-gray-500' }
    ];

    return (
        <StandardBusinessLayout
            title="复合因子"
            filterOptions={filterOptions}
            setHeaderActions={setActions}
            columns={columns}
            data={compositeFactorData}
        />
    );
};

export default CompositeFactorPage;
