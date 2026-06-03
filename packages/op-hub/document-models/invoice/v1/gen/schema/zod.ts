/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  AcceptInput,
  AddLineItemInput,
  AddPaymentInput,
  Address,
  Bank,
  CancelInput,
  ClosePaymentInput,
  ClosureReason,
  ClosureReasonInput,
  ConfirmPaymentInput,
  ContactInfo,
  DeleteLineItemInput,
  EditInvoiceInput,
  EditIssuerBankInput,
  EditIssuerInput,
  EditIssuerWalletInput,
  EditLineItemInput,
  EditPayerBankInput,
  EditPayerInput,
  EditPayerWalletInput,
  EditPaymentDataInput,
  EditStatusInput,
  ExportedData,
  IntermediaryBank,
  InvoiceAccountType,
  InvoiceAccountTypeInput,
  InvoiceLineItem,
  InvoiceState,
  InvoiceTag,
  InvoiceWallet,
  IssueInput,
  LegalEntity,
  LegalEntityId,
  Payment,
  PaymentRouting,
  ReapprovePaymentInput,
  RegisterPaymentTxInput,
  ReinstateInput,
  RejectInput,
  Rejection,
  ReportPaymentIssueInput,
  ResetInput,
  SchedulePaymentInput,
  SetExportedDataInput,
  SetInvoiceTagInput,
  SetLineItemTagInput,
  Status,
  Token,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export const ClosureReasonSchema = z.enum([
  "CANCELLED",
  "OVERPAID",
  "UNDERPAID",
]);

export const ClosureReasonInputSchema = z.enum([
  "CANCELLED",
  "OVERPAID",
  "UNDERPAID",
]);

export const InvoiceAccountTypeSchema = z.enum([
  "CHECKING",
  "SAVINGS",
  "TRUST",
  "WALLET",
]);

export const InvoiceAccountTypeInputSchema = z.enum([
  "CHECKING",
  "SAVINGS",
  "TRUST",
  "WALLET",
]);

export const StatusSchema = z.enum([
  "ACCEPTED",
  "CANCELLED",
  "DRAFT",
  "ISSUED",
  "PAYMENTCLOSED",
  "PAYMENTISSUE",
  "PAYMENTRECEIVED",
  "PAYMENTSCHEDULED",
  "PAYMENTSENT",
  "REJECTED",
]);

export function AcceptInputSchema(): z.ZodObject<Properties<AcceptInput>> {
  return z.object({
    payAfter: z.iso.datetime().nullish(),
  });
}

export function AddLineItemInputSchema(): z.ZodObject<
  Properties<AddLineItemInput>
> {
  return z.object({
    currency: z.string(),
    description: z.string(),
    id: z.string(),
    quantity: z.number(),
    taxPercent: z.number(),
    totalPriceTaxExcl: z.number(),
    totalPriceTaxIncl: z.number(),
    unitPriceTaxExcl: z.number(),
    unitPriceTaxIncl: z.number(),
  });
}

export function AddPaymentInputSchema(): z.ZodObject<
  Properties<AddPaymentInput>
> {
  return z.object({
    confirmed: z.boolean(),
    id: z.string(),
    issue: z.string().nullish(),
    paymentDate: z.iso.datetime().nullish(),
    processorRef: z.string().nullish(),
    txnRef: z.string().nullish(),
  });
}

export function AddressSchema(): z.ZodObject<Properties<Address>> {
  return z.object({
    __typename: z.literal("Address").optional(),
    city: z.string().nullish(),
    country: z.string().nullish(),
    extendedAddress: z.string().nullish(),
    postalCode: z.string().nullish(),
    stateProvince: z.string().nullish(),
    streetAddress: z.string().nullish(),
  });
}

export function BankSchema(): z.ZodObject<Properties<Bank>> {
  return z.object({
    __typename: z.literal("Bank").optional(),
    ABA: z.string().nullish(),
    BIC: z.string().nullish(),
    SWIFT: z.string().nullish(),
    accountNum: z.string(),
    accountType: InvoiceAccountTypeSchema.nullish(),
    address: z.lazy(() => AddressSchema()),
    beneficiary: z.string().nullish(),
    intermediaryBank: z.lazy(() => IntermediaryBankSchema().nullish()),
    memo: z.string().nullish(),
    name: z.string(),
  });
}

export function CancelInputSchema(): z.ZodObject<Properties<CancelInput>> {
  return z.object({
    _placeholder: z.string().nullish(),
  });
}

export function ClosePaymentInputSchema(): z.ZodObject<
  Properties<ClosePaymentInput>
> {
  return z.object({
    closureReason: ClosureReasonInputSchema.nullish(),
  });
}

export function ConfirmPaymentInputSchema(): z.ZodObject<
  Properties<ConfirmPaymentInput>
