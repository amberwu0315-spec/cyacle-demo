import React from 'react';
import { IconChevronLeft, IconChevronRight, IconExternalLink } from '@tabler/icons-react';
import Tooltip from '../common/Tooltip';

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
                <div className="h-4 w-[1px] bg-gray-300 mx-2"></div>
            )}

            {/* Button Group (View功能组) */}
            <div className="flex items-center gap-1">
                <Tooltip content={canBack ? "后退 (Back)" : "无上一步记录 (No History)"}>
                    {/* Wrap enabled/disabled button */}
                    <button
                        onClick={handleBack}
                        disabled={!canBack}
                        className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed block"
                    >
                        <IconChevronLeft size={18} />
                    </button>
                </Tooltip>

                <Tooltip content={canForward ? "前进 (Forward)" : "无下一步记录 (No Forward)"}>
                    <button
                        onClick={handleForward}
                        disabled={!canForward}
                        className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed block"
                    >
                        <IconChevronRight size={18} />
                    </button>
                </Tooltip>

                <Tooltip content="在新窗口打开">
                    <button
                        onClick={handleOpenWindow}
                        className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors block"
                    >
                        <IconExternalLink size={18} />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default ViewActionGroup;
