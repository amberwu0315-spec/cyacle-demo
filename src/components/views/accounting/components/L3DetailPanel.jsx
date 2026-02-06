import React from 'react';
import {
    HeaderBrick,
    StateBrick,
    ConfigBrick,
    VariableBrick,
    EmptyBrick,
    AnalysisBrick
} from './L3Bricks';

/**
 * L3DetailPanel (Container-Bricks Pattern)
 * 核心逻辑：
 * 1. 路由判断 (Product/Phase/Module/Process)
 * 2. 状态映射 (Pending/Done)
 * 3. 权限控制 (Self/Inherited)
 */
export const L3DetailPanel = ({ node }) => {
    // 1. 防御性检查：无选中节点
    if (!node) return <EmptyBrick />;

    // 2. 核心状态计算 (The Brain)
    const isProcess = node.type === 'process';
    const isDone = node.calc_status === 'done' || node.status === 'completed';
    const isInherited = node.origin === 'inherited';
    const isScreened = node.status === 'screened';

    // 3. 特殊路由：屏蔽状态 (Screened)
    if (isScreened) {
        return (
            <div className="flex flex-col h-full bg-white overflow-hidden shadow-2xl shadow-gray-200/50 rounded-2xl border border-gray-100">
                <HeaderBrick node={node} />
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/30 p-10 text-center animate-fade-in">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-300 mb-4 scale-95 opacity-50">
                        {/* 占位图标 */}
                        <div className="w-8 h-1 bg-current rounded-full" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-400">核算已屏蔽</h3>
                    <p className="text-[11px] text-gray-300 mt-1 max-w-[180px]">此节点已在当前核算版本中被排除，不参与任何排放量计算。</p>
                </div>
            </div>
        );
    }

    // 4. 标准多态路由
    return (
        <div className="flex flex-col h-full bg-white overflow-hidden shadow-2xl shadow-gray-200/50 rounded-2xl border border-gray-100">
            {/* A. 通用头部积木 */}
            <HeaderBrick node={node} />

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                {/* 分支 1: 过程节点 (核心业务输入区) */}
                {isProcess && (
                    <div className="animate-slide-up">
                        {/* 状态积木：显示 HintBox 或 ResultCard */}
                        <StateBrick
                            status={node.calc_status}
                            resultValue={node.value}
                            unit={node.unit}
                        />

                        {/* 配置参数积木：如果是继承节点，则强制只读 */}
                        <ConfigBrick
                            node={node}
                            readOnly={isInherited}
                        />

                        {/* 变量输入积木：始终可编辑（继承节点修改后触发 modified 状态） */}
                        <VariableBrick
                            node={node}
                        />

                        {/* 分析积木：仅在渲染“已完成”状态时显示 */}
                        {isDone && <AnalysisBrick />}
                    </div>
                )}

                {/* 分支 2: 汇总节点 (聚合视图) */}
                {!isProcess && (
                    <div className="px-6 py-8 space-y-8 animate-fade-in">
                        {/* 结果汇总 (简易) */}
                        {isDone && (
                            <StateBrick
                                status="done"
                                resultValue={node.value}
                                unit={node.unit}
                            />
                        )}

                        <div className="p-10 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50 text-center space-y-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm mx-auto flex items-center justify-center text-[#087F9C] opacity-40">
                                <div className="w-6 h-1 bg-current rounded-full" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-400">汇总分析概览</h4>
                                <p className="text-[11px] text-gray-300 mt-1">
                                    此处显示针对 {node.type === 'product' ? '终端产品' : node.type === 'phase' ? '生命周期阶段' : '功能模块'} 的多维度贡献度分析与明细列表数据。
                                </p>
                            </div>
                            <div className="flex gap-2 justify-center">
                                <div className="w-16 h-1.5 bg-gray-100 rounded-full" />
                                <div className="w-8 h-1.5 bg-[#087F9C]/10 rounded-full" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};