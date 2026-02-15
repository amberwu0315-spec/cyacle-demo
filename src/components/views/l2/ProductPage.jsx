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
import { ContentModule, ModuleHeader } from '../../common/ContentModule';

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

    const renderDetailHeader = ({ selectedItem }) => (
        <div className="w-full flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800 truncate">
                {selectedItem?.name || '未命名产品'}
            </h2>
            <div className="text-xs text-slate-400">自建</div>
        </div>
    );

    const renderProductListItem = (item, isSelected) => (
        <div
            className={`px-3 py-2 border-b border-slate-100 ${isSelected ? 'bg-[#dff5fa]' : 'hover:bg-slate-50'}`}
        >
            <div className="flex items-start gap-2">
                <div className="w-12 h-8 rounded border border-slate-200 bg-gradient-to-br from-slate-200 to-slate-100 shrink-0" />
                <div className="min-w-0">
                    <div className="text-sm text-slate-800 font-medium truncate">{item?.name || '-'}</div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">{item?.spec || '-'}</div>
                </div>
            </div>
        </div>
    );

    const renderDetailContent = ({ selectedItem }) => (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_300px] gap-3">
            <div className="space-y-3">
                <ContentModule>
                    <ModuleHeader title="基本信息" />
                    <div className="p-4 space-y-5 text-sm">
                        <div>
                            <div className="font-semibold text-slate-700">名称(英文)</div>
                            <div className="mt-2 text-slate-800">{selectedItem?.nameEN || 'Example doors and windows'}</div>
                        </div>
                        <div>
                            <div className="font-semibold text-slate-700">规格型号</div>
                            <div className="mt-2 text-slate-800">{selectedItem?.spec || '-'}</div>
                            <div className="mt-2 text-slate-800">{selectedItem?.spec || '-'}</div>
                        </div>
                        <div>
                            <div className="font-semibold text-slate-700">产品简介</div>
                            <div className="mt-2 text-slate-800">/</div>
                            <div className="mt-2 text-slate-800">/</div>
                        </div>
                    </div>
                </ContentModule>

                <ContentModule>
                    <ModuleHeader title="模型描述方式" />
                    <div className="p-4 space-y-5 text-sm">
                        <div>
                            <div className="font-semibold text-slate-700">描述方式类型</div>
                            <div className="mt-2 text-slate-800">{selectedItem?.descType || '声明单位'}</div>
                            <div className="mt-2 text-slate-800">Declaration Unit</div>
                        </div>
                        <div>
                            <div className="font-semibold text-slate-700">描述方式说明</div>
                            <div className="mt-2 text-slate-800">{selectedItem?.desc || '-'}</div>
                            <div className="mt-2 text-slate-800">1m² sample doors and windows</div>
                        </div>
                        <div>
                            <div className="font-semibold text-slate-700">基准流</div>
                            <div className="mt-2 text-slate-800">{selectedItem?.basicFlow || '-'}</div>
                            <div className="mt-2 text-slate-800">1m² sample doors and windows</div>
                        </div>
                    </div>
                </ContentModule>
            </div>

            <div className="space-y-3">
                <ContentModule>
                    <ModuleHeader title="产品图片" />
                    <div className="p-4">
                        <div className="border border-slate-200 rounded overflow-hidden bg-white">
                            <div className="h-32 bg-gradient-to-br from-sky-100 to-slate-200 border-b border-slate-200" />
                            <div className="h-12 px-3 flex items-center justify-center text-slate-700 text-sm">
                                示例门窗.jpeg
                            </div>
                        </div>
                    </div>
                </ContentModule>
            </div>
        </div>
    );

    return (
        <EntityModulePage
            title="产品"
            filterOptions={filterOptions}
            createComponent={CreateProductPage}
            onCreateSaved={(data) => {
                addNotification(`产品「${data?.name || '未命名产品'}」已保存（演示）`, 'success');
            }}
            columns={columns}
            data={productFooterData}
            renderDetailHeader={renderDetailHeader}
            renderDetailContent={renderDetailContent}
            listItemRenderer={renderProductListItem}
        />
    );
};

export default ProductPage;
