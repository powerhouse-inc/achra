import { ServiceEntityEnum } from '@/modules/shared/types/services'

/**
 * Maps targetAudience label to ServiceEntityEnum
 * TODO: [API Integration] Consider using dynamic colors from API instead of enum-based approach
 */
function mapLabelToEntity(label: string): ServiceEntityEnum | null {
  const mapping: Record<string, ServiceEntityEnum> = {
    Builders: ServiceEntityEnum.Builders,
    Networks: ServiceEntityEnum.Networks,
    Operators: ServiceEntityEnum.Operators,
    Founders: ServiceEntityEnum.Founders,
    'SNO Governors': ServiceEntityEnum['SNO Governors'],
  }
  return mapping[label] ?? null
}

export { mapLabelToEntity }
