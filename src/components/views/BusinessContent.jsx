/**
 * BusinessContent - 业务内容容器
 * 
 * 🏢 角色：多功能厅 (Multi-function Hall)
 * 📝 职责：
 * 1. 负责渲染所有的“非项目”页面（如数据库管理、文献库、企业设置）。
 * 2. 根据 `target` (L2 ID) 动态切换渲染的子页面 (ComponentPage, LiteraturePage 等)。
 */
import React, { useEffect } from 'react';
import { IconStack2, IconMapPin } from '@tabler/icons-react';
import StandardBusinessLayout from './StandardBusinessLayout';
import Tag from '../common/Tag';


import ComponentPage from './l2/ComponentPage';
import BasicFlowPage from './l2/BasicFlowPage';
import CompositeFactorPage from './l2/CompositeFactorPage';
import LiteratureFactorPage from './l2/LiteratureFactorPage';
import LiteraturePage from './l2/LiteraturePage';
import DatabaseManagementPage from './l2/DatabaseManagementPage';
import DataSourcePage from './l2/DataSourcePage';
import ProductPage from './l2/ProductPage';
import DataPage from './l2/DataPage';
import CreateResearchObjectPage from './l2/CreateResearchObjectPage';
import { usePagePresentation } from '../../context/PagePresentationContext';
import ProjectManagementModule from './shared/ProjectManagementModule';

import WorkbenchHomePage from './l2/WorkbenchHomePage';
import CarbonPanoramaPage from './l2/CarbonPanoramaPage';
import CarbonAssetMgmtPage from './l2/CarbonAssetMgmtPage';
import { buildUntitledName } from '../../utils/createEntityRow';
import { BUSINESS_TARGET_ROUTE_IDS } from '../../config/businessTargetConfig';

const BUSINESS_TARGET_RENDERERS = {
    workbench_home: () => <WorkbenchHomePage />,
    carbon_panorama: () => <CarbonPanoramaPage />,
    carbon_asset_mgmt: () => <CarbonAssetMgmtPage />,

    database_mgmt: () => <DatabaseManagementPage />,
    components: () => <ComponentPage />,
    factors_baseflow: () => <BasicFlowPage />,
    factors_composite: () => <CompositeFactorPage />,
    factors_literature: () => <LiteratureFactorPage />,
    literature: () => <LiteraturePage />,

    all_projects: ({ projects, researchObjects, onAddProject, onOpenTab, target }) => (
        <ProjectManagementModule
            projects={projects}
            researchObjects={researchObjects}
            onAddProject={onAddProject}
            onOpenProject={(project) => onOpenTab(project)}
            defaultType="all"
            title="全部项目"
            scopeKey={`project_mgmt:${target}`}
        />
    ),
    pcf: ({ projects, researchObjects, onAddProject, onOpenTab, target }) => (
        <ProjectManagementModule
            projects={projects}
            researchObjects={researchObjects}
            onAddProject={onAddProject}
            onOpenProject={(project) => onOpenTab(project)}
            defaultType="pcf"
            title="全部项目"
            scopeKey={`project_mgmt:${target}`}
        />
    ),
    ocf: ({ projects, researchObjects, onAddProject, onOpenTab, target }) => (
        <ProjectManagementModule
            projects={projects}
            researchObjects={researchObjects}
            onAddProject={onAddProject}
            onOpenProject={(project) => onOpenTab(project)}
            defaultType="ocf"
            title="全部项目"
            scopeKey={`project_mgmt:${target}`}
        />
    ),
    all_objects: ({ renderResearchObjects }) => renderResearchObjects()
};

const LEGACY_TARGET_RENDERERS = {
    datasource: () => <DataSourcePage />,
    product: () => <ProductPage />,
    data: () => <DataPage />
};

