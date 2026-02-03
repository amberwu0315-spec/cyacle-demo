import React, { useEffect, useState } from 'react';
import { useHeaderContext } from '../../../context/HeaderContext';
import { IconStar, IconTrash, IconStarFilled } from '@tabler/icons-react'; // Added Filled Star
import CenterModal from '../../common/CenterModal'; // Import new common modal
import Tooltip from '../../common/Tooltip';

const NavigationPage = () => {
    const { setActions, setTitleOverride, setLayoutConfig } = useHeaderContext();

    // UI State
    const [isStarred, setIsStarred] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Business Logic Handlers
    const toggleStar = () => setIsStarred(!isStarred);
    const handleDeleteClick = () => setIsDeleteOpen(true);
    const handleConfirmDelete = () => {
        console.log('Item Deleted');
        setIsDeleteOpen(false);
        // Toast or logic here
    };

    useEffect(() => {
        // 1. Set Title (None - handled by Workbench/Header)
        setLayoutConfig('title-only');

        // 2. Set Actions (Re-run when state changes)
        setActions(
            <div className="flex items-center gap-1">
                <Tooltip content={isStarred ? "取消关注" : "关注 (Star)"}>
                    <button
                        onClick={toggleStar}
                        className={`p-1.5 rounded-md transition-colors ${isStarred
                            ? 'text-yellow-500 hover:bg-yellow-50'
                            : 'text-gray-500 hover:text-yellow-500 hover:bg-yellow-50'
                            }`}
                    >
                        {isStarred ? <IconStarFilled size={18} /> : <IconStar size={18} />}
                    </button>
                </Tooltip>

                <Tooltip content="删除 (Delete)">
                    <button
                        onClick={handleDeleteClick}
                        className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <IconTrash size={18} />
                    </button>
                </Tooltip>
            </div>
        );

        return () => {
            setActions(null);
            setTitleOverride(null);
        };
    }, [setActions, setTitleOverride, setLayoutConfig, isStarred]); // Add isStarred dependency

    return (
        <div className="p-3 relative">
            <h2 className="text-xl font-bold mb-4">导航 (Navigation)</h2>
            <p className="text-gray-600">这里是项目导航仪表盘的内容区域。</p>

            {/* Project Navigation Content */}
            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
                    <h3 className="font-medium text-gray-800">模块 A</h3>
                </div>
                <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
                    <h3 className="font-medium text-gray-800">模块 B</h3>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <CenterModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="删除确认"
                footer={
                    <>
                        <button
                            onClick={() => setIsDeleteOpen(false)}
                            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
                        >
                            取消
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-sm"
                        >
                            确认删除
                        </button>
                    </>
                }
            >
                <div className="flex flex-col items-center justify-center text-center py-2">
                    <p className="text-base text-gray-700 font-medium mb-1">您确定要删除此项目吗？</p>
                    <p className="text-gray-500 text-xs">此操作无法撤销。</p>
                </div>
            </CenterModal>
        </div>
    );
};

export default NavigationPage;
