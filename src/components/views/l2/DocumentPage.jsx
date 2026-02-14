import React from 'react';
import CreateLiteraturePage from '../create/CreateLiteraturePage';
import { documentData } from '../../../data/mockData';
import EntityModulePage from '../shared/EntityModulePage';
import { useNotification } from '../../../context/NotificationContext';

const DocumentPage = ({ showAddButton = true }) => {
    const { addNotification } = useNotification();

    const columns = [
        { title: '文档名称', key: 'name', width: '42%', className: 'font-medium' },
        { title: '来源', key: 'source', width: '12%', className: 'text-sm text-gray-500' },
        { title: '文档类型', key: 'docType', width: '18%', className: 'text-sm text-gray-500' },
        { title: '出版时间', key: 'publishYear', width: '10%', className: 'text-sm text-gray-500' },
        { title: '期刊/出版社', key: 'journal', width: '10%', className: 'text-sm text-gray-500' },
        { title: '创建用户', key: 'creator', width: '8%', className: 'text-sm text-gray-500' }
    ];

    const detailSections = [
        { title: '文档信息', placeholder: '模块占位：后续补充作者、来源、出版信息等字段。' },
        { title: '摘要', placeholder: '模块占位：后续补充文档摘要与关键结论。' },
        { title: '文件', placeholder: '模块占位：后续补充预览、下载与附件管理。' }
    ];

    return (
        <EntityModulePage
            title="文档"
            columns={columns}
            data={documentData}
            createComponent={CreateLiteraturePage}
            showAddButton={showAddButton}
            detailSections={detailSections}
            onCreateSaved={(data) => {
                addNotification(`文档「${data?.name || '未命名文档'}」已保存（演示）`, 'success');
            }}
        />
    );
};

export default DocumentPage;
