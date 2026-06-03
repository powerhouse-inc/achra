import React from 'react'

import { NavigationCard } from './navigation-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { Route } from 'next'

const meta = {
  title: 'Modules/Finances/Components/NavigationCard',
  component: NavigationCard,
  parameters: { layout: 'centered' },
  argTypes: {
    image: {
      control: 'text',
      description: 'URL of the card background image',
    },
    title: {
      control: 'text',
      description: 'Card title',
    },
    description: {
      control: 'text',
      description: 'Card description',
    },
    href: {
      control: 'text',
      description: 'Navigation link URL',
    },
    code: {
      control: 'text',
      description: 'Network or entity code',
    },
    isCompact: {
      control: 'boolean',
      description: 'Whether to use compact layout',
    },
  },
} satisfies Meta<typeof NavigationCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
