/**
 * BusinessActionsContext - 业务操作上下文
 * 
 * 🏢 角色：车间主任
 * 📝 职责：指挥生产，协调各个部门。比如“创建一个项目”，它会去叫“仓库”存数据，叫“精算师”校验，叫“导航”跳转。
 * 🔧 包含：executeAction (执行复杂业务指令).
 */
import React, { createContext, useContext, useCallback } from 'react';

// Define the context
const BusinessActionsContext = createContext({
    executeAction: () => Promise.resolve(),
});

// Custom hook to use the context
export const useBusinessActions = () => useContext(BusinessActionsContext);

// Provider component
export const BusinessActionsProvider = ({ children }) => {
    // This context orchestrates complex business flows
    // Example: "Create Project" might involve:
    // 1. Validate input (CalculationContext)
    // 2. Call API (DataContext)
    // 3. Update local state
    // 4. Navigate to new project (NavigationContext)

    const executeAction = useCallback(async (actionType, payload) => {
        console.log(`Executing business action: ${actionType}`, payload);
        // Implementation will go here
        return true;
    }, []);

    return (
        <BusinessActionsContext.Provider value={{
            executeAction
        }}>
            {children}
        </BusinessActionsContext.Provider>
    );
};
