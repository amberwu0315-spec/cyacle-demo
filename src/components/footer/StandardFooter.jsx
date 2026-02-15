import React, { useEffect, useMemo, useState } from 'react';
import { IconExternalLink, IconPlus, IconX } from '@tabler/icons-react';
import FooterModal from './FooterModal';
import DataGrid from '../common/DataGrid';
import DataController from '../common/DataController';
import { footerModelConfig } from '../../data/footerModelConfig';
import EntityMasterDetailPage from '../views/shared/EntityMasterDetailPage';
import { buildCreatedEntityRow } from '../../utils/createEntityRow';
import { readStore, writeStore } from '../../utils/persistStore';
import { buildStandardDataControllerRules } from '../../config/dataControllerRules';
import { useNotification } from '../../context/NotificationContext';

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

const StandardFooter = ({ moduleKey, onClose, filterOptions = {} }) => {
  const { addNotification } = useNotification();
  const config = footerModelConfig[moduleKey];
  const persistKey = `cyacle:footer-created:${moduleKey}`;
  const uiPersistKey = `cyacle:footer-ui:${moduleKey}`;
  const [searchQuery, setSearchQuery] = useState(() => {
    const saved = readStore(uiPersistKey, {});
    return saved?.searchQuery || '';
  });
  const [filterType, setFilterType] = useState(() => {
    const saved = readStore(uiPersistKey, {});
    return saved?.filterType || 'all';
  });
  const [filterStatus, setFilterStatus] = useState(() => {
    const saved = readStore(uiPersistKey, {});
    return saved?.filterStatus || 'all';
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
  const [activeView, setActiveView] = useState('table');

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
  const controllerRules = useMemo(() => buildStandardDataControllerRules({
    title: config?.title || '列表',
    filterOptions,
    viewOptions: [{ value: 'table', label: '表格' }],
    defaultView: 'table'
  }), [config?.title, filterOptions]);
  const conditionItems = useMemo(() => {
    const items = [{
      ...controllerRules.searchRule,
      value: searchQuery,
      isActive: searchQuery.trim().length > 0,
      onChange: setSearchQuery
    }];

    controllerRules.filterRules.forEach((rule) => {
      if (rule.id === 'type') {
        items.push({
          ...rule,
          value: filterType,
          isActive: filterType !== (rule.allValue ?? 'all'),
          onChange: setFilterType
        });
      }
      if (rule.id === 'status') {
        items.push({
          ...rule,
          value: filterStatus,
          isActive: filterStatus !== (rule.allValue ?? 'all'),
          onChange: setFilterStatus
        });
      }
    });

    return items;
  }, [controllerRules, searchQuery, filterType, filterStatus]);
  const hasActiveConditions = useMemo(() => (
    searchQuery.trim().length > 0 || filterType !== 'all' || filterStatus !== 'all'
  ), [searchQuery, filterType, filterStatus]);

  const activeRow = rows.find((item) => String(item.id) === String(activeRowId));
  const isDetailMode = mode === 'detail' && Boolean(activeRow);
  const isCreateMode = mode === 'create';
  const hideTopBar = isDetailMode || moduleKey === 'docs';

  useEffect(() => {
    const persisted = readStore(persistKey, []);
    setCreatedRows(Array.isArray(persisted) ? persisted : []);
    const savedUi = readStore(uiPersistKey, {});
    setActiveRowId(savedUi?.activeRowId ?? null);
    setMode(savedUi?.mode || 'list');
    setSearchQuery(savedUi?.searchQuery || '');
    setFilterType(savedUi?.filterType || 'all');
    setFilterStatus(savedUi?.filterStatus || 'all');
  }, [moduleKey, persistKey, uiPersistKey]);

  useEffect(() => {
    writeStore(persistKey, createdRows);
  }, [persistKey, createdRows]);

  useEffect(() => {
    writeStore(uiPersistKey, {
      searchQuery,
      filterType,
      filterStatus,
      activeRowId,
      mode
    });
  }, [uiPersistKey, searchQuery, filterType, filterStatus, activeRowId, mode]);

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
      const typeCandidate = item?.type ?? item?.category ?? item?.kind ?? item?.sourceType ?? item?.locationType ?? item?.docType ?? item?.descType;
      const statusCandidate = item?.status ?? item?.state;
      const typeMatched = filterType === 'all'
        || !typeCandidate
        || String(typeCandidate).toLowerCase() === filterType.toLowerCase();
      const statusMatched = filterStatus === 'all'
        || !statusCandidate
        || String(statusCandidate).toLowerCase() === filterStatus.toLowerCase();

      return searchMatched && typeMatched && statusMatched;
    });
  }, [rows, searchQuery, filterType, filterStatus]);

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

  const detailActions = (
    <>
      <button
        type="button"
        onClick={() => addNotification(`「${config?.title || '模块'}」独立窗口功能建设中`, 'info')}
        className="p-0 w-7 h-7 rounded text-slate-600 hover:text-[#0EA5B7] hover:bg-slate-100 inline-flex items-center justify-center transition-colors"
        title="打开独立窗口"
      >
        <IconExternalLink size={16} />
      </button>
      <button
        type="button"
        onClick={onClose}
        className="p-0 w-7 h-7 rounded text-slate-500 hover:text-slate-700 hover:bg-slate-100 inline-flex items-center justify-center transition-colors"
        title="关闭"
      >
        <IconX size={16} />
      </button>
    </>
  );

  const handleResetConditions = () => {
    setSearchQuery('');
    setFilterType('all');
    setFilterStatus('all');
  };

  const renderDataController = () => (
    <div className="p-3 pb-0">
      <DataController
        controllerLabel={controllerRules.controllerLabel}
        conditionItems={conditionItems}
        showViewSettings
        viewOptions={controllerRules.viewOptions}
        activeView={activeView}
        onViewChange={setActiveView}
        onReset={handleResetConditions}
        resetDisabled={!hasActiveConditions}
        columnSettingsPlaceholder={controllerRules.columnSettingsPlaceholder}
      />
    </div>
  );

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
      showAddButton={Boolean(CreatePageComponent && shouldShowAddButton)}
      onAdd={handleCreate}
      onCollapse={() => {
        setActiveRowId(null);
        setMode('list');
      }}
      sections={config?.modules || []}
      detailActions={detailActions}
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
      headless={hideTopBar}
    >
      {isCreateMode ? (
        renderCreateView()
      ) : moduleKey === 'docs' ? (
        <DocumentPage onClose={onClose} showAddButton={false} masterDetailOnly />
      ) : (
        <>
          {!isDetailMode && renderDataController()}
          {isDetailMode ? renderDetailModules() : renderTableView()}
        </>
      )}
    </FooterModal>
  );
};

export default StandardFooter;

