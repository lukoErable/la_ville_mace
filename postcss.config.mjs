const config = {
  plugins: ['@tailwindcss/postcss'],
  theme: {
    extend: {
      keyframes: {
        fade: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '50%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
      },
      animation: {
        fade: 'fade 2s ease-in-out',
      },
    },
  },
};

export default config;
