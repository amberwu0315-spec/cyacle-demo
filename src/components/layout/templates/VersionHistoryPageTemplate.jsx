/**
 * VersionHistoryPageTemplate - 版本历史模板
 * 
 * 🏢 角色：版本审计追溯器 (Version Auditor)
 * 📝 职责：
 * 1. 左侧展示版本时间线
 * 2. 右侧展示版本快照或对比
 * 3. 支持恢复到历史版本
 * 
 * 使用场景：
 * - 查看项目的版本历史
 * - 查看核算数据的修订记录
 * - 查看报告的编辑历史
 * 
 * ⚠️ 注意：
 * - 此为基础骨架模板
 * - 版本对比（Diff）逻辑由具体页面实现
 * - 可能需要支持单版本查看 vs 双版本对比两种模式
 */
import React, { useEffect } from 'react';
import { IconRestore, IconGitCompare } from '@tabler/icons-react';
import DoubleColumnBase from '../DoubleColumnBase';
import { usePagePresentation } from '../../../context/PagePresentationContext';

export const VersionHistoryPageTemplate = ({
    // ========== 插槽 ==========
    timelineSlot = null,              // 版本时间线列表
    versionContentSlot = null,        // 版本内容或对比视图

    // ========== 状态 ==========
    selectedVersion = null,           // 当前选中的版本

    // ========== 操作回调 ==========
    onRestore = () => { },             // 恢复到此版本
    onCompare = () => { },             // 对比版本（可选）

    // ========== 可选配置 ==========
    mode = "single",                  // "single" | "compare"
    entityType = "项目",              // 实体类型

}) => {

    // 获取页面表现上下文
    const { setShowHeader } = usePagePresentation() || {};

    // 通用规则：双栏布局自动隐藏顶部系统标题栏
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
    const leftHeaderContent = (
        <div className="flex items-center justify-between w-full">
            <span className="font-semibold text-gray-800">版本历史</span>
            {mode === "compare" && (
                <span className="text-xs text-[#087F9C]">对比模式</span>
            )}
        </div>
    );

    // ========== 左栏Body ==========
    const leftBodyContent = timelineSlot || (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 px-6">
            <p className="text-sm text-gray-500 text-center">
                版本时间线插槽<br />
                （timelineSlot）
            </p>
            <p className="text-xs text-gray-400 text-center">
                可使用时间线样式展示版本列表
            </p>
        </div>
    );

    // ========== 右栏Header ==========
    const rightHeaderContent = selectedVersion ? (
        <>
            {/* 左侧：版本信息 */}
            <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800 text-sm">
                    {selectedVersion.name || `v${selectedVersion.version}`}
                </span>
                {selectedVersion.isCurrent && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        当前版本
                    </span>
                )}
            </div>

            {/* 右侧：操作按钮 */}
            <div className="flex items-center gap-2">
                {onCompare && (
                    <button
                        onClick={onCompare}
                        className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
                    >
                        <IconGitCompare size={14} />
                        <span>对比版本</span>
                    </button>
                )}
                {!selectedVersion.isCurrent && (
                    <button
                        onClick={onRestore}
                        className="px-3 py-1.5 text-xs text-white bg-[#087F9C] hover:bg-[#076A82] rounded-md transition-colors flex items-center gap-1"
                    >
                        <IconRestore size={14} />
                        <span>恢复到此版本</span>
                    </button>
                )}
            </div>
        </>
    ) : (
        <span className="text-sm text-gray-400">未选中版本</span>
    );

    // ========== 右栏Body ==========
    const rightBodyContent = versionContentSlot || (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
            <p className="text-sm text-gray-500 text-center">
                版本内容插槽<br />
                （versionContentSlot）
            </p>
            <p className="text-xs text-gray-400 text-center">
                可展示版本快照或Diff对比
            </p>
        </div>
    );

    return (
        <DoubleColumnBase
            leftHeader={leftHeaderContent}
            leftBody={leftBodyContent}
            rightHeader={rightHeaderContent}
            rightBody={rightBodyContent}
        />
    );
};

export default VersionHistoryPageTemplate;
