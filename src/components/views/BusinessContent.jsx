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

export default function BusinessContent({ activeL1, target, onOpenTab, openedTabs = [] }) {
    const { setActions } = useHeaderContext();

    // ==================== 项目管理页面 ====================
    // Mock Data for Projects (from Screenshot)
    const projectData = [
        { id: '1', name: 'CFO', object: '演示门窗有限公司', type: 'OCF', createTime: '2026-01-28', updateTime: '2026-01-28' },
        { id: '2', name: '演示门窗有限公司-产品碳足迹认证', object: '演示门窗有限公司', type: 'PCF', createTime: '2026-01-21', updateTime: '2026-01-21' },
        { id: '3', name: '查理猫粮无限2', object: '查理猫粮无限公司', type: 'PCF', createTime: '2026-01-12', updateTime: '2026-01-12' },
        { id: '4', name: '查理猫粮无限公司-产品碳足迹', object: '查理猫粮无限公司', type: 'PCF', createTime: '2026-01-12', updateTime: '2026-01-12' },
        { id: '5', name: '演示五金制品有限公司-产品碳足迹认证', object: '演示五金制品有限公司', type: 'PCF', createTime: '2025-12-31', updateTime: '2025-12-31' },
        { id: '6', name: '示例硅油生产股份有限公司-产品碳足迹', object: '示例硅油生产股份有限公司', type: 'PCF', createTime: '2025-12-30', updateTime: '2025-12-30' },
        { id: '7', name: '（整体引用）福华通达草甘膦-产品碳足迹认证', object: '福华通达化学股份公司', type: 'PCF', createTime: '2025-12-04', updateTime: '2025-12-04' },
        { id: '8', name: '索尼（中国）有限公司-产品碳足迹认证', object: '索尼（中国）有限公司', type: 'PCF', createTime: '2025-10-23', updateTime: '2025-10-23' }
    ];

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
        { title: '研究对象', key: 'object', width: '25%', className: 'text-gray-600' },
        {
            title: '需求类型', key: 'type', width: '15%', render: (type) => {
                const isPCF = type === 'PCF' || type === '产品碳足迹';
                return (
                    <span className={`px-2 py-0.5 rounded text-xs ${isPCF ? 'bg-[#E6FFFA] text-[#087F9C]' : 'bg-[#E0FCFF] text-[#00B5D8]'}`}>
                        {isPCF ? '产品碳足迹' : '组织碳足迹'}
                    </span>
                );
            }
        },
        { title: '创建时间', key: 'createTime', width: '12%', className: 'text-gray-500 font-mono text-xs' },
        { title: '更新时间', key: 'updateTime', width: '12%', className: 'text-gray-500 font-mono text-xs' }
    ];

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

        // Filter data based on type (simple frontend filter logic for demo)
        const displayData = defaultType === 'all'
            ? projectData
            : projectData.filter(item => item.type.toLowerCase() === defaultType);

        return <StandardBusinessLayout
            title="全部项目"
            filterOptions={filterOptions}
            setHeaderActions={setActions}
            defaultFilterType={defaultType}
            onRowClick={onOpenTab}
            columns={projectColumns}
            data={displayData}
        />;
    };

    // ==================== 研究对象页面 ====================
    const researchObjectData = [
        { id: '1', name: '演示门窗有限公司', shortName: '演示门窗有限公司', industry: '建筑装饰、装修和其他建筑业', location: '河南省/鹤壁市', creator: '13310128160', createTime: '2026-01-21 10:28:12' },
        { id: '2', name: '用来删除的研究对象', shortName: '-', industry: '-', location: '-', creator: '13310128160', createTime: '2026-01-13 11:25:21' },
        { id: '3', name: '查理猫粮无限公司', shortName: '-', industry: '-', location: '-', creator: '13310128160', createTime: '2026-01-12 16:29:14' },
        { id: '4', name: '演示五金制品有限公司', shortName: '演示五金', industry: '金属制品业', location: '江苏省/南通市/崇川区', creator: '13310128160', createTime: '2025-12-31 13:56:26' },
        { id: '5', name: '示例硅油生产股份有限公司', shortName: '示例硅油', industry: '化学原料和化学制品制造业', location: '上海市/宝山区', creator: '13310128160', createTime: '2025-12-12 15:17:54' },
        { id: '6', name: '福华通达化学股份公司', shortName: '福华通达', industry: '化学原料和化学制品制造业', location: '四川省/乐山市', creator: 'nan.shi', createTime: '2025-11-10 14:48:05' },
        { id: '7', name: '索尼（中国）有限公司', shortName: '索尼', industry: '通用设备制造业', location: '北京市/朝阳区', creator: 'nan.shi', createTime: '2025-10-23 17:01:21' }
    ];

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
