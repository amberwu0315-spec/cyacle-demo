import React from 'react';

/**
 * ViewContainer - 标准页面容器
 * 
 * 用于统一处理页面的滚动策略和基础布局。
 * 
 * @param {string} type - 页面类型 (Page Type)
 *   - 'scroll': (滚动页) 也就是之前的 "Document"。容器会有滚动条，内容负责从上往下堆叠。
 *               适合：NavigationPage, 详情页, 表单页.
 *   - 'fixed':  (固定页) 也就是之前的 "Canvas"。容器没有滚动条(锁死)，高度占满，内部组件自己决定怎么滚。
 *               适合：StandardBusinessLayout, 仪表盘, 地图.
 * @param {string} className - 额外样式
 * @param {React.ReactNode} children - 页面内容
 */
const ViewContainer = ({ type = 'scroll', className = '', children }) => {

    // Base classes for all views
    const baseClasses = "w-full h-full relative transition-all duration-300";

    // Type-specific strategies
    const typeClasses = {
        // Scroll: Auto scroll Y, hide scroll X
        scroll: "overflow-y-auto overflow-x-hidden",

        // Fixed: No scroll on container, flex column to allow children to flex
        fixed: "overflow-hidden flex flex-col"
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type] || typeClasses.scroll} ${className}`}>
            {children}
        </div>
    );
};

export default ViewContainer;
