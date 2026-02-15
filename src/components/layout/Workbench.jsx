/**
 * Workbench - 工作台 (二级布局)
 * * 🏢 角色：部门经理 / 分区总管 (Zone Manager)
 * 📝 职责：
 * 1. 管理二级侧边栏 (L2Sidebar)，决定显示项目菜单还是业务菜单。
 * 2. 也是 AppNavigationContext 和 View 层 (MainContent) 之间的关键桥梁。
 * 3. 它决定了当前是“项目模式”还是“业务模式”。
 */
import { useState, useEffect, useRef } from 'react';
import L2Sidebar from './L2Sidebar';
import Header from './Header';
import MainContent from '../views/MainContent';
import Footer from './Footer';
import Modal from './Modal';
import ViewActionGroup from './ViewActionGroup';
import { useNavigation } from '../../context/NavigationContext';
import { useAppNavigation } from '../../context/AppNavigationContext'; // New Hook
import { useData } from '../../context/DataContext'; // New Hook
import { usePagePresentation } from '../../context/PagePresentationContext';
import { useUser } from '../../context/UserContext';
import { readStore, writeStore } from '../../utils/persistStore';
import { ENTERPRISE_DETAIL_TITLE_MAP } from '../../config/enterpriseDetailConfig';
import {
    PROJECT_DETAIL_DEFAULT_L2,
    getProjectDetailRouteIdsByType
} from '../../config/projectDetailConfig';

const FOOTER_MODAL_SESSION_KEY = 'cyacle:overlay:footer-modal';

/**
 * Inner Component to Consume Navigation Context
 * This bridges the prop-driven "activeL2" with the Context-driven "activeDimension"
 */
