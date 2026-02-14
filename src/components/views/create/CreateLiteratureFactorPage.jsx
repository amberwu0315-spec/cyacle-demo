/**
 * CreateLiteratureFactorPage - 创建文献因子页面
 * 
 * 使用 CreatePageTemplate 实现
 */
import React, { useState } from 'react';
import CreatePageTemplate from '../../layout/templates/CreatePageTemplate';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';

const CreateLiteratureFactorPage = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        nameEN: '',
        category: '',
        value: '',
        unit: '',
        source: '',
        description: ''
    });

    // 验证：名称和类别必填
    const isValid = Boolean(formData.name && formData.category);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave && onSave(formData);
    };

    // 类别选项
    const categoryOptions = [
        { value: 'emission', label: '排放因子' },
        { value: 'energy', label: '能源因子' },
        { value: 'material', label: '物料因子' },
        { value: 'transport', label: '运输因子' }
    ];

    return (
        <CreatePageTemplate
            entityType="文献因子"
            entityName={formData.name}
            isValid={isValid}
            onSave={handleSave}
            onCancel={onCancel}

            // 右侧表单内容
            formContentSlot={
                <div className="flex gap-3 w-full h-full">
                    <div className="w-full flex flex-col gap-3">
                        <ContentModule>
                            <ModuleHeader title="基础信息" />
                            <FormBlock>
                                <EditableField
                                    label="因子名称"
                                    value={formData.name}
                                    onSave={(val) => handleChange('name', val)}
                                    placeholder="请输入因子名称"
                                    required
                                />

                                <EditableField
                                    label="因子名称(英文)"
                                    value={formData.nameEN}
                                    onSave={(val) => handleChange('nameEN', val)}
                                    placeholder="请输入"
                                />

                                <EditableField
                                    label="因子类别"
                                    value={formData.category}
                                    onSave={(val) => handleChange('category', val)}
                                    type="select"
                                    options={categoryOptions}
                                    required
                                />

                                <EditableField
                                    label="因子值"
                                    value={formData.value}
                                    onSave={(val) => handleChange('value', val)}
                                    placeholder="请输入数值"
                                />

                                <EditableField
                                    label="单位"
                                    value={formData.unit}
                                    onSave={(val) => handleChange('unit', val)}
                                    placeholder="如：kgCO2e/kWh"
                                />

                                <EditableField
                                    label="来源文献"
                                    value={formData.source}
                                    onSave={(val) => handleChange('source', val)}
                                    placeholder="请输入来源"
                                />

                                <EditableField
                                    label="备注说明"
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

export default CreateLiteratureFactorPage;
