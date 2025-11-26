import { useMemo } from 'react'
import { TeamCategory } from '@/modules/shared/types/types'
import { GenericChip } from '../generic-chip/generic-chip'

interface BuildersCategoryChipProps {
  category: TeamCategory
}

export default function BuildersCategoryChip({ category }: BuildersCategoryChipProps) {
  const { label, color } = useMemo(() => {
    switch (category) {
      case TeamCategory.Technical:
        return {
          label: 'Technical',
          color: 'blue',
        }
      case TeamCategory.Support:
        return {
          label: 'Support',
          color: 'orange',
        }
      case TeamCategory.Operational:
        return {
          label: 'Operational',
          color: 'purple',
        }
      case TeamCategory.Business:
        return {
          label: 'Business',
          color: 'green',
        }
      case TeamCategory.RWAs:
        return {
          label: 'RWAs',
          color: 'purple',
        }
      case TeamCategory.Growth:
        return {
          label: 'Growth',
          color: 'red',
        }
      case TeamCategory.Finance:
        return {
          label: 'Finance',
          color: 'blue',
        }
      case TeamCategory.Legal:
        return {
          label: 'Legal',
          color: 'green',
        }
      case TeamCategory.ScopeFacilitator:
        return {
          label: 'Scope Facilitator',
          color: 'yellow',
        }
      case TeamCategory.All:
        return {
          label: 'All',
          color: 'gray',
        }
    }
  }, [category])

  return (
    <GenericChip variant="compact" color={color}>
      {label}
    </GenericChip>
  )
}
