import React from 'react';
import { IconHistory, IconTrash, IconExternalLink, IconX, IconPlus } from '@tabler/icons-react';

/**
 * FooterModal 通用组件
 * 
 * 为所有 Footer 悬浮窗提供标准化的顶部栏和容器结构
 * 
 * 定位规则（来自 product_logic.md）：
 * - Position: absolute top-0 left-0 bottom-[40px] right-0 (相对于 #right-zone)
 * - 覆盖范围：Header + L3 Sidebar + Main Content
 * - 必须显示：L1 Sidebar + L2 Sidebar + Footer
 * - 样式：4px 青色边框
 * 
 * Props:
 * - title: 标题文字
 * - businessActions: 业务功能组 (版本历史/删除/添加等)
 * - onClose: 关闭回调
 * - children: 内容区
 */
const FooterModal = ({ title, businessActions, onClose, children }) => {
    const handleOpenWindow = () => {
        console.log('Open in new window:', title);
        // TODO: 实现独立窗口功能
    };

    return (
        <div className="absolute top-0 left-0 bottom-[40px] right-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col shadow-2xl border-4 border-[#087F9C] rounded-t-lg">
            {/* 顶部栏 */}
            <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center justify-between px-3 shrink-0">
                {/* 左侧标题 */}
                <h3 className="text-sm font-medium text-gray-800">{title}</h3>

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
                        <button
                            onClick={handleOpenWindow}
                            className="p-1.5 text-gray-600 hover:text-[#087F9C] hover:bg-gray-100 rounded transition-colors"
                            title="打开独立窗口"
                        >
                            <IconExternalLink size={16} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                            title="关闭"
                        >
                            <IconX size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* 内容区 */}
            <div className="flex-1 overflow-y-auto bg-[#F5F6F8]">
                {children}
            </div>
        </div>
    );
};

export default FooterModal;
