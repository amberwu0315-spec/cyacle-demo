// ============================================================================
// DOM REFERENCES
// ============================================================================

/**
 * Global DOM element cache
 * Initialized in core/app.js after DOM is ready
 */
const DOM = {
    views: {
        workbench: null,      // #workbench
        l2Sidebar: null,      // #l2-sidebar
        l3Sidebar: null,      // #l3-sidebar
        header: null,         // #main-header
        mainContent: null,    // #main-content
        footer: null          // #main-footer
    },
    modal: {
        overlay: null,        // #modal-overlay
        container: null,      // #modal-container
        title: null,          // #modal-title
        content: null         // #modal-content
    }
};

/**
 * Initialize DOM references
 * Should be called once after DOM is loaded
 */
function initDOM() {
    // Views
    DOM.views.workbench = document.getElementById('workbench');
    DOM.views.l2Sidebar = document.getElementById('l2-sidebar');
    DOM.views.l3Sidebar = document.getElementById('l3-sidebar');
    DOM.views.header = document.getElementById('main-header');
    DOM.views.mainContent = document.getElementById('main-content');
    DOM.views.footer = document.getElementById('main-footer');

    // Modal
    DOM.modal.overlay = document.getElementById('modal-overlay');
    DOM.modal.container = document.getElementById('modal-container');
    DOM.modal.title = document.getElementById('modal-title');
    DOM.modal.content = document.getElementById('modal-content');

    console.log('[DOM] References initialized');
}