> {
  return z.object({
    amount: z.number(),
    id: z.string(),
  });
}

export function ContactInfoSchema(): z.ZodObject<Properties<ContactInfo>> {
  return z.object({
    __typename: z.literal("ContactInfo").optional(),
    email: z.string().nullish(),
    tel: z.string().nullish(),
  });
}

export function DeleteLineItemInputSchema(): z.ZodObject<
  Properties<DeleteLineItemInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function EditInvoiceInputSchema(): z.ZodObject<
  Properties<EditInvoiceInput>
> {
  return z.object({
    currency: z.string().nullish(),
    dateDelivered: z.string().nullish(),
    dateDue: z.string().nullish(),
    dateIssued: z.string().nullish(),
    invoiceNo: z.string().nullish(),
    notes: z.string().nullish(),
  });
}

export function EditIssuerBankInputSchema(): z.ZodObject<
  Properties<EditIssuerBankInput>
> {
  return z.object({
    ABA: z.string().nullish(),
    ABAIntermediary: z.string().nullish(),
    BIC: z.string().nullish(),
    BICIntermediary: z.string().nullish(),
    SWIFT: z.string().nullish(),
    SWIFTIntermediary: z.string().nullish(),
    accountNum: z.string().nullish(),
    accountNumIntermediary: z.string().nullish(),
    accountType: InvoiceAccountTypeInputSchema.nullish(),
    accountTypeIntermediary: InvoiceAccountTypeInputSchema.nullish(),
    beneficiary: z.string().nullish(),
    beneficiaryIntermediary: z.string().nullish(),
    city: z.string().nullish(),
    cityIntermediary: z.string().nullish(),
    country: z.string().nullish(),
    countryIntermediary: z.string().nullish(),
    extendedAddress: z.string().nullish(),
    extendedAddressIntermediary: z.string().nullish(),
    memo: z.string().nullish(),
    memoIntermediary: z.string().nullish(),
    name: z.string().nullish(),
    nameIntermediary: z.string().nullish(),
    postalCode: z.string().nullish(),
    postalCodeIntermediary: z.string().nullish(),
    stateProvince: z.string().nullish(),
    stateProvinceIntermediary: z.string().nullish(),
    streetAddress: z.string().nullish(),
    streetAddressIntermediary: z.string().nullish(),
  });
}

export function EditIssuerInputSchema(): z.ZodObject<
  Properties<EditIssuerInput>
> {
  return z.object({
    city: z.string().nullish(),
    country: z.string().nullish(),
    email: z.string().nullish(),
    extendedAddress: z.string().nullish(),
    id: z.string().nullish(),
    name: z.string().nullish(),
    postalCode: z.string().nullish(),
    stateProvince: z.string().nullish(),
    streetAddress: z.string().nullish(),
    tel: z.string().nullish(),
  });
}

export function EditIssuerWalletInputSchema(): z.ZodObject<
  Properties<EditIssuerWalletInput>
> {
  return z.object({
    address: z.string().nullish(),
    chainId: z.string().nullish(),
    chainName: z.string().nullish(),
    rpc: z.string().nullish(),
  });
}

export function EditLineItemInputSchema(): z.ZodObject<
  Properties<EditLineItemInput>
> {
  return z.object({
    currency: z.string().nullish(),
    description: z.string().nullish(),
    id: z.string(),
    quantity: z.number().nullish(),
    taxPercent: z.number().nullish(),
    totalPriceTaxExcl: z.number().nullish(),
    totalPriceTaxIncl: z.number().nullish(),
    unitPriceTaxExcl: z.number().nullish(),
    unitPriceTaxIncl: z.number().nullish(),
  });
}

export function EditPayerBankInputSchema(): z.ZodObject<
  Properties<EditPayerBankInput>
> {
  return z.object({
    ABA: z.string().nullish(),
    ABAIntermediary: z.string().nullish(),
    BIC: z.string().nullish(),
    BICIntermediary: z.string().nullish(),
    SWIFT: z.string().nullish(),
    SWIFTIntermediary: z.string().nullish(),
    accountNum: z.string().nullish(),
    accountNumIntermediary: z.string().nullish(),
    accountType: InvoiceAccountTypeInputSchema.nullish(),
    accountTypeIntermediary: InvoiceAccountTypeInputSchema.nullish(),
    beneficiary: z.string().nullish(),
    beneficiaryIntermediary: z.string().nullish(),
    city: z.string().nullish(),
    cityIntermediary: z.string().nullish(),
    country: z.string().nullish(),
    countryIntermediary: z.string().nullish(),
    extendedAddress: z.string().nullish(),
    extendedAddressIntermediary: z.string().nullish(),
    memo: z.string().nullish(),
    memoIntermediary: z.string().nullish(),
    name: z.string().nullish(),
    nameIntermediary: z.string().nullish(),
    postalCode: z.string().nullish(),
    postalCodeIntermediary: z.string().nullish(),
    stateProvince: z.string().nullish(),
    stateProvinceIntermediary: z.string().nullish(),
    streetAddress: z.string().nullish(),
    streetAddressIntermediary: z.string().nullish(),
  });
}

