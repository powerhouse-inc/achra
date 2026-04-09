import { SummarySection } from './summary-section'
interface SummarySectionProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
}

export async function SummarySectionWrapper({ params }: SummarySectionProps) {
  const { financeSlug } = await params

  return <SummarySection financeSlug={financeSlug} />
}
