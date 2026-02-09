/**
 * NotificationContext - 通知上下文
 * 
 * 🏢 角色：广播站
 * 📝 职责：负责向全员广播消息，不依赖于具体业务部门。
 * 🔧 包含：addNotification (发送通知), notifications (通知列表).
 */
import React, { createContext, useContext, useState, useCallback } from 'react';

// Define the context
const NotificationContext = createContext({
    notifications: [],
    addNotification: () => { },
    removeNotification: () => { },
});

// Custom hook to use the context
export const useNotification = () => useContext(NotificationContext);

// Provider component
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    // Helper to add a notification
    // type: 'success' | 'error' | 'info' | 'warning'
    const addNotification = useCallback((message, type = 'info') => {
        const id = Date.now() + Math.random();
        const newNotification = { id, message, type };

        setNotifications(prev => [...prev, newNotification]);

        // Auto-dismiss logic could go here
        setTimeout(() => {
            removeNotification(id);
        }, 5000);
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{
            notifications,
            addNotification,
            removeNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
