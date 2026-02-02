import React, { useEffect, useState } from 'react';
import { useHeaderContext } from '../../../context/HeaderContext';
import { IconPlus } from '@tabler/icons-react';
import CenterModal from '../../common/CenterModal'; // Import Modal
import Tooltip from '../../common/Tooltip';

const AllocationPage = () => {
    const { setActions, setTitleOverride, setLayoutConfig } = useHeaderContext();
    const [isCreateOpen, setIsCreateOpen] = useState(false); // Modal State

    useEffect(() => {
        setTitleOverride('分配规则');
        setLayoutConfig('title-only');

        setActions(
            <div className="flex items-center gap-1">
                <Tooltip content="创建分配规则">
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-[#087F9C] hover:bg-[#076A82] rounded-md transition-colors"
                    >
                        <IconPlus size={16} />
                        <span>创建</span>
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
        console.log('Allocation Rule Created');
        setIsCreateOpen(false);
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">分配 (Allocation)</h2>
            <p className="text-gray-600">管理分配规则。</p>

            {/* Create Modal */}
            <CenterModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                title="创建分配规则"
                footer={
                    <>
                        <button
                            onClick={() => setIsCreateOpen(false)}
                            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
                        >
                            取消
                        </button>
                        <button
                            onClick={handleCreateSubmit}
                            className="px-4 py-2 text-sm text-white bg-[#087F9C] hover:bg-[#076A82] rounded-md transition-colors shadow-sm"
                        >
                            确认创建
                        </button>
                    </>
                }
            >
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">规则名称</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#087F9C]" placeholder="输入分配规则名称..." />
                </div>
            </CenterModal>
        </div>
    );
};

export default AllocationPage;
