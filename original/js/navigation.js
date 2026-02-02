// ============================================================================
// NAVIGATION & UI SYNC
// ============================================================================

/**
 * Main UI synchronization function
 * Updates all UI elements based on current app state
 */
function syncUI() {
    const { mode, activeL1, activeL2, activeL3, isModalOpen, activeFooterAction, modalTitle } = appState;

    const isProjectLayout = (activeL1 === 'project_tag');
    // Define Business Modes
    const businessModes = ['background_data', 'project_mgmt', 'enterprise'];
    const isBusinessLayout = businessModes.includes(activeL1);

    // 1. Layout Structure Toggles
    // Show L2 Sidebar ONLY for Project Layout
    toggle(DOM.views.l2Sidebar, isProjectLayout);

    // Header Visibility logic
    const activeL1HeaderItems = ['background_data', 'project_mgmt', 'enterprise'];
    const showHeader = isProjectLayout || activeL1HeaderItems.includes(activeL1);

    toggle(DOM.views.header, showHeader);
    toggle(DOM.views.footer, isProjectLayout);

    // Header Content
    const headerTitleEl = document.getElementById('header-title');
    const headerBreadcrumb = document.getElementById('header-breadcrumb');

    toggle(headerBreadcrumb, false);

    if (headerTitleEl) {
        let title = '';
        if (isProjectLayout) {
            title = getL2Title(activeL2);
        } else if (showHeader) {
            const titleMap = {
                'background_data': '背景数据',
                'project_mgmt': '项目管理',
                'enterprise': '企业/对象'
            };
            title = titleMap[activeL1] || '';
        }
        headerTitleEl.textContent = title;
    }

    // Viewport Swapping
    const dashboardView = document.getElementById('dashboard-view');
    const projectWrapper = document.getElementById('project-view-wrapper');
    const businessWrapper = document.getElementById('business-view-wrapper');

    // Toggle Logic
    toggle(dashboardView, !isProjectLayout && !isBusinessLayout);
    toggle(projectWrapper, isProjectLayout);
    toggle(businessWrapper, isBusinessLayout);

    // Toggle Business Sidebar (Full Height)
    const businessSidebar = document.getElementById('business-sidebar');
    toggle(businessSidebar, isBusinessLayout);

    // Render Business Sidebar Content if active
    if (isBusinessLayout) {
        renderBusinessSidebar(activeL1);
    }

    // Update Dashboard Title
    if (!isProjectLayout && dashboardView) {
        const dashboardTitle = dashboardView.querySelector('h1');
        if (dashboardTitle) {
            const showHeader = activeL1HeaderItems.includes(activeL1);
            toggle(dashboardTitle, !showHeader);

            const titleMap = {
                'home': '工作空间',
                'background_data': '背景数据',
                'project_mgmt': '项目管理',
                'enterprise': '企业/对象'
            };
            dashboardTitle.textContent = titleMap[activeL1] || 'Dashboard';
        }
    }

    // 2. Project Context Logic
    if (isProjectLayout) {
        const showL3 = (mode === MODES.SPLIT);
        toggle(DOM.views.l3Sidebar, showL3);

        // Main Content Sizing
        if (showL3) {
            DOM.views.mainContent.classList.remove('w-full');
            DOM.views.mainContent.classList.add('flex-1');
        } else {
            DOM.views.mainContent.classList.remove('flex-1');
            DOM.views.mainContent.classList.add('w-full');
        }

        updateMainContentPlaceholder(activeL2, activeL3);
        updateActiveL2(activeL2);
        updateActiveL3(activeL3);
        updateActiveFooter(activeFooterAction);
    }

    // 3. Modal
    const modalEl = document.getElementById('footer-modal');
    const modalTitleText = document.getElementById('modal-title-text');
    toggle(modalEl, isModalOpen);
    if (isModalOpen && modalTitleText) {
        modalTitleText.textContent = modalTitle;
    }

    // 4. L1 Active State
    updateActiveL1(activeL1);
}

/**
 * Render content for the 200px Business Sidebar
 * @param {string} l1Type - 'background_data', 'project_mgmt', 'enterprise'
 */
