import React from 'react'
import { PowerhouseLogoIsotype } from '@/modules/shared/components/svgs'
import { NetworkCard } from './network-card'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Shared/Components/NetworkCard',
  component: NetworkCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NetworkCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    isotype: <PowerhouseLogoIsotype />,
    title: 'Powerhouse',
    href: '/network/powerhouse',
    tag: 'OSS',
    tagColor: 'bg-purple-500',
    description:
      'Powerhouse is the central network within the Sky ecosystem, dedicated to gathering and simplifying data for all users. It ensures that information is not only accessible but also easy to understand.',
    buttonText: 'Explore Powerhouse',
    backgroundImage: '/network-backgrounds/powerhouse-card-background.png',
  },
}
