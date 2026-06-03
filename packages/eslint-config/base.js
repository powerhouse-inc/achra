// Shared, framework-agnostic ESLint flat config foundation.
// Consumed by ./react-internal.js and (transitively) ./next.js.
import pluginJs from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import("eslint").Linter.Config[]} */
export const baseConfig = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/storybook-static/**',
      '**/coverage/**',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
      },
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
    },
  },
]

export default baseConfig
