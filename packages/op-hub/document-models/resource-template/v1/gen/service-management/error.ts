export type ErrorCode =
  | "DuplicateServiceIdError"
  | "UpdateServiceNotFoundError"
  | "DeleteServiceNotFoundError"
  | "AddFacetServiceNotFoundError"
  | "DuplicateBindingIdError"
  | "RemoveFacetServiceNotFoundError"
  | "BindingNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class DuplicateServiceIdError extends Error implements ReducerError {
  errorCode = "DuplicateServiceIdError" as ErrorCode;
  constructor(message = "DuplicateServiceIdError") {
    super(message);
  }
}

export class UpdateServiceNotFoundError extends Error implements ReducerError {
  errorCode = "UpdateServiceNotFoundError" as ErrorCode;
  constructor(message = "UpdateServiceNotFoundError") {
    super(message);
  }
}

export class DeleteServiceNotFoundError extends Error implements ReducerError {
  errorCode = "DeleteServiceNotFoundError" as ErrorCode;
  constructor(message = "DeleteServiceNotFoundError") {
    super(message);
  }
}

export class AddFacetServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "AddFacetServiceNotFoundError" as ErrorCode;
  constructor(message = "AddFacetServiceNotFoundError") {
    super(message);
  }
}

export class DuplicateBindingIdError extends Error implements ReducerError {
  errorCode = "DuplicateBindingIdError" as ErrorCode;
  constructor(message = "DuplicateBindingIdError") {
    super(message);
  }
}

export class RemoveFacetServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveFacetServiceNotFoundError" as ErrorCode;
  constructor(message = "RemoveFacetServiceNotFoundError") {
    super(message);
  }
}

export class BindingNotFoundError extends Error implements ReducerError {
  errorCode = "BindingNotFoundError" as ErrorCode;
  constructor(message = "BindingNotFoundError") {
    super(message);
  }
}

export const errors = {
  AddService: { DuplicateServiceIdError },
  UpdateService: { UpdateServiceNotFoundError },
  DeleteService: { DeleteServiceNotFoundError },
  AddFacetBinding: { AddFacetServiceNotFoundError, DuplicateBindingIdError },
  RemoveFacetBinding: { RemoveFacetServiceNotFoundError, BindingNotFoundError },
};
