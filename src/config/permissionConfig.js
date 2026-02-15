/**
 * src/config/permissionConfig.js
 * 权限与角色定义
 */

const ALL_L1_TARGETS = ['workspace', 'background_data', 'project_mgmt', 'enterprise'];
const WORKSPACE_FULL_TARGETS = ['workbench_home', 'carbon_panorama', 'carbon_asset_mgmt'];

export const USER_ROLES = {
    // 1. 企业账号
    ENTERPRISE: {
        label: '企业账号',
        roleKey: 'enterprise',
        // 允许访问的 L1 模块 ID
        allowedL1: ALL_L1_TARGETS,
        workspaceTargets: WORKSPACE_FULL_TARGETS,
        // 特殊标签覆写 (Key = L1 ID, Value = Display Label)
        labelOverrides: {
            'enterprise': '服务企业'
        }
    },

    // 2. 个人/服务商账号
    INDIVIDUAL: {
        label: '个人/服务商账号',
        roleKey: 'individual',
        allowedL1: ALL_L1_TARGETS, // L1 一致，细粒度差异在 workspaceTargets
        workspaceTargets: ['workbench_home'],
        labelOverrides: {
            'enterprise': '服务企业'
        }
    }
};

export const DEFAULT_ROLE = 'ENTERPRISE';

export const getRoleConfig = (roleId) => USER_ROLES[roleId] || USER_ROLES[DEFAULT_ROLE];
