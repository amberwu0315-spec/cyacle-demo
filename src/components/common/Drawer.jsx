import React, { useEffect } from 'react';
import { IconX } from '@tabler/icons-react';
import Button from './Button';

export default function Drawer({ isOpen, onClose, title, children }) {
    // Close on escape
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-[60]"
                onClick={onClose}
            ></div>

            {/* Panel */}
            <div className="fixed top-0 right-0 bottom-0 w-[400px] bg-white shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-100">
                {/* Header */}
                <div className="h-[46px] flex items-center justify-between px-4 border-b border-gray-200 shrink-0 bg-white">
                    <h3 className="font-bold text-gray-700">{title}</h3>
                    <Button
                        variant="ghost"
                        size="md"
                        onClick={onClose}
                        className="p-0 w-8 h-8 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                        icon={IconX}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>
            </div>
        </>
    );
}
