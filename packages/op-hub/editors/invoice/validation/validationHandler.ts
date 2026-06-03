import {
  type ValidationResult,
  type ValidationContext,
  validateField,
} from "./validationManager.js";
import { isValidIBAN } from "./validationRules.js";

type ToastFn = (
  message: string,
  options?: { type?: "error" | "warning" | "success" | "info" | "default" },
) => void;

const validateStatusBeforeContinue = (
  newStatus: string,
  state: any,
  setInvoiceValidation: (validation: ValidationResult) => void,
  setWalletValidation: (validation: ValidationResult) => void,
  setCurrencyValidation: (validation: ValidationResult) => void,
  setMainCountryValidation: (validation: ValidationResult) => void,
  setBankCountryValidation: (validation: ValidationResult) => void,
  setIbanValidation: (validation: ValidationResult) => void,
  setBicValidation: (validation: ValidationResult) => void,
  setAccountNumberValidation: (validation: ValidationResult) => void,
  setBankNameValidation: (validation: ValidationResult) => void,
  setStreetAddressValidation: (validation: ValidationResult) => void,
  setCityValidation: (validation: ValidationResult) => void,
  setPostalCodeValidation: (validation: ValidationResult) => void,
  setPayerEmailValidation: (validation: ValidationResult) => void,
  setLineItemValidation: (validation: ValidationResult) => void,
  setRoutingNumberValidation: (validation: ValidationResult) => void,
  isFiatCurrency: (currency: string) => boolean,
  setChainValidation?: (validation: ValidationResult | null) => void,
  toast?: ToastFn,
) => {
  if (newStatus === "PAYMENTSCHEDULED" || newStatus === "ISSUED") {
    const context: ValidationContext = {
      currency: state.currency,
      currentStatus: state.status,
      targetStatus: newStatus === "PAYMENTSCHEDULED" ? "ISSUED" : "ISSUED",
    };

    // Collect all validation errors
    const validationErrors: ValidationResult[] = [];

    // Validate invoice number
    const invoiceValidation = validateField(
      "invoiceNo",
      state.invoiceNo,
      context,
    );
    setInvoiceValidation(invoiceValidation as any);
    if (invoiceValidation && !invoiceValidation.isValid) {
      validationErrors.push(invoiceValidation);
    }

    // Validate wallet address if currency is crypto
    if (!isFiatCurrency(state.currency)) {
      const walletValidation = validateField(
        "address",
        state.issuer.paymentRouting?.wallet?.address ?? "",
        context,
      );
      setWalletValidation(walletValidation as any);
      if (walletValidation && !walletValidation.isValid) {
        validationErrors.push(walletValidation);
      }
    }

    // Validate currency
    const currencyValidation = validateField(
      "currency",
      state.currency,
      context,
    );
    setCurrencyValidation(currencyValidation as any);
    if (currencyValidation && !currencyValidation.isValid) {
      validationErrors.push(currencyValidation);
    }

    // Validate wallet address and chain (required for all currencies)
    const walletAddressValidation = validateField(
      "walletAddress",
      state.issuer.paymentRouting?.wallet?.address ?? "",
      context,
    );
    setWalletValidation(walletAddressValidation as any);
    if (walletAddressValidation && !walletAddressValidation.isValid) {
      validationErrors.push(walletAddressValidation);
    }

    const walletChainValidation = validateField(
      "walletChain",
      state.issuer.paymentRouting?.wallet?.chainName ||
        state.issuer.paymentRouting?.wallet?.chainId ||
        "",
      context,
    );
    setChainValidation?.(walletChainValidation);
    if (walletChainValidation && !walletChainValidation.isValid) {
      validationErrors.push(walletChainValidation);
    }

    // Validate main country
    const mainCountry = state.issuer.country ?? "";
    const mainCountryValidation = validateField(
      "mainCountry",
      mainCountry,
      context,
    );
    setMainCountryValidation(mainCountryValidation as any);
    if (mainCountryValidation && !mainCountryValidation.isValid) {
      validationErrors.push(mainCountryValidation);
    }

    // Validate bank country
    const bankCountry =
      state.issuer.paymentRouting?.bank?.address?.country ?? "";
    const bankCountryValidation = validateField(
      "bankCountry",
      bankCountry,
      context,
    );
    setBankCountryValidation(bankCountryValidation as any);
    if (bankCountryValidation && !bankCountryValidation.isValid) {
      validationErrors.push(bankCountryValidation);
    }

    // Validate account number or IBAN depending on currency to avoid duplicate validation of the same field
    const IBAN_CURRENCIES = ["EUR", "GBP", "DKK"];
    if (IBAN_CURRENCIES.includes(state.currency)) {
      // Only IBAN applies
      const ibanValidation = validateField(
        "accountNum",
        state.issuer.paymentRouting?.bank?.accountNum,
        context,
      );
      setIbanValidation(ibanValidation as any);
      setAccountNumberValidation(null as any);
      if (ibanValidation && !ibanValidation.isValid) {
        validationErrors.push(ibanValidation);
      }
    } else {
      // Generic account number applies
      const accountNumberValidation = validateField(
        "accountNum",
        state.issuer.paymentRouting?.bank?.accountNum,
        context,
      );
      setAccountNumberValidation(accountNumberValidation as any);
      setIbanValidation(null as any);
      if (accountNumberValidation && !accountNumberValidation.isValid) {
        validationErrors.push(accountNumberValidation);
      }
    }

    // Validate BIC/SWIFT number
    const bicValidation = validateField(
      "bicNumber",
      state.issuer.paymentRouting?.bank?.BIC ||
        state.issuer.paymentRouting?.bank?.SWIFT,
      context,
    );
    setBicValidation(bicValidation as any);
    if (bicValidation && !bicValidation.isValid) {
      validationErrors.push(bicValidation);
    }

    // Validate routing number
    const routingNumberValidation = validateField(
      "routingNumber",
      state.issuer.paymentRouting?.bank?.ABA,
      context,
    );
    const usdIbanPayment =
      isValidIBAN(state.issuer.paymentRouting?.bank?.accountNum ?? "") &&
      state.currency === "USD";
    setRoutingNumberValidation(
      usdIbanPayment ? null : (routingNumberValidation as any),
    );
    if (
      usdIbanPayment
        ? null
        : routingNumberValidation && !routingNumberValidation.isValid
    ) {
      validationErrors.push(
        usdIbanPayment
          ? { isValid: true, message: "", severity: "none" }
          : (routingNumberValidation as any),
      );
    }

    // Validate bank name
    const bankNameValidation = validateField(
      "bankName",
      state.issuer.paymentRouting?.bank?.name,
      context,
    );
    setBankNameValidation(bankNameValidation as any);
    if (bankNameValidation && !bankNameValidation.isValid) {
      validationErrors.push(bankNameValidation);
    }

    // Validate street address
    const streetAddressValidation = validateField(
      "streetAddress",
      state.issuer.address?.streetAddress,
      context,
    );
    setStreetAddressValidation(streetAddressValidation as any);
    if (streetAddressValidation && !streetAddressValidation.isValid) {
      validationErrors.push(streetAddressValidation);
    }

    // Validate city
    const cityValidation = validateField(
      "city",
      state.issuer.address?.city,
      context,
    );
    setCityValidation(cityValidation as any);
    if (cityValidation && !cityValidation.isValid) {
      validationErrors.push(cityValidation);
    }

    // Validate postal code
    const postalCodeValidation = validateField(
      "postalCode",
      state.issuer.address?.postalCode,
      context,
    );
    setPostalCodeValidation(postalCodeValidation as any);
    if (postalCodeValidation && !postalCodeValidation.isValid) {
      validationErrors.push(postalCodeValidation);
    }

    // Validate payer email
    const payerEmailValidation = validateField(
      "email",
      state.payer.contactInfo?.email,
      context,
    );
    setPayerEmailValidation(payerEmailValidation as any);
    if (payerEmailValidation && !payerEmailValidation.isValid) {
      validationErrors.push(payerEmailValidation);
    }

    // Validate line items
    const lineItemValidation = validateField(
      "lineItem",
      state.lineItems,
      context,
    );
    setLineItemValidation(lineItemValidation as any);
    if (lineItemValidation && !lineItemValidation.isValid) {
      validationErrors.push(lineItemValidation);
    }

    if (
      newStatus === "PAYMENTSCHEDULED" &&
      !isFiatCurrency(state.currency) &&
      state.issuer.paymentRouting?.wallet?.chainName === ""
    ) {
      validationErrors.push({
        message: "Select currency and chain before accepting invoice",
        severity: "warning",
        isValid: false,
      });
    }

    // If there are any validation errors, show them and return
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        toast?.(error.message, {
          type: error.severity === "error" ? "error" : "warning",
        });
      });
      return true;
    } else {
      return false;
    }
  }
};

export default validateStatusBeforeContinue;
