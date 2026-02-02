// ============================================================================
// MODULE FACTORY
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
