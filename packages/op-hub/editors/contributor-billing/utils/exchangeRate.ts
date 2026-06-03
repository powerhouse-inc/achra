// Cache for exchange rates to avoid repeated API calls
const exchangeRateCache: Record<string, number> = {};

// Type definitions for API responses
interface ExchangeRateAPIResponse {
  rates?: Record<string, number>;
}

interface CoinGeckoResponse {
  [coinId: string]: Record<string, number>;
}

/**
 * Validates if an amount should trigger an exchange rate fetch
 */
const isValidAmount = (amount: number | undefined): boolean => {
  if (amount === undefined) return false;
  return !isNaN(amount) && amount > 0;
};

/**
 * Fetches the exchange rate between two currencies using ExchangeRate-API.
 * Supports both fiat and crypto currencies.
 * @param fromCurrency - The currency code to convert from (e.g., 'USD', 'DAI').
 * @param toCurrency - The currency code to convert to (e.g., 'EUR', 'USDS').
 * @param amount - The amount to convert (optional, used for validation).
 * @returns The exchange rate from fromCurrency to toCurrency.
 */
export const getExchangeRate = async (
  fromCurrency: string,
  toCurrency: string,
  amount?: number,
): Promise<number> => {
  // Normalize inputs
  const base = (fromCurrency || "").trim().toUpperCase();
  const quote = (toCurrency || "").trim().toUpperCase();

  // Guard empty currencies
  if (!base || !quote) {
    return 1;
  }

  // Return 1 if currencies are the same
  if (base === quote) {
    return 1;
  }

  // Skip API call if amount is explicitly provided and invalid
  if (amount !== undefined && !isValidAmount(amount)) {
    return 1;
  }

  // Create cache key
  const cacheKey = `${base}_${quote}`;

  // Return cached rate if available
  const cachedRate = exchangeRateCache[cacheKey];
  if (cachedRate !== undefined) {
    return cachedRate;
  }

  try {
    // Use a CORS-friendly endpoint that does not redirect
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`https://open.er-api.com/v6/latest/${base}`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.status}`);
    }

    const data = (await response.json()) as ExchangeRateAPIResponse;

    if (!data.rates || !data.rates[quote]) {
      throw new Error(`Exchange rate not found for ${base} to ${quote}`);
    }

    const exchangeRate = data.rates[quote];

    // Cache the result
    exchangeRateCache[cacheKey] = exchangeRate;

    return exchangeRate;
  } catch (error) {
    console.error("ExchangeRate-API error:", error);

    // Fallback: try CoinGecko for crypto currencies
    if (["USDS", "DAI"].includes(base) || ["USDS", "DAI"].includes(quote)) {
      try {
        const cryptoMapping: Record<string, string> = {
          USDS: "usd-coin",
          DAI: "dai",
        };

        const fromMapped = cryptoMapping[base] || base.toLowerCase();
        const toMapped = cryptoMapping[quote] || quote.toLowerCase();

        if (cryptoMapping[base]) {
          const cryptoController = new AbortController();
          const cryptoTimeoutId = setTimeout(
            () => cryptoController.abort(),
            8000,
          );

          const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${fromMapped}&vs_currencies=${toMapped}`,
            { signal: cryptoController.signal },
          );

          clearTimeout(cryptoTimeoutId);
          if (response.ok) {
            const data = (await response.json()) as CoinGeckoResponse;
            const rate = data[fromMapped]?.[toMapped];
            if (rate) {
              exchangeRateCache[cacheKey] = rate;
              return rate;
            }
          }
        } else if (cryptoMapping[quote]) {
          const cryptoController2 = new AbortController();
          const cryptoTimeoutId2 = setTimeout(
            () => cryptoController2.abort(),
            8000,
          );

          const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${toMapped}&vs_currencies=${fromMapped}`,
            { signal: cryptoController2.signal },
          );

          clearTimeout(cryptoTimeoutId2);
          if (response.ok) {
            const data = (await response.json()) as CoinGeckoResponse;
            const rate = data[toMapped]?.[fromMapped];
            if (rate) {
              const invertedRate = 1 / rate;
              exchangeRateCache[cacheKey] = invertedRate;
              return invertedRate;
            }
          }
        }
      } catch (cryptoError) {
        console.error("Crypto fallback error:", cryptoError);
      }
    }

    return 1; // Final fallback to 1:1 on error
  }
};

/** Currency list for selectors */
export const currencyList = [
  { ticker: "USDS", crypto: true },
  { ticker: "USDC", crypto: true },
  { ticker: "DAI", crypto: true },
  { ticker: "EURC", crypto: true },
  { ticker: "EURE", crypto: true },
  { ticker: "USD", crypto: false },
  { ticker: "EUR", crypto: false },
  { ticker: "DKK", crypto: false },
  { ticker: "GBP", crypto: false },
  { ticker: "JPY", crypto: false },
  { ticker: "CNY", crypto: false },
  { ticker: "CHF", crypto: false },
];
