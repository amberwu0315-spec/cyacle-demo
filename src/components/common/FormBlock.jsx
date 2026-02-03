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
    // 1. Recursive function to find all labels, including nested ones
    const findLabels = (nodes) => {
        let foundLabels = [];
        React.Children.forEach(nodes, child => {
            if (!React.isValidElement(child)) return;

            // If it's an EditableField (or has a label prop), add to list
            if (child.props.label) {
                foundLabels.push(child.props.label);
            }

            // Recursively scan children (fragments, or just nested divs)
            if (child.props.children) {
                foundLabels = [...foundLabels, ...findLabels(child.props.children)];
            }
        });
        return foundLabels;
    };

    const labels = findLabels(children);
    const maxLabelLen = labels.reduce((max, curr) => Math.max(max, curr.length), 0);

    /**
     * Map length to a fixed set of width classes to maintain consistency across the app.
     * We use min-width to ensure the column doesn't collapse.
     * Scale (Simplified): 4 chars ~ 80px, 8 chars ~ 120px, 12 chars ~ 160px
     */
    let labelWidthClass = 'w-[140px]'; // Default fallback
    if (maxLabelLen <= 4) labelWidthClass = 'w-[80px]';
    else if (maxLabelLen <= 6) labelWidthClass = 'w-[100px]';
    else if (maxLabelLen <= 10) labelWidthClass = 'w-[140px]';
    else if (maxLabelLen > 10) labelWidthClass = 'w-[180px]'; // Fallback for very long labels

    // 2. Recursive function to clone children and inject props
    const injectProps = (nodes) => {
        return React.Children.map(nodes, child => {
            if (!React.isValidElement(child)) return child;

            // Inject props if it's an EditableField
            if (child.type === EditableField) {
                return React.cloneElement(child, {
                    layout: 'table',
                    labelWidth: labelWidthClass // Pass the calculated width down
                });
            }

            // Recursively inject into children (e.g. for Fragments or Wrappers)
            if (child.props.children) {
                return React.cloneElement(child, {
                    children: injectProps(child.props.children)
                });
            }

            return child;
        });
    };

    const childrenWithProps = injectProps(children);

    return (
        <div className={`px-3 pt-2 pb-3 bg-white flex flex-col ${className}`}>
            <table className="w-full border-separate border-spacing-y-1 table-fixed">
                <colgroup>
                    {/* Fixed width for the first column to ensure vertical baseline is constant */}
                    <col className={labelWidthClass} />
                    <col />
                </colgroup>
                <tbody>
                    {childrenWithProps}
                </tbody>
            </table>
        </div>
    );
};

export default FormBlock;

