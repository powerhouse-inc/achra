import React, { useState } from "react";
import { type InvoiceAction, actions } from "document-models/invoice";
import { uploadPdfChunked } from "./uploadPdfChunked.js";
import { getCountryCodeFromName, mapChainNameToConfig } from "./utils/utils.js";
import { LoaderCircle } from "lucide-react";
import { getSubgraphUrl } from "../shared/graphql.js";
import { type PDFReviewData } from "./components/PDFReviewModal.js";

const GRAPHQL_URL = getSubgraphUrl("invoice-addon");

export async function loadPDFFile({
  file,
}: {
  file: File;
  dispatch: (action: InvoiceAction) => void;
}) {
  if (!file) throw new Error("No file provided");

  if (file.type !== "application/pdf") {
    throw new Error("Please upload a PDF file");
  }

  console.log("Loading PDF file:", file.name);

  return file;
}

interface PDFUploaderProps {
  changeDropdownOpen: (open: boolean) => void;
  /**
   * Called when an upload finishes successfully. The editor lifts state up
   * to its own level so the review modal survives the dropdown unmounting
   * (the dropdown closes on any outside click). Dispatches are deferred to
   * the editor's Accept handler.
   */
  onUploadComplete: (
    data: PDFReviewData,
    base64Pdf: string,
    fileName: string,
  ) => void;
}

/**
 * Extracts the actual error message from Claude API error format
 * Format: "Claude API error: 400 - {...json...}"
 */
function extractErrorMessage(errorMsg: string): string {
  if (errorMsg.includes("Claude API error")) {
    try {
      const jsonMatch = errorMsg.match(/Claude API error: \d+ - (.+)/);
      if (jsonMatch) {
        const errorJson = JSON.parse(jsonMatch[1]);
        if (errorJson?.error?.message) {
          return errorJson.error.message;
        } else if (errorJson?.message) {
          return errorJson.message;
        }
      }
    } catch (parseError) {
      // If parsing fails, use the original error message
      console.error("Failed to parse error message:", parseError);
    }
  }
  return errorMsg;
}

/**
 * Dispatches all the document actions to apply an (already user-reviewed)
 * invoice payload to the document. Exported so the editor (which now owns
 * the review modal state) can call it from its Accept handler.
 */
