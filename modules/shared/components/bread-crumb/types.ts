import type { Route } from 'next'

export interface BreadcrumbItemNavigation {
  label: string
  href: Route
  number?: number
}

export interface DotsSegmentProps {
  items: BreadcrumbItemNavigation[]
  defaultOpen?: boolean
}

export interface BreadcrumbItemExtended extends BreadcrumbItemNavigation {
  labelWidth: number
  recommendedWidth: number
  attachedItems?: BreadcrumbItemNavigation[]
}

export interface BreadcrumbItemProps {
  items: BreadcrumbItemNavigation[]
  withMenusOpened?: boolean
  maxSegmentWidthMobile?: number
  className?: string
}
