Skill 06: Type E - L3 Polymorphic Panel (L3 多态详情面板) v2.0
1. 核心定义 (Identity)
类型: Type E (Context-Aware Detail Panel)

核心职责: 作为 L3 页面的“右侧大脑”，根据左侧树选中的节点类型（Product / Phase / Module / Process）及状态（自建/继承、配置中/已完成），动态渲染完全不同的业务视图。

架构模式: 容器-积木模式 (Container-Bricks Pattern)。

主容器 (L3DetailPanel): 负责“大脑”逻辑。处理路由判断 (switch/case)、数据获取、权限计算 (isReadOnly)。

积木库 (L3Bricks): 负责“手脚”渲染。纯 UI 组件库，接收 props 并渲染具体的表单块（如头部、配置区、结果区）。

2. 技术栈铁律 (Strict Tech Stack)
警告: 违反以下规则将导致组件复用性崩溃。

维度	强制规则	代码映射
图标库	必须且只能使用 @tabler/icons-react。	import { IconInfoCircle } from '@tabler/icons-react'
导出规范	积木组件使用命名导出；主容器使用默认导出。	export const HeaderBrick = ... / export default function L3DetailPanel...
样式方案	Tailwind CSS。禁止内联 Style。	className="border-b p-4"
空值防御	必须优先处理 node 为空或无效的情况。	if (!node) return <EmptyBrick />
3. 多态渲染矩阵 (Polymorphic Matrix)
这是视图渲染的“真值表”。主容器必须严格执行此路由逻辑。

节点类型 (Type)	节点状态 (Status)	渲染积木组合 (Bricks Stack)	视觉重点
Product (产品)	任意	Header + ResultCard + EmissionTabs(Chart/List)	核心是 Top 10 排放图表 和下级明细列表。
Phase/Module	任意	Header + ResultCard + EmissionList	类似于产品，但无复杂图表，侧重列表。
Process (过程)	Pending (配置中)	Header + HintBox + ConfigForm + ActivityForm	显示黄色提示条，隐藏结果区，侧重输入。
Process (过程)	Done (已完成)	Header + ResultCard + ConfigForm(Read) + ActivityForm + AnalysisBlock	显示蓝色结果区，隐藏提示条，配置区变只读，追加分析图表。
Any	Screened (屏蔽)	Header + ScreenedEmptyState	显示“节点已屏蔽，不参与核算”空状态。
4. 核心业务积木 (The Bricks Anatomy)
根据业务文档拆解的 5 大核心积木（位于 L3Bricks.jsx）：

A. 头部积木 (HeaderBrick)
UI: 图标 + 名称 + 面包屑 + 右侧操作按钮（更多、保存）。

逻辑: 始终显示。

B. 结果/提示积木 (StateBrick)
互斥逻辑:

HintBox (配置中): 黄色背景，显示“请完善以下配置...”。

ResultCard (已完成): 蓝色/绿色背景，显示“单位评估结果”和“总排放量”。

C. 配置参数积木 (ConfigBrick)
内容: 计算元件 (Element) + 算式 (Formula)。

权限逻辑 (至关重要):

🟢 自建节点 (Self): 完全可编辑。

🔒 继承节点 (Inherited): 强制只读 (Read-Only)。继承的公式逻辑严禁修改。

D. 变量输入积木 (VariableBrick)
内容: 排放因子选择 + 活动数据输入 (Activity Data)。

权限逻辑:

🟢 自建节点: 可编辑。

⚠️ 继承节点: 可编辑 (这是与 ConfigBrick 的区别)。修改后，节点状态需变更为 modified (已变更)。

E. 分析积木 (AnalysisBrick)
内容: 敏感性分析开关 + 数据质量打分 (DQR)。

逻辑: 仅在“已完成”状态下显示。

5. 代码骨架 (The Golden Skeleton)
Part A: 积木库 (components/views/accounting/components/L3Bricks.jsx)
JavaScript
import React from 'react';
import { IconInfoCircle, IconAlertTriangle, IconCheck } from '@tabler/icons-react';

/**
 * Brick 1: 通用头部
 */
