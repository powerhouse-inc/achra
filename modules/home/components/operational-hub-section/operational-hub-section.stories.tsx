import { OperationalHubSection } from './operational-hub-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Home/Components/OperationalHubSection',
  component: OperationalHubSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof OperationalHubSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
