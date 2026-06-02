import { mockBuilderTeams } from '@/modules/networks/mocks/builders-section'
import { BuildersList } from './builders-list'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Networks/Components/BuildersSection/BuilderTeamsList',
  component: BuildersList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays a placeholder list for Builder Teams within the Builders section.',
      },
    },
  },
} satisfies Meta<typeof BuildersList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    builders: mockBuilderTeams,
  },
}
