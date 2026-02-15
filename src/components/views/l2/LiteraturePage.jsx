/**
 * LiteraturePage - 文献管理
 * 
 * 🏢 角色：图书馆 (Library)
 * 📝 职责：管理所有的参考文献（PDF/Link）。
 * 1. 作为数据来源的凭证。
 */
import React from 'react';
import CreateLiteraturePage from '../create/CreateLiteraturePage';
import { documentData } from '../../../data/mockData';
import EntityModulePage from '../shared/EntityModulePage';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import {
    PlainTable,
    SourceBadge,
    TinyToolbar,
    TwoLineListItem
} from '../shared/BackgroundDataWidgets';

const LiteraturePage = () => {
    const filterOptions = {
        types: [
            { value: 'journal', label: '期刊论文' },
            { value: 'standard', label: '标准文件' },
            { value: 'report', label: '研究报告' }
        ],
        statuses: [
            { value: 'active', label: '有效' },
            { value: 'archived', label: '已归档' }
        ]
    };

    const columns = [
        { title: '文献名称', key: 'name', width: '40%', className: 'font-medium' },
        { title: '来源', key: 'source', width: '10%', className: 'text-sm text-gray-500' },
        { title: '文献类型', key: 'docType', width: '18%', className: 'text-sm text-gray-500' },
        { title: '出版时间', key: 'publishYear', width: '10%', className: 'text-sm text-gray-500' },
        { title: '期刊名/出版社', key: 'journal', width: '14%', className: 'text-sm text-gray-500' },
        { title: '创建用户', key: 'creator', width: '8%', className: 'text-sm text-gray-500' }
    ];

    const renderDetailHeader = ({ selectedItem }) => (
        <div className="w-full flex items-center justify-between gap-2">
            <div className="min-w-0 flex items-center gap-2">
                <SourceBadge source={selectedItem?.source || '自建'} />
                <h2 className="text-sm font-semibold text-slate-800 truncate">
                    {selectedItem?.name || '未命名文献'}
                </h2>
            </div>
            <button className="text-sm text-slate-500 border border-slate-200 rounded px-3 h-7">
                编辑
            </button>
        </div>
    );

    const renderDetailContent = ({ selectedItem }) => {
        const relatedFactorRows = [
            {
                id: `rf-${selectedItem?.id || '1'}`,
                source: selectedItem?.source || '自建',
                nameCN: '蒸汽',
                nameEN: 'Steam',
                sourceDB: '青舟-教程配套案例的工作空间',
                type: 'LCIA',
                time: selectedItem?.publishYear || '2024',
                geo: '亚洲/中国',
                tech: '-'
            }
        ];

        return (
            <div className="space-y-3">
                <ContentModule>
                    <ModuleHeader
                        title="基本信息"
                        actions={<button className="text-sm text-[#0EA5B7] border border-[#0EA5B7] rounded px-3 h-7">编辑</button>}
                    />
                    <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                        <div className="text-slate-500">文献名称:</div>
                        <div className="text-slate-800">{selectedItem?.name || '-'}</div>
                        <div className="text-slate-500">文献类型:</div>
                        <div className="text-slate-800">{selectedItem?.docType || '-'}</div>

                        <div className="text-slate-500">作者:</div>
                        <div className="text-slate-800">刘合笑、单思珂、万建、林青阳</div>
                        <div className="text-slate-500">期刊名:</div>
                        <div className="text-slate-800">{selectedItem?.journal || '-'}</div>

                        <div className="text-slate-500">出版时间:</div>
                        <div className="text-slate-800">{selectedItem?.publishYear || '-'}</div>
                        <div className="text-slate-500">期数:</div>
                        <div className="text-slate-800">1</div>

                        <div className="text-slate-500">卷数:</div>
                        <div className="text-slate-800">1</div>
                        <div className="text-slate-500">所在页:</div>
                        <div className="text-slate-800">8-8</div>

                        <div className="text-slate-500">来源链接:</div>
                        <div className="text-slate-800">-</div>
                        <div className="text-slate-500">附件:</div>
                        <div className="text-[#0EA5B7]">查看(1)</div>
                    </div>
                    <div className="border-t border-slate-100 p-4 grid grid-cols-1 lg:grid-cols-2 gap-y-3 text-sm">
                        <div className="text-slate-500">说明:</div>
                        <div className="text-slate-800">-</div>
                        <div className="text-slate-500">创建用户:</div>
                        <div className="text-slate-800">{selectedItem?.creator || '-'}</div>
                    </div>
                </ContentModule>

                <ContentModule>
                    <ModuleHeader
                        title="关联因子列表"
                        actions={(
                            <div className="flex items-center gap-4">
                                <button className="text-[#0EA5B7] text-sm">+ 添加关联因子</button>
                                <button className="text-[#0EA5B7] text-sm">+ 创建因子</button>
                            </div>
                        )}
                    />
                    <TinyToolbar placeholder="因子名称或其他" />
                    <PlainTable
                        columns={[
                            { key: 'source', title: '来源' },
                            { key: 'nameCN', title: '名称（中文）' },
                            { key: 'nameEN', title: '名称（英文）' },
                            { key: 'sourceDB', title: '来源数据库' },
                            { key: 'type', title: '数据类型' },
                            { key: 'time', title: '时间代表性' },
                            { key: 'geo', title: '地理代表性' },
                            { key: 'tech', title: '技术代表性' }
                        ]}
                        rows={relatedFactorRows}
                    />
                </ContentModule>
            </div>
        );
    };

    return (
        <EntityModulePage
            title="文献"
            filterOptions={filterOptions}
            createComponent={CreateLiteraturePage}
            onCreateSaved={(data) => {
                console.log('Save Literature:', data);
            }}
            columns={columns}
            data={documentData}
            renderDetailHeader={renderDetailHeader}
            renderDetailContent={renderDetailContent}
            listItemRenderer={TwoLineListItem}
        />
    );
};

export default LiteraturePage;
