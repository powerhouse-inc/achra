export type ErrorCode =
  | "MarkLineItemInvalidStatusTransitionError"
  | "DynamicSliceNotYetChargeableError"
  | "MarkLineItemNotFoundError"
  | "ConfirmLineItemNotFoundError"
  | "ConfirmLineItemInvalidStatusTransitionError"
  | "OverPaymentError"
  | "InvalidPaymentAmountError"
  | "ReportPaymentInvalidAmountError"
  | "ReportPaymentNoDebtError"
  | "ApplyCreditLineItemNotFoundError"
  | "ApplyCreditNoDebtError"
  | "ApplyCreditInvalidAmountError"
  | "ApplyCreditAmountExceedsRemainingError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class MarkLineItemInvalidStatusTransitionError
  extends Error
  implements ReducerError
{
  errorCode = "MarkLineItemInvalidStatusTransitionError" as ErrorCode;
  constructor(message = "MarkLineItemInvalidStatusTransitionError") {
    super(message);
  }
}

export class DynamicSliceNotYetChargeableError
  extends Error
  implements ReducerError
{
  errorCode = "DynamicSliceNotYetChargeableError" as ErrorCode;
  constructor(message = "DynamicSliceNotYetChargeableError") {
    super(message);
  }
}

export class MarkLineItemNotFoundError extends Error implements ReducerError {
  errorCode = "MarkLineItemNotFoundError" as ErrorCode;
  constructor(message = "MarkLineItemNotFoundError") {
    super(message);
  }
}

export class ConfirmLineItemNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "ConfirmLineItemNotFoundError" as ErrorCode;
  constructor(message = "ConfirmLineItemNotFoundError") {
    super(message);
  }
}

export class ConfirmLineItemInvalidStatusTransitionError
  extends Error
  implements ReducerError
{
  errorCode = "ConfirmLineItemInvalidStatusTransitionError" as ErrorCode;
  constructor(message = "ConfirmLineItemInvalidStatusTransitionError") {
    super(message);
  }
}

export class OverPaymentError extends Error implements ReducerError {
  errorCode = "OverPaymentError" as ErrorCode;
  constructor(message = "OverPaymentError") {
    super(message);
  }
}

export class InvalidPaymentAmountError extends Error implements ReducerError {
  errorCode = "InvalidPaymentAmountError" as ErrorCode;
  constructor(message = "InvalidPaymentAmountError") {
    super(message);
  }
}

export class ReportPaymentInvalidAmountError
  extends Error
  implements ReducerError
{
  errorCode = "ReportPaymentInvalidAmountError" as ErrorCode;
  constructor(message = "ReportPaymentInvalidAmountError") {
    super(message);
  }
}

export class ReportPaymentNoDebtError extends Error implements ReducerError {
  errorCode = "ReportPaymentNoDebtError" as ErrorCode;
  constructor(message = "ReportPaymentNoDebtError") {
    super(message);
  }
}

export class ApplyCreditLineItemNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "ApplyCreditLineItemNotFoundError" as ErrorCode;
  constructor(message = "ApplyCreditLineItemNotFoundError") {
    super(message);
  }
}

export class ApplyCreditNoDebtError extends Error implements ReducerError {
  errorCode = "ApplyCreditNoDebtError" as ErrorCode;
  constructor(message = "ApplyCreditNoDebtError") {
    super(message);
  }
}

export class ApplyCreditInvalidAmountError
  extends Error
  implements ReducerError
{
  errorCode = "ApplyCreditInvalidAmountError" as ErrorCode;
  constructor(message = "ApplyCreditInvalidAmountError") {
    super(message);
  }
}

export class ApplyCreditAmountExceedsRemainingError
  extends Error
  implements ReducerError
{
  errorCode = "ApplyCreditAmountExceedsRemainingError" as ErrorCode;
  constructor(message = "ApplyCreditAmountExceedsRemainingError") {
    super(message);
  }
}

export const errors = {
  MarkLineItemInvoiced: {
    MarkLineItemInvalidStatusTransitionError,
    DynamicSliceNotYetChargeableError,
    MarkLineItemNotFoundError,
  },
  ConfirmLineItemPayment: {
    ConfirmLineItemNotFoundError,
    ConfirmLineItemInvalidStatusTransitionError,
    OverPaymentError,
    InvalidPaymentAmountError,
  },
  ReportPayment: { ReportPaymentInvalidAmountError, ReportPaymentNoDebtError },
  ApplyCredit: {
    ApplyCreditLineItemNotFoundError,
    ApplyCreditNoDebtError,
    ApplyCreditInvalidAmountError,
    ApplyCreditAmountExceedsRemainingError,
  },
};