export default function BusinessContent({ activeL1, target, onOpenTab, openedTabs = [], projects = [], onAddProject, researchObjects = [], onAddResearchObject }) {
    const { setActions } = usePagePresentation();

    // State for Research Object View Mode
    const [objectLimitMode, setObjectLimitMode] = React.useState('list'); // 'list' | 'create'

    // ==================== 项目管理页面 ====================

    // Helper to get random avatar color based on char
    const getAvatarColor = (char) => {
        const colors = ['bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600', 'bg-orange-100 text-orange-600'];
        const index = char ? char.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    // Reset mode when target changes
    useEffect(() => {
        setObjectLimitMode('list');
    }, [target]);

    const researchObjectColumns = [
        {
            title: '名称', key: 'name', width: '25%', render: (text) => (
                <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${getAvatarColor(text[0])}`}>
                        {text.substring(0, 1)}
                    </div>
                    <span>{text}</span>
                </div>
            )
        },
        { title: '简称', key: 'shortName', width: '15%', className: 'text-gray-500' },
        {
            title: '所属行业', key: 'industry', width: '20%', render: (text) => (
                text !== '-' ? <Tag variant="primary" size="sm">{text}</Tag> : '-'
            )
        },
        {
            title: '所在地', key: 'location', width: '20%', render: (text) => (
                text !== '-' ? <span className="flex items-center gap-1 text-gray-500"><IconMapPin size={14} />{text}</span> : '-'
            )
        },
        { title: '创建人', key: 'creator', width: '10%', className: 'text-gray-500' },
        { title: '创建时间', key: 'createTime', width: '15%', className: 'text-gray-500 font-mono text-xs' }
    ];

    const renderResearchObjects = () => {
        // Mode Check: Create
        if (objectLimitMode === 'create') {
            return (
                <CreateResearchObjectPage
                    onCancel={() => setObjectLimitMode('list')}
                    onSave={(newData) => {
                        const fallbackName = buildUntitledName();
                        const newObj = {
                            ...newData,
                            id: String(researchObjects.length + 100), // simple ID
                            createTime: new Date().toISOString(),
                            creator: 'Current User',
                            name: newData?.name || fallbackName
                        };
                        if (onAddResearchObject) {
                            onAddResearchObject(newObj);
                        }
                        setObjectLimitMode('list');
                        onOpenTab(newObj);
                    }}
                />
            );
        }

        const filterOptions = {
            types: [
                { value: 'product', label: '产品' },
                { value: 'enterprise', label: '企业' },
                { value: 'process', label: '工艺' }
            ],
            statuses: [
                { value: 'active', label: '有效' },
                { value: 'draft', label: '草稿' }
            ]
        };

        return <StandardBusinessLayout
            title="服务企业"
            filterOptions={filterOptions}
            showFilters={false}
            showGridToolbar={false}
            setHeaderActions={setActions}
            onCreate={() => setObjectLimitMode('create')}
            onRowClick={onOpenTab}
            columns={researchObjectColumns}
            data={researchObjects}
        />;
    };

    const rendererContext = {
        target,
        projects,
        researchObjects,
        onAddProject,
        onOpenTab,
        renderResearchObjects
    };

    const renderer = BUSINESS_TARGET_RENDERERS[target];
    if (renderer) {
        return renderer(rendererContext);
    }

    const legacyRenderer = LEGACY_TARGET_RENDERERS[target];
    if (legacyRenderer) {
        return legacyRenderer(rendererContext);
    }

    if (import.meta.env.DEV && target && !BUSINESS_TARGET_ROUTE_IDS.includes(target)) {
        console.warn(`[BusinessContent] Unknown target route: ${target}`);
    }

    // 默认占位符（用于其他L1的business内容）
    return (
        <div className="h-full w-full flex flex-col p-8">
            <div className="flex-1 bg-white rounded-md shadow-sm border border-gray-100 p-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconStack2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Content for {target}</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        此模块的功能正在开发中...
                    </p>
                </div>
            </div>
        </div>
    );
}
