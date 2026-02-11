/**
 * ModelLevelPage - 模型层级视图
 * 
 * 🏢 角色：装配线监控 (Assembly Line Monitor)
 * 📝 职责：
 * 1. 处理具体某个层级（如 L3）的模型展示。
 * 2. 包含左侧的结构树 (L3Sidebar) 和右侧的详情 (L3DetailPanel)。
 */
import React, { useEffect } from 'react';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import { useNavigation } from '../../../context/NavigationContext';
import { useViewActions } from '../../../context/ViewActionsContext'; // [新增]
import L3Sidebar from '../../layout/L3Sidebar';
import InnerDrawer from '../../common/InnerDrawer'; // [新增]

// Views
import AccountingBasic from '../l3/AccountingBasic';
import ModelEntityConfig from '../model/ModelEntityConfig';
import ActivityDataView from '../shared/ActivityDataView';
import FactorDataView from '../shared/FactorDataView';

// Data
import { modelData } from '../../../data/mockData';

// THIS IS DIMENSION B: MODEL LEVEL (The detailed view)
const ModelLevelPage = ({ activeL3, onL3Change }) => {
    const { setActions, setLayoutConfig, setBreadcrumbData } = usePagePresentation();
    const { activeMode } = useNavigation();
    const { activeModal, closeModal } = useViewActions(); // [新增]

    // Default Selection Logic
    useEffect(() => {
        if (!activeL3 && onL3Change) {
            onL3Change('mod_basic');
        }
    }, [activeL3, onL3Change]);

    useEffect(() => {
        // [修改] Activate 'model_level' dimension layout
        setLayoutConfig({ activeDimension: 'model_level', activeMode: activeMode || 'config' });

        // [新增] Set Breadcrumb
        setBreadcrumbData([
            { label: '核算', icon: null }, // Root
            { label: getL3Label(activeL3) || '当前模块' } // Child
        ]);

        setActions(null);
        return () => {
            setActions(null);
            setLayoutConfig('title-only');
            setBreadcrumbData([]);
        };
    }, [setActions, setLayoutConfig, setBreadcrumbData, activeMode, activeL3]);

    // Helper
    const getL3Label = (id) => {
        const map = {
            'mod_basic': '基本信息',
            'mod_model_config': '模型配置',
            'mod_pers_activity': '活动数据',
            'mod_pers_factor': '因子数据',
        };
        return map[id];
    };

    const renderL3Content = () => {
        switch (activeL3) {
            case 'mod_basic': return <AccountingBasic />;
            case 'mod_model_config': return <ModelEntityConfig />;
            case 'mod_pers_activity': return <ActivityDataView />;
            case 'mod_pers_factor': return <FactorDataView />;
            default: return <AccountingBasic />;
        }
    };

    const isVersionMode = activeMode === 'version';

    // Use 'model_level' for sidebar config
    return (
        <div className="w-full h-full flex flex-row relative overflow-hidden">
            {!isVersionMode && (
                <L3Sidebar activeL2="model_level" activeL3={activeL3 || 'mod_basic'} onSelect={onL3Change} />
            )}

            <main className="flex-1 bg-[#F5F6F8] relative flex flex-col overflow-hidden">
                {isVersionMode ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <div className="text-2xl font-semibold mb-2">版本模式 (Version Mode)</div>
                        <p>此处显示版本快照内容，不可编辑。</p>
                    </div>
                ) : (
                    renderL3Content()
                )}

                {/* Drawers triggered by Header Widgets via ViewActionsContext */}
                <InnerDrawer
                    isOpen={activeModal?.id === 'acct_methodology'}
                    onClose={closeModal}
                    title="方法学设置"
                >
                    <div className="p-4">
                        <h3 className="font-medium mb-2">选择核算标准</h3>
                        <div className="space-y-2">
                            <div className="p-3 bg-gray-50 rounded text-sm text-gray-500">
                                模型层级继承自上级核算配置。
                            </div>
                        </div>
                    </div>
                </InnerDrawer>

            </main>
        </div>
    );
};

export default ModelLevelPage;
