import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // Base ESLint recommended rules
  eslint.configs.recommended,
  // TypeScript recommended rules
  ...tseslint.configs.recommended,
  // Disables ESLint rules that might conflict with Prettier
  eslintConfigPrettier,
  {
    // Global ignores
    ignores: ['node_modules/', 'dist/'],
  },
  {
    rules: {
      'no-console': 'warn', // Warn when console.log is used
      '@typescript-eslint/no-explicit-any': 'warn', // Discourage 'any' types
    },
  }
);
