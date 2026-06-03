export type ErrorCode =
  | "DuplicateBonusClauseIdError"
  | "BonusClauseNotFoundError"
  | "DuplicatePenaltyClauseIdError"
  | "PenaltyClauseNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class DuplicateBonusClauseIdError extends Error implements ReducerError {
  errorCode = "DuplicateBonusClauseIdError" as ErrorCode;
  constructor(message = "DuplicateBonusClauseIdError") {
    super(message);
  }
}

export class BonusClauseNotFoundError extends Error implements ReducerError {
  errorCode = "BonusClauseNotFoundError" as ErrorCode;
  constructor(message = "BonusClauseNotFoundError") {
    super(message);
  }
}

export class DuplicatePenaltyClauseIdError
  extends Error
  implements ReducerError
{
  errorCode = "DuplicatePenaltyClauseIdError" as ErrorCode;
  constructor(message = "DuplicatePenaltyClauseIdError") {
    super(message);
  }
}

export class PenaltyClauseNotFoundError extends Error implements ReducerError {
  errorCode = "PenaltyClauseNotFoundError" as ErrorCode;
  constructor(message = "PenaltyClauseNotFoundError") {
    super(message);
  }
}

export const errors = {
  AddBonusClause: { DuplicateBonusClauseIdError },
  UpdateBonusClause: { BonusClauseNotFoundError },
  DeleteBonusClause: { BonusClauseNotFoundError },
  AddPenaltyClause: { DuplicatePenaltyClauseIdError },
  UpdatePenaltyClause: { PenaltyClauseNotFoundError },
  DeletePenaltyClause: { PenaltyClauseNotFoundError },
};
