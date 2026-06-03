import { CasesHero } from './cases-hero'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Cases/Components/CasesHero',
  component: CasesHero,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      // This tells Chromatic/Storybook to wait for all animations to finish before snapshotting
      waitForAnimationEnd: true,
      pauseAnimationAtEnd: true,
    },
  },
} satisfies Meta<typeof CasesHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
