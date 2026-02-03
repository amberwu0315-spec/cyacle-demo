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
        contactName: '张伟',
        contactEmail: 'zhangwei@example.com',
        introduction: '专业生产节能门窗系统，拥有20年行业经验，年产能达到100万平方米。'
    };

    // 类型视图-设置列表 - 可编辑表格
    const [typeViewList, setTypeViewList] = useState([
        { id: 1, source: '数据库A', level1: '建筑材料', level2: '门窗系统', editing: null }
    ]);

    // 基础信息 - 部分可编辑
    const [projectRemark, setProjectRemark] = useState('这是一个示例项目，用于演示碳足迹核算流程。');

    const basicInfo = {
        demandType: '产品碳足迹',
        creator: '李明',
        createTime: '2024-01-15 10:30:00',
        updateTime: '2024-02-03 14:20:00'
    };

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
            level2: '',
            editing: null
        }]);
    };

    // 开始编辑某个字段
    const handleStartEdit = (id, field) => {
        setTypeViewList(typeViewList.map(item =>
            item.id === id ? { ...item, editing: field } : item
        ));
    };

    // 保存编辑
    const handleSaveEdit = (id, field, value) => {
        setTypeViewList(typeViewList.map(item =>
            item.id === id ? { ...item, [field]: value, editing: null } : item
        ));
    };

    // 取消编辑
    const handleCancelEdit = (id) => {
        setTypeViewList(typeViewList.map(item =>
            item.id === id ? { ...item, editing: null } : item
        ));
    };

    return (
        <div className="flex gap-3 p-3 w-full h-full overflow-y-auto bg-[#F5F6F8]">
            {/* Left Column (2/3 width) */}
            <div className="w-2/3 flex flex-col gap-3">
                {/* 研究对象 - 只读 */}
                <ContentModule>
                    <ModuleHeader title="研究对象" />
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
                                <span className="text-sm text-gray-500 w-24">联系人名称：</span>
                                <span className="flex-1 text-sm text-gray-800">{researchObject.contactName}</span>
                            </div>

                            {/* 联系人邮箱 */}
                            <div className="flex items-center min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-24">联系人邮箱：</span>
                                <span className="flex-1 text-sm text-gray-800">{researchObject.contactEmail}</span>
                            </div>

                            {/* 介绍 */}
                            <div className="flex items-start min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-24 pt-0.5">介绍：</span>
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
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">来源</th>
                                    <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">一级类型</th>
                                    <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">二级类型</th>
                                </tr>
                            </thead>
                            <tbody>
                                {typeViewList.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100">
                                        {/* 来源 - 标签形式 */}
                                        <td className="py-2 px-3">
                                            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                                                {item.source}
                                            </span>
                                        </td>

                                        {/* 一级类型 - 可编辑 */}
                                        <td className="py-2 px-3">
                                            {item.editing === 'level1' ? (
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="text"
                                                        defaultValue={item.level1}
                                                        autoFocus
                                                        className="flex-1 px-2 py-1 text-sm border border-[#087F9C] rounded focus:outline-none"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                handleSaveEdit(item.id, 'level1', e.target.value);
                                                            } else if (e.key === 'Escape') {
                                                                handleCancelEdit(item.id);
                                                            }
                                                        }}
                                                        onBlur={(e) => handleSaveEdit(item.id, 'level1', e.target.value)}
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            const input = e.currentTarget.previousElementSibling;
                                                            handleSaveEdit(item.id, 'level1', input.value);
                                                        }}
                                                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                                                    >
                                                        <IconCheck size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancelEdit(item.id)}
                                                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                                                    >
                                                        <IconX size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                                                    onClick={() => handleStartEdit(item.id, 'level1')}
                                                >
                                                    <span className="text-sm text-gray-800">{item.level1 || '点击编辑'}</span>
                                                    <IconPencil size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            )}
                                        </td>

                                        {/* 二级类型 - 可编辑 */}
                                        <td className="py-2 px-3">
                                            {item.editing === 'level2' ? (
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="text"
                                                        defaultValue={item.level2}
                                                        autoFocus
                                                        className="flex-1 px-2 py-1 text-sm border border-[#087F9C] rounded focus:outline-none"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                handleSaveEdit(item.id, 'level2', e.target.value);
                                                            } else if (e.key === 'Escape') {
                                                                handleCancelEdit(item.id);
                                                            }
                                                        }}
                                                        onBlur={(e) => handleSaveEdit(item.id, 'level2', e.target.value)}
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            const input = e.currentTarget.previousElementSibling;
                                                            handleSaveEdit(item.id, 'level2', input.value);
                                                        }}
                                                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                                                    >
                                                        <IconCheck size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancelEdit(item.id)}
                                                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                                                    >
                                                        <IconX size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                                                    onClick={() => handleStartEdit(item.id, 'level2')}
                                                >
                                                    <span className="text-sm text-gray-800">{item.level2 || '点击编辑'}</span>
                                                    <IconPencil size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            )}
                                        </td>
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
                            {/* 项目需求类型 - 只读 */}
                            <div className="flex items-center min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-28">项目需求类型：</span>
                                <span className="flex-1 text-sm text-gray-800">{basicInfo.demandType}</span>
                            </div>

                            {/* 创建人 - 只读 */}
                            <div className="flex items-center min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-28">创建人：</span>
                                <span className="flex-1 text-sm text-gray-800">{basicInfo.creator}</span>
                            </div>

                            {/* 创建时间 - 只读 */}
                            <div className="flex items-center min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-28">创建时间：</span>
                                <span className="flex-1 text-sm text-gray-800">{basicInfo.createTime}</span>
                            </div>

                            {/* 更新时间 - 只读 */}
                            <div className="flex items-center min-h-9 px-3">
                                <span className="text-sm text-gray-500 w-28">更新时间：</span>
                                <span className="flex-1 text-sm text-gray-800">{basicInfo.updateTime}</span>
                            </div>

                            {/* 项目备注 - 可编辑 */}
                            <div className="px-3 pt-2">
                                <EditableField
                                    label="项目备注"
                                    value={projectRemark}
                                    onSave={setProjectRemark}
                                    type="textarea"
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
