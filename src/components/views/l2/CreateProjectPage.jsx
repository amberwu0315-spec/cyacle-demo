import React from 'react';
import { DoubleColumnPage } from '../../layout/PageLayouts';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';
import { IconDeviceFloppy } from '@tabler/icons-react';

import { useHeaderContext } from '../../../context/HeaderContext';
import { researchObjectData } from '../../../data/mockData';

const CreateProjectPage = ({ onCancel, onSave }) => {
    const { setShowHeader } = useHeaderContext();

    // Mock Data
    const RESEARCH_OBJECTS = researchObjectData || [];

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
    const isFormValid = Boolean(formData.research_object_name && formData.type);

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
        if (!isFormValid) {
            console.warn("Validation Failed: Missing research_object_name or type", formData);
            alert("请完善必填信息：\n1. 请选择所属研究对象\n2. 请选择需求类型");
            return;
        }
        if (onSave) {
            onSave(formData);
        } else {
            console.error("onSave is not defined");
        }
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
                            options={REQ_TYPES.map(type => ({ value: type.id, label: type.name }))}
                        />

                        <EditableField
                            label="项目描述"
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
            variant="standard"
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
                            className={`px-3 py-1.5 text-xs text-white rounded transition-colors flex items-center gap-1 ${isFormValid
                                ? 'bg-[#087F9C] hover:bg-[#076A82]'
                                : 'bg-gray-400 hover:bg-gray-500'
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
