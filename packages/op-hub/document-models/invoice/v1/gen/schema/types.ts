export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Amount: {
    input: { unit?: string; value?: number };
    output: { unit?: string; value?: number };
  };
  Amount_Crypto: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Currency: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Fiat: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Attachment: { input: string; output: string };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
  Unknown: { input: unknown; output: unknown };
  Upload: { input: File; output: File };
};

export type AcceptInput = {
  payAfter?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type AddLineItemInput = {
  currency: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  id: Scalars["OID"]["input"];
  quantity: Scalars["Float"]["input"];
  taxPercent: Scalars["Float"]["input"];
  totalPriceTaxExcl: Scalars["Float"]["input"];
  totalPriceTaxIncl: Scalars["Float"]["input"];
  unitPriceTaxExcl: Scalars["Float"]["input"];
  unitPriceTaxIncl: Scalars["Float"]["input"];
};

export type AddPaymentInput = {
  confirmed: Scalars["Boolean"]["input"];
  id: Scalars["OID"]["input"];
  issue?: InputMaybe<Scalars["String"]["input"]>;
  paymentDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  processorRef?: InputMaybe<Scalars["String"]["input"]>;
  txnRef?: InputMaybe<Scalars["String"]["input"]>;
};

export type Address = {
  city: Maybe<Scalars["String"]["output"]>;
  country: Maybe<Scalars["String"]["output"]>;
  extendedAddress: Maybe<Scalars["String"]["output"]>;
  postalCode: Maybe<Scalars["String"]["output"]>;
  stateProvince: Maybe<Scalars["String"]["output"]>;
  streetAddress: Maybe<Scalars["String"]["output"]>;
};

export type Bank = {
  ABA: Maybe<Scalars["String"]["output"]>;
  BIC: Maybe<Scalars["String"]["output"]>;
  SWIFT: Maybe<Scalars["String"]["output"]>;
  accountNum: Scalars["String"]["output"];
  accountType: Maybe<InvoiceAccountType>;
  address: Address;
  beneficiary: Maybe<Scalars["String"]["output"]>;
  intermediaryBank: Maybe<IntermediaryBank>;
  memo: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
};

export type CancelInput = {
  /** Add your inputs here */
  _placeholder?: InputMaybe<Scalars["String"]["input"]>;
};

export type ClosePaymentInput = {
  closureReason?: InputMaybe<ClosureReasonInput>;
};

export type ClosureReason = "CANCELLED" | "OVERPAID" | "UNDERPAID";

export type ClosureReasonInput = "CANCELLED" | "OVERPAID" | "UNDERPAID";

export type ConfirmPaymentInput = {
  amount: Scalars["Float"]["input"];
  id: Scalars["OID"]["input"];
};

export type ContactInfo = {
  email: Maybe<Scalars["String"]["output"]>;
  tel: Maybe<Scalars["String"]["output"]>;
};

export type DeleteLineItemInput = {
  id: Scalars["OID"]["input"];
};

export type EditInvoiceInput = {
  currency?: InputMaybe<Scalars["String"]["input"]>;
  dateDelivered?: InputMaybe<Scalars["String"]["input"]>;
  dateDue?: InputMaybe<Scalars["String"]["input"]>;
  dateIssued?: InputMaybe<Scalars["String"]["input"]>;
  invoiceNo?: InputMaybe<Scalars["String"]["input"]>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditIssuerBankInput = {
  ABA?: InputMaybe<Scalars["String"]["input"]>;
  ABAIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  BIC?: InputMaybe<Scalars["String"]["input"]>;
  BICIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  SWIFT?: InputMaybe<Scalars["String"]["input"]>;
  SWIFTIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  accountNum?: InputMaybe<Scalars["String"]["input"]>;
  accountNumIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  accountType?: InputMaybe<InvoiceAccountTypeInput>;
  accountTypeIntermediary?: InputMaybe<InvoiceAccountTypeInput>;
  beneficiary?: InputMaybe<Scalars["String"]["input"]>;
  beneficiaryIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  city?: InputMaybe<Scalars["String"]["input"]>;
  cityIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  countryIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  extendedAddress?: InputMaybe<Scalars["String"]["input"]>;
  extendedAddressIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  memo?: InputMaybe<Scalars["String"]["input"]>;
  memoIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  nameIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  postalCode?: InputMaybe<Scalars["String"]["input"]>;
  postalCodeIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  stateProvince?: InputMaybe<Scalars["String"]["input"]>;
  stateProvinceIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  streetAddress?: InputMaybe<Scalars["String"]["input"]>;
  streetAddressIntermediary?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditIssuerInput = {
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  extendedAddress?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  postalCode?: InputMaybe<Scalars["String"]["input"]>;
  stateProvince?: InputMaybe<Scalars["String"]["input"]>;
  streetAddress?: InputMaybe<Scalars["String"]["input"]>;
  tel?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditIssuerWalletInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  chainId?: InputMaybe<Scalars["String"]["input"]>;
  chainName?: InputMaybe<Scalars["String"]["input"]>;
  rpc?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditLineItemInput = {
  currency?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  quantity?: InputMaybe<Scalars["Float"]["input"]>;
  taxPercent?: InputMaybe<Scalars["Float"]["input"]>;
  totalPriceTaxExcl?: InputMaybe<Scalars["Float"]["input"]>;
  totalPriceTaxIncl?: InputMaybe<Scalars["Float"]["input"]>;
  unitPriceTaxExcl?: InputMaybe<Scalars["Float"]["input"]>;
  unitPriceTaxIncl?: InputMaybe<Scalars["Float"]["input"]>;
};

export type EditPayerBankInput = {
  ABA?: InputMaybe<Scalars["String"]["input"]>;
  ABAIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  BIC?: InputMaybe<Scalars["String"]["input"]>;
  BICIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  SWIFT?: InputMaybe<Scalars["String"]["input"]>;
  SWIFTIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  accountNum?: InputMaybe<Scalars["String"]["input"]>;
  accountNumIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  accountType?: InputMaybe<InvoiceAccountTypeInput>;
  accountTypeIntermediary?: InputMaybe<InvoiceAccountTypeInput>;
  beneficiary?: InputMaybe<Scalars["String"]["input"]>;
  beneficiaryIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  city?: InputMaybe<Scalars["String"]["input"]>;
  cityIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  countryIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  extendedAddress?: InputMaybe<Scalars["String"]["input"]>;
  extendedAddressIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  memo?: InputMaybe<Scalars["String"]["input"]>;
  memoIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  nameIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  postalCode?: InputMaybe<Scalars["String"]["input"]>;
  postalCodeIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  stateProvince?: InputMaybe<Scalars["String"]["input"]>;
  stateProvinceIntermediary?: InputMaybe<Scalars["String"]["input"]>;
  streetAddress?: InputMaybe<Scalars["String"]["input"]>;
  streetAddressIntermediary?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditPayerInput = {
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  extendedAddress?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  postalCode?: InputMaybe<Scalars["String"]["input"]>;
  stateProvince?: InputMaybe<Scalars["String"]["input"]>;
  streetAddress?: InputMaybe<Scalars["String"]["input"]>;
  tel?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditPayerWalletInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  chainId?: InputMaybe<Scalars["String"]["input"]>;
  chainName?: InputMaybe<Scalars["String"]["input"]>;
  rpc?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditPaymentDataInput = {
  confirmed: Scalars["Boolean"]["input"];
  id: Scalars["OID"]["input"];
  issue?: InputMaybe<Scalars["String"]["input"]>;
  paymentDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  processorRef?: InputMaybe<Scalars["String"]["input"]>;
  txnRef?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditStatusInput = {
  status: Status;
};

export type ExportedData = {
  exportedLineItems: Array<Array<Scalars["String"]["output"]>>;
  timestamp: Maybe<Scalars["DateTime"]["output"]>;
};

export type IntermediaryBank = {
  ABA: Maybe<Scalars["String"]["output"]>;
  BIC: Maybe<Scalars["String"]["output"]>;
  SWIFT: Maybe<Scalars["String"]["output"]>;
  accountNum: Scalars["String"]["output"];
  accountType: Maybe<InvoiceAccountType>;
  address: Address;
  beneficiary: Maybe<Scalars["String"]["output"]>;
  memo: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
};

export type InvoiceAccountType = "CHECKING" | "SAVINGS" | "TRUST" | "WALLET";

export type InvoiceAccountTypeInput =
  | "CHECKING"
  | "SAVINGS"
  | "TRUST"
  | "WALLET";

export type InvoiceLineItem = {
  currency: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["OID"]["output"];
  lineItemTag: Maybe<Array<InvoiceTag>>;
  quantity: Scalars["Float"]["output"];
  taxPercent: Scalars["Float"]["output"];
  totalPriceTaxExcl: Scalars["Float"]["output"];
  totalPriceTaxIncl: Scalars["Float"]["output"];
  unitPriceTaxExcl: Scalars["Float"]["output"];
  unitPriceTaxIncl: Scalars["Float"]["output"];
};

export type InvoiceState = {
  closureReason: Maybe<ClosureReason>;
  currency: Scalars["String"]["output"];
  dateDelivered: Maybe<Scalars["Date"]["output"]>;
  dateDue: Maybe<Scalars["Date"]["output"]>;
  dateIssued: Maybe<Scalars["Date"]["output"]>;
  exported: ExportedData;
  invoiceNo: Scalars["String"]["output"];
  invoiceTags: Array<InvoiceTag>;
  issuer: LegalEntity;
  lineItems: Array<InvoiceLineItem>;
  notes: Maybe<Scalars["String"]["output"]>;
  payAfter: Maybe<Scalars["DateTime"]["output"]>;
  payer: LegalEntity;
  payments: Array<Payment>;
  rejections: Array<Rejection>;
  status: Status;
  totalPriceTaxExcl: Scalars["Float"]["output"];
  totalPriceTaxIncl: Scalars["Float"]["output"];
};

export type InvoiceTag = {
  dimension: Scalars["String"]["output"];
  label: Maybe<Scalars["String"]["output"]>;
  value: Scalars["String"]["output"];
};

export type InvoiceWallet = {
  address: Maybe<Scalars["String"]["output"]>;
  chainId: Maybe<Scalars["String"]["output"]>;
  chainName: Maybe<Scalars["String"]["output"]>;
  rpc: Maybe<Scalars["String"]["output"]>;
};

export type IssueInput = {
  dateIssued: Scalars["String"]["input"];
  invoiceNo: Scalars["String"]["input"];
};

export type LegalEntity = {
  address: Maybe<Address>;
  contactInfo: Maybe<ContactInfo>;
  country: Maybe<Scalars["String"]["output"]>;
  id: Maybe<LegalEntityId>;
  name: Maybe<Scalars["String"]["output"]>;
  paymentRouting: Maybe<PaymentRouting>;
};

export type LegalEntityId = {
  corpRegId: Maybe<Scalars["String"]["output"]>;
  taxId: Maybe<Scalars["String"]["output"]>;
};

export type Payment = {
  amount: Maybe<Scalars["Float"]["output"]>;
  confirmed: Scalars["Boolean"]["output"];
  id: Scalars["OID"]["output"];
  issue: Maybe<Scalars["String"]["output"]>;
  paymentDate: Maybe<Scalars["DateTime"]["output"]>;
  processorRef: Maybe<Scalars["String"]["output"]>;
  txnRef: Maybe<Scalars["String"]["output"]>;
};

export type PaymentRouting = {
  bank: Maybe<Bank>;
  wallet: Maybe<InvoiceWallet>;
};

export type ReapprovePaymentInput = {
  /** Add your inputs here */
  _placeholder?: InputMaybe<Scalars["String"]["input"]>;
};

export type RegisterPaymentTxInput = {
  id: Scalars["OID"]["input"];
  timestamp: Scalars["DateTime"]["input"];
  txRef: Scalars["String"]["input"];
};

export type ReinstateInput = {
  /** Add your inputs here */
  _placeholder?: InputMaybe<Scalars["String"]["input"]>;
};

export type RejectInput = {
  final: Scalars["Boolean"]["input"];
  id: Scalars["OID"]["input"];
  reason: Scalars["String"]["input"];
};

export type Rejection = {
  final: Scalars["Boolean"]["output"];
  id: Scalars["OID"]["output"];
  reason: Scalars["String"]["output"];
};

export type ReportPaymentIssueInput = {
  id: Scalars["OID"]["input"];
  issue: Scalars["String"]["input"];
};

export type ResetInput = {
  /** Add your inputs here */
  _placeholder?: InputMaybe<Scalars["String"]["input"]>;
};

export type SchedulePaymentInput = {
  id: Scalars["OID"]["input"];
  paymentDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  processorRef: Scalars["String"]["input"];
};

export type SetExportedDataInput = {
  exportedLineItems: Array<Array<Scalars["String"]["input"]>>;
  timestamp: Scalars["DateTime"]["input"];
};

export type SetInvoiceTagInput = {
  dimension: Scalars["String"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  value: Scalars["String"]["input"];
};

export type SetLineItemTagInput = {
  dimension: Scalars["String"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  lineItemId: Scalars["OID"]["input"];
  value: Scalars["String"]["input"];
};

export type Status =
  | "ACCEPTED"
  | "CANCELLED"
  | "DRAFT"
  | "ISSUED"
  | "PAYMENTCLOSED"
  | "PAYMENTISSUE"
  | "PAYMENTRECEIVED"
  | "PAYMENTSCHEDULED"
  | "PAYMENTSENT"
  | "REJECTED";

export type Token = {
  chainId: Maybe<Scalars["String"]["output"]>;
  chainName: Maybe<Scalars["String"]["output"]>;
  evmAddress: Maybe<Scalars["String"]["output"]>;
  rpc: Maybe<Scalars["String"]["output"]>;
  symbol: Maybe<Scalars["String"]["output"]>;
};
