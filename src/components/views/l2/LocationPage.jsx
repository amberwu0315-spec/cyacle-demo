/**
 * LocationPage - 地点管理
 * 
 * 🏢 角色：企业地点库
 * 📝 职责：管理企业的生产地点、仓库等位置信息。
 */
import React, { useState } from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import { IconPlus } from '@tabler/icons-react';
import { locationData } from '../../../data/mockData';
import CreateLocationPage from '../create/CreateLocationPage';

const LocationPage = () => {
    const { setActions } = usePagePresentation();
    const [isCreateMode, setIsCreateMode] = useState(false);

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

    if (isCreateMode) {
        return (
            <div className="h-full bg-white">
                <CreateLocationPage
                    onCancel={() => setIsCreateMode(false)}
                    onSave={(data) => {
                        console.log('Save Location:', data);
                        setIsCreateMode(false);
                    }}
                />
            </div>
        );
    }

    return (
        <StandardBusinessLayout
            title="地点列表"
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
            data={locationData}
        />
    );
};

export default LocationPage;
