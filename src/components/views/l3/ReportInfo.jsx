import React, { useState } from 'react';
import { IconPlus, IconFilePlus, IconTrash, IconFileText, IconX } from '@tabler/icons-react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';
import Checkbox from '../../common/Checkbox';

// --- 演示专用：微交互组件 ---

/**
 * 演示用上传按钮
 * Fix: 增加了 whitespace-nowrap 防止文字竖排，增加了 h-9 确保与 Label 对齐
 */
const MockUploadField = ({ label }) => {
    const [status, setStatus] = useState('empty'); // empty, uploading, done

    const handleUpload = () => {
        setStatus('uploading');
        setTimeout(() => setStatus('done'), 600);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        setStatus('empty');
    };

    return (
        // 在此处传入 className="items-center" 确保 Label 和右侧内容垂直居中对齐
        <EditableField label={label} className="items-center">
            {status === 'empty' && (
                <button
                    onClick={handleUpload}
                    // Fix: 添加 flex-row, whitespace-nowrap, h-9
                    className="flex flex-row items-center gap-1.5 h-9 text-sm text-[#087F9C] hover:text-[#066c85] hover:underline font-medium transition-colors group whitespace-nowrap"
                >
                    <div className="flex items-center justify-center p-1 rounded-full bg-cyan-50 group-hover:bg-cyan-100 transition-colors">
                        <IconFilePlus size={14} />
                    </div>
                    <span>点击上传文档</span>
                </button>
            )}

            {status === 'uploading' && (
                <div className="flex flex-row items-center gap-2 h-9 text-sm text-gray-400 whitespace-nowrap">
                    <div className="w-3 h-3 border-2 border-[#087F9C] border-t-transparent rounded-full animate-spin"></div>
                    <span>上传中...</span>
                </div>
            )}

            {status === 'done' && (
                <div className="flex flex-row items-center gap-2 h-9 group animate-fade-in-up">
                    <div className="flex flex-row items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-100 rounded text-sm text-[#087F9C]">
                        <IconFileText size={14} />
                        <span className="truncate max-w-[200px]">示例佐证材料_v1.0.pdf</span>
                        <span className="text-xs text-gray-400 ml-1 whitespace-nowrap">(2.4MB)</span>
                    </div>
                    <button
                        onClick={handleDelete}
                        className="flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                        title="删除"
                    >
                        <IconX size={14} />
                    </button>
                </div>
            )}
        </EditableField>
    );
};

