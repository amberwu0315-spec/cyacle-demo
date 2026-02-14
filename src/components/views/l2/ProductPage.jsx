/**
 * ProductPage - 产品管理
 * 
 * 🏢 角色：企业产品库
 * 📝 职责：管理企业生产的产品信息。
 */
import React from 'react';
import { productFooterData } from '../../../data/mockData';
import CreateProductPage from '../create/CreateProductPage';
import { useNotification } from '../../../context/NotificationContext';
import EntityModulePage from '../shared/EntityModulePage';

const ProductPage = () => {
    const { addNotification } = useNotification();

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

    return (
        <EntityModulePage
            title="产品列表"
            filterOptions={filterOptions}
            createComponent={CreateProductPage}
            onCreateSaved={(data) => {
                addNotification(`产品「${data?.name || '未命名产品'}」已保存（演示）`, 'success');
            }}
            columns={columns}
            data={productFooterData}
        />
    );
};

export default ProductPage;
