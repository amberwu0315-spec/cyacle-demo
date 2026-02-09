/**
 * LiteratureFactorPage - 文献因子库
 * 
 * 🏢 角色：外部参考资料室 (External References)
 * 📝 职责：管理从文献中提取的排放因子数据。
 * 1. 结构类似 CompositeFactorPage，但数据来源不同。
 */
import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';

const LiteratureFactorPage = () => {
    const { setActions } = usePagePresentation();

    const filterOptions = {
        types: [
            { value: 'gwp', label: 'GWP因子' },
            { value: 'ap', label: 'AP因子' },
            { value: 'ep', label: 'EP因子' }
        ],
        statuses: [
            { value: 'verified', label: '已验证' },
            { value: 'pending', label: '待审核' }
        ]
    };

    return <StandardBusinessLayout title="文献因子" filterOptions={filterOptions} setHeaderActions={setActions} />;
};

export default LiteratureFactorPage;
