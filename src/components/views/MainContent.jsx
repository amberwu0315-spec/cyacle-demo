import Dashboard from '../views/Dashboard';
import BusinessContent from '../views/BusinessContent';
import ProjectLayout from '../views/ProjectLayout';

export default function MainContent({ mode, activeL1, activeL2, activeL3, onL3Change }) {

    // Determine what to render
    const isProject = activeL1 === 'project_tag';
    const isBusiness = ['background_data', 'project_mgmt', 'enterprise'].includes(activeL1);

    return (
        <div className="flex-1 flex flex-row overflow-hidden relative bg-[#F5F6F8]">

            {/* Dashboard (Home) */}
            {!isProject && !isBusiness && (
                <Dashboard />
            )}

            {/* Business Content */}
            {isBusiness && (
                <BusinessContent activeL1={activeL1} target={activeL2} />
                // Note: activeL2 might be reused for business target, or we use a separate state
                // In App.jsx, activeL2 is set for Project. 
                // For Business, sidebar calls setHeaderTitle but maybe we need 'businessTarget' state?
                // The vanilla app used `renderBusinessContent` triggered by sidebar click.
                // In React, we should probably lift business target state to App or Workbench.
            )}

            {/* Project Layout */}
            {isProject && (
                <ProjectLayout
                    mode={mode}
                    activeL2={activeL2}
                    activeL3={activeL3}
                    onL3Change={onL3Change}
                />
            )}
        </div>
    );
}
