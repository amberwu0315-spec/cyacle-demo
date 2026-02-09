import React from 'react';
import { usePagePresentation } from '../../../context/PagePresentationContext';

const TitleWidget = ({ title }) => {
    const { titleOverride } = usePagePresentation();
    return (
        <h1 className="text-base font-medium text-gray-800 tracking-tight">
            {titleOverride || title || 'Project'}
        </h1>
    );
};

export default TitleWidget;
