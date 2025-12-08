import React from 'react'
import { OperatorProfileSection } from './operator-profile-section'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/OperatorProfile/OperatorProfileSection',
  component: OperatorProfileSection,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof OperatorProfileSection>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => <OperatorProfileSection />,
}
