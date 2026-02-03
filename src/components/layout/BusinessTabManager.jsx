import React, { useState, useEffect } from 'react';
import BusinessTabBar from './BusinessTabBar';
import ProjectDetailView from '../views/detail/ProjectDetailView';

/**
 * BusinessTabManager - 业务标签页管理器
 * 
 * 类似于浏览器，管理 "列表页" (主页) 和 "详情页" (新标签)
 * 
 * Props:
 * - homeTab: 首页标签配置 { id, title, icon }
 * - renderHome: () => ReactNode 渲染首页内容的函数
 * - activeL1: 当前 L1 模块 (用于重置 Tab)
 */
const BusinessTabManager = ({
    homeTab,
    renderHome,
    activeL1
}) => {
    // 初始状态：只有首页
    const [tabs, setTabs] = useState([{
        ...homeTab,
        isClosable: false,
        type: 'list'
    }]);

    const [activeTabId, setActiveTabId] = useState(homeTab.id);

    // 切换 L1 时重置 Tabs
    useEffect(() => {
        setTabs([{
            ...homeTab,
            isClosable: false,
            type: 'list'
        }]);
        setActiveTabId(homeTab.id);
    }, [activeL1, homeTab.id]);

    // 打开新标签 (或切换到已存在标签)
    const openTab = (item) => {
        const newTabId = `detail_${item.id}`;

        // 检查是否已存在
        const existingTab = tabs.find(t => t.id === newTabId);
        if (existingTab) {
            setActiveTabId(newTabId);
            return;
        }

        // 添加新标签
        const newTab = {
            id: newTabId,
            title: item.name, // 假设 item 有 name 属性
            icon: homeTab.icon, // 暂时复用首页图标，或者根据 item 类型决定
            isClosable: true,
            type: 'detail',
            data: item
        };

        setTabs(prev => [...prev, newTab]);
        setActiveTabId(newTabId);
    };

    // 关闭标签
    const closeTab = (id, e) => {
        if (e) e.stopPropagation(); // 防止触发点击选中

        // 找到要关闭的 tab index
        const closeIndex = tabs.findIndex(t => t.id === id);
        if (closeIndex === -1) return;

        const newTabs = tabs.filter(t => t.id !== id);
        setTabs(newTabs);

        // 如果关闭的是当前激活的 tab，需要切换到另一个
        if (activeTabId === id) {
            // 尝试切换到右边的，如果没有则切换到左边的
            // closeIndex 在 newTabs 中对应的位置是原来的右边 (因为原来的 closeIndex 已经被移除了，现在的 closeIndex 就是右边的元素)
            // 如果 closeIndex 越界（它是最后一个），则取 closeIndex - 1
            let nextIndex = closeIndex;
            if (nextIndex >= newTabs.length) {
                nextIndex = newTabs.length - 1;
            }
            if (nextIndex >= 0) {
                setActiveTabId(newTabs[nextIndex].id);
            }
        }
    };

    // 渲染当前激活的内容
    const renderActiveContent = () => {
        const activeTab = tabs.find(t => t.id === activeTabId);
        if (!activeTab) return null;

        if (activeTab.type === 'list') {
            // 渲染首页 (需传入 openTab 给列表组件，使其能触发打开详情)
            // 我们通过 cloneElement 或者 render prop 的方式注入
            // 这里 renderHome 是一个函数，我们传入 openTab
            return renderHome(openTab);
        } else {
            // 渲染详情页
            return <ProjectDetailView data={activeTab.data} />;
        }
    };

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            <BusinessTabBar
                tabs={tabs}
                activeTabId={activeTabId}
                onTabClick={setActiveTabId}
                onTabClose={closeTab}
            />
            <div className="flex-1 overflow-hidden relative">
                {renderActiveContent()}
            </div>
        </div>
    );
};

export default BusinessTabManager;
