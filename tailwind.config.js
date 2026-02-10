/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#087F9C',
                    hover: '#066c85', // Legacy, can be refined
                    light: '#0a98ba', // Legacy
                },
                'sidebar-dark': '#1E2A32',
                'accent-green': '#10B981',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
}
