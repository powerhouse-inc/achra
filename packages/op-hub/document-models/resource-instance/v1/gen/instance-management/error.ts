export type ErrorCode =
  | "InvalidStatusTransitionError"
  | "InvalidStatusTransitionReportProvisioningStartedError"
  | "InvalidStatusTransitionReportProvisioningCompletedError"
  | "InvalidStatusTransitionReportProvisioningFailedError"
  | "InvalidStatusTransitionActivateInstanceError"
  | "ProvisioningNotCompletedError"
  | "InvalidStatusTransitionSuspendForNonPaymentError"
  | "InvalidStatusTransitionSuspendForMaintenanceError"
  | "InvalidStatusTransitionResumeAfterPaymentError"
  | "InvalidSuspensionTypeError"
  | "InvalidStatusTransitionResumeAfterMaintenanceError"
  | "InvalidSuspensionTypeResumeAfterMaintenanceError"
  | "InvalidStatusTransitionSuspendInstanceError"
  | "AlreadyTerminatedError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class InvalidStatusTransitionError
  extends Error
  implements ReducerError
{
  errorCode = "InvalidStatusTransitionError" as ErrorCode;
  constructor(message = "InvalidStatusTransitionError") {
    super(message);
  }
}

export class InvalidStatusTransitionReportProvisioningStartedError
  extends Error
  implements ReducerError
{
  errorCode =
    "InvalidStatusTransitionReportProvisioningStartedError" as ErrorCode;
  constructor(
    message = "InvalidStatusTransitionReportProvisioningStartedError",
  ) {
    super(message);
  }
}

export class InvalidStatusTransitionReportProvisioningCompletedError
  extends Error
  implements ReducerError
{
  errorCode =
    "InvalidStatusTransitionReportProvisioningCompletedError" as ErrorCode;
  constructor(
    message = "InvalidStatusTransitionReportProvisioningCompletedError",
  ) {
    super(message);
  }
}

export class InvalidStatusTransitionReportProvisioningFailedError
  extends Error
  implements ReducerError
{
  errorCode =
    "InvalidStatusTransitionReportProvisioningFailedError" as ErrorCode;
  constructor(
    message = "InvalidStatusTransitionReportProvisioningFailedError",
  ) {
    super(message);
  }
}

export class InvalidStatusTransitionActivateInstanceError
  extends Error
  implements ReducerError
{
  errorCode = "InvalidStatusTransitionActivateInstanceError" as ErrorCode;
  constructor(message = "InvalidStatusTransitionActivateInstanceError") {
    super(message);
  }
}

export class ProvisioningNotCompletedError
  extends Error
  implements ReducerError
{
  errorCode = "ProvisioningNotCompletedError" as ErrorCode;
  constructor(message = "ProvisioningNotCompletedError") {
    super(message);
  }
}

export class InvalidStatusTransitionSuspendForNonPaymentError
  extends Error
  implements ReducerError
{
  errorCode = "InvalidStatusTransitionSuspendForNonPaymentError" as ErrorCode;
  constructor(message = "InvalidStatusTransitionSuspendForNonPaymentError") {
    super(message);
  }
}

export class InvalidStatusTransitionSuspendForMaintenanceError
  extends Error
  implements ReducerError
{
  errorCode = "InvalidStatusTransitionSuspendForMaintenanceError" as ErrorCode;
  constructor(message = "InvalidStatusTransitionSuspendForMaintenanceError") {
    super(message);
  }
}

export class InvalidStatusTransitionResumeAfterPaymentError
  extends Error
  implements ReducerError
{
  errorCode = "InvalidStatusTransitionResumeAfterPaymentError" as ErrorCode;
  constructor(message = "InvalidStatusTransitionResumeAfterPaymentError") {
    super(message);
  }
}

export class InvalidSuspensionTypeError extends Error implements ReducerError {
  errorCode = "InvalidSuspensionTypeError" as ErrorCode;
  constructor(message = "InvalidSuspensionTypeError") {
    super(message);
  }
}

export class InvalidStatusTransitionResumeAfterMaintenanceError
  extends Error
  implements ReducerError
{
  errorCode = "InvalidStatusTransitionResumeAfterMaintenanceError" as ErrorCode;
  constructor(message = "InvalidStatusTransitionResumeAfterMaintenanceError") {
    super(message);
  }
}

export class InvalidSuspensionTypeResumeAfterMaintenanceError
  extends Error
  implements ReducerError
{
  errorCode = "InvalidSuspensionTypeResumeAfterMaintenanceError" as ErrorCode;
  constructor(message = "InvalidSuspensionTypeResumeAfterMaintenanceError") {
    super(message);
  }
}

export class InvalidStatusTransitionSuspendInstanceError
  extends Error
  implements ReducerError
{
  errorCode = "InvalidStatusTransitionSuspendInstanceError" as ErrorCode;
  constructor(message = "InvalidStatusTransitionSuspendInstanceError") {
    super(message);
  }
}

export class AlreadyTerminatedError extends Error implements ReducerError {
  errorCode = "AlreadyTerminatedError" as ErrorCode;
  constructor(message = "AlreadyTerminatedError") {
    super(message);
  }
}

export const errors = {
  ConfirmInstance: { InvalidStatusTransitionError },
  ReportProvisioningStarted: {
    InvalidStatusTransitionReportProvisioningStartedError,
  },
  ReportProvisioningCompleted: {
    InvalidStatusTransitionReportProvisioningCompletedError,
  },
  ReportProvisioningFailed: {
    InvalidStatusTransitionReportProvisioningFailedError,
  },
  ActivateInstance: {
    InvalidStatusTransitionActivateInstanceError,
    ProvisioningNotCompletedError,
  },
  SuspendForNonPayment: { InvalidStatusTransitionSuspendForNonPaymentError },
  SuspendForMaintenance: { InvalidStatusTransitionSuspendForMaintenanceError },
  ResumeAfterPayment: {
    InvalidStatusTransitionResumeAfterPaymentError,
    InvalidSuspensionTypeError,
  },
  ResumeAfterMaintenance: {
    InvalidStatusTransitionResumeAfterMaintenanceError,
    InvalidSuspensionTypeResumeAfterMaintenanceError,
  },
  SuspendInstance: { InvalidStatusTransitionSuspendInstanceError },
  TerminateInstance: { AlreadyTerminatedError },
};
