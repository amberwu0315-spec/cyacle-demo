/**
 * Workbench - 工作台 (二级布局)
 * * 🏢 角色：部门经理 / 分区总管 (Zone Manager)
 * 📝 职责：
 * 1. 管理二级侧边栏 (L2Sidebar)，决定显示项目菜单还是业务菜单。
 * 2. 也是 AppNavigationContext 和 View 层 (MainContent) 之间的关键桥梁。
 * 3. 它决定了当前是“项目模式”还是“业务模式”。
 */
import { useState, useEffect } from 'react';
import L2Sidebar from './L2Sidebar';
import Header from './Header';
import MainContent from '../views/MainContent';
import Footer from './Footer';
import Modal from './Modal';
import ViewActionGroup from './ViewActionGroup';
import { NavigationProvider, useNavigation } from '../../context/NavigationContext';
import { useAppNavigation } from '../../context/AppNavigationContext'; // New Hook
import { useData } from '../../context/DataContext'; // New Hook
import { usePagePresentation } from '../../context/PagePresentationContext';

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

    // Derived State for Layout Switching
    const isDetailView = businessTarget && businessTarget.startsWith('detail_');
    const activeTab = openedTabs.find(t => t.id === businessTarget);
    const effectiveL1 = isDetailView ? activeTab?.l1Context : activeL1;

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFooterAction, setActiveFooterAction] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

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

    // Update header title based on context
    useEffect(() => {
        // [New] 优先处理 Workspace 模式
        if (activeL1 === 'workspace') {
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
                const entTitleMap = {
                    'ent_projects': '项目',
                    'ent_info': '信息',
                    'ent_locations': '地点',
                    'ent_products': '产品',
                    'ent_data': '数据',
                    'ent_datasources': '数据源',
                    'ent_docs': '文档'
                };
                setHeaderTitle(entTitleMap[activeL2] || '详情');
            } else {
                setHeaderTitle(titleMap[activeL2] || '项目');
            }

            // Set Sidebar Card Title (Always Fixed -> Project/Enterprise Name)
            setSidebarTitle(isDetailView ? (effectiveL1 === 'enterprise' ? enterpriseName : projectName) : projectName);

        } else if (isBusinessLayout) {
            const businessTitleMap = {
                'background_data': '数据库管理',
                'project_mgmt': '全部项目',
                'enterprise': '全部研究对象'
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
                'all_objects': '全部研究对象' // Specific Context, distinct from 'Research Object' identity
            };

            // Logic: 
            // 1. If businessTarget is set (clicked L2 item), use its title.
            // 2. If no target (default view), use the L1 default title.
            const currentTitle = targetTitleMap[businessTarget] || businessTitleMap[effectiveL1] || '';
            setHeaderTitle(currentTitle);

        } else {
            setHeaderTitle('Dashboard');
        }
    }, [effectiveL1, activeL1, activeL2, isProjectLayout, isBusinessLayout, businessTarget, isDetailView, openedTabs, setHeaderTitle, setSidebarTitle]);

    // Auto-Close Modal
    useEffect(() => {
        if (isModalOpen) handleCloseModal();
    }, [activeL1, activeL2, activeL3]);

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
        <div className="absolute left-[60px] top-1 bottom-1 right-1 bg-white rounded-lg overflow-hidden shadow-2xl z-0 flex flex-col">
            <div className="flex-1 flex flex-row overflow-hidden relative">
                {/* Project L2 Sidebar (50px) - Show for Project Tag OR Detail Views */}
                {/* L2 Sidebar: Unified for Project, Detail, and Business List */}
                {/* [Updated] Added isWorkspace check implicitly by ensuring activeL1 matches logic */}
                {(isProjectLayout || isDetailView || (isBusinessLayout && !isDetailView) || activeL1 === 'workspace') && (
                    <L2Sidebar
                        activeL1={activeL1 === 'workspace' ? 'workspace' : effectiveL1}
                        activeL2={(isProjectLayout || isDetailView) ? activeL2 : businessTarget}
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
                    />
                )}

                {/* Right Column: Header + Content + Footer */}
                <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                    {/* Header: Visible for Project & Business, Hidden for Dashboard */}
                    {/* [Updated] Allow Header for workspace */}
                    {((isProjectLayout || isBusinessLayout || activeL1 === 'workspace') && showHeader) && (
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

    const { activeL2, setBusinessTarget, isProjectLayout, setActiveL2 } = useAppNavigation();

    // Adapter for inner NavigationProvider
    const handleNavigationEvent = (id) => {
        // This is a bit tricky, L2Sidebar calls strict onSelect.
        // We need to mirror checking logic if we want to support any 'onNavigate' callback here?
        // Actually the inner L2Sidebar calls setActiveL2 directly in my new code above.
        // But NavigationProvider expects an 'onNavigate' prop sometimes.
        // Let's keep it simple: if NavigationProvider calls onNavigate, it's usually from internal logic.
        // But we are driving everything from AppNavigationContext now.
    }

    return (
        <WorkbenchContent
            headerTitle={headerTitle}
            setHeaderTitle={setHeaderTitle}
            sidebarTitle={sidebarTitle}
            setSidebarTitle={setSidebarTitle}
        />
    );
}