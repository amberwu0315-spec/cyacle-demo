/**
 * CreateDataPage - 创建数据记录页面
 * 
 * 使用 CreatePageTemplate 实现
 */
import React, { useState } from 'react';
import CreatePageTemplate from '../../layout/templates/CreatePageTemplate';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';

const CreateDataPage = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        value: '',
        unit: '',
        period: '',
        location: '',
        proof: '',
        sourceType: ''
    });

    // 验证：名称和数值必填
    const isValid = Boolean(formData.name && formData.value);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave && onSave(formData);
    };

    return (
        <CreatePageTemplate
            entityType="数据记录"
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
                                    label="数据名称"
                                    value={formData.name}
                                    onSave={(val) => handleChange('name', val)}
                                    placeholder="请输入数据名称"
                                    required
                                />

                                <EditableField
                                    label="数值"
                                    value={formData.value}
                                    onSave={(val) => handleChange('value', val)}
                                    placeholder="请输入数值"
                                    required
                                />

                                <EditableField
                                    label="单位"
                                    value={formData.unit}
                                    onSave={(val) => handleChange('unit', val)}
                                    placeholder="如：kg, kWh"
                                />

                                <EditableField
                                    label="时间区间"
                                    value={formData.period}
                                    onSave={(val) => handleChange('period', val)}
                                    placeholder="如：2024年"
                                />

                                <EditableField
                                    label="相关地点"
                                    value={formData.location}
                                    onSave={(val) => handleChange('location', val)}
                                    placeholder="请输入地点"
                                />

                                <EditableField
                                    label="证明文档"
                                    value={formData.proof}
                                    onSave={(val) => handleChange('proof', val)}
                                    placeholder="请输入证明文档"
                                />

                                <EditableField
                                    label="来源类型"
                                    value={formData.sourceType}
                                    onSave={(val) => handleChange('sourceType', val)}
                                    placeholder="请输入来源类型"
                                />
                            </FormBlock>
                        </ContentModule>
                    </div>
                </div>
            }
        />
    );
};

export default CreateDataPage;
