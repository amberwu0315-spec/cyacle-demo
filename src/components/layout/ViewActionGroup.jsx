/**
 * ViewActionGroup - 视图操作按钮组
 * 
 * 🏢 角色：可复用的导航控件 (Reusable Nav Controls)
 * 📝 职责：
 * 1. 提供标准的“后退”、“前进”、“新窗口打开”按钮。
 * 2. 通常嵌入在 Header 中，由 PagePresentationContext 传递。
 */
import React from 'react';
import { IconChevronLeft, IconChevronRight, IconExternalLink } from '@tabler/icons-react';
import Tooltip from '../common/Tooltip';
import Button from '../common/Button';

const ViewActionGroup = ({
    showDivider = true,
    onBack,
    onForward,
    canBack = true, // Default to true if not managed (browser default)
    canForward = true
}) => {

    // Use provided handlers or fallback to browser history
    const handleBack = onBack || (() => window.history.back());
    const handleForward = onForward || (() => window.history.forward());

    const handleOpenWindow = () => {
        window.open(window.location.href, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="flex items-center">
            {/* Optional Divider */}
            {showDivider && (
                <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
            )}

            {/* Button Group (View功能组) */}
            <div className="flex items-center gap-1">
                <Tooltip content={canBack ? "后退 (Back)" : "无上一步记录 (No History)"}>
                    <button
                        onClick={handleBack}
                        disabled={!canBack}
                        className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors 
                            ${!canBack ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-primary-action hover:bg-cyan-50'}
                        `}
                    >
                        <IconChevronLeft size={20} stroke={1.5} />
                    </button>
                </Tooltip>

                <Tooltip content={canForward ? "前进 (Forward)" : "无下一步记录 (No Forward)"}>
                    <button
                        onClick={handleForward}
                        disabled={!canForward}
                        className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors 
                            ${!canForward ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-primary-action hover:bg-cyan-50'}
                        `}
                    >
                        <IconChevronRight size={20} stroke={1.5} />
                    </button>
                </Tooltip>

                <Tooltip content="在新窗口打开">
                    <button
                        onClick={handleOpenWindow}
                        className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:text-primary-action hover:bg-cyan-50 transition-colors"
                    >
                        <IconExternalLink size={20} stroke={1.5} />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default ViewActionGroup;
