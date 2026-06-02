import { HomeHero } from './home-hero'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Home/Components/HomeHero',
  component: HomeHero,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      // This tells Chromatic/Storybook to wait for all animations to finish before snapshotting
      waitForAnimationEnd: true,
      pauseAnimationAtEnd: true,
    },
  },
} satisfies Meta<typeof HomeHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
