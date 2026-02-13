/**
 * AllocationPage - 分配模型页面
 * 
 * 🏢 角色：分配规则配置 (Allocation Rules)
 * 📝 职责：
 * 1. 管理产品/副产品的环境影响分配比例（如质量分配、经济分配）。
 * 2. 提供可视化的分配系数编辑界面。
 * 3. 使用 MasterDetailPageTemplate 实现标准化的主从布局。
 */
import React, { useState, useEffect } from 'react';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import { IconPlus, IconCheck, IconSearch, IconFilter } from '@tabler/icons-react';
import { allocationData } from '../../../data/mockData';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import { useAppNavigation } from '../../../context/AppNavigationContext';
import ViewActionGroup from '../../layout/ViewActionGroup';
import MasterDetailPageTemplate from '../../layout/templates/MasterDetailPageTemplate';

const AllocationPage = () => {
    const { setActions, setShowHeader } = usePagePresentation();
    const { goBack, goForward, canGoBack, canGoForward } = useAppNavigation();

    // 状态管理
    const [selectedId, setSelectedId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // 初始化：默认选中第一个
    useEffect(() => {
        if (allocationData && allocationData.length > 0 && !selectedId) {
            setSelectedId(allocationData[0].id);
        }
    }, []);

    // 隐藏顶部导航头
    useEffect(() => {
        setActions(null);
        setShowHeader(false);
        return () => setShowHeader(true);
    }, [setActions, setShowHeader]);

    // 获取当前选中的数据
    const selectedItem = allocationData.find(item => item.id === selectedId);

    // 过滤数据
    const filteredData = allocationData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ========== 主列表项渲染 ==========
    const renderMasterItem = (item) => {
        const isSelected = item.id === selectedId;
        return (
            <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                    }`}
            >
                <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-medium text-sm ${isSelected ? 'text-[#087F9C]' : 'text-gray-700'}`}>
                        {item.name}
                    </h3>
                    {item.status === '已启用' && (
                        <IconCheck size={14} className="text-green-500 shrink-0 ml-2" />
                    )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <span className="bg-gray-100 px-1.5 py-0.5 rounded">{item.type}</span>
                    <span>{item.method}</span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-1">{item.description}</p>
            </div>
        );
    };

    // ========== 搜索栏 ==========
    const searchBarSlot = (
        <div className="p-3 border-b border-gray-100 shrink-0">
            <div className="relative">
                <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="搜索规则..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#087F9C] transition-colors"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    );

    // ========== 主列表 ==========
    const masterListSlot = (
        <div className="flex-1 overflow-y-auto scrollbar-thin">
            {filteredData.map(renderMasterItem)}
        </div>
    );

    // ========== 详情内容 ==========
    const detailContentSlot = selectedItem ? (
        <div className="flex-1 overflow-y-auto p-3">
            <div className="space-y-3">
                {/* 分配规则 */}
                <ContentModule>
                    <ModuleHeader title="分配规则" />
                    <div className="p-4">
                        <div className="mb-4">
                            <label className="block text-xs text-gray-500 mb-2">公式</label>
                            <div className="text-base text-gray-800 font-serif bg-gray-50 p-3 rounded border border-gray-200">
                                {selectedItem.formula}
                            </div>
                        </div>

                        {selectedItem.variables && (
                            <div>
                                <label className="block text-xs text-gray-500 mb-2">变量</label>
                                <div className="border border-gray-200 rounded overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">符号</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">类型</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">符号描述</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {selectedItem.variables.map((variable, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-3 py-2 text-gray-800 font-mono">{variable.symbol}</td>
                                                    <td className="px-3 py-2 text-gray-600">{variable.type}</td>
                                                    <td className="px-3 py-2 text-gray-800">{variable.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        <div className="mt-4">
                            <label className="block text-xs text-gray-500 mb-2">描述</label>
                            <div className="text-sm text-gray-700 leading-relaxed">
                                {selectedItem.description}
                            </div>
                        </div>
                    </div>
                </ContentModule>

                {/* 分配比例 */}
                {selectedItem.applications && (
                    <ContentModule>
                        <ModuleHeader title="分配比例" />
                        <div className="p-4">
                            <div className="border border-gray-200 rounded overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">应用</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">确定合格</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">核算周期</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">分配比例</th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">结果</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {selectedItem.applications.map((app, idx) => (
                                            <tr key={idx}>
                                                <td className="px-3 py-2 text-gray-800">{app.name}</td>
                                                <td className="px-3 py-2 text-gray-800">{app.certificationStatus}</td>
                                                <td className="px-3 py-2 text-gray-600">{app.period}</td>
                                                <td className="px-3 py-2 text-gray-800 font-mono text-xs">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="bg-yellow-50 text-yellow-800 px-2 py-1 rounded">{app.ratio}</span>
                                                        {idx === 1 && <span className="bg-yellow-100 text-yellow-900 px-2 py-1 rounded font-medium">Q全厂</span>}
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2 text-gray-600">{app.result}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </ContentModule>
                )}
            </div>
        </div>
    ) : null;

    // ========== 详情Header操作按钮 ==========
    const detailHeaderActionsSlot = selectedItem ? (
        <ViewActionGroup
            showDivider={false}
            onBack={goBack}
            onForward={goForward}
            canBack={canGoBack}
            canForward={canGoForward}
        />
    ) : null;

    return (
        <MasterDetailPageTemplate
            // 主列表配置
            listTitle="分配规则"
            listData={filteredData}
            selectedId={selectedId}
            onSelect={setSelectedId}
            listToolbarSlot={searchBarSlot}
            listItemRenderer={(item, isSelected) => renderMasterItem(item)}
            showAddButton={true}
            onAdd={() => console.log('添加分配规则')}

            // 详情配置
            detailContentSlot={detailContentSlot}
            detailHeaderSlot={selectedItem ? (
                <>
                    <h2 className="text-base font-semibold text-gray-800 leading-tight truncate">
                        {selectedItem.name}
                    </h2>
                    {detailHeaderActionsSlot}
                </>
            ) : null}
        />
    );
};

export default AllocationPage;
