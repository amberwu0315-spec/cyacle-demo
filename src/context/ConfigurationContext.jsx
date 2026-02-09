/**
 * ConfigurationContext - 配置上下文
 * 
 * 🏢 角色：行政部 / 规则书
 * 📝 职责：管理公司的“规章制度”和“环境设置”。
 * 🔧 包含：theme (主题色), language (语言), featureFlags (功能开关).
 */
import React, { createContext, useContext, useState } from 'react';

// Define the context
const ConfigurationContext = createContext({
    config: {},
    setConfig: () => { },
    theme: 'light',
    setTheme: () => { },
    language: 'zh-CN',
    setLanguage: () => { },
});

// Custom hook to use the context
export const useConfiguration = () => useContext(ConfigurationContext);

// Provider component
export const ConfigurationProvider = ({ children }) => {
    // Global configuration object (feature flags, system settings)
    const [config, setConfig] = useState({});

    // Specific configurations that might be common
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('zh-CN');

    return (
        <ConfigurationContext.Provider value={{
            config, setConfig,
            theme, setTheme,
            language, setLanguage
        }}>
            {children}
        </ConfigurationContext.Provider>
    );
};
