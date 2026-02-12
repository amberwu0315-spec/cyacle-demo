/**
 * ComponentPage - 元件管理
 * 
 * 🏢 角色：半成品库 (Components)
 * 📝 职责：管理可复用的功能组件（如“电池模组”、“电机”）。
 * 1. 它是连接基础流和完整产品的中间层。
 */
import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import StatusChip from '../../common/StatusChip';

import { componentData } from '../../../data/mockData';

const ComponentPage = () => {
    const { setActions } = usePagePresentation();

    const filterOptions = {
        types: [
            { value: 'mechanical', label: '机械元件' },
            { value: 'electronic', label: '电子元件' },
            { value: 'structural', label: '结构元件' }
        ],
        statuses: [
            { value: 'in_use', label: '使用中' },
            { value: 'obsolete', label: '已淘汰' }
        ]
    };

    const columns = [
        { title: '元件名称', key: 'name', width: '25%', className: 'font-medium' },
        { title: '来源', key: 'source', width: '10%', className: 'text-sm text-gray-500' },
        { title: '单位组', key: 'unitGroup', width: '10%', className: 'text-sm text-gray-500' },
        {
            title: '类型', key: 'type', width: '15%', render: (text) => (
                <span className="text-sm px-2 py-0.5 bg-gray-100 rounded text-gray-600">{text}</span>
            )
        },
        { title: '基准单位', key: 'refUnit', width: '10%', className: 'text-sm text-gray-500' },
        { title: '更新时间', key: 'updateTime', width: '15%', className: 'text-sm text-gray-500' },
        {
            title: '状态', key: 'status', width: '15%', render: (text) => (
                <StatusChip status={text === 'in_use' ? '使用中' : '已淘汰'} />
            )
        }
    ];

    return (
        <StandardBusinessLayout
            title="元件库"
            filterOptions={filterOptions}
            showFilters={false}
            showGridToolbar={false}
            setHeaderActions={setActions}
            columns={columns}
            data={componentData}
        />
    );
};

export default ComponentPage;
