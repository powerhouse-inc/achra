import { WALLETS } from '@/modules/networks/mocks/wallets'
import { WalletsSection } from './wallets-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

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
