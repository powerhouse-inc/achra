export type ErrorCode =
  | "DuplicateOptionGroupIdError"
  | "UpdateOptionGroupNotFoundError"
  | "DeleteOptionGroupNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class DuplicateOptionGroupIdError extends Error implements ReducerError {
  errorCode = "DuplicateOptionGroupIdError" as ErrorCode;
  constructor(message = "DuplicateOptionGroupIdError") {
    super(message);
  }
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

export const errors = {
  AddOptionGroup: { DuplicateOptionGroupIdError },
  UpdateOptionGroup: { UpdateOptionGroupNotFoundError },
  DeleteOptionGroup: { DeleteOptionGroupNotFoundError },
};
