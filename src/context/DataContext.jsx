/**
 * DataContext - 数据上下文
 * 
 * 🏢 角色：仓库
 * 📝 职责：只负责“存东西”和“取东西”，不负责加工生产。
 * 🔧 包含：projects (项目数据), researchObjects (研究对象数据).
 */
import React, { createContext, useContext, useState } from 'react';
import { projectData, researchObjectData } from '../data/mockData';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [projects, setProjects] = useState(projectData);
    const [researchObjects, setResearchObjects] = useState(researchObjectData);

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
