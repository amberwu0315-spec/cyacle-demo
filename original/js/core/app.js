// ============================================================================
// APPLICATION CORE
// ============================================================================

/**
 * Application State
 */
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

/**
 * Initialize application
 * Called when DOM is ready
 */
function initApp() {
    console.log('[App] Initializing...');

    // 1. Initialize DOM references
    initDOM();

    // 2. Bind event listeners
    bindEvents();

    // 3. Initial UI sync
    syncUI();

    // 4. Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    console.log('[App] Ready');
}

/**
 * Bind global event listeners
 */
function bindEvents() {
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-action]');
        if (!trigger) return;

        const action = trigger.dataset.action;
        const value = trigger.dataset.value;
        const title = trigger.dataset.title;

        dispatch(action, value, title);
    });
}

/**
 * Main event dispatcher
 */
function dispatch(action, payload, title) {
    console.log(`[Dispatch] ${action}`, payload, title);

    // Close modal when navigating
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
        default:
            console.warn('Unknown action:', action);
    }

    syncUI();
}

/**
 * Navigation handlers
 */
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
    } else {
        appState.mode = MODES.WIDE;
    }
}

function handleNavL3(item) {
    appState.activeL3 = item;
}

/**
 * Utility function to toggle element visibility
 */
function toggle(el, show) {
    if (!el) return;
    if (show) el.classList.remove('hidden');
    else el.classList.add('hidden');
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
