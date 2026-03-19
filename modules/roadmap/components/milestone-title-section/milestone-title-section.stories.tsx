import MilestoneTitleSection from './milestone-title-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Roadmap/Components/MilestoneTitleSection',
  component: MilestoneTitleSection,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MilestoneTitleSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Decentralized Operations Platform - POC',
    description:
      'Roadmap milestone: Decentralized Operations Platform - Proof of Concept. Milestone 1, set for March 1, marks the initial phase of Powerhouse Decentralized Operations Platform.',
  },
}

export const TitleOnly: Story = {
  args: {
    title: 'Decentralized Operations Platform - MVP',
  },
}

export const LongTitle: Story = {
  args: {
    title:
      'Decentralized Operations Platform - Production Release with Full Scalability and Monitoring Integration',
    description:
      'Production-grade release of the MakerDAO transparency reporting information with integrated Powerhouse platform and full monitoring capabilities.',
  },
}
