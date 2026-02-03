import React, { useState, useRef, useEffect } from 'react';
import { TextInput, NumberInput, Select, Textarea } from '@mantine/core';
import { IconPencil, IconCheck, IconX, IconRotate, IconTextPlus } from '@tabler/icons-react';

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
    children
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const textareaRef = useRef(null);
    const containerRef = useRef(null);
    const valueContainerRef = useRef(null);

    // ... (keep useEffect for auto-resize) ...

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
        }

        if (type === 'textarea') {
            return (
                <span className="text-sm text-gray-900 whitespace-pre-wrap line-clamp-2">
                    {value || '未填写'}
                </span>
            );
        }

        return <span className="text-sm text-gray-900">{value}</span>;
    };

    // Render edit input based on type
    const renderEditInput = () => {
        const commonProps = {
            size: "sm",
            variant: "default",
            autoFocus: true,
            className: "w-full",
            onKeyDown: handleKeyDown,
            styles: { input: { borderRadius: '4px' } }
        };

        switch (type) {
            case 'text':
                return (
                    <TextInput
                        {...commonProps}
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
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
                            placeholder="请输入内容..."
                        />
                        {maxLength && (
                            <div className="text-xs text-gray-400 mt-1 text-right">
                                {tempValue?.length || 0}/{maxLength}
                            </div>
                        )}
                    </div>
                );

            case 'number':
                return (
                    <div className="flex items-center gap-2">
                        <NumberInput
                            {...commonProps}
                            value={tempValue === '' ? '' : Number(tempValue)}
                            onChange={(val) => setTempValue(val)}
                            min={min}
                            max={max}
                            step={step}
                            className="w-32"
                        />
                        {unit && <span className="text-sm text-gray-500">{unit}</span>}
                    </div>
                );

            case 'select':
                return (
                    <Select
                        {...commonProps}
                        value={tempValue}
                        onChange={(val) => setTempValue(val)}
                        data={options}
                        checkIconPosition="right"
                        allowDeselect={false}
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
                        onChange={(val) => {
                            const selected = dataCardOptions.find(opt => String(opt.id) === String(val));
                            setTempValue(selected || val);
                        }}
                        data={dataCardOptions.map(opt => ({ value: String(opt.id), label: opt.name }))}
                        checkIconPosition="right"
                        allowDeselect={false}
                        searchable
                    />
                );

            default:
                return null;
        }
    };

    // --- RENDER HELPERS ---

    const renderKeyArea = () => (
        <React.Fragment>
            <span>{label}：</span>
            {helpIcon && <div className="ml-1 text-gray-400"><IconInfoCircle size={14} /></div>}
        </React.Fragment>
    );

    const renderValueAreaContent = () => {
        if (children) return children;

        return (
            <div className={`flex items-center px-3 min-h-9 rounded transition-all duration-200 ease-in-out relative ${isHovered && !isEditing ? 'bg-gray-50' : ''}`}>
                {isEditing ? renderEditInput() : (
                    <div className="relative flex-1 w-full flex items-center group overflow-visible">
                        <div className="truncate pr-12 w-full">
                            {renderDisplayValue()}
                        </div>
                        {isHovered && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 pl-4 bg-gradient-to-l from-gray-50 via-gray-50 to-transparent flex items-center h-full">
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center gap-1 px-2 h-6 bg-white border border-gray-200 text-xs text-gray-600 hover:text-[#087F9C] hover:border-[#087F9C] rounded shadow-sm transition-all whitespace-nowrap"
                                    title="编辑"
                                >
                                    <IconPencil size={12} />
                                    <span>编辑</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    // --- LAYOUT RENDERING ---

    // 1. Table Layout Mode (Auto-width columns)
    if (layout === 'table') {
        return (
            <tr ref={containerRef} className="group">
                {/* Key Cell: Controlled by FormBlock's colgroup */}
                <td className="align-middle pr-0">
                    <div className="flex items-center h-9 text-sm text-gray-500 font-normal">
                        {renderKeyArea()}
                    </div>
                </td>

                {/* Value Cell: Auto expand */}
                <td
                    ref={valueContainerRef}
                    className="align-middle relative"
                    onMouseEnter={() => !children && setIsHovered(true)}
                    onMouseLeave={() => !children && setIsHovered(false)}
                >
                    <div className={children ? "px-3" : ""}>
                        {renderValueAreaContent()}
                    </div>

                    {/* Floating Toolbar (only for standard editable fields) */}
                    {!children && isEditing && (
                        <div className="absolute left-0 right-0 top-full mt-1 flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded shadow-md z-20">
                            {/* ... (Toolbar Content Same as before) ... */}
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
                    )}
                </td>
            </tr>
        );
    }

    // 2. Flex Layout Mode (Legacy/Standalone)
    return (
        <div ref={containerRef} className="relative flex items-start min-h-9">
            <div className={`${labelWidth} text-sm text-gray-500 font-normal shrink-0 flex items-center h-9`}>
                {renderKeyArea()}
            </div>

            <div
                ref={valueContainerRef}
                className="relative flex-1"
                onMouseEnter={() => !children && setIsHovered(true)}
                onMouseLeave={() => !children && setIsHovered(false)}
            >
                {renderValueAreaContent()}

                {/* Floating Toolbar (Duplicate logic for flex mode - simplifying here for brevity, in real code ideally extracted) */}
                {!children && isEditing && (
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
                )}
            </div>
        </div>
    );
};

export default EditableField;
