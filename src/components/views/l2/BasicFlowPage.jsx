/**
 * BasicFlowPage - 基本流管理
 * 
 * 🏢 角色：原材料库 (Elementary Flows)
 * 📝 职责：管理最基础的物质流数据（如 CO2, CH4, 水）。
 * 1. 通常作为背景数据被引用。
 * 2. 属于 DatabaseManagement 的子模块。
 */
import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import { basicFlowData } from '../../../data/mockData';

const BasicFlowPage = () => {
    const { setActions } = usePagePresentation();

    const filterOptions = {
        types: [
            { value: 'material', label: '物料流' },
            { value: 'energy', label: '能源流' },
            { value: 'waste', label: '废物流' }
        ],
        statuses: [
            { value: 'active', label: '已启用' },
            { value: 'draft', label: '草稿' }
        ]
    };

    const columns = [
        { title: '中文名称', key: 'nameCN', width: '20%', className: 'font-medium' },
        { title: '英文名称', key: 'nameEN', width: '20%', className: 'text-sm text-gray-500' },
        { title: '来源', key: 'source', width: '10%', className: 'text-sm text-gray-500' },
        { title: '来源库', key: 'sourceDB', width: '15%', className: 'text-sm text-gray-500' },
        { title: '类型', key: 'type', width: '10%', className: 'text-sm text-gray-500' },
        { title: '时间', key: 'time', width: '10%', className: 'text-sm text-gray-500' },
        { title: '地理', key: 'geo', width: '15%', className: 'text-sm text-gray-500' }
    ];

    return (
        <StandardBusinessLayout
            title="基本流"
            filterOptions={filterOptions}
            setHeaderActions={setActions}
            columns={columns}
            data={basicFlowData}
        />
    );
};

export default BasicFlowPage;
