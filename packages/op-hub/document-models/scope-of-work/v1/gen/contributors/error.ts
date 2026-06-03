export type ErrorCode = "AgentDuplicateIdError" | "AgentNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class AgentDuplicateIdError extends Error implements ReducerError {
  errorCode = "AgentDuplicateIdError" as ErrorCode;
  constructor(message = "AgentDuplicateIdError") {
    super(message);
  }
}

export class AgentNotFoundError extends Error implements ReducerError {
  errorCode = "AgentNotFoundError" as ErrorCode;
  constructor(message = "AgentNotFoundError") {
    super(message);
  }
}

export const errors = {
  AddAgent: { AgentDuplicateIdError },
  RemoveAgent: { AgentNotFoundError },
  EditAgent: { AgentNotFoundError },
};
