/**
 * App Component - 应用程序根组件
 * 
 * 🏢 角色：首席架构师 (Chief Architect)
 * 📝 职责：
 * 1. 组装所有的 Context Providers（基础设施、数据、业务逻辑、视图状态）。
 * 2. 确立依赖层级关系（User -> Data -> Business -> View）。
 * 3. 渲染应用的主骨架 (AppLayout)。
 */
import React from 'react';
import AppLayout from './components/layout/AppLayout';

// Infrastructure Providers
import { NotificationProvider } from './context/NotificationContext';
import { ConfigurationProvider } from './context/ConfigurationContext';
import { UserProvider } from './context/UserContext';

// Data & Domain Providers
import { DataProvider } from './context/DataContext';
import { CalculationProvider } from './context/CalculationContext';
import { BusinessActionsProvider } from './context/BusinessActionsContext';

// Navigation & View Providers
import { AppNavigationProvider } from './context/AppNavigationContext';
import { NavigationProvider } from './context/NavigationContext';
import { ViewActionsProvider } from './context/ViewActionsContext';
import { PagePresentationProvider } from './context/PagePresentationContext';

/**
 * App Component - The "Chief Architect"
 * Responsibility: Orchestrate Global Capabilities (Providers) and Layout Skeleton
 */
export default function App() {
    return (
        <NotificationProvider>
            <ConfigurationProvider>
                <UserProvider>
                    <DataProvider>
                        <CalculationProvider>
                            <AppNavigationProvider>
                                <NavigationProvider>
                                    <BusinessActionsProvider>
                                        <ViewActionsProvider>
                                            <PagePresentationProvider>
                                                <AppLayout />
                                            </PagePresentationProvider>
                                        </ViewActionsProvider>
                                    </BusinessActionsProvider>
                                </NavigationProvider>
                            </AppNavigationProvider>
                        </CalculationProvider>
                    </DataProvider>
                </UserProvider>
            </ConfigurationProvider>
        </NotificationProvider>
    );
}
