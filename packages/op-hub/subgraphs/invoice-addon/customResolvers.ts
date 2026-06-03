import {
  executeTransferProposal,
  type PaymentDetail,
  type TransferResult,
} from "../../scripts/invoice/gnosisTransactionBuilder.js";
import { requestDirectPayment } from "../../scripts/invoice/requestFinance.js";
import { actions } from "document-models/invoice";
import type { InvoiceDocument } from "document-models/invoice";
import { uploadPdfAndGetJsonClaude } from "../../scripts/invoice/pdfToClaudeAI.js";
import type { IReactorClient } from "@powerhousedao/reactor";
import * as crypto from "crypto";

// --- Type definitions for resolver args and external interfaces ---

interface GnosisPaymentArgs {
  chainName: string;
  paymentDetails: PaymentDetail;
  invoiceNo: string;
}

interface RequestFinancePaymentArgs {
  paymentData: Record<string, unknown>;
}

interface GnosisPaymentResult {
  success: boolean;
  data?: TransferResult;
  error?: string;
}

interface PendingTransaction {
  invoiceNo: string;
  chainName: string;
  paymentDetails: PaymentDetail | PaymentDetail[];
  timestamp: number;
}

interface AlchemyActivity {
  category: string;
  fromAddress: string;
  toAddress: string;
  rawContract: { address: string };
  hash?: string;
  value?: number;
}

interface AlchemyWebhookPayload {
  event?: {
    activity?: AlchemyActivity | AlchemyActivity[];
  };
}

interface WebhookRequest {
  body: AlchemyWebhookPayload;
  headers: Record<string, string | undefined>;
}

interface WebhookResponse {
  status(code: number): WebhookResponse;
  json(body: Record<string, unknown>): WebhookResponse;
}

// Store pending transactions for webhook matching
const pendingTransactions: Record<string, PendingTransaction> = {};

// Add a set to track processed transaction hashes to avoid duplicate processing
let processedTransactions: Set<string> = new Set();

// Track in-flight payment requests to prevent concurrent processing of the same invoice
const inFlightPayments: Map<string, Promise<GnosisPaymentResult>> = new Map();

interface UploadInvoicePdfChunkArgs {
  chunk: string;
  chunkIndex: number;
  totalChunks: number;
  fileName: string;
  sessionId: string;
}

// Define a type for the file chunks data
interface FileChunksData {
  chunks: string[];
  receivedChunks: number;
}

// Create a Map to store file chunks data
const fileChunksMap = new Map<string, FileChunksData>();

let reactorClient: IReactorClient;

