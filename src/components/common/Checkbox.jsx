import React from 'react';
import { Checkbox as MantineCheckbox, Tooltip } from '@mantine/core';

/**
 * Checkbox Component (Mantine Wrapper)
 * Standardized checkbox with strict Cyan styling (#087F9C)
 */
const Checkbox = ({
    checked,
    indeterminate,
    onChange,
    label,
    disabled = false,
    tooltip,
    className = ''
}) => {
    const checkboxElement = (
        <MantineCheckbox
            checked={checked}
            indeterminate={indeterminate}
            onChange={onChange}
            label={label}
            disabled={disabled}
            className={className}
            color="#087F9C"
            classNames={{
                input: `cursor-pointer 
                    data-[checked]:bg-[#087F9C] data-[checked]:border-[#087F9C] 
                    data-[indeterminate]:bg-[#087F9C] data-[indeterminate]:border-[#087F9C]
                    disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-not-allowed
                    data-[checked]:disabled:bg-gray-300 data-[checked]:disabled:border-gray-300 data-[checked]:disabled:text-gray-500`,
                label: `text-sm text-gray-500 ${disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'}`
            }}
            styles={{
                input: { borderRadius: '2px' }
            }}
        />
    );

    if (tooltip) {
        return (
            <Tooltip
                label={tooltip}
                multiline
                w={260}
                withArrow
                position="top"
                className="text-xs"
                color="dark"
            >
                <div>{checkboxElement}</div>
            </Tooltip>
        );
    }

    return checkboxElement;
};

export default Checkbox;
