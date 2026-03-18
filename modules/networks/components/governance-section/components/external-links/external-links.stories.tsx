import { ExternalLinks } from './external-links'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Networks/Components/GovernanceSection/ExternalLinks',
  component: ExternalLinks,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/networks',
      },
    },
  },
} satisfies Meta<typeof ExternalLinks>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
