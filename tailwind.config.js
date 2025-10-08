/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 🌞 Light Theme
        light: {
          text: '#1F2937',
          background: '#FAFAFA',
          card: '#FFFFFF',
          border: '#E5E7EB',
          muted: '#6B7280',
          link: '#6366F1',
          linkHover: '#F97316',
          button: '#6366F1',
          buttonHover: '#F97316',
          scrollTop: '#6366F1',
          navHover: '#F97316',
          overlay: 'rgba(0,0,0,0.4)',
          footer: '#F9FAFB',
          navBg: '#F3F4F6',
          navBtnHover: '#E5E7EB',
        },

        // 🌚 Dark Theme
        dark: {
          text: '#F8FAFC',
          background: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          muted: '#94A3B8',
          link: '#C084FC',
          linkHover: '#FB923C',
          button: '#C084FC',
          buttonHover: '#FB923C',
          scrollTop: '#C084FC',
          navHover: '#FB923C',
          footer: '#0F172A',
          navBg: '#1E293B',
          navBtnHover: '#334155',
        },'gray-875': '#151a23',
    'gray-880': '#141a22',
    'gray-890': '#121920',
    'gray-895': '#10171e',
      },
      fontFamily: {
        sans: ["Mali", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
