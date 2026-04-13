import { cva, type VariantProps } from 'class-variance-authority'

import type { NetworkCategory } from '@/modules/__generated__/graphql/switchboard-generated'
import { Badge } from '@/modules/shared/components/ui/badge'
import { cn } from '@/modules/shared/lib/utils'

export interface NetworkChip extends VariantProps<typeof networkCategoryVariants> {
  category: NetworkCategory
}

const networkCategoryVariants = cva('border-2 px-2 py-0 text-sm font-extrabold', {
  variants: {
    category: {
      CHARITY: 'bg-red-100/30 text-red-600 border-red-600/70',
      CRYPTO: 'bg-yellow-100/30 text-yellow-600 border-yellow-600/70',
      DEFI: 'bg-status-progress/30 text-status-progress border-status-progress/70',
      NGO: 'bg-green-100/30 text-green-600 border-green-600/70',
      OSS: 'bg-purple/30 text-purple border-purple/70',
    },
  },
  defaultVariants: {
    category: 'OSS',
  },
})

function NetworkChip({ category }: NetworkChip) {
  return <Badge className={cn(networkCategoryVariants({ category }))}>{category}</Badge>
}

export { networkCategoryVariants, NetworkChip }
