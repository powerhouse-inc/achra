import { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import BuildersSkillsChip from './builders-skills-chip'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof BuildersSkillsChip> = {
  title: 'Shared/Components/Chips/BuildersSkillsChip',
  component: BuildersSkillsChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    skill: {
      control: 'select',
      options: Object.values(BuilderSkill),
      description: 'The skill of the builder',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const BackendDevelopment: Story = {
  args: {
    skill: BuilderSkill.BackendDevelopment,
  },
}

export const AllSkills: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <BuildersSkillsChip skill={BuilderSkill.BackendDevelopment} />
        <BuildersSkillsChip skill={BuilderSkill.DataEngineering} />
        <BuildersSkillsChip skill={BuilderSkill.DevopsEngineering} />
        <BuildersSkillsChip skill={BuilderSkill.FrontendDevelopment} />
        <BuildersSkillsChip skill={BuilderSkill.FullStackDevelopment} />
        <BuildersSkillsChip skill={BuilderSkill.QaTesting} />
        <BuildersSkillsChip skill={BuilderSkill.SecurityEngineering} />
        <BuildersSkillsChip skill={BuilderSkill.SmartContractDevelopment} />
        <BuildersSkillsChip skill={BuilderSkill.TechnicalWriting} />
        <BuildersSkillsChip skill={BuilderSkill.UiUxDesign} />
      </div>
    </div>
  ),
}
