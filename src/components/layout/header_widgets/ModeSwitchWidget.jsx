import React from 'react';
import { useNavigation } from '../../../context/NavigationContext';

const ModeSwitchWidget = () => {
    const { activeMode, setActiveMode } = useNavigation();

    // Tab Data
    const modes = [
        { id: 'config', label: '配置模式' },
        { id: 'version', label: '版本模式' }
    ];

    return (
        <div className="flex items-center bg-gray-100 rounded-lg p-0.5 border border-gray-200 h-[28px]">
            {modes.map((mode) => {
                const isActive = activeMode === mode.id;
                return (
                    <button
                        key={mode.id}
                        onClick={() => setActiveMode(mode.id)}
                        className={`
                            px-3 h-full flex items-center justify-center text-[12px] font-medium rounded-lg transition-all
                            ${isActive
                                ? 'bg-white text-[#087F9C] shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }
                        `}
                    >
                        {mode.label}
                    </button>
                );
            })}
        </div>
    );
};

export default ModeSwitchWidget;
