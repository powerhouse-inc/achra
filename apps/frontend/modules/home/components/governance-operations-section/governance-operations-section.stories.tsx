import { GovernanceOperationsSection } from './governance-operations-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Home/Components/GovernanceOperationsSection',
  component: GovernanceOperationsSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GovernanceOperationsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
