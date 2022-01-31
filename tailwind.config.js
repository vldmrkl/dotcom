// By default, @tailwind/typography adds quotation marks to the blockquote
// elements. To remove this functionality, typography.quoteless.css was added
// to the theme config. This solution was taken from:
// https://github.com/tailwindlabs/tailwindcss-typography/issues/66#issuecomment-756834635
module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: {
    extend: {
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
