/**
 * PagePresentationContext - 页面展示上下文 (原 HeaderContext)
 * 
 * 🏢 角色：装修队 / 场景布置
 * 📝 职责：不关心业务，只关心“怎么摆好看”。管理 Header 上的按钮、标题、面包屑等显示元素。
 * 🔧 包含：actions (Header按钮), titleOverride (自定义标题), layoutConfig (布局模式).
 */
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const PagePresentationContext = createContext({
  actions: null,
  setActions: () => { },
  titleOverride: null,
  setTitleOverride: () => { },
  showHeader: true,
  setShowHeader: () => { },
});

export const usePagePresentation = () => useContext(PagePresentationContext);

export const PagePresentationProvider = ({ children }) => {
  const [actions, setActions] = useState(null);
  const [titleOverride, setTitleOverride] = useState(null);
  const [layoutConfig, setLayoutConfig] = useState('title-only');
  const [breadcrumbData, setBreadcrumbData] = useState([]);

  const [showHeader, setShowHeader] = useState(true);

  return (
    <PagePresentationContext.Provider value={{
      actions, setActions,
      titleOverride, setTitleOverride,
      layoutConfig, setLayoutConfig,
      breadcrumbData, setBreadcrumbData,
      showHeader, setShowHeader
    }}>
      {children}
    </PagePresentationContext.Provider>
  );
};

// Component to inject actions into the header
export const HeaderActionPortal = ({ children }) => {
  const { setActions } = usePagePresentation();

  useEffect(() => {
    setActions(children);
    // Cleanup actions when component unmounts
    return () => setActions(null);
  }, [children, setActions]);

  return null; // This component renders nothing itself
};