export const HeaderBrick = ({ node }) => (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                {/* 这里的图标应根据 node.type 动态映射，参考 Skill 05 */}
                <IconInfoCircle className="w-5 h-5" />
            </div>
            <div>
                <h2 className="text-lg font-bold text-gray-900">{node.name}</h2>
                <div className="text-xs text-gray-400 mt-0.5 flex gap-2">
                    <span>{node.type.toUpperCase()}</span>
                    <span>•</span>
                    <span className={node.origin === 'self' ? 'text-blue-600' : 'text-purple-600'}>
                        {node.origin === 'self' ? '自建' : '继承'}
                    </span>
                </div>
            </div>
        </div>
        {/* Actions */}
        <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm bg-[#087F9C] text-white rounded hover:bg-[#066C85]">保存</button>
        </div>
    </div>
);

/**
 * Brick 2: 状态提示区 (多态：Hint 或 Result)
 */
export const StateBrick = ({ status, resultValue }) => {
    if (status === 'done') {
        return (
            <div className="mx-6 mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600"><IconCheck className="w-5 h-5"/></div>
                    <div>
                        <div className="text-xs text-blue-500 uppercase font-semibold">单位评估结果</div>
                        <div className="text-2xl font-mono font-bold text-blue-700">{resultValue} <span className="text-sm">kgCO₂e</span></div>
                    </div>
                </div>
            </div>
        );
    }
    // Default: Pending Hint
    return (
        <div className="mx-6 mt-6 p-3 bg-amber-50 border border-amber-100 rounded text-sm text-amber-700 flex gap-2">
            <IconAlertTriangle className="w-5 h-5 shrink-0" />
            <span>当前节点尚未配置完成，计算结果暂时不可用。请完善下方数据。</span>
        </div>
    );
};

/**
 * Brick 3: 配置参数 (核心多态表单)
 */
export const ConfigBrick = ({ node, readOnly }) => {
    return (
        <div className="px-6 py-6 border-b border-gray-50">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center justify-between">
                配置参数
                {readOnly && <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded">只读 (继承锁定)</span>}
            </h3>
            <div className={`space-y-4 ${readOnly ? 'opacity-70 pointer-events-none grayscale' : ''}`}>
                {/* 模拟表单项 */}
                <div>
                    <label className="block text-xs text-gray-500 mb-1">计算公式</label>
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded text-sm font-mono text-gray-600">
                        Activity_Data * Emission_Factor
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Brick 4: 变量输入 (活动数据)
 */
export const VariableBrick = ({ node }) => (
    <div className="px-6 py-6 border-b border-gray-50">
        <h3 className="text-sm font-bold text-gray-900 mb-4">活动数据 (Activity Data)</h3>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-xs text-gray-500 mb-1">输入数值</label>
                <input type="number" className="w-full text-sm border-gray-200 rounded focus:border-[#087F9C] focus:ring-0" placeholder="0.00" />
            </div>
            <div>
                <label className="block text-xs text-gray-500 mb-1">单位</label>
                <select className="w-full text-sm border-gray-200 rounded">
                    <option>kWh</option>
                    <option>kg</option>
                </select>
            </div>
        </div>
    </div>
);

export const EmptyBrick = () => (
    <div className="h-full flex flex-col items-center justify-center text-gray-300">
        <IconInfoCircle className="w-12 h-12 mb-2 opacity-20" />
        <p className="text-sm">请在左侧选择一个节点以查看详情</p>
    </div>
);
Part B: 主容器 (components/views/accounting/components/L3DetailPanel.jsx)
JavaScript
import React from 'react';
import { HeaderBrick, StateBrick, ConfigBrick, VariableBrick, EmptyBrick } from './L3Bricks';

export default function L3DetailPanel({ node }) {
    // 1. 防御性检查
    if (!node) return <EmptyBrick />;

    // 2. 状态与权限计算 (The Brain)
    const isProcess = node.type === 'process';
    const isCompleted = node.calc_status === 'done';
    const isInherited = node.origin === 'inherited';
    const isScreened = node.status === 'screened';

    // 3. 特殊状态拦截
    if (isScreened) {
        return (
            <div className="flex flex-col h-full bg-white">
                <HeaderBrick node={node} />
                <div className="flex-1 flex items-center justify-center text-gray-400 bg-gray-50/50">
                    此节点已被屏蔽，不参与核算
                </div>
            </div>
        );
    }

    // 4. 渲染核心视图
    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            {/* Common Header */}
            <HeaderBrick node={node} />

            <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
                {/* Render Strategy: Product/Phase vs. Process
                */}
                
                {/* A. Process View (Complex) */}
                {isProcess && (
                    <>
                        {/* 1. State/Result Block */}
                        <StateBrick status={node.calc_status} resultValue={node.value} />
                        
                        {/* 2. Configuration Block (Inherited = ReadOnly) */}
                        <ConfigBrick node={node} readOnly={isInherited} />
                        
                        {/* 3. Variable Block (Always Editable, triggers 'modified' if inherited) */}
                        <VariableBrick node={node} />
                    </>
                )}

                {/* B. Product/Phase View (Aggregation) */}
                {!isProcess && (
                    <div className="p-6">
                        <div className="p-4 bg-gray-50 rounded border border-gray-100 text-center text-gray-500 text-sm">
                            此处显示 {node.type} 级别的汇总图表与列表 (Tab切换)
                            <br/>
                            (Chart / List Bricks)
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}