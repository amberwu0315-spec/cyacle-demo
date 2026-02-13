/**
 * DocumentPage - 文档管理（足迹）
 * 
 * 🏢 角色：文档管理器 (Document Manager)
 * 📝 职责：
 * 1. 管理项目相关的所有文档（PDF/报告/说明文件）
 * 2. 提供文档列表和详情查看
 * 3. 使用 MasterDetailPageTemplate 实现双栏布局
 */
import React, { useState, useEffect } from 'react';
import { IconSearch, IconFileText, IconCalendar, IconUser, IconBuilding, IconExternalLink, IconX } from '@tabler/icons-react';
import { documentData } from '../../../data/mockData';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import MasterDetailPageTemplate from '../../layout/templates/MasterDetailPageTemplate';
import CreateLiteraturePage from '../create/CreateLiteraturePage';

const DocumentPage = ({ onClose, showAddButton = true }) => {
    // 状态管理
    const [selectedId, setSelectedId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateMode, setIsCreateMode] = useState(false);

    // 初始化：默认选中第一个
    useEffect(() => {
        if (documentData && documentData.length > 0 && !selectedId) {
            setSelectedId(documentData[0].id);
        }
    }, []);



    // 获取当前选中的数据
    const selectedItem = documentData.find(item => item.id === selectedId);



    // 过滤数据
    const filteredData = documentData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.docType?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ========== 主列表项渲染 ==========
    const renderDocumentItem = (item) => {
        const isSelected = item.id === selectedId;
        return (
            <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                    }`}
            >
                <div className="flex items-start gap-2 mb-1">
                    <IconFileText size={16} className={`mt-0.5 shrink-0 ${isSelected ? 'text-[#087F9C]' : 'text-gray-400'}`} />
                    <h3 className={`font-medium text-sm line-clamp-2 ${isSelected ? 'text-[#087F9C]' : 'text-gray-700'}`}>
                        {item.name}
                    </h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 ml-6">
                    <span className="bg-gray-100 px-1.5 py-0.5 rounded">{item.docType}</span>
                    <span>•</span>
                    <span>{item.publishYear}</span>
                </div>
            </div>
        );
    };

    // ========== 搜索栏 ==========
    const searchBarSlot = (
        <div className="relative">
            <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="搜索文档..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#087F9C] transition-colors"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
        </div>
    );

    // ========== 详情内容 ==========
    const detailContentSlot = selectedItem ? (
        <div className="flex-1 overflow-y-auto p-3">
            <div className="space-y-3">
                {/* 基本信息 */}
                <ContentModule>
                    <ModuleHeader title="文档信息" />
                    <div className="p-4 space-y-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">文档名称</label>
                            <div className="text-sm text-gray-800 font-medium">{selectedItem.name}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                    <IconFileText size={14} />
                                    文档类型
                                </label>
                                <div className="text-sm text-gray-800">{selectedItem.docType}</div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                    <IconBuilding size={14} />
                                    来源
                                </label>
                                <div className="text-sm text-gray-800">{selectedItem.source}</div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                    <IconCalendar size={14} />
                                    出版时间
                                </label>
                                <div className="text-sm text-gray-800">{selectedItem.publishYear}</div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">期刊/出版社</label>
                                <div className="text-sm text-gray-800">{selectedItem.journal || '-'}</div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                                    <IconUser size={14} />
                                    创建用户
                                </label>
                                <div className="text-sm text-gray-800">{selectedItem.creator}</div>
                            </div>
                        </div>
                    </div>
                </ContentModule>

                {/* 摘要/描述（如果有） */}
                {selectedItem.description && (
                    <ContentModule>
                        <ModuleHeader title="描述" />
                        <div className="p-4">
                            <div className="text-sm text-gray-700 leading-relaxed">
                                {selectedItem.description}
                            </div>
                        </div>
                    </ContentModule>
                )}

                {/* 文件链接占位符 */}
                <ContentModule>
                    <ModuleHeader title="文件" />
                    <div className="p-4">
                        <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-200 rounded text-gray-400">
                            <div className="text-center">
                                <IconFileText size={32} className="mx-auto mb-2 opacity-50" />
                                <p className="text-xs">文件预览/下载功能</p>
                            </div>
                        </div>
                    </div>
                </ContentModule>
            </div>
        </div>
    ) : null;

    if (isCreateMode) {
        return (
            <div className="h-full bg-white">
                <CreateLiteraturePage
                    onCancel={() => setIsCreateMode(false)}
                    onSave={(data) => {
                        console.log('Save Document:', data);
                        setIsCreateMode(false);
                    }}
                />
            </div>
        );
    }

    return (
        <MasterDetailPageTemplate
            // 主列表配置
            listTitle="文档"
            listData={filteredData}
            selectedId={selectedId}
            onSelect={setSelectedId}
            listToolbarSlot={searchBarSlot}
            listItemRenderer={(item) => renderDocumentItem(item)}
            showAddButton={showAddButton}
            onAdd={() => setIsCreateMode(true)}

            // 详情配置
            // 详情配置
            detailContentSlot={detailContentSlot}
            detailHeaderSlot={
                <div className="flex items-center justify-between w-full">
                    <div className="flex-1 min-w-0">
                        {selectedItem ? (
                            <h2 className="text-base font-semibold text-gray-800 leading-tight truncate">
                                {selectedItem.name}
                            </h2>
                        ) : (
                            <span className="text-sm text-gray-400">未选中</span>
                        )}
                    </div>
                    {/* Modal 模式下的操作按钮 */}
                    {onClose && (
                        <div className="flex items-center gap-1 ml-4">
                            <button
                                className="p-1 text-gray-400 hover:text-[#087F9C] hover:bg-blue-50 rounded transition-colors"
                                title="打开独立窗口"
                                onClick={() => console.log('Open window', selectedItem)}
                            >
                                <IconExternalLink size={18} />
                            </button>
                            <button
                                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                title="关闭"
                                onClick={onClose}
                            >
                                <IconX size={18} />
                            </button>
                        </div>
                    )}
                </div>
            }
        />
    );
};

export default DocumentPage;
