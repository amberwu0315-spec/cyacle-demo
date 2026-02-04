import React, { useState } from 'react';
import { IconBox, IconInfoCircle } from '@tabler/icons-react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import FormBlock from '../../common/FormBlock';
import EditableField from '../../common/EditableField';
import Checkbox from '../../common/Checkbox';

const AccountingBasic = () => {
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    // State for Basic Info fields (Left Column: Product Settings)
    const [outputProduct, setOutputProduct] = useState('示例门窗系统');
    const [declaringUnit, setDeclaringUnit] = useState('1 平方米');
    const [productCount, setProductCount] = useState('100');
    const [productWeight, setProductWeight] = useState('25.5');
    const [weightUnit, setWeightUnit] = useState('kg');

    // State for Basic Info fields (Right Column: Metadata)
    const [modelName, setModelName] = useState('示例门窗');
    const [systemBoundary, setSystemBoundary] = useState('从摇篮到大门');
    const [accountingPeriod, setAccountingPeriod] = useState('2024-01-01');
    const [geoBoundary, setGeoBoundary] = useState({ id: 'loc1', name: '演示门窗生产地' });
    const [description, setDescription] = useState('这是一个用于演示的门窗产品模型，主要用于展示碳足迹核算的完整流程和数据结构。');

    // State for Accounting Settings fields
    const [projectStandard, setProjectStandard] = useState('ISO 14067');
    const [reportTemplate, setReportTemplate] = useState('通用产品碳足迹报告');
    const [qualitySystem, setQualitySystem] = useState('蒙特卡洛法');
    const [multiLanguage, setMultiLanguage] = useState('否');

    // State for Analysis Settings
    const [analysisMethod, setAnalysisMethod] = useState({
        exclusion: true,
        dataQuality: true, // Changed to true for demo
        sensitivity: true,
        issues: true // Changed to true for demo
    });
    const [exclusionThreshold1, setExclusionThreshold1] = useState('1');
    const [exclusionThreshold2, setExclusionThreshold2] = useState('3');
    const [sensitivityThreshold, setSensitivityThreshold] = useState('25');
    const [sensitivityApproach, setSensitivityApproach] = useState({
        gradeDataChange: true,
        gradeDataUncertainty: true
    });
    const [buildingMethod, setBuildingMethod] = useState({
        excludeMethod: true,
        qualityMethod: true
    });

    // Mock data for data card selector
    const geoLocationOptions = [
        { id: 'loc1', name: '演示门窗生产地' },
        { id: 'loc2', name: '中国-广东省-深圳市' },
        { id: 'loc3', name: '中国-江苏省-苏州市' }
    ];

    return (
        <div className="flex gap-3 p-3 w-full h-full overflow-y-auto bg-[#F5F6F8]">
            {/* Left Column (2/3 width) */}
            <div className="w-2/3 flex flex-col gap-3">
                {/* Module 1: 输出产品设置 (Output Product Settings) */}
                <ContentModule>
                    <ModuleHeader title="输出产品设置" />
                    <div className="p-3 text-sm text-gray-400">
                        此模块内容待定
                    </div>
                </ContentModule>

                {/* Module 2: 分析设置 (Analysis Settings) */}
                <ContentModule>
                    <ModuleHeader title="分析设置" />
                    <FormBlock>
                        <EditableField label="设置分析方法">
                            <div className="flex items-center gap-4 min-h-9 flex-wrap">
                                <Checkbox
                                    checked={analysisMethod.exclusion}
                                    onChange={(e) => setAnalysisMethod({ ...analysisMethod, exclusion: e.target.checked })}
                                    label="排除计算"
                                />
                                <Checkbox
                                    checked={analysisMethod.dataQuality}
                                    onChange={(e) => setAnalysisMethod({ ...analysisMethod, dataQuality: e.target.checked })}
                                    label="数据质量打分"
                                    disabled
                                    tooltip="作用：根据参数的数据评分，计算出整体产品碳排放计算质量评分的方法；"
                                />
                                <Checkbox
                                    checked={analysisMethod.sensitivity}
                                    onChange={(e) => setAnalysisMethod({ ...analysisMethod, sensitivity: e.target.checked })}
                                    label="敏感性分析"
                                />
                                <Checkbox
                                    checked={analysisMethod.issues}
                                    onChange={(e) => setAnalysisMethod({ ...analysisMethod, issues: e.target.checked })}
                                    label="重要问题识别"
                                    disabled
                                    tooltip="作用：展示并说明对产品碳足迹排放影响最大的模块的方法；"
                                />
                            </div>
                        </EditableField>

                        {analysisMethod.exclusion && (
                            <>
                                <EditableField
                                    label="排除计算-重要性阈值"
                                    value={exclusionThreshold1}
                                    onSave={setExclusionThreshold1}
                                    type="number"
                                    unit="%"
                                    min={0}
                                    max={100}
                                />
                                <EditableField
                                    label="排除计算-排除性阈值"
                                    value={exclusionThreshold2}
                                    onSave={setExclusionThreshold2}
                                    type="number"
                                    unit="%"
                                    min={0}
                                    max={100}
                                />
                            </>
                        )}

                        {analysisMethod.sensitivity && (
                            <>
                                <EditableField
                                    label="敏感性分析-灵敏区间"
                                    value={sensitivityThreshold}
                                    onSave={setSensitivityThreshold}
                                    type="number"
                                    unit="%"
                                    min={0}
                                    max={100}
                                />
                                <EditableField label="敏感性分析方法">
                                    <div className="flex flex-col gap-2 py-2">
                                        <Checkbox
                                            checked={sensitivityApproach.gradeDataChange}
                                            onChange={(e) => setSensitivityApproach({ ...sensitivityApproach, gradeDataChange: e.target.checked })}
                                            label="按重要数据波动区间分析"
                                        />
                                        <Checkbox
                                            checked={sensitivityApproach.gradeDataUncertainty}
                                            onChange={(e) => setSensitivityApproach({ ...sensitivityApproach, gradeDataUncertainty: e.target.checked })}
                                            label="按重要数据不确定性分析"
                                        />
                                    </div>
                                </EditableField>
                            </>
                        )}

                        <EditableField label="温室气体量化方法">
                            <div className="flex items-center gap-4 min-h-9 flex-wrap">
                                <Checkbox
                                    checked={buildingMethod.excludeMethod}
                                    onChange={(e) => setBuildingMethod({ ...buildingMethod, excludeMethod: e.target.checked })}
                                    label="排放因子法"
                                />
                                <Checkbox
                                    checked={buildingMethod.qualityMethod}
                                    onChange={(e) => setBuildingMethod({ ...buildingMethod, qualityMethod: e.target.checked })}
                                    label="质量守恒法"
                                />
                            </div>
                        </EditableField>
                    </FormBlock>
                </ContentModule>
            </div>

            {/* Right Column (1/3 width) */}
            <div className="w-1/3 flex flex-col gap-3">
                {/* Module 3: 基础信息 (Basic Info) */}
                <ContentModule>
                    <ModuleHeader
                        title="基础信息"
                        iconBadge={IconInfoCircle}
                        iconBadgeTooltip="此内容属于模型信息，编辑后会同步至当前模型下的所有核算"
                    />
                    <FormBlock>
                        <EditableField
                            label="模型名称"
                            value={modelName}
                            onSave={setModelName}
                            type="text"
                        />
                        <EditableField
                            label="系统边界"
                            value={systemBoundary}
                            onSave={setSystemBoundary}
                            type="select"
                            options={[
                                { value: '从摇篮到大门', label: '从摇篮到大门' },
                                { value: '从摇篮到坟墓', label: '从摇篮到坟墓' }
                            ]}
                        />
                        <EditableField
                            label="核算周期"
                            value={accountingPeriod}
                            onSave={setAccountingPeriod}
                            type="date"
                        />
                        <EditableField
                            label="地理边界"
                            value={geoBoundary}
                            onSave={setGeoBoundary}
                            type="dataCard"
                            dataCardOptions={geoLocationOptions}
                        />
                    </FormBlock>
                </ContentModule>

                {/* Module 4: 核算设置 (Accounting Settings) */}
                <ContentModule>
                    <ModuleHeader title="核算设置" />
                    <FormBlock>
                        <EditableField
                            label="项目执行标准"
                            value={projectStandard}
                            onSave={setProjectStandard}
                            type="select"
                            options={[
                                { value: 'ISO 14067', label: 'ISO 14067' }
                            ]}
                        />
                        <EditableField
                            label="适用报告模板"
                            value={reportTemplate}
                            onSave={setReportTemplate}
                            type="select"
                            options={[
                                { value: '通用产品碳足迹报告', label: '通用产品碳足迹报告' }
                            ]}
                        />
                        <EditableField
                            label="质量打分体系"
                            value={qualitySystem}
                            onSave={setQualitySystem}
                            type="select"
                            options={[
                                { value: '蒙特卡洛法', label: '蒙特卡洛法' },
                                { value: '误差传递法', label: '误差传递法' }
                            ]}
                        />
                        <EditableField
                            label="需要多语言报告"
                            value={multiLanguage}
                            onSave={setMultiLanguage}
                            type="select"
                            options={[
                                { value: '是', label: '是' },
                                { value: '否', label: '否' }
                            ]}
                        />
                    </FormBlock>
                </ContentModule>

                {/* Module 5: 高级操作 (Advanced Actions) */}
                <ContentModule>
                    <ModuleHeader
                        title="高级操作"
                        isAccordion={true}
                        isOpen={isAdvancedOpen}
                        onToggle={() => setIsAdvancedOpen(!isAdvancedOpen)}
                        iconBadge={IconInfoCircle}
                        iconBadgeTooltip="此内容属于模型信息，编辑后会同步至当前模型下的所有核算"
                    />
                    {isAdvancedOpen && (
                        <div className="p-3 text-sm text-gray-400">
                            此模块内容待定
                        </div>
                    )}
                </ContentModule>
            </div>
        </div>
    );
};

export default AccountingBasic;
