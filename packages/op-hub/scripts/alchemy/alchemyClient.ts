/**
 * Main Alchemy API client following repository patterns
 */

import type {
  AlchemyResponse,
  AlchemyErrorResponse,
  GetAssetTransfersParams,
  BlockResponse,
  TransactionEntry,
} from "./alchemyTypes.js";
import { SUPPORTED_TOKEN_CONTRACTS } from "./alchemyTypes.js";
import {
  withRetry,
  isValidEthereumAddress,
  convertToTransactionEntry,
  validateEnvironment,
} from "./alchemyHelpers.js";

export class AlchemyClient {
  private apiKey: string;
  private network: string;
  private baseURL: string;

  constructor(apiKey?: string) {
    const env = validateEnvironment();
    this.apiKey = apiKey || env.apiKey;
    this.network = env.network;
    this.baseURL = `https://eth-${this.network}.g.alchemy.com/v2/${this.apiKey}`;

    console.log(`[AlchemyClient] Initialized for network: ${this.network}`);
  }

  /**
   * Fetch asset transfers using Alchemy's getAssetTransfers method
   */
  async getAssetTransfers(
    params: GetAssetTransfersParams,
  ): Promise<AlchemyResponse> {
    return withRetry(
      async () => {
        const data = {
          jsonrpc: "2.0",
          id: 0,
          method: "alchemy_getAssetTransfers",
          params: [params],
        };

        const response = await fetch(this.baseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(
            `Alchemy API error: ${response.status} - ${response.statusText}`,
          );
        }

        const result = (await response.json()) as
          | AlchemyResponse
          | AlchemyErrorResponse;

        if ("error" in result) {
          throw new Error(`Alchemy RPC error: ${result.error.message}`);
        }

        return result;
      },
      3,
      1000,
      "getAssetTransfers",
    );
  }

  /**
   * Get block timestamp using eth_getBlockByNumber
   */
  async getBlockTimestamp(blockNumber: string): Promise<number> {
    return withRetry(
      async () => {
        const data = {
          jsonrpc: "2.0",
          id: 0,
          method: "eth_getBlockByNumber",
          params: [blockNumber, false], // false = don't include full transaction objects
        };

        const response = await fetch(this.baseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(
            `Alchemy API error: ${response.status} - ${response.statusText}`,
          );
        }

        const result = (await response.json()) as BlockResponse;

        if ("error" in result) {
          throw new Error(
            `Alchemy RPC error: ${(result as any).error.message}`,
          );
        }

        // Convert hex timestamp to number (seconds) then to milliseconds
        const timestampHex = result.result.timestamp;
        const timestampSeconds = parseInt(timestampHex, 16);
        return timestampSeconds * 1000; // Convert to milliseconds
      },
      3,
      1000,
      `getBlockTimestamp(${blockNumber})`,
    );
  }

  /**
   * Get timestamps for multiple blocks efficiently (batch unique blocks)
   */
  async getBlockTimestamps(
    blockNumbers: string[],
  ): Promise<Map<string, number>> {
    const uniqueBlocks = [...new Set(blockNumbers)];
    const timestampMap = new Map<string, number>();

    // Fetch timestamps for unique blocks in parallel (but limit concurrency)
    const BATCH_SIZE = 5; // Limit concurrent requests to avoid rate limiting

    for (let i = 0; i < uniqueBlocks.length; i += BATCH_SIZE) {
      const batch = uniqueBlocks.slice(i, i + BATCH_SIZE);
      const promises = batch.map(async (blockNum) => {
        try {
          const timestamp = await this.getBlockTimestamp(blockNum);
          timestampMap.set(blockNum, timestamp);
        } catch (error) {
          console.warn(
            `[AlchemyClient] Failed to fetch timestamp for block ${blockNum}, using current time:`,
            (error as Error).message,
          );
          timestampMap.set(blockNum, Date.now());
        }
      });

      await Promise.all(promises);
    }

    return timestampMap;
  }

  /**
   * Get formatted transactions ready for document model creation
   */
  async getFormattedTransactions(
    address: string,
    options: {
      fromBlock?: string;
      includeERC20?: boolean;
      includeExternal?: boolean;
      includeInternal?: boolean;
      maxCount?: number;
    } = {},
  ): Promise<TransactionEntry[]> {
    if (!isValidEthereumAddress(address)) {
      throw new Error(`Invalid Ethereum address format: ${address}`);
    }

    const {
      fromBlock = "0x0",
      includeERC20 = true,
      includeExternal = true,
      includeInternal = false,
      maxCount = 100,
    } = options;

    const categories: (
      | "external"
      | "internal"
      | "erc20"
      | "erc721"
      | "erc1155"
    )[] = [];
    if (includeExternal) categories.push("external");
    if (includeInternal) categories.push("internal");
    if (includeERC20) categories.push("erc20");

    if (categories.length === 0) {
      throw new Error("At least one transaction category must be included");
    }

    const params: GetAssetTransfersParams = {
      fromBlock,
      fromAddress: address,
      category: categories,
      excludeZeroValue: true,
      maxCount: `0x${maxCount.toString(16)}`,
      // Filter to only supported tokens for ERC20 transactions
      ...(includeERC20 && {
        contractAddresses: Object.values(SUPPORTED_TOKEN_CONTRACTS),
      }),
    };

    try {
      const response = await this.getAssetTransfers(params);
      const transfers = response.result.transfers;

      // Get block numbers for timestamp fetching
      const blockNumbers = transfers.map((t) => t.blockNum);
      const timestampMap = await this.getBlockTimestamps(blockNumbers);

      // Convert transfers with actual timestamps
      return transfers.map((transfer) => {
        const blockTimestamp = timestampMap.get(transfer.blockNum);
        return convertToTransactionEntry(transfer, address, blockTimestamp);
      });
    } catch (error) {
      console.error(
        `[AlchemyClient] Failed to fetch transactions for address ${address}:`,
        (error as Error).message,
      );
      throw new Error(
        `Failed to fetch transactions: ${(error as Error).message}`,
      );
    }
  }

