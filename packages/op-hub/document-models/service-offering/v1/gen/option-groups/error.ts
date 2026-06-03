export type ErrorCode =
  | "UpdateOptionGroupNotFoundError"
  | "DeleteOptionGroupNotFoundError"
  | "SetOptionGroupStandalonePricingNotFoundError"
  | "AddOptionGroupTierPricingNotFoundError"
  | "UpdateOptionGroupTierPricingNotFoundError"
  | "RemoveOptionGroupTierPricingNotFoundError"
  | "SetOptionGroupDiscountModeNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class UpdateOptionGroupNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateOptionGroupNotFoundError" as ErrorCode;
  constructor(message = "UpdateOptionGroupNotFoundError") {
    super(message);
  }
}

export class DeleteOptionGroupNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "DeleteOptionGroupNotFoundError" as ErrorCode;
  constructor(message = "DeleteOptionGroupNotFoundError") {
    super(message);
  }
}

export class SetOptionGroupStandalonePricingNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "SetOptionGroupStandalonePricingNotFoundError" as ErrorCode;
  constructor(message = "SetOptionGroupStandalonePricingNotFoundError") {
    super(message);
  }
}

export class AddOptionGroupTierPricingNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "AddOptionGroupTierPricingNotFoundError" as ErrorCode;
  constructor(message = "AddOptionGroupTierPricingNotFoundError") {
    super(message);
  }
}

export class UpdateOptionGroupTierPricingNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateOptionGroupTierPricingNotFoundError" as ErrorCode;
  constructor(message = "UpdateOptionGroupTierPricingNotFoundError") {
    super(message);
  }
}

export class RemoveOptionGroupTierPricingNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveOptionGroupTierPricingNotFoundError" as ErrorCode;
  constructor(message = "RemoveOptionGroupTierPricingNotFoundError") {
    super(message);
  }
}

export class SetOptionGroupDiscountModeNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "SetOptionGroupDiscountModeNotFoundError" as ErrorCode;
  constructor(message = "SetOptionGroupDiscountModeNotFoundError") {
    super(message);
  }
}

export const errors = {
  UpdateOptionGroup: { UpdateOptionGroupNotFoundError },
  DeleteOptionGroup: { DeleteOptionGroupNotFoundError },
  SetOptionGroupStandalonePricing: {
    SetOptionGroupStandalonePricingNotFoundError,
  },
  AddOptionGroupTierPricing: { AddOptionGroupTierPricingNotFoundError },
  UpdateOptionGroupTierPricing: { UpdateOptionGroupTierPricingNotFoundError },
  RemoveOptionGroupTierPricing: { RemoveOptionGroupTierPricingNotFoundError },
  SetOptionGroupDiscountMode: { SetOptionGroupDiscountModeNotFoundError },
};
