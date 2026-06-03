import type { StorybookConfig } from '@storybook/nextjs-vite'

const config: StorybookConfig = {
  stories: [
    '../modules/**/*.mdx',
    '../modules/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-themes',
    'storybook-addon-mock-date',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      image: {
        excludeFiles: ['**/*.svg'],
      },
    },
  },
  features: {
    experimentalRSC: true,
  },
  staticDirs: ['../public'],
  async viteFinal(config) {
    const { mergeConfig } = await import('vite')
    const { default: svgr } = await import('vite-plugin-svgr')

    return mergeConfig(config, {
      plugins: [
        svgr({
          include: '**/*.svg',
          svgrOptions: {
            exportType: 'default',
          },
        }),
      ],
    })
  },
}

export default config
