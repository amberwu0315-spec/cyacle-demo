import React, { useState } from 'react';
import { IconFilePlus, IconFileText, IconX } from '@tabler/icons-react';
import EditableField from './EditableField';
import Tag from './Tag';


/**
 * UploadField - 上传文件交互组件
 * 
 * 交互状态：
 * 1. Empty: 显示“点击上传”
 * 2. Uploading: 显示转圈动画
 * 3. Done: 显示文件名和删除按钮
 */
const UploadField = ({
    label,
    value,
    onUpload,
    onDelete,
    placeholder = "点击上传文档",
    uploadingText = "上传中...",
    fileName = "示例佐证材料_v1.0.pdf",
    fileSize = "2.4MB"
}) => {
    // 内部状态模拟上传过程，实际项目中可以通过 props 控制
    const [internalStatus, setInternalStatus] = useState(value ? 'done' : 'empty');

    const handleUploadClick = () => {
        setInternalStatus('uploading');

        // 模拟网络延迟
        setTimeout(() => {
            setInternalStatus('done');
            if (onUpload) onUpload();
        }, 600);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setInternalStatus('empty');
        if (onDelete) onDelete();
    };

    return (
        <EditableField label={label} className="items-center">
            {internalStatus === 'empty' && (
                <button
                    onClick={handleUploadClick}
                    className="flex flex-row items-center gap-1.5 h-9 text-[14px] text-primary-action hover:text-primary-emphasize hover:underline font-medium transition-colors group whitespace-nowrap"
                >
                    <div className="flex items-center justify-center p-1 rounded-full bg-cyan-50 group-hover:bg-cyan-100 transition-colors">
                        <IconFilePlus size={14} />
                    </div>
                    <span>{placeholder}</span>
                </button>
            )}

            {internalStatus === 'uploading' && (
                <div className="flex flex-row items-center gap-2 h-9 text-[14px] text-gray-400 whitespace-nowrap">
                    <div className="w-3 h-3 border-2 border-primary-action border-t-transparent rounded-full animate-spin"></div>
                    <span>{uploadingText}</span>
                </div>
            )}

            {internalStatus === 'done' && (
                <div className="flex flex-row items-center gap-2 h-9 group animate-fade-in-up">
                    <Tag
                        variant="neutral"
                        size="sm"
                        icon={IconFileText}
                        onDelete={handleDeleteClick}
                        className="group-hover:opacity-100"
                    >
                        {fileName} <span className="text-gray-400 ml-1 opacity-70">({fileSize})</span>
                    </Tag>
                </div>
            )}
        </EditableField>
    );
};

export default UploadField;
