/**
 * ViewActionsContext - 视图操作上下文
 * 
 * 🏢 角色：前台接待
 * 📝 职责：处理纯界面的交互，不涉及核心生产。比如“把侧边栏关一下”、“打开那个弹窗”。
 * 🔧 包含：sidebarOpen (侧边栏状态), activeModal (当前弹窗).
 */
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useAppNavigation } from './AppNavigationContext';
import { readStore, writeStore } from '../utils/persistStore';

// Define the context
const ViewActionsContext = createContext({
    sidebarOpen: true,
    toggleSidebar: () => { },
    activeModal: null,
    openModal: () => { },
    closeModal: () => { },
});

const VIEW_MODAL_SESSION_KEY = 'cyacle:overlay:view-modal';

// Custom hook to use the context
export const useViewActions = () => useContext(ViewActionsContext);

// Provider component
export const ViewActionsProvider = ({ children }) => {
    // Manage purely UI state that doesn't belong in specific pages
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeModal, setActiveModal] = useState(null);
    const restoreDoneRef = useRef(false);
    const prevRouteRef = useRef({ activeL1: null, activeL2: null, activeL3: null });

    // 🔧 修复深层状态断层：监听 L1 导航变化，自动清理 Modal 状态
    const { activeL1, activeL2, activeL3, isHydrated } = useAppNavigation();

    useEffect(() => {
        if (!isHydrated || restoreDoneRef.current) {
            return;
        }
        const saved = readStore(VIEW_MODAL_SESSION_KEY, null);
        restoreDoneRef.current = true;
        if (!saved?.activeModal) {
            prevRouteRef.current = { activeL1, activeL2, activeL3 };
            return;
        }

        const sameRoute = saved?.route?.activeL1 === activeL1
            && saved?.route?.activeL2 === activeL2
            && saved?.route?.activeL3 === activeL3;
        if (sameRoute) {
            setActiveModal(saved.activeModal);
        }
        prevRouteRef.current = { activeL1, activeL2, activeL3 };
    }, [activeL1, activeL2, activeL3, isHydrated]);

    useEffect(() => {
        if (!isHydrated) {
            return;
        }
        writeStore(VIEW_MODAL_SESSION_KEY, {
            activeModal,
            route: { activeL1, activeL2, activeL3 }
        });
    }, [activeModal, activeL1, activeL2, activeL3, isHydrated]);

    useEffect(() => {
        if (!isHydrated) {
            return;
        }
        const prev = prevRouteRef.current;
        const routeChanged = prev.activeL1 !== null
            && (prev.activeL1 !== activeL1 || prev.activeL2 !== activeL2 || prev.activeL3 !== activeL3);
        if (routeChanged) {
            setActiveModal(null);
        }
        prevRouteRef.current = { activeL1, activeL2, activeL3 };
    }, [activeL1, activeL2, activeL3, isHydrated]);

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
