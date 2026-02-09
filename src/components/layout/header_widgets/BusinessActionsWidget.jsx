import React from 'react';
import { usePagePresentation } from '../../../context/PagePresentationContext';

const BusinessActionsWidget = () => {
    const { actions } = usePagePresentation();
    return (
        <div className="flex items-center gap-2">
            {actions}
        </div>
    );
};

export default BusinessActionsWidget;
