/**
 * ViewActionsContext - 视图操作上下文
 * 
 * 🏢 角色：前台接待
 * 📝 职责：处理纯界面的交互，不涉及核心生产。比如“把侧边栏关一下”、“打开那个弹窗”。
 * 🔧 包含：sidebarOpen (侧边栏状态), activeModal (当前弹窗).
 */
import React, { createContext, useContext, useState, useCallback } from 'react';

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
