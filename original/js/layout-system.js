// ============================================================================
// LAYOUT RENDERING SYSTEM
// ============================================================================

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
