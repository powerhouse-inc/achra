export type ErrorCode =
  | "SetStartingBalanceAccountNotFoundError"
  | "SetEndingBalanceAccountNotFoundError"
  | "RemoveStartingBalanceNotFoundError"
  | "RemoveEndingBalanceNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class SetStartingBalanceAccountNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "SetStartingBalanceAccountNotFoundError" as ErrorCode;
  constructor(message = "SetStartingBalanceAccountNotFoundError") {
    super(message);
  }
}

export class SetEndingBalanceAccountNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "SetEndingBalanceAccountNotFoundError" as ErrorCode;
  constructor(message = "SetEndingBalanceAccountNotFoundError") {
    super(message);
  }
}

export class RemoveStartingBalanceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveStartingBalanceNotFoundError" as ErrorCode;
  constructor(message = "RemoveStartingBalanceNotFoundError") {
    super(message);
  }
}

export class RemoveEndingBalanceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveEndingBalanceNotFoundError" as ErrorCode;
  constructor(message = "RemoveEndingBalanceNotFoundError") {
    super(message);
  }
}

export const errors = {
  SetStartingBalance: { SetStartingBalanceAccountNotFoundError },
  SetEndingBalance: { SetEndingBalanceAccountNotFoundError },
  RemoveStartingBalance: { RemoveStartingBalanceNotFoundError },
  RemoveEndingBalance: { RemoveEndingBalanceNotFoundError },
};
