import React, { useMemo, useState } from 'react';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import FooterModal from './FooterModal';
import DataGrid from '../common/DataGrid';
import { ContentModule, ModuleHeader } from '../common/ContentModule';
import { footerModelConfig } from '../../data/footerModelConfig';

// 导入创建页面
import CreateComponentPage from '../views/create/CreateComponentPage';
import CreateLiteratureFactorPage from '../views/create/CreateLiteratureFactorPage';
import CreateCompositeFactorPage from '../views/create/CreateCompositeFactorPage';
import CreateProductPage from '../views/create/CreateProductPage';
import CreateDataPage from '../views/create/CreateDataPage';
import CreateDataSourcePage from '../views/create/CreateDataSourcePage';
import CreateLocationPage from '../views/create/CreateLocationPage';
import CreateBasicFlowPage from '../views/create/CreateBasicFlowPage';

// 导入特殊布局页面
import DocumentPage from '../views/l2/DocumentPage';

const StandardFooter = ({ moduleKey, onClose }) => {
  const config = footerModelConfig[moduleKey];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRowId, setActiveRowId] = useState(null);
  const [mode, setMode] = useState('list'); // 'list' | 'detail' | 'create'

  const rows = config?.rows || [];
  const columns = config?.columns || [];
  const activeRow = rows.find((item) => String(item.id) === String(activeRowId));
  const isDetailMode = mode === 'detail' && Boolean(activeRow);
  const isCreateMode = mode === 'create';

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return rows.filter((item) => {
      const searchMatched = !query || Object.values(item).some((val) => String(val || '').toLowerCase().includes(query));

      return searchMatched;
    });
  }, [rows, searchQuery]);

  // 创建页面映射
  const createPageMap = {
    'product': CreateProductPage,
    'data': CreateDataPage,
    'datasource': CreateDataSourcePage,
    'location': CreateLocationPage,
    'component': CreateComponentPage,
    'factors': CreateLiteratureFactorPage,
    'baseflow': CreateBasicFlowPage,
    'composite': CreateCompositeFactorPage,
  };

  const CreatePageComponent = createPageMap[moduleKey];

  // 处理创建
  const handleCreate = () => {
    setMode('create');
  };

  // 保存创建的数据
  const handleSaveCreate = (formData) => {
    console.log('创建数据：', formData);
    // TODO: 实际保存逻辑
    setMode('list');
  };

  // 取消创建
  const handleCancelCreate = () => {
    setMode('list');
  };

  // 文档模块隐藏添加按钮
  const shouldShowAddButton = moduleKey !== 'docs';

  const businessActions = shouldShowAddButton ? (
    <button
      className="qy-btn-primary"
      title="添加"
      onClick={handleCreate}
    >
      <IconPlus size={14} />
      <span>添加</span>
    </button>
  ) : null;

  const renderSearchBar = () => {
    return (
      <div className="p-3 pb-0">
        <div className="relative max-w-md">
          <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={`搜索${config?.title || ''}...`}
            className="w-full pl-9 pr-4 py-1.5 text-[13px] border border-slate-300 rounded-md bg-white hover:border-[#0EA5B7] focus:outline-none focus:border-[#0EA5B7] transition-colors"
          />
        </div>
      </div>
    );
  };

  const renderTableView = () => (
    <div className="p-3 h-full">
      <DataGrid
        title={config?.title || '列表'}
        columns={columns}
        rows={filteredRows}
        rowKey="id"
        onRowDoubleClick={(row) => {
          setActiveRowId(row.id);
          setMode('detail');
        }}
        storageKey={`footer-grid:${moduleKey}`}
        showToolbar={false}
        showFooter
        emptyText="暂无数据"
        className="h-full"
        minTableWidth={1100}
      />
    </div>
  );

  const renderDetailModules = () => (
    <div className="p-3 flex gap-3 h-full">
      <div className="w-[260px] bg-white rounded border border-gray-200 p-2 overflow-y-auto">
        {rows.map((row) => (
          <button
            key={row.id}
            onClick={() => setActiveRowId(row.id)}
            className={`w-full text-left px-2 py-2 rounded mb-1 text-sm ${String(activeRowId) === String(row.id) ? 'bg-cyan-50 border border-cyan-300' : 'hover:bg-gray-50 border border-transparent'}`}
          >
            {row.name || row.nameCN}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        <ContentModule>
          <ModuleHeader title="详情概览" />
          <div className="p-3 text-sm text-gray-700">{activeRow?.name || activeRow?.nameCN}</div>
        </ContentModule>

        {(config?.modules || []).map((module) => (
          <ContentModule key={module.title}>
            <ModuleHeader title={module.title} />
            <div className="p-3 text-sm text-gray-500">{module.placeholder}</div>
          </ContentModule>
        ))}
      </div>
    </div>
  );

  // 渲染创建页面
  const renderCreateView = () => {
    if (!CreatePageComponent) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>该模块暂不支持创建功能</p>
        </div>
      );
    }

    return (
      <CreatePageComponent
        onSave={handleSaveCreate}
        onCancel={handleCancelCreate}
      />
    );
  };

  return (
    <FooterModal
      title={config?.title || '模块'}
      businessActions={!isCreateMode && moduleKey !== 'docs' && businessActions}
      onClose={onClose}
      onCollapse={isDetailMode ? () => {
        setActiveRowId(null);
        setMode('list');
      } : undefined}
      isCreateMode={isCreateMode}
      headless={moduleKey === 'docs'}
    >
      {isCreateMode ? (
        renderCreateView()
      ) : moduleKey === 'docs' ? (
        <DocumentPage onClose={onClose} />
      ) : (
        <>
          {!isDetailMode && renderSearchBar()}
          {isDetailMode ? renderDetailModules() : renderTableView()}
        </>
      )}
    </FooterModal>
  );
};

export default StandardFooter;

