import {
  getMockedExtendedProposals,
  mockedHatAddress,
} from '@/modules/networks/mocks/governance-section'
import { ExecutiveProposalsList } from './executive-proposals-list'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Networks/Components/GovernanceSection/ExecutiveProposalsList',
  component: ExecutiveProposalsList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Displays grouped executive proposals: Open, Active, and Passed. Highlights the current hat address.',
      },
    },
  },
  argTypes: {
    openProposals: { control: 'object' },
    activeProposals: { control: 'object' },
    passedProposals: { control: 'object' },
    slicedPassedProposals: { control: 'object' },
    hatAddress: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof ExecutiveProposalsList>

export default meta
type Story = StoryObj<typeof meta>

const ALL = getMockedExtendedProposals()
const OPEN = ALL.filter((p) => p.active && !p.spellData.hasBeenCast)
const ACTIVE = ALL.filter((p) => p.active && p.spellData.hasBeenCast)
const PASSED = ALL.filter((p) => !p.active)

export const Default: Story = {
  args: {
    openProposals: OPEN,
    activeProposals: ACTIVE,
    passedProposals: PASSED,
    slicedPassedProposals: PASSED.slice(0, 2),
    hatAddress: mockedHatAddress,
  },
}

export const OnlyOpen: Story = {
  args: {
    openProposals: OPEN,
    activeProposals: [],
    passedProposals: [],
    slicedPassedProposals: [],
    hatAddress: null,
  },
}

export const OnlyActive: Story = {
  args: {
    openProposals: [],
    activeProposals: ACTIVE,
    passedProposals: [],
    slicedPassedProposals: [],
    hatAddress: mockedHatAddress,
  },
}

export const OnlyPassed: Story = {
  args: {
    openProposals: [],
    activeProposals: [],
    passedProposals: PASSED,
    slicedPassedProposals: PASSED.slice(0, 2),
    hatAddress: null,
  },
}
