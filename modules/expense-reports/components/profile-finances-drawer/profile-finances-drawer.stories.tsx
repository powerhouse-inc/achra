import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { ProfileFinancesDrawer } from './profile-finances-drawer'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Expense Reports/Components/ProfileFinancesDrawer',
  component: ProfileFinancesDrawer,
  decorators: [withPortalFontStyles, withNextjsExtras],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/builders/powerhouse-dashboard',
      },
    },
  },
} satisfies Meta<typeof ProfileFinancesDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    builderSlug: 'powerhouse-dashboard',
    operationalHub: {
      __typename: 'OpHubMember',
      name: 'Powerhouse Operational Hub',
      phid: null,
    },
  },
}

export const NoOperationalHub: Story = {
  args: {
    builderSlug: 'powerhouse-dashboard',
    operationalHub: {
      __typename: 'OpHubMember',
      name: null,
      phid: null,
    },
  },
}
