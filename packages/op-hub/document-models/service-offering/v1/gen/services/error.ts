export type ErrorCode =
  | "UpdateServiceNotFoundError"
  | "DeleteServiceNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
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

export const errors = {
  UpdateService: { UpdateServiceNotFoundError },
  DeleteService: { DeleteServiceNotFoundError },
};
