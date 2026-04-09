import { withNuqsAdapter } from '@/modules/shared/lib/decorators'
import { project } from '../../mocks/project'
import { ProjectCard } from './project-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ExpenseReports/Components/ProjectCard',
  component: ProjectCard,
  decorators: [withNuqsAdapter],
  argTypes: {
    project: {
      control: false,
      description: 'Builder project data',
    },
  },
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

export const Default: Story = {
  args: {
    project,
  },
}
