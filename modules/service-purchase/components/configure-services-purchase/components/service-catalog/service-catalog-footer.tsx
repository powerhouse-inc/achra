'use client'

import PricingCatalogSubtotal from '../pricing-catalog-subtotal/pricing-catalog-subtotal'
import { useServiceCatalogContext } from './service-catalog-root'
import type { ServiceSectionCatalog } from '../types'

export interface ServiceCatalogFooterProps {
  section: ServiceSectionCatalog
}

function ServiceCatalogFooter({ section }: Readonly<ServiceCatalogFooterProps>) {
  const { activePlan } = useServiceCatalogContext()

  return <PricingCatalogSubtotal section={section} activePlan={activePlan} />
}
export { ServiceCatalogFooter }
