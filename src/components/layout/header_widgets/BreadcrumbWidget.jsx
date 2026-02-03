import React, { useState, useRef, useEffect } from 'react';
import { IconChevronRight, IconChevronDown, IconBox, IconLayoutDashboard } from '@tabler/icons-react';
import { useNavigation } from '../../../context/NavigationContext';

const BreadcrumbWidget = () => {
    const { activeDimension, activeMode, navigate } = useNavigation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Mock Data
    const modelName = '示例门窗系统';
    const acctName = '门窗及五金件生产';

    // Close logic
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const isVersionMode = activeMode === 'version';

    // Breadcrumb Text Logic
    const renderBreadcrumbText = () => {
        if (activeDimension === 'model_level') {
            return (
                <span className="font-medium text-gray-800">{modelName} (Model)</span>
            );
        }
        return (
            <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium hover:text-gray-700 transition-colors">
                    {modelName} (Model)
                </span>
                <IconChevronRight size={14} className="text-gray-300" />
                <span className="font-medium text-gray-800">
                    {acctName} (Acct)
                </span>
            </div>
        );
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Area */}
            <div
                onClick={() => !isVersionMode && setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-2 py-1 -ml-2 rounded-md transition-all select-none
                    ${isVersionMode
                        ? 'cursor-default opacity-80'
                        : 'cursor-pointer hover:bg-gray-100'
                    }
                `}
            >
                {renderBreadcrumbText()}

                {!isVersionMode && (
                    <IconChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                )}
            </div>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-[280px] bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        切换上下文 (Switch Context)
                    </div>

                    {/* Option: Model Level */}
                    <div
                        onClick={() => {
                            navigate('model_level');
                            setIsOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${activeDimension === 'model_level' ? 'bg-blue-50 text-[#087F9C]' : 'hover:bg-gray-50 text-gray-700'
                            }`}
                    >
                        <div className={`p-1.5 rounded ${activeDimension === 'model_level' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <IconBox size={18} />
                        </div>
                        <div>
                            <div className="text-sm font-medium">{modelName}</div>
                            <div className="text-xs opacity-70">模型层级 (Model Level)</div>
                        </div>
                        {activeDimension === 'model_level' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#087F9C]" />}
                    </div>

                    <div className="my-1 border-t border-gray-100" />

                    {/* Option: Accounting Level */}
                    <div
                        onClick={() => {
                            navigate('accounting');
                            setIsOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${activeDimension === 'accounting' ? 'bg-blue-50 text-[#087F9C]' : 'hover:bg-gray-50 text-gray-700'
                            }`}
                    >
                        <div className={`p-1.5 rounded ${activeDimension === 'accounting' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <IconLayoutDashboard size={18} />
                        </div>
                        <div>
                            <div className="text-sm font-medium">{acctName}</div>
                            <div className="text-xs opacity-70">核算层级 (Accounting Level)</div>
                        </div>
                        {activeDimension === 'accounting' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#087F9C]" />}
                    </div>

                    {/* Placeholder for others */}
                    <div className="px-4 py-2 text-xs text-gray-400 italic text-center border-t border-gray-50 mt-1">
                        + 更多核算单元...
                    </div>
                </div>
            )}
        </div>
    );
};

export default BreadcrumbWidget;
