import React, { useEffect, useState } from 'react';
import { useHeaderContext } from '../../../context/HeaderContext';
import { IconPlus, IconPencil, IconCheck, IconX } from '@tabler/icons-react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import EditableField from '../../common/EditableField';

const BasisPage = () => {
    const { setActions, setTitleOverride, setLayoutConfig } = useHeaderContext();

    // 研究对象 - 只读数据
    const researchObject = {
        name: '示例门窗生产企业',
        nameLink: '#',
        address: '中国广东省深圳市南山区科技园',
        contact_name: '张伟', // Aligned with schema: contactName -> contact_name
        contact_email: 'zhangwei@example.com',
        introduction: '专业生产节能门窗系统，拥有20年行业经验，年产能达到100万平方米。'
    };

    // 类型视图-设置列表 - 可编辑表格
    const [typeViewList, setTypeViewList] = useState([
        { id: 1, source: '数据库A', level1: '建筑材料', level2: '门窗系统' }
    ]);

    // 基础信息 - 扩展 Project 实体
    const [projectData, setProjectData] = useState({
        type: 'CFP',              // demandType -> type
        owner: '李明',             // creator -> owner
        created_at: '2024-01-15 10:30:00',
        updated_at: '2024-02-03 14:20:00',
        description: '这是一个示例项目，用于演示碳足迹核算流程。' // remark -> description
    });

    useEffect(() => {
        setLayoutConfig('title-only');
        setActions(null);

        return () => {
            setActions(null);
            setTitleOverride(null);
        };
    }, [setActions, setTitleOverride, setLayoutConfig]);

    // 添加新的类型视图行
    const handleAddTypeView = () => {
        const newId = Math.max(...typeViewList.map(item => item.id), 0) + 1;
        setTypeViewList([...typeViewList, {
            id: newId,
            source: '数据库B',
            level1: '',
            level2: ''
        }]);
    };

    const handleUpdateTypeView = (id, field, value) => {
        setTypeViewList(typeViewList.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    return (
        <div className="flex gap-3 p-3 w-full h-full overflow-y-auto bg-[#F5F6F8]">
            {/* Left Column (2/3 width) */}
            <div className="w-2/3 flex flex-col gap-3">
                {/* 研究对象 - 只读 */}
                <ContentModule>
                    <ModuleHeader title="所属研究对象" />
                    <div className="p-3">
                        <div className="space-y-0.5">
                            {/* 名称 - 带链接 */}
                            <div className="flex items-center min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-24">名称：</span>
                                <a
                                    href={researchObject.nameLink}
                                    className="flex-1 text-sm text-[#087F9C] hover:underline"
                                >
                                    {researchObject.name}
                                </a>
                            </div>

                            {/* 地址 */}
                            <div className="flex items-center min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-24">地址：</span>
                                <span className="flex-1 text-sm text-gray-800">{researchObject.address}</span>
                            </div>

                            {/* 联系人名称 */}
                            <div className="flex items-center min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-24">联系人姓名：</span>
                                <span className="flex-1 text-sm text-gray-800">{researchObject.contact_name}</span>
                            </div>

                            {/* 联系人邮箱 */}
                            <div className="flex items-center min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-24">联系人邮箱：</span>
                                <span className="flex-1 text-sm text-gray-800">{researchObject.contact_email}</span>
                            </div>

                            {/* 介绍 */}
                            <div className="flex items-start min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-24 pt-0.5">企业简介：</span>
                                <span className="flex-1 text-sm text-gray-800">{researchObject.introduction}</span>
                            </div>
                        </div>
                    </div>
                </ContentModule>

                {/* 类型视图-设置列表 - 可编辑表格 */}
                <ContentModule>
                    <ModuleHeader
                        title="类型视图-设置列表"
                        actions={
                            <button
                                onClick={handleAddTypeView}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-[#087F9C] hover:bg-[#076A82] rounded transition-colors"
                            >
                                <IconPlus size={16} />
                                添加
                            </button>
                        }
                    />
                    <div className="p-3">
                        {/* Standard Table with EditableField */}
                        <table className="w-full border-collapse">
                            <colgroup>
                                <col className="w-32" />
                                <col className="w-auto" />
                                <col className="w-auto" />
                            </colgroup>
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">来源</th>
                                    <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">一级类型</th>
                                    <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">二级类型</th>
                                </tr>
                            </thead>
                            <tbody>
                                {typeViewList.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100 group">
                                        {/* 来源 - 标签形式 (暂不支持编辑，只读展示) */}
                                        <td className="py-2 px-3 align-middle">
                                            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                                                {item.source}
                                            </span>
                                        </td>

                                        {/* 一级类型 - 使用 EditableField table 模式 */}
                                        <EditableField
                                            layout="table"
                                            value={item.level1}
                                            onSave={(val) => handleUpdateTypeView(item.id, 'level1', val)}
                                            type="text"
                                        />

                                        {/* 二级类型 - 使用 EditableField table 模式 */}
                                        <EditableField
                                            layout="table"
                                            value={item.level2}
                                            onSave={(val) => handleUpdateTypeView(item.id, 'level2', val)}
                                            type="text"
                                        />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ContentModule>
            </div>

            {/* Right Column (1/3 width) */}
            <div className="w-1/3 flex flex-col gap-3">
                {/* 基础信息 */}
                <ContentModule>
                    <ModuleHeader title="基础信息" />
                    <div className="p-3">
                        <div className="space-y-0.5">
                            {/* 需求类型 - 只读 */}
                            <div className="flex items-center min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-28">需求类型：</span>
                                <span className="flex-1 text-sm text-gray-800">
                                    {projectData.type === 'CFP' ? '产品碳足迹 (CFP)' : '组织碳足迹 (CFO)'}
                                </span>
                            </div>

                            {/* 创建人 - 只读 */}
                            <div className="flex items-center min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-28">创建人：</span>
                                <span className="flex-1 text-sm text-gray-800">{projectData.owner}</span>
                            </div>

                            {/* 创建时间 - 只读 */}
                            <div className="flex items-center min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-28">创建时间：</span>
                                <span className="flex-1 text-sm text-gray-800">{projectData.created_at}</span>
                            </div>

                            {/* 更新时间 - 只读 */}
                            <div className="flex items-center min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-28">更新时间：</span>
                                <span className="flex-1 text-sm text-gray-800">{projectData.updated_at}</span>
                            </div>

                            {/* 项目描述 - 可编辑 */}
                            <div className="px-3 pt-2">
                                <EditableField
                                    label="项目描述"
                                    value={projectData.description}
                                    onSave={(val) => setProjectData({ ...projectData, description: val })}
                                    type="textarea"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                </ContentModule>
            </div>
        </div>
    );
};

export default BasisPage;
