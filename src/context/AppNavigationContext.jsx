/**
 * AppNavigationContext - 应用导航上下文
 * 
 * 🏢 角色：战略部 / 地图
 * 📝 职责：规划宏观路线，管理一级菜单 (L1) 和应用整体模式 (Split/Wide)。
 * 🔧 包含：activeL1 (一级菜单), mode (宽屏/分栏模式), openedTabs (多页签状态).
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

// Modes
export const MODES = {
    HOME: 'MODE_HOME',   // Dashboard
    WIDE: 'MODE_WIDE',   // Project (Full Width)
    SPLIT: 'MODE_SPLIT'  // Project (Sidebar + Content)
};

const AppNavigationContext = createContext(null);

export const AppNavigationProvider = ({ children }) => {
    // App State
    const [activeL1, setActiveL1] = useState('home');
    const [activeL2, setActiveL2] = useState(null);
    const [activeL3, setActiveL3] = useState(null);
    const [mode, setMode] = useState(MODES.HOME);

    // Business Navigation
    const [businessTarget, setBusinessTarget] = useState('database_mgmt');
    const [openedTabs, setOpenedTabs] = useState([]);

    // Scoped History
    const [projHistory, setProjHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Derived State
    const isProjectLayout = activeL1 === 'project_tag';
    const businessModes = ['background_data', 'project_mgmt', 'enterprise'];
    const isBusinessLayout = businessModes.includes(activeL1);

    // --- Core Logic ---

    // 1. Unified Sync Logic (Modes & Layouts)
    useEffect(() => {
        const isDetailView = businessTarget && businessTarget.startsWith('detail_');

        if (isProjectLayout || isDetailView) {
            if (activeL2 === 'accounting') {
                setMode(MODES.SPLIT);
            } else {
                setMode(MODES.WIDE);
            }
            if (!activeL2) setActiveL2('navigation');
        } else if (isBusinessLayout) {
            setMode(MODES.HOME);
        } else {
            setMode(MODES.HOME);
        }
    }, [activeL1, businessTarget, activeL2, isProjectLayout, isBusinessLayout]);

    // 2. URL Synchronization
    const updateUrl = (l1, l2, l3) => {
        const url = new URL(window.location);
        if (l1) {
            url.searchParams.set('l1', l1);
        } else {
            url.searchParams.delete('l1');
        }
        if (l2) {
            url.searchParams.set('l2', l2);
        } else {
            url.searchParams.delete('l2');
        }
        if (l3) {
            url.searchParams.set('l3', l3);
        } else {
            url.searchParams.delete('l3');
        }
        window.history.pushState({ l1, l2, l3 }, '', url);
    };

    // 3. History Management helpers
    const pushToProjHistory = (l2, l3) => {
        setProjHistory(prev => {
            const newHistory = prev.slice(0, historyIndex + 1);
            newHistory.push({ l2, l3 });
            return newHistory;
        });
        setHistoryIndex(prev => prev + 1);
    };

    // --- Actions ---

    // Keep detail entry behavior consistent across "open new tab" and "click existing tab".
    const getDetailDefaultL2 = (l1Context) => (
        l1Context === 'enterprise' ? 'ent_projects' : 'navigation'
    );

    const handleL1Change = (val) => {
        const nextL2 = val === 'project_tag' ? 'navigation' : null;
        const nextL3 = val === 'project_tag' ? 'acct_basic' : null;

        setActiveL1(val);
        setActiveL2(nextL2);
        setActiveL3(nextL3);
        updateUrl(val, nextL2, nextL3);

        if (val === 'background_data') setBusinessTarget('database_mgmt');
        else if (val === 'project_mgmt') setBusinessTarget('all_projects');
        else if (val === 'enterprise') setBusinessTarget('all_objects');

        if (val === 'project_tag') {
            setProjHistory([{ l2: nextL2, l3: nextL3 }]);
            setHistoryIndex(0);
        }
    };

    const handleL2Change = (val) => {
        setActiveL2(val);
        updateUrl(activeL1, val, activeL3);

        if (activeL1 === 'project_tag') {
            const current = projHistory[historyIndex];
            if (!current || current.l2 !== val || current.l3 !== activeL3) {
                pushToProjHistory(val, activeL3);
            }
        }
    };

    const handleL3Change = (val) => {
        setActiveL3(val);
        updateUrl(activeL1, activeL2, val);

        if (activeL1 === 'project_tag') {
            const current = projHistory[historyIndex];
            if (!current || current.l2 !== activeL2 || current.l3 !== val) {
                pushToProjHistory(activeL2, val);
            }
        }
    };

    // Tab Interface
    const handleOpenTab = (item) => {
        const tabId = `detail_${item.id}`;
        const detailL2 = getDetailDefaultL2(activeL1);
        if (!openedTabs.find(t => t.id === tabId)) {
            const newTab = {
                id: tabId,
                title: item.name,
                type: 'detail',
                data: item,
                l1Context: activeL1
            };
            setOpenedTabs(prev => [...prev, newTab]);
        }
        setBusinessTarget(tabId);
        setActiveL2(detailL2);
    };

    const handleCloseTab = (tabId, e) => {
        if (e) e.stopPropagation();
        const newTabs = openedTabs.filter(t => t.id !== tabId);
        setOpenedTabs(newTabs);

        if (businessTarget === tabId) {
            let defaultTarget = 'all_projects';
            if (activeL1 === 'background_data') defaultTarget = 'database_mgmt';
            if (activeL1 === 'enterprise') defaultTarget = 'all_objects';
            setBusinessTarget(defaultTarget);
        }
    };

    const handleTabClick = (tabId) => {
        const tab = openedTabs.find(t => t.id === tabId);
        if (tab) {
            setBusinessTarget(tabId);
            setActiveL2(getDetailDefaultL2(tab.l1Context));
        }
    };

    // History Actions
    const handleProjectBack = () => {
        if (historyIndex > 0) {
            const prevIndex = historyIndex - 1;
            const state = projHistory[prevIndex];
            setHistoryIndex(prevIndex);
            setActiveL2(state.l2);
            setActiveL3(state.l3);
            updateUrl('project_tag', state.l2, state.l3);
        }
    };

    const handleProjectForward = () => {
        if (historyIndex < projHistory.length - 1) {
            const nextIndex = historyIndex + 1;
            const state = projHistory[nextIndex];
            setHistoryIndex(nextIndex);
            setActiveL2(state.l2);
            setActiveL3(state.l3);
            updateUrl('project_tag', state.l2, state.l3);
        }
    };

    // Initialization & Event Listeners
    useEffect(() => {
        const syncStateFromUrl = () => {
            const params = new URLSearchParams(window.location.search);
            const l1 = params.get('l1') || 'home';
            const l2 = params.get('l2') || (l1 === 'project_tag' ? 'navigation' : null);
            const l3 = params.get('l3') || (l1 === 'project_tag' ? 'acct_basic' : null);

            setActiveL1(l1);
            setActiveL2(l2);
            setActiveL3(l3);

            if (l1 === 'background_data') setBusinessTarget('database_mgmt');
            else if (l1 === 'project_mgmt') setBusinessTarget('all_projects');
            else if (l1 === 'enterprise') setBusinessTarget('all_objects');
        };

        syncStateFromUrl();

        const handlePopState = () => syncStateFromUrl();
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const value = {
        // State
        activeL1, activeL2, activeL3, mode,
        businessTarget, openedTabs,
        isProjectLayout, isBusinessLayout,
        canGoBack: historyIndex > 0,
        canGoForward: historyIndex < projHistory.length - 1,

        // Actions
        setActiveL1: handleL1Change,
        setActiveL2: handleL2Change,
        setActiveL3: handleL3Change,
        setBusinessTarget, // Directly exposed if needed

        // Tab Actions
        openTab: handleOpenTab,
        closeTab: handleCloseTab,
        clickTab: handleTabClick,

        // History Actions
        goBack: handleProjectBack,
        goForward: handleProjectForward
    };

    return (
        <AppNavigationContext.Provider value={value}>
            {children}
        </AppNavigationContext.Provider>
    );
};

export const useAppNavigation = () => {
    const context = useContext(AppNavigationContext);
    if (!context) {
        throw new Error('useAppNavigation must be used within an AppNavigationProvider');
    }
    return context;
};
