/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  EditIssuerBankInput,
  EditIssuerInput,
  EditIssuerWalletInput,
  EditPayerBankInput,
  EditPayerInput,
  EditPayerWalletInput,
} from "../types.js";

export type EditIssuerBankAction = Action & {
  type: "EDIT_ISSUER_BANK";
  input: EditIssuerBankInput;
};
export type EditIssuerAction = Action & {
  type: "EDIT_ISSUER";
  input: EditIssuerInput;
};
export type EditIssuerWalletAction = Action & {
  type: "EDIT_ISSUER_WALLET";
  input: EditIssuerWalletInput;
};
export type EditPayerBankAction = Action & {
  type: "EDIT_PAYER_BANK";
  input: EditPayerBankInput;
};
export type EditPayerAction = Action & {
  type: "EDIT_PAYER";
  input: EditPayerInput;
};
export type EditPayerWalletAction = Action & {
  type: "EDIT_PAYER_WALLET";
  input: EditPayerWalletInput;
};

export type InvoicePartiesAction =
  | EditIssuerBankAction
  | EditIssuerAction
  | EditIssuerWalletAction
  | EditPayerBankAction
  | EditPayerAction
  | EditPayerWalletAction;
