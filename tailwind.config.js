/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'border-move': 'borderMove 5s linear infinite', // Fix naming here
      },
      keyframes: {
        borderMove: {
          '0%': { top: '0', left: '0' }, // Start at top-left
          '25%': { top: '0', left: '100%' }, // Move to top-right
          '50%': { top: '100%', left: '100%' }, // Move to bottom-right
          '75%': { top: '100%', left: '0' }, // Move to bottom-left
          '100%': { top: '0', left: '0' }, // Complete the loop at top-left
        },
      },
    }
  },
  plugins: [],
}
