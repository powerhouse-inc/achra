import React from 'react'
import { TitleComponent } from './title-component'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/TitleComponent',
  component: TitleComponent,
  parameters: { layout: 'centered' },
  argTypes: {
    levelNumber: {
      control: 'number',
      description: 'Heading level (1 or 2)',
    },
    networkName: {
      control: 'text',
      description: 'Name of the network',
    },
    icon: {
      control: 'text',
      description: 'URL of the icon image',
    },
    title: {
      control: 'text',
      description: 'Section title',
    },
    code: {
      control: 'text',
      description: 'Network or entity code',
    },
    description: {
      control: 'text',
      description: 'Section description',
    },
  },
} satisfies Meta<typeof TitleComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    levelNumber: 1,
    networkName: 'Powerhouse',
    icon: '/default-icon-cards-budget.svg',
    title: 'Atlas Immutable Budget',
    code: 'atlas/immutable',
    description: 'Endgame constitutional expense data as defined in the Sky Atlas.',
  },
  render: (args) => <TitleComponent {...args} />,
}

export const SecondLevel: Story = {
  args: {
    levelNumber: 2,
    networkName: 'Powerhouse',
    icon: '/default-icon-cards-budget.svg',
    title: 'Atlas Immutable Budget',
    code: 'atlas/immutable',
    description: 'Endgame constitutional expense data as defined in the Sky Atlas.',
  },
  render: (args) => <TitleComponent {...args} />,
}
