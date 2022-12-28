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
                    xl: '10rem',
                    '2xl': '10rem',
                },
            },
        },
    },
    plugins: [],
};
