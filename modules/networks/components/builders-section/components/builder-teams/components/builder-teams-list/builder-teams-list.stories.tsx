import { BuilderTeamsList } from './builder-teams-list'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Networks/Components/BuildersSection/BuilderTeamsList',
  component: BuilderTeamsList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays a placeholder list for Builder Teams within the Builders section.',
      },
    },
  },
} satisfies Meta<typeof BuilderTeamsList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
