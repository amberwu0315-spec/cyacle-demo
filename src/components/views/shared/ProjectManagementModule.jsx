import React, { useEffect, useMemo, useState } from 'react';
import Tag from '../../common/Tag';
import StandardBusinessLayout from '../StandardBusinessLayout';
import CreateProjectPage from '../l2/CreateProjectPage';
import { buildUntitledName } from '../../../utils/createEntityRow';
import { usePagePresentation } from '../../../context/PagePresentationContext';
import {
    getProjectTypeLabel,
    getProjectTypeTagVariant,
    normalizeProjectType,
    toLegacyProjectType
} from '../../../config/projectTypeConfig';

const getAvatarColor = (char) => {
    const colors = [
        'bg-blue-100 text-blue-600',
        'bg-green-100 text-green-600',
        'bg-purple-100 text-purple-600',
        'bg-orange-100 text-orange-600'
    ];
    const index = char ? char.charCodeAt(0) % colors.length : 0;
    return colors[index];
};

export default function ProjectManagementModule({
    projects = [],
    researchObjects = [],
    onAddProject = null,
    onOpenProject = null,
    defaultType = 'all',
    title = '全部项目',
    scopeKey = 'all-projects',
    forceResearchObject = null
}) {
    const { setActions } = usePagePresentation();
    const [mode, setMode] = useState('list'); // list | create

    useEffect(() => {
        setMode('list');
    }, [scopeKey, defaultType, forceResearchObject?.id, forceResearchObject?.name]);

    const activeResearchObjects = useMemo(
        () => (researchObjects || []).filter((obj) => !obj.status || obj.status === 'active'),
        [researchObjects]
    );

    const createResearchObjects = forceResearchObject ? [forceResearchObject] : activeResearchObjects;

    const projectColumns = [
        {
            title: '项目名称',
            key: 'name',
            width: '35%',
            render: (text = '') => (
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${getAvatarColor(text[0])}`}>
                        {text.substring(0, 2)}
                    </div>
                    <span className="font-medium text-gray-900">{text || '-'}</span>
                </div>
            )
        },
        { title: '服务企业', key: 'object', width: '25%', className: 'text-gray-600' },
        {
            title: '需求类型',
            key: 'type',
            width: '15%',
            render: (type) => (
                <Tag variant={getProjectTypeTagVariant(type)} size="sm">
                    {getProjectTypeLabel(type)}
                </Tag>
            )
        },
        { title: '创建时间', key: 'createTime', width: '12%', className: 'text-gray-500 font-mono text-xs' },
        { title: '更新时间', key: 'updateTime', width: '12%', className: 'text-gray-500 font-mono text-xs' }
    ];

    const filterOptions = {
        types: [
            { value: 'all', label: '全部类型' },
            { value: 'pcf', label: '产品碳足迹' },
            { value: 'ocf', label: '组织碳足迹' }
        ],
        statuses: [
            { value: 'active', label: '进行中' },
            { value: 'completed', label: '已完成' },
            { value: 'archived', label: '已归档' }
        ]
    };

    const scopedProjects = useMemo(() => {
        const base = Array.isArray(projects) ? projects : [];
        const byObject = forceResearchObject
            ? base.filter((item) => {
                const itemObjectId = String(item?.objectId || '');
                const targetObjectId = String(forceResearchObject?.id || '');
                if (targetObjectId && itemObjectId) {
                    return itemObjectId === targetObjectId;
                }
                return item?.object === forceResearchObject?.name;
            })
            : base;

        if (defaultType === 'all') {
            return byObject;
        }
        return byObject.filter((item) => normalizeProjectType(item?.type) === defaultType);
    }, [projects, forceResearchObject, defaultType]);

    if (mode === 'create') {
        return (
            <CreateProjectPage
                researchObjects={createResearchObjects}
                initialResearchObjectId={forceResearchObject?.id}
                onCancel={() => setMode('list')}
                onSave={(newProjectData) => {
                    const selectedObject = createResearchObjects.find(
                        (obj) => String(obj.id) === String(newProjectData.research_object_name)
                    );
                    const fallbackName = buildUntitledName();
                    const today = new Date().toISOString().split('T')[0];
                    const newProject = {
                        ...newProjectData,
                        id: String(Date.now()),
                        name: newProjectData.name || fallbackName,
                        object: selectedObject?.name || forceResearchObject?.name || '-',
                        objectId: String(selectedObject?.id || forceResearchObject?.id || ''),
                        type: toLegacyProjectType(newProjectData.type, newProjectData.type || '-'),
                        createTime: today,
                        updateTime: today
                    };

                    onAddProject?.(newProject);
                    setMode('list');
                    onOpenProject?.(newProject);
                }}
            />
        );
    }

    return (
        <StandardBusinessLayout
            title={title}
            filterOptions={filterOptions}
            setHeaderActions={setActions}
            onCreate={() => setMode('create')}
            defaultFilterType={defaultType}
            onRowClick={(row) => onOpenProject?.(row)}
            columns={projectColumns}
            data={scopedProjects}
        />
    );
}
