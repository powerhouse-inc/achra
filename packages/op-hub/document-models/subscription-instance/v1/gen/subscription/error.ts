export type ErrorCode =
  | "ActivateNotPendingError"
  | "ActivateMissingSliceIdError"
  | "PauseNotActiveError"
  | "SetExpiringNotActiveError"
  | "CancelAlreadyCancelledError"
  | "CancelMissingSliceIdError"
  | "ResumeNotPausedError"
  | "RenewNotExpiringError"
  | "RenewMissingSliceIdError"
  | "ChangePlanNotActiveError"
  | "BillingCycleSwapNotYetSupportedError"
  | "ChangePlanInvalidEffectiveDateError"
  | "ChangePlanMissingTierPricingError"
  | "NoBillingCycleActiveError"
  | "SettleMissingSliceIdError"
  | "NoInvoiceableLineItemsError"
  | "SettlementDateBeforeCycleStartError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class ActivateNotPendingError extends Error implements ReducerError {
  errorCode = "ActivateNotPendingError" as ErrorCode;
  constructor(message = "ActivateNotPendingError") {
    super(message);
  }
}

export class ActivateMissingSliceIdError extends Error implements ReducerError {
  errorCode = "ActivateMissingSliceIdError" as ErrorCode;
  constructor(message = "ActivateMissingSliceIdError") {
    super(message);
  }
}

export class PauseNotActiveError extends Error implements ReducerError {
  errorCode = "PauseNotActiveError" as ErrorCode;
  constructor(message = "PauseNotActiveError") {
    super(message);
  }
}

export class SetExpiringNotActiveError extends Error implements ReducerError {
  errorCode = "SetExpiringNotActiveError" as ErrorCode;
  constructor(message = "SetExpiringNotActiveError") {
    super(message);
  }
}

export class CancelAlreadyCancelledError extends Error implements ReducerError {
  errorCode = "CancelAlreadyCancelledError" as ErrorCode;
  constructor(message = "CancelAlreadyCancelledError") {
    super(message);
  }
}

export class CancelMissingSliceIdError extends Error implements ReducerError {
  errorCode = "CancelMissingSliceIdError" as ErrorCode;
  constructor(message = "CancelMissingSliceIdError") {
    super(message);
  }
}

export class ResumeNotPausedError extends Error implements ReducerError {
  errorCode = "ResumeNotPausedError" as ErrorCode;
  constructor(message = "ResumeNotPausedError") {
    super(message);
  }
}

export class RenewNotExpiringError extends Error implements ReducerError {
  errorCode = "RenewNotExpiringError" as ErrorCode;
  constructor(message = "RenewNotExpiringError") {
    super(message);
  }
}

export class RenewMissingSliceIdError extends Error implements ReducerError {
  errorCode = "RenewMissingSliceIdError" as ErrorCode;
  constructor(message = "RenewMissingSliceIdError") {
    super(message);
  }
}

export class ChangePlanNotActiveError extends Error implements ReducerError {
  errorCode = "ChangePlanNotActiveError" as ErrorCode;
  constructor(message = "ChangePlanNotActiveError") {
    super(message);
  }
}

export class BillingCycleSwapNotYetSupportedError
  extends Error
  implements ReducerError
{
  errorCode = "BillingCycleSwapNotYetSupportedError" as ErrorCode;
  constructor(message = "BillingCycleSwapNotYetSupportedError") {
    super(message);
  }
}

export class ChangePlanInvalidEffectiveDateError
  extends Error
  implements ReducerError
{
  errorCode = "ChangePlanInvalidEffectiveDateError" as ErrorCode;
  constructor(message = "ChangePlanInvalidEffectiveDateError") {
    super(message);
  }
}

export class ChangePlanMissingTierPricingError
  extends Error
  implements ReducerError
{
  errorCode = "ChangePlanMissingTierPricingError" as ErrorCode;
  constructor(message = "ChangePlanMissingTierPricingError") {
    super(message);
  }
}

export class NoBillingCycleActiveError extends Error implements ReducerError {
  errorCode = "NoBillingCycleActiveError" as ErrorCode;
  constructor(message = "NoBillingCycleActiveError") {
    super(message);
  }
}

export class SettleMissingSliceIdError extends Error implements ReducerError {
  errorCode = "SettleMissingSliceIdError" as ErrorCode;
  constructor(message = "SettleMissingSliceIdError") {
    super(message);
  }
}

export class NoInvoiceableLineItemsError extends Error implements ReducerError {
  errorCode = "NoInvoiceableLineItemsError" as ErrorCode;
  constructor(message = "NoInvoiceableLineItemsError") {
    super(message);
  }
}

export class SettlementDateBeforeCycleStartError
  extends Error
  implements ReducerError
{
  errorCode = "SettlementDateBeforeCycleStartError" as ErrorCode;
  constructor(message = "SettlementDateBeforeCycleStartError") {
    super(message);
  }
}

export const errors = {
  ActivateSubscription: {
    ActivateNotPendingError,
    ActivateMissingSliceIdError,
  },

  PauseSubscription: { PauseNotActiveError },

  SetExpiring: { SetExpiringNotActiveError },

  CancelSubscription: {
    CancelAlreadyCancelledError,
    CancelMissingSliceIdError,
  },

  ResumeSubscription: { ResumeNotPausedError },

  RenewExpiringSubscription: {
    RenewNotExpiringError,
    RenewMissingSliceIdError,
  },

  ChangePlan: {
    ChangePlanNotActiveError,
    BillingCycleSwapNotYetSupportedError,
    ChangePlanInvalidEffectiveDateError,
    ChangePlanMissingTierPricingError,
  },

  GenerateInvoice: {
    NoBillingCycleActiveError,
    SettleMissingSliceIdError,
    NoInvoiceableLineItemsError,
    SettlementDateBeforeCycleStartError,
  },
};
