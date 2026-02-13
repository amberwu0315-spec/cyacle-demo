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
import Tag from '../../common/Tag';


import { IconPlus } from '@tabler/icons-react';
import CreateComponentPage from '../create/CreateComponentPage';
import { componentData } from '../../../data/mockData';

const ComponentPage = () => {
    const { setActions } = usePagePresentation();
    const [isCreateMode, setIsCreateMode] = React.useState(false);

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
                <Tag variant="neutral" size="sm">{text}</Tag>
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

    if (isCreateMode) {
        return (
            <div className="h-full bg-white">
                <CreateComponentPage
                    onCancel={() => setIsCreateMode(false)}
                    onSave={(data) => {
                        console.log('Save Component:', data);
                        setIsCreateMode(false);
                    }}
                />
            </div>
        );
    }

    return (
        <StandardBusinessLayout
            title="元件库"
            filterOptions={filterOptions}
            showFilters={false}
            showGridToolbar={false}
            setHeaderActions={setActions}
            onCreate={() => setIsCreateMode(true)}
            columns={columns}
            data={componentData}
        />
    );
};

export default ComponentPage;
