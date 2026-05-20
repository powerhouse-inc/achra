import { BuildNetworkSectionV2 } from './build-network-section-v2'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Home/Components/BuildNetworkSectionV2',
  component: BuildNetworkSectionV2,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      disable: true,
    },
  },
} satisfies Meta<typeof BuildNetworkSectionV2>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
