import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import CreatePageTemplate from '../../layout/templates/CreatePageTemplate';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';

const buildYearOptions = (currentYear) => {
    const start = currentYear - 10;
    const end = currentYear + 5;
    const options = [];
    for (let year = end; year >= start; year -= 1) {
        options.push({ value: String(year), label: String(year) });
    }
    return options;
};

const normalize = (value) => String(value || '').trim();

export default function CreateDatabaseManagementPage({ onSave, onCancel }) {
    const currentYear = new Date().getFullYear();
    const currentYearText = String(currentYear);
    const yearOptions = useMemo(() => buildYearOptions(currentYear), [currentYear]);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        shortName: '',
        fullName: '',
        version: '1.0',
        year: currentYearText,
        description: ''
    });

    const [logoFileName, setLogoFileName] = useState('');
    const [logoPreview, setLogoPreview] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    const shortName = normalize(formData.shortName);
    const isValid = shortName.length > 0;

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        return () => {
            if (logoPreview) {
                URL.revokeObjectURL(logoPreview);
            }
        };
    }, [logoPreview]);

    const applyLogoFile = (file) => {
        if (!file) return;
        const isSupported = ['image/png', 'image/jpeg'].includes(file.type);
        if (!isSupported) return;

        if (logoPreview) {
            URL.revokeObjectURL(logoPreview);
        }
        const preview = URL.createObjectURL(file);
        setLogoPreview(preview);
        setLogoFileName(file.name);
    };

    const handlePickLogo = (event) => {
        applyLogoFile(event.target.files?.[0]);
        event.target.value = '';
    };

    const handleSave = () => {
        if (!isValid) return;
        onSave?.({
            name: shortName,
            shortName,
            fullName: normalize(formData.fullName),
            source: '自建',
            version: normalize(formData.version) || '1.0',
            year: formData.year || currentYearText,
            description: normalize(formData.description),
            logoFileName
        });
    };

    return (
        <CreatePageTemplate
            entityType="数据库管理"
            entityName={
                isValid
                    ? shortName
                    : <span className="text-red-500">&lt;未命名&gt;</span>
            }
            isValid={isValid}
            disableSaveWhenInvalid
            saveButtonText="创建数据库"
            onCancel={onCancel}
            onSave={handleSave}
            leftIconSlot={(
                <div className="w-28 h-28 text-[#0EA5B7]">
                    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="20" y="20" width="40" height="40" rx="6" />
                        <rect x="62" y="20" width="38" height="40" rx="6" />
                        <rect x="20" y="62" width="40" height="38" rx="6" />
                        <path d="M81 68v30M66 83h30" />
                    </svg>
                </div>
            )}
            leftTitleSlot={(
                <div className="max-w-[240px] text-center text-[18px] leading-8 text-slate-800 font-medium">
                    新建自建数据库，精细管理自建因子数据
                </div>
            )}
            leftDescSlot={<></>}
            formContentSlot={(
                <div className="flex flex-col gap-3 w-full">
                    <ContentModule>
                        <ModuleHeader
                            title="基本信息"
                            subTitle={!isValid ? <span className="text-red-500">● 未维护「数据库简称」</span> : null}
                        />

                        <div className="p-4 grid grid-cols-1 xl:grid-cols-[420px_minmax(0,1fr)] gap-6 items-start">
                            <div
                                className={`h-[320px] border border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors px-6 text-center ${isDragOver ? 'border-[#0EA5B7] bg-cyan-50' : 'border-cyan-200 bg-white'
                                    }`}
                                onClick={() => fileInputRef.current?.click()}
                                onDragEnter={(event) => {
                                    event.preventDefault();
                                    setIsDragOver(true);
                                }}
                                onDragOver={(event) => {
                                    event.preventDefault();
                                    setIsDragOver(true);
                                }}
                                onDragLeave={(event) => {
                                    event.preventDefault();
                                    setIsDragOver(false);
                                }}
                                onDrop={(event) => {
                                    event.preventDefault();
                                    setIsDragOver(false);
                                    applyLogoFile(event.dataTransfer.files?.[0]);
                                }}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        fileInputRef.current?.click();
                                    }
                                }}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/png,image/jpeg"
                                    onChange={handlePickLogo}
                                />

                                {logoPreview ? (
                                    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
                                        <img src={logoPreview} alt="logo preview" className="max-h-[180px] max-w-full object-contain rounded-md" />
                                        <div className="text-sm text-slate-600">{logoFileName}</div>
                                        <div className="text-xs text-[#0EA5B7]">点击更换logo</div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-[#0EA5B7]">
                                            <IconPlus size={36} stroke={1.5} />
                                        </div>
                                        <div className="text-[14px] text-[#0EA5B7]">点击上传logo或拖拽文件至此</div>
                                        <div className="text-[12px] text-slate-400">支持PNG、JPEG格式</div>
                                    </div>
                                )}
                            </div>

                            <div className="w-full">
                                <FormBlock>
                                    <EditableField
                                        label="数据库简称"
                                        value={formData.shortName}
                                        onSave={(val) => updateField('shortName', val)}
                                        placeholder="请输入数据库简称"
                                        required
                                    />
                                    <EditableField
                                        label="数据库全称"
                                        value={formData.fullName}
                                        onSave={(val) => updateField('fullName', val)}
                                        placeholder="请输入数据库全称"
                                    />
                                    <EditableField label="来源">
                                        <span className="inline-flex items-center px-2 h-6 rounded bg-cyan-100 text-cyan-700 text-[13px]">自建</span>
                                    </EditableField>
                                    <EditableField
                                        label="版本"
                                        value={formData.version}
                                        onSave={(val) => updateField('version', val)}
                                        placeholder="请输入版本"
                                    />
                                    <EditableField
                                        label="年份"
                                        type="select"
                                        options={yearOptions}
                                        value={formData.year}
                                        onSave={(val) => updateField('year', val || currentYearText)}
                                        placeholder="请选择年份"
                                    />
                                </FormBlock>
                            </div>
                        </div>
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader title="数据库描述" />
                        <FormBlock>
                            <EditableField
                                label="数据库描述"
                                type="textarea"
                                rows={4}
                                value={formData.description}
                                onSave={(val) => updateField('description', val)}
                                placeholder="请输入数据库描述"
                            />
                        </FormBlock>
                    </ContentModule>
                </div>
            )}
        />
    );
}
