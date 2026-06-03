export type ErrorCode =
  | "DuplicateAccountError"
  | "UpdateAccountTypeNotFoundError"
  | "RemoveAccountNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class DuplicateAccountError extends Error implements ReducerError {
  errorCode = "DuplicateAccountError" as ErrorCode;
  constructor(message = "DuplicateAccountError") {
    super(message);
  }
}

export class UpdateAccountTypeNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateAccountTypeNotFoundError" as ErrorCode;
  constructor(message = "UpdateAccountTypeNotFoundError") {
    super(message);
  }
}

export class RemoveAccountNotFoundError extends Error implements ReducerError {
  errorCode = "RemoveAccountNotFoundError" as ErrorCode;
  constructor(message = "RemoveAccountNotFoundError") {
    super(message);
  }
}

export const errors = {
  AddSnapshotAccount: { DuplicateAccountError },
  UpdateSnapshotAccountType: { UpdateAccountTypeNotFoundError },
  RemoveSnapshotAccount: { RemoveAccountNotFoundError },
};
