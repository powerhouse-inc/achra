import type { PHDocument } from "document-model";
import type { ResourceTemplateDocument } from "document-models/resource-template";
import type { ServiceOfferingDocument } from "document-models/service-offering";
import { byOptionGroupAndDisplayOrder } from "./sorting.js";

/**
 * Map ResourceTemplateState from document model to GraphQL response
 */
export function mapResourceTemplateState(
  state: ResourceTemplateDocument["state"]["global"],
  doc: PHDocument,
) {
  return {
    id: doc.header.id,
    operatorId: state.operatorId,
    title: state.title,
    summary: state.summary,
    description: state.description || null,
    thumbnailUrl: state.thumbnailUrl || null,
    infoLink: state.infoLink || null,
    status: state.status,
    lastModified: state.lastModified,
    targetAudiences: (state.targetAudiences || []).map((audience) => ({
      id: audience.id,
      label: audience.label,
      color: audience.color || null,
    })),
    setupServices: state.setupServices || [],
    recurringServices: state.recurringServices || [],
    facetTargets: (state.facetTargets || []).map((facet) => ({
      id: facet.id,
      categoryKey: facet.categoryKey,
      categoryLabel: facet.categoryLabel,
      selectedOptions: facet.selectedOptions || [],
    })),
    services: byOptionGroupAndDisplayOrder(
      state.services || [],
      state.optionGroups || [],
    ).map((service) => ({
      id: service.id,
      title: service.title,
      description: service.description || null,
      displayOrder: service.displayOrder ?? null,
      parentServiceId: service.parentServiceId || null,
      isSetupFormation: service.isSetupFormation,
      optionGroupId: service.optionGroupId || null,
      facetBindings: (service.facetBindings || []).map((binding) => ({
        id: binding.id,
        facetName: binding.facetName,
        facetType: binding.facetType,
        supportedOptions: binding.supportedOptions || [],
      })),
    })),
    optionGroups: (state.optionGroups || []).map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description || null,
      isAddOn: group.isAddOn,
      defaultSelected: group.defaultSelected,
    })),
    faqFields: (state.faqFields || []).map((faq) => ({
      id: faq.id,
      question: faq.question || null,
      answer: faq.answer || null,
      displayOrder: faq.displayOrder,
    })),
    contentSections: (state.contentSections || []).map((section) => ({
      id: section.id,
      title: section.title,
      content: section.content,
      displayOrder: section.displayOrder,
    })),
    weight: state.weight ?? null,
    subtitle: state.subtitle || null,
  };
}

/**
 * Map a DiscountRule to the GraphQL shape, or null
 */
function mapDiscountRule(
  rule: { discountType: string; discountValue: number } | null | undefined,
) {
  if (!rule) return null;
  return {
    discountType: rule.discountType,
    discountValue: rule.discountValue,
  };
}

/**
 * Map ServiceOfferingState from document model to GraphQL response
 */
