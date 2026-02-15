import React from 'react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import ControlledDataGridPanel from '../shared/ControlledDataGridPanel';
import {
  reportExportStageRules,
  reportExportProcessRules
} from '../../../config/accountingPerspectiveRules';
import {
  reportExportProcessRecords,
  reportExportSettings,
  reportExportStageRecords
} from '../../../data/accountingPerspectiveData';

// L3: 导出数值 (ReportExport)
const ReportExport = () => {
  return (
    <div className="flex-1 min-h-0 w-full flex flex-col gap-3 p-3 overflow-y-auto bg-[#F5F6F8]">
      <ContentModule>
        <ModuleHeader title="导出设置" />
        <div className="px-4 py-3 text-sm">
          <div className="grid grid-cols-[140px_1fr] items-center gap-2 min-h-9">
            <span className="text-slate-500">计算精度设置：</span>
            <span className="text-slate-800 font-medium">{reportExportSettings.precision}</span>
          </div>
        </div>
      </ContentModule>

      <ContentModule>
        <ModuleHeader title="阶段" />
        <div className="p-3 pt-2">
          <ControlledDataGridPanel
            title={reportExportStageRules.title}
            rows={reportExportStageRecords}
            columns={reportExportStageRules.columns}
            dataControllerConfig={reportExportStageRules.dataControllerConfig}
            searchKeys={reportExportStageRules.searchKeys}
            storageKey="report-export:stage"
            emptyText="暂无阶段数据"
            minTableWidth={960}
            gridClassName="min-h-[220px]"
          />
        </div>
      </ContentModule>

      <ContentModule>
        <ModuleHeader title="单元过程" />
        <div className="p-3 pt-2">
          <ControlledDataGridPanel
            title={reportExportProcessRules.title}
            rows={reportExportProcessRecords}
            columns={reportExportProcessRules.columns}
            dataControllerConfig={reportExportProcessRules.dataControllerConfig}
            searchKeys={reportExportProcessRules.searchKeys}
            storageKey="report-export:process"
            emptyText="暂无单元过程数据"
            minTableWidth={1100}
            gridClassName="min-h-[300px]"
          />
        </div>
      </ContentModule>
    </div>
  );
};

export default ReportExport;
