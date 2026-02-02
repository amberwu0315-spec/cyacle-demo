import React, { useEffect, useState } from 'react';
import EditableField from './EditableField';

/**
 * FormBlock Component
 * 
 * A content block for displaying form fields (read-only or editable).
 * Provides consistent padding and layout for field groups.
 * Automatically calculates the maximum label width based on the longest label in the block.
 * 
 * Props:
 * - children: Field components or other form elements
 * - className: Additional CSS classes
 * 
 * Spacing Rules:
 * - Left/Right padding: 12px (px-3)
 * - Bottom padding: 12px (pb-3)
 * - Top padding: 8px (pt-2) - gap from header
 * - Gap between fields: 2px (gap-0.5)
 * 
 * Label Width Auto-Calculation:
 * - Scans all EditableField children for label prop
 * - Calculates maximum label length
 * - Maps to Tailwind width classes (w-16, w-20, w-24, w-28, w-32, w-36, w-40)
 * - Injects labelWidth prop into all EditableField children
 */
const FormBlock = ({ children, className = '' }) => {
    // Clone children and inject layout prop
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === EditableField) {
            return React.cloneElement(child, { layout: 'table' });
        }
        return child;
    });

    return (
        <div className={`px-3 pt-2 pb-3 bg-white flex flex-col ${className}`}>
            <table className="w-full border-separate border-spacing-y-1">
                <tbody>
                    {childrenWithProps}
                </tbody>
            </table>
        </div>
    );
};

export default FormBlock;

