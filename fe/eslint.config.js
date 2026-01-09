import { defineConfig } from 'eslint/config';

// Note: Prettier integration is currently disabled
// import eslintConfigPrettier from 'eslint-config-prettier';
// import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

import globals from 'globals';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { ignores: ['node_modules', 'dist', 'public'] },
  {
    extends: [
      js.configs.recommended, 
      ...tseslint.configs.recommended,
      // eslintConfigPrettier,
      // eslintPluginPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@stylistic/array-bracket-spacing': [ 'error', 'always' ],

      // Rule: https://eslint.style/rules/jsx-closing-bracket-location
      '@stylistic/jsx-closing-bracket-location': 'error',
      // Rule: https://eslint.style/rules/jsx-closing-tag-location
      '@stylistic/jsx-closing-tag-location': 'error',
      // Rule: https://eslint.style/rules/jsx-first-prop-new-line
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],


      // Rule: https://eslint.style/rules/indent
      '@stylistic/indent': [ 'error', 2 ],

      // Rule: https://eslint.style/rules/object-curly-newline
      '@stylistic/object-curly-newline': [
        'error', 
        { 
          'ObjectExpression': { 'multiline': true, 'minProperties': 1 },
          'ObjectPattern': { 'multiline': true, 'minProperties': 2 },
          'ImportDeclaration': { 'multiline': true, 'minProperties': 2 },
          'ExportDeclaration': { 'multiline': true, 'minProperties': 2 },
        }
      ],
      '@stylistic/object-curly-spacing': ['error', 'always', { 'arraysInObjects': false }],
      '@stylistic/object-property-newline': 'error',

      // Rule: https://eslint.org/docs/latest/rules/no-restricted-imports
      'no-restricted-imports': [
        'error',
        {
          'patterns': [{ 'regex': '^@mui/[^/]+$' }]
        }
      ],

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // Rule: https://eslint.org/docs/latest/rules/semi
      'semi': [ 'error', 'always' ],

      'simple-import-sort/imports': [
        'error',
        {
          'groups': [
            // `react` and `react-dom` are always imported first.
            ['^react'],
            // Packages starting with `@mui/*`
            ['^@mui/material', '@mui/x-data-grid', '^@mui/system', '^@mui/icons-material' ],
            // Packages starting with a character, with `@` and with `~`
            // Note: test '(?!src\/(?:\/|$))' excludes imports starting with `src/`
            ['^[a-z](?!src\/(?:\/|$))', '^@', '^~'],
            // ['^[a-z]', '^@', '^~'],
            // Imports starting with `src`
            ['src$', ],
            // Imports starting with `../`
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Imports starting with `./`
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports
            ['^.+\\.s?css$'],
            // Side effect imports
            ['^\\u0000']
          ]  
        }
      ],
      'simple-import-sort/exports': 'error',
    },
  },
]);
