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

    return <StandardBusinessLayout title="复合因子" filterOptions={filterOptions} setHeaderActions={setActions} />;
};

export default CompositeFactorPage;
