/**
 * BusinessContent - 业务内容容器
 * 
 * 🏢 角色：多功能厅 (Multi-function Hall)
 * 📝 职责：
 * 1. 负责渲染所有的“非项目”页面（如数据库管理、文献库、企业设置）。
 * 2. 根据 `target` (L2 ID) 动态切换渲染的子页面 (ComponentPage, LiteraturePage 等)。
 */
import React, { useEffect } from 'react';
import { IconStack2, IconFilter, IconSearch, IconPlus, IconLayoutGrid, IconShield, IconMapPin } from '@tabler/icons-react';
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
import CreateProjectPage from './l2/CreateProjectPage';
import CreateResearchObjectPage from './l2/CreateResearchObjectPage';
import { usePagePresentation } from '../../context/PagePresentationContext';

import WorkbenchHomePage from './l2/WorkbenchHomePage';
import CarbonPanoramaPage from './l2/CarbonPanoramaPage';
import CarbonAssetMgmtPage from './l2/CarbonAssetMgmtPage';

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

    const projectColumns = [
        {
            title: '项目名称', key: 'name', width: '35%', render: (text) => (
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${getAvatarColor(text[0])}`}>
                        {text.substring(0, 2)}
                    </div>
                    <span className="font-medium text-gray-900">{text}</span>
                </div>
            )
        },
        { title: '服务企业', key: 'object', width: '25%', className: 'text-gray-600' },
        {
            title: '需求类型', key: 'type', width: '15%', render: (type) => {
                const isPCF = type === 'PCF' || type === '产品碳足迹';
                return (
                    <Tag variant={isPCF ? 'success' : 'primary'} size="sm">
                        {isPCF ? '产品碳足迹' : '组织碳足迹'}
                    </Tag>
                );
            }
        },
        { title: '创建时间', key: 'createTime', width: '12%', className: 'text-gray-500 font-mono text-xs' },
        { title: '更新时间', key: 'updateTime', width: '12%', className: 'text-gray-500 font-mono text-xs' }
    ];

    // State for Project Management View Mode
    const [projectLimitMode, setProjectLimitMode] = React.useState('list'); // 'list' | 'create'

    // Reset mode when target changes
    useEffect(() => {
        setProjectLimitMode('list');
        setObjectLimitMode('list');
    }, [target]);

    const renderProjectManagement = (defaultType = 'all') => {
        // If in Create Mode, show the Create Project Page
        if (projectLimitMode === 'create') {
            return (
                <CreateProjectPage
                    researchObjects={researchObjects}
                    onCancel={() => setProjectLimitMode('list')}
                    onSave={(newProjectData) => {
                        const selectedObject = researchObjects.find(
                            (obj) => String(obj.id) === String(newProjectData.research_object_name)
                        );

                        // Create new project object
                        const newProject = {
                            id: String(projects.length + 1),
                            name: newProjectData.name || '未命名项目',
                            object: selectedObject?.name || '-',
                            type: newProjectData.type === 'CFP' ? 'PCF' : 'OCF', // Mapping 'CFP'->'PCF', 'CFO'->'OCF' to match list data
                            createTime: new Date().toISOString().split('T')[0], // Simple YYYY-MM-DD
                            updateTime: new Date().toISOString().split('T')[0],
                            ...newProjectData
                        };

                        if (onAddProject) {
                            onAddProject(newProject);
                        }

                        setProjectLimitMode('list');
                        onOpenTab(newProject);
                    }}
                />
            );
        }

        const filterOptions = {
            types: [
                { value: 'all', label: '全部类型' },
                { value: 'pcf', label: '产品碳足迹' },
                { value: 'ocf', label: '组织碳足迹' }
            ],
            statuses: [
                { value: 'active', label: '进行中' },
                { value: 'completed', label: '已完成' },
                { value: 'archived', label: '已归档' }
            ]
        };

        // Filter data based on type (simple frontend filter logic for demo)
        const displayData = defaultType === 'all'
            ? projects
            : projects.filter(item => item.type.toLowerCase() === defaultType);

        return <StandardBusinessLayout
            title="全部项目"
            filterOptions={filterOptions}
            setHeaderActions={(actions) => {
                // Determine if we need to Override the Create Button
                setActions(
                    <button
                        onClick={() => setProjectLimitMode('create')}
                        className="flex items-center gap-1.5 h-btn-md px-btn-x-md text-[13px] font-medium text-white bg-primary-action hover:bg-primary-emphasize rounded-sm transition-colors"
                    >
                        <IconPlus size={16} />
                        <span>创建</span>
                    </button>
                );
            }}
            defaultFilterType={defaultType}
            onRowClick={onOpenTab}
            columns={projectColumns}
            data={displayData}
        />;
    };

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
                        const newObj = {
                            id: String(researchObjects.length + 100), // simple ID
                            createTime: new Date().toISOString(),
                            creator: 'Current User',
                            ...newData
                        };
                        if (onAddResearchObject) {
                            onAddResearchObject(newObj);
                        }
                        setObjectLimitMode('list');
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
            setHeaderActions={(actions) => {
                setActions(
                    <button
                        onClick={() => setObjectLimitMode('create')}
                        className="flex items-center gap-1.5 h-btn-md px-btn-x-md text-[13px] font-medium text-white bg-primary-action hover:bg-primary-emphasize rounded-sm transition-colors"
                    >
                        <IconPlus size={16} />
                        <span>创建</span>
                    </button>
                );
            }}
            onRowClick={onOpenTab}
            columns={researchObjectColumns}
            data={researchObjects}
        />;
    };

    // ==================== 路由逻辑 ====================
    switch (target) {
        // ==================== Workspace ====================
        case 'workbench_home':
            return <WorkbenchHomePage />;
        case 'carbon_panorama':
            return <CarbonPanoramaPage />;
        case 'carbon_asset_mgmt':
            return <CarbonAssetMgmtPage />;

        // ==================== Background Data ====================
        case 'database_mgmt':
            return <DatabaseManagementPage />;

        case 'datasource':
            return <DataSourcePage />;

        case 'product':
            return <ProductPage />;

        case 'data':
            return <DataPage />;

        case 'components':
            return <ComponentPage />;

        case 'factors_baseflow':
            return <BasicFlowPage />;

        case 'factors_composite':
            return <CompositeFactorPage />;

        case 'factors_literature':
            return <LiteratureFactorPage />;

        case 'literature':
            return <LiteraturePage />;

        case 'all_projects':
            return renderProjectManagement('all');

        case 'pcf':
            return renderProjectManagement('pcf');

        case 'ocf':
            return renderProjectManagement('ocf');

        case 'all_objects':
            return renderResearchObjects();

        default:
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
}
