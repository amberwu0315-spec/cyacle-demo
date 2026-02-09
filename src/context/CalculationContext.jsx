/**
 * CalculationContext - 计算上下文
 * 
 * 🏢 角色：精算师
 * 📝 职责：专门负责算账、校验数据。逻辑独立且封闭，不管数据存哪，只管算得对不对。
 * 🔧 包含：calculateEmission (碳排放计算), validateInput (数据校验).
 */
import React, { createContext, useContext, useCallback } from 'react';

// Define the context
const CalculationContext = createContext({
    calculateEmission: () => 0,
    validateInput: () => true,
});

// Custom hook to use the context
export const useCalculation = () => useContext(CalculationContext);

// Provider component
export const CalculationProvider = ({ children }) => {
    // Centralized domain logic for calculations

    const calculateEmission = useCallback((activityData, emissionFactor) => {
        // Placeholder for real GHG calculation logic
        return activityData * emissionFactor;
    }, []);

    const validateInput = useCallback((value, type) => {
        // Validation logic
        if (value === null || value === undefined) return false;
        return true;
    }, []);

    return (
        <CalculationContext.Provider value={{
            calculateEmission,
            validateInput
        }}>
            {children}
        </CalculationContext.Provider>
    );
};
