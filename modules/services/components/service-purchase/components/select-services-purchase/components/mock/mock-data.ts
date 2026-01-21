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
    {
      id: 'recurring-operational',
      title: 'Recurring Operational Service',
      badge: CatalogStatus.Included,
      rows: [
        {
          id: 'contributor-contracting',
          label: 'Contributor Contracting',
          values: {
            basic: 'Up to 3',
            team: 'Up to 6',
            premium: 'Up to 10',
            enterprise: '> 10',
          },
        },
        {
          id: 'tax-administration',
          label: 'Tax Administration',
          values: {
            basic: true,
            team: true,
            premium: true,
            enterprise: true,
          },
        },
        {
          id: 'dedicated-account-manager',
          label: 'Dedicated Account Manager',
          values: {
            basic: false,
            team: false,
            premium: true,
            enterprise: 'PRIORITY',
          },
        },
      ],
      subtotal: {
        label: 'SUBTOTAL',
        values: {
          basic: '$200',
          team: '$300',
          premium: '$500',
          enterprise: 'CUSTOM',
        },
      },
    },
    {
      id: 'finance-pack',
      title: 'Finance Pack',
      hasToggle: true,
      toggleLabel: 'Finance Pack',
      oneTimeFee: '+ $50/mo',
      oneTimeFeeVariant: 'primary',
      rows: [
        {
          id: 'bank-account-setup',
          label: 'Bank Account Setup',
          sublabel: 'Swiss Association',
          values: {
            basic: CatalogStatus.Optional,
            team: true,
            premium: 'PRIORITY',
            enterprise: 'CUSTOM',
          },
        },
        {
          id: 'crypto-payment',
          label: 'Crypto Payment',
          values: {
            basic: false,
            team: '3 Accounts',
            premium: true,
            enterprise: true,
          },
        },
      ],
      subtotal: {
        label: 'SUBTOTAL',
        values: {
          basic: '$50',
          team: '$50',
          premium: '$50',
          enterprise: '$50',
        },
      },
    },
    {
      id: 'hosting-suite',
      oneTimeFee: '+ $200/mo',
      title: 'Hosting Suite',
      hasToggle: true,
      toggleLabel: 'Hosting Suite',
      oneTimeFeeVariant: 'primary',
      rows: [
        {
          id: 'secure-email',
          label: 'Secure Email',
          values: {
            basic: '3 Accounts',
            team: '10 Accounts',
            premium: 'Unlimited',
            enterprise: 'Unlimited',
          },
        },
        {
          id: 'web-hosting',
          label: 'Web Hosting',
          values: {
            basic: 'Basic',
            team: 'Pro',
            premium: 'Enterprise',
            enterprise: 'Enterprise',
          },
        },
      ],
      subtotal: {
        label: 'SUBTOTAL',
        values: {
          basic: '$0',
          team: '$0',
          premium: '$0',
          enterprise: '$0',
        },
      },
    },
  ],
  grandTotal: {
    label: 'Grand Total (Recurring)',
    values: {
      basic: '$200/mo',
      team: '$300/mo',
      premium: '$550/mo',
      enterprise: '$50/mo',
    },
  },
}
