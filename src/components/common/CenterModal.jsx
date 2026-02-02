import React from 'react';
import { IconX } from '@tabler/icons-react';

export default function CenterModal({ isOpen, onClose, title, children, footer }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Card */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col items-center animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="w-full h-12 flex items-center justify-between px-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        <IconX size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="w-full p-6 text-sm text-gray-600">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="w-full p-4 bg-gray-50 rounded-b-lg flex items-center justify-end gap-3 border-t border-gray-100">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
