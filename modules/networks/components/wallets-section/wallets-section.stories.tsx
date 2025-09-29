import { WALLETS } from './mocks/wallets'
import { WalletsSection } from './wallets-section'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof WalletsSection> = {
  title: 'Modules/Networks/Components/WalletsSection',
  component: WalletsSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A section that displays wallet information with sorting capabilities and responsive design.',
      },
    },
  },
  argTypes: {
    wallets: {
      description: 'Array of wallet objects containing wallet information',
      control: { type: 'object' },
    },
    className: {
      description: 'Additional CSS classes to apply to the section',
      control: { type: 'text' },
    },
  },
}

export default meta
type Story = StoryObj<typeof WalletsSection>

export const Default: Story = {
  args: {
    wallets: WALLETS,
  },
}

export const SingleWallet: Story = {
  args: {
    wallets: [WALLETS[0]],
  },
  parameters: {
    docs: {
      description: {
        story: 'Display with a single wallet.',
      },
    },
  },
}

export const ManyWallets: Story = {
  args: {
    wallets: [
      ...WALLETS,
      {
        id: '4',
        name: 'Development Fund',
        address: '0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8',
        usdsBalance: '2,500,000',
        skyBalance: '1,200,000',
      },
      {
        id: '5',
        name: 'Marketing Treasury',
        address: '0x8dC68B6B98fBcf95316D18901DF5d2bE42F597B9',
        usdsBalance: '500,000',
        skyBalance: '300,000',
      },
      {
        id: '6',
        name: 'Community Rewards',
        address: '0x9eE79C7C89gCde06427E29012EG6e3cF53G608C',
        usdsBalance: '1,000,000',
        skyBalance: '800,000',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Display with multiple wallets to test scrolling and sorting functionality.',
      },
    },
  },
}

export const LargeBalances: Story = {
  args: {
    wallets: [
      {
        id: '1',
        name: 'Mega Treasury',
        address: '0x99999...ADV313',
        usdsBalance: '999,999,999',
        skyBalance: '888,888,888',
      },
      {
        id: '2',
        name: 'Small Wallet',
        address: '0x11111...ADV313',
        usdsBalance: '1',
        skyBalance: '5',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Test with very large and very small balance values.',
      },
    },
  },
}
