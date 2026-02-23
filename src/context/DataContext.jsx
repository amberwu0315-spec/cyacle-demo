/**
 * DataContext - 数据上下文
 * 
 * 🏢 角色：仓库
 * 📝 职责：只负责“存东西”和“取东西”，不负责加工生产。
 * 🔧 包含：projects (项目数据), researchObjects (研究对象数据).
 */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { projectData, researchObjectData } from '../data/mockData';
import { readStore, writeStore } from '../utils/persistStore';
import { useUser } from './UserContext';

const DataContext = createContext(null);

const DEFAULT_ROLE_KEY = 'enterprise';
const buildProjectsKey = (roleKey = DEFAULT_ROLE_KEY) => `cyacle:data:${roleKey}:projects`;
const buildResearchObjectsKey = (roleKey = DEFAULT_ROLE_KEY) => `cyacle:data:${roleKey}:researchObjects`;
const buildAccountingVersionsKey = (roleKey = DEFAULT_ROLE_KEY) => `cyacle:data:${roleKey}:accountingVersions`;

const normalizeId = (val) => String(val ?? '').trim();
const ensureArray = (val, fallback) => (Array.isArray(val) ? val : fallback);
const ensureObject = (val, fallback = {}) => (
    val && typeof val === 'object' && !Array.isArray(val) ? val : fallback
);

const readRoleState = (roleKey) => {
    const projects = ensureArray(readStore(buildProjectsKey(roleKey), projectData), projectData);
    const researchObjects = ensureArray(readStore(buildResearchObjectsKey(roleKey), researchObjectData), researchObjectData);
    const accountingVersionsByProject = ensureObject(
        readStore(buildAccountingVersionsKey(roleKey), {}),
        {}
    );
    return { projects, researchObjects, accountingVersionsByProject };
};

const withEntityId = (entity) => {
    if (!entity || typeof entity !== 'object') {
        return entity;
    }
    if (normalizeId(entity.id)) {
        return entity;
    }
    return { ...entity, id: `tmp_${Date.now()}` };
};

const upsertEntity = (prev, entity) => {
    const nextEntity = withEntityId(entity);
    const nextId = normalizeId(nextEntity?.id);
    if (!nextId) {
        return prev;
    }

    const idx = prev.findIndex((item) => normalizeId(item?.id) === nextId);
    if (idx === -1) {
        return [nextEntity, ...prev];
    }

    const next = [...prev];
    next[idx] = { ...next[idx], ...nextEntity };
    return next;
};

