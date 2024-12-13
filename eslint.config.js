import html from 'eslint-plugin-html';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: ['**/.gitignore', 'demo/*', 'test/*', 'node_modules/*', 'eslint.config.js']
  },
  ...compat.extends('eslint:recommended'),
  {
    plugins: {
      html,
      prettier
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        moment: true,
        Promise: true,
        Polymer: true
      },

      ecmaVersion: 2018,
      sourceType: 'module'
    },

    rules: {
      'padded-blocks': 'off',
      'brace-style': 'off',

      'new-cap': [
        'error',
        {
          capIsNewExceptions: ['GestureEventListeners'],
          capIsNewExceptionPattern: '^Etools..'
        }
      ],

      'no-var': 'off',
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'one-var': 'off',
      'space-before-function-paren': 'off',
      'comma-dangle': ['error', 'never'],

      'max-len': [
        'error',
        {
          code: 120
        }
      ],

      camelcase: [
        'error',
        {
          properties: 'never'
        }
      ],

      'arrow-parens': [
        2,
        'as-needed',
        {
          requireForBlockBody: true
        }
      ]
    }
  }
];
