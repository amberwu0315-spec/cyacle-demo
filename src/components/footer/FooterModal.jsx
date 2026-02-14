/**
 * FooterModal - 底部弹窗容器
 * 
 * 🏢 角色：快捷工具箱 (Quick Toolbox)
 * 📝 职责：
 * 1. 响应 Footer 按钮点击，从底部弹出的半屏窗口。
 * 2. 用于展示辅助信息（如文档、数据源详情）。
 */
import React from 'react';
import { IconExternalLink, IconX, IconChevronLeft } from '@tabler/icons-react';
import { useNotification } from '../../context/NotificationContext';

/**
 * FooterModal 通用组件
 * * 为所有 Footer 悬浮窗提供标准化的顶部栏和容器结构
 * * 定位规则（来自 product_logic.md）：
 * - Position: absolute top-0 left-0 bottom-[40px] right-0 (相对于 #right-zone)
 * - 覆盖范围：Header + L3 Sidebar + Main Content
 * - 必须显示：L1 Sidebar + L2 Sidebar + Footer
 * - 样式：4px 青色边框
 * * Props:
 * - title: 标题文字
 * - businessActions: 业务功能组 (版本历史/删除/添加等)
 * - onClose: 关闭回调
 * - children: 内容区
 * - isCreateMode: 是否为创建模式（隐藏Header）
 */
const FooterModal = ({ title, businessActions, onClose, onCollapse, children, isCreateMode = false, headless = false }) => {
    const { addNotification } = useNotification();

    const handleOpenWindow = () => {
        addNotification(`「${title}」独立窗口功能建设中`, 'info');
    };

    // 创建模式：移除边框和Header，让CreatePageTemplate全屏显示
    if (isCreateMode) {
        return (
            <div className="absolute top-0 left-0 bottom-[40px] right-0 bg-[#F5F6F8] z-50 flex flex-col">
                {children}
            </div>
        );
    }

    // Headless 模式：仅提供容器，不提供 Header
    if (headless) {
        return (
            <div className="absolute top-0 left-0 bottom-[40px] right-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col shadow-2xl border-2 border-[#0EA5B7] rounded-t-md overflow-hidden">
                <div className="flex-1 overflow-y-auto bg-[#f3f6f8]">
                    {children}
                </div>
            </div>
        );
    }

    return (
        // ✅ 修复点 1: border-[#087F9C] -> border-primary
        <div className="absolute top-0 left-0 bottom-[40px] right-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col shadow-2xl border-2 border-[#0EA5B7] rounded-t-md">
            {/* 顶部栏 */}
            <div className="h-10 bg-white border-b border-slate-200 flex items-center justify-between px-3 shrink-0">
                {/* 左侧标题 */}
                <h3 className="text-sm font-semibold tracking-[0.01em] text-slate-800">{title}</h3>

                {/* 右侧功能组 */}
                <div className="flex items-center gap-2">
                    {/* 业务功能组 */}
                    {businessActions && (
                        <div className="flex items-center gap-1 pr-2 border-r border-gray-300">
                            {businessActions}
                        </div>
                    )}

                    {/* View 功能组 (所有模块相同) */}
                    <div className="flex items-center gap-1">
                        {onCollapse && (
                            <button
                                onClick={onCollapse}
                                className="p-0 w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:text-[#0EA5B7] hover:bg-white transition-colors"
                                title="收起并返回表格"
                            >
                                <IconChevronLeft size={18} />
                            </button>
                        )}
                        <button
                            onClick={handleOpenWindow}
                            className="p-0 w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:text-[#0EA5B7] hover:bg-white transition-colors"
                            title="打开独立窗口"
                        >
                            <IconExternalLink size={18} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-0 w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                            title="关闭"
                        >
                            <IconX size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* 内容区 */}
            <div className="flex-1 overflow-y-auto bg-[#f3f6f8]">
                {children}
            </div>
        </div>
    );
};

export default FooterModal;

