import {
    IconFileText,
    IconSettings,
    IconCalculator,
    IconChartBar,
    IconDatabase,
    IconShare,
    IconUpload,
    IconBook,
    IconFileSpreadsheet
} from '@tabler/icons-react';

/**
 * Navigation Configuration Schema
 */

export const NAV_SCHEME = {
    // Dimension: Navigation (L2-Nav)
    navigation: {
        modes: {
            config: {
                headerWidgets: ['title', 'business_actions', 'view_actions'], // Title | Actions | View
                sidebarGroups: [] // Custom/None
            },
            version: { headerWidgets: ['title', 'view_actions'], sidebarGroups: [] }
        }
    },
    // Dimension: Basis (L2-Basis)
    basis: {
        modes: {
            config: {
                headerWidgets: ['title', 'view_actions'], // No Business Actions
                sidebarGroups: []
            },
            version: { headerWidgets: ['title', 'view_actions'], sidebarGroups: [] }
        }
    },
    // Dimension: Allocation (L2-Alloc)
    allocation: {
        modes: {
            config: {
                headerWidgets: ['title', 'business_actions', 'view_actions'], // Title | Actions | View
                sidebarGroups: []
            },
            version: { headerWidgets: ['title', 'view_actions'], sidebarGroups: [] }
        }
    },
    // Dimension A: Accounting Level (核算层级)
    accounting: {
        modes: {
            config: {
                headerWidgets: ['breadcrumb', 'methodology', 'overview', 'mode_switch', 'view_actions'],
                sidebarGroups: ['acct_group', 'output_group', 'additional_group']
            },
            version: {
                headerWidgets: ['breadcrumb', 'methodology', 'mode_switch', 'view_actions'],
                sidebarGroups: []
            }
        }
    },
    // Dimension: Model Management (L2-Model Page) - The List of Models
    model: {
        modes: {
            config: {
                headerWidgets: ['title', 'business_actions', 'view_actions'],
                sidebarGroups: [] // No L3 Sidebar for List View
            },
            version: { headerWidgets: ['title', 'view_actions'], sidebarGroups: [] }
        }
    },

    // Dimension B: Model Level (模型层级) - The Detailed View
    model_level: {
        modes: {
            config: {
                // Rule: Only Methodology, No Create/AI actions here (they are in L2 Model Page)
                headerWidgets: ['breadcrumb', 'methodology', 'view_actions'],
                sidebarGroups: ['model_basic_group', 'model_perspective_group']
            },
            version: {
                headerWidgets: ['breadcrumb', 'view_actions'],
                sidebarGroups: []
            }
        }
    }
};

/**
 * Sidebar Menu Definitions
 */
export const SIDEBAR_GROUPS = {
    // 1. Accounting Group (核算组)
    acct_group: {
        title: '核算',
        items: [
            { id: 'acct_basic', label: '基本信息', icon: IconFileText },
            { id: 'acct_model_config', label: '模型配置与结果', icon: IconSettings },
            { id: 'acct_tools', label: '分析工具', icon: IconCalculator },
            { id: 'acct_calc', label: '计算与分析', icon: IconChartBar },
            { id: 'acct_pers_activity', label: '活动数据', icon: IconDatabase, isPerspective: true },
            { id: 'acct_pers_factor', label: '因子数据', icon: IconShare, isPerspective: true }
        ]
    },

    // 2. Output Group (产出组)
    output_group: {
        title: '生成报告',
        items: [
            { id: 'rpt_info', label: '报告信息', icon: IconFileText },
            { id: 'rpt_export', label: '导出数值', icon: IconUpload },
            { id: 'rpt_voucher', label: '凭证管理', icon: IconBook },
            { id: 'rpt_sheet', label: '计算表', icon: IconFileText },
            { id: 'app_cpcd', label: 'CPCD信息', icon: IconShare }
        ]
    },

    // 3. Additional Group (附加组)
    additional_group: {
        title: '对比',
        items: [
            { id: 'cmp_list', label: '对比核算列表', icon: IconFileText },
            { id: 'cmp_config', label: '对比配置调整', icon: IconSettings },
            { id: 'cmp_detail', label: '对比标识详情', icon: IconFileSpreadsheet },
            { id: 'cmp_result', label: '对比分析结果', icon: IconChartBar }
        ]
    },

    // 4. Model Basic Group (模型基础组)
    model_basic_group: {
        title: '核算',
        items: [
            { id: 'mod_basic', label: '基本信息', icon: IconFileText },
            { id: 'mod_model_config', label: '模型配置', icon: IconSettings },
        ]
    },

    // 5. Model Perspective Group (模型透视组 - New Rule #2)
    model_perspective_group: {
        title: '透视',
        items: [
            { id: 'mod_pers_activity', label: '活动数据', icon: IconDatabase, isPerspective: true },
            { id: 'mod_pers_factor', label: '因子数据', icon: IconShare, isPerspective: true }
        ]
    }
};
