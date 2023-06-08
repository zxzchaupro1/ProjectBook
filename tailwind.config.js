const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#191970',
          light: '#FFEFC4',
          lighter: '#FFF4D9',
          dark: '#F5B102',
        },
        grayscale: {
          black: '#202C38',
          border: '#EEEEEE',
          gray: '#676E72',
          light: '#919699',
          disabled: '#A6ABAD',
          bg: '#F9F9F9',
        },
        status: {
          error: '#FFEAE8',
          success: '#1BB045',
        },
        text: '#1D192D',
        blue: '#03A1FA',
        error: '#D63120',
        systemblue: '#007AFF',
        black_40: 'rgba(0, 0, 0, 0.4)',
      },
      spacing: {
        '4px': '4px',
        '10px': '10px',
        '12px': '12px',
        '13px': '13px',
        '16px': '16px',
        '20px': '20px',
        '24px': '24px',
        '30px': '30px',
      },
      width: {
        '24px': '24px',
        '44px': '44px',
      },
      height: {
        '24px': '24px',
        '48px': '48px',
        '60px': '60px',
        '100px': '100px',
      },
      borderWidth: {
        '0.5px': '0.5px',
      },
      borderRadius: {
        '2px': '2px',
        '4px': '4px',
        '8px': '8px',
      },
      fontSize: {
        '12px': '12px',
        '19px': '19px',
      },
      lineHeight: {
        '20px': '20px',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const flex = {
        'flex-center': {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
      };

      addUtilities(flex);
    }),
  ],
};
