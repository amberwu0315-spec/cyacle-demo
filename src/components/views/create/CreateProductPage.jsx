/**
 * CreateProductPage - 创建产品页面
 * 
 * 使用 CreatePageTemplate 实现
 */
import React, { useState } from 'react';
import CreatePageTemplate from '../../layout/templates/CreatePageTemplate';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';

const CreateProductPage = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        spec: '',
        descType: '',
        desc: '',
        basicFlow: ''
    });

    // 验证：名称必填
    const isValid = Boolean(formData.name);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave && onSave(formData);
    };

    // 描述方式类型选项
    const descTypeOptions = [
        { value: '功能单位', label: '功能单位' },
        { value: '声明单位', label: '声明单位' }
    ];

    return (
        <CreatePageTemplate
            entityType="产品"
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
                                    label="产品名称"
                                    value={formData.name}
                                    onSave={(val) => handleChange('name', val)}
                                    placeholder="请输入产品名称"
                                    required
                                />

                                <EditableField
                                    label="规格型号"
                                    value={formData.spec}
                                    onSave={(val) => handleChange('spec', val)}
                                    placeholder="请输入规格型号"
                                />

                                <EditableField
                                    label="描述方式类型"
                                    value={formData.descType}
                                    onSave={(val) => handleChange('descType', val)}
                                    type="select"
                                    options={descTypeOptions}
                                />

                                <EditableField
                                    label="描述方式说明"
                                    value={formData.desc}
                                    onSave={(val) => handleChange('desc', val)}
                                    type="textarea"
                                    rows={2}
                                    placeholder="请输入说明"
                                />

                                <EditableField
                                    label="基准流"
                                    value={formData.basicFlow}
                                    onSave={(val) => handleChange('basicFlow', val)}
                                    placeholder="请输入基准流"
                                />
                            </FormBlock>
                        </ContentModule>
                    </div>
                </div>
            }
        />
    );
};

export default CreateProductPage;
