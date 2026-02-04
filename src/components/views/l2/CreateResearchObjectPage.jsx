import React, { useState, useEffect } from 'react';
import { IconDeviceFloppy } from '@tabler/icons-react';

import { DoubleColumnPage } from '../../layout/PageLayouts';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';
import { useHeaderContext } from '../../../context/HeaderContext';

const CreateResearchObjectPage = ({ onCancel, onSave }) => {
    const { setShowHeader } = useHeaderContext();

    // 隐藏系统 Header
    useEffect(() => {
        setShowHeader(false);
        return () => setShowHeader(true);
    }, [setShowHeader]);

    // 表单状态
    const [formData, setFormData] = useState({
        // 基本信息
        name: '',
        shortName: '',
        nameEn: '',
        industry: '',
        location: '',
        address: '',
        addressEn: '',
        // 工商信息
        creditCode: '',
        enterpriseType: '',
        businessScope: '',
        validStartDate: '',
        validEndDate: '',
        legalPerson: '',
        // 联系人信息
        contactName: '',
        contactNameEn: '',
        contactPhone: '',
        contactEmail: '',
        // 其他信息
        website: '',
        introduction: '',
        introductionEn: ''
    });

    // 必填校验 (仅校验名称)
    const isValid = !!formData.name;

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // 模拟下拉选项
    const INDUSTRY_OPTIONS = [
        { value: '建筑装饰', label: '建筑装饰' },
        { value: '金属制品', label: '金属制品' },
        { value: '电子设备', label: '电子设备' },
        { value: '化工材料', label: '化工材料' }
    ];

    const LOCATION_OPTIONS = [
        { value: '河南省/鹤壁市', label: '河南省/鹤壁市' },
        { value: '上海市/浦东新区', label: '上海市/浦东新区' },
        { value: '广东省/深圳市', label: '广东省/深圳市' }
    ];

    const ENT_TYPE_OPTIONS = [
        { value: '有限责任公司', label: '有限责任公司' },
        { value: '股份有限公司', label: '股份有限公司' },
        { value: '外商独资', label: '外商独资' }
    ];

    // --- 渲染内容 ---

    const LeftContent = (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-6">
            <div className="w-32 h-32 text-[#087f9c] opacity-80">
                {/* 简单的 SVG 图标模拟图中的 Grid+Plus */}
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="20" y="20" width="25" height="25" rx="4" />
                    <rect x="55" y="20" width="25" height="25" rx="4" />
                    <rect x="20" y="55" width="25" height="25" rx="4" />
                    {/* Plus Icon instead of 4th rect */}
                    <path d="M67.5 55 V80 M55 67.5 H80" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>
            <div className="text-center px-10 space-y-2">
                <p className="text-gray-500 font-medium">研究对象是一个信息中心，你可以通过围绕研究对象集中管理所有活动数据（如能耗、物料消耗等）</p>
            </div>
        </div>
    );

    // 通用的输入框样式
    const inputStyles = {
        input: {
            fontSize: '14px',
            color: '#111827',
            border: 'none', // 移除边框以匹配 EditableField 的纯净感，或者保留下划线？
            // 为了更好的输入体验，我们还是保留 Mantine 默认的边框，但设为透明背景
            backgroundColor: 'transparent',
            height: '36px',
            minHeight: '36px'
        }
    };

    // 使用variant="default"会有边框，这是我们在创建模式下想要的（明确的可输入区域）
    // 但为了和 FormBlock 融合，我们也可以只在 focus 时显示。
    // 这里决定直接使用 Mantine 默认样式，因为这代表"正在编辑中"。

    const RightContent = (
        <div className="flex gap-4 w-full h-full overflow-y-auto pb-10">
            {/* 左半部分 (主要信息) */}
            <div className="flex-1 flex flex-col gap-4">

                {/* 1. 基本信息 */}
                <ContentModule>
                    <ModuleHeader title="基本信息" subTitle={<span className="text-red-400 text-xs ml-2">{!isValid ? '● 未维护名称' : ''}</span>} />
                    <FormBlock>
                        <EditableField
                            label="名称"
                            value={formData.name}
                            onSave={(val) => handleChange('name', val)}
                        />

                        <EditableField
                            label="简称"
                            value={formData.shortName}
                            onSave={(val) => handleChange('shortName', val)}
                        />

                        <EditableField
                            label="名称(英文)"
                            value={formData.nameEn}
                            onSave={(val) => handleChange('nameEn', val)}
                        />

                        <EditableField
                            label="所属行业"
                            type="select"
                            options={INDUSTRY_OPTIONS}
                            value={formData.industry}
                            onSave={(val) => handleChange('industry', val)}
                        />

                        <EditableField
                            label="所在地区"
                            type="select"
                            options={LOCATION_OPTIONS}
                            value={formData.location}
                            onSave={(val) => handleChange('location', val)}
                        />

                        <EditableField
                            label="详细地址"
                            value={formData.address}
                            onSave={(val) => handleChange('address', val)}
                        />

                        <EditableField
                            label="详细地址(英文)"
                            value={formData.addressEn}
                            onSave={(val) => handleChange('addressEn', val)}
                        />
                    </FormBlock>
                </ContentModule>

                {/* 4. 其他信息 (放到左侧下方) */}
                <ContentModule>
                    <ModuleHeader title="其他信息" />
                    <FormBlock>
                        <EditableField
                            label="网站"
                            value={formData.website}
                            onSave={(val) => handleChange('website', val)}
                        />
                        <EditableField
                            label="介绍"
                            type="textarea"
                            rows={3}
                            value={formData.introduction}
                            onSave={(val) => handleChange('introduction', val)}
                        />
                        <EditableField
                            label="介绍(英文)"
                            type="textarea"
                            rows={3}
                            value={formData.introductionEn}
                            onSave={(val) => handleChange('introductionEn', val)}
                        />
                    </FormBlock>
                </ContentModule>
            </div>

            {/* 右半部分 (次要信息) */}
            <div className="w-[400px] flex flex-col gap-4">

                {/* 2. 工商信息 */}
                <ContentModule>
                    <ModuleHeader title="工商信息" />
                    <FormBlock>
                        <EditableField
                            label="统一社会信用代码"
                            value={formData.creditCode}
                            onSave={(val) => handleChange('creditCode', val)}
                        />
                        <EditableField
                            label="企业性质"
                            type="select"
                            options={ENT_TYPE_OPTIONS}
                            value={formData.enterpriseType}
                            onSave={(val) => handleChange('enterpriseType', val)}
                        />
                        <EditableField
                            label="组织经营范围"
                            value={formData.businessScope}
                            onSave={(val) => handleChange('businessScope', val)}
                        />
                        <EditableField
                            label="营业有效开始日期"
                            type="date"
                            value={formData.validStartDate}
                            onSave={(val) => handleChange('validStartDate', val)}
                        />
                        <EditableField
                            label="营业有效结束日期"
                            type="date"
                            value={formData.validEndDate}
                            onSave={(val) => handleChange('validEndDate', val)}
                        />
                        <EditableField
                            label="法定代表人"
                            value={formData.legalPerson}
                            onSave={(val) => handleChange('legalPerson', val)}
                        />
                    </FormBlock>
                </ContentModule>

                {/* 3. 联系人信息 */}
                <ContentModule>
                    <ModuleHeader title="联系人信息" />
                    <FormBlock>
                        <EditableField
                            label="姓名"
                            value={formData.contactName}
                            onSave={(val) => handleChange('contactName', val)}
                        />
                        <EditableField
                            label="姓名(英文)"
                            value={formData.contactNameEn}
                            onSave={(val) => handleChange('contactNameEn', val)}
                        />
                        <EditableField
                            label="电话"
                            value={formData.contactPhone}
                            onSave={(val) => handleChange('contactPhone', val)}
                        />
                        <EditableField
                            label="邮箱"
                            value={formData.contactEmail}
                            onSave={(val) => handleChange('contactEmail', val)}
                        />
                    </FormBlock>
                </ContentModule>
            </div>
        </div>
    );

    return (
        <DoubleColumnPage
            variant="standard"
            // 左侧 Header: 静态标题
            leftHeader={{
                title: "研究对象",
                operation: "创建",
                onExit: onCancel
            }}
            leftRender={LeftContent}

            // 右侧 Header: 只有一个操作按钮和取消
            rightHeader={{
                title: formData.name ? formData.name : <span className="text-gray-400 font-normal">&lt;未命名&gt;</span>, // 仅在有值时高亮，无值时置灰
                businessActions: (
                    <>
                        <button
                            onClick={onCancel}
                            className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        >
                            取消
                        </button>
                        <button
                            onClick={() => {
                                if (!isValid) {
                                    alert('请输入名称');
                                    return;
                                }
                                onSave && onSave(formData);
                            }}
                            className={`px-3 py-1.5 text-xs text-white rounded transition-colors flex items-center gap-1 ${isValid
                                ? 'bg-[#087f9c] hover:bg-[#076a82]'
                                : 'bg-gray-300 cursor-not-allowed'
                                }`}
                        >
                            <IconDeviceFloppy size={14} />
                            <span>创建研究对象</span>
                        </button>
                    </>
                )
            }}
            rightRender={RightContent}
        />
    );
};

export default CreateResearchObjectPage;
