import React from 'react';
import { usePagePresentation } from '../../../context/PagePresentationContext';

const TitleWidget = ({ title }) => {
    const { titleOverride } = usePagePresentation();
    return (
        <h1 className="text-[15px] font-semibold text-slate-800 tracking-[0.01em] truncate">
            {titleOverride || title || 'Project'}
        </h1>
    );
};

export default TitleWidget;
