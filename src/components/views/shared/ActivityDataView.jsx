import React from 'react';
import { useNavigation } from '../../../context/NavigationContext';

const ActivityDataView = () => {
    const { activeDimension } = useNavigation();

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Activity Data (透视)</h2>
            <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
                <p className="text-gray-600 mb-2">
                    Current Scope: <span className="font-semibold text-[#087F9C] uppercase">{activeDimension}</span>
                </p>
                <div className="h-64 bg-gray-50 flex items-center justify-center rounded border border-dashed border-gray-300 text-gray-400">
                    Activity Data Table for {activeDimension === 'accounting' ? 'Accounting Instance' : 'Model Definition'}
                </div>
            </div>
        </div>
    );
};

export default ActivityDataView;
