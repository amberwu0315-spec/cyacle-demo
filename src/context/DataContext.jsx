/**
 * DataContext - 数据上下文
 * 
 * 🏢 角色：仓库
 * 📝 职责：只负责“存东西”和“取东西”，不负责加工生产。
 * 🔧 包含：projects (项目数据), researchObjects (研究对象数据).
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { projectData, researchObjectData } from '../data/mockData';
import { readStore, writeStore } from '../utils/persistStore';

const DataContext = createContext(null);

const PROJECTS_KEY = 'cyacle:data:projects';
const RESEARCH_OBJECTS_KEY = 'cyacle:data:researchObjects';

export const DataProvider = ({ children }) => {
    const [projects, setProjects] = useState(() => {
        const persisted = readStore(PROJECTS_KEY, projectData);
        return Array.isArray(persisted) ? persisted : projectData;
    });
    const [researchObjects, setResearchObjects] = useState(() => {
        const persisted = readStore(RESEARCH_OBJECTS_KEY, researchObjectData);
        return Array.isArray(persisted) ? persisted : researchObjectData;
    });

    useEffect(() => {
        writeStore(PROJECTS_KEY, projects);
    }, [projects]);

    useEffect(() => {
        writeStore(RESEARCH_OBJECTS_KEY, researchObjects);
    }, [researchObjects]);

    const addProject = (newProject) => {
        setProjects(prev => [newProject, ...prev]);
    };

    const addResearchObject = (newObj) => {
        setResearchObjects(prev => [newObj, ...prev]);
    };

    const value = {
        projects,
        addProject,
        researchObjects,
        addResearchObject
    };

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
