import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';

const CarbonAssetMgmtPage = () => {
    const { setActions } = usePagePresentation();

    const filterOptions = {
        types: [
            { value: 'quota', label: '碳配额 (CEA)' },
            { value: 'ccer', label: '核证自愿减排量 (CCER)' },
            { value: 'i-rec', label: '国际绿证 (I-REC)' }
        ],
        statuses: [
            { value: 'active', label: '持有中' },
            { value: 'locked', label: '冻结/履约中' },
            { value: 'retired', label: '已注销' }
        ]
    };

    const columns = [
        {
            title: '资产名称', key: 'name', width: '30%', render: (text, item) => (
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs ${item.avatarBg} ${item.avatarColor}`}>
                        {item.avatarText}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{text}</span>
                        <span className="text-[10px] text-gray-400">ID: {item.code}</span>
                    </div>
                </div>
            )
        },
        {
            title: '类型', key: 'type', width: '15%', render: (text) => {
                const styles = {
                    'CEA': 'bg-blue-100 text-blue-700',
                    'CCER': 'bg-green-100 text-green-700',
                    'I-REC': 'bg-purple-100 text-purple-700'
                };
                return (
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[text] || 'bg-gray-100'}`}>
                        {text}
                    </span>
                );
            }
        },
        { title: '持有量 (吨)', key: 'amount', width: '15%', className: 'text-right font-mono font-medium text-gray-700' },
        {
            title: '状态', key: 'status', width: '15%', render: (status) => (
                <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${status === '持有中' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-gray-600">{status}</span>
                </div>
            )
        },
        { title: '有效期', key: 'expiry', width: '15%', className: 'text-gray-500 text-xs' },
        {
            title: '操作', key: 'action', width: '10%', className: 'text-right', render: () => (
                <span className="text-[#087F9C] hover:underline cursor-pointer text-sm font-medium">详情</span>
            )
        }
    ];

    const data = [
        { id: '1', name: '2023年度碳配额', code: 'CEA-2023-CN-001', type: 'CEA', amount: '50,000', status: '持有中', expiry: '2024-12-31', avatarText: 'CEA', avatarBg: 'bg-blue-100', avatarColor: 'text-blue-600' },
        { id: '2', name: '林业碳汇项目 A', code: 'CCER-2022-098', type: 'CCER', amount: '12,500', status: '持有中', expiry: '长期有效', avatarText: 'CC', avatarBg: 'bg-green-100', avatarColor: 'text-green-600' },
        { id: '3', name: '风电项目 B 绿证', code: 'IREC-2023-WD-112', type: 'I-REC', amount: '5,000', status: '已注销', expiry: '2023-12-31', avatarText: 'IR', avatarBg: 'bg-purple-100', avatarColor: 'text-purple-600' },
    ];

    return (
        <StandardBusinessLayout
            title="碳资产列表"
            filterOptions={filterOptions}
            setHeaderActions={setActions}
            columns={columns}
            data={data}
        />
    );
};

export default CarbonAssetMgmtPage;
