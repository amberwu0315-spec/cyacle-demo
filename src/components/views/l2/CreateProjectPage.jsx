import React from 'react';
import ViewContainer from '../../layout/ViewContainer'; // Keep it if needed, or remove. Actually better to have correct imports.
import { DoubleColumnPage } from '../../layout/PageLayouts';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';
import { IconDeviceFloppy } from '@tabler/icons-react';

import { useHeaderContext } from '../../../context/HeaderContext';

const CreateProjectPage = ({ onCancel, onSave }) => {
    const { setShowHeader } = useHeaderContext();

    // Mock Data
    const RESEARCH_OBJECTS = [
        { id: 'mbp14', name: 'MacBook Pro 14' },
        { id: 'ip15p', name: 'iPhone 15 Pro' },
        { id: 'dyson', name: 'Dyson V12' },
        { id: 'af1', name: 'Nike Air Force 1' }
    ];

    const REQ_TYPES = [
        { id: 'CFP', name: '产品碳足迹 (CFP)' },
        { id: 'CFO', name: '组织碳足迹 (CFO)' }
    ];

    // Form State (Aligned with 数据结构定义.md)
    const [formData, setFormData] = React.useState({
        research_object_name: '',
        type: '',
        description: '',
        name: ''
    });

    const [isTitleTouched, setIsTitleTouched] = React.useState(false);

    // Validation
    const isFormValid = formData.research_object_name && formData.type;

    // Hide Header on Mount
    React.useEffect(() => {
        setShowHeader(false);
        return () => setShowHeader(true);
    }, [setShowHeader]);

    // Auto-Title Linkage
    React.useEffect(() => {
        if (isTitleTouched) return;

        const objName = RESEARCH_OBJECTS.find(o => o.id === formData.research_object_name)?.name || '';
        const typeName = REQ_TYPES.find(t => t.id === formData.type)?.name?.split(' ')[0] || ''; // '产品碳足迹'

        let newTitle = '';
        if (objName && typeName) {
            newTitle = `${objName} ${typeName}`;
        } else if (objName) {
            newTitle = objName;
        } else if (typeName) {
            newTitle = typeName;
        } else {
            newTitle = '';
        }

        setFormData(prev => ({ ...prev, name: newTitle }));
    }, [formData.research_object_name, formData.type, isTitleTouched]);

    // Handlers
    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCreate = () => {
        if (!isFormValid) return;
        onSave(); // In real app, pass formData here
    };

    // 1. Left Column Content
    const LeftContent = (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                <span className="text-4xl">✨</span>
            </div>
            <p className="text-sm font-medium">开始创建一个新项目</p>
            <p className="text-xs text-gray-300 px-8 text-center">
                请在右侧填写项目的详细信息，包括名称、类型以及关联的研究对象。
            </p>
        </div>
    );

    // 2. Right Column Content (Form)
    const RightContent = (
        <div className="flex gap-3 w-full h-full overflow-y-auto">
            <div className="w-full flex flex-col gap-3">
                <ContentModule>
                    <ModuleHeader title="基础信息" />
                    <FormBlock>
                        {/* Project Name Removed as per Request */}

                        <EditableField
                            label="所属研究对象"
                            value={formData.research_object_name}
                            onSave={(val) => handleChange('research_object_name', val)}
                            type="select"
                            options={RESEARCH_OBJECTS.map(obj => ({ value: String(obj.id), label: obj.name }))}
                        />
                        <EditableField
                            label="需求类型"
                            value={formData.type}
                            onSave={(val) => handleChange('type', val)}
                            type="select"
                            options={REQ_TYPES.map(type => ({ value: type.id, label: type.name }))} // Labels: 产品碳足迹, 组织碳足迹
                        />
                        <EditableField
                            label="需求标准"
                            value="ISO 14067" // Just mock for now
                            onSave={() => { }}
                            type="select"
                            options={[{ value: 'ISO 14067', label: 'ISO 14067' }]}
                        />
                        <EditableField
                            label="项目描述" // "项目备注" -> "项目描述" to align with "description"
                            value={formData.description}
                            onSave={(val) => handleChange('description', val)}
                            type="textarea"
                            placeholder="请输入"
                            rows={3}
                        />
                    </FormBlock>
                </ContentModule>
            </div>
        </div>
    );

    return (
        <DoubleColumnPage
            variant="standard" // Independent relation for creation flow

            // Left Header
            leftHeader={{
                title: "项目",
                operation: "创建",
                onExit: onCancel
            }}
            leftRender={LeftContent}

            // Right Header
            rightHeader={{
                // Custom Editable Title Input using Inline Pattern
                title: (
                    <EditableField
                        value={formData.name}
                        onSave={(val) => handleChange('name', val)}
                        type="text"
                        placeholder="<未命名>"
                        label={null}
                    />
                ),
                businessActions: (
                    <>
                        <button
                            onClick={onCancel}
                            className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        >
                            取消
                        </button>
                        <button
                            onClick={handleCreate}
                            disabled={!isFormValid}
                            className={`px-3 py-1.5 text-xs text-white rounded transition-colors flex items-center gap-1 ${isFormValid
                                ? 'bg-[#087F9C] hover:bg-[#076A82]'
                                : 'bg-gray-300 cursor-not-allowed'
                                }`}
                        >
                            <IconDeviceFloppy size={14} />
                            <span>创建项目</span>
                        </button>
                    </>
                )
            }}
            rightRender={RightContent}
        />
    );
};

export default CreateProjectPage;
