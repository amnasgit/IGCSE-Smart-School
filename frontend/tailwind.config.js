// /** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#2A1113',
        navy: {
          DEFAULT: '#58060A',
          50: '#FBEEEE',
          100: '#F1D3D4',
          400: '#8F1A20',
          600: '#58060A',
          700: '#3B0407',
          900: '#260305',
        },
        amber: {
          DEFAULT: '#F2BE5A',
          50: '#FBF1DE',
          400: '#F2BE5A',
          600: '#D9A03A',
        },
        teal: {
          DEFAULT: '#9C6B1F',
          50: '#F5EEDD',
          400: '#B0812A',
          600: '#9C6B1F',
        },
        paper: '#FDF9F4',
        mist: '#F6EFE2',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'step-pattern':
          "linear-gradient(135deg, rgba(242,190,90,0.14) 25%, transparent 25%), linear-gradient(225deg, rgba(59,4,7,0.08) 25%, transparent 25%)",
      },
    },
  },
  plugins: [],
};