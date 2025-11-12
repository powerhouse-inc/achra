import React from 'react'
import { FINANCES_NAVIGATION_CARDS } from '../../mocks/group'
import { CardsNavigationSwipper } from './cards-navigation-swipper'

export function NavigationSection() {
  return <CardsNavigationSwipper cardsNavigationInformation={FINANCES_NAVIGATION_CARDS} />
}
