import { withReactServerComponentDecorator } from '@/modules/shared/config/rsc-decorator'
import WorkstreamsPage from './page'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Achra/Pages/Workstreams',
  component: WorkstreamsPage,
  decorators: [withReactServerComponentDecorator],
  parameters: {
    includeLayout: true,
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/workstreams',
      },
    },
  },
} satisfies Meta<typeof WorkstreamsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
