import React, { useEffect, useMemo, useState } from 'react';
import { IconLayersIntersect } from '@tabler/icons-react';
import DataController from '../../common/DataController';
import DataGrid from '../../common/DataGrid';
import { buildStandardDataControllerRules } from '../../../config/dataControllerRules';

const normalizeText = (value) => String(value ?? '').toLowerCase();

const resolveRuleValue = (row, ruleId) => {
  if (!row || typeof row !== 'object') return '';
  if (ruleId === 'type') return row.type ?? row.category ?? row.kind ?? '';
  if (ruleId === 'status') return row.status ?? row.state ?? '';
  return row[ruleId] ?? '';
};

const LinkCell = ({ value }) => (
  <button
    type="button"
    className="max-w-full truncate text-[#0B8FAE] hover:underline"
    title={value || '-'}
  >
    {value || '-'}
  </button>
);

const TypeBadgeCell = ({ value }) => (
  <span className="inline-flex items-center gap-1 h-6 px-2 rounded border border-violet-200 bg-violet-50 text-violet-500 text-[11px] font-medium">
    <IconLayersIntersect size={12} />
    {value || '-'}
  </span>
);

const buildColumnRender = (column) => {
  if (typeof column.render === 'function') return column.render;
  if (column.asLink) return (value) => <LinkCell value={value} />;
  if (column.asTypeBadge) return (value) => <TypeBadgeCell value={value} />;
  return undefined;
};

const buildDefaultFilterValues = (filterRules = []) => Object.fromEntries(
  filterRules.map((rule) => [rule.id, rule.allValue ?? 'all'])
);

const ControlledDataGridPanel = ({
  title,
  rows = [],
  columns = [],
  filterOptions = {},
  dataControllerConfig = {},
  searchKeys = [],
  rowKey = 'id',
  storageKey,
  emptyText = '暂无数据',
  minTableWidth = 960,
  gridClassName = 'flex-1 min-h-[220px]',
  countPredicate,
  showViewSettings = true
}) => {
  const safeRows = Array.isArray(rows) ? rows : [];

  const controllerRules = useMemo(() => buildStandardDataControllerRules({
    title,
    filterOptions,
    ...dataControllerConfig
  }), [title, filterOptions, dataControllerConfig]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState(controllerRules.defaultView || 'table');
  const [filterValues, setFilterValues] = useState(
    buildDefaultFilterValues(controllerRules.filterRules)
  );

  useEffect(() => {
    setActiveView(controllerRules.defaultView || 'table');
  }, [controllerRules.defaultView]);

  useEffect(() => {
    setFilterValues(buildDefaultFilterValues(controllerRules.filterRules));
  }, [controllerRules.filterRules]);

  const hasActiveConditions = useMemo(() => {
    if (searchQuery.trim()) return true;
    return controllerRules.filterRules.some((rule) => {
      const current = filterValues[rule.id] ?? (rule.allValue ?? 'all');
      return current !== (rule.allValue ?? 'all');
    });
  }, [searchQuery, controllerRules.filterRules, filterValues]);

  const conditionItems = useMemo(() => {
    const items = [{
      ...controllerRules.searchRule,
      value: searchQuery,
      isActive: searchQuery.trim().length > 0,
      onChange: setSearchQuery
    }];

    controllerRules.filterRules.forEach((rule) => {
      const value = filterValues[rule.id] ?? (rule.allValue ?? 'all');
      items.push({
        ...rule,
        value,
        isActive: value !== (rule.allValue ?? 'all'),
        onChange: (nextValue) => setFilterValues((prev) => ({ ...prev, [rule.id]: nextValue }))
      });
    });

    return items;
  }, [controllerRules, searchQuery, filterValues]);

  const filteredRows = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery.trim());
    return safeRows.filter((row) => {
      const searchMatched = !normalizedQuery || (
        searchKeys.length > 0
          ? searchKeys.some((key) => normalizeText(row?.[key]).includes(normalizedQuery))
          : Object.values(row || {}).some((value) => normalizeText(value).includes(normalizedQuery))
      );

      if (!searchMatched) return false;

      return controllerRules.filterRules.every((rule) => {
        const selected = filterValues[rule.id] ?? (rule.allValue ?? 'all');
        if (selected === (rule.allValue ?? 'all')) return true;
        const currentValue = resolveRuleValue(row, rule.id);
        return normalizeText(currentValue) === normalizeText(selected);
      });
    });
  }, [safeRows, searchQuery, searchKeys, controllerRules.filterRules, filterValues]);

  const gridColumns = useMemo(() => columns.map((column) => ({
    ...column,
    sortable: column.sortable ?? true,
    filterable: column.filterable ?? true,
    groupable: column.groupable ?? false,
    editable: column.editable ?? false,
    render: buildColumnRender(column)
  })), [columns]);

  const countedItems = useMemo(() => {
    if (typeof countPredicate === 'function') {
      return filteredRows.filter((row) => countPredicate(row)).length;
    }
    return filteredRows.filter((row) => row?.countable !== false).length;
  }, [filteredRows, countPredicate]);

  const handleReset = () => {
    setSearchQuery('');
    setFilterValues(buildDefaultFilterValues(controllerRules.filterRules));
    setActiveView(controllerRules.defaultView || 'table');
  };

  return (
    <div className="flex flex-col min-h-0 h-full">
      <DataController
        controllerLabel={controllerRules.controllerLabel}
        conditionItems={conditionItems}
        showViewSettings={showViewSettings}
        viewOptions={controllerRules.viewOptions}
        activeView={activeView}
        onViewChange={setActiveView}
        onReset={handleReset}
        resetDisabled={!hasActiveConditions}
        columnSettingsPlaceholder={controllerRules.columnSettingsPlaceholder}
      />

      <DataGrid
        title={title}
        columns={gridColumns}
        rows={filteredRows}
        rowKey={rowKey}
        storageKey={storageKey}
        showToolbar={false}
        showFooter
        footerText={`共${countedItems}项`}
        emptyText={emptyText}
        className={gridClassName}
        minTableWidth={minTableWidth}
      />
    </div>
  );
};

export default ControlledDataGridPanel;
