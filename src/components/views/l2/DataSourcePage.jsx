/**
 * DataSourcePage - 数据来源管理
 * 
 * 🏢 角色：数据源登记
 * 📝 职责：管理数据的来源设备或系统（如电表、ERP系统）。
 */
import React, { useState } from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import { IconPlus } from '@tabler/icons-react';
import { dataSourceData } from '../../../data/mockData';
import CreateDataSourcePage from '../create/CreateDataSourcePage';

const DataSourcePage = () => {
    const { setActions } = usePagePresentation();
    const [isCreateMode, setIsCreateMode] = useState(false);

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

    if (isCreateMode) {
        return (
            <div className="h-full bg-white">
                <CreateDataSourcePage
                    onCancel={() => setIsCreateMode(false)}
                    onSave={(data) => {
                        console.log('Save Data Source:', data);
                        setIsCreateMode(false);
                    }}
                />
            </div>
        );
    }

    return (
        <StandardBusinessLayout
            title="数据来源"
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
            data={dataSourceData}
        />
    );
};

export default DataSourcePage;
