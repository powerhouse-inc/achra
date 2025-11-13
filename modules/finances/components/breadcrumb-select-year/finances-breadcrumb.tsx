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
  const items = getBreadcrumbItems(slug, financeSlug)

  return <BreadcrumbSelectYear items={items} />
}
