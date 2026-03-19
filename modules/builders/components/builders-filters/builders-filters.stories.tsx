import { withBuildersFiltersProvider } from '@/modules/builders/lib/decorators'
import { withNuqsAdapter, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import BuilderFilters from './builders-filters'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Builders/Components/BuilderFilters',
  component: BuilderFilters,
  decorators: [withBuildersFiltersProvider, withNuqsAdapter, withPortalFontStyles],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/builders',
      },
    },
  },
} satisfies Meta<typeof BuilderFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
