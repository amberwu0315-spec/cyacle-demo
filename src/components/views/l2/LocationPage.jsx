/**
 * LocationPage - 地点管理
 * 
 * 🏢 角色：企业地点库
 * 📝 职责：管理企业的生产地点、仓库等位置信息。
 */
import React from 'react';
import { locationData } from '../../../data/mockData';
import CreateLocationPage from '../create/CreateLocationPage';
import { useNotification } from '../../../context/NotificationContext';
import EntityModulePage from '../shared/EntityModulePage';

const LocationPage = () => {
    const { addNotification } = useNotification();

    const filterOptions = {
        types: [],
        statuses: []
    };

    const columns = [
        { title: '地点名称', key: 'name', width: '20%', className: 'font-medium' },
        { title: '简称', key: 'shortName', width: '10%', className: 'text-sm text-gray-500' },
        { title: '类型', key: 'locationType', width: '15%', className: 'text-sm text-gray-500' },
        { title: '区域', key: 'region', width: '20%', className: 'text-sm text-gray-500' },
        { title: '地址', key: 'address', width: '25%', className: 'text-sm text-gray-500' },
        { title: '创建人', key: 'creator', width: '10%', className: 'text-sm text-gray-500' }
    ];

    return (
        <EntityModulePage
            title="地点列表"
            filterOptions={filterOptions}
            createComponent={CreateLocationPage}
            onCreateSaved={(data) => {
                addNotification(`地点「${data?.name || '未命名地点'}」已保存（演示）`, 'success');
            }}
            columns={columns}
            data={locationData}
        />
    );
};

export default LocationPage;
