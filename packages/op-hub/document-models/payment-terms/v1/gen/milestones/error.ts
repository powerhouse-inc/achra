export type ErrorCode = "DuplicateMilestoneIdError" | "MilestoneNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class DuplicateMilestoneIdError extends Error implements ReducerError {
  errorCode = "DuplicateMilestoneIdError" as ErrorCode;
  constructor(message = "DuplicateMilestoneIdError") {
    super(message);
  }
}

export class MilestoneNotFoundError extends Error implements ReducerError {
  errorCode = "MilestoneNotFoundError" as ErrorCode;
  constructor(message = "MilestoneNotFoundError") {
    super(message);
  }
}

export const errors = {
  AddMilestone: { DuplicateMilestoneIdError },
  UpdateMilestone: { MilestoneNotFoundError },
  UpdateMilestoneStatus: { MilestoneNotFoundError },
  DeleteMilestone: { MilestoneNotFoundError },
};
