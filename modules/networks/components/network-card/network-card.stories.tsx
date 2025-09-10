import React from 'react'
import { PowerhouseLogoIsotype, PowerhouseLogotype } from '@/modules/shared/components/svgs'
import { NetworkCard } from '.'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Networks/Components/NetworkCard',
  component: NetworkCard,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NetworkCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    isotype: (
      <div className="flex items-center gap-2">
        <PowerhouseLogoIsotype className="h-6 w-6" />
        <PowerhouseLogotype className="w-40" />
      </div>
    ),
    href: '/network/powerhouse',
    tag: 'OSS',
    variant: 'oss',
    description:
      'Powerhouse is the central network within the Sky ecosystem, dedicated to gathering and simplifying data for all users. It ensures that information is not only accessible but also easy to understand.',
    buttonText: 'Explore Powerhouse',
    backgroundImage: '/network-backgrounds/powerhouse-card-background.png',
  },
}
