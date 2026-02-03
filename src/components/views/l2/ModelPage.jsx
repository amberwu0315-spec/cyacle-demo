import React, { useEffect, useState } from 'react';
import { useHeaderContext } from '../../../context/HeaderContext';
import { useNavigation } from '../../../context/NavigationContext';
import { IconPlus, IconSparkles, IconBox } from '@tabler/icons-react';
import CenterModal from '../../common/CenterModal';
import Tooltip from '../../common/Tooltip';

const ModelPage = () => {
    const { setActions, setTitleOverride, setLayoutConfig } = useHeaderContext();
    const { navigate } = useNavigation();

    // UI State
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isAiOpen, setIsAiOpen] = useState(false);

    useEffect(() => {
        setTitleOverride('模型 (Model)');

        // Use 'title-only' layout (Header will match 'model' config which is Title|Actions|View)
        setLayoutConfig('title-only');

        setActions(
            <div className="flex items-center gap-2">
                <Tooltip content="创建新模型">
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-[#087F9C] hover:bg-[#076A82] rounded-md transition-colors"
                    >
                        <IconPlus size={16} />
                        <span>创建</span>
                    </button>
                </Tooltip>

                <Tooltip content="AI 生成">
                    <button
                        onClick={() => setIsAiOpen(true)}
                        className="p-1.5 text-[#087F9C] hover:bg-[#EDF7FA] rounded-md transition-colors"
                    >
                        <IconSparkles size={18} />
                    </button>
                </Tooltip>
            </div>
        );

        return () => {
            setActions(null);
            setTitleOverride(null);
        };
    }, [setActions, setTitleOverride, setLayoutConfig]);

    const handleCreateSubmit = () => {
        console.log('Model Created');
        setIsCreateOpen(false);
        // Simulate Navigation to the detailed view of the new model
        navigate('model_level');
    };

    const handleAiSubmit = () => {
        setIsAiOpen(false);
        // Simulate Navigation
        navigate('model_level');
    };

    // Dummy List of Models
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">模型管理 (Model Management)</h2>
            <p className="text-gray-600 mb-6">管理您的产品模型。</p>

            <div className="grid grid-cols-3 gap-6">
                {/* Example Model Card */}
                <div
                    onClick={() => navigate('model_level')}
                    className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-[#087F9C] cursor-pointer transition-all group"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-blue-50 text-[#087F9C] rounded-md">
                            <IconBox size={24} />
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">V1.0</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-[#087F9C] mb-1">示例门窗系统</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">这是一个示例的产品生命周期模型数据...</p>
                </div>
            </div>

            {/* Create Modal */}
            <CenterModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                title="创建新模型"
                footer={
                    <>
                        <button onClick={() => setIsCreateOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded">取消</button>
                        <button onClick={handleCreateSubmit} className="px-4 py-2 text-sm text-white bg-[#087F9C] hover:bg-[#076A82] rounded shadow-sm">确认创建</button>
                    </>
                }
            >
                <div className="space-y-4">
                    <label className="block text-xs font-medium text-gray-700 mb-1">模型名称</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#087F9C]" />
                </div>
            </CenterModal>

            {/* AI Modal */}
            <CenterModal
                isOpen={isAiOpen}
                onClose={() => setIsAiOpen(false)}
                title="AI 辅助生成"
                footer={
                    <>
                        <button onClick={() => setIsAiOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded">取消</button>
                        <button onClick={handleAiSubmit} className="px-4 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded shadow-sm">开始生成</button>
                    </>
                }
            >
                <div className="flex flex-col items-center justify-center py-4 text-center">
                    <IconSparkles className="w-10 h-10 text-purple-500 mb-3" />
                    <p className="text-gray-700">Cyacle Copilot 将协助您自动构建模型结构。</p>
                </div>
            </CenterModal>
        </div>
    );
};

export default ModelPage;
