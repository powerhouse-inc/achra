import { encodeSectionId } from '@/modules/shared/components/section-activation'
import { NetworkHomepageSections } from '@/modules/shared/lib/constants'
import ff from '@/modules/shared/lib/feature-flags'

// Card stacked area chart constants

export enum TABS {
  REALIZED_EXPENSES = 'Realized Expenses',
  OPERATIONAL_RESERVES = 'Operational Reserves',
  FORECAST = 'Forecast',
}

export const TABS_CONFIG = [
  {
    id: TABS.REALIZED_EXPENSES,
    longName: 'Realized Expenses',
    shortName: 'Realized Exp.',
    className: 'rounded-tl-lg sm:rounded-none',
  },
  {
    id: TABS.OPERATIONAL_RESERVES,
    longName: 'Operational Reserves',
    shortName: 'Op. Reserves',
  },
  {
    id: TABS.FORECAST,
    longName: 'Forecast',
    shortName: 'Forecast',
    className: 'rounded-tr-lg sm:rounded-none',
  },
]

export enum REALIZED_EXPENSES_FILTER {
  ACTUALS = 'Actuals',
  PAYMENTS = 'Payments',
}

// Proposals swiper constants

export const PROPOSALS_SWIPER_BREAKPOINTS = {
  640: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 0,
  },
  768: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 0,
  },
  1024: {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 0,
  },
  1280: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 0,
  },
}

// Wallets table constants

export interface WalletsTableColumn {
  header: string
  shortHeader?: string
  accessorKey: string
  hasSort: boolean
  sortReverse: boolean
  isNumeric: boolean
}

export const WALLETS_TABLE_COLUMNS: WalletsTableColumn[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Address',
    accessorKey: 'address',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Balance (USDS)',
    shortHeader: '(USDS)',
    accessorKey: 'usdsBalance',
    hasSort: true,
    sortReverse: false,
    isNumeric: true,
  },
  {
    header: 'Balance (SKY)',
    shortHeader: '(SKY)',
    accessorKey: 'skyBalance',
    hasSort: true,
    sortReverse: false,
    isNumeric: true,
  },
]

// Network homepage constants

/**
 * Storage key for the homepage banner expanded state
 */
export const HOME_BANNER_EXPANDED_STORAGE_KEY = 'home-banner-expanded'

/**
 * Network homepage sections IDs
 */
export const NETWORK_HOMEPAGE_SECTIONS = [
  NetworkHomepageSections.Proposals,
  ...(ff.ROADMAPS_ENABLED ? [NetworkHomepageSections.Roadmap] : []),
  NetworkHomepageSections.Finances,
  NetworkHomepageSections.Wallets,
  NetworkHomepageSections.Builders,
  NetworkHomepageSections.Governance,
]

/**
 * Network homepage sections IDs encoded
 */
export const NETWORK_HOMEPAGE_SECTIONS_ENCODED = NETWORK_HOMEPAGE_SECTIONS.map((section) =>
  encodeSectionId(section),
)

/**
 * Network homepage skip section
 */
export const NETWORK_HOMEPAGE_SKIP_SECTION = NetworkHomepageSections.Proposals
