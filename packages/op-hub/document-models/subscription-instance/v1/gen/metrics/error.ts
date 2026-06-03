export type ErrorCode =
  | "AddServiceMetricServiceNotFoundError"
  | "UpdateMetricServiceNotFoundError"
  | "UpdateMetricNotFoundError"
  | "UpdateMetricUsageServiceNotFoundError"
  | "UpdateMetricUsageNotFoundError"
  | "SubscriptionNotActiveUpdateUsageError"
  | "RemoveServiceMetricServiceNotFoundError"
  | "RemoveServiceMetricNotFoundError"
  | "IncrementMetricUsageServiceNotFoundError"
  | "IncrementMetricUsageNotFoundError"
  | "SubscriptionNotActiveIncrementUsageError"
  | "DecrementMetricUsageServiceNotFoundError"
  | "DecrementMetricUsageNotFoundError"
  | "SubscriptionNotActiveDecrementUsageError"
  | "SubscriptionNotActiveAccrueMetricUsageError"
  | "AccrueMetricUsageServiceNotFoundError"
  | "AccrueMetricUsageMetricNotFoundError"
  | "AccrueMissingSliceIdError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class AddServiceMetricServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "AddServiceMetricServiceNotFoundError" as ErrorCode;
  constructor(message = "AddServiceMetricServiceNotFoundError") {
    super(message);
  }
}

export class UpdateMetricServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateMetricServiceNotFoundError" as ErrorCode;
  constructor(message = "UpdateMetricServiceNotFoundError") {
    super(message);
  }
}

export class UpdateMetricNotFoundError extends Error implements ReducerError {
  errorCode = "UpdateMetricNotFoundError" as ErrorCode;
  constructor(message = "UpdateMetricNotFoundError") {
    super(message);
  }
}

export class UpdateMetricUsageServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateMetricUsageServiceNotFoundError" as ErrorCode;
  constructor(message = "UpdateMetricUsageServiceNotFoundError") {
    super(message);
  }
}

export class UpdateMetricUsageNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateMetricUsageNotFoundError" as ErrorCode;
  constructor(message = "UpdateMetricUsageNotFoundError") {
    super(message);
  }
}

export class SubscriptionNotActiveUpdateUsageError
  extends Error
  implements ReducerError
{
  errorCode = "SubscriptionNotActiveUpdateUsageError" as ErrorCode;
  constructor(message = "SubscriptionNotActiveUpdateUsageError") {
    super(message);
  }
}

export class RemoveServiceMetricServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveServiceMetricServiceNotFoundError" as ErrorCode;
  constructor(message = "RemoveServiceMetricServiceNotFoundError") {
    super(message);
  }
}

export class RemoveServiceMetricNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveServiceMetricNotFoundError" as ErrorCode;
  constructor(message = "RemoveServiceMetricNotFoundError") {
    super(message);
  }
}

export class IncrementMetricUsageServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "IncrementMetricUsageServiceNotFoundError" as ErrorCode;
  constructor(message = "IncrementMetricUsageServiceNotFoundError") {
    super(message);
  }
}

export class IncrementMetricUsageNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "IncrementMetricUsageNotFoundError" as ErrorCode;
  constructor(message = "IncrementMetricUsageNotFoundError") {
    super(message);
  }
}

export class SubscriptionNotActiveIncrementUsageError
  extends Error
  implements ReducerError
{
  errorCode = "SubscriptionNotActiveIncrementUsageError" as ErrorCode;
  constructor(message = "SubscriptionNotActiveIncrementUsageError") {
    super(message);
  }
}

export class DecrementMetricUsageServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "DecrementMetricUsageServiceNotFoundError" as ErrorCode;
  constructor(message = "DecrementMetricUsageServiceNotFoundError") {
    super(message);
  }
}

export class DecrementMetricUsageNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "DecrementMetricUsageNotFoundError" as ErrorCode;
  constructor(message = "DecrementMetricUsageNotFoundError") {
    super(message);
  }
}

export class SubscriptionNotActiveDecrementUsageError
  extends Error
  implements ReducerError
{
  errorCode = "SubscriptionNotActiveDecrementUsageError" as ErrorCode;
  constructor(message = "SubscriptionNotActiveDecrementUsageError") {
    super(message);
  }
}

export class SubscriptionNotActiveAccrueMetricUsageError
  extends Error
  implements ReducerError
{
  errorCode = "SubscriptionNotActiveAccrueMetricUsageError" as ErrorCode;
  constructor(message = "SubscriptionNotActiveAccrueMetricUsageError") {
    super(message);
  }
}

export class AccrueMetricUsageServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "AccrueMetricUsageServiceNotFoundError" as ErrorCode;
  constructor(message = "AccrueMetricUsageServiceNotFoundError") {
    super(message);
  }
}

export class AccrueMetricUsageMetricNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "AccrueMetricUsageMetricNotFoundError" as ErrorCode;
  constructor(message = "AccrueMetricUsageMetricNotFoundError") {
    super(message);
  }
}

export class AccrueMissingSliceIdError extends Error implements ReducerError {
  errorCode = "AccrueMissingSliceIdError" as ErrorCode;
  constructor(message = "AccrueMissingSliceIdError") {
    super(message);
  }
}

export const errors = {
  AddServiceMetric: { AddServiceMetricServiceNotFoundError },
  UpdateMetric: { UpdateMetricServiceNotFoundError, UpdateMetricNotFoundError },
  UpdateMetricUsage: {
    UpdateMetricUsageServiceNotFoundError,
    UpdateMetricUsageNotFoundError,
    SubscriptionNotActiveUpdateUsageError,
  },
  RemoveServiceMetric: {
    RemoveServiceMetricServiceNotFoundError,
    RemoveServiceMetricNotFoundError,
  },
  IncrementMetricUsage: {
    IncrementMetricUsageServiceNotFoundError,
    IncrementMetricUsageNotFoundError,
    SubscriptionNotActiveIncrementUsageError,
  },
  DecrementMetricUsage: {
    DecrementMetricUsageServiceNotFoundError,
    DecrementMetricUsageNotFoundError,
    SubscriptionNotActiveDecrementUsageError,
  },
  AccrueMetricUsage: {
    SubscriptionNotActiveAccrueMetricUsageError,
    AccrueMetricUsageServiceNotFoundError,
    AccrueMetricUsageMetricNotFoundError,
    AccrueMissingSliceIdError,
  },
};
