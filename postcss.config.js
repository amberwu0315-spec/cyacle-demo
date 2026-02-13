export default {
    plugins: {
        // 1. 先让 Mantine 处理它的样式变量
        'postcss-preset-mantine': {},
        'postcss-simple-vars': {
            variables: {
                'mantine-breakpoint-xs': '36em',
                'mantine-breakpoint-sm': '48em',
                'mantine-breakpoint-md': '62em',
                'mantine-breakpoint-lg': '75em',
                'mantine-breakpoint-xl': '88em',
            },
        },
        // 2. 再运行 Tailwind，这样 Tailwind 的 utilities 就会排在后面，优先级更高
        tailwindcss: {},
        // 3. 最后自动补全浏览器前缀
        autoprefixer: {},
    },
}
