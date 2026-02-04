import { useState, useEffect } from 'react';
import L1Sidebar from './components/layout/L1Sidebar';
import Workbench from './components/layout/Workbench';
import { HeaderProvider } from './context/HeaderContext';
import { projectData, researchObjectData } from './data/mockData';

// Modes
const MODES = {
    HOME: 'MODE_HOME',   // Dashboard
    WIDE: 'MODE_WIDE',   // Project (Full Width)
    SPLIT: 'MODE_SPLIT'  // Project (Sidebar + Content)
};

export default function App() {
    // App State
    const [activeL1, setActiveL1] = useState('home');
    const [activeL2, setActiveL2] = useState(null);
    const [activeL3, setActiveL3] = useState('acct_basic');
    const [mode, setMode] = useState(MODES.HOME);

    // State for Business Mode Navigation (Lifted from Workbench)
    const [businessTarget, setBusinessTarget] = useState('database_mgmt');
    const [openedTabs, setOpenedTabs] = useState([]);

    // Data State (Lifted for Persistence)
    const [projects, setProjects] = useState(projectData);
    const [researchObjects, setResearchObjects] = useState(researchObjectData);

    const handleAddProject = (newProject) => {
        setProjects(prev => [newProject, ...prev]);
    };

    const handleAddResearchObject = (newObj) => {
        setResearchObjects(prev => [newObj, ...prev]);
    };

    // Scoped History State for Project Mode
    const [projHistory, setProjHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Helper to push new state to scoped history
    const pushToProjHistory = (l2, l3) => {
        setProjHistory(prev => {
            const newHistory = prev.slice(0, historyIndex + 1);
            newHistory.push({ l2, l3 });
            return newHistory;
        });
        setHistoryIndex(prev => prev + 1);
    };

    // Derived State
    const isProjectLayout = activeL1 === 'project_tag';
    const businessModes = ['background_data', 'project_mgmt', 'enterprise'];
    const isBusinessLayout = businessModes.includes(activeL1);

    // Unified Sync Logic for Modes and Layouts
    useEffect(() => {
        const isDetailView = businessTarget && businessTarget.startsWith('detail_');

        if (isProjectLayout || isDetailView) {
            // Project-style Layouts
            if (activeL2 === 'accounting') {
                setMode(MODES.SPLIT);
            } else {
                setMode(MODES.WIDE);
            }
            if (!activeL2) setActiveL2('navigation');
        } else if (isBusinessLayout) {
            // Standard Business List Views
            setMode(MODES.HOME);
        } else {
            // Dashboard / Default
            setMode(MODES.HOME);
        }
    }, [activeL1, businessTarget, activeL2, isProjectLayout, isBusinessLayout]);

    // Tab Handlers
    const handleOpenTab = (item) => {
        const tabId = `detail_${item.id}`;
        // Add tab if not exists
        if (!openedTabs.find(t => t.id === tabId)) {
            const newTab = {
                id: tabId,
                title: item.name,
                type: 'detail',
                data: item,
                l1Context: activeL1 // Store origin context
            };
            setOpenedTabs(prev => [...prev, newTab]);
        }
        // Switch to the tab
        setBusinessTarget(tabId);
        setActiveL2('navigation'); // Force Default L2 Selection on Open
    };

    const handleCloseTab = (tabId, e) => {
        if (e) e.stopPropagation();

        const newTabs = openedTabs.filter(t => t.id !== tabId);
        setOpenedTabs(newTabs);

        // If closing current tab, switch back to default list
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
            // Set Target
            setBusinessTarget(tabId);

            // Ensure L2 Sidebar defaults to Navigation (first menu) when entering detail view
            if (tab.l1Context === 'enterprise') {
                setActiveL2('ent_projects');
            } else {
                setActiveL2('navigation');
            }
        }
    };

    // Handlers
    const updateUrl = (l1, l2, l3) => {
        const url = new URL(window.location);
        if (l1) url.searchParams.set('l1', l1);
        if (l2) url.searchParams.set('l2', l2);
        if (l3) url.searchParams.set('l3', l3);
        window.history.pushState({ l1, l2, l3 }, '', url);
    };

    const handleL1Change = (val) => {
        const nextL2 = val === 'project_tag' ? 'navigation' : null;
        const nextL3 = 'acct_basic';

        setActiveL1(val);
        setActiveL2(nextL2);
        setActiveL3(nextL3);
        updateUrl(val, nextL2, nextL3);

        // Set Default Business Target (moved from useEffect)
        if (val === 'background_data') setBusinessTarget('database_mgmt');
        else if (val === 'project_mgmt') setBusinessTarget('all_projects');
        else if (val === 'enterprise') setBusinessTarget('all_objects');

        // Reset history when entering project mode afresh
        if (val === 'project_tag') {
            setProjHistory([{ l2: nextL2, l3: nextL3 }]);
            setHistoryIndex(0);
        }
    };


    const handleL2Change = (val) => {
        setActiveL2(val);
        updateUrl(activeL1, val, activeL3);

        // Push to history if in project mode
        if (activeL1 === 'project_tag') {
            // Check if actually changed to avoid dups
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

    // Scoped Back/Forward Handlers
    const handleProjectBack = () => {
        if (historyIndex > 0) {
            const prevIndex = historyIndex - 1;
            const state = projHistory[prevIndex];
            setHistoryIndex(prevIndex);

            // Restore State without pushing (just visual update)
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

            // Restore State
            setActiveL2(state.l2);
            setActiveL3(state.l3);
            updateUrl('project_tag', state.l2, state.l3);
        }
    };

    // Initialize from URL & POPSTATE Listener
    useEffect(() => {
        const syncStateFromUrl = () => {
            const params = new URLSearchParams(window.location.search);
            const l1 = params.get('l1') || 'home';
            const l2 = params.get('l2') || (l1 === 'project_tag' ? 'navigation' : null);
            const l3 = params.get('l3') || 'acct_basic';

            setActiveL1(l1);
            setActiveL2(l2);
            setActiveL3(l3);

            // Sync Default Business Target on Init
            if (l1 === 'background_data') setBusinessTarget('database_mgmt');
            else if (l1 === 'project_mgmt') setBusinessTarget('all_projects');
            else if (l1 === 'enterprise') setBusinessTarget('all_objects');
        };

        // Initial sync
        syncStateFromUrl();

        // Listener
        const handlePopState = () => syncStateFromUrl();
        window.addEventListener('popstate', handlePopState);

        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return (
        <HeaderProvider>
            <div className="flex h-screen w-screen bg-[#1E2A32] overflow-hidden text-[#4D4D4D] relative">
                {/* L1 Sidebar */}
                <L1Sidebar
                    activeL1={activeL1}
                    onSelect={handleL1Change}
                    // Tab Props
                    openedTabs={openedTabs}
                    activeTarget={businessTarget}
                    onSelectTab={handleTabClick}
                    onCloseTab={handleCloseTab}
                />

                {/* Workbench (Floating Card) */}
                <Workbench
                    mode={mode}
                    activeL1={activeL1}
                    activeL2={activeL2}
                    activeL3={activeL3}
                    onL2Change={handleL2Change}
                    onL3Change={handleL3Change}
                    isProjectLayout={isProjectLayout}
                    isBusinessLayout={isBusinessLayout}

                    // Business Logic Props (Lifted)
                    businessTarget={businessTarget}
                    setBusinessTarget={setBusinessTarget}
                    openedTabs={openedTabs}
                    onOpenTab={handleOpenTab}
                    onCloseTab={handleCloseTab} // Pass the App-level handler

                    // Scoped Navigation Props
                    onProjectForward={handleProjectForward}
                    canGoBack={historyIndex > 0}
                    canGoForward={historyIndex < projHistory.length - 1}

                    // Data Props
                    projects={projects}
                    onAddProject={handleAddProject}
                    researchObjects={researchObjects}
                    onAddResearchObject={handleAddResearchObject}
                />
            </div>
        </HeaderProvider>
    );
}
