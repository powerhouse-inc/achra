import { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import { BuilderSkills } from './builder-skills'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/BuilderSkills',
  component: BuilderSkills,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BuilderSkills>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    skills: [BuilderSkill.FrontendDevelopment, BuilderSkill.BackendDevelopment],
  },
}

export const SingleSkill: Story = {
  args: {
    skills: [BuilderSkill.FrontendDevelopment],
  },
}

export const ManySkills: Story = {
  args: {
    skills: [
      BuilderSkill.FrontendDevelopment,
      BuilderSkill.BackendDevelopment,
      BuilderSkill.DevopsEngineering,
      BuilderSkill.DataEngineering,
    ],
  },
}
