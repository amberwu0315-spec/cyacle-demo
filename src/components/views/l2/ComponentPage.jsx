/**
 * ComponentPage - 元件管理
 * 
 * 🏢 角色：半成品库 (Components)
 * 📝 职责：管理可复用的功能组件（如“电池模组”、“电机”）。
 * 1. 它是连接基础流和完整产品的中间层。
 */
import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';

const ComponentPage = () => {
    const { setActions } = usePagePresentation();

    const filterOptions = {
        types: [
            { value: 'mechanical', label: '机械元件' },
            { value: 'electronic', label: '电子元件' },
            { value: 'structural', label: '结构元件' }
        ],
        statuses: [
            { value: 'in_use', label: '使用中' },
            { value: 'obsolete', label: '已淘汰' }
        ]
    };

    return <StandardBusinessLayout title="元件" filterOptions={filterOptions} setHeaderActions={setActions} />;
};

export default ComponentPage;
