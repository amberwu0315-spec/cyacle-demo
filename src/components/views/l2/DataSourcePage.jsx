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
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import { PlainTable, TinyToolbar } from '../shared/BackgroundDataWidgets';

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

    const renderSourceListItem = (item, isSelected) => (
        <div className={`px-3 py-2 border-b border-slate-100 ${isSelected ? 'bg-[#dff5fa]' : 'hover:bg-slate-50'}`}>
            <div className="text-sm font-medium text-slate-800 truncate">{item?.name || '-'}</div>
            <div className="text-xs text-slate-500 mt-1 truncate">{item?.updatedAt || '-'}</div>
        </div>
    );

    const renderDetailHeader = ({ selectedItem }) => (
        <h2 className="text-sm font-semibold text-slate-800 truncate">
            {selectedItem?.name || '未命名数据源'}
        </h2>
    );

    const renderDetailContent = ({ selectedItem }) => {
        const relatedRows = [
            { id: 'data-1', name: '数据记录名称', value: '1', unit: 'kg' }
        ];

        return (
            <div className="space-y-3">
                <ContentModule>
                    <ModuleHeader title="基本信息" />
                    <div className="p-4 max-w-[620px] grid grid-cols-[140px_1fr] gap-y-4 text-sm">
                        <div className="text-slate-500">类型:</div>
                        <div className="text-slate-800">{selectedItem?.type || '-'}</div>
                        <div className="text-slate-500">配置code:</div>
                        <div className="text-slate-800">{selectedItem?.code || '-'}</div>
                        <div className="text-slate-500">不确定性:</div>
                        <div className="text-slate-800">{selectedItem?.uncertainty || '-'}</div>
                        <div className="text-slate-500">不确定性证明文件:</div>
                        <div className="text-[#0EA5B7]">选择文档(0/1)</div>
                        <div className="text-slate-500">描述:</div>
                        <div className="text-slate-800">{selectedItem?.description || '-'}</div>
                    </div>
                </ContentModule>

                <ContentModule>
                    <ModuleHeader
                        title="关联数据记录"
                        actions={<button className="text-[#0EA5B7] text-sm">+ 创建并关联</button>}
                    />
                    <TinyToolbar placeholder="名称或其他" />
                    <PlainTable
                        columns={[
                            { key: 'name', title: '名称' },
                            { key: 'value', title: '数值' },
                            { key: 'unit', title: '单位' }
                        ]}
                        rows={relatedRows}
                    />
                </ContentModule>
            </div>
        );
    };

    return (
        <EntityModulePage
            title="数据来源对象"
            filterOptions={filterOptions}
            createComponent={CreateDataSourcePage}
            onCreateSaved={(data) => {
                addNotification(`数据源「${data?.name || '未命名数据源'}」已保存（演示）`, 'success');
            }}
            columns={columns}
            data={dataSourceData}
            renderDetailHeader={renderDetailHeader}
            renderDetailContent={renderDetailContent}
            listItemRenderer={renderSourceListItem}
        />
    );
};

export default DataSourcePage;
