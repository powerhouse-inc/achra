import React, { useState, useEffect } from "react";
import { actions } from "document-models/invoice";
import { generateId } from "document-model";
import type { InvoiceAction, InvoiceState } from "document-models/invoice";
import { getSubgraphUrl } from "../shared/graphql.js";

const GRAPHQL_URL = getSubgraphUrl("invoice-addon");

interface InvoiceToGnosisProps {
  docState: InvoiceState;
  dispatch: React.Dispatch<InvoiceAction>;
}

const InvoiceToGnosis: React.FC<InvoiceToGnosisProps> = ({
  docState,
  dispatch,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoiceStatusResponse, setInvoiceStatusResponse] = useState<
    string | null
  >(null);
  const [safeTxHash, setsafeTxHash] = useState<string | null>(null);
  const [safeAddress, setSafeAddress] = useState<string | null>(null);
  // Use ref to prevent race conditions from rapid clicks
  const isProcessingRef = React.useRef(false);

  const currency = docState.currency;
  const chainName = docState.issuer?.paymentRouting?.wallet?.chainName || "";
  const invoiceStatus = docState.status;

  useEffect(() => {
    // set safeADdress from processorRef
    if (docState.payments.length < 1) return;
    const lastPaymentRef =
      docState.payments[docState.payments.length - 1].processorRef || "";
    console.log(lastPaymentRef);
    const retrievedSafeAddress = lastPaymentRef.split(":");
    if (retrievedSafeAddress[0]) {
      setSafeAddress(retrievedSafeAddress[0]);
    }
  }, [docState.payments.length]);

  const TOKEN_ADDRESSES = {
    BASE: {
      USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      USDS: "0x820C137fa70C8691f0e44Dc420a5e53c168921Dc",
      DAI: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
      EURC: "0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42",
      EURE: "0xbf6e2966A9C3D99C9E4D069E04f7Bdb9C8aa762C",
      // Add more tokens as needed
    },
    ETHEREUM: {
      USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      USDS: "0xdC035D45d973E3EC169d2276DDab16f1e407384F",
      DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      EURC: "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c",
      EURE: "0x39b8B6385416f4cA36a20319F70D28621895279D",
      // Add more tokens as needed
    },
    "ARBITRUM ONE": {
      USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      USDS: "0x6491c05A82219b8D1479057361ff1654749b876b",
      DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      EURE: "0x0c06cCF38114ddfc35e07427B9424adcca9F44F8",
      // Add more tokens as needed
    },
    // Add more networks as needed
  };

  const SIX_DECIMALS_TOKENS = ["EURC", "USDC"];

  // Extract payment details from current-state.json
  const paymentDetails = {
    payeeWallet: {
      address: docState.issuer?.paymentRouting?.wallet?.address || "",
      chainName: docState.issuer?.paymentRouting?.wallet?.chainName || "",
      chainId: docState.issuer?.paymentRouting?.wallet?.chainId || "",
    },
    token: {
      evmAddress: getTokenAddress(chainName, currency),
      symbol: docState.currency,
      chainName: docState.issuer?.paymentRouting?.wallet?.chainName || "",
      chainId: docState.issuer?.paymentRouting?.wallet?.chainId || "",
      decimals: SIX_DECIMALS_TOKENS.includes(docState.currency) ? 6 : 18,
    },
    amount: docState.totalPriceTaxIncl || 0.000015, // Make the amount small for testing
  };

  function getTokenAddress(
    chainName: string,
    symbol: string,
  ): string | undefined {
    const networkTokens =
      TOKEN_ADDRESSES[chainName.toUpperCase() as keyof typeof TOKEN_ADDRESSES];
    if (!networkTokens) {
      console.error(`Network ${chainName} not supported`);
      return undefined;
    }

    const tokenAddress = networkTokens[symbol as keyof typeof networkTokens];
    if (!tokenAddress) {
      console.error(`Token ${symbol} not supported on ${chainName}`);
      return undefined;
    }

    return tokenAddress;
  }

  const handleInvoiceToGnosis = async () => {
    // Prevent concurrent calls using ref (faster than state update)
    if (isProcessingRef.current) {
      console.log(
        "Payment request already in progress, ignoring duplicate click",
      );
      return;
    }

    isProcessingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation Invoice_processGnosisPayment($chainName: String!, $paymentDetails: JSONObject!, $invoiceNo: String!) {
              Invoice_processGnosisPayment(chainName: $chainName, paymentDetails: $paymentDetails, invoiceNo: $invoiceNo) {
                success
                data
                error
              }
            }
          `,
          variables: {
            chainName: chainName,
            paymentDetails: paymentDetails,
            invoiceNo: docState.invoiceNo,
          },
        }),
      });

      const result = (await response.json()) as {
        data?: {
          Invoice_processGnosisPayment?: {
            success: boolean;
            data?: Record<string, unknown> | string;
            error?: string;
          };
        };
      };

      const data = result.data?.Invoice_processGnosisPayment;
      if (data?.success) {
        const dataObj =
          typeof data.data === "string"
            ? (JSON.parse(data.data) as Record<string, unknown>)
            : (data.data ?? {});
        const txHash = typeof dataObj.txHash === "string" ? dataObj.txHash : "";
        const responseSafeAddress =
          typeof dataObj.safeAddress === "string" ? dataObj.safeAddress : "";
        setsafeTxHash(txHash);
        setSafeAddress(responseSafeAddress);

        if (invoiceStatus === "ACCEPTED") {
          dispatch(
            actions.schedulePayment({
              id: generateId(),
              processorRef: `${responseSafeAddress}:${txHash}`,
              paymentDate: new Date().toISOString(),
            }),
          );
        } else {
          dispatch(
            actions.addPayment({
              id: generateId(),
              processorRef: `${responseSafeAddress}:${txHash}`,
              confirmed: false,
              paymentDate: new Date().toISOString(),
            }),
          );
        }

        const paymentDetailsList = dataObj.paymentDetails as
          | Array<{ amount: number; token: { symbol: string } }>
          | undefined;
        if (paymentDetailsList?.[0]) {
          setInvoiceStatusResponse(
            `Amount: ${paymentDetailsList[0].amount} ${paymentDetailsList[0].token.symbol} on ${chainName}`,
          );
        }
      } else {
        const errorMsg = data?.error ?? "Unknown payment error";
        setError(errorMsg);
        dispatch(
          actions.addPayment({
            id: generateId(),
            processorRef: "",
            confirmed: false,
            issue: errorMsg,
          }),
        );
      }
      setIsLoading(false);
      isProcessingRef.current = false;
    } catch (err: unknown) {
      setIsLoading(false);
      isProcessingRef.current = false;
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      console.error("Error during transfer:", err);
      dispatch(
        actions.addPayment({
          id: generateId(),
          processorRef: "",
          confirmed: false,
          issue: errorMsg,
        }),
      );
    }
  };

  if (!currency || !chainName || currency === "" || chainName === "") {
    return null;
  }

  const tokenUnsupported = !paymentDetails.token.evmAddress;

  const parseChainName = (chainName: string) => {
    switch (chainName) {
      case "Base":
        return "base";
      case "Ethereum":
        return "eth";
      case "Arbitrum One":
        return "arb";
    }
  };

  const urlChainName = parseChainName(chainName);

  const linkText = "Gnosis Safe [>]";

  return (
    <div className="space-y-4">
      {tokenUnsupported && (
        <div className="text-red-500 bg-red-50 p-3 rounded-md">
          {currency} is not supported on {chainName}
        </div>
      )}
      {currency &&
        chainName &&
        currency !== "" &&
        chainName !== "" &&
        !tokenUnsupported && (
          <button
            className="bg-blue-500 text-black px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleInvoiceToGnosis}
            disabled={isLoading}
          >
            {isLoading
              ? "Processing..."
              : invoiceStatus === "ACCEPTED"
                ? "Schedule Payment in Gnosis Safe"
                : "Reschedule Payment in Gnosis Safe"}
          </button>
        )}

      {error && (
        <div className="text-red-500 bg-red-50 p-3 rounded-md">{error}</div>
      )}

      {safeTxHash && (
        <div className="bg-gray-50 mt-4 rounded-md space-y-2 w-full">
          <a
            href={`https://app.safe.global/transactions/queue?safe=${urlChainName}:${safeAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline block w-full"
          >
            {linkText}
          </a>
          <p className="font-medium">
            Safe Transaction Hash:
            <span className="font-mono text-sm ml-2 break-all">
              {safeTxHash}
            </span>
          </p>
        </div>
      )}

      {!safeTxHash &&
        !error &&
        invoiceStatus === "PAYMENTSCHEDULED" &&
        docState.payments.length > 0 && (
          <>
            {docState.payments[docState.payments.length - 1].issue !== "" ? (
              <div className="mt-4">
                <p className="text-red-700 font-medium">
                  Issue: {docState.payments[docState.payments.length - 1].issue}
                </p>
              </div>
            ) : (
              <div className="mt-4">
                <div className="invoice-link text-blue-900 hover:text-blue-600">
                  <a
                    className="view-invoice-button"
                    href={`https://app.safe.global/transactions/queue?safe=${urlChainName}:${safeAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkText}
                  </a>
                </div>
                <p className="mt-4 font-medium">
                  Safe Transaction Hash:
                  <span className="font-mono text-sm ml-2 break-all">
                    {
                      docState.payments[docState.payments.length - 1]
                        .processorRef
                    }
                  </span>
                </p>
              </div>
            )}
          </>
        )}

      {invoiceStatusResponse && (
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="font-medium">Payment Details:</p>
          <p className="text-gray-700">{invoiceStatusResponse}</p>
        </div>
      )}
    </div>
  );
};

export default InvoiceToGnosis;