export function mapServiceOfferingState(
  state: ServiceOfferingDocument["state"]["global"],
  doc: PHDocument,
  templateState?: ResourceTemplateDocument["state"]["global"] | null,
) {
  return {
    id: doc.header.id,
    operatorId: state.operatorId,
    resourceTemplateId: state.resourceTemplateId || null,
    title: templateState?.title || state.title,
    summary: templateState?.summary || state.summary,
    description: templateState?.description || state.description || null,
    thumbnailUrl: templateState?.thumbnailUrl || state.thumbnailUrl || null,
    infoLink: templateState?.infoLink || state.infoLink || null,
    status: state.status,
    lastModified: state.lastModified,
    availableBillingCycles: state.availableBillingCycles || [],
    facetTargets: (state.facetTargets || []).map((facet) => ({
      id: facet.id,
      categoryKey: facet.categoryKey,
      categoryLabel: facet.categoryLabel,
      selectedOptions: facet.selectedOptions || [],
    })),
    services: byOptionGroupAndDisplayOrder(
      state.services || [],
      state.optionGroups || [],
    ).map((service) => ({
      id: service.id,
      title: service.title,
      description: service.description || null,
      displayOrder: service.displayOrder ?? null,
      isSetupFormation: service.isSetupFormation,
      optionGroupId: service.optionGroupId || null,
    })),
    tiers: (state.tiers || []).map((tier) => ({
      id: tier.id,
      name: tier.name,
      description: tier.description || null,
      isCustomPricing: tier.isCustomPricing,
      mostPopular: tier.mostPopular,
      excludeFromSetupFee: tier.excludeFromSetupFee ?? false,
      pricingMode: tier.pricingMode || null,
      pricing: {
        amount: tier.pricing?.amount ?? null,
        currency: tier.pricing?.currency ?? "USD",
      },
      defaultBillingCycle: tier.defaultBillingCycle || null,
      billingCycleDiscounts: (tier.billingCycleDiscounts || []).map((d) => ({
        billingCycle: d.billingCycle,
        discountRule: {
          discountType: d.discountRule?.discountType,
          discountValue: d.discountRule?.discountValue,
        },
      })),
      serviceLevels: (tier.serviceLevels || []).map((level) => ({
        id: level.id,
        serviceId: level.serviceId,
        level: level.level,
        customValue: level.customValue || null,
        optionGroupId: level.optionGroupId || null,
      })),
      usageLimits: (tier.usageLimits || []).map((limit) => {
        const legacyReset = (limit as { resetCycle?: string | null })
          .resetCycle;
        const accrualCycle =
          limit.accrualCycle ||
          (legacyReset && legacyReset !== "NONE" ? legacyReset : "MONTHLY");
        return {
          id: limit.id,
          serviceId: limit.serviceId,
          metric: limit.metric,
          unitName: limit.unitName || null,
          freeLimit: limit.freeLimit ?? null,
          paidLimit: limit.paidLimit ?? null,
          metricType: limit.metricType || "NON_CUMULATIVE",
          accrualCycle,
          notes: limit.notes || null,
          unitPrice: limit.unitPrice ?? null,
          unitPriceCurrency: limit.unitPriceCurrency || null,
        };
      }),
    })),
    optionGroups: (state.optionGroups || []).map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description || null,
      isAddOn: group.isAddOn,
      defaultSelected: group.defaultSelected,
      pricingMode: group.pricingMode || null,
      standalonePricing: group.standalonePricing
        ? {
            setupCost: group.standalonePricing.setupCost
              ? {
                  amount: group.standalonePricing.setupCost.amount,
                  currency: group.standalonePricing.setupCost.currency,
                  discount: mapDiscountRule(
                    group.standalonePricing.setupCost.discount,
                  ),
                }
              : null,
            recurringPricing: (
              group.standalonePricing.recurringPricing || []
            ).map((rp) => ({
              id: rp.id,
              billingCycle: rp.billingCycle,
              amount: rp.amount,
              currency: rp.currency,
              discount: mapDiscountRule(rp.discount),
            })),
          }
        : null,
      tierDependentPricing: (group.tierDependentPricing || []).map((tp) => ({
        id: tp.id,
        tierId: tp.tierId,
        setupCost: tp.setupCost
          ? {
              amount: tp.setupCost.amount,
              currency: tp.setupCost.currency,
              discount: mapDiscountRule(tp.setupCost.discount),
            }
          : null,
        setupCostDiscounts: (tp.setupCostDiscounts || []).map((d) => ({
          billingCycle: d.billingCycle,
          discountRule: {
            discountType: d.discountRule?.discountType,
            discountValue: d.discountRule?.discountValue,
          },
        })),
        recurringPricing: (tp.recurringPricing || []).map((rp) => ({
          id: rp.id,
          billingCycle: rp.billingCycle,
          amount: rp.amount,
          currency: rp.currency,
          discount: mapDiscountRule(rp.discount),
        })),
      })),
      costType: group.costType || null,
      availableBillingCycles: group.availableBillingCycles || [],
      billingCycleDiscounts: (group.billingCycleDiscounts || []).map((d) => ({
        billingCycle: d.billingCycle,
        discountRule: {
          discountType: d.discountRule?.discountType,
          discountValue: d.discountRule?.discountValue,
        },
      })),
      discountMode: group.discountMode || null,
      price: group.price ?? null,
      currency: group.currency || null,
    })),
  };
}
