import { mockedNetworks } from '../../mocks/networks'
import { NetworkCard } from '.'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Networks/Components/NetworkCard',
  component: NetworkCard,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NetworkCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    profile: mockedNetworks[0],
  },
}
