import React, { createContext, useContext, useState, useMemo } from 'react';

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children, onNavigate }) => {
    // Current Dimension: 'accounting' | 'model'
    const [activeDimension, setActiveDimension] = useState('accounting');

    // Current Mode: 'config' | 'version'
    const [activeMode, setActiveMode] = useState('config');

    // Context Value
    const value = useMemo(() => ({
        activeDimension,
        activeMode,
        setActiveDimension,
        setActiveMode,
        // Helper booleans
        isConfigMode: activeMode === 'config',
        isVersionMode: activeMode === 'version',
        navigate: (dimension) => {
            setActiveDimension(dimension);
            // Rule: Always reset to Config Mode when switching Top Level Dimensions (L2)
            // This prevents "Version Mode" state from persisting into pages that don't support it (Nav, Alloc, Basis)
            setActiveMode('config');

            if (onNavigate) {
                onNavigate(dimension);
            }
        }
    }), [activeDimension, activeMode, onNavigate]);

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};
