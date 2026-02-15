import React from 'react';
import { IconBook2, IconClock, IconFilePlus, IconFolder, IconSearch, IconUpload } from '@tabler/icons-react';
import CreateLiteraturePage from '../create/CreateLiteraturePage';
import { documentData } from '../../../data/mockData';
import EntityModulePage from '../shared/EntityModulePage';
import { useNotification } from '../../../context/NotificationContext';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';

const DocumentPage = ({ showAddButton = true }) => {
    const { addNotification } = useNotification();

    const columns = [
        { title: '文档名称', key: 'name', width: '42%', className: 'font-medium' },
        { title: '来源', key: 'source', width: '12%', className: 'text-sm text-gray-500' },
        { title: '文档类型', key: 'docType', width: '18%', className: 'text-sm text-gray-500' },
        { title: '出版时间', key: 'publishYear', width: '10%', className: 'text-sm text-gray-500' },
        { title: '期刊/出版社', key: 'journal', width: '10%', className: 'text-sm text-gray-500' },
        { title: '创建用户', key: 'creator', width: '8%', className: 'text-sm text-gray-500' }
    ];

    const renderDocumentListItem = (item, isSelected) => (
        <div className={`px-3 py-2 border-b border-slate-100 ${isSelected ? 'bg-[#dff5fa]' : 'hover:bg-slate-50'}`}>
            <div className="text-sm font-medium text-slate-800 truncate">{item?.name || '-'}</div>
            <div className="text-xs text-slate-500 mt-1 truncate">{item?.publishYear || '-'} / {item?.docType || '-'}</div>
        </div>
    );

    const renderDetailHeader = ({ selectedItem }) => (
        <div className="w-full flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-800 truncate">
                {selectedItem?.name || '演示门窗有限公司'}
            </h2>
            <div className="flex items-center gap-3 text-slate-500">
                <IconFilePlus size={17} />
                <IconUpload size={17} />
            </div>
        </div>
    );

    const renderDetailContent = () => (
        <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-3">
            <ContentModule>
                <div className="p-4 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-slate-700">
                        <IconClock size={16} />
                        <span>最近添加</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 mt-4">
                        <IconBook2 size={16} />
                        <span>未分类</span>
                    </div>
                </div>
                <div className="p-4 text-sm leading-9 text-slate-800">
                    <div className="text-white bg-[#0EA5B7] px-3 rounded">
                        <span className="inline-flex items-center gap-2">
                            <IconFolder size={16} />
                            演示门窗有限公司
                        </span>
                    </div>
                    <div className="pl-6 mt-2 space-y-1">
                        <div>碳足迹计算及报告</div>
                        <div>因子&模型参考文献</div>
                        <div>活动数据支撑文件</div>
                        <div className="pl-5 text-slate-700">01 - 企业基本信息</div>
                        <div className="pl-5 text-slate-700">02 - 产品信息</div>
                        <div className="pl-5 text-slate-700">03 - 产量信息</div>
                        <div className="pl-5 text-slate-700">...</div>
                    </div>
                </div>
            </ContentModule>

            <ContentModule>
                <ModuleHeader title="演示门窗有限公司" />
                <div className="p-4">
                    <div className="relative max-w-[360px]">
                        <IconSearch size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            readOnly
                            value=""
                            placeholder="名称或其他"
                            className="w-full h-9 pl-7 pr-2 text-sm border border-slate-200 rounded bg-white"
                        />
                    </div>
                </div>
                <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                        '碳足迹计算及报告',
                        '因子&模型参考文献',
                        '活动数据支撑文件',
                        '示例门窗.jpeg',
                        '型材.png'
                    ].map((name) => (
                        <div key={name} className="border border-slate-200 rounded overflow-hidden bg-white">
                            <div className="h-28 bg-gradient-to-br from-sky-100 to-slate-200 flex items-center justify-center">
                                <IconFolder size={44} className="text-[#2d7cc9]" />
                            </div>
                            <div className="h-12 px-3 flex items-center text-sm text-slate-700 truncate">{name}</div>
                        </div>
                    ))}
                </div>
                <div className="px-4 pb-4 text-sm text-slate-600">
                    当前 5 个文件夹、2 个文档
                </div>
            </ContentModule>
        </div>
    );

    return (
        <EntityModulePage
            title="文档管理"
            columns={columns}
            data={documentData}
            createComponent={CreateLiteraturePage}
            showAddButton={showAddButton}
            onCreateSaved={(data) => {
                addNotification(`文档「${data?.name || '未命名文档'}」已保存（演示）`, 'success');
            }}
            renderDetailHeader={renderDetailHeader}
            renderDetailContent={renderDetailContent}
            listItemRenderer={renderDocumentListItem}
        />
    );
};

export default DocumentPage;
