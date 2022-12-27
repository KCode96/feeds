/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './views/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            container: {
                padding: {
                    DEFAULT: '1rem',
                    lg: '8rem',
                    xl: '12rem',
                    '2xl': '12rem',
                },
            },
        },
    },
    plugins: [],
};
