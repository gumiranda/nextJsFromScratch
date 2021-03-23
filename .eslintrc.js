module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/extensions': 'off',
    'object-curly-spacing': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off',
    'no-param-reassign': 'off',
    'react/jsx-filename-extension': [
      1,
      {extensions: ['.js', '.jsx', 'tsx', 'ts']},
    ],
    'react/button-has-type': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
