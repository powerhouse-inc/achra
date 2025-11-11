import { Breadcrumb } from '@/modules/shared/components/breadcrumb'
import type { Route } from 'next'

interface FinancesBreadcrumbProps {
  params: Promise<{ slug: string }>
}

export async function FinancesBreadcrumb({ params }: FinancesBreadcrumbProps) {
  const { slug } = await params

  const networkName = slug.charAt(0).toUpperCase() + slug.slice(1)
  const items = [
    { label: 'Networks', href: '/networks' as Route },
    { label: networkName, href: `network/${slug}` as Route },
  ]
  return <Breadcrumb items={items} className="w-full" />
}
