import React from 'react';
import { IconHistory, IconTrash } from '@tabler/icons-react';
import FooterModal from './FooterModal';
import EnterpriseInfoContent from '../views/shared/EnterpriseInfoContent';

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
            <EnterpriseInfoContent />
        </FooterModal>
    );
};

export default InfoFooter;
