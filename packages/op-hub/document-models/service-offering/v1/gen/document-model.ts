import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  id: "powerhouse/service-offering",
  name: "ServiceOffering",
  author: {
    name: "Powerhouse",
    website: "https://www.powerhouse.inc/",
  },
  extension: "",
  description:
    "Defines a service offering with tiered pricing, service groups, option groups, and facet-based targeting.",
  specifications: [
    {
      state: {
        local: {
          schema: "",
          examples: [],
          initialValue: "",
        },
        global: {
          schema:
            "type ServiceOfferingState {\n    id: PHID\n    operatorId: PHID\n    resourceTemplateId: PHID\n    title: String!\n    summary: String!\n    description: String\n    thumbnailUrl: URL\n    infoLink: URL\n    status: ServiceStatus!\n    lastModified: DateTime\n    availableBillingCycles: [BillingCycle!]!\n    facetTargets: [FacetTarget!]!\n    services: [Service!]!\n    tiers: [ServiceSubscriptionTier!]!\n    optionGroups: [OptionGroup!]!\n}\n\nenum ServiceStatus {\n    DRAFT\n    COMING_SOON\n    ACTIVE\n    DEPRECATED\n}\n\ntype FacetTarget {\n    id: OID!\n    categoryKey: String!\n    categoryLabel: String!\n    selectedOptions: [String!]!\n}\n\ntype DiscountRule {\n    discountType: DiscountType!\n    discountValue: Float!\n}\n\nenum DiscountType {\n    PERCENTAGE\n    FLAT_AMOUNT\n}\n\ntype BillingCycleDiscount {\n    billingCycle: BillingCycle!\n    discountRule: DiscountRule!\n}\n\ntype SetupCost {\n    amount: Amount_Money!\n    currency: Currency!\n    discount: DiscountRule\n}\n\ntype RecurringPriceOption {\n    id: OID!\n    billingCycle: BillingCycle!\n    amount: Amount_Money!\n    currency: Currency!\n    discount: DiscountRule\n}\n\ntype Service {\n    id: OID!\n    title: String!\n    description: String\n    displayOrder: Int\n    isSetupFormation: Boolean!\n    optionGroupId: OID\n}\n\ntype ServiceSubscriptionTier {\n    id: OID!\n    name: String!\n    description: String\n    isCustomPricing: Boolean!\n    pricingMode: TierPricingMode\n    pricing: ServicePricing!\n    defaultBillingCycle: BillingCycle\n    mostPopular: Boolean!\n    billingCycleDiscounts: [BillingCycleDiscount!]!\n    serviceLevels: [ServiceLevelBinding!]!\n    usageLimits: [ServiceUsageLimit!]!\n    excludeFromSetupFee: Boolean!\n}\n\ntype ServicePricing {\n    amount: Amount_Money\n    currency: Currency!\n}\n\nenum BillingCycle {\n    MONTHLY\n    QUARTERLY\n    SEMI_ANNUAL\n    ANNUAL\n    ONE_TIME\n}\n\ntype ServiceLevelBinding {\n    id: OID!\n    serviceId: OID!\n    level: ServiceLevel!\n    customValue: String\n    optionGroupId: OID\n}\n\nenum ServiceLevel {\n    INCLUDED\n    NOT_INCLUDED\n    OPTIONAL\n    CUSTOM\n    VARIABLE\n    NOT_APPLICABLE\n}\n\ntype ServiceUsageLimit {\n    id: OID!\n    serviceId: OID!\n    metric: String!\n    unitName: String\n    freeLimit: Int\n    paidLimit: Int\n    metricType: MetricType!\n    accrualCycle: AccrualCycle!\n    notes: String\n    unitPrice: Amount_Money\n    unitPriceCurrency: Currency\n}\n\nenum AccrualCycle {\n    HOURLY\n    DAILY\n    WEEKLY\n    MONTHLY\n    QUARTERLY\n    SEMI_ANNUAL\n    ANNUAL\n}\n\nenum MetricType {\n    CUMULATIVE\n    NON_CUMULATIVE\n}\n\ntype OptionGroup {\n    id: OID!\n    name: String!\n    description: String\n    isAddOn: Boolean!\n    defaultSelected: Boolean!\n    pricingMode: AddOnPricingMode\n    standalonePricing: StandalonePricing\n    tierDependentPricing: [OptionGroupTierPricing!]\n    costType: GroupCostType\n    availableBillingCycles: [BillingCycle!]!\n    billingCycleDiscounts: [BillingCycleDiscount!]!\n    discountMode: DiscountMode\n    price: Amount_Money\n    currency: Currency\n}\n\nenum AddOnPricingMode {\n    TIER_DEPENDENT\n    STANDALONE\n}\n\nenum DiscountMode {\n    INHERIT_TIER\n    INDEPENDENT\n}\n\nenum TierPricingMode {\n    CALCULATED\n    MANUAL_OVERRIDE\n}\n\ntype StandalonePricing {\n    setupCost: SetupCost\n    recurringPricing: [RecurringPriceOption!]!\n}\n\ntype OptionGroupTierPricing {\n    id: OID!\n    tierId: OID!\n    setupCost: SetupCost\n    setupCostDiscounts: [BillingCycleDiscount!]!\n    recurringPricing: [RecurringPriceOption!]!\n}\n\nenum GroupCostType {\n    RECURRING\n    SETUP\n}",
          examples: [],
          initialValue:
            '{\n  "id": null,\n  "operatorId": null,\n  "resourceTemplateId": null,\n  "title": "",\n  "summary": "",\n  "description": null,\n  "thumbnailUrl": null,\n  "infoLink": null,\n  "status": "DRAFT",\n  "lastModified": null,\n  "availableBillingCycles": [],\n  "facetTargets": [],\n  "services": [],\n  "tiers": [],\n  "optionGroups": []\n}',
        },
      },
      modules: [
        {
          id: "mod-offering",
          name: "offering",
          description:
            "Offering-level metadata, status, target audiences, facet targets, and resource templates",
          operations: [
            {
              id: "op-update-offering-info",
              name: "UPDATE_OFFERING_INFO",
              description: "Update offering title, summary, description, URLs",
              schema:
                "input UpdateOfferingInfoInput {\n    title: String\n    summary: String\n    description: String\n    thumbnailUrl: URL\n    infoLink: URL\n    lastModified: DateTime!\n}",
              template: "Update offering title, summary, description, URLs",
              reducer:
                "if (action.input.title) state.title = action.input.title;\nif (action.input.summary) state.summary = action.input.summary;\nif (action.input.description !== undefined) state.description = action.input.description || null;\nif (action.input.thumbnailUrl !== undefined) state.thumbnailUrl = action.input.thumbnailUrl || null;\nif (action.input.infoLink !== undefined) state.infoLink = action.input.infoLink || null;\nstate.lastModified = action.input.lastModified;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-offering-status",
              name: "UPDATE_OFFERING_STATUS",
              description: "Change offering status",
              schema:
                "input UpdateOfferingStatusInput {\n    status: ServiceStatus!\n    lastModified: DateTime!\n}",
              template: "Change offering status",
              reducer:
                "state.status = action.input.status;\nstate.lastModified = action.input.lastModified;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-operator",
              name: "SET_OPERATOR",
              description: "Set operator ID",
              schema:
                "input SetOperatorInput {\n    operatorId: PHID!\n    lastModified: DateTime!\n}",
              template: "Set operator ID",
              reducer:
                "state.operatorId = action.input.operatorId;\nstate.lastModified = action.input.lastModified;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-offering-id",
              name: "SET_OFFERING_ID",
              description: "Set offering ID",
              schema:
                "input SetOfferingIdInput {\n    id: PHID!\n    lastModified: DateTime!\n}",
              template: "Set offering ID",
              reducer:
                "state.id = action.input.id;\nstate.lastModified = action.input.lastModified;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-facet-target",
              name: "SET_FACET_TARGET",
              description: "Set or upsert a facet target category",
              schema:
                "input SetFacetTargetInput {\n    id: OID!\n    categoryKey: String!\n    categoryLabel: String!\n    selectedOptions: [String!]!\n    lastModified: DateTime!\n}",
              template: "Set or upsert a facet target category",
              reducer:
                "const existingIndex = state.facetTargets.findIndex(ft => ft.categoryKey === action.input.categoryKey);\nconst facetTarget = {\n    id: action.input.id,\n    categoryKey: action.input.categoryKey,\n    categoryLabel: action.input.categoryLabel,\n    selectedOptions: action.input.selectedOptions,\n};\nif (existingIndex !== -1) {\n    state.facetTargets[existingIndex] = facetTarget;\n} else {\n    state.facetTargets.push(facetTarget);\n}\nstate.lastModified = action.input.lastModified;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-facet-target",
              name: "REMOVE_FACET_TARGET",
              description: "Remove a facet target by category key",
              schema:
                "input RemoveFacetTargetInput {\n    categoryKey: String!\n    lastModified: DateTime!\n}",
              template: "Remove a facet target by category key",
              reducer:
                "const index = state.facetTargets.findIndex(ft => ft.categoryKey === action.input.categoryKey);\nif (index === -1) {\n    throw new RemoveFacetTargetNotFoundError(`Facet target with category key ${action.input.categoryKey} not found`);\n}\nstate.facetTargets.splice(index, 1);\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-remove-ft-not-found",
                  name: "RemoveFacetTargetNotFoundError",
                  code: "FACET_TARGET_NOT_FOUND",
                  description: "Facet target with given category key not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-add-facet-option",
              name: "ADD_FACET_OPTION",
              description: "Add an option to an existing facet target",
              schema:
                "input AddFacetOptionInput {\n    categoryKey: String!\n    optionId: String!\n    lastModified: DateTime!\n}",
              template: "Add an option to an existing facet target",
              reducer:
                "const facetTarget = state.facetTargets.find(ft => ft.categoryKey === action.input.categoryKey);\nif (!facetTarget) {\n    throw new AddFacetOptionTargetNotFoundError(`Facet target with category key ${action.input.categoryKey} not found`);\n}\nfacetTarget.selectedOptions.push(action.input.optionId);\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-add-fo-target-not-found",
                  name: "AddFacetOptionTargetNotFoundError",
                  code: "FACET_TARGET_NOT_FOUND",
                  description: "Facet target with given category key not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-facet-option",
              name: "REMOVE_FACET_OPTION",
              description: "Remove an option from a facet target",
              schema:
                "input RemoveFacetOptionInput {\n    categoryKey: String!\n    optionId: String!\n    lastModified: DateTime!\n}",
              template: "Remove an option from a facet target",
              reducer:
                "const facetTarget = state.facetTargets.find(ft => ft.categoryKey === action.input.categoryKey);\nif (!facetTarget) {\n    throw new RemoveFacetOptionTargetNotFoundError(`Facet target with category key ${action.input.categoryKey} not found`);\n}\nconst optIndex = facetTarget.selectedOptions.indexOf(action.input.optionId);\nif (optIndex !== -1) {\n    facetTarget.selectedOptions.splice(optIndex, 1);\n}\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-remove-fo-target-not-found",
                  name: "RemoveFacetOptionTargetNotFoundError",
                  code: "FACET_TARGET_NOT_FOUND",
                  description: "Facet target with given category key not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-select-resource-template",
              name: "SELECT_RESOURCE_TEMPLATE",
              description: "Select a resource template",
              schema:
                "input SelectResourceTemplateInput {\n    resourceTemplateId: PHID!\n    lastModified: DateTime!\n}",
              template: "Select a resource template",
              reducer:
                "state.resourceTemplateId = action.input.resourceTemplateId;\nstate.lastModified = action.input.lastModified;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-change-resource-template",
              name: "CHANGE_RESOURCE_TEMPLATE",
              description: "Change the resource template",
              schema:
                "input ChangeResourceTemplateInput {\n    previousTemplateId: PHID!\n    newTemplateId: PHID!\n    lastModified: DateTime!\n}",
              template: "Change the resource template",
              reducer:
                "if (state.resourceTemplateId !== action.input.previousTemplateId) {\n    throw new ChangeResourceTemplateMismatchError(`Current template ${state.resourceTemplateId} does not match previous template ${action.input.previousTemplateId}`);\n}\nstate.resourceTemplateId = action.input.newTemplateId;\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-change-rt-mismatch",
                  name: "ChangeResourceTemplateMismatchError",
                  code: "TEMPLATE_MISMATCH",
                  description:
                    "The previous template ID does not match the current resource template",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-available-billing-cycles",
              name: "SET_AVAILABLE_BILLING_CYCLES",
              description: "Set the available billing cycles for the offering",
              schema:
                "input SetAvailableBillingCyclesInput {\n    billingCycles: [BillingCycle!]!\n    lastModified: DateTime!\n}",
              template: "Set the available billing cycles for the offering",
              reducer:
                'if (action.input.billingCycles.length === 0) {\n    throw new NoBillingCyclesSelectedError("At least one billing cycle must be selected");\n}\nstate.availableBillingCycles = action.input.billingCycles;\nstate.lastModified = action.input.lastModified;',
              errors: [
                {
                  id: "err-no-billing-cycles",
                  name: "NoBillingCyclesSelectedError",
                  code: "NO_BILLING_CYCLES_SELECTED",
                  description: "At least one billing cycle must be selected",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "mod-services",
          name: "services",
          description: "Service CRUD and facet bindings",
          operations: [
            {
              id: "op-add-service",
              name: "ADD_SERVICE",
              description: "Add a new service",
              schema:
                "input AddServiceInput {\n    id: OID!\n    title: String!\n    description: String\n    displayOrder: Int\n    isSetupFormation: Boolean\n    optionGroupId: OID\n    lastModified: DateTime!\n}",
              template: "Add a new service",
              reducer:
                "state.services.push({\n  id: action.input.id,\n  title: action.input.title,\n  description: action.input.description || null,\n  displayOrder: action.input.displayOrder || null,\n  isSetupFormation: action.input.isSetupFormation || false,\n  optionGroupId: action.input.optionGroupId || null,\n});\nstate.lastModified = action.input.lastModified;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-service",
              name: "UPDATE_SERVICE",
              description: "Update service fields",
              schema:
                "input UpdateServiceInput {\n    id: OID!\n    title: String\n    description: String\n    displayOrder: Int\n    isSetupFormation: Boolean\n    optionGroupId: OID\n    lastModified: DateTime!\n}",
              template: "Update service fields",
              reducer:
                "const service = state.services.find((s) => s.id === action.input.id);\nif (!service) {\n  throw new UpdateServiceNotFoundError(`Service with ID ${action.input.id} not found`);\n}\nif (action.input.title) service.title = action.input.title;\nif (action.input.description !== undefined) service.description = action.input.description || null;\nif (action.input.displayOrder !== undefined) service.displayOrder = action.input.displayOrder || null;\nif (action.input.isSetupFormation !== undefined && action.input.isSetupFormation !== null) service.isSetupFormation = action.input.isSetupFormation;\nif (action.input.optionGroupId !== undefined) service.optionGroupId = action.input.optionGroupId || null;\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-update-service-not-found",
                  name: "UpdateServiceNotFoundError",
                  code: "SERVICE_NOT_FOUND",
                  description: "Service with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-delete-service",
              name: "DELETE_SERVICE",
              description: "Delete a service",
              schema:
                "input DeleteServiceInput {\n    id: OID!\n    lastModified: DateTime!\n}",
              template: "Delete a service",
              reducer:
                "const index = state.services.findIndex(s => s.id === action.input.id);\nif (index === -1) {\n    throw new DeleteServiceNotFoundError(`Service with ID ${action.input.id} not found`);\n}\nstate.services.splice(index, 1);\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-delete-service-not-found",
                  name: "DeleteServiceNotFoundError",
                  code: "SERVICE_NOT_FOUND",
                  description: "Service with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "mod-tiers",
          name: "tiers",
          description:
            "Subscription tiers, service levels, usage limits, billing cycles, and discounts",
          operations: [
            {
              id: "op-add-tier",
              name: "ADD_TIER",
              description: "Add a subscription tier",
              schema:
                "input AddTierInput {\n    id: OID!\n    name: String!\n    description: String\n    amount: Amount_Money\n    currency: Currency!\n    isCustomPricing: Boolean\n    excludeFromSetupFee: Boolean\n    lastModified: DateTime!\n}",
              template: "Add a subscription tier",
              reducer:
                "state.tiers.push({\n    id: action.input.id,\n    name: action.input.name,\n    description: action.input.description || null,\n    isCustomPricing: action.input.isCustomPricing || false,\n    pricingMode: null,\n    pricing: {\n        amount: action.input.amount || null,\n        currency: action.input.currency,\n    },\n    defaultBillingCycle: null,\n    mostPopular: false,\n    billingCycleDiscounts: [],\n    serviceLevels: [],\n    usageLimits: [],\n    excludeFromSetupFee: action.input.excludeFromSetupFee || false,\n});\nstate.lastModified = action.input.lastModified;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-tier",
              name: "UPDATE_TIER",
              description: "Update tier metadata",
              schema:
                "input UpdateTierInput {\n    id: OID!\n    name: String\n    description: String\n    isCustomPricing: Boolean\n    lastModified: DateTime!\n    mostPopular: Boolean\n    excludeFromSetupFee: Boolean\n}",
              template: "Update tier metadata",
              reducer:
                "const tier = state.tiers.find(t => t.id === action.input.id);\nif (!tier) {\n    throw new UpdateTierNotFoundError(`Tier with ID ${action.input.id} not found`);\n}\nif (action.input.name) tier.name = action.input.name;\nif (action.input.description !== undefined) tier.description = action.input.description || null;\nif (action.input.isCustomPricing !== undefined && action.input.isCustomPricing !== null) tier.isCustomPricing = action.input.isCustomPricing;\nif (action.input.excludeFromSetupFee !== undefined && action.input.excludeFromSetupFee !== null) tier.excludeFromSetupFee = action.input.excludeFromSetupFee;\nstate.lastModified = action.input.lastModified;\nif (action.input.mostPopular !== undefined && action.input.mostPopular !== null) {\n    if (action.input.mostPopular) {\n        for (const t of state.tiers) {\n            t.mostPopular = false;\n        }\n    }\n    tier.mostPopular = action.input.mostPopular;\n}",
              errors: [
                {
                  id: "err-update-tier-not-found",
                  name: "UpdateTierNotFoundError",
                  code: "TIER_NOT_FOUND",
                  description: "Tier with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-tier-pricing",
              name: "UPDATE_TIER_PRICING",
              description: "Update tier base pricing",
              schema:
                "input UpdateTierPricingInput {\n    tierId: OID!\n    amount: Amount_Money\n    currency: Currency\n    lastModified: DateTime!\n}",
              template: "Update tier base pricing",
              reducer:
                "const tier = state.tiers.find(t => t.id === action.input.tierId);\nif (!tier) {\n    throw new UpdateTierPricingNotFoundError(`Tier with ID ${action.input.tierId} not found`);\n}\nif (action.input.amount !== undefined) tier.pricing.amount = action.input.amount || null;\nif (action.input.currency) tier.pricing.currency = action.input.currency;\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-update-tier-pricing-not-found",
                  name: "UpdateTierPricingNotFoundError",
                  code: "TIER_NOT_FOUND",
                  description: "Tier with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-delete-tier",
              name: "DELETE_TIER",
              description: "Delete a tier",
              schema:
                "input DeleteTierInput {\n    id: OID!\n    lastModified: DateTime!\n}",
              template: "Delete a tier",
              reducer:
                "const index = state.tiers.findIndex(t => t.id === action.input.id);\nif (index === -1) {\n    throw new DeleteTierNotFoundError(`Tier with ID ${action.input.id} not found`);\n}\nstate.tiers.splice(index, 1);\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-delete-tier-not-found",
                  name: "DeleteTierNotFoundError",
                  code: "TIER_NOT_FOUND",
                  description: "Tier with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-add-service-level",
              name: "ADD_SERVICE_LEVEL",
              description: "Bind a service level to a tier",
              schema:
                "input AddServiceLevelInput {\n    tierId: OID!\n    serviceLevelId: OID!\n    serviceId: OID!\n    level: ServiceLevel!\n    optionGroupId: OID\n    customValue: String\n    lastModified: DateTime!\n}",
              template: "Bind a service level to a tier",
              reducer:
                "const tier = state.tiers.find(t => t.id === action.input.tierId);\nif (!tier) {\n    throw new AddServiceLevelTierNotFoundError(`Tier with ID ${action.input.tierId} not found`);\n}\ntier.serviceLevels.push({\n    id: action.input.serviceLevelId,\n    serviceId: action.input.serviceId,\n    level: action.input.level,\n    customValue: action.input.customValue || null,\n    optionGroupId: action.input.optionGroupId || null,\n});\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-add-sl-tier-not-found",
                  name: "AddServiceLevelTierNotFoundError",
                  code: "TIER_NOT_FOUND",
                  description: "Tier with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-service-level",
              name: "UPDATE_SERVICE_LEVEL",
              description: "Update a service level binding",
              schema:
                "input UpdateServiceLevelInput {\n    tierId: OID!\n    serviceLevelId: OID!\n    level: ServiceLevel\n    optionGroupId: OID\n    customValue: String\n    lastModified: DateTime!\n}",
              template: "Update a service level binding",
              reducer:
                "const tier = state.tiers.find(t => t.id === action.input.tierId);\nif (!tier) {\n    throw new UpdateServiceLevelTierNotFoundError(`Tier with ID ${action.input.tierId} not found`);\n}\nconst sl = tier.serviceLevels.find(s => s.id === action.input.serviceLevelId);\nif (!sl) {\n    throw new UpdateServiceLevelNotFoundError(`Service level with ID ${action.input.serviceLevelId} not found`);\n}\nif (action.input.level) sl.level = action.input.level;\nif (action.input.customValue !== undefined) sl.customValue = action.input.customValue || null;\nif (action.input.optionGroupId !== undefined) sl.optionGroupId = action.input.optionGroupId || null;\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-update-sl-tier-not-found",
                  name: "UpdateServiceLevelTierNotFoundError",
                  code: "TIER_NOT_FOUND",
                  description: "Tier with given ID not found",
                  template: "",
                },
                {
                  id: "err-update-sl-not-found",
                  name: "UpdateServiceLevelNotFoundError",
                  code: "SERVICE_LEVEL_NOT_FOUND",
                  description: "Service level binding with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-service-level",
              name: "REMOVE_SERVICE_LEVEL",
              description: "Remove a service level from a tier",
              schema:
                "input RemoveServiceLevelInput {\n    tierId: OID!\n    serviceLevelId: OID!\n    lastModified: DateTime!\n}",
              template: "Remove a service level from a tier",
              reducer:
                "const tier = state.tiers.find(t => t.id === action.input.tierId);\nif (!tier) {\n    throw new RemoveServiceLevelTierNotFoundError(`Tier with ID ${action.input.tierId} not found`);\n}\nconst index = tier.serviceLevels.findIndex(s => s.id === action.input.serviceLevelId);\nif (index !== -1) {\n    tier.serviceLevels.splice(index, 1);\n}\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-remove-sl-tier-not-found",
                  name: "RemoveServiceLevelTierNotFoundError",
                  code: "TIER_NOT_FOUND",
                  description: "Tier with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-add-usage-limit",
              name: "ADD_USAGE_LIMIT",
              description: "Add a usage limit to a tier",
              schema:
                "input AddUsageLimitInput {\n    tierId: OID!\n    limitId: OID!\n    serviceId: OID!\n    metric: String!\n    unitName: String\n    freeLimit: Int\n    paidLimit: Int\n    metricType: MetricType!\n    accrualCycle: AccrualCycle!\n    notes: String\n    unitPrice: Amount_Money\n    unitPriceCurrency: Currency\n    lastModified: DateTime!\n}",
              template: "Add a usage limit to a tier",
              reducer:
                "const tier = state.tiers.find(t => t.id === action.input.tierId);\nif (!tier) {\n    throw new AddUsageLimitTierNotFoundError(`Tier with ID ${action.input.tierId} not found`);\n}\ntier.usageLimits.push({\n    id: action.input.limitId,\n    serviceId: action.input.serviceId,\n    metric: action.input.metric,\n    unitName: action.input.unitName || null,\n    freeLimit: action.input.freeLimit || null,\n    paidLimit: action.input.paidLimit || null,\n    metricType: action.input.metricType,\n    accrualCycle: action.input.accrualCycle,\n    notes: action.input.notes || null,\n    unitPrice: action.input.unitPrice || null,\n    unitPriceCurrency: action.input.unitPriceCurrency || null,\n});\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-add-ul-tier-not-found",
                  name: "AddUsageLimitTierNotFoundError",
                  code: "TIER_NOT_FOUND",
                  description: "Tier with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-usage-limit",
              name: "UPDATE_USAGE_LIMIT",
              description: "Update a usage limit",
              schema:
                "input UpdateUsageLimitInput {\n    tierId: OID!\n    limitId: OID!\n    metric: String\n    unitName: String\n    freeLimit: Int\n    paidLimit: Int\n    metricType: MetricType\n    accrualCycle: AccrualCycle\n    notes: String\n    unitPrice: Amount_Money\n    unitPriceCurrency: Currency\n    lastModified: DateTime!\n}",
              template: "Update a usage limit",
              reducer:
                "const tier = state.tiers.find(t => t.id === action.input.tierId);\nif (!tier) {\n    throw new UpdateUsageLimitTierNotFoundError(`Tier with ID ${action.input.tierId} not found`);\n}\nconst ul = tier.usageLimits.find(u => u.id === action.input.limitId);\nif (!ul) {\n    throw new UpdateUsageLimitNotFoundError(`Usage limit with ID ${action.input.limitId} not found`);\n}\nif (action.input.metric) ul.metric = action.input.metric;\nif (action.input.unitName !== undefined) ul.unitName = action.input.unitName || null;\nif (action.input.freeLimit !== undefined) ul.freeLimit = action.input.freeLimit || null;\nif (action.input.paidLimit !== undefined) ul.paidLimit = action.input.paidLimit || null;\nif (action.input.metricType) ul.metricType = action.input.metricType;\nif (action.input.accrualCycle) ul.accrualCycle = action.input.accrualCycle;\nif (action.input.notes !== undefined) ul.notes = action.input.notes || null;\nif (action.input.unitPrice !== undefined) ul.unitPrice = action.input.unitPrice || null;\nif (action.input.unitPriceCurrency !== undefined) ul.unitPriceCurrency = action.input.unitPriceCurrency || null;\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-update-ul-tier-not-found",
                  name: "UpdateUsageLimitTierNotFoundError",
                  code: "TIER_NOT_FOUND",
                  description: "Tier with given ID not found",
                  template: "",
                },
                {
                  id: "err-update-ul-not-found",
                  name: "UpdateUsageLimitNotFoundError",
                  code: "USAGE_LIMIT_NOT_FOUND",
                  description: "Usage limit with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-usage-limit",
              name: "REMOVE_USAGE_LIMIT",
              description: "Remove a usage limit from a tier",
              schema:
                "input RemoveUsageLimitInput {\n    tierId: OID!\n    limitId: OID!\n    lastModified: DateTime!\n}",
              template: "Remove a usage limit from a tier",
              reducer:
                "const tier = state.tiers.find(t => t.id === action.input.tierId);\nif (!tier) {\n    throw new RemoveUsageLimitTierNotFoundError(`Tier with ID ${action.input.tierId} not found`);\n}\nconst index = tier.usageLimits.findIndex(u => u.id === action.input.limitId);\nif (index !== -1) {\n    tier.usageLimits.splice(index, 1);\n}\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-remove-ul-tier-not-found",
                  name: "RemoveUsageLimitTierNotFoundError",
                  code: "TIER_NOT_FOUND",
                  description: "Tier with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-tier-default-billing-cycle",
              name: "SET_TIER_DEFAULT_BILLING_CYCLE",
              description: "Set the default billing cycle for a tier",
              schema:
                "input SetTierDefaultBillingCycleInput {\n    tierId: OID!\n    defaultBillingCycle: BillingCycle!\n    lastModified: DateTime!\n}",
              template: "Set the default billing cycle for a tier",
              reducer:
                "const tier = state.tiers.find(t => t.id === action.input.tierId);\nif (!tier) {\n    throw new SetTierDefaultBillingCycleTierNotFoundError(`Tier with ID ${action.input.tierId} not found`);\n}\ntier.defaultBillingCycle = action.input.defaultBillingCycle;\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-set-tbc-tier-not-found",
                  name: "SetTierDefaultBillingCycleTierNotFoundError",
                  code: "TIER_NOT_FOUND",
                  description: "Tier with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-tier-billing-cycle-discounts",
              name: "SET_TIER_BILLING_CYCLE_DISCOUNTS",
              description: "Set billing cycle discounts for a tier",
              schema:
                "input DiscountRuleInput {\n    discountType: DiscountType!\n    discountValue: Float!\n}\n\ninput BillingCycleDiscountInput {\n    billingCycle: BillingCycle!\n    discountRule: DiscountRuleInput!\n}\n\ninput SetTierBillingCycleDiscountsInput {\n    tierId: OID!\n    discounts: [BillingCycleDiscountInput!]!\n    lastModified: DateTime!\n}",
              template: "Set billing cycle discounts for a tier",
              reducer:
                "const tier = state.tiers.find(t => t.id === action.input.tierId);\nif (!tier) {\n    throw new SetTierBillingCycleDiscountsTierNotFoundError(`Tier with ID ${action.input.tierId} not found`);\n}\ntier.billingCycleDiscounts = action.input.discounts.map(d => ({\n    billingCycle: d.billingCycle,\n    discountRule: {\n        discountType: d.discountRule.discountType,\n        discountValue: d.discountRule.discountValue,\n    },\n}));\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-set-tbcd-tier-not-found",
                  name: "SetTierBillingCycleDiscountsTierNotFoundError",
                  code: "TIER_NOT_FOUND",
                  description: "Tier with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-tier-pricing-mode",
              name: "SET_TIER_PRICING_MODE",
              description: "Set the pricing mode for a tier",
              schema:
                "input SetTierPricingModeInput {\n    tierId: OID!\n    pricingMode: TierPricingMode!\n    lastModified: DateTime!\n}",
              template: "Set the pricing mode for a tier",
              reducer:
                "const tier = state.tiers.find(t => t.id === action.input.tierId);\nif (!tier) {\n    throw new SetTierPricingModeTierNotFoundError(`Tier with ID ${action.input.tierId} not found`);\n}\ntier.pricingMode = action.input.pricingMode;\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-set-tpm-tier-not-found",
                  name: "SetTierPricingModeTierNotFoundError",
                  code: "TIER_NOT_FOUND",
                  description: "Tier with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-reorder-tiers",
              name: "REORDER_TIERS",
              description:
                "Reorder the tiers array to match the provided tier ID order",
              schema:
                "input ReorderTiersInput {\n    tierIds: [OID!]!\n    lastModified: DateTime!\n}",
              template: "Reorder tiers by providing ordered tier IDs",
              reducer:
                'const currentIds = state.tiers.map(t => t.id);\nconst inputIds = action.input.tierIds;\nif (inputIds.length !== currentIds.length) {\n    throw new TierIdsMismatchError("Input tier IDs count does not match existing tiers count");\n}\nconst inputSet = new Set(inputIds);\nif (inputSet.size !== inputIds.length) {\n    throw new DuplicateTierIdError("Input contains duplicate tier IDs");\n}\nfor (const id of currentIds) {\n    if (!inputSet.has(id)) {\n        throw new TierIdsMismatchError(`Tier ID ${id} exists but was not included in reorder input`);\n    }\n}\nconst tierMap = new Map(state.tiers.map(t => [t.id, t]));\nstate.tiers = inputIds.map(id => tierMap.get(id));\nstate.lastModified = action.input.lastModified;',
              errors: [
                {
                  id: "err-tier-ids-mismatch",
                  name: "TierIdsMismatchError",
                  code: "TIER_IDS_MISMATCH",
                  description:
                    "Input tier IDs don't match the current set of tier IDs",
                  template: "",
                },
                {
                  id: "err-duplicate-tier-id",
                  name: "DuplicateTierIdError",
                  code: "DUPLICATE_TIER_ID",
                  description: "Input contains duplicate tier IDs",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "mod-option-groups",
          name: "option-groups",
          description:
            "Add-on option groups with standalone and tier-dependent pricing",
          operations: [
            {
              id: "op-add-option-group",
              name: "ADD_OPTION_GROUP",
              description: "Add an option group",
              schema:
                "input AddOptionGroupInput {\n    id: OID!\n    name: String!\n    description: String\n    isAddOn: Boolean!\n    defaultSelected: Boolean!\n    costType: GroupCostType\n    availableBillingCycles: [BillingCycle!]\n    price: Amount_Money\n    currency: Currency\n    lastModified: DateTime!\n}",
              template: "Add an option group",
              reducer:
                "state.optionGroups.push({\n    id: action.input.id,\n    name: action.input.name,\n    description: action.input.description || null,\n    isAddOn: action.input.isAddOn,\n    defaultSelected: action.input.defaultSelected,\n    pricingMode: null,\n    standalonePricing: null,\n    tierDependentPricing: null,\n    costType: action.input.costType || null,\n    availableBillingCycles: action.input.availableBillingCycles || [],\n    billingCycleDiscounts: [],\n    discountMode: null,\n    price: action.input.price || null,\n    currency: action.input.currency || null,\n});\nstate.lastModified = action.input.lastModified;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-option-group",
              name: "UPDATE_OPTION_GROUP",
              description: "Update option group fields",
              schema:
                "input UpdateOptionGroupInput {\n    id: OID!\n    name: String\n    description: String\n    isAddOn: Boolean\n    defaultSelected: Boolean\n    costType: GroupCostType\n    availableBillingCycles: [BillingCycle!]\n    price: Amount_Money\n    currency: Currency\n    lastModified: DateTime!\n}",
              template: "Update option group fields",
              reducer:
                "const og = state.optionGroups.find(g => g.id === action.input.id);\nif (!og) {\n    throw new UpdateOptionGroupNotFoundError(`Option group with ID ${action.input.id} not found`);\n}\nif (action.input.name) og.name = action.input.name;\nif (action.input.description !== undefined) og.description = action.input.description || null;\nif (action.input.isAddOn !== undefined && action.input.isAddOn !== null) og.isAddOn = action.input.isAddOn;\nif (action.input.defaultSelected !== undefined && action.input.defaultSelected !== null) og.defaultSelected = action.input.defaultSelected;\nif (action.input.costType !== undefined) og.costType = action.input.costType || null;\nif (action.input.availableBillingCycles) og.availableBillingCycles = action.input.availableBillingCycles;\nif (action.input.price !== undefined) og.price = action.input.price || null;\nif (action.input.currency !== undefined) og.currency = action.input.currency || null;\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-update-og-not-found",
                  name: "UpdateOptionGroupNotFoundError",
                  code: "OPTION_GROUP_NOT_FOUND",
                  description: "Option group with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-delete-option-group",
              name: "DELETE_OPTION_GROUP",
              description: "Delete an option group",
              schema:
                "input DeleteOptionGroupInput {\n    id: OID!\n    lastModified: DateTime!\n}",
              template: "Delete an option group",
              reducer:
                "const index = state.optionGroups.findIndex(g => g.id === action.input.id);\nif (index === -1) {\n    throw new DeleteOptionGroupNotFoundError(`Option group with ID ${action.input.id} not found`);\n}\nstate.optionGroups.splice(index, 1);\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-delete-og-not-found",
                  name: "DeleteOptionGroupNotFoundError",
                  code: "OPTION_GROUP_NOT_FOUND",
                  description: "Option group with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-option-group-standalone-pricing",
              name: "SET_OPTION_GROUP_STANDALONE_PRICING",
              description: "Set standalone pricing for an option group",
              schema:
                "input RecurringPriceOptionInput {\n    id: OID!\n    billingCycle: BillingCycle!\n    amount: Amount_Money!\n    currency: Currency!\n    discount: DiscountRuleInput\n}\n\ninput SetupCostInput {\n    amount: Amount_Money!\n    currency: Currency!\n    discount: DiscountRuleInput\n}\n\ninput SetOptionGroupStandalonePricingInput {\n    optionGroupId: OID!\n    setupCost: SetupCostInput\n    recurringPricing: [RecurringPriceOptionInput!]!\n    billingCycleDiscounts: [BillingCycleDiscountInput!]\n    lastModified: DateTime!\n}",
              template: "Set standalone pricing for an option group",
              reducer:
                'const og = state.optionGroups.find(g => g.id === action.input.optionGroupId);\nif (!og) {\n    throw new SetOptionGroupStandalonePricingNotFoundError(`Option group with ID ${action.input.optionGroupId} not found`);\n}\nog.pricingMode = "STANDALONE";\nog.standalonePricing = {\n    setupCost: action.input.setupCost ? {\n        amount: action.input.setupCost.amount,\n        currency: action.input.setupCost.currency,\n        discount: action.input.setupCost.discount ? {\n            discountType: action.input.setupCost.discount.discountType,\n            discountValue: action.input.setupCost.discount.discountValue,\n        } : null,\n    } : null,\n    recurringPricing: action.input.recurringPricing.map(rp => ({\n        id: rp.id,\n        billingCycle: rp.billingCycle,\n        amount: rp.amount,\n        currency: rp.currency,\n        discount: rp.discount ? {\n            discountType: rp.discount.discountType,\n            discountValue: rp.discount.discountValue,\n        } : null,\n    })),\n};\nif (action.input.billingCycleDiscounts) {\n    og.billingCycleDiscounts = action.input.billingCycleDiscounts.map(d => ({\n        billingCycle: d.billingCycle,\n        discountRule: {\n            discountType: d.discountRule.discountType,\n            discountValue: d.discountRule.discountValue,\n        },\n    }));\n}\nstate.lastModified = action.input.lastModified;',
              errors: [
                {
                  id: "err-set-ogsp-not-found",
                  name: "SetOptionGroupStandalonePricingNotFoundError",
                  code: "OPTION_GROUP_NOT_FOUND",
                  description: "Option group with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-add-option-group-tier-pricing",
              name: "ADD_OPTION_GROUP_TIER_PRICING",
              description: "Add tier-dependent pricing to an option group",
              schema:
                "input AddOptionGroupTierPricingInput {\n    optionGroupId: OID!\n    tierPricingId: OID!\n    tierId: OID!\n    setupCost: SetupCostInput\n    setupCostDiscounts: [BillingCycleDiscountInput!]\n    recurringPricing: [RecurringPriceOptionInput!]!\n    lastModified: DateTime!\n}",
              template: "Add tier-dependent pricing to an option group",
              reducer:
                'const og = state.optionGroups.find(g => g.id === action.input.optionGroupId);\nif (!og) {\n    throw new AddOptionGroupTierPricingNotFoundError(`Option group with ID ${action.input.optionGroupId} not found`);\n}\nog.pricingMode = "TIER_DEPENDENT";\nif (!og.tierDependentPricing) {\n    og.tierDependentPricing = [];\n}\nog.tierDependentPricing.push({\n    id: action.input.tierPricingId,\n    tierId: action.input.tierId,\n    setupCost: action.input.setupCost ? {\n        amount: action.input.setupCost.amount,\n        currency: action.input.setupCost.currency,\n        discount: action.input.setupCost.discount ? {\n            discountType: action.input.setupCost.discount.discountType,\n            discountValue: action.input.setupCost.discount.discountValue,\n        } : null,\n    } : null,\n    setupCostDiscounts: (action.input.setupCostDiscounts || []).map(d => ({\n        billingCycle: d.billingCycle,\n        discountRule: {\n            discountType: d.discountRule.discountType,\n            discountValue: d.discountRule.discountValue,\n        },\n    })),\n    recurringPricing: action.input.recurringPricing.map(rp => ({\n        id: rp.id,\n        billingCycle: rp.billingCycle,\n        amount: rp.amount,\n        currency: rp.currency,\n        discount: rp.discount ? {\n            discountType: rp.discount.discountType,\n            discountValue: rp.discount.discountValue,\n        } : null,\n    })),\n});\nstate.lastModified = action.input.lastModified;',
              errors: [
                {
                  id: "err-add-ogtp-not-found",
                  name: "AddOptionGroupTierPricingNotFoundError",
                  code: "OPTION_GROUP_NOT_FOUND",
                  description: "Option group with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-option-group-tier-pricing",
              name: "UPDATE_OPTION_GROUP_TIER_PRICING",
              description: "Update tier-dependent pricing for an option group",
              schema:
                "input UpdateOptionGroupTierPricingInput {\n    optionGroupId: OID!\n    tierId: OID!\n    setupCost: SetupCostInput\n    setupCostDiscounts: [BillingCycleDiscountInput!]\n    recurringPricing: [RecurringPriceOptionInput!]\n    lastModified: DateTime!\n}",
              template: "Update tier-dependent pricing for an option group",
              reducer:
                "const og = state.optionGroups.find(g => g.id === action.input.optionGroupId);\nif (!og) {\n    throw new UpdateOptionGroupTierPricingNotFoundError(`Option group with ID ${action.input.optionGroupId} not found`);\n}\nconst tp = og.tierDependentPricing?.find(t => t.tierId === action.input.tierId);\nif (tp) {\n    if (action.input.setupCost !== undefined) {\n        tp.setupCost = action.input.setupCost ? {\n            amount: action.input.setupCost.amount,\n            currency: action.input.setupCost.currency,\n            discount: action.input.setupCost.discount ? {\n                discountType: action.input.setupCost.discount.discountType,\n                discountValue: action.input.setupCost.discount.discountValue,\n            } : null,\n        } : null;\n    }\n    if (action.input.setupCostDiscounts !== undefined && action.input.setupCostDiscounts !== null) {\n        tp.setupCostDiscounts = action.input.setupCostDiscounts.map(d => ({\n            billingCycle: d.billingCycle,\n            discountRule: {\n                discountType: d.discountRule.discountType,\n                discountValue: d.discountRule.discountValue,\n            },\n        }));\n    }\n    if (action.input.recurringPricing) {\n        tp.recurringPricing = action.input.recurringPricing.map(rp => ({\n            id: rp.id,\n            billingCycle: rp.billingCycle,\n            amount: rp.amount,\n            currency: rp.currency,\n            discount: rp.discount ? {\n                discountType: rp.discount.discountType,\n                discountValue: rp.discount.discountValue,\n            } : null,\n        }));\n    }\n}\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-update-ogtp-not-found",
                  name: "UpdateOptionGroupTierPricingNotFoundError",
                  code: "OPTION_GROUP_NOT_FOUND",
                  description: "Option group with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-option-group-tier-pricing",
              name: "REMOVE_OPTION_GROUP_TIER_PRICING",
              description: "Remove tier-dependent pricing from an option group",
              schema:
                "input RemoveOptionGroupTierPricingInput {\n    optionGroupId: OID!\n    tierId: OID!\n    lastModified: DateTime!\n}",
              template: "Remove tier-dependent pricing from an option group",
              reducer:
                "const og = state.optionGroups.find(g => g.id === action.input.optionGroupId);\nif (!og) {\n    throw new RemoveOptionGroupTierPricingNotFoundError(`Option group with ID ${action.input.optionGroupId} not found`);\n}\nif (og.tierDependentPricing) {\n    const index = og.tierDependentPricing.findIndex(t => t.tierId === action.input.tierId);\n    if (index !== -1) {\n        og.tierDependentPricing.splice(index, 1);\n    }\n}\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-remove-ogtp-not-found",
                  name: "RemoveOptionGroupTierPricingNotFoundError",
                  code: "OPTION_GROUP_NOT_FOUND",
                  description: "Option group with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-option-group-discount-mode",
              name: "SET_OPTION_GROUP_DISCOUNT_MODE",
              description: "Set the discount mode for an option group",
              schema:
                "input SetOptionGroupDiscountModeInput {\n    optionGroupId: OID!\n    discountMode: DiscountMode!\n    lastModified: DateTime!\n}",
              template: "Set the discount mode for an option group",
              reducer:
                "const og = state.optionGroups.find(g => g.id === action.input.optionGroupId);\nif (!og) {\n    throw new SetOptionGroupDiscountModeNotFoundError(`Option group with ID ${action.input.optionGroupId} not found`);\n}\nog.discountMode = action.input.discountMode;\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "err-set-ogdm-not-found",
                  name: "SetOptionGroupDiscountModeNotFoundError",
                  code: "OPTION_GROUP_NOT_FOUND",
                  description: "Option group with given ID not found",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
          ],
        },
      ],
      version: 1,
      changeLog: [],
    },
  ],
};