function renderBusinessSidebar(l1Type) {
    const sidebarEl = document.getElementById('business-sidebar');
    if (!sidebarEl) return;

    let html = '';

    // Compact Header Card Style for 200px
    const headerClass = "bg-gradient-to-br from-[#087F9C] to-[#065F75] p-4 text-white shrink-0";
    const descClass = "hidden"; // Hide description for 200px to save space

    // 1. Background Data (背景数据)
    if (l1Type === 'background_data') {
        html = `
            <div class="${headerClass}">
                <div class="flex flex-col items-center justify-center py-2">
                    <i data-lucide="share-2" class="w-8 h-8 mb-2 opacity-90"></i>
                    <h2 class="text-base font-bold">背景数据</h2>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto py-2">
                <!-- Group 1 -->
                <div class="px-2 py-2">
                    <button class="w-full bg-[#087F9C] text-white rounded px-2 py-2 flex items-center gap-2 text-left shadow-sm transition-all"
                        data-action="NAV_BUSINESS_L3" data-target="database_mgmt" data-title="数据库管理">
                        <i data-lucide="layers" class="w-4 h-4 shrink-0"></i>
                        <span class="font-medium text-xs truncate">数据库管理</span>
                    </button>
                </div>
                
                <!-- Group 2: 元件 -->
                <div class="px-3 py-2">
                    <h3 class="text-[10px] text-gray-400 uppercase tracking-wider mb-1">元件</h3>
                    <button class="w-full flex items-center gap-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded px-2 transition-colors"
                        data-action="NAV_BUSINESS_L3" data-target="components" data-title="元件">
                        <i data-lucide="cpu" class="w-4 h-4 text-gray-400 shrink-0"></i>
                        <span class="text-xs truncate">元件</span>
                    </button>
                </div>

                <!-- Group 3: 因子 -->
                <div class="px-3 py-2">
                    <h3 class="text-[10px] text-gray-400 uppercase tracking-wider mb-1">因子</h3>
                    <button class="w-full flex items-center gap-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded px-2 transition-colors"
                        data-action="NAV_BUSINESS_L3" data-target="factors_literature" data-title="文献因子">
                        <i data-lucide="flask-conical" class="w-4 h-4 text-gray-400 shrink-0"></i>
                        <span class="text-xs truncate">文献因子</span>
                    </button>
                    <button class="w-full flex items-center gap-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded px-2 mt-0.5 transition-colors"
                        data-action="NAV_BUSINESS_L3" data-target="factors_baseflow" data-title="基本流">
                        <i data-lucide="activity" class="w-4 h-4 text-gray-400 shrink-0"></i>
                         <span class="text-xs truncate">基本流</span>
                    </button>
                    <button class="w-full flex items-center gap-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded px-2 mt-0.5 transition-colors"
                        data-action="NAV_BUSINESS_L3" data-target="factors_composite" data-title="复合因子">
                        <i data-lucide="layers" class="w-4 h-4 text-gray-400 shrink-0"></i>
                         <span class="text-xs truncate">复合因子</span>
                    </button>
                </div>

                 <!-- Group 4: 文献 -->
                <div class="px-3 py-2">
                    <h3 class="text-[10px] text-gray-400 uppercase tracking-wider mb-1">文献</h3>
                    <button class="w-full flex items-center gap-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded px-2 transition-colors"
                        data-action="NAV_BUSINESS_L3" data-target="literature" data-title="文献">
                        <i data-lucide="book-open" class="w-4 h-4 text-gray-400 shrink-0"></i>
                         <span class="text-xs truncate">文献</span>
                    </button>
                </div>
            </div>
        `;
    }
    // 2. Project Management (项目)
    else if (l1Type === 'project_mgmt') {
        html = `
            <div class="${headerClass}">
                <div class="flex flex-col items-center justify-center py-2">
                    <i data-lucide="layout-grid" class="w-8 h-8 mb-2 opacity-90"></i>
                    <h2 class="text-base font-bold">项目</h2>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto py-2">
                 <div class="px-3 py-2">
                    <h3 class="text-[10px] text-gray-400 uppercase tracking-wider mb-1">全部</h3>
                    <button class="w-full flex items-center gap-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded px-2 transition-colors"
                        data-action="NAV_BUSINESS_L3" data-target="all_projects" data-title="全部项目">
                        <span class="text-xs font-medium truncate">全部项目</span>
                    </button>
                </div>

                <div class="px-3 py-2">
                    <h3 class="text-[10px] text-gray-400 uppercase tracking-wider mb-1">需求类型</h3>
                    <button class="w-full bg-[#087F9C] text-white rounded px-2 py-2 flex items-center gap-2 text-left shadow-sm mb-1 transition-all"
                        data-action="NAV_BUSINESS_L3" data-target="pcf" data-title="产品碳足迹">
                        <span class="text-xs font-medium truncate">产品碳足迹</span>
                    </button>
                    <button class="w-full flex items-center gap-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded px-2 transition-colors"
                        data-action="NAV_BUSINESS_L3" data-target="ocf" data-title="组织碳足迹">
                        <span class="text-xs truncate">组织碳足迹</span>
                    </button>
                </div>
            </div>
        `;
    }
    // 3. Enterprise/Objects (研究对象)
    else if (l1Type === 'enterprise') {
        html = `
            <div class="${headerClass}">
                <div class="flex flex-col items-center justify-center py-2">
                    <i data-lucide="shield" class="w-8 h-8 mb-2 opacity-90"></i>
                    <h2 class="text-base font-bold">研究对象</h2>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto py-2">
                 <div class="px-2 py-2">
                    <button class="w-full bg-[#087F9C] text-white rounded px-2 py-2 flex items-center gap-2 text-left shadow-sm transition-all"
                        data-action="NAV_BUSINESS_L3" data-target="all_objects" data-title="全部">
                        <span class="font-medium text-xs truncate">全部</span>
                    </button>
                </div>
            </div>
        `;
    }

    sidebarEl.innerHTML = html;

    // Refresh icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Bind Click Events for L3 Navigation
    const navBtns = sidebarEl.querySelectorAll('[data-action="NAV_BUSINESS_L3"]');
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget.dataset.target;
            const title = e.currentTarget.dataset.title;

            // 1. Update Active State
            navBtns.forEach(b => {
                b.classList.remove('bg-[#087F9C]', 'text-white', 'shadow-sm');
                b.classList.add('text-gray-700', 'hover:bg-gray-100');
            });
            e.currentTarget.classList.remove('text-gray-700', 'hover:bg-gray-100');
            e.currentTarget.classList.add('bg-[#087F9C]', 'text-white', 'shadow-sm');

            // 2. Render Content
            renderBusinessContent(target, title);

            // 3. Sync Global Header Title
            const headerTitleEl = document.getElementById('header-title');
            if (headerTitleEl) {
                headerTitleEl.textContent = title;
            }
        });
    });
}

