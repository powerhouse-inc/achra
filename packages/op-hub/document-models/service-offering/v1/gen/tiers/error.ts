export type ErrorCode =
  | "UpdateTierNotFoundError"
  | "UpdateTierPricingNotFoundError"
  | "DeleteTierNotFoundError"
  | "AddServiceLevelTierNotFoundError"
  | "UpdateServiceLevelTierNotFoundError"
  | "UpdateServiceLevelNotFoundError"
  | "RemoveServiceLevelTierNotFoundError"
  | "AddUsageLimitTierNotFoundError"
  | "UpdateUsageLimitTierNotFoundError"
  | "UpdateUsageLimitNotFoundError"
  | "RemoveUsageLimitTierNotFoundError"
  | "SetTierDefaultBillingCycleTierNotFoundError"
  | "SetTierBillingCycleDiscountsTierNotFoundError"
  | "SetTierPricingModeTierNotFoundError"
  | "TierIdsMismatchError"
  | "DuplicateTierIdError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class UpdateTierNotFoundError extends Error implements ReducerError {
  errorCode = "UpdateTierNotFoundError" as ErrorCode;
  constructor(message = "UpdateTierNotFoundError") {
    super(message);
  }
}

export class UpdateTierPricingNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateTierPricingNotFoundError" as ErrorCode;
  constructor(message = "UpdateTierPricingNotFoundError") {
    super(message);
  }
}

export class DeleteTierNotFoundError extends Error implements ReducerError {
  errorCode = "DeleteTierNotFoundError" as ErrorCode;
  constructor(message = "DeleteTierNotFoundError") {
    super(message);
  }
}

export class AddServiceLevelTierNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "AddServiceLevelTierNotFoundError" as ErrorCode;
  constructor(message = "AddServiceLevelTierNotFoundError") {
    super(message);
  }
}

export class UpdateServiceLevelTierNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateServiceLevelTierNotFoundError" as ErrorCode;
  constructor(message = "UpdateServiceLevelTierNotFoundError") {
    super(message);
  }
}

export class UpdateServiceLevelNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateServiceLevelNotFoundError" as ErrorCode;
  constructor(message = "UpdateServiceLevelNotFoundError") {
    super(message);
  }
}

export class RemoveServiceLevelTierNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveServiceLevelTierNotFoundError" as ErrorCode;
  constructor(message = "RemoveServiceLevelTierNotFoundError") {
    super(message);
  }
}

export class AddUsageLimitTierNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "AddUsageLimitTierNotFoundError" as ErrorCode;
  constructor(message = "AddUsageLimitTierNotFoundError") {
    super(message);
  }
}

export class UpdateUsageLimitTierNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateUsageLimitTierNotFoundError" as ErrorCode;
  constructor(message = "UpdateUsageLimitTierNotFoundError") {
    super(message);
  }
}

export class UpdateUsageLimitNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateUsageLimitNotFoundError" as ErrorCode;
  constructor(message = "UpdateUsageLimitNotFoundError") {
    super(message);
  }
}

export class RemoveUsageLimitTierNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveUsageLimitTierNotFoundError" as ErrorCode;
  constructor(message = "RemoveUsageLimitTierNotFoundError") {
    super(message);
  }
}

export class SetTierDefaultBillingCycleTierNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "SetTierDefaultBillingCycleTierNotFoundError" as ErrorCode;
  constructor(message = "SetTierDefaultBillingCycleTierNotFoundError") {
    super(message);
  }
}

export class SetTierBillingCycleDiscountsTierNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "SetTierBillingCycleDiscountsTierNotFoundError" as ErrorCode;
  constructor(message = "SetTierBillingCycleDiscountsTierNotFoundError") {
    super(message);
  }
}

export class SetTierPricingModeTierNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "SetTierPricingModeTierNotFoundError" as ErrorCode;
  constructor(message = "SetTierPricingModeTierNotFoundError") {
    super(message);
  }
}

export class TierIdsMismatchError extends Error implements ReducerError {
  errorCode = "TierIdsMismatchError" as ErrorCode;
  constructor(message = "TierIdsMismatchError") {
    super(message);
  }
}

export class DuplicateTierIdError extends Error implements ReducerError {
  errorCode = "DuplicateTierIdError" as ErrorCode;
  constructor(message = "DuplicateTierIdError") {
    super(message);
  }
}

export const errors = {
  UpdateTier: { UpdateTierNotFoundError },

  UpdateTierPricing: { UpdateTierPricingNotFoundError },

  DeleteTier: { DeleteTierNotFoundError },

  AddServiceLevel: { AddServiceLevelTierNotFoundError },

  UpdateServiceLevel: {
    UpdateServiceLevelTierNotFoundError,
    UpdateServiceLevelNotFoundError,
  },

  RemoveServiceLevel: { RemoveServiceLevelTierNotFoundError },

  AddUsageLimit: { AddUsageLimitTierNotFoundError },

  UpdateUsageLimit: {
    UpdateUsageLimitTierNotFoundError,
    UpdateUsageLimitNotFoundError,
  },

  RemoveUsageLimit: { RemoveUsageLimitTierNotFoundError },

  SetTierDefaultBillingCycle: { SetTierDefaultBillingCycleTierNotFoundError },

  SetTierBillingCycleDiscounts: {
    SetTierBillingCycleDiscountsTierNotFoundError,
  },

  SetTierPricingMode: { SetTierPricingModeTierNotFoundError },

  ReorderTiers: { TierIdsMismatchError, DuplicateTierIdError },
};
