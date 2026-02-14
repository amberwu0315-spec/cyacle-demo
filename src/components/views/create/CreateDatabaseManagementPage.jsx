import React, { useState } from 'react';
import CreatePageTemplate from '../../layout/templates/CreatePageTemplate';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';

const sourceOptions = [
    { value: '标准', label: '标准' },
    { value: '自建', label: '自建' }
];

const permissionOptions = [
    { value: '可使用', label: '可使用' },
    { value: '只读', label: '只读' }
];

export default function CreateDatabaseManagementPage({ onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        source: '',
        version: '',
        year: '',
        permission: '',
        description: ''
    });

    const isValid = Boolean(formData.name && formData.source);

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <CreatePageTemplate
            entityType="数据库"
            entityName={formData.name}
            isValid={isValid}
            onCancel={onCancel}
            onSave={() => onSave?.(formData)}
            formContentSlot={(
                <div className="w-full h-full">
                    <ContentModule>
                        <ModuleHeader title="基础信息" />
                        <FormBlock>
                            <EditableField
                                label="数据库名称"
                                value={formData.name}
                                onSave={(val) => updateField('name', val)}
                                placeholder="请输入数据库名称"
                            />
                            <EditableField
                                label="来源"
                                type="select"
                                options={sourceOptions}
                                value={formData.source}
                                onSave={(val) => updateField('source', val)}
                                placeholder="请选择来源"
                            />
                            <EditableField
                                label="版本"
                                value={formData.version}
                                onSave={(val) => updateField('version', val)}
                                placeholder="如：2026.1"
                            />
                            <EditableField
                                label="年份"
                                value={formData.year}
                                onSave={(val) => updateField('year', val)}
                                placeholder="如：2026"
                            />
                            <EditableField
                                label="权限"
                                type="select"
                                options={permissionOptions}
                                value={formData.permission}
                                onSave={(val) => updateField('permission', val)}
                                placeholder="请选择权限"
                            />
                            <EditableField
                                label="描述"
                                type="textarea"
                                rows={3}
                                value={formData.description}
                                onSave={(val) => updateField('description', val)}
                                placeholder="数据库说明（占位）"
                            />
                        </FormBlock>
                    </ContentModule>
                </div>
            )}
        />
    );
}
