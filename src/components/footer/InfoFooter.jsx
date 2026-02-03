import React from 'react';
import { IconHistory, IconTrash } from '@tabler/icons-react';
import FooterModal from './FooterModal';
import { ContentModule, ModuleHeader } from '../common/ContentModule';

/**
 * InfoFooter - 信息模块
 * 
 * 特殊之处：
 * - 业务功能组为图标(版本历史、删除)
 * - 内容区为两列布局
 */
const InfoFooter = ({ onClose }) => {
    // 业务功能组 - 图标按钮
    const businessActions = (
        <>
            <button
                className="p-1.5 text-gray-600 hover:text-[#087F9C] hover:bg-gray-100 rounded transition-colors"
                title="版本历史"
            >
                <IconHistory size={16} />
            </button>
            <button
                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                title="删除"
            >
                <IconTrash size={16} />
            </button>
        </>
    );

    return (
        <FooterModal
            title="信息"
            businessActions={businessActions}
            onClose={onClose}
        >
            <div className="p-3 flex gap-3 h-full">
                {/* 左列 2/3 */}
                <div className="flex-[2] flex flex-col gap-3 overflow-y-auto">
                    {/* 基本信息 */}
                    <ContentModule>
                        <ModuleHeader title="基本信息" />
                        <div className="p-3 space-y-2 text-sm">
                            <div className="flex items-center">
                                <span className="text-gray-500 w-24">企业名称：</span>
                                <span className="text-gray-900">示例门窗制造企业</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-500 w-24">统一社会信用代码：</span>
                                <span className="text-gray-900">91XXXXXXXXXXXXXXXXX</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-500 w-24">注册地址：</span>
                                <span className="text-gray-900">广东省深圳市南山区科技园</span>
                            </div>
                        </div>
                    </ContentModule>

                    {/* 其他信息 */}
                    <ContentModule>
                        <ModuleHeader title="其他信息" />
                        <div className="p-3 space-y-2 text-sm">
                            <div className="flex items-center">
                                <span className="text-gray-500 w-24">行业类别：</span>
                                <span className="text-gray-900">建筑材料制造</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-500 w-24">企业规模：</span>
                                <span className="text-gray-900">大型企业</span>
                            </div>
                        </div>
                    </ContentModule>
                </div>

                {/* 右列 1/3 */}
                <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                    {/* 工商信息 */}
                    <ContentModule>
                        <ModuleHeader title="工商信息" />
                        <div className="p-3 space-y-2 text-sm">
                            <div className="flex items-center">
                                <span className="text-gray-500 w-20">法人代表：</span>
                                <span className="text-gray-900">张伟</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-500 w-20">注册资本：</span>
                                <span className="text-gray-900">5000万元</span>
                            </div>
                        </div>
                    </ContentModule>

                    {/* 联系人信息 */}
                    <ContentModule>
                        <ModuleHeader title="联系人信息" />
                        <div className="p-3 space-y-2 text-sm">
                            <div className="flex items-center">
                                <span className="text-gray-500 w-20">联系人：</span>
                                <span className="text-gray-900">李明</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-500 w-20">联系电话：</span>
                                <span className="text-gray-900">138****8888</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-500 w-20">邮箱：</span>
                                <span className="text-gray-900">liming@example.com</span>
                            </div>
                        </div>
                    </ContentModule>
                </div>
            </div>
        </FooterModal>
    );
};

export default InfoFooter;
