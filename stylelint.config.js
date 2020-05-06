module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-prettier/recommended',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
  },
}
