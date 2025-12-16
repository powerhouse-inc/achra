import { BuilderScope } from '@/modules/__generated__/graphql/switchboard-generated'
import BuildersScopesChip from './builders-scopes-chip'
import type { Meta, StoryObj } from '@storybook/nextjs'

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
    scope: BuilderScope.SupportScope,
    size: 'large',
  },
}

export const Sizes: Story = {
  args: {
    scope: BuilderScope.GovernanceScope,
  },
  render: ({ scope }) => (
    <div className="flex flex-col gap-2">
      <BuildersScopesChip scope={scope} size="large" />
      <BuildersScopesChip scope={scope} size="medium" />
      <BuildersScopesChip scope={scope} size="small" />
    </div>
  ),
}

export const AllScopes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(Object.values(BuilderScope) as BuilderScope[]).map((scope) => (
        <BuildersScopesChip key={scope} scope={scope} />
      ))}
    </div>
  ),
}
