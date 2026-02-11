import React from 'react';
import { IconLayoutDashboard } from '@tabler/icons-react';
import { useViewActions } from '../../../context/ViewActionsContext';

const OverviewWidget = () => {
    const { openModal } = useViewActions();

    return (
        <button
            onClick={() => openModal('acct_overview')}
            className="flex items-center gap-1.5 px-2 py-1 text-[13px] text-gray-600 hover:text-[#087F9C] hover:bg-cyan-50 rounded transition-colors"
        >
            <IconLayoutDashboard size={14} />
            <span>概览</span>
        </button>
    );
};

export default OverviewWidget;
