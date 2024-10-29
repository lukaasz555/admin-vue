module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'vuetify',
    '@vue/eslint-config-typescript',
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        tabWidth: 2,
        semi: true,
        printWidth: 70,
      },
    ],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['button', 'input', 'select', 'loader'],
      },
    ],
  },
};
