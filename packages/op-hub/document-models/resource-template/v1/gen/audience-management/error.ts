export type ErrorCode = "DuplicateAudienceIdError" | "AudienceNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class DuplicateAudienceIdError extends Error implements ReducerError {
  errorCode = "DuplicateAudienceIdError" as ErrorCode;
  constructor(message = "DuplicateAudienceIdError") {
    super(message);
  }
}

export class AudienceNotFoundError extends Error implements ReducerError {
  errorCode = "AudienceNotFoundError" as ErrorCode;
  constructor(message = "AudienceNotFoundError") {
    super(message);
  }
}

export const errors = {
  AddTargetAudience: { DuplicateAudienceIdError },
  RemoveTargetAudience: { AudienceNotFoundError },
};
