import { getTitleComponentData } from '../../utils'
import { TitleComponent } from './title-component'

interface FinancesPageProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
}

export async function TitleComponentWrapper({ params }: FinancesPageProps) {
  const { slug, financeSlug } = await params
  const titleData = getTitleComponentData(slug, financeSlug)

  return (
    <TitleComponent
      title={titleData.title}
      description={titleData.description}
      icon={titleData.icon}
      code={titleData.code}
      levelNumber={titleData.levelNumber}
    />
  )
}
