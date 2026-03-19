import { BuilderSkill } from '@/modules/__generated__/graphql/switchboard-generated'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { HeaderTitleOperatorProfile } from './header-title-operator-profile'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Operator Profile/Components/HeaderTitleOperatorProfile',
  component: HeaderTitleOperatorProfile,
  decorators: [withPortalFontStyles],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof HeaderTitleOperatorProfile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Powerhouse',
    code: 'PH',
    skills: [
      BuilderSkill.FrontendDevelopment,
      BuilderSkill.BackendDevelopment,
      BuilderSkill.UiUxDesign,
    ],
  },
}

export const WithLogo: Story = {
  args: {
    name: 'Powerhouse',
    code: 'PH',
    logo: 'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
    skills: [
      BuilderSkill.FrontendDevelopment,
      BuilderSkill.BackendDevelopment,
      BuilderSkill.UiUxDesign,
    ],
  },
}

export const ManySkills: Story = {
  args: {
    name: 'Powerhouse',
    code: 'PH',
    skills: [
      BuilderSkill.FrontendDevelopment,
      BuilderSkill.BackendDevelopment,
      BuilderSkill.UiUxDesign,
      BuilderSkill.DataEngineering,
      BuilderSkill.DevopsEngineering,
    ],
  },
}

export const NoCode: Story = {
  args: {
    name: 'Powerhouse',
    skills: [BuilderSkill.FrontendDevelopment],
  },
}
