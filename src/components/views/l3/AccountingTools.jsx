import React, { useState, useMemo } from 'react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import DataGrid from '../../common/DataGrid';
import Checkbox from '../../common/Checkbox';
import Tag from '../../common/Tag';
import { IconChevronDown, IconChevronUp, IconRefresh, IconInfoCircle } from '@tabler/icons-react';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const emissionSources = [
    { id: 's1', phase: '原材料获取', module: '外购原料的生产', process: '黄磷', emission: 2576412.4, ratio: 99.63, activityScore: 3.00, paramScore: 2.50, totalScore: 7.50, grade: '第二级' },
    { id: 's2', phase: '生产制造', module: '能源', process: '外购电', emission: 5439.7, ratio: 0.21, activityScore: 3.00, paramScore: 3.25, totalScore: 9.75, grade: '第三级' },
    { id: 's3', phase: '生产制造', module: '能源', process: '自发电', emission: 3399.96, ratio: 0.13, activityScore: 3.00, paramScore: 2.50, totalScore: 7.50, grade: '第二级' },
    { id: 's4', phase: '生产制造', module: '制造过程废弃', process: '清釜废渣', emission: 628.4, ratio: 0.02, activityScore: 3.00, paramScore: 2.50, totalScore: 7.50, grade: '第二级' },
];

const defaultToolsEnabled = { exclusion: true, quality: true, sensitivity: true, issues: true };

// ─── Sub-components ──────────────────────────────────────────────────────────

const ToggleSwitch = ({ checked, onChange, size = 'md' }) => {
    const h = size === 'sm' ? 'h-4 w-8' : 'h-5 w-10';
    const dot = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
    const translate = size === 'sm' ? 'translate-x-4' : 'translate-x-5';
    return (
        <button
            type="button"
            onClick={() => onChange?.(!checked)}
            className={`relative inline-flex ${h} items-center rounded-full transition-colors ${checked ? 'bg-[#0B8FAE]' : 'bg-gray-300'}`}
        >
            <span className={`inline-block ${dot} transform rounded-full bg-white shadow transition-transform ${checked ? translate : 'translate-x-0.5'}`} />
        </button>
    );
};

