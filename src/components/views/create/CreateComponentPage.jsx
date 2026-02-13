/**
 * CreateComponentPage - 创建元件页面
 *  
 * 使用 CreatePageTemplate 实现
 */
import React, { useState } from 'react';
import CreatePageTemplate from '../../layout/templates/CreatePageTemplate';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';

const CreateComponentPage = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: '',
        supplier: '',
        model: ''
    });

    //验证：名称和类型必填
    const isValid = Boolean(formData.name && formData.type);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (!isValid) {
            alert('请填写必填项：名称和类型');
            return;
        }
        onSave && onSave(formData);
    };

    // 类型选项
    const typeOptions = [
        { value: 'mechanical', label: '机械元件' },
        { value: 'electronic', label: '电子元件' },
        { value: 'structural', label: '结构元件' }
    ];

    return (
        <CreatePageTemplate
            entityType="元件"
            entityName={formData.name}
            isValid={isValid}
            onSave={handleSave}
            onCancel={onCancel}

            // 左侧引导内容（使用默认）

            // 右侧表单内容
            formContentSlot={
                <div className="flex gap-3 w-full h-full">
                    <div className="w-full flex flex-col gap-3">
                        <ContentModule>
                            <ModuleHeader title="基础信息" />
                            <FormBlock>
                                <EditableField
                                    label="元件名称"
                                    value={formData.name}
                                    onSave={(val) => handleChange('name', val)}
                                    placeholder="请输入元件名称"
                                    required
                                />

                                <EditableField
                                    label="元件类型"
                                    value={formData.type}
                                    onSave={(val) => handleChange('type', val)}
                                    type="select"
                                    options={typeOptions}
                                    required
                                />

                                <EditableField
                                    label="型号规格"
                                    value={formData.model}
                                    onSave={(val) => handleChange('model', val)}
                                    placeholder="请输入"
                                />

                                <EditableField
                                    label="供应商"
                                    value={formData.supplier}
                                    onSave={(val) => handleChange('supplier', val)}
                                    placeholder="请输入"
                                />

                                <EditableField
                                    label="描述说明"
                                    value={formData.description}
                                    onSave={(val) => handleChange('description', val)}
                                    type="textarea"
                                    rows={3}
                                    placeholder="请输入"
                                />
                            </FormBlock>
                        </ContentModule>
                    </div>
                </div>
            }
        />
    );
};

export default CreateComponentPage;
