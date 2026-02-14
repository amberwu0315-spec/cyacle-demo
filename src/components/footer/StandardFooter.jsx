import React, { useEffect, useMemo, useState } from 'react';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import FooterModal from './FooterModal';
import DataGrid from '../common/DataGrid';
import { footerModelConfig } from '../../data/footerModelConfig';
import EntityMasterDetailPage from '../views/shared/EntityMasterDetailPage';
import { buildCreatedEntityRow } from '../../utils/createEntityRow';
import { readStore, writeStore } from '../../utils/persistStore';

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
  const persistKey = `cyacle:footer-created:${moduleKey}`;
  const uiPersistKey = `cyacle:footer-ui:${moduleKey}`;
  const [searchQuery, setSearchQuery] = useState(() => {
    const saved = readStore(uiPersistKey, {});
    return saved?.searchQuery || '';
  });
  const [activeRowId, setActiveRowId] = useState(() => {
    const saved = readStore(uiPersistKey, {});
    return saved?.activeRowId ?? null;
  });
  const [mode, setMode] = useState(() => {
    const saved = readStore(uiPersistKey, {});
    return saved?.mode || 'list';
  }); // 'list' | 'detail' | 'create'
  const [createdRows, setCreatedRows] = useState(() => {
    const persisted = readStore(persistKey, []);
    return Array.isArray(persisted) ? persisted : [];
  });

  const columns = config?.columns || [];
  const rows = useMemo(() => {
    const baseRows = config?.rows || [];
    if (!createdRows.length) {
      return baseRows;
    }
    const baseIds = new Set(baseRows.map((item) => String(item?.id)));
    const uniqueCreatedRows = createdRows.filter((item) => !baseIds.has(String(item?.id)));
    return [...uniqueCreatedRows, ...baseRows];
  }, [config?.rows, createdRows]);
  const activeRow = rows.find((item) => String(item.id) === String(activeRowId));
  const isDetailMode = mode === 'detail' && Boolean(activeRow);
  const isCreateMode = mode === 'create';

  useEffect(() => {
    const persisted = readStore(persistKey, []);
    setCreatedRows(Array.isArray(persisted) ? persisted : []);
    const savedUi = readStore(uiPersistKey, {});
    setActiveRowId(savedUi?.activeRowId ?? null);
    setMode(savedUi?.mode || 'list');
    setSearchQuery(savedUi?.searchQuery || '');
  }, [moduleKey, persistKey, uiPersistKey]);

  useEffect(() => {
    writeStore(persistKey, createdRows);
  }, [persistKey, createdRows]);

  useEffect(() => {
    writeStore(uiPersistKey, {
      searchQuery,
      activeRowId,
      mode
    });
  }, [uiPersistKey, searchQuery, activeRowId, mode]);

  useEffect(() => {
    if (mode === 'detail' && activeRowId !== null && !rows.some((item) => String(item.id) === String(activeRowId))) {
      setMode('list');
      setActiveRowId(null);
    }
  }, [mode, activeRowId, rows]);

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
    const createdRow = buildCreatedEntityRow({
      moduleKey,
      label: config?.title || '记录',
      payload: formData,
      columns,
      existingCount: rows.length
    });
    setCreatedRows((prev) => [createdRow, ...prev]);
    setActiveRowId(createdRow.id);
    setMode('detail');
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
    <EntityMasterDetailPage
      listTitle={config?.title || '列表'}
      listData={rows}
      selectedId={activeRowId}
      onSelect={setActiveRowId}
      onCollapse={() => {
        setActiveRowId(null);
        setMode('list');
      }}
      sections={config?.modules || []}
      managePageHeader={false}
    />
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
        <DocumentPage onClose={onClose} showAddButton={false} />
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

