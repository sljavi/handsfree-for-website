module.exports = {
  parser: 'babel-eslint',
  ecmaFeatures: {
    modules: true,
    jsx: true
  },
  env: {
    browser: true,
    node: true,
    amd: true,
    es6: true
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    },
  },
  plugins: ['react'],
  rules: {
    'import/prefer-default-export': ['off'],
    'prefer-destructuring': ['off'],
    'no-console': ['off'],
    'no-shadow': ['off'],
    'no-unused-vars': ['error', {'args': 'none'}],
    'no-use-before-define': ['off'],
    'arrow-body-style': ['off']
  }
};
