module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      backgroundImage: {
        logo: "url('./src/images/logo.svg')",
      },
    },
  },
  plugins: [],
};
