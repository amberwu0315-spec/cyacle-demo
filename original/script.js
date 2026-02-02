/**
 * Carbon SPA - Core Logic
 */

/* --- State --- */
const MODES = {
    HOME: 'MODE_HOME',   // Dashboard
    WIDE: 'MODE_WIDE',   // Project (Full Width)
    SPLIT: 'MODE_SPLIT'  // Project (Sidebar + Content)
};

const appState = {
    mode: MODES.HOME,
    activeL1: 'home',    // home, background_data, project_mgmt, enterprise
    activeL2: null,      // e.g., 'accounting', 'model', 'basis', 'navigation'
    activeL3: 'acct_basic', // Default L3 item
    isModalOpen: false,
    activeFooterAction: null, // Tracks which footer button is active (value)
    modalTitle: '属性详情'      // Dynamic modal title
};

/* --- Logic --- */

function dispatch(action, payload, title) {
    console.log(`[Dispatch] ${action}`, payload, title);

    if ((action === 'NAV_L1' || action === 'NAV_L2' || action === 'NAV_L3') && appState.isModalOpen) {
        appState.isModalOpen = false;
        appState.activeFooterAction = null;
    }

    switch (action) {
        case 'NAV_L1':
            handleNavL1(payload);
            break;
        case 'NAV_L2':
            handleNavL2(payload);
            break;
        case 'NAV_L3':
            handleNavL3(payload);
            break;
        case 'OPEN_MODAL':
            if (appState.isModalOpen && appState.activeFooterAction === payload) {
                appState.isModalOpen = false;
                appState.activeFooterAction = null;
            } else {
                appState.isModalOpen = true;
                appState.activeFooterAction = payload;
                if (title) appState.modalTitle = title;
            }
            break;
        case 'CLOSE_MODAL':
            appState.isModalOpen = false;
            appState.activeFooterAction = null;
            break;
        default:
            console.warn('Unknown action:', action);
    }

    syncUI();
}

function handleNavL1(target) {
    appState.activeL1 = target;
    if (target === 'project_tag') {
        appState.mode = MODES.WIDE;
        appState.activeL2 = 'navigation'; // Default L2
    } else {
        appState.mode = MODES.HOME;
        appState.activeL2 = null;
    }
}

function handleNavL2(item) {
    appState.activeL2 = item;
    if (item === 'accounting') {
        appState.mode = MODES.SPLIT;
        // Keep existing activeL3 or reset to default if logic required
    } else {
        appState.mode = MODES.WIDE;
    }
}

function handleNavL3(item) {
    appState.activeL3 = item;
}

/* --- UI Updates --- */

const DOM = {
    root: document.getElementById('app-root'),
    views: {
        l2Sidebar: document.getElementById('l2-sidebar'),
        mainHeader: document.getElementById('main-header'),
        mainFooter: document.getElementById('main-footer'),

        dashboard: document.getElementById('dashboard-view'),
        projectWrapper: document.getElementById('project-view-wrapper'),

        l3Sidebar: document.getElementById('l3-sidebar'),
        mainContent: document.getElementById('main-content'),

        modal: document.getElementById('footer-modal'),
        modalTitleText: document.getElementById('modal-title-text')
    },
    triggers: {
        l1: document.querySelectorAll('[data-action="NAV_L1"]'),
        l2: document.querySelectorAll('[data-action="NAV_L2"]'),
        l3: document.querySelectorAll('[data-action="NAV_L3"]'),
        footer: document.querySelectorAll('[data-action="OPEN_MODAL"]')
    }
};

