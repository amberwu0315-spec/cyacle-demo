import React from 'react';

const AccountingModelConfig = () => {
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">模型配置与结果 (Accounting)</h2>
            <p className="text-gray-500 mb-4">View ID: acct_model_config</p>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 h-40 rounded border border-gray-200">
                    <h3 className="font-medium text-gray-800">计算参数配置</h3>
                </div>
                <div className="bg-white p-4 h-40 rounded border border-gray-200">
                    <h3 className="font-medium text-gray-800">实时计算结果</h3>
                </div>
            </div>
        </div>
    );
};

export default AccountingModelConfig;
