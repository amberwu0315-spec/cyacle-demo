/**
 * ComponentPage - 元件管理
 * 
 * 🏢 角色：半成品库 (Components)
 * 📝 职责：管理可复用的功能组件（如“电池模组”、“电机”）。
 * 1. 它是连接基础流和完整产品的中间层。
 */
import React from 'react';
import CreateComponentPage from '../create/CreateComponentPage';
import { componentData } from '../../../data/mockData';
import EntityModulePage from '../shared/EntityModulePage';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import {
    DetailInfoRows,
    PlainTable,
    SourceBadge,
    TinyToolbar,
    TwoLineListItem
} from '../shared/BackgroundDataWidgets';

const ComponentPage = () => {
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
        { title: '单位组', key: 'unitGroup', width: '12%', className: 'text-sm text-gray-500' },
        { title: '元件类型', key: 'type', width: '18%', className: 'text-sm text-gray-500' },
        { title: '基准单位', key: 'refUnit', width: '10%', className: 'text-sm text-gray-500' },
        { title: '更新时间', key: 'updateTime', width: '15%', className: 'text-sm text-gray-500' }
    ];

    const renderDetailHeader = ({ selectedItem }) => (
        <div className="w-full flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-800 truncate">
                {selectedItem?.name || '未命名'}
            </h2>
            <SourceBadge source={selectedItem?.source || '自建'} />
        </div>
    );

    const renderDetailContent = ({ selectedItem }) => {
        const source = selectedItem?.source || '自建';
        const literatureRows = [
            {
                id: 'lf-local-1',
                source,
                factorName: '<未命名>',
                gwp: '0',
                unit: '-',
                sourceDB: selectedItem?.sourceDB || 'Amber.wu工作空间',
                type: 'LCIA',
                time: '-',
                geo: '-',
                tech: '-'
            }
        ];
        const compositeRows = [
            {
                id: 'cf-local-1',
                factorName: selectedItem?.name || '-',
                sourceDB: selectedItem?.sourceDB || 'Amber.wu工作空间',
                gwp: '-',
                unit: '-',
                time: '-',
                geo: '-',
                tech: '-'
            }
        ];

        return (
            <div className="grid grid-cols-1 xl:grid-cols-[2fr_360px] gap-3">
                <div className="space-y-3">
                    <ContentModule>
                        <ModuleHeader
                            title="关联公式"
                            actions={<button className="text-[#0EA5B7] text-sm">+ 创建并添加</button>}
                        />
                        <div className="p-4 flex items-center justify-between">
                            <span className="text-red-400 text-sm">{'<未命名>'}</span>
                            <SourceBadge source={source} />
                        </div>
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader
                            title="文献因子"
                            actions={<button className="text-[#0EA5B7] text-sm">+ 添加</button>}
                        />
                        <TinyToolbar placeholder="因子名称或其他" />
                        <PlainTable
                            columns={[
                                { key: 'source', title: '来源' },
                                { key: 'factorName', title: '因子名称' },
                                { key: 'gwp', title: 'GWP-温室气体' },
                                { key: 'unit', title: '数值单位' },
                                { key: 'sourceDB', title: '来源数据库' },
                                { key: 'type', title: '数据类型' },
                                { key: 'time', title: '时间代表性' },
                                { key: 'geo', title: '地理代表性' },
                                { key: 'tech', title: '技术代表性' }
                            ]}
                            rows={literatureRows}
                        />
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader
                            title="复合因子"
                            actions={<button className="text-[#0EA5B7] text-sm">+ 添加</button>}
                        />
                        <TinyToolbar placeholder="因子名称或其他" />
                        <PlainTable
                            columns={[
                                { key: 'factorName', title: '因子名称' },
                                { key: 'sourceDB', title: '来源数据库' },
                                { key: 'gwp', title: 'GWP-温室气体' },
                                { key: 'unit', title: '数值单位' },
                                { key: 'time', title: '时间代表性' },
                                { key: 'geo', title: '地理代表性' },
                                { key: 'tech', title: '技术代表性' }
                            ]}
                            rows={compositeRows}
                        />
                    </ContentModule>
                </div>

                <div className="space-y-3">
                    <ContentModule>
                        <ModuleHeader title="基本信息" />
                        <DetailInfoRows
                            rows={[
                                { label: '来源', value: <SourceBadge source={source} /> },
                                { label: '元件类型', value: selectedItem?.type || '-' },
                                { label: '活动数据对应单位组', value: selectedItem?.unitGroup || '-' },
                                { label: '基准单位', value: selectedItem?.refUnit || '-' },
                                { label: '创建人', value: selectedItem?.creator || '13310128160' },
                                { label: '更新时间', value: selectedItem?.updateTime || '-' },
                                { label: '元件说明', value: '这是说明' }
                            ]}
                        />
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader
                            title="关联类目"
                            actions={<button className="text-[#0EA5B7] text-sm">+ 添加</button>}
                        />
                        <div className="p-4 text-sm text-slate-700">
                            域外组织和机构提供的服务
                        </div>
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader
                            title="近似元件"
                            actions={<button className="text-[#0EA5B7] text-sm">+ 添加</button>}
                        />
                        <div className="p-4 space-y-2">
                            <div className="text-[#0EA5B7] text-sm">邻苯二甲酸二异壬酯（DINP）</div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-600">质量</span>
                                <span className="text-emerald-600">标准</span>
                            </div>
                        </div>
                    </ContentModule>
                </div>
            </div>
        );
    };

    return (
        <EntityModulePage
            title="元件"
            filterOptions={filterOptions}
            createComponent={CreateComponentPage}
            onCreateSaved={(data) => {
                console.log('Save Component:', data);
            }}
            columns={columns}
            data={componentData}
            renderDetailHeader={renderDetailHeader}
            renderDetailContent={renderDetailContent}
            listItemRenderer={TwoLineListItem}
        />
    );
};

export default ComponentPage;
