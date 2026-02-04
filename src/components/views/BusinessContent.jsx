import React, { useEffect } from 'react';
import { IconStack2, IconFilter, IconSearch, IconPlus, IconLayoutGrid, IconShield, IconMapPin } from '@tabler/icons-react';
import StandardBusinessLayout from './StandardBusinessLayout';
import { useHeaderContext } from '../../context/HeaderContext';
import ComponentPage from './l2/ComponentPage';
import BasicFlowPage from './l2/BasicFlowPage';
import CompositeFactorPage from './l2/CompositeFactorPage';
import LiteratureFactorPage from './l2/LiteratureFactorPage';
import LiteraturePage from './l2/LiteraturePage';
import DatabaseManagementPage from './l2/DatabaseManagementPage';
import CreateProjectPage from './l2/CreateProjectPage';

import { projectData, researchObjectData } from '../../data/mockData';

export default function BusinessContent({ activeL1, target, onOpenTab, openedTabs = [] }) {
    const { setActions } = useHeaderContext();

    // ==================== 项目管理页面 ====================
    // Mock Data for Projects (Imported from mockData.js)


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
                text !== '-' ? <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">{text}</span> : '-'
            )
        },
        {
            title: '所在地', key: 'location', width: '20%', render: (text) => (
                text !== '-' ? <span className="flex items-center gap-1 text-gray-500"><IconMapPin size={12} />{text}</span> : '-'
            )
        },
        { title: '创建人', key: 'creator', width: '10%', className: 'text-gray-500' },
        { title: '创建时间', key: 'createTime', width: '15%', className: 'text-gray-500 font-mono text-xs' }
    ];

    const renderResearchObjects = () => {
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
            title="研究对象"
            filterOptions={filterOptions}
            setHeaderActions={setActions}
            onRowClick={onOpenTab}
            columns={researchObjectColumns}
            data={researchObjectData}
        />;
    };

    // ==================== 路由逻辑 ====================
    switch (target) {
        case 'database_mgmt':
            return <DatabaseManagementPage />;

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
                    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-8 flex items-center justify-center">
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