const RatioBadge = ({ value }) => {
    const bg = value >= 50 ? 'bg-[#0B8FAE] text-white' : 'bg-transparent text-[#0B8FAE]';
    return (
        <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium ${bg}`}>
            {typeof value === 'number' ? value.toFixed(2) : value}%
        </span>
    );
};

// ─── Tab 1: 排除计算 ─────────────────────────────────────────────────────────

const ExclusionTab = () => {
    const [excludedItems, setExcludedItems] = useState([]);
    const [showQuantNote, setShowQuantNote] = useState(true);

    const nonExcluded = useMemo(() =>
        emissionSources.filter(s => s.ratio < 1 && !excludedItems.includes(s.id)),
        [excludedItems]
    );

    const excludedColumns = [
        { title: '排除', key: '_exclude', width: 70, render: () => <ToggleSwitch checked={true} size="sm" /> },
        { title: '阶段', key: 'phase', width: 140 },
        { title: '模块', key: 'module', width: 180 },
        { title: '单元过程', key: 'process', width: 160, render: (v) => <span className="text-[#0B8FAE] hover:underline cursor-pointer">{v}</span> },
        { title: '排放占比', key: 'ratio', width: 120, render: (v) => <RatioBadge value={v} /> },
        { title: '排除原因', key: 'reason', width: 200 },
    ];

    const nonExcludedColumns = [
        {
            title: '排除', key: '_exclude', width: 70,
            render: (_, row) => (
                <ToggleSwitch
                    checked={false}
                    size="sm"
                    onChange={() => setExcludedItems(prev => [...prev, row.id])}
                />
            )
        },
        { title: '阶段', key: 'phase', width: 140 },
        { title: '模块', key: 'module', width: 180 },
        { title: '单元过程', key: 'process', width: 160, render: (v) => <span className="text-[#0B8FAE] hover:underline cursor-pointer">{v}</span> },
        { title: '排放占比', key: 'ratio', width: 120, render: (v) => <span className="text-[#0B8FAE]">{v}%</span> },
    ];

    return (
        <>
            {/* 阈值参数 */}
            <ContentModule>
                <ModuleHeader title="阈值参数" />
                <div className="px-5 py-4 text-sm text-slate-700 space-y-2">
                    <div>重要性阈值：<span className="font-semibold text-slate-900 ml-2">1%</span></div>
                    <div>排除性阈值：<span className="font-semibold text-slate-900 ml-2">3%</span></div>
                </div>
            </ContentModule>

            {/* 已排除项列表 */}
            <ContentModule>
                <ModuleHeader title="已排除项列表" />
                <DataGrid
                    title="已排除项"
                    columns={excludedColumns}
                    rows={[]}
                    rowKey="id"
                    storageKey="tools:excluded"
                    className="border-0 rounded-none"
                    showToolbar={true}
                    showFooter={false}
                    emptyText="暂无数据"
                    compact
                    minTableWidth={800}
                />
            </ContentModule>

            {/* 未排除项列表 */}
            <ContentModule>
                <ModuleHeader title="未排除项列表" />
                <DataGrid
                    title="未排除项"
                    columns={nonExcludedColumns}
                    rows={nonExcluded}
                    rowKey="id"
                    storageKey="tools:non-excluded"
                    className="border-0 rounded-none"
                    showToolbar={true}
                    showFooter={false}
                    compact
                    minTableWidth={800}
                />
            </ContentModule>

            {/* 未量化排除项说明 */}
            <ContentModule>
                <div className="px-5 py-4 flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#0B8FAE]">未量化排除项说明</span>
                    <ToggleSwitch checked={showQuantNote} onChange={setShowQuantNote} />
                </div>
                {showQuantNote && (
                    <div className="px-5 pb-4">
                        <div className="text-sm text-slate-500">-</div>
                    </div>
                )}
            </ContentModule>
        </>
    );
};

// ─── Tab 2: 数据质量打分 ─────────────────────────────────────────────────────

const QualityTab = () => {
    const avgScore = useMemo(() => {
        const total = emissionSources.reduce((sum, s) => sum + s.totalScore, 0);
        return (total / emissionSources.length).toFixed(2);
    }, []);

    const gradeDistribution = useMemo(() => {
        const grades = { '第一级': 0, '第二级': 0, '第三级': 0, '第四级': 0 };
        emissionSources.forEach(s => { grades[s.grade] = (grades[s.grade] || 0) + 1; });
        return grades;
    }, []);

    const finalGrade = useMemo(() => {
        const score = parseFloat(avgScore);
        if (score < 4) return '第一级';
        if (score < 8) return '第二级';
        if (score < 12) return '第三级';
        return '第四级';
    }, [avgScore]);

    const detailColumns = [
        { title: '阶段', key: 'phase', width: 120 },
        { title: '模块', key: 'module', width: 140 },
        { title: '单元过程', key: 'process', width: 120, render: (v) => <span className="text-[#0B8FAE] font-medium">{v}</span> },
        { title: '排放量（kgCO₂e）', key: 'emission', width: 150, render: (v) => v.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) },
        { title: '排放占比', key: 'ratio', width: 100, render: (v) => <RatioBadge value={v} /> },
        { title: '活动数据打分', key: 'activityScore', width: 120, render: (v) => v.toFixed(2) },
        { title: '排放参数打分', key: 'paramScore', width: 120, render: (v) => v.toFixed(2) },
        { title: '评分结果', key: 'totalScore', width: 100, render: (v) => v.toFixed(2) },
        { title: '所属等级', key: 'grade', width: 100 },
    ];

    return (
        <>
            {/* 评分结果 */}
            <ContentModule>
                <ModuleHeader title="评分结果" />
                <div className="px-5 py-4 flex gap-12">
                    <div>
                        <div className="text-xs text-slate-500 mb-1">等级平均分数</div>
                        <div className="text-2xl font-bold text-slate-900">{avgScore}</div>
                    </div>
                    <div>
                        <div className="text-xs text-slate-500 mb-1">最终等级</div>
                        <div className="text-2xl font-bold text-slate-900">{finalGrade}</div>
                    </div>
                </div>
            </ContentModule>

            {/* 排放源评分等级统计表 */}
            <ContentModule>
                <ModuleHeader title="排放源评分等级统计表" />
                <div className="px-5 py-4">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-2 pr-4 text-slate-500 font-medium">等级</th>
                                <th className="text-center py-2 px-4 font-semibold text-slate-800">第一级</th>
                                <th className="text-center py-2 px-4 font-semibold text-slate-800">第二级</th>
                                <th className="text-center py-2 px-4 font-semibold text-slate-800">第三级</th>
                                <th className="text-center py-2 px-4 font-semibold text-slate-800">第四级</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100">
                                <td className="py-2 pr-4 text-slate-500">评分范围</td>
                                <td className="text-center py-2 px-4 text-slate-700">QA &lt; 4分</td>
                                <td className="text-center py-2 px-4 text-slate-700">4分≤QA &lt; 8分</td>
                                <td className="text-center py-2 px-4 text-slate-700">8分≤QA &lt; 12分</td>
                                <td className="text-center py-2 px-4 text-slate-700">12分≤QA≤16分</td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4 text-slate-500">个数</td>
                                <td className="text-center py-2 px-4 font-semibold text-slate-900">{gradeDistribution['第一级']}</td>
                                <td className="text-center py-2 px-4 font-semibold text-slate-900">{gradeDistribution['第二级']}</td>
                                <td className="text-center py-2 px-4 font-semibold text-slate-900">{gradeDistribution['第三级']}</td>
                                <td className="text-center py-2 px-4 font-semibold text-slate-900">{gradeDistribution['第四级']}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </ContentModule>

            {/* 评分明细表 */}
            <ContentModule>
                <ModuleHeader title="评分明细表" />
                <DataGrid
                    title="评分明细"
                    columns={detailColumns}
                    rows={emissionSources}
                    rowKey="id"
                    storageKey="tools:quality-detail"
                    className="border-0 rounded-none"
                    showToolbar={true}
                    showFooter={true}
                    compact
                    minTableWidth={1100}
                />
            </ContentModule>
        </>
    );
};

// ─── Tab 3: 敏感性分析 ───────────────────────────────────────────────────────

const SensitivityTab = () => {
    const [methods, setMethods] = useState({ fluctuation: true, uncertainty: true });
    const [interval, setInterval_] = useState(25);

    const sensitivityColumns = [
        { title: '分析', key: '_analyze', width: 70, render: () => <ToggleSwitch checked={false} size="sm" /> },
        { title: '阶段', key: 'phase', width: 120 },
        { title: '模块', key: 'module', width: 160 },
        { title: '单元过程', key: 'process', width: 130, render: (v) => <span className="text-[#0B8FAE] font-medium">{v}</span> },
        { title: '排放量（kgCO₂e）', key: 'emission', width: 150, render: (v) => v.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) },
        { title: '排放占比', key: 'ratio', width: 100, render: (v) => <RatioBadge value={v} /> },
        { title: '波动影响 ⓘ', key: 'fluctuationImpact', width: 120, render: () => <span className="text-slate-400">-</span> },
        { title: '不确定性影响 ⓘ', key: 'uncertaintyImpact', width: 140, render: () => <span className="text-slate-400">-</span> },
    ];

    return (
        <>
            {/* 分析方法与参数 */}
            <ContentModule>
                <ModuleHeader title="分析方法与参数" />
                <div className="px-5 py-4 space-y-3 text-sm">
                    <div className="flex items-center gap-6">
                        <span className="text-slate-600">分析方法：</span>
                        <Checkbox
                            checked={methods.fluctuation}
                            onChange={(e) => setMethods(m => ({ ...m, fluctuation: e.target.checked }))}
                            label="按重要数据波动区间分析"
                        />
                        <Checkbox
                            checked={methods.uncertainty}
                            onChange={(e) => setMethods(m => ({ ...m, uncertainty: e.target.checked }))}
                            label="按重要数据不确定性分析"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600">波动区间：</span>
                        <span className="font-semibold text-slate-900">{interval}%</span>
                        <IconInfoCircle size={14} className="text-slate-400" />
                    </div>
                </div>
            </ContentModule>

            {/* 排放源分析结果 */}
            <ContentModule>
                <ModuleHeader title="排放源分析结果" />
                <DataGrid
                    title="排放源分析结果"
                    columns={sensitivityColumns}
                    rows={emissionSources}
                    rowKey="id"
                    storageKey="tools:sensitivity"
                    className="border-0 rounded-none"
                    showToolbar={true}
                    showFooter={true}
                    compact
                    minTableWidth={1000}
                />
            </ContentModule>
        </>
    );
};

// ─── Tab 4: 重要问题识别 ─────────────────────────────────────────────────────

const IssuesTab = () => {
    const issueRows = useMemo(() => [
        { id: 'i1', enabled: true, phase: '原材料获取', module: '外购原料的生产', ratio: 99.63, description: '-' },
        { id: 'i2', enabled: false, phase: '生产制造', module: '能源', ratio: 0.34, description: '-' },
        { id: 'i3', enabled: false, phase: '生产制造', module: '制造过程废弃', ratio: 0.02, description: '-' },
    ], []);

    const [rows, setRows] = useState(issueRows);

    const toggleEnabled = (id) => {
        setRows(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
    };

    const handleResetDefaults = () => {
        setRows(issueRows);
    };

    const issueColumns = [
        {
            title: '启用', key: 'enabled', width: 80,
            render: (v, row) => <ToggleSwitch checked={v} size="sm" onChange={() => toggleEnabled(row.id)} />
        },
        { title: '阶段', key: 'phase', width: 160 },
        { title: '模块', key: 'module', width: 200 },
        { title: '排放占比', key: 'ratio', width: 120, render: (v) => <RatioBadge value={v} /> },
        {
            title: '问题说明', key: 'description', width: 250,
            render: (v, row) => (
                <div className="flex items-center gap-2">
                    <span className="text-slate-600">{v}</span>
                    {row.enabled && row.ratio > 50 && (
                        <span className="w-4 h-4 rounded-full bg-red-500 inline-block shrink-0" />
                    )}
                </div>
            )
        },
    ];

    return (
        <>
            <ContentModule>
                <ModuleHeader
                    title="重要问题识别"
                    actions={
                        <button
                            onClick={handleResetDefaults}
                            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition-colors"
                        >
                            <IconRefresh size={13} />
                            <span>恢复默认</span>
                        </button>
                    }
                />
                <DataGrid
                    title="重要问题识别"
                    columns={issueColumns}
                    rows={rows}
                    rowKey="id"
                    storageKey="tools:issues"
                    className="border-0 rounded-none"
                    showToolbar={true}
                    showFooter={true}
                    compact
                    minTableWidth={800}
                />
            </ContentModule>
        </>
    );
};

// ─── Settings Dropdown ───────────────────────────────────────────────────────

const ToolsSettingsDropdown = ({ toolsEnabled, onToggle }) => {
    const [open, setOpen] = useState(false);

    const items = [
        { key: 'exclusion', label: '排除计算', desc: '根据标准所述规则将部分数据质量较差的排放源排除出报告之外的方法；' },
        { key: 'quality', label: '数据质量打分', desc: '根据参数的数据评分，计算出整体产品碳排放计算质量评分的方法；' },
        { key: 'sensitivity', label: '敏感性分析', desc: '衡量某些重要参数数值变动对整体结果变动影响的方法；' },
        { key: 'issues', label: '重要问题识别', desc: '展示并说明对产品碳足迹排放影响最大的模块的方法；' },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 text-sm text-[#0B8FAE] hover:text-[#087F9C] transition-colors font-medium"
            >
                <span>设置分析工具</span>
                {open ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
            </button>
            {open && (
                <div className="absolute right-0 top-full mt-2 w-[380px] bg-white rounded-lg shadow-lg border border-slate-200 z-50 py-3 px-4 space-y-3">
                    {items.map(item => (
                        <label key={item.key} className="flex items-start gap-3 cursor-pointer group">
                            <Checkbox
                                checked={toolsEnabled[item.key]}
                                onChange={() => onToggle(item.key)}
                            />
                            <div>
                                <div className="text-sm font-semibold text-slate-800 group-hover:text-[#0B8FAE] transition-colors">
                                    需要「{item.label}」
                                </div>
                                <div className="text-xs text-[#0B8FAE] mt-0.5 leading-relaxed">
                                    作用：{item.desc}
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─── Main Component ──────────────────────────────────────────────────────────

// L3: 分析工具 (AccountingTools)
const AccountingTools = () => {
    const [activePageTab, setActivePageTab] = useState('exclusion');
    const [toolsEnabled, setToolsEnabled] = useState(defaultToolsEnabled);

    const toggleTool = (key) => {
        setToolsEnabled(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const tabs = [
        { key: 'exclusion', label: '排除计算' },
        { key: 'quality', label: '数据质量打分' },
        { key: 'sensitivity', label: '敏感性分析' },
        { key: 'issues', label: '重要问题识别' },
    ];

    const enabledTabs = tabs.filter(t => toolsEnabled[t.key]);

    // If current tab is disabled, switch to first enabled tab
    React.useEffect(() => {
        if (!toolsEnabled[activePageTab] && enabledTabs.length > 0) {
            setActivePageTab(enabledTabs[0].key);
        }
    }, [toolsEnabled, activePageTab, enabledTabs]);

    const renderTabContent = () => {
        switch (activePageTab) {
            case 'exclusion': return <ExclusionTab />;
            case 'quality': return <QualityTab />;
            case 'sensitivity': return <SensitivityTab />;
            case 'issues': return <IssuesTab />;
            default: return null;
        }
    };

    return (
        <div className="flex flex-col gap-3 p-3 w-full h-full overflow-y-auto bg-[#F5F6F8]">
            {/* Top bar: Tabs + Settings */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    {enabledTabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActivePageTab(tab.key)}
                            className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${activePageTab === tab.key
                                ? 'bg-[#087F9C] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <ToolsSettingsDropdown toolsEnabled={toolsEnabled} onToggle={toggleTool} />
            </div>

            {/* Tab Content */}
            {enabledTabs.length > 0 ? renderTabContent() : (
                <ContentModule>
                    <div className="p-8 text-center text-slate-400 text-sm">
                        请在右上角「设置分析工具」中启用至少一个分析工具
                    </div>
                </ContentModule>
            )}
        </div>
    );
};

export default AccountingTools;
