import React from 'react';
import { ContentModule, ModuleHeader } from '../../common/ContentModule';

const pickValue = (...candidates) => {
    for (let i = 0; i < candidates.length; i += 1) {
        const value = candidates[i];
        if (value !== null && value !== undefined && String(value).trim() !== '') {
            return String(value);
        }
    }
    return '-';
};

const InfoRow = ({ label, value }) => (
    <div className="flex items-center gap-3 min-h-8">
        <span className="w-28 shrink-0 text-[13px] text-slate-500">{label}</span>
        <span className="text-[13px] text-slate-800 break-all">{value}</span>
    </div>
);

const EnterpriseInfoContent = ({ entity = null, className = '' }) => {
    const name = pickValue(entity?.name);
    const shortName = pickValue(entity?.shortName);
    const industry = pickValue(entity?.industry);
    const location = pickValue(entity?.location, entity?.region);
    const creditCode = pickValue(entity?.creditCode, entity?.credit_code);
    const legalPerson = pickValue(entity?.legalPerson, entity?.legal_person);
    const contactName = pickValue(entity?.contactName, entity?.contact_name);
    const contactPhone = pickValue(entity?.contactPhone, entity?.contact_phone, entity?.creator);
    const contactEmail = pickValue(entity?.contactEmail, entity?.contact_email);
    const createTime = pickValue(entity?.createTime, entity?.createdAt, entity?.created_at);

    return (
        <div className={`p-3 h-full bg-[#f3f6f8] ${className}`}>
            <div className="h-full grid grid-cols-1 xl:grid-cols-3 gap-3">
                <div className="xl:col-span-2 flex flex-col gap-3 min-h-0">
                    <ContentModule>
                        <ModuleHeader title="基本信息" />
                        <div className="p-3 space-y-1.5">
                            <InfoRow label="名称" value={name} />
                            <InfoRow label="简称" value={shortName} />
                            <InfoRow label="所属行业" value={industry} />
                            <InfoRow label="所在地区" value={location} />
                        </div>
                    </ContentModule>

                    <ContentModule className="flex-1">
                        <ModuleHeader title="其他信息" />
                        <div className="p-3 space-y-1.5">
                            <InfoRow label="创建时间" value={createTime} />
                            <InfoRow label="备注" value="-" />
                        </div>
                    </ContentModule>
                </div>

                <div className="xl:col-span-1 flex flex-col gap-3 min-h-0">
                    <ContentModule>
                        <ModuleHeader title="工商信息" />
                        <div className="p-3 space-y-1.5">
                            <InfoRow label="统一社会信用代码" value={creditCode} />
                            <InfoRow label="法定代表人" value={legalPerson} />
                        </div>
                    </ContentModule>

                    <ContentModule>
                        <ModuleHeader title="联系人信息" />
                        <div className="p-3 space-y-1.5">
                            <InfoRow label="姓名" value={contactName} />
                            <InfoRow label="电话" value={contactPhone} />
                            <InfoRow label="邮箱" value={contactEmail} />
                        </div>
                    </ContentModule>
                </div>
            </div>
        </div>
    );
};

export default EnterpriseInfoContent;
