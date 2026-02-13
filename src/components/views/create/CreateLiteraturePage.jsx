/**
 * CreateLiteraturePage - 创建文献页面
 * 
 * 使用 CreatePageTemplate 实现
 */
import React, { useState } from 'react';
import CreatePageTemplate from '../../layout/templates/CreatePageTemplate';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';

const CreateLiteraturePage = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        titleEN: '',
        authors: '',
        year: '',
        source: '',
        doi: '',
        abstract: ''
    });

    // 验证：标题必填
    const isValid = Boolean(formData.title);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (!isValid) {
            alert('请填写必填项：文献标题');
            return;
        }
        onSave && onSave(formData);
    };

    return (
        <CreatePageTemplate
            entityType="文献"
            entityName={formData.title}
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
                                    label="文献标题"
                                    value={formData.title}
                                    onSave={(val) => handleChange('title', val)}
                                    placeholder="请输入文献标题"
                                    required
                                />

                                <EditableField
                                    label="标题(英文)"
                                    value={formData.titleEN}
                                    onSave={(val) => handleChange('titleEN', val)}
                                    placeholder="请输入"
                                />

                                <EditableField
                                    label="作者"
                                    value={formData.authors}
                                    onSave={(val) => handleChange('authors', val)}
                                    placeholder="请输入作者姓名"
                                />

                                <EditableField
                                    label="发表年份"
                                    value={formData.year}
                                    onSave={(val) => handleChange('year', val)}
                                    placeholder="如：2024"
                                />

                                <EditableField
                                    label="来源/期刊"
                                    value={formData.source}
                                    onSave={(val) => handleChange('source', val)}
                                    placeholder="请输入期刊或会议名称"
                                />

                                <EditableField
                                    label="DOI"
                                    value={formData.doi}
                                    onSave={(val) => handleChange('doi', val)}
                                    placeholder="请输入DOI编号"
                                />

                                <EditableField
                                    label="摘要"
                                    value={formData.abstract}
                                    onSave={(val) => handleChange('abstract', val)}
                                    type="textarea"
                                    rows={4}
                                    placeholder="请输入文献摘要"
                                />
                            </FormBlock>
                        </ContentModule>
                    </div>
                </div>
            }
        />
    );
};

export default CreateLiteraturePage;
