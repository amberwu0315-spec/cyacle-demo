/**
 * LiteratureFactorPage - 文献因子库
 * 
 * 🏢 角色：外部参考资料室 (External References)
 * 📝 职责：管理从文献中提取的排放因子数据。
 * 1. 结构类似 CompositeFactorPage，但数据来源不同。
 */
import React from 'react';
import StandardBusinessLayout from '../StandardBusinessLayout';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import { IconPlus } from '@tabler/icons-react';
import CreateLiteratureFactorPage from '../create/CreateLiteratureFactorPage';

const LiteratureFactorPage = () => {
    const { setActions } = usePagePresentation();
    const [isCreateMode, setIsCreateMode] = React.useState(false);

    const filterOptions = {
        types: [
            { value: 'LCIA', label: 'LCIA' },
            { value: 'LCI', label: 'LCI' }
        ],
        statuses: [
            { value: 'verified', label: '已验证' },
            { value: 'pending', label: '待审核' }
        ]
    };

    const columns = [
        { title: '中文名称', key: 'nameCN', width: '20%', className: 'font-medium' },
        { title: '英文名称', key: 'nameEN', width: '20%', className: 'text-sm text-gray-500' },
        { title: '来源', key: 'source', width: '8%', className: 'text-sm text-gray-500' },
        { title: '来源库', key: 'sourceDB', width: '10%', className: 'text-sm text-gray-500' },
        { title: '类型', key: 'type', width: '8%', className: 'text-sm text-gray-500' },
        { title: '时间', key: 'time', width: '8%', className: 'text-sm text-gray-500' },
        { title: '地理', key: 'geo', width: '10%', className: 'text-sm text-gray-500' },
        { title: '技术', key: 'tech', width: '10%', className: 'text-sm text-gray-500' }
    ];

    if (isCreateMode) {
        return (
            <div className="h-full bg-white">
                <CreateLiteratureFactorPage
                    onCancel={() => setIsCreateMode(false)}
                    onSave={(data) => {
                        console.log('Save Literature Factor:', data);
                        setIsCreateMode(false);
                    }}
                />
            </div>
        );
    }

    return (
        <StandardBusinessLayout
            title="文献因子"
            filterOptions={filterOptions}
            showFilters={false}
            showGridToolbar={false}
            setHeaderActions={(actions) => {
                setActions(
                    <button
                        onClick={() => setIsCreateMode(true)}
                        className="flex items-center gap-1.5 h-btn-md px-btn-x-md text-[13px] font-medium text-white bg-primary-action hover:bg-primary-emphasize rounded-sm transition-colors"
                    >
                        <IconPlus size={16} />
                        <span>创建</span>
                    </button>
                );
            }}
            columns={columns}
            data={literatureFactorData}
        />
    );
};

export default LiteratureFactorPage;
