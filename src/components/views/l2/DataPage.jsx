/**
 * DataPage - 数据记录管理
 * 
 * 🏢 角色：企业数据中心
 * 📝 职责：管理企业的各类活动数据（如用电量、材料消耗等）。
 */
import React, { useState } from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import { IconPlus } from '@tabler/icons-react';
import { dataRecordData } from '../../../data/mockData';
import CreateDataPage from '../create/CreateDataPage';

const DataPage = () => {
    const { setActions } = usePagePresentation();
    const [isCreateMode, setIsCreateMode] = useState(false);

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

    if (isCreateMode) {
        return (
            <div className="h-full bg-white">
                <CreateDataPage
                    onCancel={() => setIsCreateMode(false)}
                    onSave={(data) => {
                        console.log('Save Data Record:', data);
                        setIsCreateMode(false);
                    }}
                />
            </div>
        );
    }

    return (
        <StandardBusinessLayout
            title="数据记录"
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
            data={dataRecordData}
        />
    );
};

export default DataPage;
