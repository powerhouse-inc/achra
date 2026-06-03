import type { WorkstreamWorkstreamOperations } from "document-models/workstream/v1";

export const workstreamWorkstreamOperations: WorkstreamWorkstreamOperations = {
  editWorkstreamOperation(state, action) {
    const input = action.input;

    if (input.code !== undefined) {
      state.code = input.code || null;
    }
    if (input.title !== undefined) {
      state.title = input.title || null;
    }
    if (input.status !== undefined) {
      state.status = input.status || "RFP_DRAFT";
    }
    if (input.sowId !== undefined) {
      state.sow = input.sowId || null;
    }
    if (input.paymentTerms !== undefined) {
      state.paymentTerms = input.paymentTerms || null;
    }
  },
  editClientInfoOperation(state, action) {
    const input = action.input;

    if (!state.client) {
      state.client = {
        id: input.clientId,
        name: null,
        icon: null,
      };
    }

    state.client.id = input.clientId;

    if (input.name !== undefined) {
      state.client.name = input.name || null;
    }
    if (input.icon !== undefined) {
      state.client.icon = input.icon || null;
    }
  },
  setRequestForProposalOperation(state, action) {
    const input = action.input;

    state.rfp = {
      id: input.rfpId,
      title: input.title,
    };
  },
  addPaymentRequestOperation(state, action) {
    const input = action.input;

    if (!state.paymentRequests.includes(input.id)) {
      state.paymentRequests.push(input.id);
    }
  },
  removePaymentRequestOperation(state, action) {
    const input = action.input;

    const index = state.paymentRequests.indexOf(input.id);
    if (index > -1) {
      state.paymentRequests.splice(index, 1);
    }
  },
};
