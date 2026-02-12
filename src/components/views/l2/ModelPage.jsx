/**
 * ModelPage - 模型管理主页 (Model Management)
 * 
 * 🏢 角色：模型库 (Model Library)
 * 📝 职责：
 * 1. 管理所有“单元过程”模型。
 * 2. 展示模型与核算任务的关联关系（1个模型 -> N个核算场景）。
 * 3. 提供多维度视图：总览、引用关系、继承关系。
 */
import React, { useEffect, useState, useMemo } from 'react';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import {
    IconPlus,
    IconFilter,
    IconBox,
    IconLayoutGrid,
    IconSitemap,
    IconGitBranch,
    IconChartBar,
    IconDots,
    IconArrowRight,
    IconInfoCircle // Imported correctly
} from '@tabler/icons-react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import StatusChip from '../../common/StatusChip';

// Mock Data: Model Groups (Model -> Accountings)
const MOCK_MODEL_GROUPS = [
    {
        id: 'm1',
        name: '注塑工艺模型 (通用)',
        type: 'Process',
        description: '标准注塑工艺，包含电力消耗与冷却水循环。',
        creator: 'User A',
        updateTime: '2026-02-10',
        accountings: [ // 子核算卡片
            { id: 'a1', name: '2024 年度回顾核算', value: '12.5 kgCO2e', status: '已完成' },
            { id: 'a2', name: '工艺优化预演-V2', value: '10.2 kgCO2e', status: '进行中' }
        ]
    },
    {
        id: 'm2',
        name: '公路运输-柴油货车',
        type: 'Transport',
        description: '国V标准，载重10吨，满载率80%。',
        creator: 'User B',
        updateTime: '2026-02-08',
        accountings: [
            { id: 'a3', name: '华东区物流核算', value: '0.15 kgCO2e/km', status: '已完成' }
        ]
    },
    {
        id: 'm3',
        name: 'PET颗粒生产',
        type: 'Material',
        description: '聚酯切片生产过程，上游数据引用 Ecoinvent。',
        creator: 'System',
        updateTime: '2026-01-20',
        accountings: [] // 无核算任务
    }
];

const ModelPage = () => {
    const { setActions, setLayoutConfig } = usePagePresentation();

    // UI State
    const [activeTab, setActiveTab] = useState('overview'); // overview | reference | inheritance
    const [filterType, setFilterType] = useState('all');

    // Memoize Header Actions to prevent infinite loops
    const headerActions = useMemo(() => (
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 bg-[#087F9C] text-white text-sm font-medium rounded hover:bg-[#076F8A] transition-colors shadow-sm">
                <IconPlus size={16} />
                <span>新建模型</span>
            </button>
        </div>
    ), []);

    // Header Actions Effect
    useEffect(() => {
        setActions(headerActions);
        return () => setActions(null);
    }, [setActions, headerActions]);

    // Render Components
    const renderFilterBar = () => (
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'overview'
                        ? 'bg-white text-[#087F9C] shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <IconLayoutGrid size={16} />
                    总览视图
                </button>
                <button
                    onClick={() => setActiveTab('reference')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'reference'
                        ? 'bg-white text-[#087F9C] shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <IconSitemap size={16} />
                    引用视图
                </button>
                <button
                    onClick={() => setActiveTab('inheritance')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'inheritance'
                        ? 'bg-white text-[#087F9C] shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <IconGitBranch size={16} />
                    继承视图
                </button>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <IconFilter size={16} />
                    <span>筛选:</span>
                </div>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="text-sm border-gray-200 rounded-md focus:border-[#087F9C] focus:ring-0 bg-gray-50 py-1.5 px-3"
                >
                    <option value="all">所有类型</option>
                    <option value="process">过程 (Process)</option>
                    <option value="transport">运输 (Transport)</option>
                    <option value="material">物料 (Material)</option>
                </select>
            </div>
        </div>
    );

    // View 1: Overview (Grouped Cards)
    const renderOverview = () => (
        <div className="p-3 grid grid-cols-1 gap-3">
            {MOCK_MODEL_GROUPS.map((model) => (
                <ContentModule key={model.id} className="hover:shadow-md transition-shadow">
                    {/* Parent Card Header (Model) */}
                    <ModuleHeader
                        title={model.name}
                        subTitle={model.type}
                        actions={
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                                <IconDots size={20} />
                            </button>
                        }
                    />
                    <div className="p-4 flex items-start gap-4 bg-gray-50/50 border-b border-gray-100">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-md shrink-0">
                            <IconBox size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{model.description}</p>
                        </div>
                    </div>

                    {/* Children Cards (Accountings) */}
                    <div className="p-4 bg-white">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">关联核算任务 ({model.accountings.length})</h4>

                        {model.accountings.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4">
                                {model.accountings.map(acct => (
                                    <div key={acct.id} className="flex items-center justify-between p-4 rounded-md border border-gray-100 hover:border-blue-200 hover:bg-blue-50 cursor-pointer group transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-50 text-purple-600 rounded-md">
                                                <IconChartBar size={18} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{acct.name}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">结果: {acct.value}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <StatusChip status={acct.status} />
                                            <IconArrowRight size={14} className="text-gray-300 group-hover:text-blue-400" />
                                        </div>
                                    </div>
                                ))}
                                {/* Add New Accounting Placeholder */}
                                <button className="flex items-center justify-center gap-2 p-4 rounded-md border border-dashed border-gray-300 text-gray-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all h-full">
                                    <IconPlus size={18} />
                                    <span className="text-sm">新建核算</span>
                                </button>
                            </div>
                        ) : (
                            <div className="text-sm text-gray-400 italic px-4 py-4 flex items-center gap-2">
                                <IconInfoCircle size={16} />
                                暂无关联核算，请先创建。
                            </div>
                        )}
                    </div>
                </ContentModule>
            ))}
        </div>
    );

    // View 2: Reference (Placeholder)
    const renderReference = () => (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
            <IconSitemap size={64} stroke={1} className="mb-4 text-gray-200" />
            <h3 className="text-lg font-medium text-gray-600">引用关系视图</h3>
            <p className="text-sm mt-2">可视化展示模型之间的调用链关系 (拓扑图)。</p>
        </div>
    );

    // View 3: Inheritance (Placeholder)
    const renderInheritance = () => (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
            <IconGitBranch size={64} stroke={1} className="mb-4 text-gray-200" />
            <h3 className="text-lg font-medium text-gray-600">继承关系视图</h3>
            <p className="text-sm mt-2">展示模型的版本衍变与继承树 (Lineage)。</p>
        </div>
    );

    return (
        <div className="w-full h-full flex flex-col bg-[#F5F6F8]">
            {/* 1. Sticky Header with Tabs & Filter */}
            {renderFilterBar()}

            {/* 2. Scrolling Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'reference' && renderReference()}
                {activeTab === 'inheritance' && renderInheritance()}
            </div>
        </div>
    );
};

export default ModelPage;
