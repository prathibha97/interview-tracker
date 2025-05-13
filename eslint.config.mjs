import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignorePatterns: ['generated/'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Turn off warnings and errors for 'any'
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];

export default eslintConfig;

// @typescript-eslint/no-unused-vars
// 14:5  Error: A `require()` style import is forbidden.  @typescript-eslint/no-require-imports
// 371:11  Error: 'target' is defined but never used.  @typescript-eslint/no-unused-vars
// 371:19  Error: 'prop' is defined but never used.  @typescript-eslint/no-unused-vars
