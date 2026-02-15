/**
 * LiteratureFactorPage - 文献因子库
 * 
 * 🏢 角色：外部参考资料室 (External References)
 * 📝 职责：管理从文献中提取的排放因子数据。
 * 1. 结构类似 CompositeFactorPage，但数据来源不同。
 */
import React from 'react';
import CreateLiteratureFactorPage from '../create/CreateLiteratureFactorPage';
import { literatureFactorData } from '../../../data/mockData';
import EntityModulePage from '../shared/EntityModulePage';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import {
    DetailInfoRows,
    PlainTable,
    SourceBadge,
    TinyToolbar,
    TwoLineListItem
} from '../shared/BackgroundDataWidgets';

const LiteratureFactorPage = () => {
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

    const renderDetailHeader = ({ selectedItem }) => (
        <div className="w-full flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-800 truncate">
                {selectedItem?.nameCN || '未命名'}
            </h2>
            <SourceBadge source={selectedItem?.source || '自建'} />
        </div>
    );

    const renderDetailContent = ({ selectedItem }) => {
        const source = selectedItem?.source || '自建';
        const characteristicRows = [
            { id: 'gwp-1', shortName: 'GWP100 - 温室气体', value: '504.0000000', unit: 'kgCO2e' },
            { id: 'gwp-2', shortName: 'GWP100 - 化石（除航空）', value: '504.0000000', unit: 'kgCO2e' },
            { id: 'gwp-3', shortName: 'GWP100 - 生物', value: '0.0000000', unit: 'kgCO2e' },
            { id: 'gwp-4', shortName: 'GWP100 - 土地', value: '0.0000000', unit: 'kgCO2e' },
            { id: 'gwp-5', shortName: 'GWP100 - 航空', value: '0.0000000', unit: 'kgCO2e' }
        ];

        return (
            <div className="grid grid-cols-1 xl:grid-cols-[2fr_340px] gap-3">
                <div className="space-y-3">
                    <ContentModule>
                        <ModuleHeader title="特征化结果列表" />
                        <TinyToolbar placeholder="筛选" />
                        <PlainTable
                            columns={[
                                { key: 'shortName', title: '简称' },
                                { key: 'value', title: '数值' },
                                { key: 'unit', title: '单位' }
                            ]}
                            rows={characteristicRows}
                        />
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader title="因子说明" />
                        <div className="p-4 text-sm leading-7 text-slate-700 space-y-2">
                            <p>Original link: https://lca.cityghg.com/pages/product-view/21</p>
                            <p>
                                Product Description: This entry describes annual greenhouse gas emissions by horse.
                                The data source is IPCC Emission Factor Database, and may differ from current estimates.
                            </p>
                            <p>
                                说明: 数据源于 1996 年 IPCC 国家温室气体清单指南。该条目属于过程排放因子，不是产品碳足迹。
                            </p>
                        </div>
                    </ContentModule>
                </div>

                <div className="space-y-3">
                    <ContentModule>
                        <ModuleHeader title="基本信息" />
                        <DetailInfoRows
                            rows={[
                                { label: '来源', value: <SourceBadge source={source} /> },
                                { label: '数据类型', value: selectedItem?.type || 'LCIA' },
                                { label: '基准量单位', value: '1 头 * a' },
                                { label: '名称（英文）', value: selectedItem?.nameEN || '-' },
                                { label: '关联元件', value: `${selectedItem?.nameCN || '-'}（${source}）` },
                                { label: '来源数据库', value: selectedItem?.sourceDB || '-' },
                                { label: '创建人', value: selectedItem?.creator || '-' }
                            ]}
                        />
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader title="更多信息" />
                        <DetailInfoRows
                            rows={[
                                { label: '源数据不确定性数值', value: '0.00%' },
                                { label: '时间代表性', value: selectedItem?.time || '-' },
                                { label: '地理代表性', value: selectedItem?.geo || '-' },
                                { label: '技术代表性', value: selectedItem?.tech || '-' },
                                { label: '准确性', value: '-' }
                            ]}
                        />
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader title="参考文献" />
                        <div className="p-4 space-y-3 text-sm">
                            <div className="text-[#0EA5B7]">Intergovernmental Panel on Climate ...</div>
                            <div className="text-[#0EA5B7]">Tubiello F N, Salvatore M, Rossi S ...</div>
                        </div>
                    </ContentModule>
                </div>
            </div>
        );
    };

    return (
        <EntityModulePage
            title="文献因子"
            filterOptions={filterOptions}
            createComponent={CreateLiteratureFactorPage}
            onCreateSaved={(data) => {
                console.log('Save Literature Factor:', data);
            }}
            columns={columns}
            data={literatureFactorData}
            renderDetailHeader={renderDetailHeader}
            renderDetailContent={renderDetailContent}
            listItemRenderer={TwoLineListItem}
        />
    );
};

export default LiteratureFactorPage;
