export type ErrorCode =
  | "DuplicateTransactionError"
  | "AddTransactionAccountNotFoundError"
  | "RemoveTransactionNotFoundError"
  | "UpdateFlowTypeTransactionNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class DuplicateTransactionError extends Error implements ReducerError {
  errorCode = "DuplicateTransactionError" as ErrorCode;
  constructor(message = "DuplicateTransactionError") {
    super(message);
  }
}

export class AddTransactionAccountNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "AddTransactionAccountNotFoundError" as ErrorCode;
  constructor(message = "AddTransactionAccountNotFoundError") {
    super(message);
  }
}

export class RemoveTransactionNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveTransactionNotFoundError" as ErrorCode;
  constructor(message = "RemoveTransactionNotFoundError") {
    super(message);
  }
}

export class UpdateFlowTypeTransactionNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateFlowTypeTransactionNotFoundError" as ErrorCode;
  constructor(message = "UpdateFlowTypeTransactionNotFoundError") {
    super(message);
  }
}

export const errors = {
  AddTransaction: {
    DuplicateTransactionError,
    AddTransactionAccountNotFoundError,
  },
  RemoveTransaction: { RemoveTransactionNotFoundError },
  UpdateTransactionFlowType: { UpdateFlowTypeTransactionNotFoundError },
};