const WorkbenchContent = ({
    headerTitle,
    setHeaderTitle,
    sidebarTitle,
    setSidebarTitle
}) => {
    // 1. Consume App Navigation State
    const {
        activeL1, setActiveL1,
        activeL2, setActiveL2,
        activeL3, setActiveL3,
        mode,
        isHydrated,
        businessTarget, setBusinessTarget,
        openedTabs,
        openTab, clickTab, closeTab,
        isProjectLayout, isBusinessLayout,
        canGoBack, canGoForward,
        goBack, goForward
    } = useAppNavigation();

    // 2. Consume Data State
    const {
        projects, addProject,
        researchObjects, addResearchObject
    } = useData();

    // 3. Consume App-Level Navigation (Legacy Adapter)
    const { setActiveDimension, setActiveMode } = useNavigation();
    const { showHeader } = usePagePresentation();
    const { workspaceTargets } = useUser();

    // Derived State for Layout Switching
    const isDetailView = businessTarget && businessTarget.startsWith('detail_');
    const activeTab = openedTabs.find(t => t.id === businessTarget);
    const effectiveL1 = isDetailView ? activeTab?.l1Context : activeL1;
    const hasWorkspaceL2Menu = activeL1 === 'workspace' && workspaceTargets.length > 1;
    const activeProjectTab = isDetailView && activeTab?.l1Context === 'project_mgmt' ? activeTab : null;
    const activeProjectType = activeProjectTab?.data?.type || null;

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFooterAction, setActiveFooterAction] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const footerModalRestoredRef = useRef(false);

    useEffect(() => {
        if ((isProjectLayout || isDetailView) && activeL2) {
            setActiveDimension(activeL2);
            // Reset to config mode whenever L2 page changes via Props (Sidebar click)
            setActiveMode('config');
        } else if (isBusinessLayout && !isDetailView) {
            // Apply Widget Layout for Business Pages too (defined in navigationConfig)
            setActiveDimension(businessTarget);
            setActiveMode('config');
        }
        // [New] Workspace Logic
        if (activeL1 === 'workspace') {
            setActiveDimension('workspace');
            setActiveMode('config');
        }
    }, [activeL1, activeL2, isProjectLayout, isBusinessLayout, isDetailView, businessTarget, setActiveDimension, setActiveMode]);

    // Personal/service role has no workspace L2 sidebar and always lands on workbench_home.
    useEffect(() => {
        if (activeL1 !== 'workspace') {
            return;
        }
        if (!workspaceTargets.includes(activeL2)) {
            const fallbackL2 = workspaceTargets[0] || 'workbench_home';
            setActiveL2(fallbackL2);
        }
    }, [activeL1, workspaceTargets, activeL2, setActiveL2]);

    useEffect(() => {
        const isProjectTypeScoped = isProjectLayout || Boolean(activeProjectTab);
        if (!isProjectTypeScoped) {
            return;
        }
        const allowedL2 = getProjectDetailRouteIdsByType(activeProjectType);
        const fallbackL2 = allowedL2[0] || PROJECT_DETAIL_DEFAULT_L2;
        if (!allowedL2.includes(activeL2)) {
            setActiveL2(fallbackL2);
        }
    }, [activeL2, activeProjectType, activeProjectTab, isProjectLayout, setActiveL2]);

    // Update header title based on context
    useEffect(() => {
        // [New] 优先处理 Workspace 模式
        if (activeL1 === 'workspace') {
            if (workspaceTargets.length <= 1) {
                setHeaderTitle('工作台');
                setSidebarTitle('工作空间');
                return;
            }
            const workspaceTitleMap = {
                'workbench_home': '工作台',
                'carbon_panorama': '碳排放全景图',
                'carbon_asset_mgmt': '碳资产管理'
            };
            setHeaderTitle(workspaceTitleMap[activeL2] || '工作空间');
            setSidebarTitle('工作空间');
            return; // 结束，不执行后续逻辑
        }


        // Unified Logic for Project Layout AND Detail Views (Tabs)
        if (isProjectLayout || isDetailView) {
            // 1. Determine Project Name (Context)
            let projectName = 'My Green Project'; // Default/Placeholder
            let enterpriseName = '';
            if (isDetailView) {
                const tab = openedTabs.find(t => t.id === businessTarget);
                if (tab) {
                    projectName = tab.title;
                    enterpriseName = tab.title;
                }
            }

            // 2. Determine Page Title based on Rule A/B
            // - Navigation & Basis: Show Project Name
            // - Others (Model, Allocation, etc): Show Module Name
            const titleMap = {
                'navigation': '导航',
                'basis': '基础',
                'allocation': '分配',
                'model': '模型',
                'accounting': '核算'
            };

            if (['navigation', 'basis'].includes(activeL2)) {
                setHeaderTitle(projectName);
            } else if (effectiveL1 === 'enterprise') {
                // Enterprise Detail View: Header Title = Active Menu Name
                setHeaderTitle(ENTERPRISE_DETAIL_TITLE_MAP[activeL2] || '详情');
            } else {
                setHeaderTitle(titleMap[activeL2] || '项目');
            }

            // Set Sidebar Card Title (Always Fixed -> Project/Enterprise Name)
            setSidebarTitle(isDetailView ? (effectiveL1 === 'enterprise' ? enterpriseName : projectName) : projectName);

        } else if (isBusinessLayout) {
            const businessTitleMap = {
                'background_data': '数据库管理',
                'project_mgmt': '全部项目',
                'enterprise': '全部服务企业'
            };
            // Title Mapping based on Target (Priority) or L1
            const targetTitleMap = {
                // Background Data
                'database_mgmt': '数据库管理',
                'components': '元件',
                'factors_baseflow': '基本流',
                'factors_composite': '复合因子',
                'factors_literature': '文献因子',
                'literature': '文献',
                // Projects
                'all_projects': '全部项目',
                'pcf': '产品碳足迹', // Specific Context
                'ocf': '组织碳足迹', // Specific Context
                // Enterprise
                'all_objects': '全部服务企业' // Specific Context, distinct from 'Research Object' identity
            };

            // Logic: 
            // 1. If businessTarget is set (clicked L2 item), use its title.
            // 2. If no target (default view), use the L1 default title.
            const currentTitle = targetTitleMap[businessTarget] || businessTitleMap[effectiveL1] || '';
            setHeaderTitle(currentTitle);

        } else {
            setHeaderTitle('Dashboard');
        }
    }, [effectiveL1, activeL1, activeL2, isProjectLayout, isBusinessLayout, businessTarget, isDetailView, openedTabs, setHeaderTitle, setSidebarTitle, workspaceTargets]);

    // Auto-Close Modal
    useEffect(() => {
        if (isModalOpen) handleCloseModal();
    }, [activeL1, activeL2, activeL3]);

    useEffect(() => {
        if (!isHydrated || footerModalRestoredRef.current) {
            return;
        }

        const saved = readStore(FOOTER_MODAL_SESSION_KEY, null);
        footerModalRestoredRef.current = true;
        if (!saved?.isOpen) {
            return;
        }

        const sameRoute = saved?.route?.activeL1 === activeL1
            && saved?.route?.activeL2 === activeL2
            && saved?.route?.businessTarget === businessTarget;

        if (!sameRoute) {
            return;
        }

        setActiveFooterAction(saved.activeFooterAction || null);
        setModalTitle(saved.modalTitle || '');
        setIsModalOpen(true);
    }, [isHydrated, activeL1, activeL2, businessTarget]);

    useEffect(() => {
        if (!isHydrated) {
            return;
        }
        writeStore(FOOTER_MODAL_SESSION_KEY, {
            isOpen: isModalOpen,
            activeFooterAction,
            modalTitle,
            route: {
                activeL1,
                activeL2,
                businessTarget
            }
        });
    }, [isHydrated, isModalOpen, activeFooterAction, modalTitle, activeL1, activeL2, businessTarget]);

    useEffect(() => {
        if (isModalOpen && !(isProjectLayout || isDetailView)) {
            handleCloseModal();
        }
    }, [isModalOpen, isProjectLayout, isDetailView]);

    const handleOpenModal = (action, title) => {
        if (isModalOpen && activeFooterAction === action) {
            handleCloseModal();
        } else {
            setIsModalOpen(true);
            setActiveFooterAction(action);
            setModalTitle(title);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setActiveFooterAction(null);
    };

    return (
        <div className="absolute left-[60px] top-1 bottom-1 right-1 bg-white rounded-md overflow-hidden shadow-2xl z-0 flex flex-col">
            <div className="flex-1 flex flex-row overflow-hidden relative">
                {/* Project L2 Sidebar (50px) - Show for Project Tag OR Detail Views */}
                {/* L2 Sidebar: Unified for Project, Detail, and Business List */}
                {/* [Updated] Added isWorkspace check implicitly by ensuring activeL1 matches logic */}
                {(isProjectLayout || isDetailView || (isBusinessLayout && !isDetailView) || hasWorkspaceL2Menu) && (
                    <L2Sidebar
                        activeL1={activeL1 === 'workspace' ? 'workspace' : effectiveL1}
                        activeL2={(isProjectLayout || isDetailView || activeL1 === 'workspace') ? activeL2 : businessTarget}
                        onSelect={(id) => {
                            if (activeL1 === 'workspace') {
                                setActiveL2(id);
                            } else if (isProjectLayout || isDetailView) {
                                setActiveL2(id); // Use Hook
                            } else {
                                setBusinessTarget(id); // Use Hook
                            }
                        }}
                        enterpriseName={sidebarTitle}
                        isDetailView={isDetailView}
                        activeProjectType={activeProjectType}
                    />
                )}

                {/* Right Column: Header + Content + Footer */}
                <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                    {/* Header: Visible for Project & Business, Hidden for Dashboard & Workspace */}
                    {((isProjectLayout || isBusinessLayout) && activeL1 !== 'workspace' && showHeader) && (
                        <Header
                            title={headerTitle}
                            // For Legacy Pages (Basis, Navigation), we still pass default actions here
                            // For Config Pages (Acct, Model), Header.jsx ignores this except for explicit inclusion
                            defaultActions={(isProjectLayout || isDetailView) ? [
                                <ViewActionGroup
                                    key="view-group"
                                    showDivider={false} // Divider handled by Header logic
                                    onBack={goBack} // Use Hook
                                    onForward={goForward} // Use Hook
                                    canBack={canGoBack} // Use Hook
                                    canForward={canGoForward} // Use Hook
                                />
                            ] : []}
                        />
                    )}

                    <div className="flex-1 relative overflow-hidden flex flex-col">
                        <MainContent
                            mode={mode}
                            activeL1={activeL1}
                            activeL2={activeL2}
                            activeL3={activeL3}
                            onL3Change={setActiveL3} // Use Hook
                            businessTarget={businessTarget}
                            onOpenTab={openTab} // Use Hook
                            openedTabs={openedTabs} // Use Hook
                            // Data Props
                            projects={projects}
                            onAddProject={addProject}
                            researchObjects={researchObjects}
                            onAddResearchObject={addResearchObject}
                        />
                    </div>

                    {/* Footer - Show for Project or Detail View */}
                    {(isProjectLayout || isDetailView) && (
                        <Footer onOpenModal={handleOpenModal} activeAction={activeFooterAction} />
                    )}

                    <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle} />
                </div>
            </div>
        </div>
    );
};

// Wrapper Export to Provide Context
export default function Workbench() {
    // Only manage local UI state like Header Title here
    const [headerTitle, setHeaderTitle] = useState('');
    const [sidebarTitle, setSidebarTitle] = useState('');

    return (
        <WorkbenchContent
            headerTitle={headerTitle}
            setHeaderTitle={setHeaderTitle}
            sidebarTitle={sidebarTitle}
            setSidebarTitle={setSidebarTitle}
        />
    );
}
