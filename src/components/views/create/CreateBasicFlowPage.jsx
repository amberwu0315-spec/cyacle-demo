/**
 * CreateBasicFlowPage - 创建基本流页面
 * 
 * 使用 CreatePageTemplate 实现
 */
import React, { useState } from 'react';
import CreatePageTemplate from '../../layout/templates/CreatePageTemplate';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';

const CreateBasicFlowPage = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nameCN: '',
        nameEN: '',
        sourceDB: '',
        type: '',
        time: '',
        geo: '',
        tech: ''
    });

    // 验证：中文名称必填
    const isValid = Boolean(formData.nameCN);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave && onSave(formData);
    };

    // 数据类型选项
    const typeOptions = [
        { value: 'LCI', label: 'LCI' },
        { value: 'LCIA', label: 'LCIA' }
    ];

    return (
        <CreatePageTemplate
            entityType="基本流"
            entityName={formData.nameCN}
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
                                    label="名称（中文）"
                                    value={formData.nameCN}
                                    onSave={(val) => handleChange('nameCN', val)}
                                    placeholder="请输入中文名称"
                                    required
                                />

                                <EditableField
                                    label="名称（英文）"
                                    value={formData.nameEN}
                                    onSave={(val) => handleChange('nameEN', val)}
                                    placeholder="请输入英文名称"
                                />

                                <EditableField
                                    label="来源数据库"
                                    value={formData.sourceDB}
                                    onSave={(val) => handleChange('sourceDB', val)}
                                    placeholder="如：BASIC_FLOW 2025.1"
                                />

                                <EditableField
                                    label="数据类型"
                                    value={formData.type}
                                    onSave={(val) => handleChange('type', val)}
                                    type="select"
                                    options={typeOptions}
                                />

                                <EditableField
                                    label="时间代表性"
                                    value={formData.time}
                                    onSave={(val) => handleChange('time', val)}
                                    placeholder="如：2025"
                                />

                                <EditableField
                                    label="地理代表性"
                                    value={formData.geo}
                                    onSave={(val) => handleChange('geo', val)}
                                    placeholder="如：全球、中国"
                                />

                                <EditableField
                                    label="技术代表性"
                                    value={formData.tech}
                                    onSave={(val) => handleChange('tech', val)}
                                    placeholder="请输入技术代表性"
                                />
                            </FormBlock>
                        </ContentModule>
                    </div>
                </div>
            }
        />
    );
};

export default CreateBasicFlowPage;
