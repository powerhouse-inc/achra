import {
  RsBillingCycle,
  RsDiscountType,
  RsGroupCostType,
  type RsServiceOffering,
  RsServiceStatus,
  RsTierPricingMode,
} from '@/modules/__generated__/graphql/switchboard-generated'

export const SERVICES_DATA: RsServiceOffering[] = [
  {
    id: '90ad5b5f-530f-4d86-8436-4b595a81974c',
    description: 'A turnkey legal and operational setup for open-source builder teams.',
    infoLink: null,
    lastModified: '2026-02-23T13:05:26.472Z',
    operatorId: '0bc59a22-f7d0-4747-9a37-25faaab4ae39',
    resourceTemplateId: 'c6aacdfe-b182-4ec5-8a4c-dbf9f21708f8',
    status: RsServiceStatus.Active,
    summary: 'Operational Hub for Builders',
    title: 'Operational Hub',
    thumbnailUrl: null,
    availableBillingCycles: [RsBillingCycle.Monthly, RsBillingCycle.Annual, RsBillingCycle.OneTime],

    // ─── FACET TARGETS (Selectores Superiores) ────────────────────────────────
    facetTargets: [
      {
        id: '1c8ed68b-b9c8-4779-92ce-5b29de5bd441',
        categoryKey: 'sno-function',
        categoryLabel: 'SNO Function',
        selectedOptions: ['Operational Hub for Open Source Builders', 'Operational Hub'],
      },
      {
        id: '9aa48353-0110-4cc7-b57c-55cdc83ee8cc',
        categoryKey: 'legal-entity',
        categoryLabel: 'Legal Entity',
        selectedOptions: ['Swiss Association', 'BVI Entity'],
      },
      {
        id: 'f9a400e8-af4a-478e-8bc3-ae33ddff2f26',
        categoryKey: 'team',
        categoryLabel: 'Team',
        selectedOptions: ['Remote', 'Local'],
      },
      {
        id: '88ded452-4246-4efb-8f94-e967d6db521d',
        categoryKey: 'anonymity',
        categoryLabel: 'Anonymity',
        selectedOptions: ['Highest', 'High'],
      },
    ],

    // ─── TIERS (Planes) ───────────────────────────────────────────────────────
    tiers: [
      {
        id: '43f85011-9702-4aa9-b118-e256c88504c2',
        name: 'Basic',
        description: 'Essential entity setup for small teams',
        mostPopular: false,
        isCustomPricing: false,
        pricingMode: RsTierPricingMode.Calculated,
        pricing: { amount: 99, currency: 'USD' },
        billingCycleDiscounts: [],
        serviceLevels: [],
        usageLimits: [
          {
            id: 'ul-1',
            serviceId: 'b252bc16-b913-4c46-9198-800eeecafb7b',
            metric: 'Number of Addresses',
            unitName: 'Registered Zug Address',
            freeLimit: 1,
            paidLimit: 2,
            resetCycle: null,
            unitPrice: 500,
            unitPriceCurrency: 'USD',
            notes: null,
          },
        ],
      },
      {
        id: '0c6ef639-e1ef-4dfb-8090-496c6c70326d',
        name: 'Professional',
        description: 'Full operations suite',
        mostPopular: true,
        isCustomPricing: false,
        pricingMode: RsTierPricingMode.Calculated,

        pricing: { amount: 299, currency: 'USD' },

        billingCycleDiscounts: [],
        serviceLevels: [],
        usageLimits: [],
      },
      {
        id: 'c4181acc-d4f6-41a2-8b41-d4b7df7b6297',
        name: 'Enterprise',
        description: 'Custom pricing for enterprises',
        mostPopular: false,
        isCustomPricing: true,
        pricingMode: RsTierPricingMode.ManualOverride,
        pricing: { amount: null, currency: 'USD' },
        billingCycleDiscounts: [],
        serviceLevels: [],
        usageLimits: [],
      },
    ],

    // ─── SERVICES (Filas con Facet Bindings Inyectados) ────────────────────────
    services: [
      {
        id: 'b252bc16-b913-4c46-9198-800eeecafb7b',
        title: 'Registered address (Zug)',
        description: 'Official registered address in Zug, Switzerland',
        isSetupFormation: true,
        optionGroupId: 'a5489308-faa1-460e-b2dd-de8e77fd24cb',
        // MOCK BINDING: Solo visible si eliges Swiss Association
      },
      {
        id: 'c9c625ef-127b-423e-9397-8465e7970d1e',
        title: 'Swiss association entity',
        description: 'Legal entity formation as a Swiss association',
        isSetupFormation: true,
        optionGroupId: 'a5489308-faa1-460e-b2dd-de8e77fd24cb',
        // MOCK BINDING: Solo visible si eliges Swiss Association
      },
      {
        id: 'ecc6737f-2425-43cc-bc33-88fde759f9e7',
        title: 'Legal document templates',
        description: 'Access to standardized legal document templates',
        isSetupFormation: true,
        optionGroupId: 'a5489308-faa1-460e-b2dd-de8e77fd24cb',
      },
      {
        id: '177f1398-10c4-422e-84e6-b8d0e956a854',
        title: 'Invoice management',
        description: 'Professional invoice processing and management',
        isSetupFormation: false,
        optionGroupId: '8e865e7d-57b1-4e13-a9ce-f4e7fec420db',
      },
      {
        id: 'b860dfbb-b496-4f69-bcd8-6a093bd58ad9',
        title: 'Annual tax filing',
        description: 'Yearly tax preparation and filing services',
        isSetupFormation: false,
        optionGroupId: '8e865e7d-57b1-4e13-a9ce-f4e7fec420db',
      },
      {
        id: '1915724c-bfcb-4fc3-b444-eff7228fdd24',
        title: 'Monthly accounting & close',
        description: 'Monthly bookkeeping and financial close',
        isSetupFormation: false,
        optionGroupId: '8e865e7d-57b1-4e13-a9ce-f4e7fec420db',
      },
      {
        id: 'a5c8215f-1934-4f83-854b-2e32bfba5304',
        title: 'Dedicated ops support',
        description: 'Dedicated operations support team',
        isSetupFormation: false,
        optionGroupId: 'b1254371-0838-4a83-b00c-2c834b79b994',
      },
      {
        id: '6cfca588-84c5-491b-8543-9a8ba8ba49f9',
        title: 'Contributor operations',
        description: 'Management of contributor payments and operations',
        isSetupFormation: false,
        optionGroupId: 'b1254371-0838-4a83-b00c-2c834b79b994',
      },
      {
        id: 'e669fc53-1651-4de6-9740-3385ebdf26c5',
        title: 'Multi-currency payouts',
        description: 'Support for payments in multiple currencies',
        isSetupFormation: false,
        optionGroupId: 'b1254371-0838-4a83-b00c-2c834b79b994',
      },
      {
        id: '547a20b0-2827-40c9-b81f-4f4ac6128850',
        title: 'Dedicated account manager',
        description: 'Personal point of contact for all needs',
        isSetupFormation: false,
        optionGroupId: '0d55f6e9-e6eb-4989-ac59-b5b079f32fc5',
      },
      {
        id: '613ae133-ccf3-4bf6-9fe5-a8d9e195cb5a',
        title: 'Multiple entities',
        description: 'Support for managing multiple legal entities',
        isSetupFormation: false,
        optionGroupId: 'ca203f41-f735-42fa-a659-cc2448782aa4',
      },
      {
        id: '2465c3de-c6d9-449f-9f2b-78bf45bb8546',
        title: 'testing-facetBindings',
        description: 'Testing facet logic',
        isSetupFormation: false,
        optionGroupId: 'e44ae821-4392-420b-a436-bdfa02a926e6',
      },
    ],

    // ─── OPTION GROUPS (Secciones de Cobro) ───────────────────────────────────
    optionGroups: [
      {
        id: 'a5489308-faa1-460e-b2dd-de8e77fd24cb',
        name: 'Legal',
        isAddOn: false,
        defaultSelected: true,
        costType: RsGroupCostType.Setup,
        price: 5000,
        currency: 'USD',
        availableBillingCycles: [RsBillingCycle.OneTime],
        billingCycleDiscounts: [],
        tierDependentPricing: [
          {
            id: 'tp-1',
            tierId: '43f85011-9702-4aa9-b118-e256c88504c2', // Basic
            setupCost: { amount: 5000, currency: 'USD', discount: null },
            setupCostDiscounts: [
              {
                billingCycle: RsBillingCycle.Annual,
                discountRule: { discountType: RsDiscountType.FlatAmount, discountValue: 1000 },
              },
            ],
            recurringPricing: [],
          },
        ],
      },
      {
        id: '8e865e7d-57b1-4e13-a9ce-f4e7fec420db',
        name: 'Operational',
        isAddOn: false,
        defaultSelected: true,
        costType: RsGroupCostType.Recurring,
        price: null,
        billingCycleDiscounts: [],
        tierDependentPricing: [
          {
            id: 'tp-2',
            tierId: '43f85011-9702-4aa9-b118-e256c88504c2',
            recurringPricing: [
              {
                id: 'rp-1',
                billingCycle: RsBillingCycle.Monthly,
                amount: 45,
                currency: 'USD',
                discount: null,
              },
              {
                id: 'rp-1-annual',
                billingCycle: RsBillingCycle.Annual,
                amount: 45,
                currency: 'USD',
                discount: { discountType: RsDiscountType.Percentage, discountValue: 15 },
              },
            ],
            setupCost: null,
            setupCostDiscounts: [],
          },
          {
            id: 'tp-2-pro',
            tierId: '0c6ef639-e1ef-4dfb-8090-496c6c70326d',
            recurringPricing: [
              {
                id: 'rp-1-pro-monthly',
                billingCycle: RsBillingCycle.Monthly,
                amount: 65,
                currency: 'USD',
                discount: null,
              },
              {
                id: 'rp-1-pro-annual',
                billingCycle: RsBillingCycle.Annual,
                amount: 65,
                currency: 'USD',
                discount: { discountType: RsDiscountType.Percentage, discountValue: 20 },
              },
            ],
            setupCost: null,
            setupCostDiscounts: [],
          },
        ],
        availableBillingCycles: [RsBillingCycle.Monthly, RsBillingCycle.Annual],
      },
      {
        id: 'b1254371-0838-4a83-b00c-2c834b79b994',
        name: 'Core',
        isAddOn: false,
        defaultSelected: true,
        costType: RsGroupCostType.Recurring,
        price: null,
        billingCycleDiscounts: [],
        tierDependentPricing: [
          {
            id: 'tp-3',
            tierId: '43f85011-9702-4aa9-b118-e256c88504c2',
            recurringPricing: [
              {
                id: 'rp-2',
                billingCycle: RsBillingCycle.Monthly,
                amount: 54,
                currency: 'USD',
                discount: null,
              },
            ],
            setupCost: null,
            setupCostDiscounts: [],
          },
        ],
        availableBillingCycles: [RsBillingCycle.Monthly, RsBillingCycle.Annual],
      },
      {
        id: '0d55f6e9-e6eb-4989-ac59-b5b079f32fc5',
        name: 'Option A',
        isAddOn: true,
        defaultSelected: false,
        costType: RsGroupCostType.Recurring,
        billingCycleDiscounts: [],
        standalonePricing: {
          setupCost: { amount: 100, currency: 'USD', discount: null },
          recurringPricing: [
            {
              id: 'sp-1',
              billingCycle: RsBillingCycle.Monthly,
              amount: 200,
              currency: 'USD',
              discount: null,
            },
            {
              id: 'sp-2',
              billingCycle: RsBillingCycle.Annual,
              amount: 200,
              currency: 'USD',
              discount: { discountType: RsDiscountType.Percentage, discountValue: 10 },
            },
          ],
        },
        availableBillingCycles: [RsBillingCycle.Monthly, RsBillingCycle.Annual],

        tierDependentPricing: [],
      },
      {
        id: 'ca203f41-f735-42fa-a659-cc2448782aa4',
        name: 'Option B',
        isAddOn: true,
        defaultSelected: false,
        costType: RsGroupCostType.Recurring,
        billingCycleDiscounts: [],
        standalonePricing: {
          setupCost: { amount: 500, currency: 'USD', discount: null },
          recurringPricing: [
            {
              id: 'sp-3',
              billingCycle: RsBillingCycle.Monthly,
              amount: 100,
              currency: 'USD',
              discount: null,
            },
          ],
        },
        availableBillingCycles: [RsBillingCycle.Monthly, RsBillingCycle.Annual],

        tierDependentPricing: [],
      },
      {
        id: 'e44ae821-4392-420b-a436-bdfa02a926e6',
        name: 'facetBindings',
        isAddOn: true,
        defaultSelected: false,
        costType: RsGroupCostType.Recurring,
        price: 200,
        currency: 'USD',
        availableBillingCycles: [RsBillingCycle.OneTime],
        billingCycleDiscounts: [],

        tierDependentPricing: [],
      },
    ],
  },
]
