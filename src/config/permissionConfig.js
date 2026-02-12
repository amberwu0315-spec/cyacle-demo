/**
 * src/config/permissionConfig.js
 * 权限与角色定义
 */

export const USER_ROLES = {
    // 1. 企业账号
    ENTERPRISE: {
        label: '企业账号',
        // 允许访问的 L1 模块 ID
        allowedL1: ['workspace', 'background_data', 'project_mgmt', 'enterprise'],
        // 特殊标签覆写 (Key = L1 ID, Value = Display Label)
        labelOverrides: {
            'enterprise': '服务企业'
        }
    },

    // 2. 个人/服务商账号
    INDIVIDUAL: {
        label: '个人/服务商账号',
        allowedL1: ['workspace', 'background_data', 'project_mgmt', 'enterprise'], // ID 相同但标签不同
        labelOverrides: {
            'enterprise': '服务企业'
        }
    }
};

export const DEFAULT_ROLE = 'ENTERPRISE';
