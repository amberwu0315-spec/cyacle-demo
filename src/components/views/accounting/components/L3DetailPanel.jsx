/**
 * L3DetailPanel - L3 详情面板
 * 
 * 🏢 角色：多态工作台 (Polymorphic Workbench)
 * 📝 职责：
 * 1. 根据选中的节点类型 (Product/Phase/Module/Process) 渲染不同的编辑器。
 * 2. 也是 "积木系统" (Bricks) 的组装容器。
 */
import React from 'react';
import {
    AnalysisResultModule,
    CompleteBadge,
    ConfigParamsModule,
    EmissionDetailModule,
    EmptySelectionModule,
    HeaderModule,
    HintModule,
    ImportantIssueModule,
    ScreenedNoticeModule,
    VariableInfoModule
} from './L3Bricks';
import {
    NODE_STATUSES,
    NODE_TYPES,
    PROCESS_SUB_TYPES,
    isConfiguredNode,
    isProcessReadOnly
} from '../modelRules';

/**
 * L3DetailPanel (Container-Bricks Pattern)
 * 核心逻辑：
 * 1. 路由判断 (Product/Phase/Module/Process)
 * 2. 状态映射 (Pending/Done)
 * 3. 权限控制 (Self/Inherited)
 */
export const L3DetailPanel = ({ node }) => {
    // 1. 防御性检查：无选中节点
    if (!node) return <EmptySelectionModule />;

    // 2. 核心状态计算 (The Brain)
    const isProcess = node.type === NODE_TYPES.PROCESS;
    const isDone = isConfiguredNode(node);
    const isInherited = isProcessReadOnly(node);
    const isScreened = node.status === NODE_STATUSES.SCREENED;
    const isExcluded = node.status === NODE_STATUSES.EXCLUDED;
    const isSplit = node.subType === PROCESS_SUB_TYPES.SPLIT_REF;
    const isWhole = node.subType === PROCESS_SUB_TYPES.WHOLE_REF;
    const showHint = !isDone;
    const hintText = isProcess
        ? '当前过程节点配置未完成，请先补充配置参数与变量信息。'
        : `当前${node.type === NODE_TYPES.PRODUCT ? '产品' : node.type === NODE_TYPES.PHASE ? '阶段' : '模块'}节点暂无完整结果，请先补充下级节点。`;

    const modules = [];
    modules.push(<HeaderModule key="header" node={node} isConfigured={isDone} />);
    modules.push(<ScreenedNoticeModule key="screened" node={node} />);
    modules.push(<CompleteBadge key="done-badge" show={isDone} />);
    modules.push(<HintModule key="hint" show={showHint} message={hintText} />);

    if (!isProcess) {
        modules.push(<EmissionDetailModule key="emission-detail" node={node} isConfigured={isDone} />);
        modules.push(<ImportantIssueModule key="issue" show={node.type === NODE_TYPES.MODULE && isDone} />);
    } else {
        modules.push(<ConfigParamsModule key="config" node={node} isConfigured={isDone} readOnly={isInherited} />);
        modules.push(<VariableInfoModule key="variable" node={node} isConfigured={isDone} />);
        modules.push(<AnalysisResultModule key="analysis" show={isDone || isWhole || isSplit || isExcluded || isScreened} />);
    }

    return (
        <div className="h-full w-full overflow-y-auto custom-scrollbar p-3 ac-workbench-bg">
            <div className="space-y-3">
                {modules}
            </div>
        </div>
    );
};
