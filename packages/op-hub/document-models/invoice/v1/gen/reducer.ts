/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { InvoicePHState } from "document-models/invoice/v1";

import { invoiceGeneralOperations } from "../src/reducers/general.js";
import { invoiceItemsOperations } from "../src/reducers/items.js";
import { invoicePartiesOperations } from "../src/reducers/parties.js";
import { invoiceTransitionsOperations } from "../src/reducers/transitions.js";

import {
  AcceptInputSchema,
  AddLineItemInputSchema,
  AddPaymentInputSchema,
  CancelInputSchema,
  ClosePaymentInputSchema,
  ConfirmPaymentInputSchema,
  DeleteLineItemInputSchema,
  EditInvoiceInputSchema,
  EditIssuerBankInputSchema,
  EditIssuerInputSchema,
  EditIssuerWalletInputSchema,
  EditLineItemInputSchema,
  EditPayerBankInputSchema,
  EditPayerInputSchema,
  EditPayerWalletInputSchema,
  EditPaymentDataInputSchema,
  EditStatusInputSchema,
  IssueInputSchema,
  ReapprovePaymentInputSchema,
  RegisterPaymentTxInputSchema,
  ReinstateInputSchema,
  RejectInputSchema,
  ReportPaymentIssueInputSchema,
  ResetInputSchema,
  SchedulePaymentInputSchema,
  SetExportedDataInputSchema,
  SetInvoiceTagInputSchema,
  SetLineItemTagInputSchema,
} from "./schema/zod.js";

const schemaMemo = new Map<() => unknown, unknown>();

function memoizedSchema<T>(makeSchema: () => T): T {
  let schema = schemaMemo.get(makeSchema) as T | undefined;
  if (schema === undefined) {
    schema = makeSchema();
    schemaMemo.set(makeSchema, schema);
  }
  return schema;
}

const stateReducer: StateReducer<InvoicePHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "EDIT_INVOICE": {
      memoizedSchema(EditInvoiceInputSchema).parse(action.input);

      invoiceGeneralOperations.editInvoiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_PAYMENT": {
      memoizedSchema(AddPaymentInputSchema).parse(action.input);

      invoiceGeneralOperations.addPaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_PAYMENT_DATA": {
      memoizedSchema(EditPaymentDataInputSchema).parse(action.input);

      invoiceGeneralOperations.editPaymentDataOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_STATUS": {
      memoizedSchema(EditStatusInputSchema).parse(action.input);

      invoiceGeneralOperations.editStatusOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_EXPORTED_DATA": {
      memoizedSchema(SetExportedDataInputSchema).parse(action.input);

      invoiceGeneralOperations.setExportedDataOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_ISSUER_BANK": {
      memoizedSchema(EditIssuerBankInputSchema).parse(action.input);

      invoicePartiesOperations.editIssuerBankOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_ISSUER": {
      memoizedSchema(EditIssuerInputSchema).parse(action.input);

      invoicePartiesOperations.editIssuerOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_ISSUER_WALLET": {
      memoizedSchema(EditIssuerWalletInputSchema).parse(action.input);

      invoicePartiesOperations.editIssuerWalletOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_PAYER_BANK": {
      memoizedSchema(EditPayerBankInputSchema).parse(action.input);

      invoicePartiesOperations.editPayerBankOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_PAYER": {
      memoizedSchema(EditPayerInputSchema).parse(action.input);

      invoicePartiesOperations.editPayerOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_PAYER_WALLET": {
      memoizedSchema(EditPayerWalletInputSchema).parse(action.input);

      invoicePartiesOperations.editPayerWalletOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_LINE_ITEM": {
      memoizedSchema(AddLineItemInputSchema).parse(action.input);

      invoiceItemsOperations.addLineItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_LINE_ITEM": {
      memoizedSchema(DeleteLineItemInputSchema).parse(action.input);

      invoiceItemsOperations.deleteLineItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_LINE_ITEM": {
      memoizedSchema(EditLineItemInputSchema).parse(action.input);

      invoiceItemsOperations.editLineItemOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_INVOICE_TAG": {
      memoizedSchema(SetInvoiceTagInputSchema).parse(action.input);

      invoiceItemsOperations.setInvoiceTagOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_LINE_ITEM_TAG": {
      memoizedSchema(SetLineItemTagInputSchema).parse(action.input);

      invoiceItemsOperations.setLineItemTagOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ACCEPT": {
      memoizedSchema(AcceptInputSchema).parse(action.input);

      invoiceTransitionsOperations.acceptOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CANCEL": {
      memoizedSchema(CancelInputSchema).parse(action.input);

      invoiceTransitionsOperations.cancelOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CLOSE_PAYMENT": {
      memoizedSchema(ClosePaymentInputSchema).parse(action.input);

      invoiceTransitionsOperations.closePaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CONFIRM_PAYMENT": {
      memoizedSchema(ConfirmPaymentInputSchema).parse(action.input);

      invoiceTransitionsOperations.confirmPaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ISSUE": {
      memoizedSchema(IssueInputSchema).parse(action.input);

      invoiceTransitionsOperations.issueOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REAPPROVE_PAYMENT": {
      memoizedSchema(ReapprovePaymentInputSchema).parse(action.input);

      invoiceTransitionsOperations.reapprovePaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REGISTER_PAYMENT_TX": {
      memoizedSchema(RegisterPaymentTxInputSchema).parse(action.input);

      invoiceTransitionsOperations.registerPaymentTxOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REINSTATE": {
      memoizedSchema(ReinstateInputSchema).parse(action.input);

      invoiceTransitionsOperations.reinstateOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REJECT": {
      memoizedSchema(RejectInputSchema).parse(action.input);

      invoiceTransitionsOperations.rejectOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REPORT_PAYMENT_ISSUE": {
      memoizedSchema(ReportPaymentIssueInputSchema).parse(action.input);

      invoiceTransitionsOperations.reportPaymentIssueOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "RESET": {
      memoizedSchema(ResetInputSchema).parse(action.input);

      invoiceTransitionsOperations.resetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SCHEDULE_PAYMENT": {
      memoizedSchema(SchedulePaymentInputSchema).parse(action.input);

      invoiceTransitionsOperations.schedulePaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    default:
      return state;
  }
};

export const reducer: Reducer<InvoicePHState> = createReducer(stateReducer);
