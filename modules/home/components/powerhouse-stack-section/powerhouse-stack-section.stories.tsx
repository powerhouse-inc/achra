import { PowerhouseStackSection } from './powerhouse-stack-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Home/Components/PowerhouseStackSection',
  component: PowerhouseStackSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PowerhouseStackSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
