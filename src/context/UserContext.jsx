/**
 * UserContext - 用户上下文
 * 
 * 🏢 角色：安保部 / 人事部
 * 📝 职责：管理“谁进来了”（当前用户）以及“他能去哪”（权限管理）。
 * 🔧 包含：currentUser (当前用户), permissions (权限列表).
 */
import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_ROLE, getRoleConfig } from '../config/permissionConfig';

// Define the context
const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => { },
    currentRole: DEFAULT_ROLE,
    setCurrentRole: () => { },
    roleKey: 'enterprise',
    permissions: [],
    setPermissions: () => { },
    workspaceTargets: [],
    isL1Allowed: () => false,
    isWorkspaceTargetAllowed: () => false,
    getL1Label: (_id, defaultLabel) => defaultLabel
});

// Custom hook to use the context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
    // 1. [New] 角色状态管理
    const [currentRole, setCurrentRole] = useState(DEFAULT_ROLE);

    // 计算当前权限
    const roleConfig = getRoleConfig(currentRole);
    const permissions = roleConfig?.allowedL1 || []; // renamed from allowedIds to match context interface
    const labelOverrides = roleConfig?.labelOverrides || {};
    const workspaceTargets = roleConfig?.workspaceTargets || [];
    const roleKey = roleConfig?.roleKey || 'enterprise';

    const [currentUser, setCurrentCurrentUser] = useState(null); // kept for future use

    // Exposed context value
    const value = {
        currentUser,
        setCurrentUser: setCurrentCurrentUser,

        // Role & Permissions
        currentRole,
        setCurrentRole, // Expose setter for the switcher
        roleKey,
        permissions,
        labelOverrides,
        workspaceTargets,

        // Helper to check if an L1 is allowed
        isL1Allowed: (l1Id) => permissions.includes(l1Id),
        isWorkspaceTargetAllowed: (targetId) => workspaceTargets.includes(targetId),

        // Helper to get display label
        getL1Label: (l1Id, defaultLabel) => labelOverrides[l1Id] || defaultLabel
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
