import { CatalogStatus, type PricingData } from '../types'

export const PRICING_DATA: PricingData = {
  tiers: [
    { id: 'basic', name: 'Basic', price: '$200/mo' },
    { id: 'team', name: 'Team', price: '$300/mo', isPopular: true },
    { id: 'premium', name: 'Premium', price: '$500/mo' },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom' },
  ],
  sections: [
    {
      id: 'legal-setup',
      title: 'Legal Setup',
      badge: CatalogStatus.Included,
      oneTimeFee: 'One-time: $3000',
      rows: [
        {
          id: 'needs-analysis',
          label: 'Needs Analysis',
          values: {
            basic: true,
            team: true,
            premium: true,
            enterprise: true,
          },
        },
        {
          id: 'incorporation-docs',
          label: 'Incorporation Docs',
          sublabel: 'Swiss Association',
          values: {
            basic: true,
            team: true,
            premium: 'EXPEDITED',
            enterprise: 'CUSTOM',
          },
        },
      ],
      subtotal: {
        label: 'TOTAL SETUP FEE',
        values: {
          basic: '',
          team: '',
          premium: '',
          enterprise: '$3000 flat fee (applied to all tiers)',
        },
      },
    },
  ],
}
