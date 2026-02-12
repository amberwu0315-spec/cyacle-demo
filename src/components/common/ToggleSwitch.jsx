import React from 'react';

const ToggleSwitch = ({ checked, onChange }) => (
    <div
        className={`relative inline-flex items-center w-9 h-5 rounded-full cursor-pointer transition-all duration-300 ease-out border ${checked ? 'bg-primary-action border-primary-action' : 'bg-gray-200 border-gray-200'}`}
        onClick={(e) => {
            e.stopPropagation();
            onChange(!checked);
        }}
    >
        <span className={`absolute left-0.5 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </div>
);

export default ToggleSwitch;
