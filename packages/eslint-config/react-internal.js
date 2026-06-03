// ESLint flat config for internal React libraries (e.g. @achra/ui).
// Base + React / React Hooks. No Next.js, no type-aware project service.
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import storybook from 'eslint-plugin-storybook'
import { baseConfig } from './base.js'

/** @type {import("eslint").Linter.Config[]} */
export const reactInternalConfig = [
  ...baseConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Canonical shadcn hooks (e.g. use-mobile) set state synchronously in an
      // effect to seed initial state; allow it as a non-blocking warning.
      'react-hooks/set-state-in-effect': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      'react/function-component-definition': 'off',
    },
  },
  // Storybook lint rules (story-exports, hierarchy, hooks-in-render off, etc.) —
  // parity with the Next.js app config so stories authored inside packages get
  // the same checks.
  ...storybook.configs['flat/recommended'],
]

export default reactInternalConfig
