/**
 * DataPage - 数据记录管理
 * 
 * 🏢 角色：企业数据中心
 * 📝 职责：管理企业的各类活动数据（如用电量、材料消耗等）。
 */
import React from 'react';
import { dataRecordData } from '../../../data/mockData';
import CreateDataPage from '../create/CreateDataPage';
import { useNotification } from '../../../context/NotificationContext';
import EntityModulePage from '../shared/EntityModulePage';

const DataPage = () => {
    const { addNotification } = useNotification();

    const filterOptions = {
        types: [],
        statuses: []
    };

    const columns = [
        { title: '记录名称', key: 'name', width: '20%', className: 'font-medium' },
        { title: '数值', key: 'value', width: '10%', className: 'text-right' },
        { title: '单位', key: 'unit', width: '10%', className: 'text-sm text-gray-500' },
        { title: '周期', key: 'period', width: '15%', className: 'text-sm text-gray-500' },
        { title: '地点', key: 'location', width: '15%', className: 'text-sm text-gray-500' },
        { title: '证明材料', key: 'proof', width: '15%', className: 'text-sm text-gray-500' },
        { title: '更新时间', key: 'updatedAt', width: '15%', className: 'text-sm text-gray-500' }
    ];

    return (
        <EntityModulePage
            title="数据记录"
            filterOptions={filterOptions}
            createComponent={CreateDataPage}
            onCreateSaved={(data) => {
                addNotification(`数据记录「${data?.name || '未命名记录'}」已保存（演示）`, 'success');
            }}
            columns={columns}
            data={dataRecordData}
        />
    );
};

export default DataPage;
