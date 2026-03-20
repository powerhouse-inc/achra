import { withBuildersFiltersProvider } from '@/modules/builders/lib/decorators'
import { mockBuilderProfiles } from '@/modules/builders/mocks'
import { withNuqsAdapter, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { BuildersList } from './builders-list'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Builders/Components/BuildersList',
  component: BuildersList,
  decorators: [withBuildersFiltersProvider, withNuqsAdapter, withPortalFontStyles],
  argTypes: {
    builders: {
      description: 'List of builder profiles to display',
    },
    networkSlug: {
      control: 'text',
      description: 'Network slug for builder links',
    },
    asSectionContent: {
      control: 'boolean',
      description: 'Whether rendered as section content (affects padding)',
    },
  },
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/builders',
      },
    },
  },
} satisfies Meta<typeof BuildersList>

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