  /**
   * Get transactions where the address is the receiver (toAddress)
   */
  async getTransactionsToAddress(
    address: string,
    options: {
      fromBlock?: string;
      includeERC20?: boolean;
      includeExternal?: boolean;
      includeInternal?: boolean;
      maxCount?: number;
    } = {},
  ): Promise<TransactionEntry[]> {
    if (!isValidEthereumAddress(address)) {
      throw new Error(`Invalid Ethereum address format: ${address}`);
    }

    const {
      fromBlock = "0x0",
      includeERC20 = true,
      includeExternal = true,
      includeInternal = false,
      maxCount = 100,
    } = options;

    const categories: (
      | "external"
      | "internal"
      | "erc20"
      | "erc721"
      | "erc1155"
    )[] = [];
    if (includeExternal) categories.push("external");
    if (includeInternal) categories.push("internal");
    if (includeERC20) categories.push("erc20");

    if (categories.length === 0) {
      throw new Error("At least one transaction category must be included");
    }

    const params: GetAssetTransfersParams = {
      fromBlock,
      toAddress: address, // Use toAddress instead of fromAddress
      category: categories,
      excludeZeroValue: true,
      maxCount: `0x${maxCount.toString(16)}`,
      // Filter to only supported tokens for ERC20 transactions
      ...(includeERC20 && {
        contractAddresses: Object.values(SUPPORTED_TOKEN_CONTRACTS),
      }),
    };

    try {
      const response = await this.getAssetTransfers(params);
      const transfers = response.result.transfers;

      // Get block numbers for timestamp fetching
      const blockNumbers = transfers.map((t) => t.blockNum);
      const timestampMap = await this.getBlockTimestamps(blockNumbers);

      // Convert transfers with actual timestamps
      return transfers.map((transfer) => {
        const blockTimestamp = timestampMap.get(transfer.blockNum);
        return convertToTransactionEntry(transfer, address, blockTimestamp);
      });
    } catch (error) {
      console.error(
        `[AlchemyClient] Failed to fetch transactions to address ${address}:`,
        (error as Error).message,
      );
      throw new Error(
        `Failed to fetch transactions: ${(error as Error).message}`,
      );
    }
  }

  /**
   * Fetch both outgoing and incoming transactions for an address
   */
  async getAllTransactionsForAddress(
    address: string,
    options: {
      fromBlock?: string;
      includeERC20?: boolean;
      includeExternal?: boolean;
      includeInternal?: boolean;
      maxCount?: number;
    } = {},
  ): Promise<{
    transactions: TransactionEntry[];
    summary: { outgoing: number; incoming: number; unique: number };
  }> {
    try {
      // Fetch both outgoing and incoming transactions in parallel
      const [outgoingTxs, incomingTxs] = await Promise.all([
        this.getFormattedTransactions(address, options),
        this.getTransactionsToAddress(address, options),
      ]);

      // Combine and deduplicate transactions by uniqueId
      // Note: uniqueId includes log index, so multiple ERC20 transfers in same txHash are preserved
      const allTransactions = [...outgoingTxs, ...incomingTxs];

      const uniqueTransactions = allTransactions.filter(
        (tx, index, self) =>
          index === self.findIndex((t) => t.uniqueId === tx.uniqueId),
      );

      const summary = {
        outgoing: outgoingTxs.length,
        incoming: incomingTxs.length,
        unique: uniqueTransactions.length,
      };

      console.log(
        `[AlchemyClient] Fetched ${summary.outgoing} outgoing + ${summary.incoming} incoming = ${summary.unique} unique transactions (${allTransactions.length - summary.unique} duplicates removed)`,
      );

      return {
        transactions: uniqueTransactions,
        summary,
      };
    } catch (error) {
      console.error(
        `[AlchemyClient] Failed to fetch all transactions for address ${address}:`,
        (error as Error).message,
      );
      throw error;
    }
  }
}

// Export singleton instance (lazy-loaded to avoid environment variable issues)
let _alchemyClient: AlchemyClient | null = null;
export const alchemyClient = {
  get instance(): AlchemyClient {
    if (!_alchemyClient) {
      _alchemyClient = new AlchemyClient();
    }
    return _alchemyClient;
  },
};
