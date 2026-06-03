import { cn } from '@/shared/lib/utils'

function getBuildNetworkSectionV2CellBorderClass(index: number) {
  return cn(
    'border-border',
    index > 0 && 'border-t',
    index === 1 && 'md:border-t-0',
    index % 2 === 1 && 'md:border-l',
    index >= 2 && 'lg:border-t-0',
    index > 0 && index !== 3 && 'lg:border-l',
  )
}

export { getBuildNetworkSectionV2CellBorderClass }
