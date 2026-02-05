import React, { useState } from 'react';
// 1. 导入刚才修复的组件 (路径要对)
import L3AdvancedTree from './components/L3AdvancedTree';
import { L3DetailPanel } from './components/L3DetailPanel';

// 2. 内置测试数据 (Mock Data)
const MOCK_DATA = [
    {
        id: 'root',
        name: '碳纤维反重力飞行器',
        type: 'product',
        status: 'normal',
        hasData: true,
        children: [
            {
                id: 'phase_1',
                name: '原材料获取',
                type: 'phase',
                status: 'completed',
                hasData: true,
                children: [
                    {
                        id: 'mod_1',
                        name: '复合材料模块',
                        type: 'module',
                        status: 'modified',
                        hasData: true,
                        issues: ['数据来源不一致'],
                        children: [
                            { id: 'proc_1', name: '预浸料生产', type: 'process', status: 'normal', percent: '45%', activityLevel: '12.5', activityUnit: 'kg' },
                            { id: 'proc_2', name: '树脂注入', type: 'process', subType: 'split_ref', status: 'normal' }
                        ]
                    }
                ]
            },
            { id: 'phase_2', name: '生产制造', type: 'phase', status: 'normal', children: [] }
        ]
    }
];

export default function AccountingModelConfig() {
    const [selectedNode, setSelectedNode] = useState(MOCK_DATA[0]);

    // 3. 注意：这里我彻底删除了 setHeader 的相关代码
    // 避免任何 Context 报错干扰页面渲染

    return (
        <div className="flex w-full h-[calc(100vh-64px)] bg-white overflow-hidden">
            {/* 左侧树结构 */}
            <div className="w-[300px] border-r border-gray-100 flex flex-col shrink-0">
                <div className="p-4 border-b border-gray-100 bg-gray-50/30 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    产品结构树
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <L3AdvancedTree
                        data={MOCK_DATA}
                        selectedId={selectedNode?.id}
                        onSelect={setSelectedNode}
                    />
                </div>
            </div>

            {/* 右侧详情面板 */}
            <div className="flex-1 bg-gray-50/20 overflow-hidden">
                <L3DetailPanel node={selectedNode} context="config" />
            </div>
        </div>
    );
}