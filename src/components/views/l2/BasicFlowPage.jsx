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

    return <StandardBusinessLayout title="基本流" filterOptions={filterOptions} setHeaderActions={setActions} />;
};

export default BasicFlowPage;
