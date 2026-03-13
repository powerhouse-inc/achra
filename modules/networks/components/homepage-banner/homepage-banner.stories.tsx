import { HOME_BANNER_EXPANDED_STORAGE_KEY } from '../../config/constants'
import { HomepageBanner } from '.'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Networks/Components/HomepageBanner',
  component: HomepageBanner,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title displayed in the banner',
    },
    backgroundImage: {
      control: 'text',
      description: 'The background image URL for the banner',
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
    backgroundImage: '/networks/backgrounds/sky.png',
    title: 'Sky DAO Dashboard',
    description:
      "Welcome to the Sky Fusion Dashboard, your hub for key insights into Sky Ecosystem's finances, governance, teams, and roadmaps. Get up-to-date data and explore strategic developments to stay informed about Sky's progress and plans.",
  },
} satisfies Meta<typeof HomepageBanner>

export default meta
type Story = StoryObj<typeof meta>

const withBannerExpandedState = (isExpanded: boolean): NonNullable<Story['render']> => {
  return function RenderWithStoredExpandedState(args) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(HOME_BANNER_EXPANDED_STORAGE_KEY, String(isExpanded))
    }

    return <HomepageBanner {...args} />
  }
}

export const Default: Story = {
  name: 'Expanded (Logged In)',
  render: withBannerExpandedState(true),
  args: {
    isLoggedIn: true,
  },
}

export const CollapsedLoggedIn: Story = {
  render: withBannerExpandedState(false),
  args: {
    isLoggedIn: true,
  },
}

export const ExpandedLoggedOut: Story = {
  render: withBannerExpandedState(true),
  args: {
    isLoggedIn: false,
  },
}

export const CollapsedLoggedOut: Story = {
  render: withBannerExpandedState(false),
  args: {
    isLoggedIn: false,
  },
}
