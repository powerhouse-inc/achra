import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  id: "powerhouse/subscription-invoice",
  name: "SubscriptionInvoice",
  author: {
    name: "Powerhouse",
    website: "https://www.powerhouse.inc/",
  },
  extension: "inv",
  description:
    "A printable invoice generated from a SubscriptionInstance. Snapshots customer info, billing-cycle context, and per-line-item charges at generation time. Stripe integration hooks via stripeInvoiceId.",
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
            "type SubscriptionInvoiceState {\n    invoiceNumber: String\n    issuedAt: DateTime\n    dueDate: DateTime\n    status: SubscriptionInvoiceStatus!\n    customerId: PHID\n    customerName: String\n    customerEmail: EmailAddress\n    sourceSubscriptionId: PHID\n    sourceSubscriptionName: String\n    cycleStart: DateTime\n    cycleEnd: DateTime\n    billingCycle: SubscriptionInvoiceBillingCycle\n    lineItems: [SubscriptionInvoiceLineItem!]!\n    currency: Currency\n    subtotal: Amount_Money!\n    creditApplied: Amount_Money!\n    totalDue: Amount_Money!\n    totalPaid: Amount_Money!\n    stripeInvoiceId: String\n    notes: String\n}\n\nenum SubscriptionInvoiceStatus {\n    DRAFT\n    ISSUED\n    PAID\n    VOID\n}\n\nenum SubscriptionInvoiceBillingCycle {\n    MONTHLY\n    QUARTERLY\n    SEMI_ANNUAL\n    ANNUAL\n    ONE_TIME\n}\n\nenum SubscriptionInvoiceLineItemOrigin {\n    SETUP\n    SUBSCRIPTION_FEE\n    DYNAMIC\n    ESTIMATED_USAGE\n    RECONCILIATION\n}\n\ntype SubscriptionInvoiceLineItem {\n    id: OID!\n    sliceId: OID!\n    origin: SubscriptionInvoiceLineItemOrigin!\n    description: String!\n    sourceName: String\n    chargedAt: DateTime!\n    debitAmount: Amount_Money!\n    settledAmount: Amount_Money!\n    creditApplied: Amount_Money!\n    amountDue: Amount_Money!\n    currency: Currency!\n}\n",
          examples: [],
          initialValue:
            '{\n    "invoiceNumber": null,\n    "issuedAt": null,\n    "dueDate": null,\n    "status": "DRAFT",\n    "customerId": null,\n    "customerName": null,\n    "customerEmail": null,\n    "sourceSubscriptionId": null,\n    "sourceSubscriptionName": null,\n    "cycleStart": null,\n    "cycleEnd": null,\n    "billingCycle": null,\n    "lineItems": [],\n    "currency": null,\n    "subtotal": 0,\n    "creditApplied": 0,\n    "totalDue": 0,\n    "totalPaid": 0,\n    "stripeInvoiceId": null,\n    "notes": null\n}',
        },
      },
      modules: [
        {
          id: "module-invoice",
          name: "invoice",
          description: "Subscription invoice lifecycle and metadata operations",
          operations: [
            {
              id: "op-initialize-subscription-invoice",
              name: "INITIALIZE_SUBSCRIPTION_INVOICE",
              description:
                "Populate a DRAFT invoice with customer info, billing-cycle context, line items, and computed totals. Rejects if the invoice has already been initialized.",
              schema:
                "input InitializeSubscriptionInvoiceInput {\n    invoiceNumber: String\n    dueDate: DateTime\n    customerId: PHID\n    customerName: String\n    customerEmail: EmailAddress\n    sourceSubscriptionId: PHID\n    sourceSubscriptionName: String\n    cycleStart: DateTime\n    cycleEnd: DateTime\n    billingCycle: SubscriptionInvoiceBillingCycle\n    lineItems: [SubscriptionInvoiceLineItemInput!]!\n    currency: Currency\n    subtotal: Amount_Money!\n    creditApplied: Amount_Money!\n    totalDue: Amount_Money!\n    totalPaid: Amount_Money!\n    notes: String\n}\n\ninput SubscriptionInvoiceLineItemInput {\n    id: OID!\n    sliceId: OID!\n    origin: SubscriptionInvoiceLineItemOrigin!\n    description: String!\n    sourceName: String\n    chargedAt: DateTime!\n    debitAmount: Amount_Money!\n    settledAmount: Amount_Money!\n    creditApplied: Amount_Money!\n    amountDue: Amount_Money!\n    currency: Currency!\n}\n",
              template:
                "Populate a DRAFT invoice with customer info, billing-cycle context, line items, and computed totals. Rejects if the invoice has already been initialized.",
              reducer:
                'if (state.lineItems.length > 0 || state.invoiceNumber) {\n  throw new SubscriptionInvoiceAlreadyInitializedError(\n    "Invoice has already been initialized",\n  );\n}\nstate.invoiceNumber = action.input.invoiceNumber || null;\nstate.dueDate = action.input.dueDate || null;\nstate.customerId = action.input.customerId || null;\nstate.customerName = action.input.customerName || null;\nstate.customerEmail = action.input.customerEmail || null;\nstate.sourceSubscriptionId = action.input.sourceSubscriptionId || null;\nstate.sourceSubscriptionName = action.input.sourceSubscriptionName || null;\nstate.cycleStart = action.input.cycleStart || null;\nstate.cycleEnd = action.input.cycleEnd || null;\nstate.billingCycle = action.input.billingCycle || null;\nstate.currency = action.input.currency || null;\nstate.subtotal = action.input.subtotal;\nstate.creditApplied = action.input.creditApplied;\nstate.totalDue = action.input.totalDue;\nstate.totalPaid = action.input.totalPaid;\nstate.notes = action.input.notes || null;\nstate.lineItems = action.input.lineItems.map((li) => ({\n  id: li.id,\n  sliceId: li.sliceId,\n  origin: li.origin,\n  description: li.description,\n  sourceName: li.sourceName || null,\n  chargedAt: li.chargedAt,\n  debitAmount: li.debitAmount,\n  settledAmount: li.settledAmount,\n  creditApplied: li.creditApplied,\n  amountDue: li.amountDue,\n  currency: li.currency,\n}));\n',
              errors: [
                {
                  id: "err-subscription-invoice-already-initialized",
                  name: "SubscriptionInvoiceAlreadyInitializedError",
                  code: "SUBSCRIPTION_INVOICE_ALREADY_INITIALIZED",
                  description:
                    "Thrown when INITIALIZE_SUBSCRIPTION_INVOICE is dispatched on an invoice that has already been initialized (lineItems present or invoiceNumber set).",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-mark-subscription-invoice-issued",
              name: "MARK_SUBSCRIPTION_INVOICE_ISSUED",
              description:
                "Transition a DRAFT invoice to ISSUED and stamp issuedAt.",
              schema:
                "input MarkSubscriptionInvoiceIssuedInput {\n    issuedAt: DateTime!\n}\n",
              template:
                "Transition a DRAFT invoice to ISSUED and stamp issuedAt.",
              reducer:
                'if (state.status !== "DRAFT") {\n  throw new SubscriptionInvoiceNotDraftError(\n    `Cannot issue invoice in status ${state.status}; expected DRAFT`,\n  );\n}\nstate.status = "ISSUED";\nstate.issuedAt = action.input.issuedAt;\n',
              errors: [
                {
                  id: "err-subscription-invoice-not-draft",
                  name: "SubscriptionInvoiceNotDraftError",
                  code: "SUBSCRIPTION_INVOICE_NOT_DRAFT",
                  description:
                    "Thrown when MARK_SUBSCRIPTION_INVOICE_ISSUED is dispatched on an invoice whose current status is not DRAFT.",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-mark-subscription-invoice-paid",
              name: "MARK_SUBSCRIPTION_INVOICE_PAID",
              description:
                "Transition an ISSUED invoice to PAID, recording paidAt and paidAmount. Rejects non-positive amounts.",
              schema:
                "input MarkSubscriptionInvoicePaidInput {\n    paidAt: DateTime!\n    paidAmount: Amount_Money!\n}\n",
              template:
                "Transition an ISSUED invoice to PAID, recording paidAt and paidAmount. Rejects non-positive amounts.",
              reducer:
                'if (state.status !== "ISSUED") {\n  throw new SubscriptionInvoiceNotIssuedError(\n    `Cannot mark paid in status ${state.status}; expected ISSUED`,\n  );\n}\nif (action.input.paidAmount <= 0) {\n  throw new SubscriptionInvoicePaidInvalidAmountError(\n    "Paid amount must be greater than zero",\n  );\n}\nstate.status = "PAID";\nstate.totalPaid = action.input.paidAmount;\n',
              errors: [
                {
                  id: "err-subscription-invoice-not-issued",
                  name: "SubscriptionInvoiceNotIssuedError",
                  code: "SUBSCRIPTION_INVOICE_NOT_ISSUED",
                  description:
                    "Thrown when MARK_SUBSCRIPTION_INVOICE_PAID is dispatched on an invoice whose current status is not ISSUED.",
                  template: "",
                },
                {
                  id: "err-subscription-invoice-paid-invalid-amount",
                  name: "SubscriptionInvoicePaidInvalidAmountError",
                  code: "SUBSCRIPTION_INVOICE_PAID_INVALID_AMOUNT",
                  description:
                    "Thrown when MARK_SUBSCRIPTION_INVOICE_PAID is dispatched with a paidAmount that is not strictly greater than zero.",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-void-subscription-invoice",
              name: "VOID_SUBSCRIPTION_INVOICE",
              description:
                "Mark the invoice as VOID. Optionally appends a reason to notes.",
              schema:
                "input VoidSubscriptionInvoiceInput {\n    voidedAt: DateTime!\n    reason: String\n}\n",
              template:
                "Mark the invoice as VOID. Optionally appends a reason to notes.",
              reducer:
                'if (state.status === "VOID") {\n  throw new SubscriptionInvoiceAlreadyVoidError("Invoice is already VOID");\n}\nstate.status = "VOID";\nif (action.input.reason) {\n  const prefix = state.notes ? state.notes + "\\n\\n" : "";\n  state.notes = `${prefix}[VOID at ${action.input.voidedAt}] ${action.input.reason}`;\n}\n',
              errors: [
                {
                  id: "err-subscription-invoice-already-void",
                  name: "SubscriptionInvoiceAlreadyVoidError",
                  code: "SUBSCRIPTION_INVOICE_ALREADY_VOID",
                  description:
                    "Thrown when VOID_SUBSCRIPTION_INVOICE is dispatched on an invoice that is already in VOID status.",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-subscription-invoice-stripe-id",
              name: "SET_SUBSCRIPTION_INVOICE_STRIPE_ID",
              description:
                "Attach the Stripe invoice ID after the invoice has been issued through Stripe.",
              schema:
                "input SetSubscriptionInvoiceStripeIdInput {\n    stripeInvoiceId: String!\n}\n",
              template:
                "Attach the Stripe invoice ID after the invoice has been issued through Stripe.",
              reducer:
                "state.stripeInvoiceId = action.input.stripeInvoiceId;\n",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-subscription-invoice-notes",
              name: "SET_SUBSCRIPTION_INVOICE_NOTES",
              description: "Replace the free-form notes on the invoice.",
              schema:
                "input SetSubscriptionInvoiceNotesInput {\n    notes: String\n}\n",
              template: "Replace the free-form notes on the invoice.",
              reducer: "state.notes = action.input.notes || null;\n",
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
