import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition
  """
  type Mutation {
    AccountTransactions_getTransactionsFromAlchemy(
      address: EthereumAddress!
      fromBlock: String
    ): AccountTransactions_AlchemyTransactionsResult
    AccountTransactions_fetchTransactionsFromAlchemy(
      docId: PHID!
      address: EthereumAddress!
      fromBlock: String
    ): AccountTransactions_AlchemyFetchResult
  }

  """
  Alchemy Integration Types
  """
  type AccountTransactions_AlchemyTransactionsResult {
    success: Boolean!
    transactions: [AccountTransactions_TransactionData!]!
    message: String!
    transactionsCount: Int!
  }

  type AccountTransactions_AlchemyFetchResult {
    success: Boolean!
    transactionsAdded: Int!
    message: String!
  }

  type AccountTransactions_TransactionData {
    counterParty: EthereumAddress!
    amount: Amount_Currency!
    txHash: String!
    token: Currency!
    blockNumber: Int!
    uniqueId: String
    datetime: DateTime!
    accountingPeriod: String!
    from: EthereumAddress!
    to: EthereumAddress!
    direction: String!
  }
`;
