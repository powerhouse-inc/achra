import { AlreadyOperatorCard } from './already-operator-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Onboarding/Get Started/Already Operator Card',
  component: AlreadyOperatorCard,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/get-started',
      },
    },
  },
} satisfies Meta<typeof AlreadyOperatorCard>

export default meta
type Story = StoryObj<typeof meta>

export const WithDrive: Story = {
  args: {
    operatorDriveLink: 'http://localhost:3001/d/example?driveUrl=http://localhost:4001/d/example',
  },
}

export const MissingDrive: Story = {
  args: {
    operatorDriveLink: undefined,
  },
}
