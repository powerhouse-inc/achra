import { withOptionGroupSectionStoryProviders } from '@/modules/service-purchase/lib/decorators'
import { SERVICES_DATA } from '@/modules/service-purchase/mocks/mock-data'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { OptionGroupSection } from './option-group-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const mockSection = SERVICES_DATA[0].optionGroups[0]

const meta = {
  title: 'Modules/ServicePurchase/Components/OptionGroupSection',
  component: OptionGroupSection,
  parameters: {
    layout: 'padded',
    nextjs: { appDirectory: true },
  },
  tags: ['autodocs'],
  argTypes: {
    section: {
      description: 'Option group configuration',
    },
    setupDiscountedPrices: {
      description: 'Map of option group IDs to discounted setup prices',
    },
  },
  decorators: [withPortalFontStyles, withOptionGroupSectionStoryProviders],
  args: {
    section: mockSection,
    setupDiscountedPrices: {},
  },
} satisfies Meta<typeof OptionGroupSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AddOn: Story = {
  args: {
    section: SERVICES_DATA[0].optionGroups[3],
    setupDiscountedPrices: {},
  },
}
