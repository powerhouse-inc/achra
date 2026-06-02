import {
  getMockedExtendedProposals,
  mockedHatAddress,
} from '@/modules/networks/mocks/governance-section'
import { isNumeric } from '@/modules/shared/lib/utils'
import { ExecutiveProposalsList } from './executive-proposals-list'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

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
    openProposals: {
      control: 'object',
      description: 'Array of open executive proposals awaiting approval',
    },
    activeProposals: {
      control: 'object',
      description: 'Array of active executive proposals',
    },
    passedProposals: {
      control: 'object',
      description: 'Array of passed executive proposals',
    },
    slicedPassedProposals: {
      control: 'object',
      description: 'Sliced subset of passed proposals for display',
    },
    hatAddress: {
      control: 'text',
      description: 'Address of the current hat (leading proposal)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the list',
    },
  },
} satisfies Meta<typeof ExecutiveProposalsList>

export default meta
type Story = StoryObj<typeof meta>

const ALL = getMockedExtendedProposals()
const OPEN = ALL.filter(
  (p) => p.active && !p.spellData.hasBeenCast && isNumeric(parseFloat(p.spellData.skySupport)),
)
const ACTIVE = ALL.filter(
  (p) => p.active && p.spellData.hasBeenCast && isNumeric(parseFloat(p.spellData.skySupport)),
)
const PASSED = ALL.filter((p) => !p.active && isNumeric(parseFloat(p.spellData.skySupport)))
const PASSED_WITHOUT_SKY_SUPPORT = ALL.filter(
  (p) => !p.active && !isNumeric(parseFloat(p.spellData.skySupport)),
)

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

export const OnlyPassedWithoutSkySupport: Story = {
  args: {
    openProposals: [],
    activeProposals: [],
    passedProposals: PASSED_WITHOUT_SKY_SUPPORT,
    slicedPassedProposals: PASSED_WITHOUT_SKY_SUPPORT.slice(0, 2),
    hatAddress: null,
  },
}
