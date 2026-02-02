import { IconX, IconStack2 } from '@tabler/icons-react';

export default function Modal({ isOpen, onClose, title, content }) {
    if (!isOpen) return null;

    return (
        <div className="absolute top-0 right-0 bottom-[40px] left-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col shadow-2xl border-4 border-[#087F9C] rounded-t-lg animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-6 border-b border-gray-200 h-[46px] shrink-0 shadow-sm z-10 bg-white rounded-t-[inherit]">
                <h2 className="text-[16px] font-bold text-[#1F2937] flex items-center gap-2">
                    <IconStack2 className="w-5 h-5 text-[#087F9C]" />
                    <span>{title}</span>
                </h2>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                >
                    <IconX className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 p-8 overflow-y-auto bg-[#F5F6F8]">
                <div className="max-w-3xl mx-auto">
                    {content || (
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center min-h-[200px]">
                            <p className="text-gray-500">
                                This is the detail view for <span className="font-bold text-gray-700">{title}</span>.
                                <br />
                                Content implementation pending.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
