import React from 'react';
import {
    L3Header, HintSection, EmptyState, EmissionDetail,
    ConfigParams, VarInfo, ImportantIssues
} from './L3Bricks';

const getNextLevel = (type) => ({ product: 'phase', phase: 'module', module: 'process' }[type]);

export const L3DetailPanel = ({ node, context = 'config' }) => {
    if (!node) return (
        <div className="h-full flex items-center justify-center text-sm text-gray-300 bg-gray-50/50">请选择节点</div>
    );

    const isCompare = context === 'compare';
    const isCompleted = node.status === 'completed' || node.subType === 'whole_ref';

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            {/* 1. 头部 - 仅完成态显示结果 */}
            <L3Header node={node} showResult={isCompleted} />

            {/* 2. 提示区 - 完成态隐藏 */}
            {!isCompleted && (
                <div className="px-6 pt-4 shrink-0">
                    <HintSection hints={node.hints || ['请完善基础信息以完成核算']} />
                </div>
            )}

            {/* 3. 内容滚动区 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

                {/* 分支 A: 聚合视图 (Product/Phase/Module) */}
                {['product', 'phase', 'module'].includes(node.type) && (
                    node.hasData ? (
                        <>
                            <EmissionDetail showChart={node.type === 'product'} />
                            {node.type === 'module' && <ImportantIssues />}
                        </>
                    ) : (
                        <EmptyState type={`add_${getNextLevel(node.type)}`} />
                    )
                )}

                {/* 分支 B: 过程视图 (Process) */}
                {node.type === 'process' && (
                    <>
                        <ConfigParams
                            node={node}
                            subType={node.subType || 'normal'}
                            mode={isCompleted ? 'read' : 'edit'}
                            compareMode={isCompare}
                        />
                        <VarInfo compareMode={isCompare} />

                        {/* 规则：完成态显示分析区，但拆分引用除外 */}
                        {isCompleted && node.subType !== 'split_ref' && (
                            <div className="pt-4 border-t border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900 mb-3">核算分析</h3>
                                <div className="h-32 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center text-xs text-gray-400">
                                    分析图表组件载入中...
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};