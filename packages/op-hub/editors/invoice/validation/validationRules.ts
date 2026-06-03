import type { ValidationRule } from "./validationManager.js";

// Helper function to validate Ethereum address
function isValidEthereumAddress(address: string): boolean {
  const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethereumAddressRegex.test(address);
}

export function isValidIBAN(iban: string): boolean {
  const ibanRegex =
    /^([A-Z]{2}[-]?[0-9]{2})(?=(?:[ -]?[A-Z0-9]){9,30}$)((?:[ -]?[A-Z0-9]{3,5}){2,7})([-]?[A-Z0-9]{1,3})?$/;

  // Extract country code from IBAN (first 2 letters)
  const countryCode = iban.substring(0, 2).toUpperCase();

  // If IBAN starts with a valid country code (2 letters), validate full IBAN format
  if (/^[A-Z]{2}$/.test(countryCode)) {
    return ibanRegex.test(iban);
  }

  return false;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Invoice number validation rule
export const invoiceNumberRule: ValidationRule = {
  field: "invoiceNo",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Invoice number is required",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["ALL"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

// Ethereum address validation rule
export const ethereumAddressRule: ValidationRule = {
  field: "address",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Wallet address is required",
        severity: "error",
      };
    }
    if (!isValidEthereumAddress(value)) {
      return {
        isValid: false,
        message: "Invalid Ethereum address format",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["USDS", "DAI", "USDC"], // Only apply for crypto currencies
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

// Wallet chain validation rule - chain must be set for all currencies
export const walletChainRule: ValidationRule = {
  field: "walletChain",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Wallet chain is required before issuing",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["USDS", "DAI", "USDC"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

export const currencyRule: ValidationRule = {
  field: "currency",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Currency is required",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["ALL"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

export const mainCountryRule: ValidationRule = {
  field: "mainCountry",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Country is required",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["USD", "EUR", "GBP", "JPY", "CNY", "CHF"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

export const bankCountryRule: ValidationRule = {
  field: "bankCountry",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Bank country is required",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["USD", "EUR", "GBP", "JPY", "CNY", "CHF"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

export const accountIbanRule: ValidationRule = {
  field: "accountNum",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Account number is required",
        severity: "warning",
      };
    }
    if (!isValidIBAN(value)) {
      return {
        isValid: false,
        message:
          "Invalid account number format - For IBAN, ensure it starts with country code and follows IBAN format",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["EUR", "GBP", "DKK"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

export const accountNumberRule: ValidationRule = {
  field: "accountNum",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Account number is required",
        severity: "warning",
      };
    }
    // Valid account numbers are 6-25 alphanumeric characters. If it DOES NOT match, it's invalid.
    if (!/^[\da-zA-Z]{6,25}$/.test(value)) {
      return {
        isValid: false,
        message:
          "Invalid account number format - For account number, ensure it is 6-25 characters long",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["USD", "JPY", "CNY", "CHF"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

export const bicNumberRule: ValidationRule = {
  field: "bicNumber",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "BIC/SWIFT number is required",
        severity: "warning",
      };
    }
    if (value) {
      const bicRegex = /^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/i;
      if (!bicRegex.test(value)) {
        return {
          isValid: false,
          message: "Invalid BIC/SWIFT number format",
          severity: "warning",
        };
      }
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["EUR", "GBP", "USD"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

export const bankNameRule: ValidationRule = {
  field: "bankName",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Bank name is required",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["USD", "EUR", "GBP", "JPY", "CNY", "CHF"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

export const issuerStreetAddressRule: ValidationRule = {
  field: "streetAddress",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Street address is required",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["USD", "EUR", "GBP", "JPY", "CNY", "CHF"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

export const issuerCityRule: ValidationRule = {
  field: "city",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "City is required",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["USD", "EUR", "GBP", "JPY", "CNY", "CHF"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

export const issuerPostalCodeRule: ValidationRule = {
  field: "postalCode",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Postal code is required",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["USD", "EUR", "GBP", "JPY", "CNY", "CHF"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

export const payerEmailRule: ValidationRule = {
  field: "email",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Email is required",
        severity: "warning",
      };
    }
    if (!isValidEmail(value)) {
      return {
        isValid: false,
        message: "Invalid email format",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["USD", "EUR", "GBP", "JPY", "CNY", "CHF"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

export const lineItemRule: ValidationRule = {
  field: "lineItem",
  validate: (value: string) => {
    if (value.length === 0) {
      return {
        isValid: false,
        message: "Line item is required - Add at least one line item",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["USD", "EUR", "GBP", "JPY", "CNY", "CHF"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};

export const routingNumberRule: ValidationRule = {
  field: "routingNumber",
  validate: (value: string) => {
    if (!value || value.trim() === "") {
      return {
        isValid: false,
        message: "Routing number is required",
        severity: "warning",
      };
    }
    if (value.length !== 9) {
      return {
        isValid: false,
        message: "Routing number must be 9 digits",
        severity: "warning",
      };
    }
    if (!/^[0-9]+$/.test(value)) {
      return {
        isValid: false,
        message: "Routing number must contain only digits",
        severity: "warning",
      };
    }
    return {
      isValid: true,
      message: "",
      severity: "none",
    };
  },
  appliesTo: {
    currencies: ["USD"],
    statusTransitions: {
      from: ["DRAFT"],
      to: ["ISSUED"],
    },
  },
};
