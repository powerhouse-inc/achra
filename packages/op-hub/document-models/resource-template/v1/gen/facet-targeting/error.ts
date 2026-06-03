export type ErrorCode =
  | "FacetTargetNotFoundError"
  | "AddFacetOptionTargetNotFoundError"
  | "RemoveFacetOptionTargetNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class FacetTargetNotFoundError extends Error implements ReducerError {
  errorCode = "FacetTargetNotFoundError" as ErrorCode;
  constructor(message = "FacetTargetNotFoundError") {
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

export const errors = {
  RemoveFacetTarget: { FacetTargetNotFoundError },
  AddFacetOption: { AddFacetOptionTargetNotFoundError },
  RemoveFacetOption: { RemoveFacetOptionTargetNotFoundError },
};
