import React from 'react';
import {
  IconInfoCircle,
  IconAlertTriangle,
  IconCheck,
  IconPlus,
  IconDots,
  IconChevronRight,
  IconArrowRight
} from '@tabler/icons-react';

/**
 * Brick 1: HeaderBrick (通用头部)
 * UI: 图标 + 名称 + 面包屑 + 右侧操作按钮
 */
export const HeaderBrick = ({ node }) => {
  // 简易面包屑逻辑：核算产品 / 阶段名 / 模块名
  const breadcrumbs = ['核算产品', node.parentName || '所属阶段'].filter(Boolean);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="p-2 bg-gray-50 text-gray-400 rounded-lg shrink-0">
          <IconInfoCircle className="w-5 h-5" />
        </div>
        <div className="overflow-hidden">
          <div className="flex items-center gap-1 text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <span className="truncate max-w-[80px]">{b}</span>
                {i < breadcrumbs.length - 1 && <IconChevronRight className="w-2.5 h-2.5 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
          <h2 className="text-base font-bold text-gray-900 truncate">{node.name}</h2>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-4">
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${node.origin === 'self' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
          }`}>
          {node.origin === 'self' ? '自建' : '继承'}
        </div>
        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400">
          <IconDots className="w-4 h-4" />
        </button>
        <button className="px-4 py-1.5 text-sm bg-[#087F9C] text-white rounded hover:bg-[#066a82] font-bold transition-all shadow-sm">
          保存
        </button>
      </div>
    </div>
  );
};

/**
 * Brick 2: StateBrick (状态提示区)
 * 互斥：HintBox (配置中) vs ResultCard (已完成)
 */
export const StateBrick = ({ status, resultValue, unit = 'kgCO₂e' }) => {
  if (status === 'done') {
    return (
      <div className="mx-6 mt-6 p-5 bg-[#087F9C]/5 border border-[#087F9C]/10 rounded-xl flex justify-between items-center group hover:bg-[#087F9C]/10 transition-all">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#087F9C] text-white rounded-full shadow-lg shadow-[#087F9C]/20">
            <IconCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-[#087F9C] uppercase font-bold tracking-widest mb-1">单位评估结果</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-mono font-bold text-gray-900 leading-none">{resultValue || '0.00'}</span>
              <span className="text-sm text-gray-500 font-medium">{unit}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">数据质量 (DQR)</div>
          <div className="text-sm font-bold text-gray-700">2.1 (优)</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-6 mt-6 p-4 bg-amber-50 border border-amber-100 rounded-lg flex gap-3 animate-pulse-subtle">
      <IconAlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      <div className="text-sm text-amber-800 leading-relaxed font-medium">
        当前节点尚未配置完成，计算结果暂时不可用。请在下方完善计算参数与活动数据。
      </div>
    </div>
  );
};

/**
 * Brick 3: ConfigBrick (配置参数)
 * 权限逻辑：Inherited = ReadOnly
 */
export const ConfigBrick = ({ node, readOnly }) => (
  <div className="px-6 py-8 border-b border-gray-50">
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
        计算配置 (Logic)
        {readOnly && <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-[10px] font-normal rounded">继承锁定</span>}
      </h3>
    </div>

    <div className={`space-y-5 ${readOnly ? 'opacity-60 grayscale' : ''}`}>
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">计算模型 / 公式</label>
        <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm text-gray-600 flex items-center justify-between">
          <span>Activity_Data * Emission_Factor</span>
          {!readOnly && <IconPencil className="w-3.5 h-3.5 text-gray-300" />}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">分配方式</label>
          <div className="h-10 px-3 bg-white border border-gray-200 rounded-lg flex items-center text-sm text-gray-700">
            按物理量分配 (Physical)
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">分配比例 (%)</label>
          <div className="h-10 px-3 bg-white border border-gray-200 rounded-lg flex items-center text-sm font-mono text-gray-700">
            100.00
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Brick 4: VariableBrick (变量输入)
 * 权限：始终可编辑（Inherited 修改后变 status=modified）
 */
export const VariableBrick = ({ node }) => (
  <div className="px-6 py-8">
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-sm font-bold text-gray-900">活动数据 (Activity Data)</h3>
      <button className="text-[10px] text-[#087F9C] font-bold hover:underline">批量导入</button>
    </div>

    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-8 space-y-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">输入数值</label>
        <div className="relative group">
          <input
            type="number"
            className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-base font-mono focus:border-[#087F9C] focus:ring-4 focus:ring-[#087F9C]/5 outline-none transition-all placeholder:text-gray-200"
            placeholder="0.0000"
            defaultValue={node.value}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 group-focus-within:text-[#087F9C] transition-colors">
            kWh
          </div>
        </div>
      </div>
      <div className="col-span-4 space-y-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">单位</label>
        <div className="h-11 px-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center text-sm text-gray-500 font-medium">
          kWh
        </div>
      </div>
    </div>

    <div className="mt-6 p-4 border border-dashed border-gray-100 rounded-xl bg-gray-50/30">
      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">绑定排放因子 / 数据源</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white border border-gray-100 rounded flex items-center justify-center text-blue-500 shadow-sm">
            <IconArrowRight className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-700">CLCD-电力-2024</div>
            <div className="text-[10px] text-gray-400">来源: 公有库 / 分类: 能源</div>
          </div>
        </div>
        <button className="text-xs text-[#087F9C] border border-[#087F9C]/20 px-2 py-1 rounded hover:bg-[#087F9C]/5 transition-all">更换</button>
      </div>
    </div>
  </div>
);

/**
 * Brick 5: EmptyBrick (空状态)
 */
export const EmptyBrick = () => (
  <div className="h-full flex flex-col items-center justify-center bg-gray-50/50 p-10 text-center">
    <div className="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-gray-200/50 flex items-center justify-center text-gray-100 mb-6">
      <IconArrowRight className="w-8 h-8 opacity-20" />
    </div>
    <h3 className="text-base font-bold text-gray-400 mb-1">未选中有效节点</h3>
    <p className="text-xs text-gray-300 max-w-[200px] leading-relaxed">请在左侧核算树中选择一个阶段、模块或过程来查看具体的核算参数与结果。</p>
  </div>
);

/**
 * Brick 6: AnalysisBrick (分析模块 - 仅 Done 时可见)
 */
export const AnalysisBrick = () => (
  <div className="px-6 py-8 border-t border-gray-50 bg-gray-50/20">
    <h3 className="text-sm font-bold text-gray-900 mb-5">敏感性分析 (Sensitivity)</h3>
    <div className="h-32 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest font-bold">
      Chart Component Placeholder
    </div>
  </div>
);