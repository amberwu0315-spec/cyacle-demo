/**
 * MasterDetailPageTemplate - 主从列表模板
 * 
 * 🏢 角色：浏览式数据查看器 (Browser-Style Viewer)
 * 📝 职责：
 * 1. 左侧可切换的数据列表
 * 2. 右侧选中项的详情展示
 * 3. 支持搜索、筛选、快速浏览
 * 
 * 使用场景：
 * - L2 分配规则页面
 * - 活动数据管理
 * - 报告列表
 * - 文件管理器
 */
import React, { useEffect } from 'react';
import { IconPlus, IconBox } from '@tabler/icons-react';
import DoubleColumnBase from '../DoubleColumnBase';
import { usePagePresentation } from '../../../context/PagePresentationContext';

export const MasterDetailPageTemplate = ({
    // ========== 列表配置 ==========
    listTitle = "列表",               // 左侧列表标题
    listData = [],                    // 数据数组
    selectedId = null,                // 当前选中的ID
    onSelect = () => { },              // 选择回调 (id) => {}

    // ========== 左栏插槽 ==========
    listHeaderSlot = null,            // 自定义左侧Header（完全覆盖默认的标题+添加按钮）
    listToolbarSlot = null,           // 工具栏插槽（搜索/筛选）
    listItemRenderer = null,          // 列表项渲染函数 (item, isSelected) => ReactNode

    // ========== 右栏插槽 ==========
    detailHeaderSlot = null,          // 自定义详情Header（覆盖默认标题）
    detailContentSlot = null,         // 详情内容（当有选中项时显示）
    emptyStateSlot = null,            // 空状态（未选中时显示）

    // ========== 操作配置 ==========
    showAddButton = true,             // 是否显示添加按钮
    onAdd = () => { },                 // 添加回调

    // ========== 可选配置 ==========
    leftWidth = "w-80",               // 左栏宽度（列表通常固定宽度更好）

}) => {

    // 获取当前选中的数据项
    const selectedItem = listData.find(item => item.id === selectedId);

    // 获取页面表现上下文
    const { setShowHeader } = usePagePresentation() || {};

    // 通用规则：双栏布局（主从页）自动隐藏顶部系统标题栏
    useEffect(() => {
        if (setShowHeader) {
            setShowHeader(false);
        }
        return () => {
            if (setShowHeader) {
                setShowHeader(true);
            }
        };
    }, [setShowHeader]);

    // ========== 左栏Header ==========
    const leftHeaderContent = listHeaderSlot || (
        <div className="flex items-center justify-between w-full">
            <span className="font-semibold text-gray-800">{listTitle}</span>
            {showAddButton && (
                <button
                    onClick={onAdd}
                    className="p-1.5 text-gray-500 hover:text-[#087F9C] hover:bg-blue-50 rounded-md transition-colors"
                    title={`添加${listTitle}`}
                >
                    <IconPlus size={20} />
                </button>
            )}
        </div>
    );

    // ========== 左栏Body ==========
    const leftBodyContent = (
        <>
            {/* 工具栏（搜索/筛选） */}
            {listToolbarSlot && (
                <div className="p-3 border-b border-gray-100 shrink-0 bg-white">
                    {listToolbarSlot}
                </div>
            )}

            {/* 列表内容 */}
            <div className="flex-1 overflow-y-auto">
                {listData.length > 0 ? (
                    listData.map(item => {
                        const isSelected = item.id === selectedId;

                        // 使用自定义渲染器或默认渲染器
                        if (listItemRenderer) {
                            return (
                                <div
                                    key={item.id}
                                    onClick={() => onSelect(item.id)}
                                    className="cursor-pointer"
                                >
                                    {listItemRenderer(item, isSelected)}
                                </div>
                            );
                        }

                        // 默认列表项渲染（简单版本）
                        return (
                            <div
                                key={item.id}
                                onClick={() => onSelect(item.id)}
                                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`font-medium text-sm ${isSelected ? 'text-[#087F9C]' : 'text-gray-700'
                                    }`}>
                                    {item.name || item.title || `项目 ${item.id}`}
                                </div>
                                {item.description && (
                                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <IconBox size={48} stroke={1} className="mb-4 text-gray-300" />
                        <p className="text-sm">暂无数据</p>
                    </div>
                )}
            </div>
        </>
    );

    // ========== 右栏Header ==========
    const rightHeaderContent = detailHeaderSlot || (
        selectedItem ? (
            <h2 className="text-base font-semibold text-gray-800 leading-tight truncate">
                {selectedItem.name || selectedItem.title || '详情'}
            </h2>
        ) : (
            <span className="text-sm text-gray-400">未选中</span>
        )
    );

    // ========== 右栏Body ==========
    const rightBodyContent = selectedItem ? (
        detailContentSlot || (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <p className="text-sm">详情内容插槽（detailContentSlot）</p>
            </div>
        )
    ) : (
        emptyStateSlot || (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <IconBox size={48} stroke={1} className="mb-4 text-gray-300" />
                <p className="text-sm">请选择左侧项目查看详情</p>
            </div>
        )
    );

    return (
        <DoubleColumnBase
            leftWidth={leftWidth}
            leftHeader={leftHeaderContent}
            leftBody={leftBodyContent}
            rightHeader={rightHeaderContent}
            rightBody={rightBodyContent}
        />
    );
};

export default MasterDetailPageTemplate;
