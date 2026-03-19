import { BuildersFiltersProvider } from '@/modules/builders/components/builders-filters/builders-filters-context'
import { mockBuilderProfiles } from '@/modules/builders/mocks'
import {
  withNextjsExtras,
  withNuqsAdapter,
  withPortalFontStyles,
} from '@/modules/shared/lib/decorators'
import { BuildersTable } from './builders-table'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const withBuildersFiltersProvider = (Story: React.ComponentType) => (
  <BuildersFiltersProvider>
    <Story />
  </BuildersFiltersProvider>
)

const meta = {
  title: 'Modules/Builders/Components/BuildersTable',
  component: BuildersTable,
  decorators: [
    withBuildersFiltersProvider,
    withNuqsAdapter,
    withPortalFontStyles,
    withNextjsExtras,
  ],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/builders',
      },
    },
  },
} satisfies Meta<typeof BuildersTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    builders: mockBuilderProfiles,
    networkSlug: 'powerhouse',
  },
}

export const Empty: Story = {
  args: {
    builders: [],
    networkSlug: 'powerhouse',
  },
}
