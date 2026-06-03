import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  id: "powerhouse/billing-statement",
  name: "BillingStatement",
  author: {
    name: "Powerhouse",
    website: "https://powerhouse.inc",
  },
  extension: "",
  description:
    "The Billing Statement Document Model captures a contributor's issued charges, with itemized line entries and auto-calculated totals in cash and POWT's.",
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
            "type BillingStatementState {\n  contributor: PHID\n  dateIssued: DateTime!\n  dateDue: DateTime\n  lineItems: [BillingStatementLineItem!]!\n  status: BillingStatementStatus!\n  currency: String!\n  totalCash: Float!\n  totalPowt: Float!\n  notes: String\n}\n\ntype BillingStatementLineItem {\n  id: OID!\n  description: String!\n  quantity: Float!\n  unit: BillingStatementUnit!\n  unitPricePwt: Float!\n  unitPriceCash: Float!\n  totalPricePwt: Float!\n  totalPriceCash: Float!\n  lineItemTag: [BillingStatementTag!]!\n}\n\ntype BillingStatementTag {\n  dimension: String!\n  value: String!\n  label: String\n}\n\nenum BillingStatementStatus {\n  DRAFT\n  ISSUED\n  ACCEPTED\n  REJECTED\n  PAID\n}\n\nenum BillingStatementStatusInput {\n  DRAFT\n  ISSUED\n  ACCEPTED\n  REJECTED\n  PAID\n}\n\nenum BillingStatementUnit {\n  MINUTE\n  HOUR\n  DAY\n  UNIT\n}\n\nenum BillingStatementUnitInput {\n  MINUTE\n  HOUR\n  DAY\n  UNIT\n}",
          examples: [],
          initialValue:
            '{"contributor": null, "dateIssued": "2025-06-10T15:42:17.873Z", "dateDue": "2025-06-10T15:42:17.873Z", "lineItems": [], "status": "DRAFT", "currency": "", "totalCash": 0, "totalPowt": 0, "notes": ""}',
        },
      },
      modules: [
        {
          id: "general",
          name: "general",
          description: "",
          operations: [
            {
              id: "edit-billing-statement",
              name: "editBillingStatement",
              description: "",
              schema:
                "input EditBillingStatementInput {\n  dateIssued: DateTime\n  dateDue: DateTime\n  currency: String\n  notes: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "edit-contributor",
              name: "editContributor",
              description: "",
              schema: "input EditContributorInput {\n  contributor: PHID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "edit-status",
              name: "editStatus",
              description: "",
              schema:
                "input EditStatusInput {\n  status: BillingStatementStatusInput!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "line-items",
          name: "line_items",
          description: "",
          operations: [
            {
              id: "add-line-item",
              name: "addLineItem",
              description:
                "BillingStatementState.totalCash / .totalPowt will be a sum of the line item values.",
              schema:
                "input AddLineItemInput {\n  id: OID!\n  description: String!\n  quantity: Float!\n  unit: BillingStatementUnitInput!\n  unitPricePwt: Float!\n  unitPriceCash: Float!\n  totalPricePwt: Float!\n  totalPriceCash: Float!\n}",
              template:
                "BillingStatementState.totalCash / .totalPowt will be a sum of the line item values.",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "edit-line-item",
              name: "editLineItem",
              description:
                "BillingStatementState.totalCash / .totalPowt will be a sum of the line item values.",
              schema:
                "input EditLineItemInput {\n  id: OID!\n  description: String\n  quantity: Float\n  unit: BillingStatementUnitInput\n  unitPricePwt: Float\n  unitPriceCash: Float\n  totalPricePwt: Float\n  totalPriceCash: Float\n}",
              template:
                "BillingStatementState.totalCash / .totalPowt will be a sum of the line item values.",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "delete-line-item",
              name: "deleteLineItem",
              description: "",
              schema: "input DeleteLineItemInput {\n  id: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "tags",
          name: "tags",
          description: "",
          operations: [
            {
              id: "edit-line-item-tag",
              name: "editLineItemTag",
              description: "",
              schema:
                "input EditLineItemTagInput {\n  lineItemId: OID!\n  dimension: String!\n  value: String!\n  label: String\n}",
              template: "",
              reducer: "",
              errors: [],
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
