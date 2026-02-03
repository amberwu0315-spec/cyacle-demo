import { useState, useEffect } from 'react';
import L2Sidebar from './L2Sidebar';
import BusinessSidebar from './BusinessSidebar';
import Header from './Header';
import MainContent from '../views/MainContent';
import Footer from './Footer';
import Modal from './Modal';
import ViewActionGroup from './ViewActionGroup';
import { NavigationProvider, useNavigation } from '../../context/NavigationContext';

/**
 * Inner Component to Consume Navigation Context
 * This bridges the prop-driven "activeL2" with the Context-driven "activeDimension"
 */
const WorkbenchContent = ({
    mode,
    activeL1,
    activeL2,
    activeL3,
    onL2Change,
    onL3Change,
    isProjectLayout,
    isBusinessLayout,
    onProjectBack,
    onProjectForward,
    canGoBack,
    canGoForward,
    headerTitle,
    setHeaderTitle,
    // Tab & Navigation Props (from App)
    businessTarget,
    setBusinessTarget,
    openedTabs,
    onOpenTab,
    onCloseTab
}) => {
    // Sync activeL2 (Props) -> activeDimension (Context)
    const { setActiveDimension, setActiveMode } = useNavigation();

    // Derived State for Layout Switching
    const isDetailView = businessTarget && businessTarget.startsWith('detail_');

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
            // If in Business or Dashboard, clear the dimension so Header uses Legacy Mode (Title Only)
            setActiveDimension(null);
        }
    }, [activeL2, isProjectLayout, isBusinessLayout, isDetailView, setActiveDimension, setActiveMode]);

    // Update header title based on context
    useEffect(() => {
        // Unified Logic for Project Layout AND Detail Views (Tabs)
        if (isProjectLayout || isDetailView) {
            // 1. Determine Project Name (Context)
            let projectName = 'My Green Project'; // Default/Placeholder
            if (isDetailView) {
                const tab = openedTabs.find(t => t.id === businessTarget);
                if (tab) projectName = tab.title;
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
            } else {
                setHeaderTitle(titleMap[activeL2] || '项目');
            }

        } else if (isBusinessLayout) {
            const titleMap = {
                'background_data': '数据库管理',
                'project_mgmt': '全部项目',
                'enterprise': '研究对象'
            };
            // Try to set title based on active business target if available, or just L1 Title
            if (activeL1 === 'background_data' && businessTarget === 'components') setHeaderTitle('元件');
            else setHeaderTitle(titleMap[activeL1] || '');

        } else {
            setHeaderTitle('Dashboard');
        }
    }, [activeL1, activeL2, isProjectLayout, isBusinessLayout, businessTarget, isDetailView, openedTabs, setHeaderTitle]);

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
        <div className="absolute left-[60px] top-1 bottom-1 right-1 bg-white rounded-[12px] overflow-hidden shadow-2xl z-0 flex flex-col">
            <div className="flex-1 flex flex-row overflow-hidden relative">
                {/* Project L2 Sidebar (50px) - Show for Project Tag OR Detail Views */}
                {(isProjectLayout || isDetailView) && (
                    <L2Sidebar activeL2={activeL2} onSelect={onL2Change} />
                )}

                {/* Business Sidebar (Full Height 200px) - Hide if in Detail View */}
                {isBusinessLayout && !isDetailView && (
                    <BusinessSidebar
                        activeL1={activeL1}
                        activeTarget={businessTarget}
                        // Note: openedTabs removed from BusinessSidebar as requested
                        onSelectContent={(target, title) => {
                            setBusinessTarget(target);
                            setHeaderTitle(title);
                        }}
                    />
                )}

                {/* Right Column: Header + Content + Footer */}
                <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                    {/* Header: Visible for Project & Business, Hidden for Dashboard */}
                    {(isProjectLayout || isBusinessLayout) && (
                        <Header
                            title={headerTitle}
                            // For Legacy Pages (Basis, Navigation), we still pass default actions here
                            // For Config Pages (Acct, Model), Header.jsx ignores this except for explicit inclusion
                            defaultActions={(isProjectLayout || isDetailView) ? [
                                <ViewActionGroup
                                    key="view-group"
                                    showDivider={false} // Divider handled by Header logic
                                    onBack={onProjectBack}
                                    onForward={onProjectForward}
                                    canBack={canGoBack}
                                    canForward={canGoForward}
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
                            onL3Change={onL3Change}
                            businessTarget={businessTarget}
                            onOpenTab={onOpenTab} // Pass open handler from props
                            openedTabs={openedTabs}   // Pass tabs data from props
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
export default function Workbench(props) {
    // Only manage local UI state like Header Title here
    const [headerTitle, setHeaderTitle] = useState('');

    // businessTarget and openedTabs are now PROPS passed from App.jsx

    return (
        <NavigationProvider onNavigate={props.onL2Change}>
            <WorkbenchContent
                {...props}
                headerTitle={headerTitle}
                setHeaderTitle={setHeaderTitle}
            />
        </NavigationProvider>
    );
}
