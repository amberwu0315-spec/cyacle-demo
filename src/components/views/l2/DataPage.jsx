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
import { ContentModule, ModuleHeader } from '../../common/ContentModule';

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

    const renderDataListItem = (item, isSelected) => (
        <div className={`px-3 py-2 border-b border-slate-100 ${isSelected ? 'bg-[#dff5fa]' : 'hover:bg-slate-50'}`}>
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <div className="text-sm font-medium text-slate-800 truncate">{item?.name || '-'}</div>
                    <div className="text-xs text-slate-600 mt-1 truncate">{item?.value || '-'} {item?.unit || ''}</div>
                </div>
                <div className="text-right shrink-0">
                    <div className="text-xs text-slate-500">{item?.period || '-'}</div>
                    <div className="text-xs text-slate-400 mt-1">{item?.location || '-'}</div>
                </div>
            </div>
        </div>
    );

    const renderDetailHeader = ({ selectedItem }) => (
        <h2 className="text-sm font-semibold text-slate-800 truncate">
            {selectedItem?.name || '未命名数据记录'}
        </h2>
    );

    const renderDetailContent = ({ selectedItem }) => (
        <div className="space-y-3">
            <ContentModule>
                <div className="p-5 flex items-center justify-between">
                    <div className="text-[48px] leading-none font-semibold text-slate-800">
                        {selectedItem?.value || '0'}
                        <span className="text-[#2FB355] text-[48px] ml-2">{selectedItem?.unit || ''}</span>
                        <span className="text-3xl text-slate-600 ml-4">({selectedItem?.value || '0'} {selectedItem?.unit || ''})</span>
                    </div>
                    <button className="h-10 px-4 border border-slate-300 rounded text-slate-700 text-sm">
                        手动录入
                    </button>
                </div>
            </ContentModule>

            <ContentModule>
                <ModuleHeader title="证明文档" />
                <div className="p-4">
                    <div className="w-44 h-52 border border-slate-200 rounded bg-white flex flex-col items-center justify-center text-slate-700">
                        <div className="text-5xl leading-none">+</div>
                        <div className="text-3xl leading-none mt-1">文档</div>
                    </div>
                </div>
            </ContentModule>

            <ContentModule>
                <ModuleHeader title="数据描述" />
                <div className="p-4 text-4xl leading-relaxed text-slate-800">
                    对应目标产品原材料的运输距离
                </div>
                <div className="px-4 pb-4 text-4xl text-slate-700">
                    Corresponding transportation distance of raw materials for the target product
                </div>
            </ContentModule>

            <ContentModule>
                <ModuleHeader title="下游数据" />
                <div className="p-8 text-center text-3xl text-slate-500">暂无下游数据</div>
            </ContentModule>

            <ContentModule>
                <ModuleHeader title="基本信息" />
                <div className="p-4 grid grid-cols-[120px_1fr] gap-y-3 text-sm">
                    <div className="text-slate-500">时间区间</div>
                    <div className="text-slate-800">{selectedItem?.period || '-'}</div>
                    <div className="text-slate-500">相关地点</div>
                    <div className="text-[#0EA5B7]">{selectedItem?.location || '-'}</div>
                    <div className="text-slate-500">名称(英文)</div>
                    <div className="text-slate-800">Aluminum Alloy Bending Strip Transportation</div>
                    <div className="text-slate-500">来源类型</div>
                    <div className="text-slate-800">基于部分专业模型的估算(不确定性25%)</div>
                    <div className="text-slate-500">采购成本</div>
                    <div className="text-slate-800">-</div>
                </div>
            </ContentModule>
        </div>
    );

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
            renderDetailHeader={renderDetailHeader}
            renderDetailContent={renderDetailContent}
            listItemRenderer={renderDataListItem}
        />
    );
};

export default DataPage;
