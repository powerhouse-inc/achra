import { getNetworkBySlug } from '@/modules/networks/services/networks-service'
import { getBreadcrumbItems } from '../../utils'
import { BreadcrumbSelectYear } from './breadcrumb-select-year'

interface FinancesBreadcrumbProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
}

export async function FinancesBreadcrumb({ params }: FinancesBreadcrumbProps) {
  const { slug, financeSlug } = await params
  const network = await getNetworkBySlug(slug)
  const items = getBreadcrumbItems(slug, financeSlug, network?.name ?? undefined)

  return <BreadcrumbSelectYear items={items} />
}
