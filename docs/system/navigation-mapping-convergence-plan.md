# 导航映射收敛方案（Step 1 设计稿）

## 目标
- 在不改交互行为的前提下，把“导航相关静态映射”从多个文件收敛到可复用配置。
- 先做结构统一，不做路由框架替换，不做页面重写。
- 让新增/调整一个业务目标时，最多改 `1-2` 个配置点。

## 非目标
- 不引入 `react-router`。
- 不改 `Context` 分层。
- 不改 `BusinessContent` 页面组件实现细节（先改映射入口）。

## 现状：分散映射清单
目前同一类信息在多个文件重复定义：

1. `L1 -> 默认 target / 默认 L2/L3 / 有效 L1`
- `src/context/AppNavigationContext.jsx`
- 典型变量：`DEFAULT_TARGET_MAP`、`validL1`、`handleL1Change` 里的 `nextL2/nextL3` 逻辑

2. `target -> Header 标题文案`
- `src/components/layout/Workbench.jsx`
- 典型变量：`workspaceTitleMap`、`businessTitleMap`、`targetTitleMap`

3. `L1 业务菜单分组 + target 描述 + 图标 + 侧栏卡片头信息`
- `src/components/layout/L2Sidebar.jsx`
- 典型变量：`workspaceGroups`、`businessGroups`、`headerConfig`

4. `target -> 页面渲染器`
- `src/components/views/BusinessContent.jsx`
- 典型变量：`BUSINESS_TARGET_RENDERERS`（另有 `LEGACY_TARGET_RENDERERS`）

5. `target 基础归属信息`
- `src/config/businessTargetConfig.js`
- 当前仅包含：`l1`、`label`

## 收敛策略：拆成两层配置
为避免一步改太大，建议收敛成两层：

1. `L1 层策略`（应用级导航）
- 新文件：`src/config/appNavigationConfig.js`
- 管理：有效 L1、默认 target、默认 L2/L3

2. `Business Target 注册表`（业务目标元数据）
- 扩展现有：`src/config/businessTargetConfig.js`
- 管理：target 所属 L1、标题、菜单分组、菜单描述、渲染键、是否默认等

这样 `AppNavigationContext/Workbench/L2Sidebar/BusinessContent` 都只读配置，不再各自维护映射。

## 合并后数据结构（建议）

### 1) `src/config/appNavigationConfig.js`
```js
export const APP_NAV_L1_CONFIG = {
  workspace: {
    defaultTarget: 'workbench_home',
    defaultL2: 'workbench_home',
    defaultL3: null
  },
  background_data: {
    defaultTarget: 'database_mgmt',
    defaultL2: null,
    defaultL3: null
  },
  project_mgmt: {
    defaultTarget: 'all_projects',
    defaultL2: null,
    defaultL3: null
  },
  enterprise: {
    defaultTarget: 'all_objects',
    defaultL2: null,
    defaultL3: null
  },
  project_tag: {
    defaultTarget: 'all_projects',
    defaultL2: 'navigation',
    defaultL3: 'acct_basic'
  }
};

export const APP_NAV_L1_IDS = Object.keys(APP_NAV_L1_CONFIG);

export const getL1Defaults = (l1) => APP_NAV_L1_CONFIG[l1] || APP_NAV_L1_CONFIG.workspace;
```

对应替代点：
- 替代 `AppNavigationContext` 里的 `DEFAULT_TARGET_MAP`
- 替代 `validL1` 常量
- 替代 `handleL1Change` 中分支硬编码

