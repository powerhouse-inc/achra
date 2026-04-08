import type { VariantColorType } from '@/shared/components/chips/generic-chip/variant-styles'

interface TagChipStyle {
  color: VariantColorType
  className: string
}

/** Filled chip colors aligned with use-case tag design (light bg + saturated text). */
export const TAG_CHIP_CONFIG: Partial<Record<string, TagChipStyle>> = {
  'Open Source': {
    color: 'purple',
    className: 'normal-case bg-[#E0D7FF] text-[#7C5CFF]',
  },
  'Public Goods': {
    color: 'red',
    className: 'normal-case bg-[#FAD8F4] text-[#E056D2]',
  },
  'Network States': {
    color: 'blue',
    className: 'normal-case bg-[#D1E9FF] text-[#007AFF]',
  },
  'Community Organizations': {
    color: 'green',
    className: 'normal-case bg-[#D1FADF] text-[#34D399]',
  },
  'Network Organizations': {
    color: 'blue',
    className: 'normal-case bg-[#D1E9FF] text-[#007AFF]',
  },
}
