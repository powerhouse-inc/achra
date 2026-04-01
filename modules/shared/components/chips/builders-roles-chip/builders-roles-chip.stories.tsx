import { TeamRole } from '@/modules/shared/types'
import BuildersRolesChip from './builders-roles-chip'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/Chips/BuildersRolesChip',
  component: BuildersRolesChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    role: {
      control: 'select',
      options: Object.values(TeamRole),
      description: 'The role of the builder',
    },
  },
} satisfies Meta<typeof BuildersRolesChip>

export default meta
type Story = StoryObj<typeof meta>

export const ActiveEcosystemActor: Story = {
  args: {
    role: TeamRole.ActiveEcosystemActor,
  },
}

export const AllRoles: Story = {
  args: {
    role: TeamRole.All, // to avoid TS issues
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <BuildersRolesChip role={TeamRole.ActiveEcosystemActor} />
        <BuildersRolesChip role={TeamRole.ScopeFacilitator} />
        <BuildersRolesChip role={TeamRole.AdvisoryCouncilMember} />
        <BuildersRolesChip role={TeamRole.Facilitator} />
        <BuildersRolesChip role={TeamRole.ResearchExpert} />
        <BuildersRolesChip role={TeamRole.ProjectLead} />
        <BuildersRolesChip role={TeamRole.DataExpert} />
        <BuildersRolesChip role={TeamRole.TechExpert} />
        <BuildersRolesChip role={TeamRole.TeamLead} />
        <BuildersRolesChip role={TeamRole.All} />
      </div>
    </div>
  ),
}
