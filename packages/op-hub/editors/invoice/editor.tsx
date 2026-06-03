import { useEffect, useMemo, useRef, useState } from "react";
import { generateId } from "document-model";
import {
  type InvoiceAction,
  type InvoiceDocument,
  type InvoiceLineItem,
  type ClosureReason,
  type Rejection,
  type Status,
  actions,
} from "document-models/invoice";
import { LegalEntityForm } from "./legalEntity/legalEntity.js";
import { LineItemsTable } from "./lineItems.js";
import { loadUBLFile } from "./ingestUBL.js";
import PDFUploader, { applyExtractedInvoice } from "./ingestPDF.js";
import PDFReviewModal, {
  type PDFReviewData,
} from "./components/PDFReviewModal.js";
import RequestFinance from "./requestFinance.js";
import InvoiceToGnosis from "./invoiceToGnosis.js";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePDF } from "./InvoicePDF.js";
import { createRoot } from "react-dom/client";
import { downloadUBL } from "./exportUBL.js";
import { CurrencyForm, currencyList } from "./components/currencyForm.js";
import { InputField } from "./components/inputField.js";
import type { ValidationResult } from "./validation/validationManager.js";
import { DatePicker } from "./components/datePicker.js";
import { SelectField } from "./components/selectField.js";
import { formatNumber } from "./lineItems.js";
import { Textarea } from "@powerhousedao/document-engineering/ui";
import ConfirmationModal from "./components/confirmationModal.js";
import {
  ClosePaymentModalContent,
  ConfirmPaymentModalContent,
  FinalRejectionModalContent,
  IssueInvoiceModalContent,
  RegisterPaymentTxModalContent,
  RejectInvoiceModalContent,
  ReportPaymentIssueModalContent,
  SchedulePaymentModalContent,
} from "./components/statusModalComponents.js";
import { InvoiceStateSchema } from "../../document-models/invoice/v1/gen/schema/zod.js";
import validateStatusBeforeContinue from "./validation/validationHandler.js";
import { useSelectedInvoiceDocument } from "../../document-models/invoice/v1/hooks.js";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import {
  type DocumentDispatch,
  setSelectedNode,
  usePHToast,
  useParentFolderForSelectedNode,
} from "@powerhousedao/reactor-browser";

function isFiatCurrency(currency: string): boolean {
  return currencyList.find((c) => c.ticker === currency)?.crypto === false;
}

/**
 * Converts a date-only string (YYYY-MM-DD) to ISO datetime string (YYYY-MM-DDTHH:mm:ss.sssZ)
 * Used when dispatching date values to match the Zod schema requirements
 */
function dateToDatetime(dateStr: string | null | undefined): string | null {
  if (!dateStr || dateStr.trim() === "") return null;
  // If it's already a datetime string, return as is
  if (dateStr.includes("T")) return dateStr;
  // Convert date-only to datetime at midnight UTC
  return `${dateStr}T00:00:00.000Z`;
}

/**
 * Converts an ISO datetime string to date-only string (YYYY-MM-DD) for DatePicker
 * Used when displaying date values from state
 */
function datetimeToDate(datetimeStr: string | null | undefined): string {
  if (!datetimeStr || datetimeStr.trim() === "") return "";
  // Extract date part from datetime string
  return datetimeStr.split("T")[0];
}

