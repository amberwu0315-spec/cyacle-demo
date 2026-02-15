/**
 * BasicFlowPage - 基本流管理
 * 
 * 🏢 角色：原材料库 (Elementary Flows)
 * 📝 职责：管理最基础的物质流数据（如 CO2, CH4, 水）。
 * 1. 通常作为背景数据被引用。
 * 2. 属于 DatabaseManagement 的子模块。
 */
import React from 'react';
import CreateBasicFlowPage from '../create/CreateBasicFlowPage';
import { basicFlowData } from '../../../data/mockData';
import EntityModulePage from '../shared/EntityModulePage';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import {
    DetailInfoRows,
    PlainTable,
    SourceBadge,
    TinyToolbar,
    TwoLineListItem
} from '../shared/BackgroundDataWidgets';

const BasicFlowPage = () => {
    const filterOptions = {
        types: [
            { value: 'material', label: '物料流' },
            { value: 'energy', label: '能源流' },
            { value: 'waste', label: '废物流' }
        ],
        statuses: [
            { value: 'active', label: '已启用' },
            { value: 'draft', label: '草稿' }
        ]
    };

    const columns = [
        { title: '中文名称', key: 'nameCN', width: '20%', className: 'font-medium' },
        { title: '英文名称', key: 'nameEN', width: '20%', className: 'text-sm text-gray-500' },
        { title: '来源', key: 'source', width: '10%', className: 'text-sm text-gray-500' },
        { title: '来源库', key: 'sourceDB', width: '15%', className: 'text-sm text-gray-500' },
        { title: '类型', key: 'type', width: '10%', className: 'text-sm text-gray-500' },
        { title: '时间', key: 'time', width: '10%', className: 'text-sm text-gray-500' },
        { title: '地理', key: 'geo', width: '15%', className: 'text-sm text-gray-500' }
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
            { id: 'gwp-1', shortName: 'GWP100 - 温室气体', value: '0.0000000', unit: 'kgCO2e' },
            { id: 'gwp-2', shortName: 'GWP100 - 化石（除航空）', value: '0.0000000', unit: 'kgCO2e' },
            { id: 'gwp-3', shortName: 'GWP100 - 生物', value: '0.0000000', unit: 'kgCO2e' },
            { id: 'gwp-4', shortName: 'GWP100 - 土地', value: '0.0000000', unit: 'kgCO2e' },
            { id: 'gwp-5', shortName: 'GWP100 - 航空', value: '0.0000000', unit: 'kgCO2e' }
        ];
        const lciRows = [
            {
                id: 'lci-1',
                name: selectedItem?.nameEN || selectedItem?.nameCN || '-',
                category: '-',
                compartment: 'economic',
                subcompartment: 'unspecified',
                value: '1',
                unit: 'EUR'
            }
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
                        <ModuleHeader title="LCI因子列表" />
                        <TinyToolbar placeholder="Name或其他" />
                        <PlainTable
                            columns={[
                                { key: 'name', title: 'Name' },
                                { key: 'category', title: 'Category' },
                                { key: 'compartment', title: 'Compartment' },
                                { key: 'subcompartment', title: 'Subcompartment' },
                                { key: 'value', title: '数值' },
                                { key: 'unit', title: '单位' }
                            ]}
                            rows={lciRows}
                        />
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader title="因子说明" />
                        <div className="p-4 text-sm leading-7 text-slate-700 space-y-2">
                            <p>-</p>
                            <p>-</p>
                        </div>
                    </ContentModule>
                </div>

                <div className="space-y-3">
                    <ContentModule>
                        <ModuleHeader title="基本信息" />
                        <DetailInfoRows
                            rows={[
                                { label: '来源', value: <SourceBadge source={source} /> },
                                { label: '数据类型', value: selectedItem?.type || 'LCI' },
                                { label: '基准量单位', value: '1 EUR' },
                                { label: '名称（英文）', value: selectedItem?.nameEN || '-' },
                                { label: '关联元件', value: `${selectedItem?.nameCN || '-'}（${source}）` },
                                { label: '来源数据库', value: selectedItem?.sourceDB || '-' },
                                { label: '创建人', value: '-' }
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
                        <div className="p-4 text-sm text-slate-400">暂无文献</div>
                    </ContentModule>
                </div>
            </div>
        );
    };

    return (
        <EntityModulePage
            title="基本流"
            filterOptions={filterOptions}
            createComponent={CreateBasicFlowPage}
            onCreateSaved={(data) => {
                console.log('Save Basic Flow:', data);
            }}
            columns={columns}
            data={basicFlowData}
            renderDetailHeader={renderDetailHeader}
            renderDetailContent={renderDetailContent}
            listItemRenderer={TwoLineListItem}
        />
    );
};

export default BasicFlowPage;
