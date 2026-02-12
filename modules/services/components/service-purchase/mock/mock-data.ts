import {
  CatalogStatus,
  Plan,
  type PricingData,
} from '../components/configure-services-purchase/components/types'

export const SERVICES_DATA: PricingData = {
  facetTargets: [
    {
      id: 'b634af4b-f6eb-4591-957b-fa64316434d4',
      categoryKey: 'anonymity',
      categoryLabel: 'Anonymity',
      selectedOptions: ['High'],
    },
    {
      id: '64550601-0d87-4160-b9fe-5f50ec98e440',
      categoryKey: 'legal-entity',
      categoryLabel: 'Legal Entity',
      selectedOptions: ['Swiss Association'],
    },
    {
      id: '6f7b8b0c-7f8a-4fa5-b288-f2b076de47ce',
      categoryKey: 'team',
      categoryLabel: 'Team',
      selectedOptions: ['Remote'],
    },
    {
      id: 'fbddf8ba-bc6e-47a0-8947-84f9b6a944cb',
      categoryKey: 'sno-function',
      categoryLabel: 'SNO Function',
      selectedOptions: ['Operational Hub for Open Source Builders'],
    },
  ],
  tiers: [
    { id: Plan.Basic, name: 'Basic', price: '$200/mo', monthlyPrice: 200, setupFee: 3000 },
    {
      id: Plan.Team,
      name: 'Team',
      price: '$300/mo',
      isPopular: true,
      monthlyPrice: 300,
      setupFee: 3000,
    },
    { id: Plan.Premium, name: 'Premium', price: '$500/mo', monthlyPrice: 500, setupFee: 3000 },
    { id: Plan.Enterprise, name: 'Enterprise', price: 'Custom', monthlyPrice: 0, setupFee: 3000 },
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
          showApproxSymbol: true,
          values: {
            [Plan.Basic]: true,
            [Plan.Team]: true,
            [Plan.Premium]: true,
            [Plan.Enterprise]: true,
          },
        },
        {
          id: 'incorporation-docs',
          label: 'Incorporation Docs',
          sublabel: 'Swiss Association',
          sublabelVariant: 'badge',
          hasOneTimeFee: true,
          values: {
            [Plan.Basic]: true,
            [Plan.Team]: true,
            [Plan.Premium]: 'EXPEDITED',
            [Plan.Enterprise]: 'CUSTOM',
          },
        },
      ],
      subtotal: {
        label: 'TOTAL SETUP FEE',
        values: {
          [Plan.Basic]: '',
          [Plan.Team]: '',
          [Plan.Premium]: '',
          [Plan.Enterprise]: '$3000 flat fee (applied to all tiers)',
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
            [Plan.Basic]: 'Up to 3',
            [Plan.Team]: 'Up to 6',
            [Plan.Premium]: 'Up to 10',
            [Plan.Enterprise]: '> 10',
          },
        },
        {
          id: 'tax-administration',
          label: 'Tax Administration',
          values: {
            [Plan.Basic]: true,
            [Plan.Team]: true,
            [Plan.Premium]: true,
            [Plan.Enterprise]: true,
          },
        },
        {
          id: 'dedicated-account-manager',
          label: 'Dedicated Account Manager',
          values: {
            [Plan.Basic]: false,
            [Plan.Team]: false,
            [Plan.Premium]: true,
            [Plan.Enterprise]: 'PRIORITY',
          },
        },
      ],
      subtotal: {
        label: 'SUBTOTAL',
        values: {
          [Plan.Basic]: '$200',
          [Plan.Team]: '$300',
          [Plan.Premium]: '$500',
          [Plan.Enterprise]: 'CUSTOM',
        },
      },
    },
    {
      id: 'finance-pack',
      title: 'Finance Pack',
      hasToggle: true,
      toggleLabel: 'Finance Pack',
      oneTimeFee: '+ $50/mo',
      price: 50,
      oneTimeFeeVariant: 'primary',
      badge: CatalogStatus.Optional,
      rows: [
        {
          id: 'bank-account-setup',
          label: 'Bank Account Setup',
          sublabel: 'Swiss Association',
          sublabelVariant: 'badge',
          showApproxSymbol: true,
          values: {
            [Plan.Basic]: 'LABEL',
            [Plan.Team]: true,
            [Plan.Premium]: 'PRIORITY',
            [Plan.Enterprise]: 'CUSTOM',
          },
        },
        {
          id: 'crypto-payment',
          label: 'Crypto Payment',
          values: {
            [Plan.Basic]: false,
            [Plan.Team]: '3 Accounts',
            [Plan.Premium]: true,
            [Plan.Enterprise]: true,
          },
        },
      ],
      subtotal: {
        label: 'SUBTOTAL',
        values: {
          [Plan.Basic]: '$50',
          [Plan.Team]: '$50',
          [Plan.Premium]: '$50',
          [Plan.Enterprise]: '$50',
        },
      },
    },
    {
      id: 'hosting-suite',
      oneTimeFee: '+ $200/mo',
      price: 200,
      title: 'Hosting Suite',
      hasToggle: true,
      toggleLabel: 'Hosting Suite',
      oneTimeFeeVariant: 'primary',
      badge: CatalogStatus.Optional,
      rows: [
        {
          id: 'secure-email',
          label: 'Secure Email',
          values: {
            [Plan.Basic]: '3 Accounts',
            [Plan.Team]: '10 Accounts',
            [Plan.Premium]: 'Unlimited',
            [Plan.Enterprise]: 'Unlimited',
          },
        },
        {
          id: 'web-hosting',
          label: 'Web Hosting',
          values: {
            [Plan.Basic]: 'Basic',
            [Plan.Team]: 'Pro',
            [Plan.Premium]: 'Enterprise',
            [Plan.Enterprise]: 'Enterprise',
          },
        },
      ],
      subtotal: {
        label: 'SUBTOTAL',
        values: {
          [Plan.Basic]: '$200',
          [Plan.Team]: '$200',
          [Plan.Premium]: '$200',
          [Plan.Enterprise]: '$200',
        },
      },
    },
  ],
  grandTotal: {
    label: 'Grand Total (Recurring)',
    values: {
      [Plan.Basic]: '$200/mo',
      [Plan.Team]: '$300/mo',
      [Plan.Premium]: '$500/mo',
      [Plan.Enterprise]: 'Custom',
    },
  },
}
