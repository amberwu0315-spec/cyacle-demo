import React from 'react';
import { Checkbox as MantineCheckbox } from '@mantine/core';

/**
 * Checkbox Component (Mantine Wrapper)
 * Standardized checkbox with strict Cyan styling (#087F9C)
 */
const Checkbox = ({
    checked,
    onChange,
    label,
    disabled = false,
    className = ''
}) => {
    return (
        <MantineCheckbox
            checked={checked}
            onChange={onChange}
            label={label}
            disabled={disabled}
            className={className}
            color="#087F9C"
            classNames={{
                input: 'cursor-pointer data-[checked]:bg-[#087F9C] data-[checked]:border-[#087F9C]',
                label: 'cursor-pointer text-sm text-gray-600'
            }}
            styles={{
                input: { borderRadius: '2px' }
            }}
        />
    );
};

export default Checkbox;
