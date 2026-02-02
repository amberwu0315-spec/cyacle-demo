import React, { useEffect } from 'react';
import { useHeaderContext } from '../../../context/HeaderContext';

const BasisPage = () => {
    const { setActions, setTitleOverride, setLayoutConfig } = useHeaderContext();

    useEffect(() => {
        // 1. Set Title
        setTitleOverride('My Green Project');
        setLayoutConfig('title-only');

        // 2. Set Actions (None for Basis)
        setActions(null);

        return () => {
            setActions(null);
            setTitleOverride(null);
        };
    }, [setActions, setTitleOverride, setLayoutConfig]);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">基础 (Basis)</h2>
            <p className="text-gray-600">项目基础信息配置。</p>
        </div>
    );
};

export default BasisPage;
