module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'unused-imports',
  ],
  rules: {
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'react/jsx-max-props-per-line': [1, { maximum: 1 }],
    'react/jsx-indent-props': [2, 2],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['warn'],
    'comma-dangle': ['warn', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],
    'arrow-parens': ['warn', 'always'],
    'jsx-quotes': ['warn', 'prefer-single'],
    'space-before-function-paren': 'off',
    'jsx-a11y/alt-text': 'off',
    semi: ['warn', 'never'],
    'unused-imports/no-unused-imports': 'error',
    'no-empty-pattern': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          'lodash',
          'antd',
        ],
      },
    ],
  },
}
