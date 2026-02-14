import React from 'react';
import {
  IconAlertTriangle,
  IconCheck,
  IconCircleOff,
  IconListDetails,
  IconTable,
  IconSettings,
  IconVariable,
  IconChartBar,
  IconShieldLock,
  IconSparkles,
  IconPlus
} from '@tabler/icons-react';
import { ModuleHeader } from '../../../common/ContentModule';
import {
  NODE_STATUSES,
  NODE_TYPES,
  PROCESS_SUB_TYPES,
  getSummaryTabs
} from '../modelRules';

const getTypeLabel = (type) => {
  if (type === NODE_TYPES.PRODUCT) return '核算产品';
  if (type === NODE_TYPES.PHASE) return '阶段';
  if (type === NODE_TYPES.MODULE) return '模块';
  return '过程';
};

const getStatusLabel = (status) => {
  if (status === NODE_STATUSES.EXCLUDED) return '已排除';
  if (status === NODE_STATUSES.SCREENED) return '已屏蔽';
  if (status === NODE_STATUSES.ADDED) return '新增';
  if (status === NODE_STATUSES.DELETED) return '已删除';
  if (status === NODE_STATUSES.MODIFIED) return '已变更';
  return '常规';
};

export const HeaderModule = ({ node, isConfigured }) => {
  const resultText = isConfigured ? `${(node.value ?? 0).toFixed ? (node.value ?? 0).toFixed(2) : (node.value ?? 0)} kgCO2e` : '配置中';
  const tagTone = node.origin === 'self' ? 'bg-cyan-50 text-cyan-700' : 'bg-violet-50 text-violet-700';

  return (
    <section className="rounded-sm border border-slate-200 bg-white shadow-sm">
      <ModuleHeader
        title={`${getTypeLabel(node.type)}信息`}
        icon={IconListDetails}
        actions={
          <div className="flex items-center gap-2">
            <span className={`rounded px-2 py-0.5 text-[10px] font-semibold ${tagTone}`}>
              {node.origin === 'self' ? '自建' : '继承'}
            </span>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">{getStatusLabel(node.status)}</span>
          </div>
        }
      />
      <div className="grid grid-cols-3 gap-3 p-4 text-xs">
        <div className="rounded border border-slate-200 bg-white px-3 py-2">
          <div className="text-slate-400">名称</div>
          <div className="mt-1 font-semibold text-slate-900">{node.name}</div>
        </div>
        <div className="rounded border border-slate-200 bg-white px-3 py-2">
          <div className="text-slate-400">节点类型</div>
          <div className="mt-1 font-semibold text-slate-900">{getTypeLabel(node.type)}</div>
        </div>
        <div className="rounded border border-slate-200 bg-white px-3 py-2">
          <div className="text-slate-400">单位评估结果</div>
          <div className="mt-1 font-semibold text-slate-900">{resultText}</div>
        </div>
      </div>
    </section>
  );
};

export const HintModule = ({ show, message }) => {
  if (!show) return null;
  return (
    <section className="rounded-sm border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start gap-3 p-4">
        <IconAlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
        <div className="text-xs leading-5 text-amber-800">{message}</div>
      </div>
    </section>
  );
};

export const ScreenedNoticeModule = ({ node }) => {
  if (node.status !== NODE_STATUSES.SCREENED) return null;
  return (
    <section className="rounded-sm border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 p-4 text-xs text-slate-600">
        <IconCircleOff className="h-4 w-4 text-slate-500" />
        当前节点为“已屏蔽”状态，展示仅供参考，不参与计算。
      </div>
    </section>
  );
};

