import { ServiceEntityEnum } from '@/modules/shared/types/services'
import { ServicesEntitiesChip } from './services-entities-chip'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof ServicesEntitiesChip> = {
  title: 'Shared/Components/Chips/ServicesEntitiesChip',
  component: ServicesEntitiesChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    entity: {
      control: 'select',
      options: Object.values(ServiceEntityEnum),
      description: 'The service entity to display',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Builders: Story = {
  args: {
    entity: ServiceEntityEnum.Builders,
  },
}

export const Operators: Story = {
  args: {
    entity: ServiceEntityEnum.Operators,
  },
}

export const Founders: Story = {
  args: {
    entity: ServiceEntityEnum.Founders,
  },
}

export const SNO_Governors: Story = {
  args: {
    entity: ServiceEntityEnum['SNO Governors'],
  },
}

export const AllEntities: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <ServicesEntitiesChip entity={ServiceEntityEnum.Builders} />
        <ServicesEntitiesChip entity={ServiceEntityEnum.Operators} />
        <ServicesEntitiesChip entity={ServiceEntityEnum.Founders} />
        <ServicesEntitiesChip entity={ServiceEntityEnum['SNO Governors']} />
      </div>
    </div>
  ),
}
