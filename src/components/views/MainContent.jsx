/**
 * MainContent - 主内容区 (路由分发)
 * 
 * 🏢 角色：领位员 (Router / Dispatcher)
 * 📝 职责：
 * 1. 根据当前的状态，决定显示 Dashboard, BusinessContent 还是 ProjectLayout。
 * 2. 它是一个“哑组件”(Dumb Component)，只根据传入的 Props 进行渲染选择。
 */
import Dashboard from '../views/Dashboard';
import BusinessContent from '../views/BusinessContent';
import ProjectLayout from '../views/ProjectLayout';

export default function MainContent({ mode, activeL1, activeL2, activeL3, onL3Change, businessTarget, onOpenTab, openedTabs, projects, onAddProject, researchObjects, onAddResearchObject }) {

    // Determine what to render
    const isProject = activeL1 === 'project_tag';
    const isWorkspace = activeL1 === 'workspace';
    const isBusiness = ['background_data', 'project_mgmt', 'enterprise'].includes(activeL1);
    const isDetailView = businessTarget && businessTarget.startsWith('detail_');
    const workspaceTarget = activeL2 || 'workbench_home';

    // Context decoupling: The "effective" context for tabs comes from their origin, not the current L1 selection
    const activeTab = openedTabs?.find(t => t.id === businessTarget);
    const effectiveL1 = isDetailView ? activeTab?.l1Context : activeL1;

    return (
        <div className="flex-1 min-h-0 min-w-0 flex flex-row overflow-hidden relative bg-[#F5F6F8]">

            {/* Dashboard (Home) */}
            {!isProject && !isBusiness && !isWorkspace && !isDetailView && (
                <Dashboard />
            )}

            {/* Workspace Content */}
            {isWorkspace && !isDetailView && (
                <BusinessContent
                    activeL1={activeL1}
                    target={workspaceTarget}
                    onOpenTab={onOpenTab}
                    openedTabs={openedTabs}
                    projects={projects}
                    onAddProject={onAddProject}
                    researchObjects={researchObjects}
                    onAddResearchObject={onAddResearchObject}
                />
            )}

            {/* Business Content (List Views) */}
            {isBusiness && !isDetailView && (
                <BusinessContent
                    activeL1={activeL1}
                    target={businessTarget}
                    onOpenTab={onOpenTab}
                    openedTabs={openedTabs}
                    projects={projects}
                    onAddProject={onAddProject}
                    researchObjects={researchObjects}
                    onAddResearchObject={onAddResearchObject}
                />
            )}

            {/* Project Layout (Project Tag OR Business Detail Tabs) */}
            {(isProject || isDetailView) && (
                <ProjectLayout
                    mode={mode}
                    activeL2={activeL2}
                    activeL3={activeL3}
                    onL3Change={onL3Change}
                    activeL1={effectiveL1}
                // We could pass data here if ProjectLayout needs it
                />
            )}
        </div>
    );
}
