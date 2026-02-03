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
    businessTarget,
    setBusinessTarget
}) => {
    // Sync activeL2 (Props) -> activeDimension (Context)
    const { setActiveDimension, setActiveMode } = useNavigation();

    useEffect(() => {
        if (isProjectLayout && activeL2) {
            setActiveDimension(activeL2);
            // Reset to config mode whenever L2 page changes via Props (Sidebar click)
            setActiveMode('config');
        } else if (isBusinessLayout || (!isProjectLayout && !isBusinessLayout)) {
            // If in Business or Dashboard, clear the dimension so Header uses Legacy Mode (Title Only)
            setActiveDimension(null);
            // Verify title rendering relies on props in Legacy Mode
        }
    }, [activeL2, isProjectLayout, isBusinessLayout, setActiveDimension, setActiveMode]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFooterAction, setActiveFooterAction] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    // Update header title based on context
    useEffect(() => {
        if (isProjectLayout) {
            // For Accounting/Model, the Header Widget might override this title anyway
            // BUT we keep this logic for Navigation/Basis/Alloc
            const titleMap = {
                'navigation': '导航',
                'basis': '基础',
                'allocation': '分配',
                'model': '模型',
                'accounting': '核算'
            };
            setHeaderTitle(titleMap[activeL2] || '项目');
        } else if (isBusinessLayout) {
            const titleMap = {
                'background_data': '背景数据',
                'project_mgmt': '项目管理',
                'enterprise': '对象/企业'
            };
            setHeaderTitle(titleMap[activeL1] || '');
        } else {
            setHeaderTitle('Dashboard');
        }
    }, [activeL1, activeL2, isProjectLayout, isBusinessLayout]);

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
                {/* Project L2 Sidebar (50px) */}
                {isProjectLayout && (
                    <L2Sidebar activeL2={activeL2} onSelect={onL2Change} />
                )}

                {/* Business Sidebar (Full Height 200px) */}
                {isBusinessLayout && (
                    <BusinessSidebar
                        activeL1={activeL1}
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
                            defaultActions={isProjectLayout ? [
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
                        />
                    </div>

                    {isProjectLayout && (
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
    const [headerTitle, setHeaderTitle] = useState('');
    const [businessTarget, setBusinessTarget] = useState('database_mgmt');

    return (
        <NavigationProvider onNavigate={props.onL2Change}>
            <WorkbenchContent
                {...props}
                headerTitle={headerTitle}
                setHeaderTitle={setHeaderTitle}
                businessTarget={businessTarget}
                setBusinessTarget={setBusinessTarget}
            />
        </NavigationProvider>
    );
}
