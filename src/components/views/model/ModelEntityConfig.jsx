import React from 'react';

const ModelEntityConfig = () => {
    return (
        <div className="p-3">
            <h2 className="text-xl font-bold mb-3 text-purple-700">模型配置 (Model Definition)</h2>
            <p className="text-gray-500 mb-3">View ID: mod_model_config</p>
            <div className="bg-purple-50 p-4 rounded border border-purple-100">
                <p className="text-purple-800">此界面用于定义抽象模型结构，不包含具体计算结果。</p>
            </div>
        </div>
    );
};

export default ModelEntityConfig;
