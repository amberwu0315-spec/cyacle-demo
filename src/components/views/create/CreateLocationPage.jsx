/**
 * CreateLocationPage - 创建地点页面
 * 
 * 使用 CreatePageTemplate 实现
 */
import React, { useState } from 'react';
import CreatePageTemplate from '../../layout/templates/CreatePageTemplate';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';

const CreateLocationPage = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        shortName: '',
        locationType: '',
        region: '',
        address: '',
        latlng: ''
    });

    // 验证：名称和地点类型必填
    const isValid = Boolean(formData.name && formData.locationType);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave && onSave(formData);
    };

    // 地点类型选项
    const locationTypeOptions = [
        { value: '生产工厂地点', label: '生产工厂地点' },
        { value: '仓储地点', label: '仓储地点' },
        { value: '办公地点', label: '办公地点' },
        { value: '其他', label: '其他' }
    ];

    return (
        <CreatePageTemplate
            entityType="地点"
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
                                    label="地点名称"
                                    value={formData.name}
                                    onSave={(val) => handleChange('name', val)}
                                    placeholder="请输入地点名称"
                                    required
                                />

                                <EditableField
                                    label="地点简称"
                                    value={formData.shortName}
                                    onSave={(val) => handleChange('shortName', val)}
                                    placeholder="请输入简称"
                                />

                                <EditableField
                                    label="地点类型"
                                    value={formData.locationType}
                                    onSave={(val) => handleChange('locationType', val)}
                                    type="select"
                                    options={locationTypeOptions}
                                    required
                                />

                                <EditableField
                                    label="所在地"
                                    value={formData.region}
                                    onSave={(val) => handleChange('region', val)}
                                    placeholder="如：亚洲-中国-浙江省"
                                />

                                <EditableField
                                    label="详细地址"
                                    value={formData.address}
                                    onSave={(val) => handleChange('address', val)}
                                    placeholder="请输入详细地址"
                                />

                                <EditableField
                                    label="经纬度"
                                    value={formData.latlng}
                                    onSave={(val) => handleChange('latlng', val)}
                                    placeholder="如：29.877025° N, 121.56545° E"
                                />
                            </FormBlock>
                        </ContentModule>
                    </div>
                </div>
            }
        />
    );
};

export default CreateLocationPage;
