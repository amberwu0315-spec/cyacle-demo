/**
 * DetailPageTemplate - 详情查看模板（专注式）
 * 
 * 🏢 角色：数据详情查看器 (Detail Viewer)
 * 📝 职责：
 * 1. 专注于单一数据的深度展示
 * 2. 左侧辅助导航/元信息面板
 * 3. 右侧详细内容展示
 * 
 * 使用场景：
 * - 项目详情页（带章节导航）
 * - 文档阅读器（带目录）
 * - 用户档案页
 * 
 * ⚠️ 注意：
 * - 此为基础骨架模板
 * - 与 MasterDetailPageTemplate 的区别：左侧不是用来切换主体数据的
 * - 焦点在单一数据的深度查看，左侧仅作辅助
 */
import React from 'react';
import DoubleColumnBase from '../DoubleColumnBase';

export const DetailPageTemplate = ({
    // ========== 实体配置 ==========
    entityName = "",                  // 实体名称

    // ========== 左栏插槽 ==========
    leftContentSlot = null,           // 左侧内容（导航/快速信息/元数据）

    // ========== 右栏插槽 ==========
    detailContentSlot = null,         // 详情内容
    detailHeaderSlot = null,          // 自定义右侧Header（可选，覆盖默认）

    // ========== 操作回调 ==========
    onEdit = null,                    // 编辑回调（可选）
    onExport = null,                  // 导出回调（可选）

    // ========== 可选配置 ==========
    showLeftHeader = true,            // 是否显示左侧Header
    leftHeaderTitle = "导航",         // 左侧Header标题

}) => {

    // ========== 左栏Header ==========
    const leftHeaderContent = showLeftHeader ? (
        <div className="flex items-center justify-between w-full">
            <span className="font-semibold text-gray-800">{leftHeaderTitle}</span>
        </div>
    ) : null;

    // ========== 左栏Body ==========
    const leftBodyContent = leftContentSlot || (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 px-6">
            <p className="text-sm text-gray-500 text-center">
                左侧内容插槽<br />
                （章节导航、快速信息等）
            </p>
        </div>
    );

    // ========== 右栏Header ==========
    const rightHeaderContent = detailHeaderSlot || (
        <>
            {/* 左侧：标题 */}
            <div className="font-medium text-gray-800 text-sm truncate">
                {entityName || <span className="text-gray-400">&lt;未命名&gt;</span>}
            </div>

            {/* 右侧：操作按钮（如果有） */}
            <div className="flex items-center gap-2">
                {onEdit && (
                    <button
                        onClick={onEdit}
                        className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        编辑
                    </button>
                )}
                {onExport && (
                    <button
                        onClick={onExport}
                        className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        导出
                    </button>
                )}
            </div>
        </>
    );

    // ========== 右栏Body ==========
    const rightBodyContent = detailContentSlot;

    return (
        <DoubleColumnBase
            leftHeader={leftHeaderContent}
            leftBody={leftBodyContent}
            rightHeader={rightHeaderContent}
            rightBody={rightBodyContent}
        />
    );
};

export default DetailPageTemplate;
