/**
 * AppNavigationContext - 应用导航上下文
 * 
 * 🏢 角色：战略部 / 地图
 * 📝 职责：规划宏观路线，管理一级菜单 (L1) 和应用整体模式 (Split/Wide)。
 * 🔧 包含：activeL1 (一级菜单), mode (宽屏/分栏模式), openedTabs (多页签状态).
 */
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { readStore, writeStore } from '../utils/persistStore';
import { ENTERPRISE_DETAIL_DEFAULT_L2 } from '../config/enterpriseDetailConfig';
import { APP_NAV_L1_IDS, getL1Defaults } from '../config/appNavigationConfig';
import { useData } from './DataContext';

// Modes
export const MODES = {
    HOME: 'MODE_HOME',   // Dashboard
    WIDE: 'MODE_WIDE',   // Project (Full Width)
    SPLIT: 'MODE_SPLIT'  // Project (Sidebar + Content)
};

const AppNavigationContext = createContext(null);
const NAV_SESSION_KEY = 'cyacle:nav:session';
const DEFAULT_L1 = 'workspace';

const resolveDefaultBusinessTarget = (l1) => {
    const target = getL1Defaults(l1).defaultTarget;
    if (target) {
        return target;
    }
    return getL1Defaults(DEFAULT_L1).defaultTarget || 'workbench_home';
};

const resolveDefaultL2 = (l1) => {
    const l2 = getL1Defaults(l1).defaultL2;
    return l2 ?? null;
};

const resolveDefaultL3 = (l1) => {
    const l3 = getL1Defaults(l1).defaultL3;
    return l3 ?? null;
};
const buildDetailTabId = (l1Context, itemId) => `detail_${l1Context}_${itemId}`;
const isSameDetailTab = (tab, item, l1Context) => (
    tab?.type === 'detail'
    && tab?.l1Context === l1Context
    && String(tab?.data?.id) === String(item?.id)
);
const isSameSnapshot = (a, b) => JSON.stringify(a || null) === JSON.stringify(b || null);
const resolveNavigationSnapshot = (existingTabs = []) => {
    const params = typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams('');
    const persisted = readStore(NAV_SESSION_KEY, {});
    const validL1 = APP_NAV_L1_IDS;
    const rawL1 = params.get('l1');
    const l1 = validL1.includes(rawL1)
        ? rawL1
        : (validL1.includes(persisted?.activeL1) ? persisted.activeL1 : DEFAULT_L1);
    const l2 = params.get('l2') || persisted?.activeL2 || resolveDefaultL2(l1);
    const l3 = params.get('l3') || persisted?.activeL3 || resolveDefaultL3(l1);

    const persistedTabs = Array.isArray(persisted?.openedTabs) ? persisted.openedTabs : [];
    const knownTabs = [...persistedTabs, ...(Array.isArray(existingTabs) ? existingTabs : [])];
    const targetFromUrl = params.get('target');
    const fallbackTarget = resolveDefaultBusinessTarget(l1);
    let businessTarget = targetFromUrl || persisted?.businessTarget || fallbackTarget;

    if (businessTarget?.startsWith('detail_')) {
        const hasTargetTab = knownTabs.some((tab) => tab?.id === businessTarget);
        if (!hasTargetTab) {
            businessTarget = fallbackTarget;
        }
    }

    return {
        activeL1: l1,
        activeL2: l2,
        activeL3: l3,
        businessTarget,
        openedTabs: persistedTabs,
        projHistory: Array.isArray(persisted?.projHistory) ? persisted.projHistory : [],
        historyIndex: Number.isInteger(persisted?.historyIndex) ? persisted.historyIndex : -1
    };
};

