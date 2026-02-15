/**
 * CompositeFactorPage - 复合因子管理
 * 
 * 🏢 角色：配方库 (Composite Factors)
 * 📝 职责：管理组合的环境影响因子（如“中国电网混合排放因子”）。
 * 1. 它通常由多个基本流组合而成。
 */
import React from 'react';
import CreateCompositeFactorPage from '../create/CreateCompositeFactorPage';
import { compositeFactorData } from '../../../data/mockData';
import EntityModulePage from '../shared/EntityModulePage';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import {
    DetailInfoRows,
    PlainTable,
    SourceBadge,
    TinyToolbar,
    TwoLineListItem
} from '../shared/BackgroundDataWidgets';

const CompositeFactorPage = () => {
    const filterOptions = {
        types: [
            { value: 'emission', label: '排放因子' },
            { value: 'resource', label: '资源因子' },
            { value: 'impact', label: '影响因子' }
        ],
        statuses: [
            { value: 'published', label: '已发布' },
            { value: 'draft', label: '草稿' }
        ]
    };

    const columns = [
        { title: '中文名称', key: 'nameCN', width: '25%', className: 'font-medium' },
        { title: '英文名称', key: 'nameEN', width: '25%', className: 'text-sm text-gray-500' },
        { title: '关联元件', key: 'refComponent', width: '15%', className: 'text-sm text-gray-500' },
        { title: '来源库', key: 'sourceDB', width: '15%', className: 'text-sm text-gray-500' },
        { title: '时间', key: 'time', width: '10%', className: 'text-sm text-gray-500' },
        { title: '地理', key: 'geo', width: '10%', className: 'text-sm text-gray-500' },
        { title: '技术', key: 'tech', width: '10%', className: 'text-sm text-gray-500' }
    ];

    const renderDetailHeader = ({ selectedItem }) => (
        <div className="w-full flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-800 truncate">
                {selectedItem?.nameCN || '未命名'}
            </h2>
            <SourceBadge source="自建" />
        </div>
    );

    const renderDetailContent = ({ selectedItem }) => {
        const overviewRows = [
            { id: 'gwp-1', shortName: 'GWP100 - 温室气体', value: '1.1543643', unit: 'kgCO2e' },
            { id: 'gwp-2', shortName: 'GWP100 - 除航空', value: '1.1543643', unit: 'kgCO2e' },
            { id: 'gwp-3', shortName: 'GWP100 - 生物', value: '0', unit: 'kgCO2e' },
            { id: 'gwp-4', shortName: 'GWP100 - 土地', value: '0', unit: 'kgCO2e' },
            { id: 'gwp-5', shortName: 'GWP100 - 航空', value: '0', unit: 'kgCO2e' }
        ];
        const deriveRows = [
            {
                id: 'derive-1',
                source: selectedItem?.refComponent || '-',
                formula: `${selectedItem?.refComponent || '-'}的碳排放计算公式`,
                emission: '1.015473',
                ratio: '43.98%'
            },
            {
                id: 'derive-2',
                source: selectedItem?.nameCN || '-',
                formula: `${selectedItem?.nameCN || '-'}的碳排放计算公式`,
                emission: '1.2932555',
                ratio: '56.02%'
            }
        ];

        return (
            <div className="grid grid-cols-1 xl:grid-cols-[2fr_340px] gap-3">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <button className="px-3 h-8 text-sm border border-[#0EA5B7] text-[#0EA5B7] bg-[#EAF9FB] rounded">
                            信息概览
                        </button>
                        <button className="px-3 h-8 text-sm border border-slate-200 text-slate-500 bg-white rounded">
                            推导模型
                        </button>
                    </div>

                    <ContentModule>
                        <ModuleHeader title="因子数值信息" />
                        <div className="p-4 space-y-2 text-sm">
                            <div>数据来源: 建模计算</div>
                            <div>核算对象: -</div>
                            <div>核算产量: 2 kg</div>
                        </div>
                        <TinyToolbar placeholder="筛选" />
                        <PlainTable
                            columns={[
                                { key: 'shortName', title: '简称' },
                                { key: 'value', title: '数值' },
                                { key: 'unit', title: '单位' }
                            ]}
                            rows={overviewRows}
                        />
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader
                            title="推导模型"
                            actions={<button className="text-[#0EA5B7] text-sm">新增</button>}
                        />
                        <TinyToolbar placeholder="排放源或其他" />
                        <PlainTable
                            columns={[
                                { key: 'source', title: '排放源' },
                                { key: 'formula', title: '公式' },
                                { key: 'emission', title: '排放量(kgCO2e)' },
                                { key: 'ratio', title: '计算占比' }
                            ]}
                            rows={deriveRows}
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
                        <ModuleHeader title="基础信息" />
                        <DetailInfoRows
                            rows={[
                                { label: '名称（英文）', value: selectedItem?.nameEN || '-' },
                                { label: '关联元件', value: `${selectedItem?.refComponent || '-'}（自建）` },
                                { label: '来源数据库', value: selectedItem?.sourceDB || '-' },
                                { label: '创建人', value: selectedItem?.creator || '13310128160' }
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
                        <ModuleHeader
                            title="参考文献"
                            actions={<button className="text-[#0EA5B7] text-sm">+ 添加</button>}
                        />
                        <div className="p-4 text-sm text-slate-400">暂无文献</div>
                    </ContentModule>
                </div>
            </div>
        );
    };

    return (
        <EntityModulePage
            title="复合因子"
            filterOptions={filterOptions}
            createComponent={CreateCompositeFactorPage}
            onCreateSaved={(data) => {
                console.log('Save Composite Factor:', data);
            }}
            columns={columns}
            data={compositeFactorData}
            renderDetailHeader={renderDetailHeader}
            renderDetailContent={renderDetailContent}
            listItemRenderer={TwoLineListItem}
        />
    );
};

export default CompositeFactorPage;
