import { useState, useEffect } from 'react';
import L2Sidebar from './L2Sidebar';
import BusinessSidebar from './BusinessSidebar';
import Header from './Header';
import MainContent from '../views/MainContent';
import Footer from './Footer';
import Modal from './Modal';
import ViewActionGroup from './ViewActionGroup';

export default function Workbench({
    mode,
    activeL1,
    activeL2,
    activeL3,
    onL2Change,
    onL3Change,
    isProjectLayout,
    isBusinessLayout,
    // Scoped Navigation Props
    onProjectBack,
    onProjectForward,
    canGoBack,
    canGoForward
}) {
    const [headerTitle, setHeaderTitle] = useState('');
    const [businessTarget, setBusinessTarget] = useState('database_mgmt');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFooterAction, setActiveFooterAction] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    // Update header title based on context
    useEffect(() => {
        if (isProjectLayout) {
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
                'enterprise': '企业/对象'
            };
            if (!headerTitle) setHeaderTitle(titleMap[activeL1] || '');
        } else {
            setHeaderTitle('Dashboard');
        }
    }, [activeL1, activeL2, isProjectLayout, isBusinessLayout]);

    // Auto-Close Modal on Navigation Change (L1, L2, L3)
    useEffect(() => {
        if (isModalOpen) {
            handleCloseModal();
        }
    }, [activeL1, activeL2, activeL3]);

    // Handle Footer Modal
    const handleOpenModal = (action, title) => {
        if (isModalOpen && activeFooterAction === action) {
            // Toggle close if clicking same action
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
                    <Header
                        title={headerTitle}
                        defaultActions={isProjectLayout ? [
                            <ViewActionGroup
                                key="view-group"
                                showDivider={false}
                                onBack={onProjectBack}
                                onForward={onProjectForward}
                                canBack={canGoBack}
                                canForward={canGoForward}
                            />
                        ] : []}
                    />

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

                    {/* Footer - Moved INSIDE Right Column */}
                    {isProjectLayout && (
                        <Footer
                            onOpenModal={handleOpenModal}
                            activeAction={activeFooterAction}
                        />
                    )}

                    {/* Modal Overlay: Inside Right Column -> Covers Header/Content/L3, Reveals L2 */}
                    <Modal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        title={modalTitle}
                    />
                </div>
            </div>

        </div>
    );
}
