module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh', 'react', '@typescript-eslint'],
  settings: {
    tailwindcss: {
      config: './tailwind.config.ts',
    },
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'import/extensions': 0,
    // * react
    'react/jsx-props-no-spreading': [
      1,
      {
        custom: 'ignore',
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        'additionalHooks': 'useRecoilCallback',
      },
    ],
    'import/prefer-default-export': 1,
    'import/no-extraneous-dependencies': 0,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external'],
        'newlines-between': 'always',
      },
    ],
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
      },
    ],
    // * typescript
    '@typescript-eslint/no-shadow': ['warn'],
    // * react-query
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/no-rest-destructuring': 'warn',
    '@tanstack/query/stable-query-client': 'error',
  },
};
