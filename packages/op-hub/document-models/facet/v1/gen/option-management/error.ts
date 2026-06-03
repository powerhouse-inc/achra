export type ErrorCode =
  | "DuplicateOptionIdError"
  | "OptionNotFoundError"
  | "RemoveOptionNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class DuplicateOptionIdError extends Error implements ReducerError {
  errorCode = "DuplicateOptionIdError" as ErrorCode;
  constructor(message = "DuplicateOptionIdError") {
    super(message);
  }
}

export class OptionNotFoundError extends Error implements ReducerError {
  errorCode = "OptionNotFoundError" as ErrorCode;
  constructor(message = "OptionNotFoundError") {
    super(message);
  }
}

export class RemoveOptionNotFoundError extends Error implements ReducerError {
  errorCode = "RemoveOptionNotFoundError" as ErrorCode;
  constructor(message = "RemoveOptionNotFoundError") {
    super(message);
  }
}

export const errors = {
  AddOption: { DuplicateOptionIdError },
  UpdateOption: { OptionNotFoundError },
  RemoveOption: { RemoveOptionNotFoundError },
};
