import React from 'react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';
import ControlledDataGridPanel from './ControlledDataGridPanel';
import { factorDataViewRules } from '../../../config/accountingPerspectiveRules';
import { factorDataRecords } from '../../../data/accountingPerspectiveData';

const FactorDataView = () => {
  return (
    <div className="flex flex-col gap-3 p-3 w-full h-full overflow-hidden bg-[#F5F6F8]">
      <ContentModule className="flex-1 min-h-0">
        <ModuleHeader title="因子数据" />
        <div className="p-3 pt-2 flex-1 min-h-0">
          <ControlledDataGridPanel
            title={factorDataViewRules.title}
            rows={factorDataRecords}
            columns={factorDataViewRules.columns}
            dataControllerConfig={factorDataViewRules.dataControllerConfig}
            searchKeys={factorDataViewRules.searchKeys}
            storageKey="perspective:factor"
            emptyText="暂无因子数据"
            minTableWidth={1120}
            gridClassName="flex-1 min-h-[420px]"
          />
        </div>
      </ContentModule>
    </div>
  );
};

export default FactorDataView;
