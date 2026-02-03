import React from 'react';
import { useHeaderContext } from '../../../context/HeaderContext';

const BusinessActionsWidget = () => {
    const { actions } = useHeaderContext();
    return (
        <div className="flex items-center gap-2">
            {actions}
        </div>
    );
};

export default BusinessActionsWidget;
