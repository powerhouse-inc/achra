const API_URL = "https://api.request.finance/invoices";
const API_KEY = process.env.REQUEST_FINANCE_API_KEY; // Store in .env file
const REQUEST_FINANCE_EMAIL = process.env.REQUEST_FINANCE_EMAIL;

interface InvoicePaymentData {
  buyerInfo: { email: string; [key: string]: unknown };
  invoiceNumber?: string;
  [key: string]: unknown;
}

export interface RequestFinanceResponse {
  errors?: string[];
  invoiceLinks?: { pay: string };
  id?: string;
  [key: string]: unknown;
}

const REQUEST_HEADERS = {
  Authorization: `${API_KEY}`,
  "Content-Type": "application/json",
  "X-Network": "mainnet",
};

const getResponseData = async (
  response: Response,
): Promise<RequestFinanceResponse> => {
  try {
    return (await response.json()) as RequestFinanceResponse;
  } catch {
    return {
      errors: [`Request failed with status ${response.status}`],
    };
  }
};

export const requestDirectPayment = async (
  invoiceData: InvoicePaymentData | Record<string, unknown>,
): Promise<RequestFinanceResponse> => {
  const data = invoiceData as InvoicePaymentData;
  data.buyerInfo.email = REQUEST_FINANCE_EMAIL ?? data.buyerInfo.email;
  console.log("Getting a request to create an invoice", data.invoiceNumber);
  try {
    // First API call to create the invoice
    const response = await fetch(API_URL, {
      method: "POST",
      headers: REQUEST_HEADERS,
      body: JSON.stringify(invoiceData),
    });

    const responseData = await getResponseData(response);

    if (!response.ok || !responseData.id) {
      console.error("Error creating invoice: response", responseData);
      return responseData;
    }

    console.log("Server: Invoice created successfully:", responseData.id);

    try {
      // Second API call to make it on-chain
      const onChainResponse = await fetch(
        `https://api.request.finance/invoices/${responseData.id}`,
        {
          method: "POST",
          headers: REQUEST_HEADERS,
          body: JSON.stringify({}),
        },
      );
      const onChainData = await getResponseData(onChainResponse);

      if (!onChainResponse.ok) {
        console.error("Server: Error making invoice on-chain:", onChainData);
        return onChainData;
      }

      console.log(
        "Server: Invoice made on-chain successfully:",
        onChainData.invoiceLinks,
      );

      // Send only one response
      return onChainData;
    } catch (error: unknown) {
      console.error("Server: Error making invoice on-chain:", error);
      return {
        errors: [error instanceof Error ? error.message : "Unknown error"],
      };
    }
  } catch (error: unknown) {
    console.error("Error creating invoice:", error);
    return {
      errors: [error instanceof Error ? error.message : "Unknown error"],
    };
  }
};
