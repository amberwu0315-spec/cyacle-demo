/**
 * ViewActionsContext - 视图操作上下文
 * 
 * 🏢 角色：前台接待
 * 📝 职责：处理纯界面的交互，不涉及核心生产。比如“把侧边栏关一下”、“打开那个弹窗”。
 * 🔧 包含：sidebarOpen (侧边栏状态), activeModal (当前弹窗).
 */
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAppNavigation } from './AppNavigationContext';

// Define the context
const ViewActionsContext = createContext({
    sidebarOpen: true,
    toggleSidebar: () => { },
    activeModal: null,
    openModal: () => { },
    closeModal: () => { },
});

// Custom hook to use the context
export const useViewActions = () => useContext(ViewActionsContext);

// Provider component
export const ViewActionsProvider = ({ children }) => {
    // Manage purely UI state that doesn't belong in specific pages
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeModal, setActiveModal] = useState(null);

    // 🔧 修复深层状态断层：监听 L1 导航变化，自动清理 Modal 状态
    const { activeL1 } = useAppNavigation();

    useEffect(() => {
        // 当一级导航切换时，强制关闭所有可能打开的弹窗或抽屉
        // 这确保用户从深层视图（如三级菜单+InnerDrawer）切换到其他 L1 时，
        // 不会出现"UI 残影"或状态残留问题
        setActiveModal(null);
    }, [activeL1]);

    const toggleSidebar = useCallback(() => {
        setSidebarOpen(prev => !prev);
    }, []);

    const openModal = useCallback((modalId, props = {}) => {
        setActiveModal({ id: modalId, props });
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
    }, []);

    return (
        <ViewActionsContext.Provider value={{
            sidebarOpen, toggleSidebar,
            activeModal, openModal, closeModal
        }}>
            {children}
        </ViewActionsContext.Provider>
    );
};
