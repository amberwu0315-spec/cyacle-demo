/**
 * CreateCompositeFactorPage - 创建复合因子页面
 * 
 * 使用 CreatePageTemplate 实现
 */
import React, { useState } from 'react';
import CreatePageTemplate from '../../layout/templates/CreatePageTemplate';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';

const CreateCompositeFactorPage = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        nameEN: '',
        type: '',
        formula: '',
        components: '',
        description: ''
    });

    // 验证：名称和类型必填
    const isValid = Boolean(formData.name && formData.type);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave && onSave(formData);
    };

    // 类型选项
    const typeOptions = [
        { value: 'weighted', label: '加权平均' },
        { value: 'calculated', label: '公式计算' },
        { value: 'composite', label: '组合因子' }
    ];

    return (
        <CreatePageTemplate
            entityType="复合因子"
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
                                    placeholder="请输入复合因子名称"
                                    required
                                />

                                <EditableField
                                    label="因子名称(英文)"
                                    value={formData.nameEN}
                                    onSave={(val) => handleChange('nameEN', val)}
                                    placeholder="请输入"
                                />

                                <EditableField
                                    label="因子类型"
                                    value={formData.type}
                                    onSave={(val) => handleChange('type', val)}
                                    type="select"
                                    options={typeOptions}
                                    required
                                />

                                <EditableField
                                    label="计算公式"
                                    value={formData.formula}
                                    onSave={(val) => handleChange('formula', val)}
                                    placeholder="请输入计算公式"
                                />

                                <EditableField
                                    label="组成因子"
                                    value={formData.components}
                                    onSave={(val) => handleChange('components', val)}
                                    placeholder="请输入组成因子"
                                />

                                <EditableField
                                    label="说明"
                                    value={formData.description}
                                    onSave={(val) => handleChange('description', val)}
                                    type="textarea"
                                    rows={3}
                                    placeholder="请输入说明"
                                />
                            </FormBlock>
                        </ContentModule>
                    </div>
                </div>
            }
        />
    );
};

export default CreateCompositeFactorPage;
