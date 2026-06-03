import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition
  """
  type Mutation {
    Invoice_processGnosisPayment(
      chainName: String!
      paymentDetails: JSONObject!
      invoiceNo: String!
    ): ProcessGnosisPaymentOutput
    Invoice_createRequestFinancePayment(
      paymentData: JSONObject!
    ): CreateRequestFinancePaymentOutput
    Invoice_uploadInvoicePdfChunk(
      chunk: String!
      chunkIndex: Int!
      totalChunks: Int!
      fileName: String!
      sessionId: String!
    ): UploadInvoicePdfChunkOutput
  }

  """
  Output type for PDF chunk upload
  """
  type UploadInvoicePdfChunkOutput {
    success: Boolean!
    data: JSONObject
    error: String
  }

  """
  Output type for request finance payment
  """
  type CreateRequestFinancePaymentOutput {
    success: Boolean!
    data: JSONObject
    error: String
  }

  """
  Output type for process gnosis payment
  """
  type ProcessGnosisPaymentOutput {
    success: Boolean!
    data: JSONObject
    error: String
  }
`;
