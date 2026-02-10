import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';

const DatabaseManagementPage = () => {
    const { setActions } = usePagePresentation();

    const filterOptions = {
        types: [
            { value: 'standard', label: '标准数据库' },
            { value: 'custom', label: '自定义数据库' }
        ],
        statuses: [
            { value: 'active', label: '启用中' },
            { value: 'inactive', label: '已停用' }
        ]
    };

    const columns = [
        {
            title: '数据库名称', key: 'name', width: '35%', render: (text, item) => (
                <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded flex items-center justify-center font-bold text-xs ${item.avatarBg} ${item.avatarColor}`}>
                        {item.avatarText}
                    </div>
                    <span className="text-sm">{text}</span>
                </div>
            )
        },
        {
            title: '来源', key: 'source', width: '15%', render: (text) => (
                <span className={`px-2 py-0.5 rounded text-xs ${text === '标准' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {text}
                </span>
            )
        },
        { title: '版本', key: 'version', width: '15%', className: 'text-gray-500 text-sm' },
        { title: '条目数', key: 'count', width: '15%', className: 'text-gray-500 text-sm' },
        {
            title: '操作', key: 'action', width: '20%', className: 'text-right', render: () => (
                <span className="text-primary hover:underline cursor-pointer text-sm font-medium">管理</span>
            )
        }
    ];

    const data = [
        { id: '1', name: 'CLCD-China-2024', source: '标准', version: 'v1.2.0', count: '4,231', avatarText: 'CL', avatarBg: 'bg-blue-100', avatarColor: 'text-blue-600' },
        { id: '2', name: 'Ecoinvent v3.9', source: '标准', version: 'v3.9.1', count: '18,500', avatarText: 'EI', avatarBg: 'bg-purple-100', avatarColor: 'text-purple-600' },
        { id: '3', name: 'GaBi Database', source: '自定义', version: 'v2024.1', count: '12,840', avatarText: 'GD', avatarBg: 'bg-orange-100', avatarColor: 'text-orange-600' }
    ];

    return (
        <StandardBusinessLayout
            title="数据库"
            filterOptions={filterOptions}
            setHeaderActions={setActions}
            columns={columns}
            data={data}
        />
    );
};

export default DatabaseManagementPage;