### 2) `src/config/businessTargetConfig.js`（扩展版）
```js
export const BUSINESS_TARGET_CONFIG = {
  workbench_home: {
    l1: 'workspace',
    label: '工作台',
    headerTitle: '工作台',
    sidebar: { group: null, desc: '个人工作总览与快捷入口', icon: 'IconCompass' },
    rendererKey: 'workbench_home',
    isDefaultForL1: true
  },
  carbon_panorama: {
    l1: 'workspace',
    label: '碳排放全景图',
    headerTitle: '碳排放全景图',
    sidebar: { group: '碳排放&碳资产', desc: '企业碳排放宏观分布展示', icon: 'IconMapPin' },
    rendererKey: 'carbon_panorama'
  },
  carbon_asset_mgmt: {
    l1: 'workspace',
    label: '碳资产管理',
    headerTitle: '碳资产管理',
    sidebar: { group: '碳排放&碳资产', desc: '管理配额、CCER等碳资产', icon: 'IconDatabase' },
    rendererKey: 'carbon_asset_mgmt'
  },

  database_mgmt: {
    l1: 'background_data',
    label: '数据库管理',
    headerTitle: '数据库管理',
    sidebar: { group: '数据库', desc: '管理背景数据库全集', icon: 'IconStack2' },
    rendererKey: 'database_mgmt',
    isDefaultForL1: true
  },
  components: {
    l1: 'background_data',
    label: '元件',
    headerTitle: '元件',
    sidebar: { group: '元件', desc: '相同物质/活动的因子组', icon: 'IconCpu' },
    rendererKey: 'components'
  },
  factors_literature: {
    l1: 'background_data',
    label: '文献因子',
    headerTitle: '文献因子',
    sidebar: { group: '因子', desc: '来源于文献的因子数据', icon: 'IconFlask' },
    rendererKey: 'factors_literature'
  },
  factors_baseflow: {
    l1: 'background_data',
    label: '基本流',
    headerTitle: '基本流',
    sidebar: { group: '因子', desc: '基本物质流动的因子数据', icon: 'IconActivity' },
    rendererKey: 'factors_baseflow'
  },
  factors_composite: {
    l1: 'background_data',
    label: '复合因子',
    headerTitle: '复合因子',
    sidebar: { group: '因子', desc: '建模计算获得的因子数据', icon: 'IconStack2' },
    rendererKey: 'factors_composite'
  },
  literature: {
    l1: 'background_data',
    label: '文献',
    headerTitle: '文献',
    sidebar: { group: '文献', desc: '因子来源的相关文件', icon: 'IconBook' },
    rendererKey: 'literature'
  },

  all_projects: {
    l1: 'project_mgmt',
    label: '全部项目',
    headerTitle: '全部项目',
    sidebar: { group: '列表', desc: '查看所有碳核算项目', icon: 'IconLayoutGrid' },
    rendererKey: 'all_projects',
    isDefaultForL1: true
  },
  pcf: {
    l1: 'project_mgmt',
    label: '产品碳足迹',
    headerTitle: '产品碳足迹',
    sidebar: { group: '需求类型', desc: 'Product Carbon Footprint', icon: 'IconHexagon' },
    rendererKey: 'pcf'
  },
  ocf: {
    l1: 'project_mgmt',
    label: '组织碳足迹',
    headerTitle: '组织碳足迹',
    sidebar: { group: '需求类型', desc: 'Org. Carbon Footprint', icon: 'IconBuilding' },
    rendererKey: 'ocf'
  },

  all_objects: {
    l1: 'enterprise',
    label: '全部服务企业',
    headerTitle: '全部服务企业',
    sidebar: { group: '列表', desc: '所有服务企业主体', icon: 'IconShield' },
    rendererKey: 'all_objects',
    isDefaultForL1: true
  }
};

export const BUSINESS_TARGET_ROUTE_IDS = Object.keys(BUSINESS_TARGET_CONFIG);
```

> 注：`icon` 字段建议存“图标键名”而不是直接存组件，避免 config 直接耦合 UI 组件导入。  
> `L2Sidebar` 内通过 `iconKey -> IconComponent` 字典解析。

