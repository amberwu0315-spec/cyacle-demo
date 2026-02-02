// ============================================================================
// CONTENT RENDERER
// ============================================================================

/**
 * Update main content area based on active L2/L3 navigation
 * @param {string} activeL2 - Active L2 navigation item
 * @param {string} activeL3 - Active L3 navigation item
 */
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
