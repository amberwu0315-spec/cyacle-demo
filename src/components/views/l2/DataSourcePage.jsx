/**
 * DataSourcePage - 数据来源管理
 * 
 * 🏢 角色：数据源登记
 * 📝 职责：管理数据的来源设备或系统（如电表、ERP系统）。
 */
import React from 'react';
import { dataSourceData } from '../../../data/mockData';
import CreateDataSourcePage from '../create/CreateDataSourcePage';
import { useNotification } from '../../../context/NotificationContext';
import EntityModulePage from '../shared/EntityModulePage';

const DataSourcePage = () => {
    const { addNotification } = useNotification();

    const filterOptions = {
        types: [],
        statuses: []
    };

    const columns = [
        { title: '数据源名称', key: 'name', width: '20%', className: 'font-medium' },
        { title: '类型', key: 'type', width: '15%', className: 'text-sm text-gray-500' },
        { title: '代码/编号', key: 'code', width: '15%', className: 'text-sm text-gray-500' },
        { title: '不确定度', key: 'uncertainty', width: '10%', className: 'text-sm text-gray-500' },
        { title: '关联记录数', key: 'linkedRecords', width: '10%', className: 'text-sm text-gray-500' },
        { title: '创建人', key: 'creator', width: '15%', className: 'text-sm text-gray-500' },
        { title: '更新时间', key: 'updatedAt', width: '15%', className: 'text-sm text-gray-500' }
    ];

    return (
        <EntityModulePage
            title="数据来源"
            filterOptions={filterOptions}
            createComponent={CreateDataSourcePage}
            onCreateSaved={(data) => {
                addNotification(`数据源「${data?.name || '未命名数据源'}」已保存（演示）`, 'success');
            }}
            columns={columns}
            data={dataSourceData}
        />
    );
};

export default DataSourcePage;
