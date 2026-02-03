import React, { useEffect } from 'react';
import { IconStack2, IconFilter, IconSearch, IconPlus, IconLayoutGrid, IconShield } from '@tabler/icons-react';
import StandardBusinessLayout from './StandardBusinessLayout';
import { useHeaderContext } from '../../context/HeaderContext';
import ComponentPage from './l2/ComponentPage';
import BasicFlowPage from './l2/BasicFlowPage';
import CompositeFactorPage from './l2/CompositeFactorPage';
import LiteratureFactorPage from './l2/LiteratureFactorPage';
import LiteraturePage from './l2/LiteraturePage';
import DatabaseManagementPage from './l2/DatabaseManagementPage';

export default function BusinessContent({ activeL1, target, onOpenTab, openedTabs = [] }) {
    const { setActions } = useHeaderContext();

    // ==================== 项目管理页面 ====================
    const renderProjectManagement = (defaultType = 'all') => {
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

        return <StandardBusinessLayout
            title="全部项目"
            filterOptions={filterOptions}
            setHeaderActions={setActions}
            defaultFilterType={defaultType}
            onRowClick={onOpenTab}
        />;
    };

    // ==================== 研究对象页面 ====================
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
