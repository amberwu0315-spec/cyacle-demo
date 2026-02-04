import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const HeaderContext = createContext({
  actions: null,
  setActions: () => { },
  titleOverride: null,
  setTitleOverride: () => { },
  showHeader: true,
  setShowHeader: () => { },
});

export const useHeaderContext = () => useContext(HeaderContext);

export const HeaderProvider = ({ children }) => {
  const [actions, setActions] = useState(null);
  const [titleOverride, setTitleOverride] = useState(null);
  const [layoutConfig, setLayoutConfig] = useState('title-only');
  const [breadcrumbData, setBreadcrumbData] = useState([]);

  const [showHeader, setShowHeader] = useState(true);

  return (
    <HeaderContext.Provider value={{
      actions, setActions,
      titleOverride, setTitleOverride,
      layoutConfig, setLayoutConfig,
      breadcrumbData, setBreadcrumbData,
      showHeader, setShowHeader
    }}>
      {children}
    </HeaderContext.Provider>
  );
};

// Component to inject actions into the header
export const HeaderActionPortal = ({ children }) => {
  const { setActions } = useHeaderContext();

  useEffect(() => {
    setActions(children);
    // Cleanup actions when component unmounts
    return () => setActions(null);
  }, [children, setActions]);

  return null; // This component renders nothing itself
};