### 3) `BusinessContent` 渲染映射改为“key 映射”（结构示意）
```js
const BUSINESS_RENDERERS = {
  workbench_home: () => <WorkbenchHomePage />,
  carbon_panorama: () => <CarbonPanoramaPage />,
  // ...
  all_projects: (ctx) => <ProjectManagementModule ... />,
  pcf: (ctx) => <ProjectManagementModule ... defaultType="pcf" />,
  ocf: (ctx) => <ProjectManagementModule ... defaultType="ocf" />,
  all_objects: (ctx) => ctx.renderResearchObjects()
};

const targetMeta = BUSINESS_TARGET_CONFIG[target];
const renderer = targetMeta ? BUSINESS_RENDERERS[targetMeta.rendererKey] : null;
```

这样“目标定义”和“渲染实现”解耦：  
- 新增 target 时，先补注册表；  
- 若是新页面，再补 renderer 表；  
- 不再需要同时维护多个 map 的同名 key。

## 文件级改造映射（现状 -> 目标）

1. `src/context/AppNavigationContext.jsx`
- 删除内联：`DEFAULT_TARGET_MAP`、`validL1`、`handleL1Change` 的 L1 分支默认值
- 改为读取：`APP_NAV_L1_CONFIG` + `BUSINESS_TARGET_CONFIG`

2. `src/components/layout/Workbench.jsx`
- 删除内联：`workspaceTitleMap`、`businessTitleMap`、`targetTitleMap`
- 改为读取：`BUSINESS_TARGET_CONFIG[target].headerTitle`
- `workspaceTargets` 仍由权限控制，不放到业务目标注册表

3. `src/components/layout/L2Sidebar.jsx`
- 删除内联：`workspaceGroups`、`businessGroups`
- 改为从 `BUSINESS_TARGET_CONFIG` 按 `l1 + sidebar.group` 聚合生成
- `headerConfig` 可保留在 `L1 级配置`（`appNavigationConfig.js`）中

4. `src/components/views/BusinessContent.jsx`
- 保留页面渲染函数实现
- 删除 target 硬编码入口 map，改走 `rendererKey`

## 兼容与风险点（先写在文档里，实施时处理）

1. 现有校验脚本依赖源码文本结构
- `scripts/check-navigation-integrity.mjs` 当前会正则读取：
  - `AppNavigationContext` 的 `DEFAULT_TARGET_MAP`
  - `L2Sidebar` 的 `businessGroups/workspaceGroups`
  - `BusinessContent` 的 `BUSINESS_TARGET_RENDERERS`
- 收敛后脚本需要同步改成直接读取 config（否则会误报）。

2. 旧别名路由
- `BusinessContent` 还有 `LEGACY_TARGET_RENDERERS`（`datasource/product/data`）。
- 方案建议：先保留兼容层，不纳入第一阶段收敛。

3. `project_tag` 特殊性
- `project_tag` 属于项目详情域，不是 business target 本体。
- 因此只放在 `APP_NAV_L1_CONFIG`，不要硬塞进 `BUSINESS_TARGET_CONFIG`。

## 实施顺序（你确认后再动代码）

1. 新建 `appNavigationConfig.js`，扩展 `businessTargetConfig.js` 字段（先不删旧字段）。
2. 改 `AppNavigationContext` 读取新配置，行为保持一致。
3. 改 `Workbench` 标题来源，删除三套标题 map。
4. 改 `L2Sidebar` 菜单来源，删除内联业务分组 map。
5. 改 `BusinessContent` 入口分发为 `rendererKey`。
6. 最后更新 `check-navigation-integrity.mjs` 读取新配置。

## 验收口径（Step 1）

- `npm run check:navigation` 通过。
- `npm run qa:quick` 通过。
- 任一 target 的标签/标题/菜单/渲染，不需要跨 4 个文件重复修改。
- 新增一个 business target 的最小改动路径：
  - 只改 `businessTargetConfig.js`（若复用已有 renderer）；
  - 或再加一条 renderer（若新增页面）。