export default function Editor() {
  const [doc, dispatch] = useSelectedInvoiceDocument() as [
    InvoiceDocument | undefined,
    DocumentDispatch<InvoiceAction>,
  ];
  const state = doc?.state.global;
  const toast = usePHToast();

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS

  // Initialize hooks with safe defaults that don't depend on state being available
  const [fiatMode, setFiatMode] = useState(false);
  const [uploadDropdownOpen, setUploadDropdownOpen] = useState(false);

  // PDF review modal state — lifted up from PDFUploader so it survives
  // the dropdown unmounting on outside click.
  const [pdfReviewData, setPdfReviewData] = useState<PDFReviewData | null>(
    null,
  );
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>("");
  const [isApplyingPdf, setIsApplyingPdf] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [invoiceNoInput, setInvoiceNoInput] = useState("");
  const uploadDropdownRef = useRef<HTMLDivElement>(null);
  const exportDropdownRef = useRef<HTMLDivElement>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [notes, setNotes] = useState("");

  // Validation state
  const [invoiceValidation, setInvoiceValidation] =
    useState<ValidationResult | null>(null);
  const [walletValidation, setWalletValidation] =
    useState<ValidationResult | null>(null);
  const [currencyValidation, setCurrencyValidation] =
    useState<ValidationResult | null>(null);
  const [ibanValidation, setIbanValidation] = useState<ValidationResult | null>(
    null,
  );
  const [bicValidation, setBicValidation] = useState<ValidationResult | null>(
    null,
  );
  const [bankNameValidation, setBankNameValidation] =
    useState<ValidationResult | null>(null);
  const [streetAddressValidation, setStreetAddressValidation] =
    useState<ValidationResult | null>(null);
  const [cityValidation, setCityValidation] = useState<ValidationResult | null>(
    null,
  );
  const [postalCodeValidation, setPostalCodeValidation] =
    useState<ValidationResult | null>(null);
  const [payerEmailValidation, setPayerEmailValidation] =
    useState<ValidationResult | null>(null);
  const [lineItemValidation, setLineItemValidation] =
    useState<ValidationResult | null>(null);
  const [mainCountryValidation, setMainCountryValidation] =
    useState<ValidationResult | null>(null);
  const [bankCountryValidation, setBankCountryValidation] =
    useState<ValidationResult | null>(null);
  const [routingNumberValidation, setRoutingNumberValidation] =
    useState<ValidationResult | null>(null);
  const [accountNumberValidation, setAccountNumberValidation] =
    useState<ValidationResult | null>(null);
  const [chainValidation, setChainValidation] =
    useState<ValidationResult | null>(null);

  // Replace showConfirmationModal and pendingStatus with a single modal state
  const [activeModal, setActiveModal] = useState<
    | null
    | "issueInvoice"
    | "cancelInvoice"
    | "rejectInvoice"
    | "schedulePayment"
    | "registerPayment"
    | "reportPaymentIssue"
    | "confirmPayment"
    | "closePayment"
    | "finalRejection"
  >(null);

  // Track warning state for modal
  const [modalWarning, setModalWarning] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [finalReason, setFinalReason] = useState(false);
  const [paymentRef, setPaymentRef] = useState("");
  const [closureReason, setClosureReason] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [txnRef, setTxnRef] = useState("");
  const [paymentIssue, setPaymentIssue] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  const [editingItemValues, setEditingItemValues] = useState<{
    id: string;
    quantity: number;
    unitPriceTaxExcl: number;
    unitPriceTaxIncl: number;
  } | null>(null);

  useEffect(() => {
    if (state?.currency) {
      setFiatMode(isFiatCurrency(state.currency));
    }
  }, [state?.currency]);

  useEffect(() => {
    if (state?.invoiceNo !== undefined) {
      setInvoiceNoInput(state.invoiceNo || "");
    }
  }, [state?.invoiceNo]);

  useEffect(() => {
    if (state?.notes !== undefined) {
      setNotes(state.notes || "");
    }
  }, [state?.notes]);

  // Add click outside listener to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        uploadDropdownRef.current &&
        !uploadDropdownRef.current.contains(event.target as Node)
      ) {
        setUploadDropdownOpen(false);
      }
      if (
        exportDropdownRef.current &&
        !exportDropdownRef.current.contains(event.target as Node)
      ) {
        setExportDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const itemsTotalTaxExcl = useMemo(() => {
    if (!state?.lineItems) return 0;
    let total = state.lineItems.reduce(
      (sum: number, lineItem: InvoiceLineItem) => {
        return sum + lineItem.quantity * lineItem.unitPriceTaxExcl;
      },
      0.0,
    );

    // If there's an item being edited, replace its contribution with the edited values
    if (editingItemValues) {
      const originalItem = state.lineItems.find(
        (item: InvoiceLineItem) => item.id === editingItemValues.id,
      );
      if (originalItem) {
        // Subtract the original contribution and add the edited contribution
        total =
          total -
          originalItem.quantity * originalItem.unitPriceTaxExcl +
          editingItemValues.quantity * editingItemValues.unitPriceTaxExcl;
      }
    }

    return total;
  }, [state?.lineItems, editingItemValues]);

  const itemsTotalTaxIncl = useMemo(() => {
    if (!state?.lineItems) return 0;
    let total = state.lineItems.reduce(
      (sum: number, lineItem: InvoiceLineItem) => {
        return sum + lineItem.quantity * lineItem.unitPriceTaxIncl;
      },
      0.0,
    );

    // If there's an item being edited, replace its contribution with the edited values
    if (editingItemValues) {
      const originalItem = state.lineItems.find(
        (item: InvoiceLineItem) => item.id === editingItemValues.id,
      );
      if (originalItem) {
        // Subtract the original contribution and add the edited contribution
        total =
          total -
          originalItem.quantity * originalItem.unitPriceTaxIncl +
          editingItemValues.quantity * editingItemValues.unitPriceTaxIncl;
      }
    }

    return total;
  }, [state?.lineItems, editingItemValues]);

  // Dynamic property check based on the actual schema
  let missingProperties: string[] = [];
  try {
    const schema = InvoiceStateSchema();
    const expectedProperties = Object.keys(schema.shape).filter(
      (prop) => prop !== "__typename",
    );
    if (state) {
      missingProperties = expectedProperties.filter((prop) => !(prop in state));
    }
  } catch (error) {
    console.error("Error checking schema properties:", error);
  }

  if (missingProperties.length > 0) {
    // Show error message for missing properties
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg border border-red-200">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Document Schema Mismatch
          </h2>
          <p className="text-gray-600 mb-4">
            The current document structure doesn't match the expected schema.
            This usually happens when using an outdated document model.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Please create a new document using the latest document model to
            ensure compatibility.
          </p>
          <details className="text-left text-xs text-gray-600">
            <summary className="cursor-pointer hover:text-gray-800">
              View missing properties
            </summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-32">
              {JSON.stringify(missingProperties, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  // NOW ALL HOOKS ARE CALLED - SAFE TO DO CONDITIONAL RETURNS
  if (!state) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg border border-red-200">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Document Schema Mismatch
          </h2>
          <p className="text-gray-600 mb-4">
            The current document structure doesn't match the expected schema.
            This usually happens when using an outdated document model.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Please create a new document using the latest document model to
            ensure compatibility.
          </p>
        </div>
      </div>
    );
  }

  const STATUS_OPTIONS: Status[] = [
    "DRAFT",
    "ISSUED",
    "CANCELLED",
    "ACCEPTED",
    "REJECTED",
    "PAYMENTSCHEDULED",
    "PAYMENTSENT",
    "PAYMENTISSUE",
    "PAYMENTRECEIVED",
    "PAYMENTCLOSED",
  ];

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await loadUBLFile({ file, dispatch });
      toast?.("UBL file uploaded successfully", {
        type: "success",
      });
    } catch (error) {
      // Handle error presentation to user
      console.error("Failed to load UBL file:", error);
      toast?.("Failed to load UBL file", {
        type: "error",
      });
    }
  };

  const handlePdfUploadComplete = (
    data: PDFReviewData,
    base64: string,
    fileName: string,
  ) => {
    setPdfBase64(base64);
    setPdfFileName(fileName);
    setPdfReviewData(data);
  };

  const handlePdfAccept = (edited: Record<string, any>) => {
    setIsApplyingPdf(true);
    try {
      applyExtractedInvoice(dispatch, edited);
      toast?.("Invoice applied successfully", { type: "success" });
      setPdfReviewData(null);
      setPdfBase64(null);
      setPdfFileName("");
    } catch (err) {
      console.error("Failed to apply extracted invoice:", err);
      toast?.(
        err instanceof Error
          ? err.message
          : "Failed to apply extracted invoice",
        { type: "error" },
      );
    } finally {
      setIsApplyingPdf(false);
    }
  };

  const handlePdfReject = () => {
    setPdfReviewData(null);
    setPdfBase64(null);
    setPdfFileName("");
  };

  const handleExportPDF = () => {
    // Create a temporary container for the PDFDownloadLink
    const container = window.document.createElement("div");
    container.style.display = "none";
    window.document.body.appendChild(container);

    // Create root for React 18
    const root = createRoot(container);

    // Render the PDFDownloadLink
    const cleanup = () => {
      root.unmount();
      window.document.body.removeChild(container);
    };

    try {
      root.render(
        <PDFDownloadLink
          document={<InvoicePDF invoice={state} fiatMode={fiatMode} />}
          fileName={`invoice-${state.invoiceNo || "export"}.pdf`}
          className="hidden"
        >
          {({ blob, url, loading, error }) => {
            if (loading) {
              return null;
            }

            if (error) {
              cleanup();
              toast?.("Failed to export PDF", { type: "error" });
              console.error("PDF generation error:", error);
              return null;
            }

            if (url && blob) {
              // Create a direct download link
              const downloadLink = window.document.createElement("a");
              downloadLink.href = url;
              downloadLink.download = `invoice-${state.invoiceNo || "export"}.pdf`;
              window.document.body.appendChild(downloadLink);
              downloadLink.click();
              window.document.body.removeChild(downloadLink);

              // Cleanup after ensuring download has started
              setTimeout(cleanup, 100);
            }
            return null;
          }}
        </PDFDownloadLink>,
      );
    } catch (error) {
      console.error("Error exporting PDF:", error);
      cleanup();
      toast?.("Failed to export PDF", { type: "error" });
    }
  };

  async function handleExportUBL() {
    try {
      // Generate a PDF blob first
      const pdfBlob = await generatePDFBlob();

      // Generate filename based on invoice number
      const filename = `invoice_${state!.invoiceNo || "export"}.xml`;

      return await downloadUBL({
        invoice: state!,
        filename,
        pdfBlob, // Pass the PDF blob to be embedded in the UBL file
      });
    } catch (error) {
      console.error("Error exporting to UBL:", error);
      toast?.("Failed to export UBL", { type: "error" });
      throw error;
    }
  }

  // New function to generate a PDF blob using the existing PDF generation logic
  async function generatePDFBlob(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      // Create a temporary container for the PDFDownloadLink
      const container = window.document.createElement("div");
      container.style.display = "none";
      window.document.body.appendChild(container);

      // Create root for React 18
      const root = createRoot(container);

      // Cleanup function
      const cleanup = () => {
        root.unmount();
        window.document.body.removeChild(container);
      };

      try {
        root.render(
          <PDFDownloadLink
            document={<InvoicePDF invoice={state!} fiatMode={fiatMode} />}
            fileName={`invoice-${state!.invoiceNo || "export"}.pdf`}
            className="hidden"
          >
            {({ blob, loading, error }) => {
              if (loading) {
                return null;
              }

              if (error) {
                cleanup();
                reject(error);
                return null;
              }

              if (blob) {
                // We have the blob, resolve it
                resolve(blob);
                // Cleanup after getting the blob
                setTimeout(cleanup, 100);
              }
              return null;
            }}
          </PDFDownloadLink>,
        );
      } catch (error) {
        console.error("Error generating PDF blob:", error);
        cleanup();
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }

  // Replace handleStatusChange logic for opening modals
  const handleStatusChange = (newStatus: Status) => {
    const validationResult = validateStatusBeforeContinue(
      newStatus,
      state,
      setInvoiceValidation,
      setWalletValidation,
      setCurrencyValidation,
      setMainCountryValidation,
      setBankCountryValidation,
      setIbanValidation,
      setBicValidation,
      setAccountNumberValidation,
      setBankNameValidation,
      setStreetAddressValidation,
      setCityValidation,
      setPostalCodeValidation,
      setPayerEmailValidation,
      setLineItemValidation,
      setRoutingNumberValidation,
      isFiatCurrency,
      setChainValidation,
      toast,
    );
    if (validationResult) {
      return;
    }
    if (newStatus === "ISSUED") {
      const trueRejection = state.rejections.find(
        (rejection: Rejection) => rejection.final === true,
      );
      if (state.status === "REJECTED" && trueRejection) {
        setRejectReason(trueRejection.reason);
        setFinalReason(trueRejection.final);
        setActiveModal("finalRejection");
        return;
      }
      setActiveModal("issueInvoice");
      return;
    }
    if (newStatus === "CANCELLED") {
      dispatch(actions.cancel({}));
      return;
    }
    if (newStatus === "ACCEPTED") {
      if (state.status === "PAYMENTCLOSED") {
        dispatch(actions.reapprovePayment({}));
        return;
      }
      dispatch(actions.accept({ payAfter: new Date().toISOString() }));
      return;
    }
    if (newStatus === "REJECTED") {
      setActiveModal("rejectInvoice");
      return;
    }
    if (newStatus === "DRAFT") {
      dispatch(actions.reset({}));
      return;
    }
    if (newStatus === "PAYMENTSCHEDULED") {
      setActiveModal("schedulePayment");
      return;
    }
    if (newStatus === "PAYMENTCLOSED") {
      setActiveModal("closePayment");
      return;
    }
    if (newStatus === "PAYMENTSENT") {
      setActiveModal("registerPayment");
      return;
    }
    if (newStatus === "PAYMENTISSUE") {
      setActiveModal("reportPaymentIssue");
      return;
    }
    if (newStatus === "PAYMENTRECEIVED") {
      setActiveModal("confirmPayment");
      return;
    }
    // Add more status checks for other modals as needed
  };

  const handleCurrencyChange = (currency: string) => {
    dispatch(actions.editInvoice({ currency }));
  };

  // Modal content map
  const modalContentMap: Record<string, React.ReactNode> = {
    issueInvoice: (
      <IssueInvoiceModalContent
        invoiceNoInput={invoiceNoInput}
        setInvoiceNoInput={setInvoiceNoInput}
        state={state}
        dispatch={dispatch}
        setWarning={setModalWarning}
      />
    ),
    rejectInvoice: (
      <RejectInvoiceModalContent
        state={state}
        dispatch={dispatch}
        setWarning={setModalWarning}
        setRejectReason={setRejectReason}
        rejectReason={rejectReason}
        setFinalReason={setFinalReason}
        finalReason={finalReason}
      />
    ),
    finalRejection: <FinalRejectionModalContent rejectReason={rejectReason} />,
    schedulePayment: (
      <SchedulePaymentModalContent
        paymentRef={paymentRef}
        setPaymentRef={setPaymentRef}
      />
    ),
    closePayment: (
      <ClosePaymentModalContent
        closureReason={closureReason}
        setClosureReason={setClosureReason}
      />
    ),
    registerPayment: (
      <RegisterPaymentTxModalContent
        paymentDate={paymentDate}
        setPaymentDate={setPaymentDate}
        txnRef={txnRef}
        setTxnRef={setTxnRef}
      />
    ),
    reportPaymentIssue: (
      <ReportPaymentIssueModalContent
        paymentIssue={paymentIssue}
        setPaymentIssue={setPaymentIssue}
      />
    ),
    confirmPayment: (
      <ConfirmPaymentModalContent
        paymentAmount={paymentAmount}
        setPaymentAmount={setPaymentAmount}
        payments={state.payments}
      />
    ),
    // Add more modal content mappings here
  };

  const modalHeaders: Record<string, React.ReactNode> = {
    issueInvoice: <div>Issue Invoice</div>,
    rejectInvoice: <div>Reject Invoice</div>,
    finalRejection: <div>Invoice Rejected</div>,
    schedulePayment: <div>Schedule Payment</div>,
    closePayment: <div>Close Payment</div>,
    registerPayment: <div>Register Payment</div>,
    reportPaymentIssue: <div>Report Payment Issue</div>,
    confirmPayment: <div>Confirm Payment</div>,
    // Add more headers as needed
  };

  const modalContinueLabels: Record<string, string> = {
    issueInvoice: "Confirm",
    rejectInvoice: "Confirm",
    schedulePayment: "Confirm",
    closePayment: "Confirm",
    registerPayment: "Confirm",
    reportPaymentIssue: "Confirm",
    // Add more labels as needed
  };

  return (
    <div className="w-full min-h-full flex flex-col">
      <DocumentToolbar />
      <div className="flex-1 max-w-7xl mx-auto w-full mt-4 px-4 pb-8">
        {/* Header Section */}
        <div className="mb-6">
          {/* Header - responsive via flex-wrap */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left side with Invoice title, input, and upload */}
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-3xl font-bold whitespace-nowrap">Invoice</h1>
              <div className="min-w-[200px]">
                <InputField
                  placeholder={"Add invoice number"}
                  value={invoiceNoInput}
                  handleInputChange={(e) => setInvoiceNoInput(e.target.value)}
                  onBlur={(e) => {
                    const newValue = e.target.value;
                    if (newValue !== state.invoiceNo) {
                      dispatch(actions.editInvoice({ invoiceNo: newValue }));
                    }
                  }}
                  input={invoiceNoInput}
                  validation={invoiceValidation}
                />
              </div>

              {/* Upload Dropdown Button */}
              <div className="relative" ref={uploadDropdownRef}>
                <button
                  onClick={() => setUploadDropdownOpen(!uploadDropdownOpen)}
                  className="inline-flex items-center h-10 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors whitespace-nowrap cursor-pointer"
                  disabled={isPdfLoading}
                >
                  {isPdfLoading ? "Processing..." : "Upload File"}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {uploadDropdownOpen && !isPdfLoading && (
                  <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        Upload UBL
                        <input
                          accept=".xml"
                          className="hidden"
                          onChange={(e) => {
                            handleFileUpload(e);
                            setUploadDropdownOpen(false);
                          }}
                          type="file"
                        />
                      </label>
                      <PDFUploader
                        changeDropdownOpen={setUploadDropdownOpen}
                        onUploadComplete={handlePdfUploadComplete}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Export Dropdown Button */}
              <div className="relative" ref={exportDropdownRef}>
                <button
                  onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                  className="inline-flex items-center h-10 px-4 rounded bg-black hover:bg-gray-800 text-white font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  Export File
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {exportDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <button
                        onClick={() => {
                          handleExportUBL();
                          setExportDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Export UBL
                      </button>
                      <button
                        onClick={() => {
                          handleExportPDF();
                          setExportDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Export PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Currency selector and Status */}
            <div className="flex flex-row items-center gap-4">
              <CurrencyForm
                currency={state.currency}
                handleInputChange={(e) => {
                  handleCurrencyChange(e.target.value);
                }}
                validation={currencyValidation}
              />

              {/* Status on the right */}
              <SelectField
                options={STATUS_OPTIONS}
                value={state.status}
                onChange={(value) => handleStatusChange(value as Status)}
              />
            </div>
          </div>
        </div>

        {/* Main Content Grid - Responsive: mobile stacks, tablet+ side-by-side */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
          }}
        >
          {/* Issuer Section */}
          <div className="border border-gray-200 rounded-lg p-4 min-w-0">
            <h3 className="text-lg font-semibold mb-4">Issuer</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-2 relative isolate">
                <label className="block mb-1 text-sm">Issue Date:</label>
                <DatePicker
                  name="issueDate"
                  className={String.raw`w-full p-0 bg-white`}
                  onChange={(e) => {
                    const dateOnly = e.target.value.split("T")[0];
                    const datetime = dateToDatetime(dateOnly);
                    dispatch(
                      actions.editInvoice({
                        dateIssued: datetime,
                      }),
                    );
                  }}
                  value={datetimeToDate(state.dateIssued)}
                />
              </div>
              <div className="mb-2 relative isolate">
                <label className="block mb-1 text-sm">Delivery Date:</label>
                <DatePicker
                  name="deliveryDate"
                  className={String.raw`w-full p-0 bg-white`}
                  onChange={(e) => {
                    const dateOnly = e.target.value.split("T")[0];
                    const datetime = dateToDatetime(dateOnly);
                    if (datetime !== state.dateDelivered) {
                      dispatch(
                        actions.editInvoice({ dateDelivered: datetime }),
                      );
                    }
                  }}
                  value={datetimeToDate(state.dateDelivered)}
                />
              </div>
            </div>
            <LegalEntityForm
              legalEntity={state.issuer}
              onChangeInfo={(input) => dispatch(actions.editIssuer(input))}
              onChangeBank={(input) => dispatch(actions.editIssuerBank(input))}
              onChangeWallet={(input) =>
                dispatch(actions.editIssuerWallet(input))
              }
              basicInfoDisabled={false}
              bankDisabled={!fiatMode}
              walletDisabled={fiatMode}
              currency={state.currency}
              status={state.status}
              walletvalidation={walletValidation}
              chainvalidation={chainValidation}
              mainCountryValidation={mainCountryValidation}
              bankCountryValidation={bankCountryValidation}
              ibanvalidation={ibanValidation}
              bicvalidation={bicValidation}
              banknamevalidation={bankNameValidation}
              streetaddressvalidation={streetAddressValidation}
              cityvalidation={cityValidation}
              postalcodevalidation={postalCodeValidation}
              payeremailvalidation={payerEmailValidation}
              routingNumbervalidation={routingNumberValidation}
              accountNumbervalidation={accountNumberValidation}
            />
          </div>

          {/* Payer Section */}
          <div className="border border-gray-200 rounded-lg p-4 min-w-0">
            <h3 className="text-lg font-semibold mb-4">Payer</h3>
            <div className="mb-2 w-64 relative isolate">
              <label className="block mb-1 text-sm">Due Date:</label>
              <DatePicker
                name="dateDue"
                className={String.raw`w-full p-0 bg-white`}
                onChange={(e) => {
                  const dateOnly = e.target.value.split("T")[0];
                  const datetime = dateToDatetime(dateOnly);
                  dispatch(
                    actions.editInvoice({
                      dateDue: datetime,
                    }),
                  );
                }}
                value={datetimeToDate(state.dateDue)}
              />
            </div>
            <LegalEntityForm
              bankDisabled
              legalEntity={state.payer}
              onChangeInfo={(input) => dispatch(actions.editPayer(input))}
              currency={state.currency}
              status={state.status}
              payeremailvalidation={payerEmailValidation}
            />
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mb-8">
          <LineItemsTable
            currency={state.currency}
            lineItems={state.lineItems.map((item: InvoiceLineItem) => ({
              ...item,
              lineItemTag: item.lineItemTag ?? [],
            }))}
            onAddItem={(item) => dispatch(actions.addLineItem(item))}
            onDeleteItem={(input) => dispatch(actions.deleteLineItem(input))}
            onUpdateCurrency={(input) => {
              setFiatMode(input.currency !== "USDS");
              dispatch(actions.editInvoice(input));
            }}
            onUpdateItem={(item) => dispatch(actions.editLineItem(item))}
            onEditingItemChange={setEditingItemValues}
            dispatch={dispatch}
            paymentAccounts={state.invoiceTags || []}
          />
        </div>

        {/* Totals Section */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          }}
        >
          <div>
            <div className="">
              <Textarea
                label="Notes"
                placeholder="Add notes"
                autoExpand={true}
                rows={4}
                multiline={true}
                value={notes}
                onBlur={(e) => {
                  const newValue = e.target.value;
                  if (newValue !== state.notes) {
                    dispatch(actions.editInvoice({ notes: newValue }));
                  }
                }}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
                className="p-2 mb-4"
              />
            </div>
          </div>
          <div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm h-32">
              <div className="">
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Subtotal (excl. tax):</span>
                  <span>
                    {formatNumber(itemsTotalTaxExcl)} {state.currency}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-6 text-lg font-bold text-gray-900">
                  <span>Total (incl. tax):</span>
                  <span>
                    {formatNumber(itemsTotalTaxIncl)} {state.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {activeModal && (
          <ConfirmationModal
            open={!!activeModal}
            header={modalHeaders[activeModal]}
            onCancel={() => setActiveModal(null)}
            onContinue={() => {
              if (activeModal === "issueInvoice") {
                // Ensure dateIssued is a valid datetime string for the issue action
                // The issue action requires a non-null string, so use current date if not set
                let issueDate: string;
                if (state.dateIssued && state.dateIssued.trim() !== "") {
                  issueDate = state.dateIssued.includes("T")
                    ? state.dateIssued
                    : dateToDatetime(state.dateIssued) ||
                      new Date().toISOString();
                } else {
                  issueDate = new Date().toISOString();
                }

                dispatch(
                  actions.issue({
                    invoiceNo: invoiceNoInput,
                    dateIssued: issueDate,
                  }),
                );
              }
              if (activeModal === "rejectInvoice") {
                dispatch(
                  actions.reject({
                    final: finalReason,
                    id: generateId(),
                    reason: rejectReason,
                  }),
                );
              }
              if (activeModal === "schedulePayment") {
                dispatch(
                  actions.schedulePayment({
                    id: generateId(),
                    processorRef: paymentRef,
                  }),
                );
              }
              if (activeModal === "closePayment") {
                dispatch(
                  actions.closePayment({
                    closureReason: closureReason as ClosureReason,
                  }),
                );
              }
              if (activeModal === "registerPayment") {
                dispatch(
                  actions.registerPaymentTx({
                    id: state.payments[state.payments.length - 1].id,
                    timestamp: paymentDate,
                    txRef: txnRef,
                  }),
                );
              }
              if (activeModal === "reportPaymentIssue") {
                dispatch(
                  actions.reportPaymentIssue({
                    id: state.payments[state.payments.length - 1].id,
                    issue: paymentIssue,
                  }),
                );
              }
              if (activeModal === "confirmPayment") {
                dispatch(
                  actions.confirmPayment({
                    id: state.payments[state.payments.length - 1].id,
                    amount: parseFloat(paymentAmount) || 0,
                  }),
                );
              }
              setActiveModal(null);
            }}
            continueLabel={modalContinueLabels[activeModal]}
            continueDisabled={modalWarning}
          >
            {modalContentMap[activeModal]}
          </ConfirmationModal>
        )}

        {/* Finance Request Section */}
        {(state.status === "ACCEPTED" ||
          state.status === "PAYMENTSCHEDULED") && (
          <div className="mt-8">
            {!isFiatCurrency(state.currency) ? (
              <InvoiceToGnosis docState={state} dispatch={dispatch} />
            ) : (
              <RequestFinance docState={state} dispatch={dispatch} />
            )}
          </div>
        )}

        {/* Live PDF Preview */}
        {/* <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h3 className="text-lg font-semibold">PDF Preview</h3>
        </div>
        <div style={{ height: "1000px" }}>
          <PDFViewer width="100%" height="100%">
            <InvoicePDF invoice={state} fiatMode={fiatMode} />
          </PDFViewer>
        </div>
      </div> */}
      </div>

      <PDFReviewModal
        open={pdfReviewData !== null}
        base64Pdf={pdfBase64}
        fileName={pdfFileName}
        reviewData={pdfReviewData}
        onAccept={handlePdfAccept}
        onReject={handlePdfReject}
        isApplying={isApplyingPdf}
      />
    </div>
  );
}