export function EditPayerInputSchema(): z.ZodObject<
  Properties<EditPayerInput>
> {
  return z.object({
    city: z.string().nullish(),
    country: z.string().nullish(),
    email: z.string().nullish(),
    extendedAddress: z.string().nullish(),
    id: z.string().nullish(),
    name: z.string().nullish(),
    postalCode: z.string().nullish(),
    stateProvince: z.string().nullish(),
    streetAddress: z.string().nullish(),
    tel: z.string().nullish(),
  });
}

export function EditPayerWalletInputSchema(): z.ZodObject<
  Properties<EditPayerWalletInput>
> {
  return z.object({
    address: z.string().nullish(),
    chainId: z.string().nullish(),
    chainName: z.string().nullish(),
    rpc: z.string().nullish(),
  });
}

export function EditPaymentDataInputSchema(): z.ZodObject<
  Properties<EditPaymentDataInput>
> {
  return z.object({
    confirmed: z.boolean(),
    id: z.string(),
    issue: z.string().nullish(),
    paymentDate: z.iso.datetime().nullish(),
    processorRef: z.string().nullish(),
    txnRef: z.string().nullish(),
  });
}

export function EditStatusInputSchema(): z.ZodObject<
  Properties<EditStatusInput>
> {
  return z.object({
    status: StatusSchema,
  });
}

export function ExportedDataSchema(): z.ZodObject<Properties<ExportedData>> {
  return z.object({
    __typename: z.literal("ExportedData").optional(),
    exportedLineItems: z.array(z.array(z.string())),
    timestamp: z.iso.datetime().nullish(),
  });
}

export function IntermediaryBankSchema(): z.ZodObject<
  Properties<IntermediaryBank>
> {
  return z.object({
    __typename: z.literal("IntermediaryBank").optional(),
    ABA: z.string().nullish(),
    BIC: z.string().nullish(),
    SWIFT: z.string().nullish(),
    accountNum: z.string(),
    accountType: InvoiceAccountTypeSchema.nullish(),
    address: z.lazy(() => AddressSchema()),
    beneficiary: z.string().nullish(),
    memo: z.string().nullish(),
    name: z.string(),
  });
}

export function InvoiceLineItemSchema(): z.ZodObject<
  Properties<InvoiceLineItem>
> {
  return z.object({
    __typename: z.literal("InvoiceLineItem").optional(),
    currency: z.string(),
    description: z.string(),
    id: z.string(),
    lineItemTag: z.array(z.lazy(() => InvoiceTagSchema())).nullish(),
    quantity: z.number(),
    taxPercent: z.number(),
    totalPriceTaxExcl: z.number(),
    totalPriceTaxIncl: z.number(),
    unitPriceTaxExcl: z.number(),
    unitPriceTaxIncl: z.number(),
  });
}

export function InvoiceStateSchema(): z.ZodObject<Properties<InvoiceState>> {
  return z.object({
    __typename: z.literal("InvoiceState").optional(),
    closureReason: ClosureReasonSchema.nullish(),
    currency: z.string(),
    dateDelivered: z.iso.datetime().nullish(),
    dateDue: z.iso.datetime().nullish(),
    dateIssued: z.iso.datetime().nullish(),
    exported: z.lazy(() => ExportedDataSchema()),
    invoiceNo: z.string(),
    invoiceTags: z.array(z.lazy(() => InvoiceTagSchema())),
    issuer: z.lazy(() => LegalEntitySchema()),
    lineItems: z.array(z.lazy(() => InvoiceLineItemSchema())),
    notes: z.string().nullish(),
    payAfter: z.iso.datetime().nullish(),
    payer: z.lazy(() => LegalEntitySchema()),
    payments: z.array(z.lazy(() => PaymentSchema())),
    rejections: z.array(z.lazy(() => RejectionSchema())),
    status: StatusSchema,
    totalPriceTaxExcl: z.number(),
    totalPriceTaxIncl: z.number(),
  });
}

export function InvoiceTagSchema(): z.ZodObject<Properties<InvoiceTag>> {
  return z.object({
    __typename: z.literal("InvoiceTag").optional(),
    dimension: z.string(),
    label: z.string().nullish(),
    value: z.string(),
  });
}

