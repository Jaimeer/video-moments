module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['jest'],
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:jest/recommended',
    'plugin:vue/recommended',
    'prettier',
    'prettier/standard',
    'prettier/vue',
  ],
  rules: {
    'no-var': 1,
    'prefer-const': 1,
    'no-console': process.env.NODE_ENV !== 'development' ? 1 : 0,
    'no-debugger': process.env.NODE_ENV !== 'development' ? 1 : 0,
    'vue/require-v-for-key': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/no-v-html': 0,
    'vue/mustache-interpolation-spacing': 1,
    'vue/attributes-order': 1,
  },
}
