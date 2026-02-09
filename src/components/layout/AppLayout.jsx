/**
 * AppLayout - 全局布局框架
 * 
 * 🏢 角色：建筑骨架 (Building Skeleton)
 * 📝 职责：
 * 1. 定义最外层的 Flex 布局（左侧 L1 Sidebar，右侧 Workbench）。
 * 2. 锁定屏幕高度，禁止全局滚动，确保所有滚动都在 ViewContainer 内部发生。
 */
import React from 'react';
import L1Sidebar from './L1Sidebar';
import Workbench from './Workbench';

export default function AppLayout() {
    return (
        <div className="flex h-screen w-screen bg-[#1E2A32] overflow-hidden text-[#4D4D4D] relative">
            {/* L1 Sidebar - Navigation */}
            <L1Sidebar />

            {/* Workbench - Main Content Area */}
            <Workbench />
        </div>
    );
}
