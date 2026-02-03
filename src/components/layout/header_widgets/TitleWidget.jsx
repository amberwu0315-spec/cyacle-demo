import React from 'react';
import { useHeaderContext } from '../../../context/HeaderContext';

const TitleWidget = () => {
    const { titleOverride } = useHeaderContext();
    return (
        <h1 className="text-base font-medium text-gray-800 tracking-tight">
            {titleOverride || 'Project'}
        </h1>
    );
};

export default TitleWidget;
