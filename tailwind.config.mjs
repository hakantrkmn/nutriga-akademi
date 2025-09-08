/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FEFBF6',
        'background-alt': '#FBF8F1',
        foreground: '#5C5B57',
        primary: '#F7C5A8',
        'primary-hover': '#F4B691',
        accent: '#A0C1B8',
        'accent-hover': '#8EAEa4',
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '8px',
      },
    },
  },
  plugins: [],
};

export default config;