export function InvoiceWalletSchema(): z.ZodObject<Properties<InvoiceWallet>> {
  return z.object({
    __typename: z.literal("InvoiceWallet").optional(),
    address: z.string().nullish(),
    chainId: z.string().nullish(),
    chainName: z.string().nullish(),
    rpc: z.string().nullish(),
  });
}

export function IssueInputSchema(): z.ZodObject<Properties<IssueInput>> {
  return z.object({
    dateIssued: z.string(),
    invoiceNo: z.string(),
  });
}

export function LegalEntitySchema(): z.ZodObject<Properties<LegalEntity>> {
  return z.object({
    __typename: z.literal("LegalEntity").optional(),
    address: z.lazy(() => AddressSchema().nullish()),
    contactInfo: z.lazy(() => ContactInfoSchema().nullish()),
    country: z.string().nullish(),
    id: z.lazy(() => LegalEntityIdSchema().nullish()),
    name: z.string().nullish(),
    paymentRouting: z.lazy(() => PaymentRoutingSchema().nullish()),
  });
}

export function LegalEntityIdSchema(): z.ZodObject<Properties<LegalEntityId>> {
  return z.object({
    __typename: z.literal("LegalEntityId").optional(),
    corpRegId: z.string().nullish(),
    taxId: z.string().nullish(),
  });
}

export function PaymentSchema(): z.ZodObject<Properties<Payment>> {
  return z.object({
    __typename: z.literal("Payment").optional(),
    amount: z.number().nullish(),
    confirmed: z.boolean(),
    id: z.string(),
    issue: z.string().nullish(),
    paymentDate: z.iso.datetime().nullish(),
    processorRef: z.string().nullish(),
    txnRef: z.string().nullish(),
  });
}

export function PaymentRoutingSchema(): z.ZodObject<
  Properties<PaymentRouting>
> {
  return z.object({
    __typename: z.literal("PaymentRouting").optional(),
    bank: z.lazy(() => BankSchema().nullish()),
    wallet: z.lazy(() => InvoiceWalletSchema().nullish()),
  });
}

export function ReapprovePaymentInputSchema(): z.ZodObject<
  Properties<ReapprovePaymentInput>
> {
  return z.object({
    _placeholder: z.string().nullish(),
  });
}

export function RegisterPaymentTxInputSchema(): z.ZodObject<
  Properties<RegisterPaymentTxInput>
> {
  return z.object({
    id: z.string(),
    timestamp: z.iso.datetime(),
    txRef: z.string(),
  });
}

export function ReinstateInputSchema(): z.ZodObject<
  Properties<ReinstateInput>
> {
  return z.object({
    _placeholder: z.string().nullish(),
  });
}

export function RejectInputSchema(): z.ZodObject<Properties<RejectInput>> {
  return z.object({
    final: z.boolean(),
    id: z.string(),
    reason: z.string(),
  });
}

export function RejectionSchema(): z.ZodObject<Properties<Rejection>> {
  return z.object({
    __typename: z.literal("Rejection").optional(),
    final: z.boolean(),
    id: z.string(),
    reason: z.string(),
  });
}

export function ReportPaymentIssueInputSchema(): z.ZodObject<
  Properties<ReportPaymentIssueInput>
> {
  return z.object({
    id: z.string(),
    issue: z.string(),
  });
}

export function ResetInputSchema(): z.ZodObject<Properties<ResetInput>> {
  return z.object({
    _placeholder: z.string().nullish(),
  });
}

export function SchedulePaymentInputSchema(): z.ZodObject<
  Properties<SchedulePaymentInput>
> {
  return z.object({
    id: z.string(),
    paymentDate: z.iso.datetime().nullish(),
    processorRef: z.string(),
  });
}

export function SetExportedDataInputSchema(): z.ZodObject<
  Properties<SetExportedDataInput>
> {
  return z.object({
    exportedLineItems: z.array(z.array(z.string())),
    timestamp: z.iso.datetime(),
  });
}

export function SetInvoiceTagInputSchema(): z.ZodObject<
  Properties<SetInvoiceTagInput>
> {
  return z.object({
    dimension: z.string(),
    label: z.string().nullish(),
    value: z.string(),
  });
}

export function SetLineItemTagInputSchema(): z.ZodObject<
  Properties<SetLineItemTagInput>
> {
  return z.object({
    dimension: z.string(),
    label: z.string().nullish(),
    lineItemId: z.string(),
    value: z.string(),
  });
}

export function TokenSchema(): z.ZodObject<Properties<Token>> {
  return z.object({
    __typename: z.literal("Token").optional(),
    chainId: z.string().nullish(),
    chainName: z.string().nullish(),
    evmAddress: z.string().nullish(),
    rpc: z.string().nullish(),
    symbol: z.string().nullish(),
  });
}
