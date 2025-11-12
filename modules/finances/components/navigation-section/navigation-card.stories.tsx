import React from 'react'

import { NavigationCard } from './navigation-card'
import type { Meta, StoryObj } from '@storybook/nextjs'
import type { Route } from 'next'

const meta = {
  title: 'Modules/Finances/NavigationCard',
  component: NavigationCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NavigationCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    image:
      'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_atlas_budgets.svg',
    title: 'Powerhouse',
    description: 'Powerhouse is a network of power plants that produce electricity.',
    href: '/network/powerhouse' as Route,
    code: 'atlas/immutable',
    isCompact: false,
  },
  render: (args) => <NavigationCard {...args} />,
}
