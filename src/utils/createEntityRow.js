const hasValue = (value) => value !== undefined && value !== null && String(value).trim() !== '';

const pickFirst = (...values) => values.find((value) => hasValue(value));

const formatDate = (date = new Date()) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

const formatDateTime = (date = new Date()) => {
    const datePart = formatDate(date);
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${datePart} ${h}:${m}`;
};

const formatNameTimestamp = (date = new Date()) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${y}${m}${d}${h}${min}${s}`;
};

export const buildUntitledName = (date = new Date()) => `未命名-${formatNameTimestamp(date)}`;

const normalizeId = () => `new_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const toAvatarText = (name = '') => {
    const text = String(name).trim();
    if (!text) {
        return 'N';
    }
    return text.slice(0, 2).toUpperCase();
};

const ensureColumnKeys = (row, columns = []) => {
    const next = { ...row };
    columns.forEach((col) => {
        const key = col?.key;
        if (!key || key === 'id') {
            return;
        }
        if (!hasValue(next[key])) {
            next[key] = '-';
        }
    });
    return next;
};

const normalizeCoreAliases = (row) => {
    const next = { ...row };

    if (!hasValue(next.name)) {
        next.name = pickFirst(next.nameCN, next.title, next.code);
    }
    if (!hasValue(next.nameCN)) {
        next.nameCN = pickFirst(next.name, next.title);
    }
    if (!hasValue(next.nameEN)) {
        next.nameEN = pickFirst(next.titleEN);
    }
    if (!hasValue(next.publishYear)) {
        next.publishYear = pickFirst(next.year, formatDate().slice(0, 4));
    }

    return next;
};

export const buildCreatedEntityRow = ({
    moduleKey,
    label,
    payload = {},
    columns = [],
    existingCount = 0
}) => {
    const now = new Date();
    const nowDate = formatDate(now);
    const nowDateTime = formatDateTime(now);
    const created = normalizeCoreAliases({
        ...(payload || {}),
        id: pickFirst(payload?.id, normalizeId()),
        createdAt: pickFirst(payload?.createdAt, nowDateTime),
        updatedAt: pickFirst(payload?.updatedAt, nowDate),
        updateTime: pickFirst(payload?.updateTime, nowDateTime),
        createTime: pickFirst(payload?.createTime, nowDate),
        creator: pickFirst(payload?.creator, 'current_user')
    });

    const context = moduleKey || label || '';
    const fallbackName = buildUntitledName(now);
    const row = {
        ...created,
        name: pickFirst(created.name, fallbackName)
    };

    switch (context) {
        case 'database_mgmt':
        case '数据库': {
            row.name = pickFirst(created.name, fallbackName);
            row.source = pickFirst(created.source, '自建');
            row.version = pickFirst(created.version, '-');
            row.year = pickFirst(created.year, nowDate.slice(0, 4));
            row.permission = pickFirst(created.permission, '可使用');
            row.count = pickFirst(created.count, '0');
            row.fullName = pickFirst(created.fullName, `${row.name} ${row.version}`);
            row.avatarText = pickFirst(created.avatarText, toAvatarText(row.name));
            row.avatarBg = pickFirst(created.avatarBg, 'bg-cyan-100');
            row.avatarColor = pickFirst(created.avatarColor, 'text-cyan-700');
            row.status = pickFirst(created.status, 'active');
            break;
        }
        case 'components':
        case 'component':
        case '元件':
        case '元件库': {
            row.name = pickFirst(created.name, fallbackName);
            row.source = pickFirst(created.source, '自建');
            row.unitGroup = pickFirst(created.unitGroup, '-');
            row.type = pickFirst(created.type, '-');
            row.refUnit = pickFirst(created.refUnit, '-');
            row.status = pickFirst(created.status, 'in_use');
            row.updateTime = pickFirst(created.updateTime, nowDateTime);
            break;
        }
        case 'factors_baseflow':
        case 'baseflow':
        case '基本流': {
            row.source = pickFirst(created.source, '自建');
            row.nameCN = pickFirst(created.nameCN, created.name, fallbackName);
            row.nameEN = pickFirst(created.nameEN, '-');
            row.sourceDB = pickFirst(created.sourceDB, '-');
            row.type = pickFirst(created.type, '-');
            row.time = pickFirst(created.time, '-');
            row.geo = pickFirst(created.geo, '-');
            row.tech = pickFirst(created.tech, '-');
            break;
        }
        case 'factors_composite':
        case 'composite':
        case '复合因子': {
            row.source = pickFirst(created.source, '自建');
            row.nameCN = pickFirst(created.nameCN, created.name, fallbackName);
            row.nameEN = pickFirst(created.nameEN, '-');
            row.refComponent = pickFirst(created.refComponent, created.components, '-');
            row.sourceDB = pickFirst(created.sourceDB, '-');
            row.time = pickFirst(created.time, '-');
            row.geo = pickFirst(created.geo, '-');
            row.tech = pickFirst(created.tech, '-');
            break;
        }
        case 'factors_literature':
        case 'factors':
        case '文献因子': {
            row.source = pickFirst(created.source, '自建');
            row.nameCN = pickFirst(created.nameCN, created.name, fallbackName);
            row.nameEN = pickFirst(created.nameEN, '-');
            row.sourceDB = pickFirst(created.sourceDB, created.sourceDoc, created.sourceRef, '-');
            row.type = pickFirst(created.type, created.category, '-');
            row.time = pickFirst(created.time, '-');
            row.geo = pickFirst(created.geo, '-');
            row.tech = pickFirst(created.tech, '-');
            break;
        }
        case 'literature':
        case 'docs':
        case '文献':
        case '文档':
        case '文档管理': {
            row.name = pickFirst(created.name, created.title, fallbackName);
            row.source = pickFirst(created.source, '自建');
            row.docType = pickFirst(created.docType, '期刊文章或杂志');
            row.publishYear = pickFirst(created.publishYear, nowDate.slice(0, 4));
            row.journal = pickFirst(created.journal, created.sourceName, created.source, '-');
            row.creator = pickFirst(created.creator, 'current_user');
            break;
        }
        case 'product':
        case '产品':
        case '产品列表': {
            row.name = pickFirst(created.name, fallbackName);
            row.spec = pickFirst(created.spec, '-');
            row.descType = pickFirst(created.descType, '-');
            row.desc = pickFirst(created.desc, '-');
            row.basicFlow = pickFirst(created.basicFlow, '-');
            row.createdAt = pickFirst(created.createdAt, nowDateTime);
            row.creator = pickFirst(created.creator, 'current_user');
            break;
        }
        case 'data':
        case '数据记录': {
            row.name = pickFirst(created.name, fallbackName);
            row.value = pickFirst(created.value, '-');
            row.unit = pickFirst(created.unit, '-');
            row.period = pickFirst(created.period, '-');
            row.location = pickFirst(created.location, '-');
            row.proof = pickFirst(created.proof, '-');
            row.sourceType = pickFirst(created.sourceType, '-');
            row.updatedAt = pickFirst(created.updatedAt, nowDate);
            row.status = pickFirst(created.status, '正常状态');
            break;
        }
        case 'datasource':
        case '数据来源':
        case '数据来源对象': {
            row.name = pickFirst(created.name, fallbackName);
            row.type = pickFirst(created.type, '-');
            row.code = pickFirst(created.code, '-');
            row.uncertainty = pickFirst(created.uncertainty, '-');
            row.linkedRecords = pickFirst(created.linkedRecords, 0);
            row.creator = pickFirst(created.creator, 'current_user');
            row.createdAt = pickFirst(created.createdAt, nowDateTime);
            row.updatedAt = pickFirst(created.updatedAt, nowDateTime);
            break;
        }
        case 'location':
        case '地点管理':
        case '地点':
        case '地点列表': {
            row.name = pickFirst(created.name, fallbackName);
            row.shortName = pickFirst(created.shortName, '-');
            row.locationType = pickFirst(created.locationType, '-');
            row.region = pickFirst(created.region, '-');
            row.address = pickFirst(created.address, '-');
            row.updatedAt = pickFirst(created.updatedAt, nowDate);
            row.createdAt = pickFirst(created.createdAt, nowDateTime);
            row.creator = pickFirst(created.creator, 'current_user');
            break;
        }
        default: {
            row.name = pickFirst(created.name, fallbackName);
            break;
        }
    }

    return ensureColumnKeys(row, columns);
};
