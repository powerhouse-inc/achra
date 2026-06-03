/**
 * Environment-aware Alchemy integration for AccountTransactions
 * Follows the contributor-billing pattern for local/remote compatibility
 */

import {
  getAlchemyGraphQLEndpoint,
  isLocalEnvironment,
} from "../../scripts/alchemy/alchemyEnvironment.js";

export interface AlchemyIntegrationResult {
  success: boolean;
  transactionsAdded: number;
  message: string;
}

export interface AlchemyTransactionData {
  counterParty: string;
  amount: string | { value: string; unit: string }; // Amount_Currency scalar as string or object
  txHash: string;
  token: string;
  blockNumber: number;
  uniqueId?: string; // Alchemy's unique identifier for deduplication
  datetime: string;
  accountingPeriod: string;
  from: string; // From address for direction calculation
  to: string; // To address for direction calculation
  direction: string; // Transaction direction: INFLOW or OUTFLOW
}

export interface AlchemyTransactionsResult {
  success: boolean;
  transactions: AlchemyTransactionData[];
  message: string;
  transactionsCount: number;
}

export class AlchemyIntegrationService {
  private graphqlEndpoint: string;
  private isLocal: boolean;

  constructor() {
    this.graphqlEndpoint = getAlchemyGraphQLEndpoint();
    this.isLocal = isLocalEnvironment();
  }

  /**
   * Get transaction data from Alchemy via GraphQL resolver (without document dependency)
   * Works in both local Connect and remote Switchboard environments
   */
  async getTransactionsFromAlchemy(
    address: string,
    fromBlock?: string,
  ): Promise<AlchemyTransactionsResult> {
    try {
      const response = await fetch(this.graphqlEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation GetTransactionsFromAlchemy($address: EthereumAddress!, $fromBlock: String) {
              AccountTransactions_getTransactionsFromAlchemy(address: $address, fromBlock: $fromBlock) {
                success
                transactions {
                  counterParty
                  amount
                  txHash
                  token
                  blockNumber
                  uniqueId
                  datetime
                  accountingPeriod
                  to
                  from
                  direction
                }
                message
                transactionsCount
              }
            }
          `,
          variables: {
            address,
            fromBlock,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[AlchemyIntegration] GraphQL endpoint error:`, {
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(
          `GraphQL endpoint error: ${response.status} - ${response.statusText} - ${errorText}`,
        );
      }

      const result = (await response.json()) as {
        errors?: Array<{ message: string }>;
        data?: {
          AccountTransactions_getTransactionsFromAlchemy?: AlchemyTransactionsResult;
        };
      };

      if (result.errors) {
        throw new Error(result.errors[0]?.message || "GraphQL error");
      }

      if (result.data?.AccountTransactions_getTransactionsFromAlchemy) {
        return result.data.AccountTransactions_getTransactionsFromAlchemy;
      } else {
        throw new Error("Failed to get transactions from Alchemy");
      }
    } catch (error) {
      console.error(
        `[AlchemyIntegration] Error in ${this.isLocal ? "local" : "remote"} mode:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Fetch transactions from Alchemy via GraphQL resolver
   * Works in both local Connect and remote Switchboard environments
   */
  async fetchTransactionsForDocument(
    docId: string,
    address: string,
    fromBlock?: string,
  ): Promise<AlchemyIntegrationResult> {
    try {
      const response = await fetch(this.graphqlEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation FetchTransactionsFromAlchemy($docId: PHID!, $address: EthereumAddress!, $fromBlock: String) {
              AccountTransactions_fetchTransactionsFromAlchemy(docId: $docId, address: $address, fromBlock: $fromBlock) {
                success
                transactionsAdded
                message
              }
            }
          `,
          variables: {
            docId,
            address,
            fromBlock,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(
          `GraphQL endpoint error: ${response.status} - ${response.statusText}`,
        );
      }

      const result = (await response.json()) as {
        errors?: Array<{ message: string }>;
        data?: {
          AccountTransactions_fetchTransactionsFromAlchemy?: AlchemyIntegrationResult;
        };
      };

      if (result.errors) {
        throw new Error(result.errors[0]?.message || "GraphQL error");
      }

      if (
        result.data?.AccountTransactions_fetchTransactionsFromAlchemy?.success
      ) {
        return result.data.AccountTransactions_fetchTransactionsFromAlchemy;
      } else {
        throw new Error("Failed to fetch transactions from Alchemy");
      }
    } catch (error) {
      console.error(
        `[AlchemyIntegration] Error in ${this.isLocal ? "local" : "remote"} mode:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Get environment information for debugging
   */
  getEnvironmentInfo() {
    return {
      endpoint: this.graphqlEndpoint,
      mode: this.isLocal ? "Local Connect" : "Remote Switchboard",
      isLocal: this.isLocal,
    };
  }
}

// Export singleton instance following the pattern
export const alchemyIntegration = new AlchemyIntegrationService();