export const Invoice_processGnosisPayment = async (
  _: unknown,
  args: GnosisPaymentArgs,
): Promise<GnosisPaymentResult> => {
  try {
    const { chainName, paymentDetails, invoiceNo } = args;

    console.log("Processing gnosis payment:", {
      chainName,
      invoiceNo,
      paymentDetails,
    });

    // Check if there's already a payment request in progress for this invoice
    const paymentKey = `payment-${invoiceNo}`;
    if (inFlightPayments.has(paymentKey)) {
      console.log(
        `Payment request already in progress for invoice ${invoiceNo}, returning existing promise`,
      );
      return await inFlightPayments.get(paymentKey)!;
    }

    // Create a promise for this payment request
    const paymentPromise = (async (): Promise<GnosisPaymentResult> => {
      try {
        // Import and call the executeTransferProposal function
        const result = await executeTransferProposal(chainName, paymentDetails);

        console.log("Token transfer result:", result);

        // Store the transaction information for later matching with webhook
        if (result.success && result.txHash) {
          // Generate a unique ID for this transaction
          const transactionId = `gnosis-${invoiceNo}-${Date.now()}`;

          // Store the transaction with all the details needed for matching
          pendingTransactions[transactionId] = {
            invoiceNo,
            chainName,
            paymentDetails,
            timestamp: Date.now(),
          };

          console.log(
            `Stored pending transaction ${transactionId} for invoice ${invoiceNo}`,
          );
        }

        // Return the result without updating the document status yet
        // The status will be updated when the webhook confirms the transaction
        return {
          success: true,
          data: result,
        };
      } catch (error) {
        console.error("Error processing gnosis payment:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      } finally {
        // Remove from in-flight payments when done (success or error)
        inFlightPayments.delete(paymentKey);
        console.log(
          `Removed payment request for invoice ${invoiceNo} from in-flight tracking`,
        );
      }
    })();

    // Store the promise to prevent concurrent requests
    inFlightPayments.set(paymentKey, paymentPromise);

    // Wait for the payment to complete
    return await paymentPromise;
  } catch (error) {
    console.error("Error in Invoice_processGnosisPayment wrapper:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const Invoice_createRequestFinancePayment = async (
  _: unknown,
  args: RequestFinancePaymentArgs,
) => {
  try {
    const { paymentData } = args;
    if (!paymentData) {
      return {
        success: false,
        error: "No payment data provided",
      };
    }
    console.log(
      "Creating direct payment with data:",
      paymentData.invoiceNumber,
    );

    const response = await requestDirectPayment(paymentData);
    if (response.errors && response.errors.length > 0) {
      return {
        success: false,
        error: response.errors[0],
      };
    }
    return {
      success: true,
      data: {
        message: "Direct payment request received successfully",
        response,
      },
    };
  } catch (error) {
    console.error("Error creating direct payment:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const Invoice_uploadInvoicePdfChunk = async (
  _: unknown,
  args: UploadInvoicePdfChunkArgs,
) => {
  try {
    const { chunk, chunkIndex, totalChunks, fileName, sessionId } = args;
    const fileKey = `${sessionId}_${fileName}`;

    // Initialize array for this file if it doesn't exist
    if (!fileChunksMap.has(fileKey)) {
      fileChunksMap.set(fileKey, {
        chunks: new Array(totalChunks).fill("") as string[],
        receivedChunks: 0,
      });
    }

    // Get the file chunks data
    const fileData = fileChunksMap.get(fileKey)!;

    // Add the chunk at the correct position
    fileData.chunks[chunkIndex] = chunk;
    fileData.receivedChunks += 1;

    console.log(
      `Received chunk ${chunkIndex + 1}/${totalChunks} for ${fileName}`,
    );

    // If we've received all chunks, process the complete file
    if (fileData.receivedChunks === totalChunks) {
      // Combine all chunks
      const completeFile = fileData.chunks.join("");

      console.log("Processing PDF with Claude Haiku 4.5...");
      const startTime = Date.now();

      try {
        const claudeResult = await uploadPdfAndGetJsonClaude(completeFile);
        const processingTime = Date.now() - startTime;
        console.log(`PDF processing completed in ${processingTime}ms`);

        const responseData = {
          invoiceData: claudeResult.invoiceData as Record<string, unknown>,
          warnings: claudeResult.warnings,
          invalidFields: claudeResult.invalidFields,
          confidence: claudeResult.confidence,
          groundingAvailable: claudeResult.groundingAvailable,
          retried: claudeResult.retried,
          truncated: claudeResult.truncated,
          processingMetadata: {
            provider: "claude-haiku-4-5-20251001",
            processingTimeMs: processingTime,
            processingTimestamp: new Date().toISOString(),
          },
        };

        // Clean up
        fileChunksMap.delete(fileKey);

        return {
          success: true,
          data: responseData,
        };
      } catch (error) {
        console.error("Error in PDF processing:", error);
        fileChunksMap.delete(fileKey);

        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }

    // If not all chunks received yet, just acknowledge receipt
    return {
      success: true,
      data: {
        message: `Chunk ${chunkIndex + 1}/${totalChunks} received`,
        progress: (fileData.receivedChunks / totalChunks) * 100,
      },
    };
  } catch (error) {
    console.error("Error processing PDF chunk:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Function to set the reactor client instance
export const setReactorClient = (client: IReactorClient) => {
  reactorClient = client;
};

// Export the pendingTransactions for use in webhook handling
export { pendingTransactions };

// Add a method to clean up old pending transactions
export const cleanupOldPendingTransactions = () => {
  const now = Date.now();
  const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const MAX_PROCESSED_TRANSACTIONS = 1000; // Limit the size of the processed transactions set

  let cleanupCount = 0;
  for (const [txHash, txInfo] of Object.entries(pendingTransactions)) {
    if (now - txInfo.timestamp > MAX_AGE_MS) {
      delete pendingTransactions[txHash];
      cleanupCount++;
    }
  }

  // Also clean up the processed transactions set if it gets too large
  if (processedTransactions.size > MAX_PROCESSED_TRANSACTIONS) {
    // Convert to array, keep only the most recent transactions
    const txArray = Array.from(processedTransactions);
    const toKeep = txArray.slice(-MAX_PROCESSED_TRANSACTIONS / 2); // Keep the most recent half
    processedTransactions = new Set(toKeep);
    console.log(
      `Cleaned up processed transactions set from ${txArray.length} to ${toKeep.length} items`,
    );
  }

  if (cleanupCount > 0) {
    console.log(`Cleaned up ${cleanupCount} old pending transactions`);
  }
};

// Function to validate Alchemy signature
function isValidSignatureForStringBody(
  body: string,
  signature: string,
  signingKey: string,
): boolean {
  const hmac = crypto.createHmac("sha256", signingKey);
  hmac.update(body, "utf8");
  const digest = hmac.digest("hex");
  return signature === digest;
}

const updateDocumentStatus = async (invoiceNo: string): Promise<void> => {
  try {
    const invoiceResults = await reactorClient.find({
      type: "powerhouse/invoice",
    });
    const invoiceDocs = invoiceResults.results as InvoiceDocument[];

    if (invoiceDocs.length === 0) {
      console.log(`No documents found for invoice ${invoiceNo}`);
      throw new Error(`No documents found for invoice ${invoiceNo}`);
    }

    const matchingDoc = invoiceDocs.find(
      (doc) => doc.state.global.invoiceNo === invoiceNo,
    );

    if (matchingDoc) {
      console.log(`Changing status of Invoice No: ${invoiceNo} to PAID`);
      await reactorClient.execute(matchingDoc.header.id, "main", [
        actions.editStatus({ status: "PAYMENTRECEIVED" }),
      ]);
    }
  } catch (error) {
    console.error(`Error finding document for invoice ${invoiceNo}:`, error);
    throw error;
  }
};

// Webhook handler method
export const handleWebhook = async (
  req: WebhookRequest,
  res: WebhookResponse,
) => {
  try {
    console.log("Webhook received");

    // Get the request body and signature
    const payload = req.body;
    const rawBody = JSON.stringify(payload);

    const signature = req.headers["x-alchemy-signature"];
    if (!signature) {
      console.warn("Missing signature header");
    } else {
      // Validate the signature
      const signingKey = process.env.ALCHEMY_SIGNING_KEY || "whsec_test";
      const isValid = isValidSignatureForStringBody(
        rawBody,
        signature,
        signingKey,
      );

      if (!isValid) {
        console.warn("Invalid signature");
      }
    }

    // Check if this is a transaction confirmation webhook
    if (payload.event && payload.event.activity) {
      const activities = Array.isArray(payload.event.activity)
        ? payload.event.activity
        : [payload.event.activity];

      for (const activity of activities) {
        // Check if this is a transaction with relevant details
        if (
          activity.category === "token" &&
          activity.fromAddress &&
          activity.toAddress &&
          activity.rawContract
        ) {
          console.log(
            `Processing token transfer from ${activity.fromAddress} to ${activity.toAddress}`,
          );

          // Check if we've already processed this transaction
          if (activity.hash && processedTransactions.has(activity.hash)) {
            console.log(
              `Transaction ${activity.hash} has already been processed, skipping`,
            );
            continue;
          }

          // Extract transaction details from the activity
          const fromAddress = activity.fromAddress.toLowerCase();
          const toAddress = activity.toAddress.toLowerCase();
          const tokenAddress = activity.rawContract.address.toLowerCase();
          const tokenValue = activity.value || 0;

          console.log(
            `Token transfer details: ${tokenValue} of token ${tokenAddress} from ${fromAddress} to ${toAddress}`,
          );

          // Look for matching pending transactions based on transaction details
          let matchedInvoiceNo: string | null = null;
          let matchedTxHash: string | null = null;

          for (const [txHash, txInfo] of Object.entries(pendingTransactions)) {
            const paymentDetailsList = Array.isArray(txInfo.paymentDetails)
              ? txInfo.paymentDetails
              : [txInfo.paymentDetails];

            for (const payment of paymentDetailsList) {
              // Check if recipient address matches
              if (
                payment.payeeWallet &&
                payment.payeeWallet.address.toLowerCase() === toAddress
              ) {
                // Check if token address matches
                if (
                  payment.token &&
                  payment.token.evmAddress.toLowerCase() === tokenAddress
                ) {
                  // Check if amount is similar (allowing for some precision loss)
                  const expectedAmount = parseFloat(String(payment.amount));
                  const actualAmount = parseFloat(String(tokenValue));

                  // Allow for a small difference due to precision issues
                  const amountDifference = Math.abs(
                    expectedAmount - actualAmount,
                  );
                  const isAmountSimilar =
                    amountDifference < 0.0001 ||
                    (expectedAmount > 0 &&
                      amountDifference / expectedAmount < 0.01); // 1% tolerance

                  if (isAmountSimilar) {
                    console.log(
                      `Found matching transaction for invoice ${txInfo.invoiceNo}`,
                    );
                    console.log(
                      `Expected: ${expectedAmount}, Actual: ${actualAmount}`,
                    );
                    matchedInvoiceNo = txInfo.invoiceNo;
                    matchedTxHash = txHash;
                    break;
                  } else {
                    console.log(
                      `Token amounts don't match. Expected: ${expectedAmount}, Actual: ${actualAmount}`,
                    );
                  }
                } else {
                  console.log(
                    `Token addresses don't match. Expected: ${payment.token?.evmAddress}, Actual: ${tokenAddress}`,
                  );
                }
              } else {
                console.log(
                  `Recipient addresses don't match. Expected: ${payment.payeeWallet?.address}, Actual: ${toAddress}`,
                );
              }
            }

            if (matchedInvoiceNo) break;
          }

          // If we found a matching transaction, update the invoice status
          if (matchedInvoiceNo) {
            await updateDocumentStatus(matchedInvoiceNo);

            // Remove all related transactions from pending
            for (const [txHash, txInfo] of Object.entries(
              pendingTransactions,
            )) {
              if (txInfo.invoiceNo === matchedInvoiceNo) {
                delete pendingTransactions[txHash];
                console.log(
                  `Removed pending transaction ${txHash} for invoice ${matchedInvoiceNo}`,
                );
              }
            }

            // Add to processed transactions to avoid duplicate processing
            if (activity.hash) {
              processedTransactions.add(activity.hash);
            }
          } else {
            console.log(
              "No matching pending transaction found for this activity",
            );
          }
        }
      }
    }

    // For testing, just acknowledge receipt
    return res.status(200).json({
      success: true,
      message: "Webhook received successfully",
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
