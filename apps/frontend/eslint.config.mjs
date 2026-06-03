// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import { nextJsConfig } from '@achra/eslint-config/next'

export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'modules/__generated__/**',
      'dist/**',
      'storybook-static/**',
      '.storybook/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
      'scripts/**',
      '.agents/**',
      'vitest.shims.d.ts',
    ],
  },
  ...nextJsConfig,
]
