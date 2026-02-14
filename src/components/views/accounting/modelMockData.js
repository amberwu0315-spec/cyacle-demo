import {
    CALC_STATUSES,
    NODE_ORIGINS,
    NODE_STATUSES,
    NODE_TYPES,
    PROCESS_SUB_TYPES
} from './modelRules';

// 菜单一：模型配置与结果（不包含对比专属的新增/删除/变更色阶节点）
export const ACCOUNTING_CONFIG_TREE_MOCK = [
    {
        id: 'cfg_root',
        name: '碳纤维反重力飞行器',
        type: NODE_TYPES.PRODUCT,
        origin: NODE_ORIGINS.SELF,
        status: NODE_STATUSES.NORMAL,
        hasData: true,
        children: [
            {
                id: 'cfg_phase_1',
                name: '原材料获取',
                type: NODE_TYPES.PHASE,
                origin: NODE_ORIGINS.INHERITED,
                status: NODE_STATUSES.NORMAL,
                hasData: true,
                children: [
                    {
                        id: 'cfg_mod_1',
                        name: '复合材料模块',
                        type: NODE_TYPES.MODULE,
                        origin: NODE_ORIGINS.INHERITED,
                        status: NODE_STATUSES.NORMAL,
                        hasData: true,
                        children: [
                            {
                                id: 'cfg_proc_1',
                                name: '预浸料生产',
                                type: NODE_TYPES.PROCESS,
                                subType: PROCESS_SUB_TYPES.NORMAL,
                                origin: NODE_ORIGINS.INHERITED,
                                status: NODE_STATUSES.NORMAL,
                                calc_status: CALC_STATUSES.DONE,
                                value: 45.0,
                                hasData: true
                            },
                            {
                                id: 'cfg_proc_2',
                                name: '树脂固化（整体引用）',
                                type: NODE_TYPES.PROCESS,
                                subType: PROCESS_SUB_TYPES.WHOLE_REF,
                                origin: NODE_ORIGINS.SELF,
                                status: NODE_STATUSES.NORMAL,
                                calc_status: CALC_STATUSES.DONE,
                                value: 12.34,
                                hasData: true
                            },
                            {
                                id: 'cfg_proc_3',
                                name: '纤维切割（拆分引用）',
                                type: NODE_TYPES.PROCESS,
                                subType: PROCESS_SUB_TYPES.SPLIT_REF,
                                origin: NODE_ORIGINS.SELF,
                                status: NODE_STATUSES.NORMAL,
                                calc_status: CALC_STATUSES.PENDING,
                                hasData: false
                            },
                            {
                                id: 'cfg_proc_4',
                                name: '自建过程-被排除',
                                type: NODE_TYPES.PROCESS,
                                subType: PROCESS_SUB_TYPES.NORMAL,
                                origin: NODE_ORIGINS.SELF,
                                status: NODE_STATUSES.EXCLUDED,
                                calc_status: CALC_STATUSES.DONE,
                                value: 0.95,
                                hasData: true
                            },
                            {
                                id: 'cfg_proc_5',
                                name: '继承过程-被屏蔽',
                                type: NODE_TYPES.PROCESS,
                                subType: PROCESS_SUB_TYPES.NORMAL,
                                origin: NODE_ORIGINS.INHERITED,
                                status: NODE_STATUSES.SCREENED,
                                calc_status: CALC_STATUSES.PENDING,
                                hasData: false
                            }
                        ]
                    }
                ]
            },
            {
                id: 'cfg_phase_2',
                name: '生产制造（自建）',
                type: NODE_TYPES.PHASE,
                origin: NODE_ORIGINS.SELF,
                status: NODE_STATUSES.NORMAL,
                hasData: false,
                children: []
            }
        ]
    }
];

// 菜单二：对比配置调整（包含新增/删除/变更等对比专属状态）
export const ACCOUNTING_COMPARE_TREE_MOCK = [
    {
        id: 'cmp_root',
        name: '对比核算-碳纤维反重力飞行器',
        type: NODE_TYPES.PRODUCT,
        origin: NODE_ORIGINS.SELF,
        status: NODE_STATUSES.NORMAL,
        hasData: true,
        children: [
            {
                id: 'cmp_phase_1',
                name: '原材料获取',
                type: NODE_TYPES.PHASE,
                origin: NODE_ORIGINS.INHERITED,
                status: NODE_STATUSES.MODIFIED,
                hasData: true,
                children: [
                    {
                        id: 'cmp_mod_1',
                        name: '复合材料模块',
                        type: NODE_TYPES.MODULE,
                        origin: NODE_ORIGINS.INHERITED,
                        status: NODE_STATUSES.MODIFIED,
                        hasData: true,
                        children: [
                            {
                                id: 'cmp_proc_1',
                                name: '预浸料生产（变更）',
                                type: NODE_TYPES.PROCESS,
                                subType: PROCESS_SUB_TYPES.NORMAL,
                                origin: NODE_ORIGINS.INHERITED,
                                status: NODE_STATUSES.MODIFIED,
                                calc_status: CALC_STATUSES.DONE,
                                value: 19.35,
                                hasData: true
                            },
                            {
                                id: 'cmp_proc_2',
                                name: '新增长流程',
                                type: NODE_TYPES.PROCESS,
                                subType: PROCESS_SUB_TYPES.NORMAL,
                                origin: NODE_ORIGINS.SELF,
                                status: NODE_STATUSES.ADDED,
                                calc_status: CALC_STATUSES.DONE,
                                value: 7.12,
                                hasData: true
                            },
                            {
                                id: 'cmp_proc_3',
                                name: '删除旧流程',
                                type: NODE_TYPES.PROCESS,
                                subType: PROCESS_SUB_TYPES.NORMAL,
                                origin: NODE_ORIGINS.SELF,
                                status: NODE_STATUSES.DELETED,
                                calc_status: CALC_STATUSES.PENDING,
                                hasData: false
                            },
                            {
                                id: 'cmp_proc_4',
                                name: '继承流程-被屏蔽',
                                type: NODE_TYPES.PROCESS,
                                subType: PROCESS_SUB_TYPES.WHOLE_REF,
                                origin: NODE_ORIGINS.INHERITED,
                                status: NODE_STATUSES.SCREENED,
                                calc_status: CALC_STATUSES.PENDING,
                                hasData: false
                            }
                        ]
                    }
                ]
            },
            {
                id: 'cmp_phase_2',
                name: '新增阶段',
                type: NODE_TYPES.PHASE,
                origin: NODE_ORIGINS.SELF,
                status: NODE_STATUSES.ADDED,
                hasData: true,
                children: []
            },
            {
                id: 'cmp_phase_3',
                name: '被删除阶段',
                type: NODE_TYPES.PHASE,
                origin: NODE_ORIGINS.SELF,
                status: NODE_STATUSES.DELETED,
                hasData: false,
                children: []
            }
        ]
    }
];