// Toggle Switch
const ToggleSwitch = ({ checked, onChange }) => (
    <div
        className={`relative inline-flex items-center w-9 h-5 rounded-full cursor-pointer transition-all duration-300 ease-out border ${checked ? 'bg-[#087F9C] border-[#087F9C]' : 'bg-gray-200 border-gray-200'}`}
        onClick={(e) => {
            e.stopPropagation();
            onChange(!checked);
        }}
    >
        <span className={`absolute left-0.5 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </div>
);

// --- 主视图 ---

const ReportInfo = () => {
    // 数据状态
    const [formData, setFormData] = useState({
        reviewer: '报告复核人名称示例',
        lead: '核算负责人名称示例',
        editDate: '2025-09-29',
        validity: '2028-09-05',
        purpose: '本产品碳足迹核算报告的核算主体为演示五金制品有限公司的特定型号的产品。\n(1) 为本厂管理者提供决策支持；\n(2) 为下游生产商提供较为准确的上游供应链数据。',
        basis: '本研究所依据的标准为 ISO 14067:2018《温室气体—产品碳足迹—量化要求和指南》。',
        system: '本报告所研究的系统范围为演示五金制品有限公司所生产的特定“铝铆钉”(型号：“789”)。',
        definition: '本报告所研究的系统范围为演示五金制品有限公司所生产的特定“铝铆钉”产品（型号：“789”）“从摇篮到大门”的整个过程。',
        assumptions: '1、原辅料中的纸箱、缠绕膜、润滑油均为本市采购，运输距离较短，统计经济成本较高，本报告采取保守的核算方法，纸箱、缠绕膜运输距离取 20km 进行核算，润滑油运输距离取 25km 进行核算；\n2、产品的委外加工地点在本市，距离本工厂不超过 20km，本报告采取保守的核算方法，取 20km 进行核算；',
        limitations: '依据 ISO 14067:2018 标准附录 A 的要求，本报告对目标产品碳足迹研究的局限性做出如下说明：\n此次产品碳足迹评价出于了解和掌握基本数据的目的，将气候变化作为单一影响类别。产品碳足迹反映了随着时间的推移对全球辐射能量平衡的潜在影响。',
        conclusion: '基于本报告的计算与分析，2024年01月01日至2024年12月31日期间，演示五金制品有限公司所生产的 1kg 铝铆钉产品（789）“从摇篮到大门”温室气体排放量为 11.36 kgCO₂e。',
        suggestions: '建议演示五金制品有限公司在原材料采购等方面开展进一步的绿色设计和绿色产品开发和管理的工作。',
        studyDesc: '-',
        dataDesc: '-',
        ghgnDesc: '-'
    });

    const [uncertaintyList, setUncertaintyList] = useState([
        { factors: '来自场景的不确定性', description: '在目标产品的碳足迹核算过程中，由于生产制造阶段产生的废弃物处置的场景未能明确，采取了基于保守估计的假设场景。' },
        { factors: '来自模型选择的不确定性', description: '核算中使用的部分因子参数由于数据难以获取等原因，对其采用了“建模估计法”进行近似计算。' }
    ]);

    const [toggles, setToggles] = useState({
        specialEmission: true,
        uncertainty: true,
        instructions: true,
        allocRule: true
    });

    const [exportSettings, setExportSettings] = useState({
        activityValueTypes: ['original'],
        ghgRanges: ['CO2', 'CH4', 'N2O', 'HFCs', 'PFCs', 'SF6', 'NF3']
    });

    const updateForm = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));
    const updateToggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="flex-1 w-full h-full overflow-y-auto custom-scrollbar bg-[#F5F6F8] p-3 space-y-3">

            {/* 1. 报告编写属性 */}
            <ContentModule>
                <ModuleHeader title="报告编写属性" />
                <FormBlock>
                    <EditableField label="报告复核人" value={formData.reviewer} onSave={(v) => updateForm('reviewer', v)} />
                    <EditableField label="核算负责人" value={formData.lead} onSave={(v) => updateForm('lead', v)} />
                    <EditableField label="报告编辑日期" value={formData.editDate} onSave={(v) => updateForm('editDate', v)} type="date" />
                    <EditableField label="有效期" value={formData.validity} onSave={(v) => updateForm('validity', v)} type="date" />
                    <EditableField label="报告编辑目的" value={formData.purpose} onSave={(v) => updateForm('purpose', v)} type="textarea" rows={3} />
                </FormBlock>
            </ContentModule>

            {/* 2. 报告研究范围 */}
            <ContentModule>
                <ModuleHeader title="报告研究范围" />
                <FormBlock>
                    <MockUploadField label="投入产出图" />
                    <EditableField label="研究依据的标准" value={formData.basis} onSave={(v) => updateForm('basis', v)} type="textarea" />
                    <EditableField label="系统及功能" value={formData.system} onSave={(v) => updateForm('system', v)} type="textarea" />
                    <EditableField label="定义描述" value={formData.definition} onSave={(v) => updateForm('definition', v)} type="textarea" />
                    <EditableField label="假设" value={formData.assumptions} onSave={(v) => updateForm('assumptions', v)} type="textarea" />
                    <EditableField label="研究局限性" value={formData.limitations} onSave={(v) => updateForm('limitations', v)} type="textarea" />
                </FormBlock>
            </ContentModule>

            {/* 3. 特殊排放分析 */}
            <ContentModule>
                <ModuleHeader
                    title="特殊排放分析"
                    toggle={<ToggleSwitch checked={toggles.specialEmission} onChange={() => updateToggle('specialEmission')} />}
                />
                {toggles.specialEmission && (
                    <div className="p-8 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 border-t border-gray-100 transition-all duration-300">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                            <span className="text-2xl opacity-30">🧪</span>
                        </div>
                        <span className="text-sm">暂无特殊排放数据分析</span>
                    </div>
                )}
            </ContentModule>

            {/* 4. 研究结论 */}
            <ContentModule>
                <ModuleHeader title="研究结论" />
                <div className="p-4">
                    <EditableField
                        value={formData.conclusion}
                        onSave={(v) => updateForm('conclusion', v)}
                        type="textarea"
                        className="bg-white rounded-md p-1 border border-gray-100 hover:border-gray-300 transition-colors shadow-sm"
                    />
                </div>
            </ContentModule>

            {/* 5. 改进建议 */}
            <ContentModule>
                <ModuleHeader title="改进建议" />
                <div className="p-4">
                    <EditableField
                        value={formData.suggestions}
                        onSave={(v) => updateForm('suggestions', v)}
                        type="textarea"
                        className="bg-white rounded-md p-1 border border-gray-100 hover:border-gray-300 transition-colors shadow-sm"
                    />
                </div>
            </ContentModule>

            {/* 6. 模型不确定性描述 */}
            <ContentModule>
                <ModuleHeader
                    title="模型不确定性描述"
                    toggle={<ToggleSwitch checked={toggles.uncertainty} onChange={() => updateToggle('uncertainty')} />}
                    actions={toggles.uncertainty && (
                        <button
                            onClick={() => setUncertaintyList([...uncertaintyList, { factors: '', description: '' }])}
                            className="flex items-center gap-1 text-xs text-[#087F9C] hover:text-white hover:bg-[#087F9C] px-2 py-1 rounded transition-all duration-200"
                        >
                            <IconPlus size={14} /> 添加条目
                        </button>
                    )}
                />
                {toggles.uncertainty && (
                    <div className="px-4 pb-4 pt-1">
                        <table className="w-full border-collapse text-sm border border-gray-200 rounded-md overflow-hidden shadow-sm">
                            <thead>
                                <tr className="bg-[#E9F3F5] text-gray-600 font-medium">
                                    <th className="p-2 px-4 text-left w-1/4 border-r border-gray-200/60">不确定性因素</th>
                                    <th className="p-2 px-4 text-left border-r border-gray-200/60">说明</th>
                                    <th className="w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {uncertaintyList.map((item, index) => (
                                    <tr key={index} className="group hover:bg-cyan-50/30 transition-colors">
                                        <td className="p-0 border-r border-gray-100 align-top relative">
                                            <div className="min-h-[42px] h-full">
                                                <EditableField
                                                    value={item.factors}
                                                    onSave={(val) => {
                                                        const n = [...uncertaintyList];
                                                        n[index].factors = val;
                                                        setUncertaintyList(n);
                                                    }}
                                                    type="textarea"
                                                    className="w-full h-full p-2 px-4"
                                                    placeholder="点击输入..."
                                                />
                                            </div>
                                        </td>
                                        <td className="p-0 border-r border-gray-100 align-top relative">
                                            <div className="min-h-[42px] h-full">
                                                <EditableField
                                                    value={item.description}
                                                    onSave={(val) => {
                                                        const n = [...uncertaintyList];
                                                        n[index].description = val;
                                                        setUncertaintyList(n);
                                                    }}
                                                    type="textarea"
                                                    className="w-full h-full p-2 px-4"
                                                    placeholder="点击输入详细说明..."
                                                />
                                            </div>
                                        </td>
                                        <td className="text-center align-middle">
                                            <button
                                                onClick={() => setUncertaintyList(uncertaintyList.filter((_, i) => i !== index))}
                                                className="text-gray-300 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <IconTrash size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </ContentModule>

            {/* 7. 特殊说明 */}
            <ContentModule>
                <ModuleHeader title="特殊说明" toggle={<ToggleSwitch checked={toggles.instructions} onChange={() => updateToggle('instructions')} />} />
                {toggles.instructions && (
                    <FormBlock>
                        <EditableField label="报告研究补充说明" value={formData.studyDesc} onSave={(v) => updateForm('studyDesc', v)} type="textarea" />
                        <MockUploadField label="报告研究补充文档" />
                        <div className="h-px bg-gray-100 my-1 mx-4" />
                        <EditableField label="数据收集补充说明" value={formData.dataDesc} onSave={(v) => updateForm('dataDesc', v)} type="textarea" />
                        <MockUploadField label="数据收集补充文档" />
                        <div className="h-px bg-gray-100 my-1 mx-4" />
                        <EditableField label="GHG量化补充说明" value={formData.ghgnDesc} onSave={(v) => updateForm('ghgnDesc', v)} type="textarea" />
                        <MockUploadField label="GHG量化补充文档" />
                    </FormBlock>
                )}
            </ContentModule>

            {/* 8. 导出设置 */}
            <ContentModule>
                <ModuleHeader title="导出设置" />
                <div className="flex flex-col gap-2">
                    <FormBlock>
                        <EditableField label="活动数据展示数值">
                            <div className="flex items-center gap-4 py-1.5">
                                <Checkbox
                                    label="原始数值"
                                    checked={exportSettings.activityValueTypes.includes('original')}
                                    onChange={(e) => {
                                        const s = new Set(exportSettings.activityValueTypes);
                                        e.target.checked ? s.add('original') : s.delete('original');
                                        setExportSettings({ ...exportSettings, activityValueTypes: [...s] });
                                    }}
                                />
                                <Checkbox
                                    label="单位产品对应数值"
                                    checked={exportSettings.activityValueTypes.includes('unit')}
                                    onChange={(e) => {
                                        const s = new Set(exportSettings.activityValueTypes);
                                        e.target.checked ? s.add('unit') : s.delete('unit');
                                        setExportSettings({ ...exportSettings, activityValueTypes: [...s] });
                                    }}
                                />
                            </div>
                        </EditableField>
                        <EditableField label="温室气体范围设置">
                            <div className="flex flex-wrap gap-x-4 gap-y-2 py-1.5">
                                {['CO2', 'CH4', 'N2O', 'HFCs', 'PFCs', 'SF6', 'NF3'].map(gas => (
                                    <Checkbox
                                        key={gas}
                                        label={gas}
                                        checked={exportSettings.ghgRanges.includes(gas)}
                                        onChange={(e) => {
                                            const s = new Set(exportSettings.ghgRanges);
                                            e.target.checked ? s.add(gas) : s.delete(gas);
                                            setExportSettings({ ...exportSettings, ghgRanges: [...s] });
                                        }}
                                    />
                                ))}
                            </div>
                        </EditableField>
                    </FormBlock>

                    <div className="px-4 pb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">高级选项</span>
                            <span className="text-xs text-gray-400">是否导出分配规则：</span>
                        </div>
                        <div className="border border-gray-200 rounded-md overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 font-medium w-24 text-center">导出</th>
                                        <th className="px-4 py-3 font-medium text-left border-l border-gray-200">分配规则</th>
                                        <th className="px-4 py-3 font-medium text-left border-l border-gray-200">公式</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr>
                                        <td className="px-4 py-3 text-center">
                                            <ToggleSwitch checked={toggles.allocRule} onChange={() => updateToggle('allocRule')} />
                                        </td>
                                        <td className="px-4 py-3 border-l border-gray-100 text-gray-700">全厂产品间按重量分配</td>
                                        <td className="px-4 py-3 border-l border-gray-100 text-gray-500 font-mono text-xs">
                                            E(本产品) = E(总额) × (Q(本产品) / Q(年度))
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </ContentModule>
        </div>
    );
};

export default ReportInfo;