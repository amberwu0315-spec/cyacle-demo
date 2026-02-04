import React from 'react';
import ViewContainer from './ViewContainer';
import { IconLogout, IconChevronLeft } from '@tabler/icons-react'; // Changed IconX to IconLogout

/**
 * 1. 单栏页面 (Single Column Page)
 * ... (Unchanged)
 */
export const SingleColumnPage = ({ children, className = '' }) => {
    return (
        <ViewContainer type="scroll" className={`flex flex-col gap-4 ${className}`}>
            {children}
        </ViewContainer>
    );
};

/**
 * 2. 双栏页面 (Double Column Page)
 * 
 * @param {string} variant - 'standard' (Independent/EmptyLeft) | 'sidebar' (Dependent/ListLeft)
 * @param {object} leftHeader - { title, onExit }
 * @param {object} rightHeader - { title, isEditable, businessActions, viewActions }
 */
export const DoubleColumnPage = ({
    leftRender,      // Custom Body Content (Left)
    rightRender,     // Custom Body Content (Right)
    leftHeader,      // Configuration for Left Header
    rightHeader,     // Configuration for Right Header
    variant = 'standard',
    leftWidth = "w-1/4 min-w-[280px]", // 1:3 Ratio (~25% width)
    rightWidth = "flex-1",
    className = ''
}) => {

    // Left Header Component
    const LeftHeader = () => {
        if (!leftHeader) return null;
        return (
            <div
                className="flex items-center justify-between px-4 bg-white border-b border-[#E5E9EB] shrink-0 sticky top-0 z-10"
                style={{ height: '46px' }} // Match standard header height
            >
                <div className="flex items-baseline gap-2 truncate pr-2">
                    <span className="font-bold text-gray-800 text-lg">
                        {leftHeader.title || 'Menu'}
                    </span>
                    {leftHeader.operation && (
                        <span className="text-sm text-gray-500">
                            {leftHeader.operation}
                        </span>
                    )}
                </div>
                {leftHeader.onExit && (
                    <button
                        onClick={leftHeader.onExit}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
                        title="退出"
                    >
                        <IconLogout size={18} />
                    </button>
                )}
            </div>
        );
    };

    // Right Header Component
    const RightHeader = () => {
        if (!rightHeader) return null;
        return (
            <div
                className="flex items-center justify-between px-4 bg-white border-b border-[#E5E9EB] shrink-0 sticky top-0 z-10"
                style={{ height: '46px' }} // Match standard header height
            >
                {/* Title Area */}
                <div className="flex items-center gap-2">
                    {/* Optional Back Icon if needed, or just Title */}
                    <div className="font-medium text-[#087F9C] text-sm">
                        {rightHeader.title || 'Untitled'}
                    </div>
                </div>

                {/* Actions Area */}
                <div className="flex items-center gap-4">
                    {/* Business Actions (Create, Cancel, etc.) */}
                    {rightHeader.businessActions && (
                        <div className="flex items-center gap-2">
                            {rightHeader.businessActions}
                        </div>
                    )}

                    {/* Separator if both exist */}
                    {rightHeader.businessActions && rightHeader.viewActions && (
                        <div className="h-4 w-px bg-gray-200"></div>
                    )}

                    {/* View Actions (Open Window, Close, etc.) */}
                    {rightHeader.viewActions && (
                        <div className="flex items-center gap-2">
                            {rightHeader.viewActions}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Unified Canvas Structure
    // Outer: Single Card, Flex Row, Zero Border, Zero Radius at Left
    // Left: Flex Col, Border Right
    // Right: Flex Col
    return (
        <ViewContainer type="fixed" className={`${className} h-full`}> {/* No outer padding */}
            <div className="flex h-full w-full bg-[#F5F6F8] relative"> {/* Unified Background */}

                {/* Left Column */}
                <div className={`${leftWidth} flex flex-col border-r border-[#E5E9EB] h-full`}> {/* Custom Border Color */}
                    <LeftHeader />
                    <div className="flex-1 overflow-y-auto p-3">
                        {leftRender || (
                            // Default Empty State for Standard variant
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <span className="text-xs">暂无内容</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className={`${rightWidth} flex flex-col h-full bg-[#F5F6F8]`}>
                    <RightHeader />
                    <div className="flex-1 overflow-y-auto p-3">
                        {rightRender}
                    </div>
                </div>

            </div>
        </ViewContainer>
    );
};

/**
 * 3. 画布页面 (Canvas Page / Fixed Page)
 * ... (Unchanged)
 */
export const CanvasPage = ({ children, className = '' }) => {
    return (
        <ViewContainer type="fixed" className={className}>
            {children}
        </ViewContainer>
    );
};
