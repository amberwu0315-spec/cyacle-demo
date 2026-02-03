import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { useHeaderContext } from '../../../context/HeaderContext';

const LiteratureFactorPage = () => {
    const { setActions } = useHeaderContext();

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
