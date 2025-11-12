import React from 'react'
import { TitleComponent } from './title-component'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Finances/TitleComponent',
  component: TitleComponent,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TitleComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    levelNumber: 1,
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
    icon: '/default-icon-cards-budget.svg',
    title: 'Atlas Immutable Budget',
    code: 'atlas/immutable',
    description: 'Endgame constitutional expense data as defined in the Sky Atlas.',
  },
  render: (args) => <TitleComponent {...args} />,
}
