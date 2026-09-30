export type ErrorCode =
  | "RemoveFacetTargetNotFoundError"
  | "AddFacetOptionTargetNotFoundError"
  | "RemoveFacetOptionTargetNotFoundError"
  | "ChangeResourceTemplateMismatchError"
  | "NoBillingCyclesSelectedError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class RemoveFacetTargetNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveFacetTargetNotFoundError" as ErrorCode;
  constructor(message = "RemoveFacetTargetNotFoundError") {
    super(message);
  }
}

export class AddFacetOptionTargetNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "AddFacetOptionTargetNotFoundError" as ErrorCode;
  constructor(message = "AddFacetOptionTargetNotFoundError") {
    super(message);
  }
}

export class RemoveFacetOptionTargetNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveFacetOptionTargetNotFoundError" as ErrorCode;
  constructor(message = "RemoveFacetOptionTargetNotFoundError") {
    super(message);
  }
}

export class ChangeResourceTemplateMismatchError
  extends Error
  implements ReducerError
{
  errorCode = "ChangeResourceTemplateMismatchError" as ErrorCode;
  constructor(message = "ChangeResourceTemplateMismatchError") {
    super(message);
  }
}

export class NoBillingCyclesSelectedError
  extends Error
  implements ReducerError
{
  errorCode = "NoBillingCyclesSelectedError" as ErrorCode;
  constructor(message = "NoBillingCyclesSelectedError") {
    super(message);
  }
}

export const errors = {
  RemoveFacetTarget: { RemoveFacetTargetNotFoundError },

  AddFacetOption: { AddFacetOptionTargetNotFoundError },

  RemoveFacetOption: { RemoveFacetOptionTargetNotFoundError },

  ChangeResourceTemplate: { ChangeResourceTemplateMismatchError },

  SetAvailableBillingCycles: { NoBillingCyclesSelectedError },
};
