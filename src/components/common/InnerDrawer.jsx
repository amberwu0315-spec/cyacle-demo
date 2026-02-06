import React from 'react';
import { IconX } from '@tabler/icons-react';

export default function InnerDrawer({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="absolute top-0 right-0 bottom-0 w-[350px] bg-white border-l border-gray-200 shadow-xl z-20 flex flex-col animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="h-[46px] flex items-center justify-between px-4 border-b border-gray-100 shrink-0 bg-gray-50/80">
                <h3 className="font-bold text-gray-700 text-sm">{title}</h3>
                <button
                    onClick={onClose}
                    className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <IconX size={16} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-white">
                {children}
            </div>
        </div>
    );
}
