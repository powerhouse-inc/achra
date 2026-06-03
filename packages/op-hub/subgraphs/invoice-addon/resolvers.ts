import type { BaseSubgraph } from "@powerhousedao/reactor-api";
import {
  Invoice_processGnosisPayment,
  Invoice_createRequestFinancePayment,
  Invoice_uploadInvoicePdfChunk,
} from "./customResolvers.js";

export const getResolvers = (
  _subgraph: BaseSubgraph,
): Record<string, unknown> => {
  return {
    Mutation: {
      Invoice_processGnosisPayment: Invoice_processGnosisPayment,
      Invoice_createRequestFinancePayment: Invoice_createRequestFinancePayment,
      Invoice_uploadInvoicePdfChunk: Invoice_uploadInvoicePdfChunk,
    },
  };
};
