/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // VectorShift brand palette
        navy: {
          50: '#f8f9fb',
          100: '#e8ecf3',
          200: '#c4cfe8',
          300: '#9fb2dc',
          400: '#7a95d1',
          500: '#5a78c5',
          600: '#3d5fa8',
          700: '#1e2139', // Main navy (matching your toolbar)
          800: '#0f1623',
          900: '#08090e',
        },
        slate: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        accent: {
          primary: '#3d5fa8', // Navy blue
          success: '#4c488b',  // Green (for submit button)
          warning: '#f59e0b',  // Amber
          error: '#ef4444',    // Red
        },
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
      fontSize: {
        xs: ['11px', { lineHeight: '16px' }],
        sm: ['12px', { lineHeight: '18px' }],
        base: ['14px', { lineHeight: '20px' }],
        lg: ['16px', { lineHeight: '24px' }],
        xl: ['18px', { lineHeight: '28px' }],
        '2xl': ['20px', { lineHeight: '28px' }],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        base: '0 2px 4px rgba(0, 0, 0, 0.08)',
        md: '0 4px 8px rgba(0, 0, 0, 0.12)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
        xl: '0 12px 24px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        sm: '4px',
        base: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [],
}