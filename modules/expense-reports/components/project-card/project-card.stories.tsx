import { withNuqsAdapter } from '@/modules/shared/lib/decorators'
import { ProjectCard } from './project-card'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Expense Reports/Components/ProjectCard',
  component: ProjectCard,
  decorators: [withNuqsAdapter],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/builders/powerhouse-builders',
      },
    },
  },
} satisfies Meta<typeof ProjectCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
