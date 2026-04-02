import { RsTemplateStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { getServicePurchaseUrl } from '@/modules/service-purchase/lib/get-service-purchase-url'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { cn } from '@/modules/shared/lib/utils'

interface PurchaseButtonProps {
  serviceId: string
  operatorId?: string | null
  status?: RsTemplateStatus
}

function PurchaseButton({ serviceId, operatorId, status }: Readonly<PurchaseButtonProps>) {
  const isUnavailable = status === RsTemplateStatus.ComingSoon

  return (
    <InternalLink
      href={getServicePurchaseUrl(serviceId, { operatorId })}
      disabled={isUnavailable}
      className={cn(isUnavailable && 'pointer-events-none opacity-50')}
      size="lg"
      variant="default"
    >
      Request a Quote
    </InternalLink>
  )
}

export { PurchaseButton }
