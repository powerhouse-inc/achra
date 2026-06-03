import type { PaymentTermsClausesOperations } from "document-models/payment-terms/v1";
import {
  BonusClauseNotFoundError,
  DuplicateBonusClauseIdError,
  DuplicatePenaltyClauseIdError,
  PenaltyClauseNotFoundError,
} from "../../gen/clauses/error.js";

export const paymentTermsClausesOperations: PaymentTermsClausesOperations = {
  addBonusClauseOperation(state, action) {
    const existingIndex = state.bonusClauses.findIndex(
      (c) => c.id === action.input.id,
    );
    if (existingIndex !== -1) {
      throw new DuplicateBonusClauseIdError(
        `Bonus clause with ID ${action.input.id} already exists`,
      );
    }

    const newClause = {
      id: action.input.id,
      condition: action.input.condition,
      bonusAmount: action.input.bonusAmount,
      comment: action.input.comment || null,
    };

    state.bonusClauses.push(newClause);
  },
  updateBonusClauseOperation(state, action) {
    const clauseIndex = state.bonusClauses.findIndex(
      (c) => c.id === action.input.id,
    );
    if (clauseIndex === -1) {
      throw new BonusClauseNotFoundError(
        `Bonus clause with ID ${action.input.id} not found`,
      );
    }

    const clause = state.bonusClauses[clauseIndex];
    if (action.input.condition) clause.condition = action.input.condition;
    if (action.input.bonusAmount) clause.bonusAmount = action.input.bonusAmount;
    if (action.input.comment !== undefined)
      clause.comment = action.input.comment || null;
  },
  deleteBonusClauseOperation(state, action) {
    const clauseIndex = state.bonusClauses.findIndex(
      (c) => c.id === action.input.id,
    );
    if (clauseIndex === -1) {
      throw new BonusClauseNotFoundError(
        `Bonus clause with ID ${action.input.id} not found`,
      );
    }

    state.bonusClauses.splice(clauseIndex, 1);
  },
  addPenaltyClauseOperation(state, action) {
    const existingIndex = state.penaltyClauses.findIndex(
      (c) => c.id === action.input.id,
    );
    if (existingIndex !== -1) {
      throw new DuplicatePenaltyClauseIdError(
        `Penalty clause with ID ${action.input.id} already exists`,
      );
    }

    const newClause = {
      id: action.input.id,
      condition: action.input.condition,
      deductionAmount: action.input.deductionAmount,
      comment: action.input.comment || null,
    };

    state.penaltyClauses.push(newClause);
  },
  updatePenaltyClauseOperation(state, action) {
    const clauseIndex = state.penaltyClauses.findIndex(
      (c) => c.id === action.input.id,
    );
    if (clauseIndex === -1) {
      throw new PenaltyClauseNotFoundError(
        `Penalty clause with ID ${action.input.id} not found`,
      );
    }

    const clause = state.penaltyClauses[clauseIndex];
    if (action.input.condition) clause.condition = action.input.condition;
    if (action.input.deductionAmount)
      clause.deductionAmount = action.input.deductionAmount;
    if (action.input.comment !== undefined)
      clause.comment = action.input.comment || null;
  },
  deletePenaltyClauseOperation(state, action) {
    const clauseIndex = state.penaltyClauses.findIndex(
      (c) => c.id === action.input.id,
    );
    if (clauseIndex === -1) {
      throw new PenaltyClauseNotFoundError(
        `Penalty clause with ID ${action.input.id} not found`,
      );
    }

    state.penaltyClauses.splice(clauseIndex, 1);
  },
};
