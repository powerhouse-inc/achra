import { BuilderStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import BuilderProfile from './builder-profile'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/BuilderProfile',
  component: BuilderProfile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    code: { control: 'text' },
    status: { control: 'select', options: Object.values(BuilderStatus) },
    isOperator: { control: 'boolean' },
  },
} satisfies Meta<typeof BuilderProfile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Achra Labs',
    code: 'ACH',
    status: BuilderStatus.Active,
    image:
      'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
    isOperator: false,
  },
}

export const Operator: Story = {
  args: {
    name: 'Powerhouse',
    code: 'PH',
    status: BuilderStatus.Active,
    image:
      'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
    isOperator: true,
  },
}

export const Inactive: Story = {
  args: {
    name: 'Inactive Builder',
    code: 'INACT',
    status: BuilderStatus.Inactive,
    image:
      'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
    isOperator: false,
  },
}
