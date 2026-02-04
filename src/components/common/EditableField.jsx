import React, { useState, useRef, useEffect } from 'react';
import { TextInput, NumberInput, Select, Textarea, useCombobox } from '@mantine/core';
import { IconPencil, IconCheck, IconX, IconRotate, IconTextPlus, IconInfoCircle } from '@tabler/icons-react';

/**
 * EditableField Component
 * 
 * A reusable field that supports inline editing with Key-Value horizontal layout.
 * 
 * Props:
 * - label: Field label (e.g., "模型名称")
 * - value: Current value (string, number, or object for dataCard type)
 * - onSave: Callback when saving (newValue) => void
 * - type: 'text' | 'textarea' | 'number' | 'select' | 'date' | 'dataCard' (default: 'text')
 * - options: For select type, array of {value, label}
 * - dataCardOptions: For dataCard type, array of {id, name, ...}
 * - unit: For number type, unit suffix (e.g., 'kg', '%', '元')
 * - min: For number type, minimum value
 * - max: For number type, maximum value
 * - step: For number type, step increment
 * - maxLength: For textarea type, maximum character count
 * - rows: For textarea type, number of rows (default: 3)
 * - labelWidth: Dynamic label width class from FormBlock (e.g., 'w-24', 'w-32')
 * - helpIcon: Whether to show help icon next to label
 * - helpText: Help text to display in tooltip
 */