export const DataProvider = ({ children }) => {
    const { roleKey = DEFAULT_ROLE_KEY } = useUser();
    const [projects, setProjects] = useState(projectData);
    const [researchObjects, setResearchObjects] = useState(researchObjectData);
    const [accountingVersionsByProject, setAccountingVersionsByProject] = useState({});
    const [isRoleHydrated, setIsRoleHydrated] = useState(false);
    const [hydratedRoleKey, setHydratedRoleKey] = useState(null);

    useEffect(() => {
        setIsRoleHydrated(false);
        const roleState = readRoleState(roleKey);
        setProjects(roleState.projects);
        setResearchObjects(roleState.researchObjects);
        setAccountingVersionsByProject(roleState.accountingVersionsByProject);
        setHydratedRoleKey(roleKey);
        setIsRoleHydrated(true);
    }, [roleKey]);

    useEffect(() => {
        if (!isRoleHydrated || hydratedRoleKey !== roleKey) {
            return;
        }
        writeStore(buildProjectsKey(roleKey), projects);
    }, [projects, roleKey, hydratedRoleKey, isRoleHydrated]);

    useEffect(() => {
        if (!isRoleHydrated || hydratedRoleKey !== roleKey) {
            return;
        }
        writeStore(buildResearchObjectsKey(roleKey), researchObjects);
    }, [researchObjects, roleKey, hydratedRoleKey, isRoleHydrated]);

    useEffect(() => {
        if (!isRoleHydrated || hydratedRoleKey !== roleKey) {
            return;
        }
        writeStore(buildAccountingVersionsKey(roleKey), accountingVersionsByProject);
    }, [accountingVersionsByProject, roleKey, hydratedRoleKey, isRoleHydrated]);

    const addProject = useCallback((newProject) => {
        setProjects((prev) => [withEntityId(newProject), ...prev]);
    }, []);

    const upsertProject = useCallback((project) => {
        setProjects((prev) => upsertEntity(prev, project));
    }, []);

    const updateProject = useCallback((projectId, patch) => {
        const targetId = normalizeId(projectId);
        if (!targetId) {
            return;
        }
        setProjects((prev) => prev.map((item) => {
            if (normalizeId(item?.id) !== targetId) {
                return item;
            }
            const nextPatch = typeof patch === 'function' ? patch(item) : patch;
            if (!nextPatch || typeof nextPatch !== 'object') {
                return item;
            }
            return {
                ...item,
                ...nextPatch,
                updateTime: nextPatch.updateTime || item.updateTime || new Date().toISOString().slice(0, 10)
            };
        }));
    }, []);

    const removeProject = useCallback((projectId) => {
        const targetId = normalizeId(projectId);
        if (!targetId) {
            return;
        }
        setProjects((prev) => prev.filter((item) => normalizeId(item?.id) !== targetId));
    }, []);

    const addResearchObject = useCallback((newObj) => {
        setResearchObjects((prev) => [withEntityId(newObj), ...prev]);
    }, []);

    const upsertResearchObject = useCallback((obj) => {
        setResearchObjects((prev) => upsertEntity(prev, obj));
    }, []);

    const updateResearchObject = useCallback((objectId, patch) => {
        const targetId = normalizeId(objectId);
        if (!targetId) {
            return;
        }
        setResearchObjects((prev) => prev.map((item) => {
            if (normalizeId(item?.id) !== targetId) {
                return item;
            }
            const nextPatch = typeof patch === 'function' ? patch(item) : patch;
            if (!nextPatch || typeof nextPatch !== 'object') {
                return item;
            }
            return { ...item, ...nextPatch };
        }));
    }, []);

    const removeResearchObject = useCallback((objectId) => {
        const targetId = normalizeId(objectId);
        if (!targetId) {
            return;
        }
        setResearchObjects((prev) => prev.filter((item) => normalizeId(item?.id) !== targetId));
    }, []);

    const getProjectById = useCallback((projectId) => {
        const targetId = normalizeId(projectId);
        if (!targetId) {
            return null;
        }
        return projects.find((item) => normalizeId(item?.id) === targetId) || null;
    }, [projects]);

    const getResearchObjectById = useCallback((objectId) => {
        const targetId = normalizeId(objectId);
        if (!targetId) {
            return null;
        }
        return researchObjects.find((item) => normalizeId(item?.id) === targetId) || null;
    }, [researchObjects]);

    const getProjectsByResearchObject = useCallback((objectIdOrName) => {
        const target = normalizeId(objectIdOrName);
        if (!target) {
            return [];
        }
        return projects.filter((item) => {
            const itemObjectId = normalizeId(item?.objectId);
            const itemObjectName = normalizeId(item?.object);
            return itemObjectId === target || itemObjectName === target;
        });
    }, [projects]);

    const getAccountingVersions = useCallback((projectId) => {
        const targetId = normalizeId(projectId);
        if (!targetId) {
            return [];
        }
        const versions = accountingVersionsByProject[targetId];
        return Array.isArray(versions) ? versions : [];
    }, [accountingVersionsByProject]);

    const saveAccountingVersion = useCallback((projectId, payload = {}) => {
        const targetId = normalizeId(projectId);
        if (!targetId) {
            return;
        }

        setAccountingVersionsByProject((prev) => {
            const currentVersions = Array.isArray(prev[targetId]) ? prev[targetId] : [];
            const nextNumber = currentVersions.length + 1;
            const now = new Date();
            const nextId = `acct_ver_${now.getTime()}_${Math.floor(Math.random() * 1000)}`;
            const snapshot = payload?.snapshot
                ? JSON.parse(JSON.stringify(payload.snapshot))
                : null;

            const nextVersion = {
                id: nextId,
                number: nextNumber,
                versionCode: payload?.versionCode || `V${String(nextNumber).padStart(3, '0')}`,
                name: payload?.name || `版本 ${nextNumber}`,
                creator: payload?.creator || 'Current User',
                sourceL3: payload?.sourceL3 || 'acct_model_config',
                createTime: now.toISOString(),
                snapshot,
                summary: payload?.summary || null
            };

            return {
                ...prev,
                [targetId]: [nextVersion, ...currentVersions]
            };
        });
    }, []);

    const resetRoleData = useCallback(() => {
        setProjects(projectData);
        setResearchObjects(researchObjectData);
        setAccountingVersionsByProject({});
    }, []);

    const value = useMemo(() => ({
        roleKey,
        isRoleHydrated,
        hydratedRoleKey,
        projects,
        addProject,
        upsertProject,
        updateProject,
        removeProject,
        getProjectById,
        getProjectsByResearchObject,
        researchObjects,
        addResearchObject,
        upsertResearchObject,
        updateResearchObject,
        removeResearchObject,
        getResearchObjectById,
        accountingVersionsByProject,
        getAccountingVersions,
        saveAccountingVersion,
        resetRoleData
    }), [
        roleKey,
        isRoleHydrated,
        hydratedRoleKey,
        projects,
        addProject,
        upsertProject,
        updateProject,
        removeProject,
        getProjectById,
        getProjectsByResearchObject,
        researchObjects,
        addResearchObject,
        upsertResearchObject,
        updateResearchObject,
        removeResearchObject,
        getResearchObjectById,
        accountingVersionsByProject,
        getAccountingVersions,
        saveAccountingVersion,
        resetRoleData
    ]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
