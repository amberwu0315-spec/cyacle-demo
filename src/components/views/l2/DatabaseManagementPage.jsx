import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';

import { databaseData } from '../../../data/mockData';

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
            title: '数据库名称', key: 'name', width: '25%', render: (text, item) => (
                <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded flex items-center justify-center font-bold text-xs ${item.avatarBg} ${item.avatarColor}`}>
                        {item.avatarText}
                    </div>
                    <div>
                        <div className="text-sm font-medium">{text}</div>
                        <div className="text-xs text-gray-400">{item.fullName}</div>
                    </div>
                </div>
            )
        },
        {
            title: '来源', key: 'source', width: '10%', render: (text) => (
                <span className={`px-2 py-0.5 rounded text-xs ${text === '标准' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {text}
                </span>
            )
        },
        { title: '版本', key: 'version', width: '10%', className: 'text-gray-500 text-sm' },
        { title: '年份', key: 'year', width: '10%', className: 'text-gray-500 text-sm' },
        {
            title: '权限', key: 'permission', width: '10%', render: (text) => (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{text}</span>
            )
        },
        { title: '条目数', key: 'count', width: '10%', className: 'text-gray-500 text-sm' },
        {
            title: '操作', key: 'action', width: '15%', className: 'text-right', render: () => (
                <span className="text-primary hover:underline cursor-pointer text-sm font-medium">管理</span>
            )
        }
    ];

    return (
        <StandardBusinessLayout
            title="数据库"
            filterOptions={filterOptions}
            setHeaderActions={setActions}
            columns={columns}
            data={databaseData}
        />
    );
};

export default DatabaseManagementPage;

