/**
 * Service for managing wallet accounts and transactions in expense reports
 * Handles creation and linking of Accounts and Account Transactions documents
 */

import { generateId } from "document-model/core";
import type { AccountEntry } from "../../../document-models/accounts/v1/gen/schema/types.js";
import { accountTransactionsService } from "../../accounts-editor/services/accountTransactionsService.js";
import { getGraphQLUrl } from "../../shared/graphql.js";

export interface WalletAccountServiceResult {
  success: boolean;
  accountDocumentId?: string;
  accountTransactionsDocumentId?: string;
  accountId?: string;
  message: string;
}

export class WalletAccountService {
  private graphqlEndpoint: string;

  constructor() {
    this.graphqlEndpoint = this.getGraphQLEndpoint();
  }

  private getGraphQLEndpoint(): string {
    return getGraphQLUrl();
  }

  /**
   * Process wallet addition: ensure Accounts document exists, add account if needed,
   * and create/update Account Transactions document
   */
  async processWalletAddition(
    walletAddress: string,
    walletName: string | undefined,
    driveId: string | undefined,
    allDocuments:
      | Array<{ header: { id: string; documentType: string } }>
      | undefined,
  ): Promise<WalletAccountServiceResult> {
    console.log("[WalletAccountService] Starting wallet addition process", {
      walletAddress,
      walletName,
      driveId,
      documentsCount: allDocuments?.length || 0,
    });

    try {
      // Step 1: Find or create Accounts document
      console.log(
        "[WalletAccountService] Step 1: Finding or creating Accounts document",
        {
          driveId,
          hasDocuments: !!allDocuments,
          documentsCount: allDocuments?.length || 0,
        },
      );

      if (!driveId) {
        console.warn(
          "[WalletAccountService] No driveId provided - documents will be created but not added to drive",
        );
      }

      const accountsDocResult = await this.findOrCreateAccountsDocument(
        driveId,
        allDocuments,
      );

      console.log(
        "[WalletAccountService] Accounts document result:",
        accountsDocResult,
      );

      if (!accountsDocResult.success || !accountsDocResult.documentId) {
        const errorMsg =
          accountsDocResult.message ||
          "Failed to find or create Accounts document";
        console.error("[WalletAccountService] Failed at step 1:", errorMsg);
        return {
          success: false,
          message: errorMsg,
        };
      }

      const accountsDocumentId = accountsDocResult.documentId;

      // Wait for document to be added to drive and processed
      // The UI needs time to detect the new document
      if (driveId) {
        console.log(
          "[WalletAccountService] Waiting for document to be added to drive...",
        );
        // Wait longer to ensure the drive state is updated and UI can refresh
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Step 2: Check if account exists, if not add it
      console.log("[WalletAccountService] Step 2: Finding or adding account");
      const accountResult = await this.findOrAddAccount(
        accountsDocumentId,
        walletAddress,
        walletName || walletAddress,
      );

      console.log("[WalletAccountService] Account result:", accountResult);

      if (!accountResult.success || !accountResult.accountId) {
        const errorMsg =
          accountResult.message || "Failed to find or add account";
        console.error("[WalletAccountService] Failed at step 2:", errorMsg);
        return {
          success: false,
          message: errorMsg,
        };
      }

      const accountId = accountResult.accountId;
      const account = accountResult.account;

      if (!account) {
        const errorMsg = "Account object is missing";
        console.error("[WalletAccountService] Failed at step 2:", errorMsg);
        return {
          success: false,
          message: errorMsg,
        };
      }

      // Step 3: Check if Account Transactions document exists, create/update if needed
      console.log(
        "[WalletAccountService] Step 3: Handling Account Transactions document",
        {
          hasExistingTxnsDoc: !!(
            account.accountTransactionsId &&
            account.accountTransactionsId !== null &&
            account.accountTransactionsId !== ""
          ),
          driveId,
        },
      );
      let accountTransactionsDocumentId: string | undefined;

      if (
        account.accountTransactionsId &&
        account.accountTransactionsId !== null &&
        account.accountTransactionsId !== ""
      ) {
        // Account Transactions document already exists, update it
        console.log(
          "[WalletAccountService] Account Transactions document exists, updating:",
          account.accountTransactionsId,
        );
        accountTransactionsDocumentId = account.accountTransactionsId;
        await this.updateAccountTransactions(
          accountTransactionsDocumentId,
          walletAddress,
        );
      } else {
        // Create new Account Transactions document
        console.log(
          "[WalletAccountService] Creating new Account Transactions document with driveId:",
          driveId,
        );
        const txnsResult =
          await accountTransactionsService.createAccountTransactionsDocument(
            account,
            accountsDocumentId,
            driveId,
          );

        console.log(
          "[WalletAccountService] Account Transactions creation result:",
          txnsResult,
        );

        if (txnsResult.success && txnsResult.documentId) {
          accountTransactionsDocumentId = txnsResult.documentId;
          // Wait for document to be added to drive and processed
          if (driveId) {
            console.log(
              "[WalletAccountService] Waiting for Account Transactions document to be added to drive...",
            );
            // Wait longer to ensure the drive state is updated and UI can refresh
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        } else {
          console.warn(
            "[WalletAccountService] Failed to create Account Transactions document:",
            txnsResult.message,
          );
        }
      }

      const result = {
        success: true,
        accountDocumentId: accountsDocumentId,
        accountTransactionsDocumentId,
        accountId,
        message: "Successfully processed wallet addition",
      };

      console.log(
        "[WalletAccountService] Wallet addition process completed successfully:",
        result,
      );
      return result;
    } catch (error) {
      const errorMsg = `Error processing wallet addition: ${error instanceof Error ? error.message : "Unknown error"}`;
      console.error(
        "[WalletAccountService] Error in processWalletAddition:",
        error,
      );
      return {
        success: false,
        message: errorMsg,
      };
    }
  }

  /**
   * Find existing Accounts document in drive or create a new one
   */
  private async findOrCreateAccountsDocument(
    driveId: string | undefined,
    allDocuments:
      | Array<{ header: { id: string; documentType: string } }>
      | undefined,
  ): Promise<{ success: boolean; documentId?: string; message: string }> {
    console.log("[WalletAccountService] findOrCreateAccountsDocument called", {
      driveId,
      documentsCount: allDocuments?.length || 0,
      documentTypes: allDocuments?.map((d) => d.header.documentType) || [],
    });

    // First, try to find existing Accounts document in the drive
    if (allDocuments && driveId) {
      const accountsDoc = allDocuments.find(
        (doc) => doc.header.documentType === "powerhouse/accounts",
      );

      console.log("[WalletAccountService] Accounts document search result:", {
        found: !!accountsDoc,
        documentId: accountsDoc?.header.id,
      });

      if (accountsDoc) {
        return {
          success: true,
          documentId: accountsDoc.header.id,
          message: "Found existing Accounts document",
        };
      }
    } else {
      console.log(
        "[WalletAccountService] Cannot search for existing document:",
        {
          hasDocuments: !!allDocuments,
          hasDriveId: !!driveId,
        },
      );
    }

    // If not found, create a new Accounts document
    console.log("[WalletAccountService] Creating new Accounts document", {
      endpoint: this.graphqlEndpoint,
      driveId,
    });

    try {
      console.log("[WalletAccountService] Creating Accounts document", {
        driveId,
        hasDriveId: !!driveId,
        endpoint: this.graphqlEndpoint,
      });

      const variables = {
        name: "Accounts",
        ...(driveId && { driveId }),
      };

      console.log(
        "[WalletAccountService] Sending GraphQL request with variables:",
        variables,
      );

      const requestBody = {
        query: `
          mutation CreateAccountsDocument($documentType: String!, $parentIdentifier: String) {
            createEmptyDocument(documentType: $documentType, parentIdentifier: $parentIdentifier) {
              id
              name
            }
          }
        `,
        variables: {
          documentType: "powerhouse/accounts",
          ...(driveId && { parentIdentifier: driveId }),
        },
      };

      console.log(
        "[WalletAccountService] GraphQL request body:",
        JSON.stringify(requestBody, null, 2),
      );

      const response = await fetch(this.graphqlEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      console.log(
        "[WalletAccountService] Create Accounts document response status:",
        response.status,
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[WalletAccountService] GraphQL request failed:", {
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(
          `GraphQL request failed: ${response.status} - ${response.statusText} - ${errorText}`,
        );
      }

      const result = (await response.json()) as {
        errors?: Array<{ message: string }>;
        data?: {
          createEmptyDocument?: { id: string; name: string };
        };
      };

      console.log(
        "[WalletAccountService] Create Accounts document result:",
        result,
      );

      if (result.errors) {
        console.error("[WalletAccountService] GraphQL errors:", result.errors);
        throw new Error(result.errors[0]?.message || "GraphQL error");
      }

      const documentId = result.data?.createEmptyDocument?.id;
      if (!documentId) {
        throw new Error(
          "Failed to create Accounts document - no document ID returned",
        );
      }

      console.log(
        "[WalletAccountService] Successfully created Accounts document:",
        documentId,
      );

      return {
        success: true,
        documentId,
        message: "Created new Accounts document",
      };
    } catch (error) {
      const errorMsg = `Failed to create Accounts document: ${error instanceof Error ? error.message : "Unknown error"}`;
      console.error(
        "[WalletAccountService] Error creating Accounts document:",
        error,
      );
      return {
        success: false,
        message: errorMsg,
      };
    }
  }

  /**
   * Find account in Accounts document or add it if it doesn't exist
   */
  private async findOrAddAccount(
    accountsDocumentId: string,
    walletAddress: string,
    accountName: string,
  ): Promise<{
    success: boolean;
    accountId?: string;
    account?: AccountEntry;
    message: string;
  }> {
    try {
      // Try to get the Accounts document with retry mechanism
      // (newly created documents might not be immediately available)
      let accounts: Array<{
        id: string;
        account: string;
        name: string;
        accountTransactionsId?: string | null;
      }> = [];

      let retries = 3;
      let lastError: Error | null = null;

      while (retries > 0) {
        try {
          const getDocResponse = await fetch(this.graphqlEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `
                query GetAccountsDocument($identifier: String!) {
                  document(identifier: $identifier) {
                    document {
                      id
                      name
                      state
                    }
                  }
                }
              `,
              variables: {
                identifier: accountsDocumentId,
              },
            }),
          });

          if (!getDocResponse.ok) {
            throw new Error(
              `Failed to get Accounts document: ${getDocResponse.status}`,
            );
          }

          const getDocResult = (await getDocResponse.json()) as {
            errors?: Array<{ message: string }>;
            data?: {
              document?: {
                document?: {
                  id: string;
                  name: string;
                  state: Record<string, unknown>;
                };
              };
            };
          };

          if (getDocResult.errors) {
            const errorMsg =
              getDocResult.errors[0]?.message ||
              "Failed to get Accounts document";
            // If document not found and we have retries left, wait and retry
            if (errorMsg.includes("not found") && retries > 1) {
              console.log(
                `[WalletAccountService] Document not found, retrying in 500ms... (${retries - 1} retries left)`,
              );
              await new Promise((resolve) => setTimeout(resolve, 500));
              retries--;
              lastError = new Error(errorMsg);
              continue;
            }
            throw new Error(errorMsg);
          }

          const docState = getDocResult.data?.document?.document?.state;
          const globalState =
            docState && typeof docState === "object" && "global" in docState
              ? (
                  docState as {
                    global: {
                      accounts?: Array<{
                        id: string;
                        account: string;
                        name: string;
                        accountTransactionsId?: string | null;
                      }>;
                    };
                  }
                ).global
              : (docState as
                  | {
                      accounts?: Array<{
                        id: string;
                        account: string;
                        name: string;
                        accountTransactionsId?: string | null;
                      }>;
                    }
                  | undefined);
          accounts = (globalState?.accounts as typeof accounts) || [];
          break; // Success, exit retry loop
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error));
          if (retries > 1) {
            console.log(
              `[WalletAccountService] Error querying document, retrying in 500ms... (${retries - 1} retries left)`,
              lastError.message,
            );
            await new Promise((resolve) => setTimeout(resolve, 500));
            retries--;
          } else {
            throw lastError;
          }
        }
      }

