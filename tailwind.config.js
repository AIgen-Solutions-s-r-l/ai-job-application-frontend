const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/globals.css",
  ],
  theme: {
    extend: {
      colors: {
        "primary-purple": "#63446A",
        "primary-deep-purple": "#4420B2",
        "primary-light-purple": "#8783D1",
        "primary-light-purple-gray": "#A9A6E3",
        "neutral-cold-0": "#F2F2F2",
        "neutral-cold-1": "#DCDCDC",
        "neutral-cold-2": "#C1C1C1",
        "my-neutral-0": "#FFFFFF",
        "my-neutral-1": "#F9F3F9",
        "my-neutral-2": "#E9E3EE",
        "my-neutral-3": "#CFB3CD",
        "my-neutral-4": "#888098",
        "my-neutral-5": "#344055",
        "my-neutral-6": "#453E48",
        "my-neutral-7": "#1F1D20",
        "splash-orange": "#FF832A",
        "splash-peacock-blue": "#406CCD",
        "splash-fucshia": "#EE3449",
        "splash-green": "#B9FF5E",
      },
      fontFamily: {
        jura: ['var(--font-jura)'],
        montserrat: ['var(--font-montserrat)'],
        kanit: ['Kanit', 'serif'],
        roboto: ['Roboto', 'serif'],
        poppins: ['Poppins', 'serif'],
        barlow: ['Barlow', 'serif'],
        k2d: ['K2D', 'serif'],
        italianno: ['Italianno', 'serif'],
        'josefin-sans': ['Josefin Sans', 'serif'],
        'open-sans': ['Open Sans', 'serif'],
      },
      backgroundImage: {
        gradient:
          "linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)",
      },
      animation: {
        opacity: "opacity 0.25s ease-in-out",
        appearFromRight: "appearFromRight 300ms ease-in-out",
        wiggle: "wiggle 1.5s ease-in-out infinite",
        popup: "popup 0.25s ease-in-out",
        shimmer: "shimmer 3s ease-out infinite alternate",
        float: 'float 3s ease-in-out infinite, rotate 3s ease-in-out infinite',
        fadeIn: 'fadeIn 1s ease-out forwards',
        scaleIn: 'scaleIn 1s ease-out forwards',
      },
      gap: {
        'form': '30px',
      },
      keyframes: {
        opacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        appearFromRight: {
          "0%": { opacity: 0.3, transform: "translate(15%, 0px);" },
          "100%": { opacity: 1, transform: "translate(0);" },
        },
        wiggle: {
          "0%, 20%, 80%, 100%": {
            transform: "rotate(0deg)",
          },
          "30%, 60%": {
            transform: "rotate(-2deg)",
          },
          "40%, 70%": {
            transform: "rotate(2deg)",
          },
          "45%": {
            transform: "rotate(-4deg)",
          },
          "55%": {
            transform: "rotate(4deg)",
          },
        },
        popup: {
          "0%": { transform: "scale(0.8)", opacity: 0.8 },
          "50%": { transform: "scale(1.1)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        shimmer: {
          "0%": { backgroundPosition: "0 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          '0%': { top: '100%', opacity: 0 },
          '50%': { top: '-20px', opacity: 1 },
          '100%': { top: '100%', opacity: 0, left: '100%' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: ' rotate(180deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require("daisyui"), 
    plugin(({ addUtilities }) => {
      addUtilities({
        ".field-sizing-content": {
          "field-sizing": "content",
        },
      });
    }),
  ],
  daisyui: {
    // Light & dark themes are added by default (it switches automatically based on OS settings)
    // You can add another theme among the list of 30+
    // Add "data-theme='theme_name" to any HTML tag to enable the 'theme_name' theme.
    // https://daisyui.com/
    themes: [
      {
        lightTheme: {
          "primary": "#8783D1",
          "secondary": "#B9FF5E",
          "accent": "#EE3449",
          "neutral-cold": "#DCDCDC",
          "neutral": "#3d4451",
          "neutral-content": "#E9E3EE",
          "base-100": "#F9F3F9",
        },
      },
      "cupcake",
      "dark"
    ],
  },
  darkMode: ["selector", '[data-theme="dark"]'],
};
