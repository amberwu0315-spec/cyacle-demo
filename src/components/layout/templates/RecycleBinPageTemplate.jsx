/**
 * RecycleBinPageTemplate - 回收站模板（后悔药）
 * 
 * 🏢 角色：数据恢复中心 (Data Recovery Center)
 * 📝 职责：
 * 1. 展示已删除项目的列表
 * 2. 提供恢复和永久删除功能
 * 3. 强调"可恢复"而非"危险区"
 * 
 * 使用场景：
 * - 查看已删除的项目
 * - 查看已删除的服务企业
 * - 历史数据归档
 * 
 * ⚠️ 注意：
 * - 此为基础骨架模板
 * - 主按钮应该是"恢复"（主题色），次要按钮是"永久删除"（灰色）
 * - 心理定位：安全网、保险箱，而非垃圾桶
 */
import React from 'react';
import { IconRestore, IconTrash } from '@tabler/icons-react';
import DoubleColumnBase from '../DoubleColumnBase';

export const RecycleBinPageTemplate = ({
    // ========== 插槽 ==========
    deletedListSlot = null,           // 已删除项列表
    previewSlot = null,               // 预览内容

    // ========== 状态 ==========
    selectedItem = null,              // 当前选中的已删除项

    // ========== 操作回调 ==========
    onRestore = () => { },             // 恢复回调
    onPermanentDelete = () => { },     // 永久删除回调

    // ========== 可选配置 ==========
    entityType = "项目",              // 实体类型

}) => {

    // ========== 左栏Header ==========
    const leftHeaderContent = (
        <div className="flex items-center justify-between w-full">
            <span className="font-semibold text-gray-800">回收站</span>
            <span className="text-xs text-gray-400">30天后自动清理</span>
        </div>
    );

    // ========== 左栏Body ==========
    const leftBodyContent = deletedListSlot || (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 px-6">
            <p className="text-sm text-gray-500 text-center">
                已删除项列表插槽<br />
                （deletedListSlot）
            </p>
        </div>
    );

    // ========== 右栏Header ==========
    const rightHeaderContent = selectedItem ? (
        <>
            {/* 左侧：选中项名称 */}
            <div className="font-medium text-gray-800 text-sm truncate">
                {selectedItem.name || '预览'}
            </div>

            {/* 右侧：操作按钮 */}
            <div className="flex items-center gap-2">
                {/* 次要操作：永久删除（灰色、小号） */}
                <button
                    onClick={onPermanentDelete}
                    className="px-3 py-1.5 text-xs text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors flex items-center gap-1"
                >
                    <IconTrash size={14} />
                    <span>永久删除</span>
                </button>

                {/* 主要操作：恢复（主题色） */}
                <button
                    onClick={onRestore}
                    className="px-3 py-1.5 text-xs text-white bg-[#087F9C] hover:bg-[#076A82] rounded-md transition-colors flex items-center gap-1"
                >
                    <IconRestore size={14} />
                    <span>恢复{entityType}</span>
                </button>
            </div>
        </>
    ) : (
        <span className="text-sm text-gray-400">未选中</span>
    );

    // ========== 右栏Body ==========
    const rightBodyContent = previewSlot;

    return (
        <DoubleColumnBase
            leftHeader={leftHeaderContent}
            leftBody={leftBodyContent}
            rightHeader={rightHeaderContent}
            rightBody={rightBodyContent}
        />
    );
};

export default RecycleBinPageTemplate;
