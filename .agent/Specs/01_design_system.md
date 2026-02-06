# Spec: Design System & Common UI

> **核心指令:** 本文档是视觉样式和原子组件的**唯一真理来源**。
> 生成代码时，必须优先使用本文档定义的 Tailwind 类名和 HTML 结构。

## 1. 👀 设计变量 (Design Tokens)

| 分类 | 变量名 | Tailwind / CSS Value | 备注 |
| :--- | :--- | :--- | :--- |
| **基础色** | `Canvas-BG` | `bg-[#F5F6F8]` | 复杂绘图区、弹窗内容底色 |
| **主色** | `Primary` | `text-[#12ABB9]` / `bg-[#12ABB9]` | 品牌青色，用于高亮、选中态 |
| **灰阶** | `Text-Main` | `text-gray-900` | 主要正文 |
| **灰阶** | `Text-Sec` | `text-[#6B7280]` | 次要描述 |
| **灰阶** | `Border` | `border-[#D6D9DC]` | 默认边框 |
| **状态** | `Success` | `text-[#3BAA6D]` | 成功 |
| **状态** | `Warning` | `text-[#E7A23C]` | 警告 |
| **状态** | `Error` | `text-[#E35B5B]` | 失败/异常 |
| **圆角** | `Radius-SM` | `rounded-[2px]` | 标签 Tag |
| **圆角** | `Radius-MD` | `rounded-[4px]` | 输入框、按钮 |
| **圆角** | `Radius-LG` | `rounded-lg` (8px) | **核心规范**: 所有内容模块、卡片、主容器必须使用此圆角 |
| **圆角** | `Radius-XL` | `rounded-[12px]` | 工作台大容器 |
| **阴影** | `Shadow-SM` | `shadow-sm` | 静态卡片 |
| **阴影** | `Shadow-MD` | `shadow-md` | 悬浮/下拉 |

## 2. 🧩 通用组件映射 (Common Components)

> **实现原则:** 优先使用 HTML + Tailwind 原子类构建，或复用 Mantine/Franken UI。

| 组件 | HTML / Class 参考 | 视觉微调 (Tailwind) |
| :--- | :--- | :--- |
| **Input** | `<input class="uk-input">` | `h-9 rounded-[4px] border-gray-300 focus:border-[#087F9C] focus:ring-1 focus:ring-[#087F9C]` |
| **Select** | `<select class="uk-select">` | 同 Input，背景需处理右侧箭头 |
| **Checkbox** | `<input type="checkbox" class="uk-checkbox">` | 选中色必须为 `#3BAA6D` (Success) 或 Brand |
| **Table** | `<table class="uk-table uk-table-divider">` | 表头 `bg-[#EDF7FA] text-xs text-gray-500`，行高 `h-9` |
| **Tag** | `<span class="uk-label">` | `rounded-[2px] px-1 text-xs`，背景色为语义色 10% 透明度 |
| **Card** | `div` | `bg-white rounded-lg shadow-sm p-4` | 严禁使用除 `rounded-lg` 以外的圆角类 |
| **Modal** | `CenterModal.jsx` | 遮罩 `backdrop-blur-sm bg-black/20`，卡片 `bg-white rounded-lg shadow-2xl` |

## 3. 🧭 图标与排版 (Iconography)

* **图标库:** Lucide React
* **尺寸:** 默认 `w-4 h-4`，大图标 `w-6 h-6`。
* **对齐:** 图标与文字混排时，务必使用 `flex items-center gap-2`。

## 4. 📏 间距规范 (Spacing)

* **内容区内边距:** `p-3` (12px)
* **模块间距:** `gap-3` (12px)
* **表单项间距:** `mb-4` (16px)
* **Label与Input间距:** `gap-2` (8px)