export const AppNavigationProvider = ({ children }) => {
    const { projects, researchObjects } = useData();
    const initialSnapshotRef = useRef(null);
    if (!initialSnapshotRef.current) {
        initialSnapshotRef.current = resolveNavigationSnapshot();
    }
    const initialSnapshot = initialSnapshotRef.current;

    // App State
    const [activeL1, setActiveL1] = useState(initialSnapshot.activeL1);
    const [activeL2, setActiveL2] = useState(initialSnapshot.activeL2);
    const [activeL3, setActiveL3] = useState(initialSnapshot.activeL3);
    const [mode, setMode] = useState(MODES.HOME);

    // Business Navigation
    const [businessTarget, setBusinessTarget] = useState(initialSnapshot.businessTarget);
    const [openedTabs, setOpenedTabs] = useState(initialSnapshot.openedTabs);

    // Scoped History
    const [projHistory, setProjHistory] = useState(initialSnapshot.projHistory);
    const [historyIndex, setHistoryIndex] = useState(initialSnapshot.historyIndex);
    const [isHydrated, setIsHydrated] = useState(false);

    const activeL1Ref = useRef(activeL1);
    const activeL2Ref = useRef(activeL2);
    const activeL3Ref = useRef(activeL3);
    const businessTargetRef = useRef(businessTarget);
    const openedTabsRef = useRef(openedTabs);
    useEffect(() => {
        activeL1Ref.current = activeL1;
    }, [activeL1]);
    useEffect(() => {
        activeL2Ref.current = activeL2;
    }, [activeL2]);
    useEffect(() => {
        activeL3Ref.current = activeL3;
    }, [activeL3]);
    useEffect(() => {
        businessTargetRef.current = businessTarget;
    }, [businessTarget]);
    useEffect(() => {
        openedTabsRef.current = openedTabs;
    }, [openedTabs]);

    useEffect(() => {
        setOpenedTabs((prevTabs) => {
            let changed = false;

            const nextTabs = prevTabs.map((tab) => {
                if (tab?.type !== 'detail') {
                    return tab;
                }

                if (tab.l1Context === 'project_mgmt') {
                    const latestProject = projects.find((item) => String(item?.id) === String(tab?.data?.id));
                    if (!latestProject) {
                        return tab;
                    }
                    const nextTitle = latestProject.name || tab.title;
                    const sameData = isSameSnapshot(tab.data, latestProject);
                    if (sameData && tab.title === nextTitle) {
                        return tab;
                    }
                    changed = true;
                    return { ...tab, title: nextTitle, data: latestProject };
                }

                if (tab.l1Context === 'enterprise') {
                    const latestObject = researchObjects.find((item) => String(item?.id) === String(tab?.data?.id));
                    if (!latestObject) {
                        return tab;
                    }
                    const nextTitle = latestObject.name || tab.title;
                    const sameData = isSameSnapshot(tab.data, latestObject);
                    if (sameData && tab.title === nextTitle) {
                        return tab;
                    }
                    changed = true;
                    return { ...tab, title: nextTitle, data: latestObject };
                }

                return tab;
            });

            return changed ? nextTabs : prevTabs;
        });
    }, [projects, researchObjects]);

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
    const updateUrl = (l1, l2, l3, target, replace = false) => {
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
        if (target) {
            url.searchParams.set('target', target);
        } else {
            url.searchParams.delete('target');
        }

        const historyMethod = replace ? 'replaceState' : 'pushState';
        window.history[historyMethod]({ l1, l2, l3, target }, '', url);
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

    useEffect(() => {
        if (!isHydrated) {
            return;
        }
        writeStore(NAV_SESSION_KEY, {
            activeL1,
            activeL2,
            activeL3,
            businessTarget,
            openedTabs,
            projHistory,
            historyIndex
        });
    }, [activeL1, activeL2, activeL3, businessTarget, openedTabs, projHistory, historyIndex, isHydrated]);

    // --- Actions ---

    // Keep detail entry behavior consistent across "open new tab" and "click existing tab".
    const getDetailDefaultL2 = (l1Context) => (
        l1Context === 'enterprise' ? ENTERPRISE_DETAIL_DEFAULT_L2 : 'navigation'
    );

    const handleBusinessTargetChange = (target, options = {}) => {
        const {
            replace = false,
            l1Override,
            l2Override,
            l3Override
        } = options;
        const nextL1 = l1Override !== undefined ? l1Override : activeL1Ref.current;
        const nextL2 = l2Override !== undefined ? l2Override : activeL2Ref.current;
        const nextL3 = l3Override !== undefined ? l3Override : activeL3Ref.current;
        setBusinessTarget(target);
        updateUrl(nextL1, nextL2, nextL3, target, replace);
    };

    const handleL1Change = (val) => {
        const nextL2 = resolveDefaultL2(val);
        const nextL3 = resolveDefaultL3(val);
        const nextTarget = resolveDefaultBusinessTarget(val);

        setActiveL1(val);
        setActiveL2(nextL2);
        setActiveL3(nextL3);
        setBusinessTarget(nextTarget);
        updateUrl(val, nextL2, nextL3, nextTarget);

        if (val === 'project_tag') {
            setProjHistory([{ l2: nextL2, l3: nextL3 }]);
            setHistoryIndex(0);
        }
    };

    const handleL2Change = (val) => {
        setActiveL2(val);
        updateUrl(activeL1, val, activeL3, businessTarget);

        if (activeL1 === 'project_tag') {
            const current = projHistory[historyIndex];
            if (!current || current.l2 !== val || current.l3 !== activeL3) {
                pushToProjHistory(val, activeL3);
            }
        }
    };

    const handleL3Change = (val) => {
        setActiveL3(val);
        updateUrl(activeL1, activeL2, val, businessTarget);

        if (activeL1 === 'project_tag') {
            const current = projHistory[historyIndex];
            if (!current || current.l2 !== activeL2 || current.l3 !== val) {
                pushToProjHistory(activeL2, val);
            }
        }
    };

    // Tab Interface
    const handleOpenTab = (item, options = {}) => {
        const tabL1Context = options?.l1Context || activeL1;
        const existingTab = openedTabs.find((tab) => isSameDetailTab(tab, item, tabL1Context));
        const tabId = existingTab?.id || buildDetailTabId(tabL1Context, item?.id);
        const detailL2 = getDetailDefaultL2(tabL1Context);
        if (!existingTab) {
            const newTab = {
                id: tabId,
                title: item.name,
                type: 'detail',
                data: item,
                l1Context: tabL1Context
            };
            setOpenedTabs(prev => [...prev, newTab]);
        }
        setBusinessTarget(tabId);
        setActiveL2(detailL2);
        updateUrl(activeL1, detailL2, activeL3, tabId);
    };

    const handleCloseTab = (tabId, e) => {
        if (e) e.stopPropagation();
        const newTabs = openedTabs.filter(t => t.id !== tabId);
        setOpenedTabs(newTabs);

        if (businessTarget === tabId) {
            const defaultTarget = resolveDefaultBusinessTarget(activeL1);
            setBusinessTarget(defaultTarget);
            updateUrl(activeL1, activeL2, activeL3, defaultTarget);
        }
    };

    const handleTabClick = (tabId) => {
        const tab = openedTabs.find(t => t.id === tabId);
        if (tab) {
            setBusinessTarget(tabId);
            const detailL2 = getDetailDefaultL2(tab.l1Context);
            setActiveL2(detailL2);
            updateUrl(activeL1, detailL2, activeL3, tabId);
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
            updateUrl('project_tag', state.l2, state.l3, businessTarget);
        }
    };

    const handleProjectForward = () => {
        if (historyIndex < projHistory.length - 1) {
            const nextIndex = historyIndex + 1;
            const state = projHistory[nextIndex];
            setHistoryIndex(nextIndex);
            setActiveL2(state.l2);
            setActiveL3(state.l3);
            updateUrl('project_tag', state.l2, state.l3, businessTarget);
        }
    };

    // Initialization & Event Listeners
    useEffect(() => {
        updateUrl(
            activeL1Ref.current,
            activeL2Ref.current,
            activeL3Ref.current,
            businessTargetRef.current,
            true
        );
        setIsHydrated(true);

        const syncStateFromUrl = () => {
            const next = resolveNavigationSnapshot(openedTabsRef.current);
            setActiveL1(next.activeL1);
            setActiveL2(next.activeL2);
            setActiveL3(next.activeL3);
            setBusinessTarget(next.businessTarget);
            updateUrl(next.activeL1, next.activeL2, next.activeL3, next.businessTarget, true);
        };

        const handlePopState = () => syncStateFromUrl();
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const value = {
        // State
        activeL1, activeL2, activeL3, mode,
        businessTarget, openedTabs,
        isHydrated,
        isProjectLayout, isBusinessLayout,
        canGoBack: historyIndex > 0,
        canGoForward: historyIndex < projHistory.length - 1,

        // Actions
        setActiveL1: handleL1Change,
        setActiveL2: handleL2Change,
        setActiveL3: handleL3Change,
        setBusinessTarget: handleBusinessTargetChange,

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
