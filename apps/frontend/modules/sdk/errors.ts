export type SDKErrorCode = 'not-authenticated' | 'signer-not-ready' | 'unknown'

export interface SDKErrorOptions {
  details?: Record<string, unknown>
  cause?: unknown
}

/**
 * Errors fabricated by the SDK itself (auth pre-flight failures, etc).
 *
 * Errors raised by reactor / network / app code inside a signed mutation are
 * passed through unchanged — they are NOT wrapped in SDKError. Discriminate
 * with `isSDKError(error)` and fall back to rendering the original error
 * message for unclassified cases.
 */
export class SDKError extends Error {
  readonly code: SDKErrorCode
  readonly details?: Record<string, unknown>

  constructor(code: SDKErrorCode, message: string, options?: SDKErrorOptions) {
    super(message, options?.cause !== undefined ? { cause: options.cause } : undefined)
    this.name = 'SDKError'
    this.code = code
    this.details = options?.details
  }
}

export function isSDKError(error: unknown): error is SDKError {
  return error instanceof SDKError
}
