import React, { useMemo, useState } from 'react';
import { IconPlus, IconFilter } from '@tabler/icons-react';
import FooterModal from './FooterModal';
import DataGrid from '../common/DataGrid';
import { ContentModule, ModuleHeader } from '../common/ContentModule';
import { footerModelConfig } from '../../data/footerModelConfig';

const StandardFooter = ({ moduleKey, onClose, filterOptions = {} }) => {
  const config = footerModelConfig[moduleKey];
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRowId, setActiveRowId] = useState(null);

  const rows = config?.rows || [];
  const columns = config?.columns || [];
  const activeRow = rows.find((item) => String(item.id) === String(activeRowId));
  const isDetailMode = Boolean(activeRow);

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return rows.filter((item) => {
      const typeCandidate = item?.type || item?.descType || item?.locationType || item?.docType;
      const statusCandidate = item?.status;

      const typeMatched = filterType === 'all' || !typeCandidate || String(typeCandidate).toLowerCase() === filterType.toLowerCase();
      const statusMatched = filterStatus === 'all' || !statusCandidate || String(statusCandidate).toLowerCase() === filterStatus.toLowerCase();
      const searchMatched = !query || Object.values(item).some((val) => String(val || '').toLowerCase().includes(query));

      return typeMatched && statusMatched && searchMatched;
    });
  }, [rows, filterType, filterStatus, searchQuery]);

  const businessActions = (
    <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-[#087F9C] hover:bg-[#076A82] rounded transition-colors" title="添加">
      <IconPlus size={14} />
      <span>添加</span>
    </button>
  );

  const renderFilters = () => {
    const { types = [], statuses = [] } = filterOptions;

    return (
      <div className="flex items-center gap-3 p-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <IconFilter size={14} />
          <span className="text-xs font-medium">筛选：</span>
        </div>

        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="名称或关键词"
          className="px-2 py-1 text-xs border border-gray-200 rounded w-40"
        />

        {types.length > 0 && (
          <select value={filterType} onChange={(event) => setFilterType(event.target.value)} className="px-2 py-1 text-xs border border-gray-200 rounded">
            <option value="all">全部类型</option>
            {types.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        )}

        {statuses.length > 0 && (
          <select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value)} className="px-2 py-1 text-xs border border-gray-200 rounded">
            <option value="all">全部状态</option>
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        )}
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
        onRowDoubleClick={(row) => setActiveRowId(row.id)}
        storageKey={`footer-grid:${moduleKey}`}
        showToolbar
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

  return (
    <FooterModal
      title={config?.title || '模块'}
      businessActions={businessActions}
      onClose={onClose}
      onCollapse={isDetailMode ? () => setActiveRowId(null) : undefined}
    >
      {renderFilters()}
      {isDetailMode ? renderDetailModules() : renderTableView()}
    </FooterModal>
  );
};

export default StandardFooter;