export function applyExtractedInvoice(
  dispatch: (action: InvoiceAction) => void,
  invoiceData: Record<string, any>,
) {
  dispatch(
    actions.editInvoice({
      invoiceNo: invoiceData.invoiceNo || "",
      dateIssued:
        invoiceData.dateIssued || new Date().toISOString().split("T")[0],
      dateDelivered: invoiceData.dateDelivered || null,
      dateDue: invoiceData.dateDue || new Date().toISOString().split("T")[0],
      currency: invoiceData.currency || "USD",
    }),
  );

  if (invoiceData.lineItems && invoiceData.lineItems.length > 0) {
    invoiceData.lineItems.forEach((item: any) => {
      dispatch(
        actions.addLineItem({
          id: item.id,
          description: item.description,
          taxPercent: item.taxPercent,
          quantity: item.quantity,
          currency: item.currency,
          unitPriceTaxExcl: item.unitPriceTaxExcl,
          unitPriceTaxIncl: item.unitPriceTaxIncl,
          totalPriceTaxExcl: item.totalPriceTaxExcl,
          totalPriceTaxIncl: item.totalPriceTaxIncl,
        }),
      );

      if (item.lineItemTag && Array.isArray(item.lineItemTag)) {
        item.lineItemTag.forEach((tag: any) => {
          dispatch(
            actions.setLineItemTag({
              lineItemId: item.id,
              dimension: tag.dimension,
              value: tag.value,
              label: tag.label,
            }),
          );
        });
      }
    });
  }

  if (invoiceData.issuer) {
    dispatch(
      actions.editIssuer({
        name: invoiceData.issuer.name || "",
        country: getCountryCodeFromName(invoiceData.issuer.country) || "",
        streetAddress: invoiceData.issuer.address?.streetAddress || "",
        extendedAddress: invoiceData.issuer.address?.extendedAddress || "",
        city: invoiceData.issuer.address?.city || "",
        postalCode: invoiceData.issuer.address?.postalCode || "",
        stateProvince: invoiceData.issuer.address?.stateProvince || "",
        tel: invoiceData.issuer.contactInfo?.tel || "",
        email: invoiceData.issuer.contactInfo?.email || "",
        id: invoiceData.issuer.id?.taxId || "",
      }),
    );

    if (invoiceData.issuer.paymentRouting?.bank) {
      const bank = invoiceData.issuer.paymentRouting.bank;
      dispatch(
        actions.editIssuerBank({
          name: bank.name || "",
          accountNum: bank.accountNum || "",
          ABA: bank.ABA || "",
          BIC: bank.BIC || "",
          SWIFT: bank.SWIFT || "",
          accountType: bank.accountType || "CHECKING",
          beneficiary: bank.beneficiary || "",
          memo: bank.memo || "",
          streetAddress: bank.address?.streetAddress || "",
          city: bank.address?.city || "",
          stateProvince: bank.address?.stateProvince || "",
          postalCode: bank.address?.postalCode || "",
          country: getCountryCodeFromName(bank.address?.country) || "",
          extendedAddress: bank.address?.extendedAddress || "",
        }),
      );
    }

    if (invoiceData.issuer.paymentRouting?.wallet) {
      const chainConfig = mapChainNameToConfig(
        invoiceData.issuer.paymentRouting.wallet.chainName,
      );
      dispatch(
        actions.editIssuerWallet({
          address: invoiceData.issuer.paymentRouting.wallet.address || "",
          chainId:
            invoiceData.issuer.paymentRouting.wallet.chainId ||
            chainConfig.chainId,
          chainName:
            invoiceData.issuer.paymentRouting.wallet.chainName ||
            chainConfig.chainName,
          rpc: invoiceData.issuer.paymentRouting.wallet.rpc || chainConfig.rpc,
        }),
      );
    }
  }

  if (invoiceData.payer) {
    dispatch(
      actions.editPayer({
        name: invoiceData.payer.name || "",
        country: getCountryCodeFromName(invoiceData.payer.country) || "",
        streetAddress: invoiceData.payer.address?.streetAddress || "",
        extendedAddress: invoiceData.payer.address?.extendedAddress || "",
        city: invoiceData.payer.address?.city || "",
        postalCode: invoiceData.payer.address?.postalCode || "",
        stateProvince: invoiceData.payer.address?.stateProvince || "",
        tel: invoiceData.payer.contactInfo?.tel || "",
        email: invoiceData.payer.contactInfo?.email || "",
        id: invoiceData.payer.id?.taxId || "",
      }),
    );

    // Payer payment routing intentionally not dispatched — the payer is the
    // party SENDING funds, so their bank/wallet doesn't belong on the invoice.
  }
}

export default function PDFUploader({
  changeDropdownOpen,
  onUploadComplete,
}: PDFUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result;
        const base64Data =
          typeof result === "string" ? result.split(",")[1] : undefined;
        if (!base64Data) {
          throw new Error("Failed to read file");
        }

        try {
          const result = await uploadPdfChunked(
            base64Data,
            GRAPHQL_URL,
            50 * 1024,
          );

          if (result.success) {
            const data = result.data;
            const review: PDFReviewData = {
              invoiceData: data.invoiceData,
              warnings: Array.isArray(data.warnings) ? data.warnings : [],
              invalidFields: Array.isArray(data.invalidFields)
                ? data.invalidFields
                : [],
              confidence:
                data.confidence && typeof data.confidence === "object"
                  ? data.confidence
                  : {},
              groundingAvailable: Boolean(data.groundingAvailable),
              retried: Boolean(data.retried),
              truncated: Boolean(data.truncated),
            };
            // Hand the result up to the editor BEFORE closing the dropdown.
            // The dropdown unmounts this component on close, so the parent
            // must already own the review state by then.
            onUploadComplete(review, base64Data, file.name);
            changeDropdownOpen(false);
          } else {
            const errorMsg = extractErrorMessage(
              result.error || "Failed to process PDF",
            );
            throw new Error(errorMsg);
          }
        } catch (error) {
          console.error("Error processing PDF:", error);
          const errorMessage = extractErrorMessage(
            error instanceof Error
              ? error.message
              : "An error occurred while processing the PDF",
          );
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };

      reader.onerror = () => {
        setError("Failed to read file");
        setIsLoading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error handling file:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while handling the file",
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="pdf-upload"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          {isLoading && (
            <LoaderCircle className="w-4 h-4 text-blue-600 animate-spin" />
          )}
          {isLoading ? "Uploading..." : "Upload PDF"}
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading}
          />
        </label>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
