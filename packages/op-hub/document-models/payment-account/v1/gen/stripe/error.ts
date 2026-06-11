export type ErrorCode =
  | "EmptyOperatorIdError"
  | "EmptyStripeAccountIdError"
  | "StripeAccountAlreadyConnectedError"
  | "StripeAccountNotConnectedError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class EmptyOperatorIdError extends Error implements ReducerError {
  errorCode = "EmptyOperatorIdError" as ErrorCode;
  constructor(message = "EmptyOperatorIdError") {
    super(message);
  }
}

export class EmptyStripeAccountIdError extends Error implements ReducerError {
  errorCode = "EmptyStripeAccountIdError" as ErrorCode;
  constructor(message = "EmptyStripeAccountIdError") {
    super(message);
  }
}

export class StripeAccountAlreadyConnectedError
  extends Error
  implements ReducerError
{
  errorCode = "StripeAccountAlreadyConnectedError" as ErrorCode;
  constructor(message = "StripeAccountAlreadyConnectedError") {
    super(message);
  }
}

export class StripeAccountNotConnectedError
  extends Error
  implements ReducerError
{
  errorCode = "StripeAccountNotConnectedError" as ErrorCode;
  constructor(message = "StripeAccountNotConnectedError") {
    super(message);
  }
}

export const errors = {
  SetOperator: { EmptyOperatorIdError },
  ConnectStripeAccount: {
    EmptyStripeAccountIdError,
    StripeAccountAlreadyConnectedError,
  },
  SyncStripeAccountStatus: { StripeAccountNotConnectedError },
};
