import { type Route } from 'next'
import BreadcrumbNavigation from './breadcrumb-navigation'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Shared/Components/BreadcrumbNavigation',
  component: BreadcrumbNavigation,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/networks',
        params: {
          slug: 'networks',
        },
      },
    },
  },
} satisfies Meta<typeof BreadcrumbNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: 'MainBreadcrumb (Achra)',
  args: {
    className: 'container',
    maxSegmentWidthMobile: 100,
    items: [
      { label: 'Networks', href: '/networks' },
      { label: 'Powerhouse', href: '/networks' },
      { label: 'Roadmaps', href: '/networks' },
      { label: 'Roadmap', href: '/networks' },
      { label: 'Overview', href: '/networks' },
    ],
  },
}