      if (lastError && accounts.length === 0) {
        throw lastError;
      }

      // Check if account already exists
      const existingAccount = accounts.find(
        (acc) => acc.account.toLowerCase() === walletAddress.toLowerCase(),
      );

      if (existingAccount) {
        console.log(
          "[WalletAccountService] Account already exists:",
          existingAccount.id,
        );
        return {
          success: true,
          accountId: existingAccount.id,
          account: {
            id: existingAccount.id,
            account: existingAccount.account,
            name: existingAccount.name,
            budgetPath: null,
            accountTransactionsId:
              existingAccount.accountTransactionsId || null,
            chain: ["ethereum"],
            type: "External",
            owners: [],
            KycAmlStatus: null,
          },
          message: "Account already exists",
        };
      }

      // Account doesn't exist, add it
      console.log(
        "[WalletAccountService] Account does not exist, adding new account",
      );
      const accountId = generateId();
      const addAccountResponse = await fetch(this.graphqlEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation AddAccount($documentIdentifier: String!, $actions: [JSONObject!]!) {
              mutateDocument(documentIdentifier: $documentIdentifier, actions: $actions) {
                id
                name
              }
            }
          `,
          variables: {
            documentIdentifier: accountsDocumentId,
            actions: [
              {
                type: "ADD_ACCOUNT",
                input: {
                  id: accountId,
                  account: walletAddress,
                  name: accountName,
                  chain: ["ethereum"],
                },
                scope: "global",
              },
            ],
          },
        }),
      });

      if (!addAccountResponse.ok) {
        const errorText = await addAccountResponse.text();
        throw new Error(
          `Failed to add account: ${addAccountResponse.status} - ${errorText}`,
        );
      }

      const addAccountResult = (await addAccountResponse.json()) as {
        errors?: Array<{ message: string }>;
        data?: {
          mutateDocument?: { id: string; name: string };
        };
      };

      if (addAccountResult.errors) {
        throw new Error(
          addAccountResult.errors[0]?.message || "Failed to add account",
        );
      }

      // Ensure the mutation reports success
      if (!addAccountResult.data?.mutateDocument) {
        throw new Error(
          "Failed to add account - mutation returned falsy result",
        );
      }

      console.log(
        "[WalletAccountService] Account added successfully:",
        accountId,
      );

      // Give the drive a moment to process the new account state
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newAccount: AccountEntry = {
        id: accountId,
        account: walletAddress,
        name: accountName,
        budgetPath: null,
        accountTransactionsId: null,
        chain: ["ethereum"],
        type: "External",
        owners: [],
        KycAmlStatus: null,
      };

      return {
        success: true,
        accountId,
        account: newAccount,
        message: "Account added successfully",
      };
    } catch (error) {
      const errorMsg = `Failed to find or add account: ${error instanceof Error ? error.message : "Unknown error"}`;
      console.error("[WalletAccountService] Error in findOrAddAccount:", error);
      return {
        success: false,
        message: errorMsg,
      };
    }
  }

  /**
   * Update existing Account Transactions document with latest transactions
   */
  private async updateAccountTransactions(
    documentId: string,
    address: string,
  ): Promise<void> {
    try {
      await accountTransactionsService.syncTransactionsForDocument(
        documentId,
        address,
      );
    } catch (error) {
      console.error("Failed to update account transactions:", error);
      // Don't throw - this is not critical for wallet addition
    }
  }
}

// Export singleton instance
export const walletAccountService = new WalletAccountService();
