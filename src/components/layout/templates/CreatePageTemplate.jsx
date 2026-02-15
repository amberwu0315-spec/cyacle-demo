/**
 * CreatePageTemplate - 创建流程模板
 * 
 * 🏢 角色：新建实体向导 (Creation Wizard)
 * 📝 职责：
 * 1. 提供标准化的创建流程结构
 * 2. 左侧引导说明 + 右侧表单
 * 3. 操作按钮统一在右侧Header
 * 
 * 使用场景：
 * - 创建项目
 * - 创建服务企业
 * - 创建分配方案
 * - 创建活动数据记录
 */
import React, { useEffect } from 'react';
import { IconLogout, IconDeviceFloppy } from '@tabler/icons-react';
import DoubleColumnBase from '../DoubleColumnBase';
import { usePagePresentation } from '../../../context/PagePresentationContext';

export const CreatePageTemplate = ({
    // ========== 实体配置 ==========
    entityType = "项目",              // 创建的实体类型（如"项目"、"服务企业"）
    entityName = "",                  // 动态生成的名称（用于右侧Header标题）

    // ========== 左栏插槽 ==========
    leftIconSlot = null,              // 引导图标（ReactNode）
    leftTitleSlot = null,             // 引导标题（ReactNode）
    leftDescSlot = null,              // 引导描述（ReactNode）

    // ========== 右栏插槽 ==========
    formContentSlot = null,           // 表单内容（ReactNode）

    // ========== 操作回调 ==========
    onSave = () => { },                // 保存/创建回调
    onCancel = () => { },              // 取消/退出回调

    // ========== 验证状态 ==========
    isValid = true,                   // 表单是否通过验证（当前创建流程允许空表单提交）
    disableSaveWhenInvalid = false,   // 是否在校验失败时禁用保存按钮（默认保持旧行为）

    // ========== 可选配置 ==========
    saveButtonText = null,            // 自定义保存按钮文案（默认"创建{entityType}"）
    showLeftHeader = true,            // 是否显示左侧Header

}) => {

    // 默认保存按钮文案
    const finalSaveButtonText = saveButtonText || `创建${entityType}`;
    const canSave = disableSaveWhenInvalid ? isValid : true;

    // 获取页面表现上下文
    const { setShowHeader } = usePagePresentation() || {};

    // 通用规则：双栏布局（创建页）自动隐藏顶部系统标题栏
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
                <span className="text-sm text-gray-500">创建</span>
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

    // ========== 左栏Body（默认引导内容）==========
    const leftBodyContent = (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 px-6">
            {/* 引导图标 */}
            {leftIconSlot || (
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-4xl">✨</span>
                </div>
            )}

            {/* 引导标题 */}
            {leftTitleSlot || (
                <p className="text-sm font-medium text-gray-700">开始创建一个新{entityType}</p>
            )}

            {/* 引导描述 */}
            {leftDescSlot || (
                <p className="text-sm text-gray-500 text-center font-medium">
                    请在右侧填写{entityType}的详细信息
                </p>
            )}
        </div>
    );

    // ========== 右栏Header ==========
    const rightHeaderContent = (
        <>
            {/* 左侧：动态标题 */}
            <div className="font-medium text-gray-800 text-sm truncate">
                {entityName || <span className="text-gray-400 font-normal">&lt;未命名&gt;</span>}
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
                    disabled={!canSave}
                    className={`px-3 py-1.5 text-xs text-white rounded-md transition-colors flex items-center gap-1 ${canSave
                        ? 'bg-[#087F9C] hover:bg-[#076A82]'
                        : 'bg-gray-300 cursor-not-allowed'
                        }`}
                >
                    <IconDeviceFloppy size={14} />
                    <span>{finalSaveButtonText}</span>
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

export default CreatePageTemplate;
