import type { PaymentTermsTermsOperations } from "document-models/payment-terms/v1";

export const paymentTermsTermsOperations: PaymentTermsTermsOperations = {
  setBasicTermsOperation(state, action) {
    state.proposer = action.input.proposer;
    state.payer = action.input.payer;
    state.currency = action.input.currency;
    state.paymentModel = action.input.paymentModel;
    state.totalAmount = action.input.totalAmount || null;
  },
  updateStatusOperation(state, action) {
    state.status = action.input.status;
  },
  setCostAndMaterialsOperation(state, action) {
    state.costAndMaterials = {
      hourlyRate: action.input.hourlyRate || null,
      variableCap: action.input.variableCap || null,
      billingFrequency: action.input.billingFrequency,
      timesheetRequired: action.input.timesheetRequired,
    };
  },
  setEscrowDetailsOperation(state, action) {
    state.escrowDetails = {
      amountHeld: action.input.amountHeld,
      proofOfFundsDocumentId: action.input.proofOfFundsDocumentId || null,
      releaseConditions: action.input.releaseConditions,
      escrowProvider: action.input.escrowProvider || null,
    };
  },
  setEvaluationTermsOperation(state, action) {
    state.evaluation = {
      evaluationFrequency: action.input.evaluationFrequency,
      evaluatorTeam: action.input.evaluatorTeam,
      criteria: action.input.criteria,
      impactsPayout: action.input.impactsPayout,
      impactsReputation: action.input.impactsReputation,
      commentsVisibleToClient: action.input.commentsVisibleToClient,
    };
  },
  setRetainerDetailsOperation(state, action) {
    state.retainerDetails = {
      retainerAmount: action.input.retainerAmount,
      billingFrequency: action.input.billingFrequency,
      startDate: action.input.startDate,
      endDate: action.input.endDate || null,
      autoRenew: action.input.autoRenew,
      servicesIncluded: action.input.servicesIncluded,
    };
  },
};
