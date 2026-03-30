import { withBuildersFiltersProvider } from '@/modules/builders/lib/decorators'
import { mockBuilderProfiles } from '@/modules/builders/mocks'
import { withNuqsAdapter, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { BuildersTable } from './builders-table'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Builders/Components/BuildersTable',
  component: BuildersTable,
  decorators: [withBuildersFiltersProvider, withNuqsAdapter, withPortalFontStyles],
  argTypes: {
    builders: {
      description: 'List of builder profiles to display',
    },
    networkSlug: {
      control: 'text',
      description: 'Network slug for builder links',
    },
  },
  parameters: {
    layout: 'padded',
    mockingDate: new Date('2026-01-01T12:00:00.000Z'),
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
