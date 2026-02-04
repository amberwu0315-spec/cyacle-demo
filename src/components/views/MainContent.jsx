import Dashboard from '../views/Dashboard';
import BusinessContent from '../views/BusinessContent';
import ProjectLayout from '../views/ProjectLayout';

export default function MainContent({ mode, activeL1, activeL2, activeL3, onL3Change, businessTarget, onOpenTab, openedTabs, projects, onAddProject, researchObjects, onAddResearchObject }) {

    // Determine what to render
    const isProject = activeL1 === 'project_tag';
    const isBusiness = ['background_data', 'project_mgmt', 'enterprise'].includes(activeL1);
    const isDetailView = businessTarget && businessTarget.startsWith('detail_');

    // Context decoupling: The "effective" context for tabs comes from their origin, not the current L1 selection
    const activeTab = openedTabs?.find(t => t.id === businessTarget);
    const effectiveL1 = isDetailView ? activeTab?.l1Context : activeL1;

    return (
        <div className="flex-1 flex flex-row overflow-hidden relative bg-[#F5F6F8]">

            {/* Dashboard (Home) */}
            {!isProject && !isBusiness && !isDetailView && (
                <Dashboard />
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
