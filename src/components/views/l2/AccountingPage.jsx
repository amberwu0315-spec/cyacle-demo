/**
 * AccountingPage - 核算模型主页
 *
 * 🏢 角色：核算工作室 (Accounting Studio)
 * 📝 职责：
 * 1. 提供"清单"、"计算"、"结果"三级视图的切换。
 * 2. 是核心的业务生产页面之一。
 */
import React, { useEffect, useState } from 'react';
import { IconDeviceFloppy, IconLoader2 } from '@tabler/icons-react';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import { useNavigation } from '../../../context/NavigationContext';
import { useViewActions } from '../../../context/ViewActionsContext';
import { useNotification } from '../../../context/NotificationContext';
import { useData } from '../../../context/DataContext';
import { useAppNavigation } from '../../../context/AppNavigationContext';
import L3Sidebar from '../../layout/L3Sidebar';
import InnerDrawer from '../../common/InnerDrawer';
import ComingSoon from '../../common/ComingSoon';

// L3 Views
import AccountingBasic from '../l3/AccountingBasic';
import AccountingModelConfig from '../accounting/AccountingModelConfig';
import ActivityDataView from '../shared/ActivityDataView';
import FactorDataView from '../shared/FactorDataView';
import ReportInfo from '../l3/ReportInfo';
import ReportExport from '../l3/ReportExport';
import AccountingTools from '../l3/AccountingTools';
import { ACCOUNTING_CONFIG_TREE_MOCK } from '../accounting/modelMockData';

const VERSION_TABS = [
    { id: 'list', label: '版本列表' },
    { id: 'detail', label: '版本详情' },
    { id: 'compare', label: '版本对比' }
];

const cloneJSON = (val) => JSON.parse(JSON.stringify(val));

const buildDefaultModelSnapshot = () => ({
    menuMode: 'config',
    selectedId: ACCOUNTING_CONFIG_TREE_MOCK?.[0]?.id || null,
    treeData: cloneJSON(ACCOUNTING_CONFIG_TREE_MOCK || [])
});

const formatDateTime = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return '-';
    return `${date.toLocaleDateString('zh-CN')} ${date.toLocaleTimeString('zh-CN', { hour12: false })}`;
};

const buildVersionSummary = (snapshot) => {
    const safeTree = Array.isArray(snapshot?.treeData) ? snapshot.treeData : [];
    const stats = {
        totalNodes: 0,
        byType: { product: 0, phase: 0, module: 0, process: 0 },
        withResultCount: 0,
        resultValueTotal: 0,
        selectedNodeName: '-'
    };

    const findSelectedName = (nodes, targetId) => {
        for (const node of nodes) {
            if (String(node?.id) === String(targetId)) {
                return node?.name || '-';
            }
            if (Array.isArray(node?.children) && node.children.length > 0) {
                const nested = findSelectedName(node.children, targetId);
                if (nested) return nested;
            }
        }
        return null;
    };

    const walk = (nodes) => {
        nodes.forEach((node) => {
            stats.totalNodes += 1;
            const typeKey = String(node?.type || '').toLowerCase();
            if (Object.prototype.hasOwnProperty.call(stats.byType, typeKey)) {
                stats.byType[typeKey] += 1;
            }
            const value = Number(node?.value);
            if (!Number.isNaN(value)) {
                stats.withResultCount += 1;
                stats.resultValueTotal += value;
            }
            if (Array.isArray(node?.children) && node.children.length > 0) {
                walk(node.children);
            }
        });
    };

    walk(safeTree);
    const selectedName = findSelectedName(safeTree, snapshot?.selectedId);
    if (selectedName) {
        stats.selectedNodeName = selectedName;
    }

    return stats;
};

const getL3Label = (id) => {
    const map = {
        acct_basic: '基本信息',
        acct_model_config: '模型配置与结果',
        acct_calc: '计算与分析',
        acct_tools: '分析工具',
        acct_pers_activity: '活动数据',
        acct_pers_factor: '因子数据',
        rpt_info: '报告信息',
        rpt_export: '导出数值',
        rpt_voucher: '凭证管理',
        rpt_sheet: '计算表',
        app_cpcd: 'CPCD信息',
        cmp_list: '对比核算列表',
        cmp_config: '对比配置调整',
        cmp_detail: '对比标识详情',
        cmp_result: '对比分析结果'
    };
    return map[id] || '当前模块';
};

const EmptyVersionState = ({ text }) => (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
        <div className="text-base font-medium mb-1">暂无版本数据</div>
        <p className="text-sm">{text}</p>
    </div>
);

