import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "15px",
        },
        extend: {
            colors: {
                text: 'var(--text-color)',
                background: 'var(--background)',
                primary: 'var(--primary-color)',
                secondary: 'var(--secondary-color)',
                accent: 'var(--accent-color)',
            },
        },
    },
    plugins: [],
};
export default config;
