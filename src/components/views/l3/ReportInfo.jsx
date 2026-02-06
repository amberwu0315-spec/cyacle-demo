import React, { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';
import Checkbox from '../../common/Checkbox';

// Toggle Switch Component (Local Helper)
const ToggleSwitch = ({ checked, onChange }) => (
    <div
        className={`relative inline-block w-8 h-4 rounded-full cursor-pointer transition-colors ${checked ? 'bg-[#087F9C]' : 'bg-gray-200'}`}
        onClick={() => onChange(!checked)}
    >
        <div className={`absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`}></div>
    </div>
);

// L3: 报告信息 (ReportInfo)
const ReportInfo = () => {
    // 1. Module 1: 报告编写属性 State
    const [rptReviewer, setRptReviewer] = useState('报告复核人名称示例');
    const [rptLead, setRptLead] = useState('核算负责人名称示例');
    const [rptEditDate, setRptEditDate] = useState('2025-09-29');
    const [rptValidity, setRptValidity] = useState('2028-09-05');
    const [rptPurpose, setRptPurpose] = useState('本产品碳足迹核算报告的核算主体为演示五金制品有限公司的特定型号的产品。报告通过计算和分析该产品的年度温室气体（GHG）排放量，主要为以下目的服务：\n(1) 为本厂管理者提供决策支持；\n(2) 为下游生产商提供较为准确的上游供应链数据。\n本厂为积极参与国家制定的“双碳”目标，为实现零碳目标作出应尽的社会责任，自主选择对本厂的特定产品进行碳足迹核算，以便联合上下文游产业链，力求减少对环境产生的影响。');

    // 2. Module 2: 报告研究范围 State
    const [rptBasis, setRptBasis] = useState('本研究所依据的标准为 ISO 14067:2018《温室气体—产品碳足迹—量化要求和指南》。');
    const [rptSystem, setRptSystem] = useState('本报告所研究的系统范围为演示五金制品有限公司所生产的特定“铝铆钉”(型号：“789”)。\n产品简介如下：铝铆钉也称作销子，是由铝线材做的零件，用以将几个单独的物件固定在一起或作为一个物件悬在另一物件上的支撑物。\n产品主体材料为线材，本次研究和计算还包含了成品的包装。');
    const [rptDefinition, setRptDefinition] = useState('本报告所研究的系统范围为演示五金制品有限公司所生产的特定“铝铆钉”产品（型号：“789”）“从摇篮到大门”的整个过程。');
    const [rptAssumptions, setRptAssumptions] = useState('1、原辅料中的纸箱、缠绕膜、润滑油均为本市采购，运输距离较短，统计经济成本较高，本报告采取保守的核算方法，纸箱、缠绕膜运输距离取 20km 进行核算，润滑油运输距离取 25km 进行核算；\n2、产品的委外加工地点在本市，距离本工厂不超过 20km，本报告采取保守的核算方法，取 20km 进行核算；\n3、由于缺乏明确的资料来证实危险废弃物的具体处理方式，本报告采取保守的核算方法，假设所有危险废弃物均采用焚烧方式进行处理。');
    const [rptLimitations, setRptLimitations] = useState('依据 ISO 14067:2018 标准附录 A 的要求，本报告对目标产品碳足迹研究的局限性做出如下说明：\n此次产品碳足迹评价出于了解和掌握基本数据的目的，将气候变化作为单一影响类别。产品碳足迹反映了随着时间的推移对全球辐射能量平衡的潜在影响，即 GHG 排放量和产品系统的移除量之和，与源材料采购、设计、生产、运输相关。产品碳足迹可能是影响“气候变化”关注领域的产品生命周期的一个重要环境方面，除此之外，产品生命周期可能会对其他相关领域产生影响（例如：资源枯竭、空气、水、土壤和生态系统）。产品碳足迹引起的气候变化只是产品生命周期可能产生的各种环境影响之一，不同影响的相对重要性因产品而异。仅基于单一环境问题的产品影响决策可能与其他环境问题相关的目标相冲突。\n根据 LCA 方法计算 CFP。ISO 14040 和 ISO 14044 解决了其固有的局限性和权衡。这包括建立一个功能或声明的单元和系统边界、适当数据源的可用性和选择、分配程序以及有关传输的假设。选用的部分数据可能只适用于特定的地理区域，例如国家电网的数据，这可能限制了其普遍适用性。同时，这些数据也可能随着时间而变化，比如受季节性波动的影响。此外，在构建生命周期模型的过程中，需要做出一些数值上的决策，比如确定功能单位、声明单位以及分配程序的选择，这些选择可能会对模型的最终结果产生影响。因此，定量 CFP 的准确性有限，也难以评估。');

    // 3. Module 3: 研究结论 State
    const [rptConclusion, setRptConclusion] = useState('基于本报告的计算与分析，2024年01月01日至2024年12月31日期间，演示五金制品有限公司所生产的 1kg 铝铆钉产品（789）“从摇篮到大门”温室气体排放量为 11.36 kgCO₂e，不确定性范围为 0.00%～0.00%。\n报告基于对演示五金制品有限公司特定产品“从摇篮到大门”的生命周期分步步骤进行。总体报告遵循温室气体协议标准 ISO 14067，并遵循以下原则：准确性、完整性、一致性、相关性和透明度。');

    // 4. Module 4: 改进建议 State
    const [rptSuggestions, setRptSuggestions] = useState('综上所述，演示五金制品有限公司生产的铝铆钉（型号789）在原材料生产与获取的过程中，原材料的生产是造成该产品碳足迹的主要来源。演示五金制品有限公司可在原材料的采购等方面开展进一步的绿色设计和绿色产品开发和管理的工作。此外，在数据管理和质量控制层面，企业可以进行校验管理，对耗能设备采用更加精准的测量仪器，定期对仪器进行校验对维护，优化管理流程，降低人为误差，以提高数据的准确度。');

    // 5. Module 5: 模型不确定性描述 State
    const [uncertaintyList, setUncertaintyList] = useState([
        { factors: '来自场景的不确定性', description: '在目标产品的碳足迹核算过程中，由于生产制造阶段产生的废弃物处置的场景未能明确，采取了基于保守估计的假设场景。这些假设可能会为最终的计算结果带来不确定性。' },
        { factors: '来自模型选择的不确定性', description: '核算中使用的部分因子参数由于数据难以获取等原因，对其采用了“建模估计法”进行近似计算。这些因子模型本身具有不确定性，其作为因子参与计算时，通过模型传导影响了最终结果。' }
    ]);

    // 6. Module 6: 特殊说明 State
    const [rptStudyDesc, setRptStudyDesc] = useState('-');
    const [rptDataDesc, setRptDataDesc] = useState('-');
    const [rptGhgnDesc, setRptGhgnDesc] = useState('-');

    // 7. Module 7: 导出设置 State
    const [activityValueTypes, setActivityValueTypes] = useState(['original']); // 'original', 'unit'
    const [ghgRanges, setGhgRanges] = useState(['CO2', 'CH4', 'N2O', 'HFCs', 'PFCs', 'SF6', 'NF3']);
    const [showAllocRule, setShowAllocRule] = useState(true);

    // Other Toggles
    const [showSpecialEmission, setShowSpecialEmission] = useState(true);
    const [showUncertainty, setShowUncertainty] = useState(true);
    const [showInstructions, setShowInstructions] = useState(true);

    const addUncertaintyRow = () => {
        setUncertaintyList([...uncertaintyList, { factors: '', description: '' }]);
    };

    return (
        <div className="flex-1 flex flex-col gap-3 p-3 w-full overflow-y-auto custom-scrollbar bg-[#F5F6F8]">
            {/* Module 1: 报告编写属性 */}
            <ContentModule>
                <ModuleHeader title="报告编写属性" />
                <FormBlock>
                    <EditableField
                        label="报告复核人"
                        value={rptReviewer}
                        onSave={setRptReviewer}
                        type="text"
                    />
                    <EditableField
                        label="核算负责人"
                        value={rptLead}
                        onSave={setRptLead}
                        type="text"
                    />
                    <EditableField
                        label="报告编辑日期"
                        value={rptEditDate}
                        onSave={setRptEditDate}
                        type="date"
                    />
                    <EditableField
                        label="有效期"
                        value={rptValidity}
                        onSave={setRptValidity}
                        type="date"
                    />
                    <EditableField
                        label="报告编辑目的"
                        value={rptPurpose}
                        onSave={setRptPurpose}
                        type="textarea"
                        rows={4}
                    />
                </FormBlock>
            </ContentModule>

            {/* Module 2: 报告研究范围 */}
            <ContentModule>
                <ModuleHeader title="报告研究范围" />
                <FormBlock>
                    <EditableField label="投入产出图">
                        <button className="flex items-center gap-1 text-[#087F9C] hover:underline text-sm font-medium">
                            添加文档
                        </button>
                    </EditableField>
                    <EditableField
                        label="研究依据的标准和 PCR"
                        value={rptBasis}
                        onSave={setRptBasis}
                        type="textarea"
                    />
                    <EditableField
                        label="系统及功能"
                        value={rptSystem}
                        onSave={setRptSystem}
                        type="textarea"
                    />
                    <EditableField
                        label="定义描述"
                        value={rptDefinition}
                        onSave={setRptDefinition}
                        type="textarea"
                    />
                    <EditableField
                        label="假设"
                        value={rptAssumptions}
                        onSave={setRptAssumptions}
                        type="textarea"
                    />
                    <EditableField
                        label="研究局限性"
                        value={rptLimitations}
                        onSave={setRptLimitations}
                        type="textarea"
                    />
                </FormBlock>
            </ContentModule>

            {/* Module 3: 特殊排放分析 (带显隐开关) */}
            <ContentModule>
                <ModuleHeader
                    title="特殊排放分析"
                    toggle={<ToggleSwitch checked={showSpecialEmission} onChange={setShowSpecialEmission} />}
                />
                <div className="p-4 text-sm text-gray-400">
                    此内容模块待确定
                </div>
            </ContentModule>

            {/* Module 4: 研究结论 */}
            <ContentModule>
                <ModuleHeader title="研究结论" />
                <div className="p-1">
                    <EditableField
                        value={rptConclusion}
                        onSave={setRptConclusion}
                        type="textarea"
                        placeholder="请输入研究结论..."
                    />
                </div>
            </ContentModule>

            {/* Module 5: 改进建议 */}
            <ContentModule>
                <ModuleHeader title="改进建议" />
                <div className="p-1">
                    <EditableField
                        value={rptSuggestions}
                        onSave={setRptSuggestions}
                        type="textarea"
                        placeholder="请输入改进建议..."
                    />
                </div>
            </ContentModule>

            {/* Module 6: 模型不确定性描述 (带显隐开关 + 添加功能) */}
            <ContentModule>
                <ModuleHeader
                    title="模型不确定性描述"
                    toggle={<ToggleSwitch checked={showUncertainty} onChange={setShowUncertainty} />}
                    actions={
                        <button
                            onClick={addUncertaintyRow}
                            className="flex items-center gap-1 text-xs text-[#087F9C] font-medium hover:text-[#066c85]"
                        >
                            <IconPlus size={14} /> 添加功能
                        </button>
                    }
                />
                {showUncertainty && (
                    <div className="px-3 pb-3">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-[#E9F3F5] text-gray-500">
                                    <th className="border border-gray-100 p-2 text-left font-normal w-1/4">不确定性因素</th>
                                    <th className="border border-gray-100 p-2 text-left font-normal">不确定性因素说明</th>
                                </tr>
                            </thead>
                            <tbody>
                                {uncertaintyList.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-100 p-0 align-top">
                                            <EditableField
                                                value={item.factors}
                                                onSave={(val) => {
                                                    const newList = [...uncertaintyList];
                                                    newList[index].factors = val;
                                                    setUncertaintyList(newList);
                                                }}
                                                type="textarea"
                                                className="border-none hover:bg-transparent"
                                            />
                                        </td>
                                        <td className="border border-gray-100 p-0 align-top">
                                            <EditableField
                                                value={item.description}
                                                onSave={(val) => {
                                                    const newList = [...uncertaintyList];
                                                    newList[index].description = val;
                                                    setUncertaintyList(newList);
                                                }}
                                                type="textarea"
                                                className="border-none hover:bg-transparent"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </ContentModule>

            {/* Module 6: 特殊说明  */}
            <ContentModule>
                <ModuleHeader
                    title="特殊说明"
                    toggle={<ToggleSwitch checked={showInstructions} onChange={setShowInstructions} />}
                />
                {showInstructions && (
                    <FormBlock>
                        <EditableField
                            label="报告研究补充说明"
                            value={rptStudyDesc}
                            onSave={setRptStudyDesc}
                            type="textarea"
                        />
                        <EditableField label="报告研究补充文档">
                            <button className="flex items-center gap-1 text-[#087F9C] hover:underline text-sm font-medium">
                                添加文档
                            </button>
                        </EditableField>
                        <EditableField
                            label="数据收集与处理补充说明"
                            value={rptDataDesc}
                            onSave={setRptDataDesc}
                            type="textarea"
                        />
                        <EditableField label="数据收集与处理补充文档">
                            <button className="flex items-center gap-1 text-[#087F9C] hover:underline text-sm font-medium">
                                添加文档
                            </button>
                        </EditableField>
                        <EditableField
                            label="温室气体量化补充说明"
                            value={rptGhgnDesc}
                            onSave={setRptGhgnDesc}
                            type="textarea"
                        />
                        <EditableField label="温室气体量化补充文档">
                            <button className="flex items-center gap-1 text-[#087F9C] hover:underline text-sm font-medium">
                                添加文档
                            </button>
                        </EditableField>
                    </FormBlock>
                )}
            </ContentModule>

            {/* Module 7: 导出设置 */}
            <ContentModule>
                <ModuleHeader title="导出设置" />
                <div className="flex flex-col">
                    <FormBlock>
                        <EditableField label="活动数据展示数值">
                            <div className="flex items-center gap-4 py-1">
                                <Checkbox
                                    label="原始数值"
                                    checked={activityValueTypes.includes('original')}
                                    onChange={(e) => {
                                        if (e.target.checked) setActivityValueTypes([...activityValueTypes, 'original']);
                                        else setActivityValueTypes(activityValueTypes.filter(t => t !== 'original'));
                                    }}
                                />
                                <Checkbox
                                    label="单位产品对应数值"
                                    checked={activityValueTypes.includes('unit')}
                                    onChange={(e) => {
                                        if (e.target.checked) setActivityValueTypes([...activityValueTypes, 'unit']);
                                        else setActivityValueTypes(activityValueTypes.filter(t => t !== 'unit'));
                                    }}
                                />
                            </div>
                        </EditableField>
                        <EditableField label="温室气体范围设置">
                            <div className="flex items-center gap-3 py-1 flex-wrap">
                                {['CO2', 'CH4', 'N2O', 'HFCs', 'PFCs', 'SF6', 'NF3'].map(gas => (
                                    <Checkbox
                                        key={gas}
                                        label={gas}
                                        checked={ghgRanges.includes(gas)}
                                        onChange={(e) => {
                                            if (e.target.checked) setGhgRanges([...ghgRanges, gas]);
                                            else setGhgRanges(ghgRanges.filter(g => g !== gas));
                                        }}
                                    />
                                ))}
                            </div>
                        </EditableField>
                    </FormBlock>

                    <div className="px-3 pb-3">
                        <div className="text-sm text-gray-500 mb-2">是否导出分配规则：</div>
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-[#E9F3F5] text-gray-500">
                                    <th className="border border-gray-100 p-2 text-left font-normal w-24">是否导出</th>
                                    <th className="border border-gray-100 p-2 text-left font-normal">分配规则</th>
                                    <th className="border border-gray-100 p-2 text-left font-normal">公式</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50">
                                    <td className="border border-gray-100 p-2 text-center">
                                        <ToggleSwitch checked={showAllocRule} onChange={setShowAllocRule} />
                                    </td>
                                    <td className="border border-gray-100 p-2 text-gray-600">全厂产品间按重量分配</td>
                                    <td className="border border-gray-100 p-2 text-gray-600 font-mono">
                                        E(本产品) = E(总额) × (Q(本产品) / Q(年度))
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </ContentModule>
        </div>
    );
};

export default ReportInfo;
