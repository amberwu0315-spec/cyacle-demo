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
import { ContentModule, ModuleHeader } from '../../common/ContentModule';

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

    const renderLocationListItem = (item, isSelected) => (
        <div className={`px-3 py-2 border-b border-slate-100 ${isSelected ? 'bg-[#dff5fa]' : 'hover:bg-slate-50'}`}>
            <div className="flex items-center gap-2">
                <span className="text-[11px] px-1.5 h-5 inline-flex items-center rounded bg-[#0EA5B7] text-white">
                    默认
                </span>
                <div className="text-sm font-medium text-slate-800 truncate">{item?.name || '-'}</div>
                <div className="ml-auto text-xs text-slate-400 truncate">{item?.shortName || '-'}</div>
            </div>
            <div className="text-xs text-slate-500 mt-1 truncate">{item?.address || '-'}</div>
        </div>
    );

    const renderDetailHeader = ({ selectedItem }) => (
        <div className="w-full flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800 truncate">
                {selectedItem?.name || '未命名地点'}
            </h2>
            <div className="text-xs text-slate-400">自建</div>
        </div>
    );

    const renderDetailContent = ({ selectedItem }) => (
        <div className="space-y-3">
            <ContentModule>
                <ModuleHeader title="详细地址" />
                <div className="p-4 space-y-3">
                    <div className="text-sm text-slate-700">
                        地图定位: <span className="ml-2 text-slate-900">35.748329 °N，114.297305 °E</span>
                    </div>
                    <div className="h-80 border border-slate-200 bg-[linear-gradient(135deg,#eaf2f7,#dce8f0)] rounded" />
                    <div className="grid grid-cols-[90px_1fr] gap-y-3 text-sm">
                        <div className="text-slate-500">所在地:</div>
                        <div>
                            <div className="text-slate-800">{selectedItem?.region || '-'}</div>
                            <div className="text-slate-700 mt-1">Asia-China-Henan-HeBiShi-QiBinQu</div>
                        </div>
                        <div className="text-slate-500">详细地址:</div>
                        <div>
                            <div className="text-slate-800">{selectedItem?.address || '-'}</div>
                            <div className="text-slate-700 mt-1">Henan Province, Hebi City</div>
                        </div>
                    </div>
                </div>
            </ContentModule>

            <ContentModule>
                <ModuleHeader title="基础信息" />
                <div className="p-4 grid grid-cols-[110px_1fr] gap-y-3 text-sm">
                    <div className="text-slate-500">地点类型:</div>
                    <div>
                        <div className="text-slate-800">{selectedItem?.locationType || '-'}</div>
                        <div className="text-slate-700 mt-1">Manufacturing Site</div>
                    </div>
                    <div className="text-slate-500">名称(英文):</div>
                    <div className="text-slate-800">{selectedItem?.nameEN || '-'}</div>
                    <div className="text-slate-500">地点简称:</div>
                    <div>
                        <div className="text-slate-800">{selectedItem?.shortName || '-'}</div>
                        <div className="text-slate-700 mt-1">Demonstration doors and windows</div>
                    </div>
                    <div className="text-slate-500">数据维护默认地址:</div>
                    <div>
                        <div className="inline-flex h-7 w-14 rounded-full bg-[#0EA5B7] relative align-middle">
                            <span className="absolute right-1 top-1 w-5 h-5 rounded-full bg-white border border-slate-200" />
                        </div>
                    </div>
                </div>
            </ContentModule>
        </div>
    );

    return (
        <EntityModulePage
            title="地点管理"
            filterOptions={filterOptions}
            createComponent={CreateLocationPage}
            onCreateSaved={(data) => {
                addNotification(`地点「${data?.name || '未命名地点'}」已保存（演示）`, 'success');
            }}
            columns={columns}
            data={locationData}
            renderDetailHeader={renderDetailHeader}
            renderDetailContent={renderDetailContent}
            listItemRenderer={renderLocationListItem}
        />
    );
};

export default LocationPage;