export const EmissionDetailModule = ({ node, isConfigured }) => {
  const tabs = getSummaryTabs(node.type);
  const addLabel =
    node.type === NODE_TYPES.PRODUCT ? '添加阶段节点' :
      node.type === NODE_TYPES.PHASE ? '添加模块节点' :
        '添加过程节点';

  return (
    <section className="rounded-sm border border-slate-200 bg-white shadow-sm">
      <ModuleHeader title="排放详情" icon={IconTable} />
      <div className="p-4">
        {isConfigured ? (
          <>
            {tabs.length > 0 && (
              <div className="mb-3 flex items-center gap-2">
                {tabs.map((tab) => (
                  <span key={tab} className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] text-slate-600">
                    {tab}
                  </span>
                ))}
              </div>
            )}
            <div className="overflow-hidden rounded-md border border-slate-200">
              <div className="grid grid-cols-3 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
                <span>名称</span>
                <span>状态</span>
                <span className="text-right">排放占比</span>
              </div>
              <div className="grid grid-cols-3 px-3 py-2 text-xs text-slate-700">
                <span className="truncate">{node.name}</span>
                <span>{getStatusLabel(node.status)}</span>
                <span className="text-right">{node.value != null ? `${Number(node.value).toFixed(2)}%` : '--%'}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50/70 p-5 text-center">
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
              <IconPlus className="h-4 w-4 text-slate-500" />
            </div>
            <div className="text-xs text-slate-600">暂无可展示结果，先完善配置后可查看明细。</div>
            <button className="mt-3 rounded border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] text-cyan-700">
              {addLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export const ConfigParamsModule = ({ node, isConfigured, readOnly }) => {
  const isSplit = node.subType === PROCESS_SUB_TYPES.SPLIT_REF;
  const showFormula = node.subType === PROCESS_SUB_TYPES.WHOLE_REF || isSplit || isConfigured;

  return (
    <section className="rounded-sm border border-slate-200 bg-white shadow-sm">
      <ModuleHeader
        title="配置参数"
        icon={IconSettings}
        actions={readOnly ? <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600"><IconShieldLock size={12} /> 继承锁定</span> : null}
      />
      <div className="space-y-3 p-4 text-xs">
        <div className="rounded border border-slate-200 bg-white px-3 py-2">
          <div className="text-slate-400">元件</div>
          <div className="mt-1 text-slate-700">CLCD-电力-2024</div>
        </div>
        {showFormula && (
          <div className="rounded border border-slate-200 bg-white px-3 py-2">
            <div className="text-slate-400">公式</div>
            <div className="mt-1 font-mono text-slate-700">Activity_Data * Emission_Factor</div>
          </div>
        )}
        {isConfigured && (
          <div className="rounded border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
            公式详情：来源于当前模型配置版本，可追溯。
          </div>
        )}
      </div>
    </section>
  );
};

export const VariableInfoModule = ({ node, isConfigured }) => {
  const isSplit = node.subType === PROCESS_SUB_TYPES.SPLIT_REF;
  const isWhole = node.subType === PROCESS_SUB_TYPES.WHOLE_REF;

  const renderFactorBody = () => {
    if (!isConfigured && !isWhole) {
      return <div className="rounded border border-dashed border-slate-300 bg-slate-50 p-3 text-xs text-slate-500">变量信息为空，等待输入活动数据。</div>;
    }
    if (isSplit) {
      return <div className="rounded border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700">排放因子：被拆分（按拆分规则映射）。</div>;
    }
    return (
      <div className="rounded border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700">
        因子数据：0.756 kgCO2e/kWh，不确定性：A 级
      </div>
    );
  };

  const factorTitle = isWhole ? '输出产品' : '排放因子';

  return (
    <>
      <section className="rounded-sm border border-slate-200 bg-white shadow-sm">
        <ModuleHeader title={factorTitle} icon={IconVariable} />
        <div className="p-4">{renderFactorBody()}</div>
      </section>

      <section className="rounded-sm border border-slate-200 bg-white shadow-sm">
        <ModuleHeader title="活动数据" icon={IconVariable} />
        <div className="p-4">
          {isConfigured || isWhole ? (
            <div className="space-y-2 rounded border border-slate-200 bg-white p-3 text-xs text-slate-700">
              <div>数据记录：2026-02 / 12890.24 kWh</div>
              <div>分配规则：按物理量分配 100%</div>
              <div>不确定性：B 级</div>
            </div>
          ) : (
            <div className="rounded border border-dashed border-slate-300 bg-slate-50 p-3 text-xs text-slate-500">活动数据暂未配置。</div>
          )}
        </div>
      </section>
    </>
  );
};

export const AnalysisResultModule = ({ show }) => {
  if (!show) return null;
  return (
    <section className="rounded-sm border border-slate-200 bg-white shadow-sm">
      <ModuleHeader title="分析结果" icon={IconChartBar} />
      <div className="grid grid-cols-3 gap-3 p-4 text-xs">
        <div className="rounded border border-slate-200 bg-white px-3 py-2">
          <div className="text-slate-400">是否排除</div>
          <div className="mt-1 text-slate-700">否</div>
        </div>
        <div className="rounded border border-slate-200 bg-white px-3 py-2">
          <div className="text-slate-400">敏感性分析</div>
          <div className="mt-1 text-slate-700">已启用</div>
        </div>
        <div className="rounded border border-slate-200 bg-white px-3 py-2">
          <div className="text-slate-400">数据质量评分</div>
          <div className="mt-1 text-slate-700">2.1 (优)</div>
        </div>
      </div>
    </section>
  );
};

export const ImportantIssueModule = ({ show }) => {
  if (!show) return null;
  return (
    <section className="rounded-sm border border-slate-200 bg-white shadow-sm">
      <ModuleHeader title="重要问题识别" icon={IconSparkles} />
      <div className="p-4 text-xs text-slate-600">
        当前模块已完成配置，可开启“重要问题识别”进行高贡献过程诊断与标记。
      </div>
    </section>
  );
};

export const EmptySelectionModule = () => (
  <section className="rounded-sm border border-slate-200 bg-white shadow-sm">
    <div className="p-8 text-center text-xs text-slate-500">请选择左侧节点查看详情。</div>
  </section>
);

export const CompleteBadge = ({ show }) => {
  if (!show) return null;
  return (
    <section className="rounded-sm border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 p-3 text-xs text-emerald-700">
        <IconCheck size={16} />
        节点已配置完成，展示结果和分析模块。
      </div>
    </section>
  );
};
