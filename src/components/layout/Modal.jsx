import React from 'react';
import InfoFooter from '../footer/InfoFooter';
import ProductFooter from '../footer/ProductFooter';
import DataFooter from '../footer/DataFooter';
import DataSourceFooter from '../footer/DataSourceFooter';
import LiteratureFactorFooter from '../footer/LiteratureFactorFooter';
import BasicFlowFooter from '../footer/BasicFlowFooter';
import CompositeFactorFooter from '../footer/CompositeFactorFooter';
import LiteratureFooter from '../footer/LiteratureFooter';
import ComponentFooter from '../footer/ComponentFooter';
import LocationFooter from '../footer/LocationFooter';

/**
 * Modal 组件
 * 
 * 根据 Footer 按钮点击的 action 渲染对应的 Footer 模块
 */
export default function Modal({ isOpen, onClose, title }) {
    if (!isOpen) return null;

    // 根据 title 确定渲染哪个 Footer 组件
    const renderFooterContent = () => {
        switch (title) {
            case '信息':
                return <InfoFooter onClose={onClose} />;
            case '产品':
                return <ProductFooter onClose={onClose} />;
            case '数据':
                return <DataFooter onClose={onClose} />;
            case '数据源':
                return <DataSourceFooter onClose={onClose} />;
            case '文档':
                // 文档对应文献
                return <LiteratureFooter onClose={onClose} />;
            case '地点':
                return <LocationFooter onClose={onClose} />;
            case '文献因子':
                return <LiteratureFactorFooter onClose={onClose} />;
            case '基本流':
                return <BasicFlowFooter onClose={onClose} />;
            case '复合因子':
                return <CompositeFactorFooter onClose={onClose} />;
            case '文献':
                return <LiteratureFooter onClose={onClose} />;
            case '元件':
                return <ComponentFooter onClose={onClose} />;
            default:
                return null;
        }
    };

    return renderFooterContent();
}
