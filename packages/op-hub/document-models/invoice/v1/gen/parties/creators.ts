/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  EditIssuerBankInputSchema,
  EditIssuerInputSchema,
  EditIssuerWalletInputSchema,
  EditPayerBankInputSchema,
  EditPayerInputSchema,
  EditPayerWalletInputSchema,
} from "../schema/zod.js";
import type {
  EditIssuerBankInput,
  EditIssuerInput,
  EditIssuerWalletInput,
  EditPayerBankInput,
  EditPayerInput,
  EditPayerWalletInput,
} from "../types.js";
import type {
  EditIssuerAction,
  EditIssuerBankAction,
  EditIssuerWalletAction,
  EditPayerAction,
  EditPayerBankAction,
  EditPayerWalletAction,
} from "./actions.js";

export const editIssuerBank = (input: EditIssuerBankInput) =>
  createAction<EditIssuerBankAction>(
    "EDIT_ISSUER_BANK",
    { ...input },
    undefined,
    EditIssuerBankInputSchema,
    "global",
  );

export const editIssuer = (input: EditIssuerInput) =>
  createAction<EditIssuerAction>(
    "EDIT_ISSUER",
    { ...input },
    undefined,
    EditIssuerInputSchema,
    "global",
  );

export const editIssuerWallet = (input: EditIssuerWalletInput) =>
  createAction<EditIssuerWalletAction>(
    "EDIT_ISSUER_WALLET",
    { ...input },
    undefined,
    EditIssuerWalletInputSchema,
    "global",
  );

export const editPayerBank = (input: EditPayerBankInput) =>
  createAction<EditPayerBankAction>(
    "EDIT_PAYER_BANK",
    { ...input },
    undefined,
    EditPayerBankInputSchema,
    "global",
  );

export const editPayer = (input: EditPayerInput) =>
  createAction<EditPayerAction>(
    "EDIT_PAYER",
    { ...input },
    undefined,
    EditPayerInputSchema,
    "global",
  );

export const editPayerWallet = (input: EditPayerWalletInput) =>
  createAction<EditPayerWalletAction>(
    "EDIT_PAYER_WALLET",
    { ...input },
    undefined,
    EditPayerWalletInputSchema,
    "global",
  );
