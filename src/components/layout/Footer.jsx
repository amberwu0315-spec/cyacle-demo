import { IconInfoCircle, IconPackage, IconDatabase, IconServer, IconFileText, IconMapPin, IconFlask, IconActivity, IconStack2, IconBook, IconCpu } from '@tabler/icons-react';

export default function Footer({ onOpenModal, activeAction }) {

    // Helper to render footer buttons
    const FooterBtn = ({ action, title, icon: Icon }) => {
        const isActive = activeAction === action;
        return (
            <button
                onClick={() => onOpenModal(action, title)}
                className={`h-full px-2 flex items-center gap-2 text-xs transition-colors ${isActive ? 'bg-[#087F9C] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
            >
                <Icon className="w-3.5 h-3.5" /> {title}
            </button>
        )
    };

    return (
        <footer className="h-[38px] bg-[#F8FAFB] border-t border-[#D6D9DC] shrink-0 flex items-center justify-between overflow-hidden relative z-50">
            {/* Left Group */}
            <div className="flex items-center h-full">
                <FooterBtn action="info" title="信息" icon={IconInfoCircle} />
                <FooterBtn action="product" title="产品" icon={IconPackage} />
                <FooterBtn action="data" title="数据" icon={IconDatabase} />
                <FooterBtn action="datasource" title="数据源" icon={IconServer} />
                <FooterBtn action="docs" title="文档" icon={IconFileText} />
                <FooterBtn action="location" title="地点" icon={IconMapPin} />
            </div>

            {/* Right Group */}
            <div className="flex items-center h-full">
                <FooterBtn action="factors" title="文献因子" icon={IconFlask} />
                <FooterBtn action="baseflow" title="基本流" icon={IconActivity} />
                <FooterBtn action="composite" title="复合因子" icon={IconStack2} />
                <FooterBtn action="literature" title="文献" icon={IconBook} />
                <FooterBtn action="component" title="元件" icon={IconCpu} />
            </div>
        </footer>
    );
}
