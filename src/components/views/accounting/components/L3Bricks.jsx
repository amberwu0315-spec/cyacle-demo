import {
  IconInfoCircle,
  IconPencil,
  IconAlertTriangle,
  IconArrowRight,
  IconExternalLink
} from '@tabler/icons-react';


// [M01] 动态头部
export const L3Header = ({ node, showResult }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm flex items-start justify-between shrink-0 transition-all overflow-hidden">
    <div className="flex gap-3">
      <div className="p-2 bg-[#087F9C]/10 text-[#087F9C] rounded-lg">
        <IconInfoCircle className="w-5 h-5" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-900">{node.name}</h2>
        {showResult && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-mono font-semibold text-gray-900">{node.value || '0.00'}</span>
            <span className="text-xs text-gray-500">{node.unit || 'kgCO₂e'}</span>
            {node.uncertainty && (
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded font-mono">
                {node.uncertainty}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
    <div className="flex gap-2">
      <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 border rounded-lg transition-colors">重置</button>
      <button className="px-4 py-1.5 text-sm bg-[#087F9C] text-white hover:bg-[#066a82] rounded-lg shadow-sm transition-colors">保存</button>
    </div>
  </div>
);

// [M02] 提示区
export const HintSection = ({ hints = [] }) => (
  <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100/50 flex gap-3 shadow-sm">
    <IconInfoCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
    <div className="text-sm text-blue-800 space-y-1">
      {hints.map((h, i) => <p key={i} className="leading-relaxed opacity-90">{h}</p>)}
    </div>
  </div>
);

// [M03] 配置参数区 (多态)
export const ConfigParams = ({ node, subType, mode, compareMode }) => {
  const isRead = mode === 'read';
  const borderClass = compareMode ? 'border-orange-200 bg-orange-50/30' : 'border-gray-100 bg-white';

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm space-y-4 transition-all overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className={`text-sm font-bold ${compareMode ? 'text-orange-600' : 'text-[#087F9C]'}`}>配置参数</h3>
        {isRead && <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><IconPencil className="w-3.5 h-3.5" /></button>}
      </div>

      <div className={`p-5 border rounded-lg shadow-sm ${borderClass} transition-all`}>
        {/* 常规类型 */}
        {subType === 'normal' && (
          isRead ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold text-gray-900">{node.activityLevel || '0.00'}</span>
              <span className="text-sm text-gray-500">{node.activityUnit || '单位'}</span>
            </div>
          ) : (
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">活动水平</label>
                <input type="number" className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#087F9C]/20 focus:border-[#087F9C] outline-none transition-all" defaultValue={node.activityLevel} />
              </div>
              <div className="w-32 space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">单位</label>
                <div className="h-10 px-3 flex items-center bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-600">{node.activityUnit}</div>
              </div>
            </div>
          )
        )}

        {/* 拆分引用 */}
        {subType === 'split_ref' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">分配方式</label>
              <select className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-white outline-none" disabled={isRead}>
                <option>按质量分配 (Mass)</option>
                <option>按经济价值分配 (Economic)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">分配系数 (%)</label>
              <input type="number" className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm outline-none" defaultValue="100" disabled={isRead} />
            </div>
          </div>
        )}

        {/* 整体引用 */}
        {subType === 'whole_ref' && (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <IconExternalLink className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-gray-900">数据源：{node.sourceName || '默认数据库'}</div>
              <div className="text-xs text-gray-500 mt-0.5">版本: {node.sourceVersion || 'v1.0'}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// [M04] 变量信息
export const VarInfo = ({ compareMode }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm space-y-4 transition-all overflow-hidden">
    <h3 className="text-sm font-bold text-gray-900">变量信息 (Flows)</h3>
    <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
      <div className="grid grid-cols-12 bg-gray-50/80 px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
        <div className="col-span-6">流名称</div>
        <div className="col-span-3 text-right">数值</div>
        <div className="col-span-3 text-right">DQR</div>
      </div>
      <div className="divide-y divide-gray-50">
        {[1, 2].map(i => (
          <div key={i} className="grid grid-cols-12 px-4 py-3 text-sm hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="col-span-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span className="text-gray-700 truncate group-hover:text-[#087F9C]">电力 (Electricity)</span>
            </div>
            <div className="col-span-3 text-right font-mono text-gray-900">12.5 kWh</div>
            <div className="col-span-3 text-right text-xs text-gray-400">2.1</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// [M05] 重要问题
export const ImportantIssues = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm transition-all overflow-hidden">
    <div className="p-4 bg-red-50/50 border border-red-100 rounded-lg flex gap-3">
      <IconAlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
      <div className="text-sm text-red-900 font-medium">关键排放过程数据缺失，评估结果存在高度不确定性。</div>
    </div>
  </div>
);

// [M06] 排放详情
export const EmissionDetail = ({ showChart }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm space-y-6 transition-all overflow-hidden">
    <div className="flex gap-6 border-b border-gray-100">
      {['全部子项', '贡献排行'].map((t, i) => (
        <button key={i} className={`pb-3 text-sm font-bold transition-all ${i === 0 ? 'text-[#087F9C] border-b-2 border-[#087F9C]' : 'text-gray-400 hover:text-gray-600'}`}>
          {t}
        </button>
      ))}
    </div>
    {showChart && (
      <div className="h-40 bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400">
        环形图展示区域 (Top 10)
      </div>
    )}
    <div className="text-sm text-gray-400 text-center py-8 bg-gray-50/30 rounded-lg border border-gray-100">
      列表数据加载中...
    </div>
  </div>
);

// [M07] 空状态
export const EmptyState = ({ type }) => (
  <div className="py-16 flex flex-col items-center text-center space-y-4 bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-100">
    <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-300">
      <IconArrowRight className="w-6 h-6" />
    </div>
    <div className="space-y-1">
      <p className="text-sm font-bold text-gray-900">暂无子项内容</p>
      <p className="text-xs text-gray-400">请先在左侧树中添加{type === 'add_phase' ? '阶段' : '模块'}</p>
    </div>
    <button className="px-4 py-2 bg-white border border-gray-200 text-sm font-bold text-[#087F9C] rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
      快速添加
    </button>
  </div>
);