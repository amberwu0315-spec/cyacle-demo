/**
 * EditPageTemplate - 编辑流程模板
 * 
 * 🏢 角色：数据编辑器 (Data Editor)
 * 📝 职责：
 * 1. 提供标准化的编辑流程结构
 * 2. 左侧原始数据对照/帮助文档
 * 3. 右侧预填充表单
 * 4. 操作按钮统一在右侧Header
 * 
 * 使用场景：
 * - 编辑项目基础信息
 * - 编辑服务企业属性
 * - 编辑分配方案参数
 * 
 * ⚠️ 注意：
 * - 此为基础骨架模板，具体编辑逻辑由使用者实现
 * - 与 CreatePageTemplate 的区别：表单预填充、标题固定、显示变更状态
 */
import React, { useEffect } from 'react';
import { IconLogout, IconDeviceFloppy } from '@tabler/icons-react';
import DoubleColumnBase from '../DoubleColumnBase';
import { usePagePresentation } from '../../../context/PagePresentationContext';

export const EditPageTemplate = ({
    // ========== 实体配置 ==========
    entityType = "项目",              // 实体类型
    entityName = "",                  // 实体名称（固定显示，不随表单变化）

    // ========== 左栏插槽 ==========
    leftContentSlot = null,           // 左侧内容（原始数据对照/帮助/字段列表）

    // ========== 右栏插槽 ==========
    formContentSlot = null,           // 表单内容（预填充的表单）

    // ========== 操作回调 ==========
    onSave = () => { },                // 保存更改回调
    onCancel = () => { },              // 取消回调

    // ========== 状态 ==========
    hasChanges = false,               // 是否有未保存的更改
    isValid = true,                   // 表单是否通过验证

    // ========== 可选配置 ==========
    saveButtonText = "保存更改",      // 自定义保存按钮文案
    showLeftHeader = true,            // 是否显示左侧Header

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
    const leftHeaderContent = showLeftHeader ? (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-baseline gap-2">
                <span className="font-bold text-gray-800 text-lg">{entityType}</span>
                <span className="text-sm text-gray-500">编辑</span>
            </div>
            <button
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
                title="退出"
            >
                <IconLogout size={18} />
            </button>
        </div>
    ) : null;

    // ========== 左栏Body ==========
    const leftBodyContent = leftContentSlot || (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 px-6">
            <p className="text-sm text-gray-500 text-center">
                左侧内容插槽<br />
                （可放置原始数据对照、帮助文档等）
            </p>
        </div>
    );

    // ========== 右栏Header ==========
    const rightHeaderContent = (
        <>
            {/* 左侧：固定标题 + 未保存提示 */}
            <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800 text-sm truncate">
                    {entityName || <span className="text-gray-400">&lt;未命名&gt;</span>}
                </span>
                {hasChanges && (
                    <span className="text-xs text-orange-500">● 未保存</span>
                )}
            </div>

            {/* 右侧：操作按钮 */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onCancel}
                    className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                    取消
                </button>
                <button
                    onClick={onSave}
                    disabled={!isValid || !hasChanges}
                    className={`px-3 py-1.5 text-xs text-white rounded-md transition-colors flex items-center gap-1 ${isValid && hasChanges
                        ? 'bg-[#087F9C] hover:bg-[#076A82]'
                        : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    <IconDeviceFloppy size={14} />
                    <span>{saveButtonText}</span>
                </button>
            </div>
        </>
    );

    // ========== 右栏Body ==========
    const rightBodyContent = formContentSlot;

    return (
        <DoubleColumnBase
            leftHeader={leftHeaderContent}
            leftBody={leftBodyContent}
            rightHeader={rightHeaderContent}
            rightBody={rightBodyContent}
        />
    );
};

export default EditPageTemplate;
