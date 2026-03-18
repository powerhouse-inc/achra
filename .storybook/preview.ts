import { withThemeByClassName } from '@storybook/addon-themes'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { mockDateDecorator } from 'storybook-mock-date-decorator'
import { withNextjsExtras } from '../modules/shared/lib/decorators'
import type { Preview } from '@storybook/react'
import { create } from 'storybook/theming'

import '../app/globals.css'

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize({ onUnhandledRequest: 'warn' })

const preview: Preview = {
  decorators: [
    mockDateDecorator,
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    withNextjsExtras,
  ],
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    docs: {
      theme: create({
        base: 'light',
        fontBase: 'Inter',
      }),
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview
