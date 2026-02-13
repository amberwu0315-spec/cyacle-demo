/**
 * CreateDataSourcePage - 创建数据源页面
 * 
 * 使用 CreatePageTemplate 实现
 */
import React, { useState } from 'react';
import CreatePageTemplate from '../../layout/templates/CreatePageTemplate';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';

const CreateDataSourcePage = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        code: '',
        uncertainty: '',
        description: ''
    });

    // 验证：名称和类型必填
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
        { value: '电表', label: '电表' },
        { value: '水表', label: '水表' },
        { value: '气表', label: '气表' },
        { value: '传感器', label: '传感器' },
        { value: '人工记录', label: '人工记录' }
    ];

    return (
        <CreatePageTemplate
            entityType="数据源"
            entityName={formData.name}
            isValid={isValid}
            onSave={handleSave}
            onCancel={onCancel}

            formContentSlot={
                <div className="flex gap-3 w-full h-full">
                    <div className="w-full flex flex-col gap-3">
                        <ContentModule>
                            <ModuleHeader title="基础信息" />
                            <FormBlock>
                                <EditableField
                                    label="数据源名称"
                                    value={formData.name}
                                    onSave={(val) => handleChange('name', val)}
                                    placeholder="请输入数据源名称"
                                    required
                                />

                                <EditableField
                                    label="类型"
                                    value={formData.type}
                                    onSave={(val) => handleChange('type', val)}
                                    type="select"
                                    options={typeOptions}
                                    required
                                />

                                <EditableField
                                    label="编号/代码"
                                    value={formData.code}
                                    onSave={(val) => handleChange('code', val)}
                                    placeholder="请输入编号"
                                />

                                <EditableField
                                    label="不确定性"
                                    value={formData.uncertainty}
                                    onSave={(val) => handleChange('uncertainty', val)}
                                    placeholder="如：±1%"
                                />

                                <EditableField
                                    label="描述"
                                    value={formData.description}
                                    onSave={(val) => handleChange('description', val)}
                                    type="textarea"
                                    rows={3}
                                    placeholder="请输入描述"
                                />
                            </FormBlock>
                        </ContentModule>
                    </div>
                </div>
            }
        />
    );
};

export default CreateDataSourcePage;
