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
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar gap-3">
            {/* 1. 头部卡片 */}
            <L3Header node={node} showResult={isCompleted} />

            {/* 2. 提示卡片 */}
            {!isCompleted && (
                <HintSection hints={node.hints || ['请完善基础信息以完成核算']} />
            )}

            {/* 3. 核心内容卡片栈 */}
            {/* 分支 A: 聚合视图 */}
            {['product', 'phase', 'module'].includes(node.type) && (
                node.hasData ? (
                    <>
                        <EmissionDetail showChart={node.type === 'product'} />
                        {node.type === 'module' && <ImportantIssues />}
                    </>
                ) : (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <EmptyState type={`add_${getNextLevel(node.type)}`} />
                    </div>
                )
            )}

            {/* 分支 B: 过程视图 */}
            {node.type === 'process' && (
                <>
                    <ConfigParams
                        node={node}
                        subType={node.subType || 'normal'}
                        mode={isCompleted ? 'read' : 'edit'}
                        compareMode={isCompare}
                    />
                    <VarInfo compareMode={isCompare} />

                    {isCompleted && node.subType !== 'split_ref' && (
                        <div className="bg-white rounded-lg p-6 shadow-sm space-y-4 transition-all">
                            <h3 className="text-sm font-bold text-gray-900">核算分析</h3>
                            <div className="h-32 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center text-xs text-gray-400">
                                分析图表组件载入中...
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};