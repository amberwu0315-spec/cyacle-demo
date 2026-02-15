/**
 * EditableField - 可编辑字段
 * 
 * 🏢 角色：微型编辑器 (Micro Editor)
 * 📝 职责：
 * 1. 提供“点击即编辑”、“失焦即保存”的交互体验。
 * 2. 支持文本、数字等不同类型的输入。
 */
import React, { useState, useRef, useEffect } from 'react';
import { TextInput, NumberInput, Select, Textarea, useCombobox } from '@mantine/core';
import { IconPencil, IconCheck, IconX, IconRotate, IconTextPlus, IconInfoCircle, IconAlertCircle } from '@tabler/icons-react';
import Tag from './Tag';

/**
 * EditableField Component (Prototype Enhanced Edition)
 * * A reusable field that supports inline editing with Key-Value horizontal layout.
 * Includes "Prototype Mode" features: Fake Latency & Visual Feedback.
 * * Props:
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
    required = false,
    layout = 'flex', // 'flex' | 'table'
    children,
    ...rest
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const [isLoading, setIsLoading] = useState(false);

    const textareaRef = useRef(null);
    const containerRef = useRef(null);
    const valueContainerRef = useRef(null);

    // For Select/DataCard auto-open control
    const combobox = useCombobox();

    // Auto-open dropdown when entering editing mode for select types
    useEffect(() => {
        if (isEditing && !isLoading && (type === 'select' || type === 'dataCard')) {
            // Use a slightly longer delay to ensure focus and layout are complete
            const timer = setTimeout(() => {
                combobox.openDropdown();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isEditing, isLoading, type, combobox]);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    const handleEdit = () => {
        if (isLoading) return; // Prevent edit while saving
        setTempValue(value);
        setIsEditing(true);
    };

    const handleSave = (nextValue = tempValue) => {
        if (isLoading) return; // Prevent double submit
        setIsLoading(true);
        onSave(nextValue);
        setIsLoading(false);
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (isLoading) return;
        setTempValue(value);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (isLoading) return;

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
                return <span className="text-[14px] text-slate-400">&lt;未命名&gt;</span>;
            }

            // For fields with labels, show "请输入" or "请选择" based on type
            const defaultPlaceholder = ['select', 'date', 'dataCard'].includes(type) ? '请选择' : '请输入';
            const placeholderText = rest.placeholder || defaultPlaceholder;

            return <span className="text-[14px] text-slate-400">{placeholderText}</span>;
        }

        if (type === 'dataCard' && value) {
            return <Tag variant="default" size="sm" shape="rect">{value.name || value}</Tag>;
        }

        if (type === 'number' && unit) {
            return (
                <span className="text-[14px] text-slate-900">
                    {value} <span className="text-slate-500 ml-1">{unit}</span>
                </span>
            );
        };

        if (type === 'textarea') {
            return (
                <span className="text-[14px] text-slate-900 whitespace-pre-wrap">
                    {value || '未填写'}
                </span>
            );
        }

        if (type === 'select') {
            const selectedOption = options.find(opt => String(opt.value) === String(value));
            return <span className="text-[14px] text-slate-900">{selectedOption?.label || value}</span>;
        }

        return <span className="text-[14px] text-slate-900">{value}</span>;
    };

    const shouldShowToolbar = ['textarea', 'multiSelect', 'rich-text'].includes(type);

    const handleBlur = (e) => {
        // If loading, ignore blur to prevent conflicts
        if (isLoading) return;

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
            disabled: isLoading, // Disable input while saving
            styles: {
                input: {
                    borderRadius: '4px',
                    fontSize: '14px'
                }
            },
            placeholder: rest.placeholder || (!label ? '<未命名>' : (['select', 'date', 'dataCard'].includes(type) ? '请选择' : '请输入')),
            // Add right section for loading spinner
            rightSection: null
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
                            styles={{
                                input: {
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }
                            }}
                        />
                        {maxLength && <div className="text-[12px] text-gray-400 mt-1 text-right">{tempValue?.length || 0}/{maxLength}</div>}
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
                                handleSave(val);
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
                            const nextValue = selected || val;
                            setTempValue(nextValue);
                            if (!shouldShowToolbar) {
                                handleSave(nextValue);
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
        const textStyles = `text-[14px] font-normal ${isMultiLine ? 'leading-[1.5]' : 'leading-none h-full flex items-center'}`;

        return (
            <div
                className={`flex items-center rounded-md transition-all duration-200 ease-in-out relative ${!isEditing ? 'group' : ''} ${!isMultiLine ? 'h-9' : ''} ${isEditing ? 'z-[60]' : ''}`}
            >
                {isEditing ? (
                    <div className="w-full h-full flex items-center">
                        {renderEditInput()}
                    </div>
                ) : (
                    <div
                        className={`relative flex-1 w-full ${isMultiLine ? 'min-h-[36px] items-start py-0' : 'h-9 items-center py-0'} flex px-3 border border-transparent overflow-visible group-hover:bg-slate-50 rounded-md cursor-pointer transition-colors duration-200`}
                        onClick={handleEdit}
                    >
                        <div className={`pr-12 w-full whitespace-pre-wrap break-words ${textStyles}`}>
                            {renderDisplayValue()}
                        </div>

                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pl-4 bg-gradient-to-l from-slate-50 via-slate-50 to-transparent flex items-center h-[calc(100%-2px)] mr-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleEdit(); }}
                                className="flex items-center gap-1 px-2 h-6 bg-white border border-slate-200 text-[12px] text-slate-600 hover:text-[#0EA5B7] hover:border-[#0EA5B7] rounded-md shadow-sm transition-all whitespace-nowrap"
                                title="编辑"
                            >
                                <IconPencil size={14} />
                                <span>编辑</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const hasDisplayValue = (val) => {
        if (val === null || val === undefined) return false;
        if (typeof val === 'string') return val.trim() !== '';
        if (typeof val === 'number') return true;
        if (typeof val === 'object') {
            if ('id' in val || 'value' in val || 'name' in val) {
                return Boolean(val.id || val.value || val.name);
            }
            return Object.keys(val).length > 0;
        }
        return true;
    };

    const isRequiredMissing = required && !hasDisplayValue(value);

    const renderRequiredBadge = () => {
        if (!required) return null;
        return (
            <div className="shrink-0 flex items-center gap-1 ml-2">
                {isRequiredMissing && !isEditing && (
                    <IconAlertCircle size={14} className="text-red-500" />
                )}
                <span className="text-[12px] text-red-500 whitespace-nowrap">必填</span>
            </div>
        );
    };

    // --- LAYOUT RENDERING ---

    const renderToolbar = () => (
        <div className="absolute left-0 right-0 top-full mt-1 flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-md shadow-md z-[80]">
            {type === 'textarea' && (
                <div className="flex items-center gap-1 mr-auto">
                    <button className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-md transition-colors"><IconTextPlus size={16} /></button>
                    <button className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-md transition-colors"><IconRotate size={16} /></button>
                </div>
            )}
            <div className="flex items-center gap-1 ml-auto">
                <button onClick={handleCancel} disabled={isLoading} className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-md transition-colors"><IconX size={16} /></button>
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-6 h-6 flex items-center justify-center text-[#22A06B] hover:bg-emerald-50 rounded-md transition-colors disabled:opacity-50"
                >
                    <IconCheck size={16} />
                </button>
            </div>
        </div>
    );

        if (layout === 'table') {
            const isMultiLine = ['textarea', 'rich-text'].includes(type);
            return (
            <tr ref={containerRef} className="h-9">
                <td className={`pr-0 ${isMultiLine ? 'align-top' : 'align-middle'}`}>
                    <div className={`flex text-[14px] text-slate-500 font-normal ${!isMultiLine ? 'h-9 items-center' : 'h-9 items-center'}`}>
                        {renderKeyArea()}
                    </div>
                </td>
                <td
                    ref={valueContainerRef}
                    className="align-middle relative"
                >
                    <div className={`flex ${isMultiLine ? 'items-start' : 'items-center'} ${children ? "px-3" : ""}`}>
                        <div className="flex-1 min-w-0">{renderValueAreaContent()}</div>
                        {renderRequiredBadge()}
                    </div>
                    {!children && isEditing && shouldShowToolbar && renderToolbar()}
                </td>
            </tr>
        );
    }

    const isMultiLine = ['textarea', 'rich-text'].includes(type);
    return (
        <div ref={containerRef} className={`relative flex items-start h-9 ${rest.className || ''}`} {...rest}>
            {label && (
                <div className={`${labelWidth} text-[14px] text-slate-500 font-normal shrink-0 flex ${!isMultiLine ? 'h-9 items-center' : 'h-9 items-center'}`}>
                    {renderKeyArea()}
                </div>
            )}
            <div
                ref={valueContainerRef}
                className="relative flex-1"
            >
                <div className={`flex ${isMultiLine ? 'items-start' : 'items-center'}`}>
                    <div className="flex-1 min-w-0">{renderValueAreaContent()}</div>
                    {renderRequiredBadge()}
                </div>
                {!children && isEditing && shouldShowToolbar && renderToolbar()}
            </div>
        </div>
    );
};

export default EditableField;
