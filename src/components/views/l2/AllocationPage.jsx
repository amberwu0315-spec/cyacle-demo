/**
 * AllocationPage - 分配模型页面
 * 
 * 🏢 角色：分配规则配置 (Allocation Rules)
 * 📝 职责：
 * 1. 管理产品/副产品的环境影响分配比例（如质量分配、经济分配）。
 * 2. 提供可视化的分配系数编辑界面。
 * 3. [New] 采用左右分栏布局：左侧列表，右侧详情。
 */
import React, { useEffect, useState } from 'react';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import { IconPlus, IconBox, IconCheck, IconSearch, IconFilter } from '@tabler/icons-react';

import { allocationData } from '../../../data/mockData';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import { useAppNavigation } from '../../../context/AppNavigationContext';
import ViewActionGroup from '../../layout/ViewActionGroup';

const AllocationPage = () => {
    const { setActions, setLayoutConfig, setShowHeader } = usePagePresentation();
    const { goBack, goForward, canGoBack, canGoForward } = useAppNavigation();

    // 状态管理
    const [selectedId, setSelectedId] = useState(null); // 当前选中的规则ID
    const [filterText, setFilterText] = useState('');     // 搜索过滤

    // 初始化：默认选中第一个
    useEffect(() => {
        if (allocationData && allocationData.length > 0 && !selectedId) {
            setSelectedId(allocationData[0].id);
        }
    }, []);

    // 头部动作：虽然页面内部有了“添加”按钮，但 L2 Header 也可以保留一个（可选）
    // 这里我们遵循新设计，主要操作放在左侧列表头部
    useEffect(() => {
        setActions(null);
        setShowHeader(false);
        return () => setShowHeader(true);
    }, [setActions, setShowHeader]);

    // 获取当前选中的数据
    const selectedItem = allocationData.find(item => item.id === selectedId);

    // 渲染左侧列表项
    const renderListItem = (item) => {
        const isSelected = item.id === selectedId;
        return (
            <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors group ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50'
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

    return (
        <div className="w-full h-full flex flex-row bg-[#F5F6F8] overflow-hidden">
            {/* Left Column: List Area (w-80 or w-1/4, fixed width usually better for lists) */}
            <div className="w-80 flex flex-col border-r border-gray-200 bg-white shrink-0">
                {/* 1. Header: 标题 + 添加 */}
                <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200 shrink-0">
                    <span className="font-semibold text-gray-800">分配规则</span>
                    <button className="p-1.5 text-gray-500 hover:text-[#087F9C] hover:bg-blue-50 rounded-md transition-colors">
                        <IconPlus size={20} />
                    </button>
                </div>

                {/* 2. Toolbar: 搜索/筛选 (可选) */}
                <div className="p-3 border-b border-gray-100 shrink-0">
                    <div className="relative">
                        <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="搜索规则..."
                            className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#087F9C] transition-colors"
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                    </div>
                </div>

                {/* 3. List: 滚动列表 */}
                <div className="flex-1 overflow-y-auto scrollbar-thin">
                    {allocationData.map(renderListItem)}
                </div>
            </div>

            {/* Right Column: Detail Area */}
            <div className="flex-1 flex flex-col flex-nowrap min-w-0 bg-gray-50/50">
                {selectedItem ? (
                    <>
                        {/* 1. Detail Header: 选中项名称 + 视图操作 */}
                        <div className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between shrink-0 shadow-sm z-10">
                            <h2 className="text-base font-semibold text-gray-800 leading-tight">
                                {selectedItem.name}
                            </h2>
                            <ViewActionGroup
                                showDivider={false}
                                onBack={goBack}
                                onForward={goForward}
                                canBack={canGoBack}
                                canForward={canGoForward}
                            />
                        </div>

                        {/* 2. Detail Body: 内容区 */}
                        <div className="flex-1 overflow-y-auto p-3">
                            <div className="space-y-3">
                                {/* 基本信息卡片 */}
                                <ContentModule>
                                    <ModuleHeader title="基本属性" />
                                    <div className="p-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">分配类型</label>
                                            <div className="text-sm text-gray-800">{selectedItem.type}</div>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">分配方法</label>
                                            <div className="text-sm text-gray-800">{selectedItem.method} (ISO 14044 推荐)</div>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs text-gray-500 mb-1">描述说明</label>
                                            <div className="text-sm text-gray-800">{selectedItem.description}</div>
                                        </div>
                                    </div>
                                </ContentModule>

                                {/* 配置详情占位符 */}
                                <ContentModule className="min-h-[300px] flex flex-col border-dashed">
                                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-4">
                                        <IconFilter size={48} className="mb-3 opacity-20" />
                                        <p className="text-sm">分配系数配置表单 (Placeholder)</p>
                                        <p className="text-xs mt-1">此处将显示具体的产品/副产品分配比例输入框</p>
                                    </div>
                                </ContentModule>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <IconBox size={48} stroke={1} className="mb-4 text-gray-300" />
                        <p>请选择左侧规则查看详情</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllocationPage;