/**
 * Render content for business views based on selection
 * @param {string} target - The content key (e.g. 'database_mgmt')
 * @param {string} title - The title for the view
 */
function renderBusinessContent(target, title) {
    const contentEl = document.getElementById('business-content');
    if (!contentEl) return;

    // Default Placeholder
    let html = `
        <div class="h-full flex flex-col">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">${title}</h1>
            <div class="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-8 flex items-center justify-center">
                <div class="text-center">
                    <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i data-lucide="layers" class="w-8 h-8 text-gray-400"></i>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">${title}</h3>
                    <p class="text-gray-500 max-w-md mx-auto">
                        此模块的功能正在开发中...
                        <br>
                        (Target: ${target})
                    </p>
                </div>
            </div>
        </div>
    `;

    // Specific Content Overrides (if needed in future)
    if (target === 'database_mgmt') {
        html = `
            <div class="h-full flex flex-col">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-2xl font-bold text-gray-800">${title}</h1>
                     <div class="flex gap-2">
                        <input type="text" placeholder="搜索数据库..." class="px-4 py-2 border border-gray-200 rounded-md text-sm w-64 focus:outline-none focus:border-[#087F9C]">
                        <button class="bg-[#087F9C] text-white px-4 py-2 rounded-md text-sm hover:bg-[#065F75] transition-colors">
                            新建数据库
                        </button>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-gray-50 text-gray-500 border-b border-gray-200">
                            <tr>
                                <th class="px-6 py-3 font-medium">数据库名称</th>
                                <th class="px-6 py-3 font-medium">来源</th>
                                <th class="px-6 py-3 font-medium">版本</th>
                                <th class="px-6 py-3 font-medium">条目数</th>
                                <th class="px-6 py-3 font-medium text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                             <tr class="hover:bg-gray-50/50">
                                <td class="px-6 py-4 font-medium text-gray-900">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">CL</div>
                                        CLCD-China-2024
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-gray-500"><span class="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs">标准</span></td>
                                <td class="px-6 py-4 text-gray-500">v1.2.0</td>
                                <td class="px-6 py-4 text-gray-500">4,231</td>
                                <td class="px-6 py-4 text-right text-[#087F9C] hover:underline cursor-pointer">管理</td>
                            </tr>
                             <tr class="hover:bg-gray-50/50">
                                <td class="px-6 py-4 font-medium text-gray-900">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">EI</div>
                                        Ecoinvent v3.9
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-gray-500"><span class="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs">标准</span></td>
                                <td class="px-6 py-4 text-gray-500">v3.9.1</td>
                                <td class="px-6 py-4 text-gray-500">18,500</td>
                                <td class="px-6 py-4 text-right text-[#087F9C] hover:underline cursor-pointer">管理</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    contentEl.innerHTML = html;
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}


/**
 * Get L2 title in Chinese
 */
function getL2Title(l2Key) {
    const map = {
        'navigation': '导航',
        'basis': '基础',
        'allocation': '分配',
        'model': '模型',
        'accounting': '核算'
    };
    return map[l2Key] || '';
}

/**
 * Update active L1 button styling
 */
function updateActiveL1(activeItemKey) {
    const l1Btns = document.querySelectorAll('[data-action="NAV_L1"]');
    l1Btns.forEach(btn => {
        const val = btn.dataset.value;
        const isActive = (val === activeItemKey);
        if (isActive) btn.classList.add('bg-white/10');
        else btn.classList.remove('bg-white/10');
    });
}

/**
 * Update active L2 button styling
 */
function updateActiveL2(activeItemKey) {
    const l2Btns = document.querySelectorAll('[data-action="NAV_L2"]');
    l2Btns.forEach(btn => {
        const val = btn.dataset.value;
        const isActive = (val === activeItemKey);
        const iconBox = btn.querySelector('.l2-icon-box');
        const label = btn.querySelector('.l2-label');

        if (isActive) {
            // Active state: cyan background on icon box, white text
            if (iconBox) {
                iconBox.classList.add('bg-[#087F9C]', 'text-white');
                iconBox.classList.remove('text-gray-500');
            }
            if (label) {
                label.classList.add('text-[#087F9C]');
                label.classList.remove('text-gray-500');
            }
        } else {
            // Inactive state: gray text, no background
            if (iconBox) {
                iconBox.classList.remove('bg-[#087F9C]', 'text-white');
                iconBox.classList.add('text-gray-500');
            }
            if (label) {
                label.classList.remove('text-[#087F9C]');
                label.classList.add('text-gray-500');
            }
        }
    });
}

/**
 * Update active L3 menu item styling
 */
function updateActiveL3(activeItemKey) {
    const l3Items = document.querySelectorAll('[data-action="NAV_L3"]');
    l3Items.forEach(item => {
        const val = item.dataset.value;
        const isActive = (val === activeItemKey);
        if (isActive) {
            // Active state: cyan background, white text
            item.classList.add('bg-[#087F9C]', 'text-white');
            item.classList.remove('text-gray-600', 'hover:bg-gray-100');
        } else {
            // Inactive state: gray text, restore hover
            item.classList.remove('bg-[#087F9C]', 'text-white');
            item.classList.add('text-gray-600');
            if (!item.classList.contains('hover:bg-gray-100')) {
                item.classList.add('hover:bg-gray-100');
            }
        }
    });
}

/**
 * Update active footer button styling
 */
function updateActiveFooter(activeKey) {
    const footerBtns = document.querySelectorAll('[data-action="OPEN_MODAL"]');
    footerBtns.forEach(btn => {
        const val = btn.dataset.value;
        const isActive = (val === activeKey);
        if (isActive) {
            btn.classList.add('bg-[#087F9C]', 'text-white');
            btn.classList.remove('text-gray-700', 'hover:bg-gray-50');
        } else {
            btn.classList.remove('bg-[#087F9C]', 'text-white');
            btn.classList.add('text-gray-700', 'hover:bg-gray-50');
        }
    });
}
