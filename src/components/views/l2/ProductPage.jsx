/**
 * ProductPage - 产品管理
 * 
 * 🏢 角色：企业产品库
 * 📝 职责：管理企业生产的产品信息。
 */
import React, { useState } from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import { IconPlus } from '@tabler/icons-react';
import { productFooterData } from '../../../data/mockData';
import CreateProductPage from '../create/CreateProductPage';

const ProductPage = () => {
    const { setActions } = usePagePresentation();
    const [isCreateMode, setIsCreateMode] = useState(false);

    const filterOptions = {
        types: [],
        statuses: []
    };

    const columns = [
        { title: '产品名称', key: 'name', width: '25%', className: 'font-medium' },
        { title: '规格型号', key: 'spec', width: '20%', className: 'text-sm text-gray-500' },
        { title: '描述', key: 'desc', width: '25%', className: 'text-sm text-gray-500' },
        { title: '创建时间', key: 'createdAt', width: '15%', className: 'text-sm text-gray-500' },
        { title: '创建人', key: 'creator', width: '15%', className: 'text-sm text-gray-500' }
    ];

    if (isCreateMode) {
        return (
            <div className="h-full bg-white">
                <CreateProductPage
                    onCancel={() => setIsCreateMode(false)}
                    onSave={(data) => {
                        console.log('Save Product:', data);
                        setIsCreateMode(false);
                    }}
                />
            </div>
        );
    }

    return (
        <StandardBusinessLayout
            title="产品列表"
            filterOptions={filterOptions}
            showFilters={false}
            showGridToolbar={false}
            setHeaderActions={(actions) => {
                setActions(
                    <button
                        onClick={() => setIsCreateMode(true)}
                        className="flex items-center gap-1.5 h-btn-md px-btn-x-md text-[13px] font-medium text-white bg-primary-action hover:bg-primary-emphasize rounded-sm transition-colors"
                    >
                        <IconPlus size={16} />
                        <span>创建</span>
                    </button>
                );
            }}
            columns={columns}
            data={productFooterData}
        />
    );
};

export default ProductPage;
