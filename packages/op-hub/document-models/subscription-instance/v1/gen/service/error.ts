export type ErrorCode =
  | "SubscriptionNotActiveAddServiceError"
  | "RemoveServiceNotFoundError"
  | "SubscriptionNotActiveRemoveServiceError"
  | "UpdateServiceSetupCostNotFoundError"
  | "UpdateServiceRecurringCostNotFoundError"
  | "ReportSetupPaymentServiceNotFoundError"
  | "ReportSetupPaymentAlreadyPaidError"
  | "ReportSetupPaymentNoCostError"
  | "ReportSetupPaymentNothingOwedError"
  | "ReportRecurringPaymentServiceNotFoundError"
  | "ReportRecurringPaymentAlreadyPaidThisCycleError"
  | "ReportRecurringPaymentNoCostError"
  | "ReportRecurringPaymentNothingOwedError"
  | "UpdateServiceInfoNotFoundError"
  | "AddServiceFacetSelectionServiceNotFoundError"
  | "RemoveServiceFacetSelectionServiceNotFoundError"
  | "ReportOveragePaymentExceedsDebtError"
  | "ReportOveragePaymentInvalidAmountError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class SubscriptionNotActiveAddServiceError
  extends Error
  implements ReducerError
{
  errorCode = "SubscriptionNotActiveAddServiceError" as ErrorCode;
  constructor(message = "SubscriptionNotActiveAddServiceError") {
    super(message);
  }
}

export class RemoveServiceNotFoundError extends Error implements ReducerError {
  errorCode = "RemoveServiceNotFoundError" as ErrorCode;
  constructor(message = "RemoveServiceNotFoundError") {
    super(message);
  }
}

export class SubscriptionNotActiveRemoveServiceError
  extends Error
  implements ReducerError
{
  errorCode = "SubscriptionNotActiveRemoveServiceError" as ErrorCode;
  constructor(message = "SubscriptionNotActiveRemoveServiceError") {
    super(message);
  }
}

export class UpdateServiceSetupCostNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateServiceSetupCostNotFoundError" as ErrorCode;
  constructor(message = "UpdateServiceSetupCostNotFoundError") {
    super(message);
  }
}

export class UpdateServiceRecurringCostNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateServiceRecurringCostNotFoundError" as ErrorCode;
  constructor(message = "UpdateServiceRecurringCostNotFoundError") {
    super(message);
  }
}

export class ReportSetupPaymentServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "ReportSetupPaymentServiceNotFoundError" as ErrorCode;
  constructor(message = "ReportSetupPaymentServiceNotFoundError") {
    super(message);
  }
}

export class ReportSetupPaymentAlreadyPaidError
  extends Error
  implements ReducerError
{
  errorCode = "ReportSetupPaymentAlreadyPaidError" as ErrorCode;
  constructor(message = "ReportSetupPaymentAlreadyPaidError") {
    super(message);
  }
}

export class ReportSetupPaymentNoCostError
  extends Error
  implements ReducerError
{
  errorCode = "ReportSetupPaymentNoCostError" as ErrorCode;
  constructor(message = "ReportSetupPaymentNoCostError") {
    super(message);
  }
}

export class ReportSetupPaymentNothingOwedError
  extends Error
  implements ReducerError
{
  errorCode = "ReportSetupPaymentNothingOwedError" as ErrorCode;
  constructor(message = "ReportSetupPaymentNothingOwedError") {
    super(message);
  }
}

export class ReportRecurringPaymentServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "ReportRecurringPaymentServiceNotFoundError" as ErrorCode;
  constructor(message = "ReportRecurringPaymentServiceNotFoundError") {
    super(message);
  }
}

export class ReportRecurringPaymentAlreadyPaidThisCycleError
  extends Error
  implements ReducerError
{
  errorCode = "ReportRecurringPaymentAlreadyPaidThisCycleError" as ErrorCode;
  constructor(message = "ReportRecurringPaymentAlreadyPaidThisCycleError") {
    super(message);
  }
}

export class ReportRecurringPaymentNoCostError
  extends Error
  implements ReducerError
{
  errorCode = "ReportRecurringPaymentNoCostError" as ErrorCode;
  constructor(message = "ReportRecurringPaymentNoCostError") {
    super(message);
  }
}

export class ReportRecurringPaymentNothingOwedError
  extends Error
  implements ReducerError
{
  errorCode = "ReportRecurringPaymentNothingOwedError" as ErrorCode;
  constructor(message = "ReportRecurringPaymentNothingOwedError") {
    super(message);
  }
}

export class UpdateServiceInfoNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateServiceInfoNotFoundError" as ErrorCode;
  constructor(message = "UpdateServiceInfoNotFoundError") {
    super(message);
  }
}

export class AddServiceFacetSelectionServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "AddServiceFacetSelectionServiceNotFoundError" as ErrorCode;
  constructor(message = "AddServiceFacetSelectionServiceNotFoundError") {
    super(message);
  }
}

export class RemoveServiceFacetSelectionServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveServiceFacetSelectionServiceNotFoundError" as ErrorCode;
  constructor(message = "RemoveServiceFacetSelectionServiceNotFoundError") {
    super(message);
  }
}

export class ReportOveragePaymentExceedsDebtError
  extends Error
  implements ReducerError
{
  errorCode = "ReportOveragePaymentExceedsDebtError" as ErrorCode;
  constructor(message = "ReportOveragePaymentExceedsDebtError") {
    super(message);
  }
}

export class ReportOveragePaymentInvalidAmountError
  extends Error
  implements ReducerError
{
  errorCode = "ReportOveragePaymentInvalidAmountError" as ErrorCode;
  constructor(message = "ReportOveragePaymentInvalidAmountError") {
    super(message);
  }
}

export const errors = {
  AddService: { SubscriptionNotActiveAddServiceError },

  RemoveService: {
    RemoveServiceNotFoundError,
    SubscriptionNotActiveRemoveServiceError,
  },

  UpdateServiceSetupCost: { UpdateServiceSetupCostNotFoundError },

  UpdateServiceRecurringCost: { UpdateServiceRecurringCostNotFoundError },

  ReportSetupPayment: {
    ReportSetupPaymentServiceNotFoundError,
    ReportSetupPaymentAlreadyPaidError,
    ReportSetupPaymentNoCostError,
    ReportSetupPaymentNothingOwedError,
  },

  ReportRecurringPayment: {
    ReportRecurringPaymentServiceNotFoundError,
    ReportRecurringPaymentAlreadyPaidThisCycleError,
    ReportRecurringPaymentNoCostError,
    ReportRecurringPaymentNothingOwedError,
  },

  UpdateServiceInfo: { UpdateServiceInfoNotFoundError },

  AddServiceFacetSelection: { AddServiceFacetSelectionServiceNotFoundError },

  RemoveServiceFacetSelection: {
    RemoveServiceFacetSelectionServiceNotFoundError,
  },

  ReportOveragePayment: {
    ReportOveragePaymentExceedsDebtError,
    ReportOveragePaymentInvalidAmountError,
  },
};
