import { getCardsNavigationData } from '../../utils'
import { CardsNavigationSwipper } from './cards-navigation-swipper'

interface NavigationSectionProps {
  params: Promise<{
    slug: string
    financeSlug?: string[]
  }>
}

export async function NavigationSection({ params }: NavigationSectionProps) {
  const { slug, financeSlug } = await params
  const cardsNavigation = getCardsNavigationData(slug, financeSlug)

  return <CardsNavigationSwipper cardsNavigationInformation={cardsNavigation} />
}
