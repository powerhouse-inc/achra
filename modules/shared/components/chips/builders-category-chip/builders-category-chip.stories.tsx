import { TeamCategory } from '@/modules/shared/types/types'
import BuildersCategoryChip from './builders-category-chip'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Shared/Components/Chips/BuildersCategoryChip',
  component: BuildersCategoryChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    category: {
      control: 'select',
      options: Object.values(TeamCategory),
      description: 'The category of the builder',
    },
  },
} satisfies Meta<typeof BuildersCategoryChip>

export default meta
type Story = StoryObj<typeof meta>

export const Technical: Story = {
  args: {
    category: TeamCategory.Technical,
  },
}

export const AllCategories: Story = {
  args: {
    category: TeamCategory.All, // to avoid TS issues
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <BuildersCategoryChip category={TeamCategory.Technical} />
        <BuildersCategoryChip category={TeamCategory.Support} />
        <BuildersCategoryChip category={TeamCategory.Operational} />
        <BuildersCategoryChip category={TeamCategory.Business} />
        <BuildersCategoryChip category={TeamCategory.RWAs} />
        <BuildersCategoryChip category={TeamCategory.Growth} />
        <BuildersCategoryChip category={TeamCategory.Finance} />
        <BuildersCategoryChip category={TeamCategory.Legal} />
        <BuildersCategoryChip category={TeamCategory.ScopeFacilitator} />
        <BuildersCategoryChip category={TeamCategory.All} />
      </div>
    </div>
  ),
}
