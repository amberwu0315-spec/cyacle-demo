import React, { useEffect } from 'react';
import { useHeaderContext } from '../../../context/HeaderContext';
import { useNavigation } from '../../../context/NavigationContext';
import L3Sidebar from '../../layout/L3Sidebar';

// Views
import AccountingBasic from '../l3/AccountingBasic';
import ModelEntityConfig from '../model/ModelEntityConfig';
import ActivityDataView from '../shared/ActivityDataView';
import FactorDataView from '../shared/FactorDataView';

// THIS IS DIMENSION B: MODEL LEVEL (The detailed view)
const ModelLevelPage = ({ activeL3, onL3Change }) => {
    const { setActions, setLayoutConfig } = useHeaderContext();
    const { activeMode } = useNavigation();

    // Default Selection Logic
    useEffect(() => {
        if (!activeL3 && onL3Change) {
            onL3Change('mod_basic');
        }
    }, [activeL3, onL3Change]);

    useEffect(() => {
        // Use Breadcrumb Layout
        setLayoutConfig('breadcrumb');
        setActions(null);
        return () => {
            setActions(null);
            setLayoutConfig('title-only');
        };
    }, [setActions, setLayoutConfig]);

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
            </main>
        </div>
    );
};

export default ModelLevelPage;
