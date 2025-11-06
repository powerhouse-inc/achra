import { TeamScopeEnum } from '@/modules/shared/enums/actorScopeEnum'
import type { Scope } from '@/modules/shared/types/scopes'
import { BuildersScopesChip } from './builders-scopes-chip'
import type { Meta, StoryObj } from '@storybook/nextjs'

const MOCK_SCOPES: Record<TeamScopeEnum, Scope> = {
  [TeamScopeEnum.SupportScope]: {
    id: 'support-scope',
    code: 'SUP',
    name: TeamScopeEnum.SupportScope,
  },
  [TeamScopeEnum.StabilityScope]: {
    id: 'stability-scope',
    code: 'STB',
    name: TeamScopeEnum.StabilityScope,
  },
  [TeamScopeEnum.AccessibilityScope]: {
    id: 'accessibility-scope',
    code: 'ACC',
    name: TeamScopeEnum.AccessibilityScope,
  },
  [TeamScopeEnum.ProtocolScope]: {
    id: 'protocol-scope',
    code: 'PRT',
    name: TeamScopeEnum.ProtocolScope,
  },
  [TeamScopeEnum.GovernanceScope]: {
    id: 'governance-scope',
    code: 'GOV',
    name: TeamScopeEnum.GovernanceScope,
  },
  [TeamScopeEnum.All]: {
    id: 'all-scope',
    code: 'ALL',
    name: TeamScopeEnum.All,
  },
}

const meta: Meta<typeof BuildersScopesChip> = {
  title: 'Shared/Components/Chips/BuildersScopesChip',
  component: BuildersScopesChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'extraLarge'],
      description: 'Controls the chip size variant',
    },
    scope: {
      control: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    scope: MOCK_SCOPES[TeamScopeEnum.SupportScope],
    size: 'large',
  },
}

export const Sizes: Story = {
  args: {
    scope: MOCK_SCOPES[TeamScopeEnum.GovernanceScope],
  },
  render: ({ scope }) => (
    <div className="flex flex-col gap-2">
      <BuildersScopesChip scope={scope} size="extraLarge" />
      <BuildersScopesChip scope={scope} size="large" />
      <BuildersScopesChip scope={scope} size="medium" />
      <BuildersScopesChip scope={scope} size="small" />
    </div>
  ),
}

export const AllScopes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(Object.values(TeamScopeEnum) as TeamScopeEnum[]).map((scopeName) => (
        <BuildersScopesChip key={scopeName} scope={MOCK_SCOPES[scopeName]} />
      ))}
    </div>
  ),
}