const EditableField = ({
    label,
    value,
    onSave,
    type = 'text',
    options = [],
    dataCardOptions = [],
    unit = '',
    min,
    max,
    step,
    maxLength,
    rows = 3,
    labelWidth = 'w-24', // Default for flex layout
    helpIcon = false,
    helpText = '',
    layout = 'flex', // 'flex' | 'table'
    children,
    ...rest
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const textareaRef = useRef(null);
    const containerRef = useRef(null);
    const valueContainerRef = useRef(null);

    // For Select/DataCard auto-open control
    const combobox = useCombobox();

    // Auto-open dropdown when entering editing mode for select types
    useEffect(() => {
        if (isEditing && (type === 'select' || type === 'dataCard')) {
            // Use a slightly longer delay to ensure focus and layout are complete
            const timer = setTimeout(() => {
                combobox.openDropdown();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isEditing, type, combobox]);

    const handleEdit = () => {
        setTempValue(value);
        setIsEditing(true);
    };

    const handleSave = () => {
        onSave(tempValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempValue(value);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        // For textarea, Ctrl/Cmd + Enter to save
        if (type === 'textarea') {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                handleSave();
            } else if (e.key === 'Escape') {
                handleCancel();
            }
        } else if (e.key === 'Enter' && type !== 'dataCard') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    // Render display value based on type
    const renderDisplayValue = () => {
        // Handle empty value display
        if (value === '' || value === null || value === undefined) {
            // Rule: No label -> <未命名>
            if (!label) {
                return <span className="text-sm text-gray-400">&lt;未命名&gt;</span>;
            }

            // For fields with labels, show "请输入" or "请选择" based on type
            const defaultPlaceholder = ['select', 'date', 'dataCard'].includes(type) ? '请选择' : '请输入';
            const placeholderText = rest.placeholder || defaultPlaceholder;

            return <span className="text-sm text-gray-400">{placeholderText}</span>;
        }

        if (type === 'dataCard' && value) {
            return (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700">
                    {value.name || value}
                </div>
            );
        }

        if (type === 'number' && unit) {
            return (
                <span className="text-sm text-gray-900">
                    {value} <span className="text-gray-500 ml-1">{unit}</span>
                </span>
            );
        };

        if (type === 'textarea') {
            return (
                <span className="text-sm text-gray-900 whitespace-pre-wrap line-clamp-2">
                    {value || '未填写'}
                </span>
            );
        }

        if (type === 'select') {
            const selectedOption = options.find(opt => String(opt.value) === String(value));
            return <span className="text-sm text-gray-900">{selectedOption?.label || value}</span>;
        }

        return <span className="text-sm text-gray-900">{value}</span>;
    };

    const shouldShowToolbar = ['textarea', 'multiSelect', 'rich-text'].includes(type);

    const handleBlur = (e) => {
        // If there's a toolbar, we don't save on blur (user might be clicking the toolbar)
        if (shouldShowToolbar) return;

        // Use a small timeout to allow click events on buttons or state updates to process
        setTimeout(() => {
            if (isEditing) {
                handleSave();
            }
        }, 150);
    };

    const renderEditInput = () => {
        const commonProps = {
            size: "sm",
            variant: "default",
            autoFocus: true,
            className: "w-full",
            onKeyDown: handleKeyDown,
            onBlur: handleBlur,
            styles: { input: { borderRadius: '4px' } },
            placeholder: rest.placeholder || (!label ? '<未命名>' : (['select', 'date', 'dataCard'].includes(type) ? '请选择' : '请输入'))
        };

        switch (type) {
            case 'text':
                return (
                    <TextInput
                        {...commonProps}
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        selectOnFocus
                    />
                );
            case 'textarea':
                return (
                    <div className="w-full relative">
                        <Textarea
                            {...commonProps}
                            ref={textareaRef}
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            maxLength={maxLength}
                            minRows={rows}
                            autosize
                        />
                        {maxLength && <div className="text-xs text-gray-400 mt-1 text-right">{tempValue?.length || 0}/{maxLength}</div>}
                    </div>
                );
            case 'number':
                return (
                    <div className="flex items-center gap-2">
                        <NumberInput
                            {...commonProps}
                            value={tempValue === '' ? '' : Number(tempValue)}
                            onChange={(val) => setTempValue(val)}
                            min={min} max={max} step={step} className="w-32"
                            selectOnFocus
                        />
                        {unit && <span className="text-sm text-gray-500">{unit}</span>}
                    </div>
                );
            case 'select':
                return (
                    <Select
                        {...commonProps}
                        value={tempValue}
                        onOptionSubmit={(val) => {
                            setTempValue(val);
                            // If no toolbar, we save immediately even if value is same
                            if (!shouldShowToolbar) {
                                onSave(val);
                                setIsEditing(false);
                            }
                        }}
                        onChange={setTempValue}
                        data={options}
                        checkIconPosition="right"
                        allowDeselect={false}
                        comboboxProps={{ store: combobox, withinPortal: true }}
                    />
                );
            case 'date':
                return (
                    <TextInput
                        {...commonProps}
                        type="date"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                    />
                );
            case 'dataCard':
                return (
                    <Select
                        {...commonProps}
                        value={String(tempValue?.id || tempValue)}
                        onOptionSubmit={(val) => {
                            const selected = dataCardOptions.find(opt => String(opt.id) === String(val));
                            setTempValue(selected || val);
                            if (!shouldShowToolbar) {
                                onSave(selected || val);
                                setIsEditing(false);
                            }
                        }}
                        onChange={(val) => {
                            const selected = dataCardOptions.find(opt => String(opt.id) === String(val));
                            setTempValue(selected || val);
                        }}
                        data={dataCardOptions.map(opt => ({ value: String(opt.id), label: opt.name }))}
                        checkIconPosition="right"
                        allowDeselect={false}
                        searchable
                        comboboxProps={{ store: combobox, withinPortal: true }}
                    />
                );
            default: return null;
        }
    };

    const renderKeyArea = () => {
        if (!label) return null; // Support no-label mode
        return (
            <React.Fragment>
                <span>{label}：</span>
                {helpIcon && <div className="ml-1 text-gray-400"><IconInfoCircle size={14} /></div>}
            </React.Fragment>
        );
    };

    const renderValueAreaContent = () => {
        if (children) return children;

        const isMultiLine = ['textarea', 'rich-text'].includes(type);
        // Shared text styles for zero-jump
        const textStyles = `text-sm font-normal ${isMultiLine ? 'leading-relaxed' : 'leading-none h-full flex items-center'}`;

        return (
            <div
                className={`flex items-center rounded transition-all duration-200 ease-in-out relative ${!isEditing ? 'group' : ''} ${!isMultiLine ? 'h-9' : ''}`}
                style={!isMultiLine ? { height: '36px' } : {}} // Lock height only for single line
            >
                {isEditing ? (
                    <div className={`w-full h-full flex items-center ${isMultiLine ? 'py-1' : ''}`}>
                        {renderEditInput()}
                    </div>
                ) : (
                    <div
                        className={`relative flex-1 w-full h-full flex items-center px-3 border border-transparent overflow-visible group-hover:bg-gray-50 rounded cursor-pointer`}
                        onClick={handleEdit}
                    >
                        <div className={`truncate pr-12 w-full ${textStyles}`}>
                            {renderDisplayValue()}
                        </div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pl-4 bg-gradient-to-l from-gray-50 via-gray-50 to-transparent flex items-center h-[calc(100%-2px)] mr-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleEdit(); }}
                                className="flex items-center gap-1 px-2 h-6 bg-white border border-gray-200 text-xs text-gray-600 hover:text-[#087F9C] hover:border-[#087F9C] rounded shadow-sm transition-all whitespace-nowrap"
                                title="编辑"
                            >
                                <IconPencil size={12} />
                                <span>编辑</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // --- LAYOUT RENDERING ---

    const renderToolbar = () => (
        <div className="absolute left-0 right-0 top-full mt-1 flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded shadow-md z-20">
            {type === 'textarea' && (
                <div className="flex items-center gap-1 mr-auto">
                    <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded transition-colors"><IconTextPlus size={16} /></button>
                    <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded transition-colors"><IconRotate size={16} /></button>
                </div>
            )}
            <div className="flex items-center gap-1 ml-auto">
                <button onClick={handleCancel} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded transition-colors"><IconX size={16} /></button>
                <button onClick={handleSave} className="w-6 h-6 flex items-center justify-center text-green-600 hover:bg-green-50 rounded transition-colors"><IconCheck size={16} /></button>
            </div>
        </div>
    );

    if (layout === 'table') {
        const isMultiLine = ['textarea', 'rich-text'].includes(type);
        return (
            <tr ref={containerRef}>
                <td className={`pr-0 ${isMultiLine ? 'align-top pt-[9px]' : 'align-middle'}`}>
                    <div className={`flex text-sm text-gray-500 font-normal ${!isMultiLine ? 'h-9 items-center' : ''}`}>
                        {renderKeyArea()}
                    </div>
                </td>
                <td
                    ref={valueContainerRef}
                    className="align-middle relative"
                >
                    <div className={children ? "px-3" : ""}>{renderValueAreaContent()}</div>
                    {!children && isEditing && shouldShowToolbar && renderToolbar()}
                </td>
            </tr>
        );
    }

    const isMultiLine = ['textarea', 'rich-text'].includes(type);
    return (
        <div ref={containerRef} className={`relative flex items-start min-h-9 ${rest.className || ''}`} {...rest}>
            {label && (
                <div className={`${labelWidth} text-sm text-gray-500 font-normal shrink-0 flex ${!isMultiLine ? 'h-9 items-center' : 'pt-[9px]'}`}>
                    {renderKeyArea()}
                </div>
            )}
            <div
                ref={valueContainerRef}
                className="relative flex-1"
            >
                {renderValueAreaContent()}
                {!children && isEditing && shouldShowToolbar && renderToolbar()}
            </div>
        </div>
    );
};

export default EditableField;