function syncUI() {
    const { mode, activeL1, activeL2, activeL3, isModalOpen, activeFooterAction, modalTitle } = appState;

    const isProjectLayout = (activeL1 === 'project_tag');

    // 1. Layout Structure Toggles (The Lossless Refactor Logic)
    toggle(DOM.views.l2Sidebar, isProjectLayout);

    // Header Visibility logic
    const activeL1HeaderItems = ['background_data', 'project_mgmt', 'enterprise'];
    const showHeader = isProjectLayout || activeL1HeaderItems.includes(activeL1);

    toggle(DOM.views.mainHeader, showHeader);
    toggle(DOM.views.mainFooter, isProjectLayout);

    // Header Content
    const headerTitleEl = document.getElementById('header-title');
    const headerBreadcrumb = document.getElementById('header-breadcrumb');

    // User Request: No "Project /" breadcrumb anymore
    toggle(headerBreadcrumb, false);

    if (headerTitleEl) {
        let title = '';
        if (isProjectLayout) {
            // Project Mode: Show L2 Name (Chinese Only)
            title = getL2Title(activeL2);
        } else if (showHeader) {
            // L1 Header Mode: Show L1 Name (Chinese Only)
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
    toggle(DOM.views.dashboard, !isProjectLayout);
    toggle(DOM.views.projectWrapper, isProjectLayout);

    // Update Dashboard Title (Safety logic)
    if (!isProjectLayout) {
        const dashboardTitle = DOM.views.dashboard.querySelector('h1');
        if (dashboardTitle) {
            const activeL1HeaderItems = ['background_data', 'project_mgmt', 'enterprise'];
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
        // L3 Sidebar Visibility
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
    toggle(DOM.views.modal, isModalOpen);
    if (isModalOpen && DOM.views.modalTitleText) {
        DOM.views.modalTitleText.textContent = modalTitle;
    }

    // 4. L1 Active State
    updateActiveL1(activeL1);
}

function toggle(el, show) {
    if (!el) return;
    if (show) el.classList.remove('hidden');
    else el.classList.add('hidden');
}

// ============================================================================
// LAYOUT RENDERING SYSTEM
// ============================================================================

/**
 * Create a standard content module with status variants
 * @param {string} title - Module title
 * @param {string} content - Module content (HTML string)
 * @param {string} status - Status: 'default', 'added', 'deleted'
 * @returns {string} HTML string
 */
function createModule(title, content, status = 'default') {
    const statusStyles = {
        'default': '',
        'added': 'border-l-4 border-[#29AC68]',
        'deleted': 'border-l-4 border-[#E38585]'
    };

    const titleStyles = {
        'default': 'text-gray-800',
        'added': 'text-[#29AC68]',
        'deleted': 'text-[#C6C6C6] line-through'
    };

    return `
        <div class="bg-white rounded-md shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] overflow-hidden ${statusStyles[status]}" data-status="${status}">
            <div class="p-6 flex flex-col gap-4">
                <div class="border-b border-gray-100 pb-3">
                    <h2 class="text-lg font-medium ${titleStyles[status]}">${title}</h2>
                </div>
                <div class="flex-1 text-sm text-gray-600">
                    ${content}
                </div>
            </div>
        </div>
    `;
}

/**
 * Render Layout-A: 左右非对称大屏 (12列网格, 4:8比例)
 * @param {Array} modules - Array of HTML strings [left, rightTop1, rightTop2, rightMid, rightBottom]
 * @returns {string} HTML string
 */
function renderLayoutA(modules) {
    return `
        <div class="grid grid-cols-12 gap-3">
            <!-- Zone Left: 左侧窄栏 (4列) -->
            <div class="col-span-4 h-full">
                ${modules[0] || ''}
            </div>
            
            <!-- Zone Right: 右侧宽栏 (8列) -->
            <div class="col-span-8 flex flex-col gap-3">
                <!-- Row 1: 顶部双卡片 -->
                <div class="grid grid-cols-2 gap-3">
                    <div>${modules[1] || ''}</div>
                    <div>${modules[2] || ''}</div>
                </div>
                
                <!-- Row 2: 中部通栏 -->
                ${modules[3] ? `<div>${modules[3]}</div>` : ''}
                
                <!-- Row 3: 底部通栏 -->
                ${modules[4] ? `<div>${modules[4]}</div>` : ''}
            </div>
        </div>
    `;
}

/**
 * Render Layout-B: 垂直堆叠流 (单列布局)
 * @param {Array} modules - Array of HTML strings
 * @returns {string} HTML string
 */
function renderLayoutB(modules) {
    return `
        <div class="flex flex-col gap-3">
            ${modules.map(m => `<div class="w-full">${m}</div>`).join('')}
        </div>
    `;
}

/**
 * Render Layout-C: 顶部栏+画布填充 (固定顶栏+填充画布)
 * @param {Object} config - {toolbar: string, canvas: string}
 * @returns {string} HTML string
 */
function renderLayoutC(config) {
    return `
        <div class="flex flex-col h-full">
            <!-- Top Bar: 工具栏/筛选栏 (固定高度) -->
            <div class="h-16 shrink-0 flex items-center gap-4 px-6 bg-white border-b border-gray-200 rounded-t-md">
                ${config.toolbar || '<!-- 工具栏 -->'}
            </div>
            
            <!-- Main Body: 主体画布 (填满剩余空间) -->
            <div class="flex-1 overflow-auto bg-white rounded-b-md">
                ${config.canvas || '<!-- 主体内容 -->'}
            </div>
        </div>
    `;
}

/**
 * Render Layout-D: 详情弹窗布局 (3列网格, 2:1比例)
 * @param {Array} modules - Array of HTML strings [main1, main2, side1, side2, side3, ...]
 * @returns {string} HTML string
 */
function renderLayoutD(modules) {
    const mainModules = modules.slice(0, 2);
    const sideModules = modules.slice(2);

    return `
        <div class="grid grid-cols-3 gap-3">
            <!-- Zone Left: 左侧主内容 (2列) -->
            <div class="col-span-2 flex flex-col gap-3">
                ${mainModules.map(m => `<div>${m}</div>`).join('')}
            </div>
            
            <!-- Zone Right: 右侧辅助信息 (1列) -->
            <div class="col-span-1 flex flex-col gap-3">
                ${sideModules.map(m => `<div>${m}</div>`).join('')}
            </div>
        </div>
    `;
}

/**
 * Main layout renderer
 * @param {string} layoutType - 'layout-a', 'layout-b', 'layout-c', 'layout-d'
 * @param {Array|Object} data - Layout-specific data
 * @returns {string} HTML string
 */
function renderLayout(layoutType, data) {
    switch (layoutType) {
        case 'layout-a':
            return renderLayoutA(data);
        case 'layout-b':
            return renderLayoutB(data);
        case 'layout-c':
            return renderLayoutC(data);
        case 'layout-d':
            return renderLayoutD(data);
        default:
            return '<div class="text-gray-400 text-center p-8">Unknown layout type</div>';
    }
}

// ============================================================================
// CONTENT PLACEHOLDER UPDATES
// ============================================================================

function updateMainContentPlaceholder(activeL2, activeL3) {
    // Safety check for mainContent element
    if (!DOM.views.mainContent) return;

    let content = '';

    // Split Mode (Accounting) -> Use L3 Content
    if (activeL2 === 'accounting') {
        const l3Map = {
            'acct_basic': '基本信息 (Basic Info)',
            'acct_config': '模型配置与结果 (Configuration)',
            'acct_tools': '分析工具 (Tools)',
            'acct_calc': '计算与分析 (Calculation)',
            'pers_activity': '活动数据 (Activity Data)',
            'pers_factor': '因子数据 (Factor Data)',
            'rpt_info': '报告信息 (Report Info)',
            'rpt_export': '导出数值 (Export)',
            'rpt_main': '报告 (Main Report)',
            'rpt_vouchers': '凭证管理 (Vouchers)',
            'rpt_sheet': '计算表 (Calculation Sheet)',
            'app_cpcd': 'CPCD信息 (CPCD Info)',
            'cmp_list': '对比核算列表 (Comparison List)',
            'cmp_config': '对比配置调整 (Comparison Config)',
            'cmp_detail': '对比标识详情 (Detail)',
            'cmp_result': '对比分析结果 (Comparison Result)'
        };
        const pageTitle = l3Map[activeL3] || 'Accounting View';

        // Route to Layout Mapping (L3 Level)
        if (activeL3 === 'acct_basic') {
            // Layout-C: 顶部栏+画布填充
            content = renderLayout('layout-c', {
                toolbar: `
                    <button class="px-4 py-2 bg-[#087F9C] text-white rounded text-sm hover:bg-[#066C85] transition-colors">
                        <i data-lucide="plus" class="w-4 h-4 inline-block mr-1"></i>
                        新增
                    </button>
                    <button class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
                        <i data-lucide="filter" class="w-4 h-4 inline-block mr-1"></i>
                        筛选
                    </button>
                `,
                canvas: `
                    <div class="flex items-center justify-center h-full text-gray-400">
                        <div class="text-center">
                            <i data-lucide="database" class="w-16 h-16 mx-auto mb-4 text-gray-300"></i>
                            <p class="text-lg">${pageTitle}</p>
                            <p class="text-sm mt-2">画布区域 - 可放置表格、图表等</p>
                        </div>
                    </div>
                `
            });
        }
        else if (activeL3 === 'acct_config') {
            // Layout-A: 左右非对称大屏
            const modules = [
                createModule('配置面板', '<p>左侧配置选项</p><ul class="list-disc list-inside mt-2"><li>模型参数</li><li>计算规则</li><li>边界条件</li></ul>'),
                createModule('新增配置', '<p>右侧顶部 - 新增的配置项</p>', 'added'),
                createModule('删除配置', '<p>右侧顶部 - 已删除的配置项</p>', 'deleted'),
                createModule('计算结果', '<p>中部通栏 - 计算结果展示区域</p>')
            ];
            content = renderLayout('layout-a', modules);
        }
        else if (activeL3 === 'pers_activity' || activeL3 === 'pers_factor') {
            // Layout-C: 顶部栏+画布填充
            content = renderLayout('layout-c', {
                toolbar: `
                    <input type="text" placeholder="搜索..." class="px-3 py-1.5 border border-gray-300 rounded text-sm w-64">
                    <button class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
                        <i data-lucide="download" class="w-4 h-4 inline-block mr-1"></i>
                        导出
                    </button>
                `,
                canvas: `
                    <div class="p-6">
                        <div class="border border-gray-200 rounded">
                            <table class="w-full text-sm">
                                <thead class="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th class="px-4 py-3 text-left font-medium text-gray-700">名称</th>
                                        <th class="px-4 py-3 text-left font-medium text-gray-700">类型</th>
                                        <th class="px-4 py-3 text-left font-medium text-gray-700">数值</th>
                                        <th class="px-4 py-3 text-left font-medium text-gray-700">单位</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-b border-gray-100">
                                        <td class="px-4 py-3 text-gray-600" colspan="4">
                                            <div class="text-center text-gray-400 py-8">
                                                <i data-lucide="inbox" class="w-12 h-12 mx-auto mb-2 text-gray-300"></i>
                                                <p>暂无数据</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                `
            });
        }
        else {
            // Default placeholder for other L3 items
            content = `
                <div class="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400">
                    <h2 class="text-xl font-medium text-gray-600 mb-2">${pageTitle}</h2>
                    <p>Split Mode Content (Accounting Tree Active)</p>
                </div>
            `;
        }
    }
    // Wide Mode (L2 Level) -> Use Layout-B
    else {
        const l2Map = {
            'model': '模型配置 (Model View)',
            'basis': '基础数据 (Basis View)',
            'allocation': '分配规则 (Allocation View)',
            'navigation': '项目导航 (Navigation View)'
        };
        const pageTitle = l2Map[activeL2] || 'Project View';

        // Layout-B: 垂直堆叠流 (for all L2 items)
        const modules = [
            createModule(pageTitle, `<p>这是 ${pageTitle} 的主要内容区域</p><p class="mt-2 text-gray-500">使用 Layout-B 垂直堆叠布局</p>`),
            createModule('相关配置', '<p>配置项内容</p>'),
            createModule('操作记录', '<p>操作历史记录</p>')
        ];
        content = renderLayout('layout-b', modules);
    }

    DOM.views.mainContent.innerHTML = content;

    // Re-initialize lucide icons for dynamically added content
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function updateActiveL1(activeItemKey) {
    // Re-query in case DOM changed (though triggers are static)
    const l1Btns = document.querySelectorAll('[data-action="NAV_L1"]');
    l1Btns.forEach(btn => {
        const val = btn.dataset.value;
        const isActive = (val === activeItemKey);
        if (isActive) btn.classList.add('bg-white/10');
        else btn.classList.remove('bg-white/10');
    });
}

function getL2Title(val) {
    const map = {
        'navigation': '导航',
        'model': '模型',
        'accounting': '核算',
        'basis': '基础',
        'allocation': '分配'
    };
    return map[val] || '项目视图';
}

function updateActiveL2(activeItem) {
    const headerTitleEl = document.getElementById('header-title');
    if (headerTitleEl) {
        headerTitleEl.textContent = getL2Title(activeItem);
    }

    // Re-query L2 triggers as they might be dynamic or just to be safe
    const l2Btns = document.querySelectorAll('[data-action="NAV_L2"]');
    l2Btns.forEach(btn => {
        const val = btn.dataset.value;
        const iconBox = btn.querySelector('.l2-icon-box') || btn.querySelector('div');
        const label = btn.querySelector('.l2-label') || btn.querySelector('span');

        // Reset
        if (iconBox) iconBox.className = 'l2-icon-box w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 transition-transform hover:scale-105';
        if (label) label.className = 'l2-label text-[14px] text-gray-500 font-medium';

        // Active
        if (val === activeItem) {
            if (iconBox) {
                iconBox.classList.remove('text-gray-500');
                iconBox.classList.add('bg-[#087F9C]', 'text-white', 'shadow-sm');
            }
            if (label) {
                label.classList.remove('text-gray-500');
                label.classList.add('text-[#087F9C]');
            }
        }
    });
}

function updateActiveL3(activeItem) {
    const l3Btns = document.querySelectorAll('[data-action="NAV_L3"]');
    l3Btns.forEach(btn => {
        const val = btn.dataset.value;

        // Reset Style
        btn.className = 'l3-btn w-full flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors text-left';

        if (val === activeItem) {
            // Active Style (Cyan Bg + White Text)
            btn.classList.add('bg-[#087F9C]', 'text-white', 'font-medium');
        } else {
            // Inactive Style (Gray Text + Hover)
            btn.classList.add('text-gray-600', 'hover:bg-gray-100/50');
        }
    });
}

function updateActiveFooter(val) {
    document.querySelectorAll('.footer-btn').forEach(btn => {
        const isMatch = btn.dataset.value === val;

        // Allow toggling off if clicking same item? Logic says show modal.
        // If modal is open, highlight.

        if (isMatch) {
            // Active: Cyan bg, White text
            btn.classList.add('bg-[#087F9C]', 'text-white');
            btn.classList.remove('text-gray-700', 'hover:bg-gray-50');
        } else {
            // Inactive: Transparent (White) bg, Gray text
            btn.classList.remove('bg-[#087F9C]', 'text-white');
            btn.classList.add('text-gray-700', 'hover:bg-gray-50');
        }
    });
}

/* --- Initialization --- */

document.addEventListener('DOMContentLoaded', () => {
    DOM.root.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;
        const action = target.dataset.action;
        const value = target.dataset.value;
        const title = target.dataset.title;
        dispatch(action, value, title);
    });

    syncUI();
    console.log('Carbon Schema Engine Initialized (Refactored)');
});
