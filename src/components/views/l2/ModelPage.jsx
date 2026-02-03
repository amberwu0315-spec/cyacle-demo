import React, { useEffect, useState } from 'react';
import { useHeaderContext } from '../../../context/HeaderContext';
import { IconFilter, IconGrid4x4, IconNetwork, IconHierarchy, IconBox } from '@tabler/icons-react';

const ModelPage = () => {
    const { setActions, setTitleOverride, setLayoutConfig } = useHeaderContext();

    // 层级1：筛选器状态
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // 层级2：视图类型切换
    const [activeView, setActiveView] = useState('overview'); // 'overview' | 'reference' | 'inheritance'

    useEffect(() => {
        setTitleOverride('My Green Project');
        setLayoutConfig('title-only');
        setActions(null);

        return () => {
            setActions(null);
            setTitleOverride(null);
        };
    }, [setActions, setTitleOverride, setLayoutConfig]);

    // 模拟数据
    const models = [
        { id: 1, name: '门窗系统模型', type: '产品模型', status: '已发布', version: 'V1.2' },
        { id: 2, name: '电机模型', type: '部件模型', status: '草稿', version: 'V0.8' },
        { id: 3, name: '铝合金框架', type: '材料模型', status: '已发布', version: 'V2.0' }
    ];

    // 渲染筛选器
    const renderFilters = () => (
        <div className="flex items-center gap-3 p-3 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <IconFilter size={16} />
                <span className="font-medium">筛选：</span>
            </div>

            <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:border-[#087F9C] focus:outline-none focus:border-[#087F9C] transition-colors"
            >
                <option value="all">全部类型</option>
                <option value="product">产品模型</option>
                <option value="component">部件模型</option>
                <option value="material">材料模型</option>
            </select>

            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded hover:border-[#087F9C] focus:outline-none focus:border-[#087F9C] transition-colors"
            >
                <option value="all">全部状态</option>
                <option value="published">已发布</option>
                <option value="draft">草稿</option>
            </select>
        </div>
    );

    // 渲染视图切换Tab
    const renderViewTabs = () => {
        const tabs = [
            { id: 'overview', label: '总览视图', icon: IconGrid4x4 },
            { id: 'reference', label: '引用视图', icon: IconNetwork },
            { id: 'inheritance', label: '继承视图', icon: IconHierarchy }
        ];

        return (
            <div className="flex items-center gap-1 p-3 bg-gray-50 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveView(tab.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded transition-colors ${activeView === tab.id
                                ? 'bg-white text-[#087F9C] shadow-sm border border-gray-200'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                    >
                        <tab.icon size={16} />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>
        );
    };

    // 层级3：总览视图 - 大卡片列表
    const renderOverviewView = () => (
        <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
                {models.map((model) => (
                    <div
                        key={model.id}
                        className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-[#087F9C] cursor-pointer transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 text-[#087F9C] rounded-lg">
                                <IconBox size={32} />
                            </div>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                {model.version}
                            </span>
                        </div>

                        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-[#087F9C] mb-2">
                            {model.name}
                        </h3>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">类型：</span>
                                <span className="text-gray-700">{model.type}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">状态：</span>
                                <span className={`px-2 py-0.5 rounded text-xs ${model.status === '已发布'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {model.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // 层级3：引用视图 - 网状图
    const renderReferenceView = () => (
        <div className="p-6 flex items-center justify-center h-[600px] bg-gray-50">
            <div className="text-center">
                <IconNetwork size={64} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">引用关系网状图</h3>
                <p className="text-sm text-gray-500">
                    此处将显示模型之间的引用关系网络图
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    (需要集成图形可视化库，如 D3.js 或 Cytoscape.js)
                </p>
            </div>
        </div>
    );

    // 层级3：继承视图 - 脑图
    const renderInheritanceView = () => (
        <div className="p-6 flex items-center justify-center h-[600px] bg-gray-50">
            <div className="text-center">
                <IconHierarchy size={64} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">继承关系脑图</h3>
                <p className="text-sm text-gray-500">
                    此处将显示模型的继承层级结构思维导图
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    (需要集成脑图库，如 MindMap 或 Markmap)
                </p>
            </div>
        </div>
    );

    // 渲染内容区
    const renderContent = () => {
        switch (activeView) {
            case 'overview':
                return renderOverviewView();
            case 'reference':
                return renderReferenceView();
            case 'inheritance':
                return renderInheritanceView();
            default:
                return renderOverviewView();
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-[#F5F6F8]">
            {/* 层级1：筛选器 */}
            {renderFilters()}

            {/* 层级2：视图类型切换 Tab */}
            {renderViewTabs()}

            {/* 层级3：内容区 */}
            <div className="flex-1 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default ModelPage;
