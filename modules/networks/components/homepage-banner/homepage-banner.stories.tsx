import { HomepageBanner } from '.'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Networks/Components/HomepageBanner',
  component: HomepageBanner,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title displayed in the banner',
    },
    description: {
      control: 'text',
      description: 'The description text shown when expanded',
    },
    isLoggedIn: {
      control: 'boolean',
      description: 'Whether to show the admin buttons (Edit in Connect)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    title: 'Sky DAO Dashboard',
    description:
      "Welcome to the Sky Fusion Dashboard, your hub for key insights into Sky Ecosystem's finances, governance, teams, and roadmaps. Get up-to-date data and explore strategic developments to stay informed about Sky's progress and plans.",
  },
} satisfies Meta<typeof HomepageBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Expanded: Story = {
  args: {
    defaultExpanded: true,
  },
}

export const Collapsed: Story = {}

export const ExpandedAndAuthenticated: Story = {
  args: {
    isLoggedIn: true,
    defaultExpanded: true,
  },
}

export const CollapsedAndAuthenticated: Story = {
  args: {
    isLoggedIn: true,
  },
}
