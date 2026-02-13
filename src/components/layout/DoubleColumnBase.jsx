/**
 * DoubleColumnBase - 双栏布局底层引擎
 * 
 * 🏢 角色：布局基础设施 (Layout Infrastructure)
 * 📝 职责：
 * 1. 提供纯粹的双栏布局结构和样式
 * 2. 所有Tailwind布局、比例、滚动容器隔离逻辑集中处理
 * 3. 严格的Header高度对齐（44px）
 * 4. 不包含任何业务逻辑
 * 
 * ⚠️ 注意：
 * - 这是唯一允许包含复杂布局CSS的地方
 * - 所有模板必须基于此组件派生
 * - Header高度与L3Sidebar、InnerDrawer保持一致（44px）
 * - 无Footer区域，操作统一在Header
 */
import React from 'react';
import ViewContainer from './ViewContainer';

export const DoubleColumnBase = ({
    // 左栏配置
    leftWidth = "w-1/4 min-w-[280px]",
    leftHeader = null,
    leftBody = null,

    // 右栏配置
    rightWidth = "flex-1",
    rightHeader = null,
    rightBody = null,

    // 样式覆盖（谨慎使用）
    className = '',
    leftClassName = '',
    rightClassName = '',
}) => {
    return (
        <ViewContainer type="fixed" className={`${className} h-full`}>
            <div className="flex h-full w-full bg-[#F5F6F8] relative">

                {/* ========== 左栏 ========== */}
                <div className={`${leftWidth} flex flex-col border-r border-[#E5E9EB] h-full bg-white ${leftClassName}`}>

                    {/* Left Header - 固定高度 44px */}
                    {leftHeader && (
                        <div className="h-[44px] flex items-center px-4 bg-white border-b border-[#E5E9EB] shrink-0">
                            {leftHeader}
                        </div>
                    )}

                    {/* Left Body - 滚动区域，从Header下方一直到底部 */}
                    <div className="flex-1 overflow-y-auto">
                        {leftBody}
                    </div>

                </div>

                {/* ========== 右栏 ========== */}
                <div className={`${rightWidth} flex flex-col h-full bg-[#F5F6F8] ${rightClassName}`}>

                    {/* Right Header - 固定高度 44px */}
                    {rightHeader && (
                        <div className="h-[44px] flex items-center justify-between px-4 bg-white border-b border-[#E5E9EB] shrink-0">
                            {rightHeader}
                        </div>
                    )}

                    {/* Right Body - 滚动区域，从Header下方一直到底部 */}
                    <div className="flex-1 overflow-y-auto p-3">
                        {rightBody}
                    </div>

                </div>

            </div>
        </ViewContainer>
    );
};

export default DoubleColumnBase;