const AccountingPage = ({ activeL3, onL3Change }) => {
    const { setActions, setLayoutConfig, setBreadcrumbData } = usePagePresentation();
    const { activeMode } = useNavigation();
    const { activeModal, closeModal } = useViewActions();
    const { addNotification } = useNotification();
    const {
        projects,
        getProjectById,
        getAccountingVersions,
        saveAccountingVersion
    } = useData();
    const { businessTarget, openedTabs } = useAppNavigation();

    const activeProjectTab = openedTabs.find(
        (tab) => tab.id === businessTarget && tab.type === 'detail' && tab.l1Context === 'project_mgmt'
    );
    const fallbackProject = projects?.[0] || null;
    const activeProjectId = activeProjectTab?.data?.id || fallbackProject?.id || null;
    const activeProject = getProjectById(activeProjectId) || activeProjectTab?.data || fallbackProject;

    const versions = activeProject?.id ? getAccountingVersions(activeProject.id) : [];

    const [isPageLoading, setIsPageLoading] = useState(false);
    const [modelConfigSnapshot, setModelConfigSnapshot] = useState(buildDefaultModelSnapshot);
    const [versionTab, setVersionTab] = useState('list');
    const [baseVersionId, setBaseVersionId] = useState(null);
    const [compareVersionId, setCompareVersionId] = useState(null);
    const [pendingLatestVersionCount, setPendingLatestVersionCount] = useState(null);

    const baseVersion = versions.find((item) => item.id === baseVersionId) || null;
    const compareVersion = versions.find((item) => item.id === compareVersionId) || null;
    const baseSummary = baseVersion?.summary || buildVersionSummary(baseVersion?.snapshot);
    const compareSummary = compareVersion?.summary || buildVersionSummary(compareVersion?.snapshot);

    // Default Selection Logic
    useEffect(() => {
        if (!activeL3 && onL3Change) {
            onL3Change('acct_basic');
        }
    }, [activeL3, onL3Change]);

    // 版本列表变化时，维护基准/对比版本选择
    useEffect(() => {
        if (!versions.length) {
            setBaseVersionId(null);
            setCompareVersionId(null);
            setPendingLatestVersionCount(null);
            return;
        }
        if (pendingLatestVersionCount && versions.length >= pendingLatestVersionCount) {
            setBaseVersionId(versions[0].id);
            setPendingLatestVersionCount(null);
            return;
        }
        if (!baseVersionId || !versions.some((item) => item.id === baseVersionId)) {
            setBaseVersionId(versions[0].id);
        }
    }, [versions, baseVersionId, pendingLatestVersionCount]);

    useEffect(() => {
        if (!versions.length || !baseVersionId) {
            setCompareVersionId(null);
            return;
        }
        const candidates = versions.filter((item) => item.id !== baseVersionId);
        if (!candidates.length) {
            setCompareVersionId(null);
            return;
        }
        if (!compareVersionId || !candidates.some((item) => item.id === compareVersionId)) {
            setCompareVersionId(candidates[0].id);
        }
    }, [versions, baseVersionId, compareVersionId]);

    // 模拟加载效果
    useEffect(() => {
        if (activeMode !== 'version') {
            setIsPageLoading(true);
            const timeout = setTimeout(() => {
                setIsPageLoading(false);
            }, 300 + Math.random() * 300);
            return () => clearTimeout(timeout);
        }
    }, [activeL3, activeMode]);

    useEffect(() => {
        setLayoutConfig({ activeDimension: 'accounting', activeMode: activeMode || 'config' });

        setBreadcrumbData([
            { label: '核算', icon: null },
            { label: getL3Label(activeL3) }
        ]);

        return () => {
            setLayoutConfig('title-only');
            setBreadcrumbData([]);
        };
    }, [setLayoutConfig, setBreadcrumbData, activeMode, activeL3]);

    useEffect(() => {
        if (activeMode !== 'config') {
            setActions(null);
            return () => setActions(null);
        }

        const handleSaveVersion = () => {
            if (!activeProject?.id) {
                addNotification('当前未命中项目上下文，无法保存版本', 'warning');
                return;
            }
            const nextCode = `V${String(versions.length + 1).padStart(3, '0')}`;
            const snapshot = modelConfigSnapshot?.treeData?.length
                ? modelConfigSnapshot
                : buildDefaultModelSnapshot();
            const summary = buildVersionSummary(snapshot);

            saveAccountingVersion(activeProject.id, {
                versionCode: nextCode,
                name: nextCode,
                creator: 'Current User',
                sourceL3: activeL3 || 'acct_model_config',
                snapshot,
                summary
            });

            setVersionTab('list');
            setPendingLatestVersionCount(versions.length + 1);
            addNotification(`已保存为版本 ${nextCode}`, 'success');
        };

        setActions(
            <button
                type="button"
                onClick={handleSaveVersion}
                className="flex items-center gap-1.5 h-btn-md px-btn-x-md rounded-sm border border-slate-200 bg-white text-[13px] font-medium text-slate-600 hover:border-[#087F9C] hover:text-[#087F9C] hover:bg-cyan-50/40 transition-colors"
            >
                <IconDeviceFloppy size={14} />
                <span>保存为版本</span>
            </button>
        );

        return () => setActions(null);
    }, [setActions, activeMode, addNotification, activeProject, versions.length, modelConfigSnapshot, saveAccountingVersion, activeL3]);

    const renderL3Content = () => {
        switch (activeL3) {
            case 'acct_basic': return <AccountingBasic />;
            case 'acct_model_config':
                return (
                    <AccountingModelConfig
                        menuMode="config"
                        onSnapshotChange={setModelConfigSnapshot}
                    />
                );
            case 'acct_calc': return <ComingSoon title="计算与分析" />;
            case 'acct_tools': return <AccountingTools />;
            case 'acct_pers_activity': return <ActivityDataView />;
            case 'acct_pers_factor': return <FactorDataView />;
            case 'rpt_info': return <ReportInfo />;
            case 'rpt_export': return <ReportExport />;
            case 'rpt_voucher': return <ComingSoon title="凭证管理" />;
            case 'rpt_sheet': return <ComingSoon title="计算表" />;
            case 'app_cpcd': return <ComingSoon title="CPCD信息" />;
            case 'cmp_list': return <ComingSoon title="对比核算列表" />;
            case 'cmp_config': return <AccountingModelConfig menuMode="compare" />;
            case 'cmp_detail': return <ComingSoon title="对比标识详情" />;
            case 'cmp_result': return <ComingSoon title="对比分析结果" />;
            default: return <AccountingBasic />;
        }
    };

    const renderSnapshotTree = (nodes, level = 0) => (
        (nodes || []).map((node) => (
            <React.Fragment key={`${node.id}-${level}`}>
                <div
                    className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-slate-50"
                    style={{ paddingLeft: `${8 + level * 16}px` }}
                >
                    <span className="text-slate-700 text-sm truncate">{node.name || '未命名节点'}</span>
                    <span className="text-[11px] text-slate-400 uppercase">{node.type || '-'}</span>
                    <span className="ml-auto text-[11px] text-slate-400">{node.status || '-'}</span>
                </div>
                {Array.isArray(node.children) && node.children.length > 0
                    ? renderSnapshotTree(node.children, level + 1)
                    : null}
            </React.Fragment>
        ))
    );

    const renderVersionListTab = () => {
        if (!versions.length) {
            return <EmptyVersionState text="请先在配置模式点击“保存为版本”。" />;
        }

        return (
            <div className="flex-1 min-h-0 overflow-y-auto p-3">
                <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                            <tr>
                                <th className="text-left px-4 py-2.5">版本号</th>
                                <th className="text-left px-4 py-2.5">保存时间</th>
                                <th className="text-left px-4 py-2.5">来源页面</th>
                                <th className="text-left px-4 py-2.5">保存人</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {versions.map((version) => {
                                const isActive = version.id === baseVersionId;
                                return (
                                    <tr
                                        key={version.id}
                                        className={`cursor-pointer transition-colors ${isActive ? 'bg-cyan-50/60' : 'hover:bg-slate-50'}`}
                                        onClick={() => setBaseVersionId(version.id)}
                                    >
                                        <td className="px-4 py-2.5 font-medium text-slate-700">{version.versionCode || version.name}</td>
                                        <td className="px-4 py-2.5 text-slate-500">{formatDateTime(version.createTime)}</td>
                                        <td className="px-4 py-2.5 text-slate-500">{getL3Label(version.sourceL3)}</td>
                                        <td className="px-4 py-2.5 text-slate-500">{version.creator || '-'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderVersionDetailTab = () => {
        if (!baseVersion) {
            return <EmptyVersionState text="请先在“版本列表”中选择一个基准版本。" />;
        }

        return (
            <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-3">
                <div className="bg-white border border-slate-200 rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-800">版本信息</h3>
                        <span className="text-xs text-slate-400">{baseVersion.versionCode || baseVersion.name}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div className="text-slate-500">保存时间：<span className="text-slate-700">{formatDateTime(baseVersion.createTime)}</span></div>
                        <div className="text-slate-500">保存人：<span className="text-slate-700">{baseVersion.creator || '-'}</span></div>
                        <div className="text-slate-500">来源页面：<span className="text-slate-700">{getL3Label(baseVersion.sourceL3)}</span></div>
                        <div className="text-slate-500">选中节点：<span className="text-slate-700">{baseSummary.selectedNodeName || '-'}</span></div>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-md p-4">
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">版本摘要</h3>
                    <div className="grid grid-cols-4 gap-3 text-sm">
                        <div className="rounded border border-slate-200 p-2.5">
                            <div className="text-slate-400 text-xs">节点总数</div>
                            <div className="text-slate-800 font-semibold mt-1">{baseSummary.totalNodes || 0}</div>
                        </div>
                        <div className="rounded border border-slate-200 p-2.5">
                            <div className="text-slate-400 text-xs">过程节点</div>
                            <div className="text-slate-800 font-semibold mt-1">{baseSummary.byType?.process || 0}</div>
                        </div>
                        <div className="rounded border border-slate-200 p-2.5">
                            <div className="text-slate-400 text-xs">有结果节点</div>
                            <div className="text-slate-800 font-semibold mt-1">{baseSummary.withResultCount || 0}</div>
                        </div>
                        <div className="rounded border border-slate-200 p-2.5">
                            <div className="text-slate-400 text-xs">结果值合计</div>
                            <div className="text-slate-800 font-semibold mt-1">{(baseSummary.resultValueTotal || 0).toFixed(2)}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-md p-4">
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">配置结构快照</h3>
                    <div className="border border-slate-100 rounded-md py-2 max-h-[420px] overflow-y-auto">
                        {renderSnapshotTree(baseVersion?.snapshot?.treeData || [])}
                    </div>
                </div>
            </div>
        );
    };

    const renderVersionCompareTab = () => {
        if (versions.length < 2) {
            return <EmptyVersionState text="至少保存两个版本后才可进行版本对比。" />;
        }

        const diffNodeTotal = (compareSummary.totalNodes || 0) - (baseSummary.totalNodes || 0);
        const diffProcess = (compareSummary.byType?.process || 0) - (baseSummary.byType?.process || 0);
        const diffResultNodes = (compareSummary.withResultCount || 0) - (baseSummary.withResultCount || 0);
        const diffResultTotal = (compareSummary.resultValueTotal || 0) - (baseSummary.resultValueTotal || 0);

        return (
            <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-3">
                <div className="bg-white border border-slate-200 rounded-md p-4">
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">版本选择</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <label className="text-sm text-slate-500">
                            基准版本
                            <select
                                className="mt-1 w-full border border-slate-200 rounded-md h-9 px-2 text-slate-700"
                                value={baseVersionId || ''}
                                onChange={(e) => setBaseVersionId(e.target.value)}
                            >
                                {versions.map((version) => (
                                    <option key={version.id} value={version.id}>
                                        {(version.versionCode || version.name)} - {formatDateTime(version.createTime)}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="text-sm text-slate-500">
                            对比版本
                            <select
                                className="mt-1 w-full border border-slate-200 rounded-md h-9 px-2 text-slate-700"
                                value={compareVersionId || ''}
                                onChange={(e) => setCompareVersionId(e.target.value)}
                            >
                                {versions.filter((item) => item.id !== baseVersionId).map((version) => (
                                    <option key={version.id} value={version.id}>
                                        {(version.versionCode || version.name)} - {formatDateTime(version.createTime)}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>

                {!baseVersion || !compareVersion ? (
                    <EmptyVersionState text="请选择完整的基准版本和对比版本。" />
                ) : (
                    <React.Fragment>
                        <div className="bg-white border border-slate-200 rounded-md p-4">
                            <h3 className="text-sm font-semibold text-slate-800 mb-3">差异摘要（对比版本 - 基准版本）</h3>
                            <div className="grid grid-cols-4 gap-3 text-sm">
                                <div className="rounded border border-slate-200 p-2.5">
                                    <div className="text-slate-400 text-xs">节点总数差异</div>
                                    <div className="text-slate-800 font-semibold mt-1">{diffNodeTotal}</div>
                                </div>
                                <div className="rounded border border-slate-200 p-2.5">
                                    <div className="text-slate-400 text-xs">过程节点差异</div>
                                    <div className="text-slate-800 font-semibold mt-1">{diffProcess}</div>
                                </div>
                                <div className="rounded border border-slate-200 p-2.5">
                                    <div className="text-slate-400 text-xs">有结果节点差异</div>
                                    <div className="text-slate-800 font-semibold mt-1">{diffResultNodes}</div>
                                </div>
                                <div className="rounded border border-slate-200 p-2.5">
                                    <div className="text-slate-400 text-xs">结果值合计差异</div>
                                    <div className="text-slate-800 font-semibold mt-1">{diffResultTotal.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-md p-4">
                            <h3 className="text-sm font-semibold text-slate-800 mb-3">版本信息对照</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="rounded border border-slate-200 p-3">
                                    <div className="text-slate-400 text-xs mb-1">基准版本</div>
                                    <div className="font-medium text-slate-800">{baseVersion.versionCode || baseVersion.name}</div>
                                    <div className="text-slate-500 mt-1">时间：{formatDateTime(baseVersion.createTime)}</div>
                                    <div className="text-slate-500 mt-1">选中节点：{baseSummary.selectedNodeName || '-'}</div>
                                </div>
                                <div className="rounded border border-slate-200 p-3">
                                    <div className="text-slate-400 text-xs mb-1">对比版本</div>
                                    <div className="font-medium text-slate-800">{compareVersion.versionCode || compareVersion.name}</div>
                                    <div className="text-slate-500 mt-1">时间：{formatDateTime(compareVersion.createTime)}</div>
                                    <div className="text-slate-500 mt-1">选中节点：{compareSummary.selectedNodeName || '-'}</div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    };

    const renderVersionModeContent = () => (
        <div className="flex-1 min-h-0 flex flex-col bg-[#F5F6F8]">
            <div className="h-11 px-3 bg-white border-b border-slate-200 flex items-center gap-2">
                {VERSION_TABS.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setVersionTab(item.id)}
                        className={`h-8 px-3 rounded-md text-sm transition-colors ${versionTab === item.id
                                ? 'bg-cyan-50 text-[#087F9C] border border-cyan-200'
                                : 'text-slate-500 hover:bg-slate-100'
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {versionTab === 'list' && renderVersionListTab()}
            {versionTab === 'detail' && renderVersionDetailTab()}
            {versionTab === 'compare' && renderVersionCompareTab()}
        </div>
    );

    const isVersionMode = activeMode === 'version';

    return (
        <div className="w-full h-full min-h-0 min-w-0 flex flex-row relative overflow-hidden">
            {!isVersionMode && (
                <L3Sidebar activeL2="accounting" activeL3={activeL3 || 'acct_basic'} onSelect={onL3Change} />
            )}

            <main className="flex-1 min-h-0 min-w-0 bg-[#F5F6F8] relative flex flex-col overflow-hidden">
                {isVersionMode ? (
                    renderVersionModeContent()
                ) : (
                    <React.Fragment>
                        {isPageLoading ? (
                            <div className="flex-1 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-10 transition-all duration-300">
                                <div className="flex flex-col items-center gap-3 p-6 rounded-md">
                                    <IconLoader2 className="animate-spin text-[#087F9C]" size={36} stroke={1.5} />
                                    <span className="text-sm font-medium text-gray-500 animate-pulse">数据加载中...</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 min-h-0 flex flex-col overflow-hidden animate-in fade-in duration-500">
                                {renderL3Content()}
                            </div>
                        )}
                    </React.Fragment>
                )}

                <InnerDrawer
                    isOpen={activeModal?.id === 'acct_methodology'}
                    onClose={closeModal}
                    title="方法学设置"
                >
                    <div className="p-4">
                        <h3 className="font-medium mb-2">选择核算标准</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                <input type="radio" name="method" defaultChecked />
                                <span>ISO 14067 (产品碳足迹)</span>
                            </label>
                            <label className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                <input type="radio" name="method" />
                                <span>GHG Protocol Product Standard</span>
                            </label>
                        </div>
                    </div>
                </InnerDrawer>

                <InnerDrawer
                    isOpen={activeModal?.id === 'acct_overview'}
                    onClose={closeModal}
                    title="核算概览"
                >
                    <div className="p-4">
                        <div className="bg-blue-50 p-4 rounded text-blue-800 text-sm">
                            这里展示当前核算任务的进度、关键指标概览图表。
                        </div>
                    </div>
                </InnerDrawer>
            </main>
        </div>
    );
};

export default AccountingPage;
