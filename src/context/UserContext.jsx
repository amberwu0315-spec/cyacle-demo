/**
 * UserContext - 用户上下文
 * 
 * 🏢 角色：安保部 / 人事部
 * 📝 职责：管理“谁进来了”（当前用户）以及“他能去哪”（权限管理）。
 * 🔧 包含：currentUser (当前用户), permissions (权限列表).
 */
import React, { createContext, useContext, useState } from 'react';

// Define the context
const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => { },
    permissions: [],
    setPermissions: () => { },
});

// Custom hook to use the context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [permissions, setPermissions] = useState([]);

    // Placeholder for future logic: checking local storage for token, etc.

    return (
        <UserContext.Provider value={{
            currentUser,
            setCurrentUser,
            permissions,
            setPermissions
        }}>
            {children}
        </UserContext.Provider>
    );
};
