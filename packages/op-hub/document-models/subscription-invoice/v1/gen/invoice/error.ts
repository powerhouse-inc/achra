export type ErrorCode =
  | "SubscriptionInvoiceAlreadyInitializedError"
  | "SubscriptionInvoiceNotDraftError"
  | "SubscriptionInvoiceNotIssuedError"
  | "SubscriptionInvoicePaidInvalidAmountError"
  | "SubscriptionInvoiceAlreadyVoidError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class SubscriptionInvoiceAlreadyInitializedError
  extends Error
  implements ReducerError
{
  errorCode = "SubscriptionInvoiceAlreadyInitializedError" as ErrorCode;
  constructor(message = "SubscriptionInvoiceAlreadyInitializedError") {
    super(message);
  }
}

export class SubscriptionInvoiceNotDraftError
  extends Error
  implements ReducerError
{
  errorCode = "SubscriptionInvoiceNotDraftError" as ErrorCode;
  constructor(message = "SubscriptionInvoiceNotDraftError") {
    super(message);
  }
}

export class SubscriptionInvoiceNotIssuedError
  extends Error
  implements ReducerError
{
  errorCode = "SubscriptionInvoiceNotIssuedError" as ErrorCode;
  constructor(message = "SubscriptionInvoiceNotIssuedError") {
    super(message);
  }
}

export class SubscriptionInvoicePaidInvalidAmountError
  extends Error
  implements ReducerError
{
  errorCode = "SubscriptionInvoicePaidInvalidAmountError" as ErrorCode;
  constructor(message = "SubscriptionInvoicePaidInvalidAmountError") {
    super(message);
  }
}

export class SubscriptionInvoiceAlreadyVoidError
  extends Error
  implements ReducerError
{
  errorCode = "SubscriptionInvoiceAlreadyVoidError" as ErrorCode;
  constructor(message = "SubscriptionInvoiceAlreadyVoidError") {
    super(message);
  }
}

export const errors = {
  InitializeSubscriptionInvoice: { SubscriptionInvoiceAlreadyInitializedError },
  MarkSubscriptionInvoiceIssued: { SubscriptionInvoiceNotDraftError },
  MarkSubscriptionInvoicePaid: {
    SubscriptionInvoiceNotIssuedError,
    SubscriptionInvoicePaidInvalidAmountError,
  },
  VoidSubscriptionInvoice: { SubscriptionInvoiceAlreadyVoidError },
};
