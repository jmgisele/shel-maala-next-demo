module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      serif: ['Bellefair', 'serif'],
    },
    container: {
      center: true,
    },
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    extend: {
      colors: {
        "black": "#0c141d",
        "blue": "#7fa0c7",
        "red": "#832121",
        "ecru": "#d8c389",
        "eggshell": "#f0e9d1",
        "white": "#efeff4",
      },
      typography: {
        DEFAULT: {
          css: {
            "h1, h2, h3, h4, h5, h6": {
              "fontWeight": "unset",
              "fontFamily": "Bellefair, serif"
            },
            "h1": {
              "fontSize": "2.25rem",
              "lineHeight": "2.5rem",
              "marginBottom": "unset",
            }
          }
        },
        "xl": {
          css: {
            "h1": {
              "fontSize": "6rem",
              "lineHeight": "1",
              "marginBottom": "unset",
            }
          }
        }
      }
    },
  },
  variants: {
    extend: {
      margin: ['first'],
      // borderWidth: ['first'],
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
