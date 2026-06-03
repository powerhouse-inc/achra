import type { WorkstreamProposalsOperations } from "document-models/workstream/v1";

export const workstreamProposalsOperations: WorkstreamProposalsOperations = {
  editInitialProposalOperation(state, action) {
    const input = action.input;

    if (!state.initialProposal) {
      state.initialProposal = {
        id: input.id,
        sow: "",
        paymentTerms: "",
        status: "DRAFT",
        author: {
          id: "",
          name: null,
          icon: null,
        },
      };
    }

    state.initialProposal.id = input.id;

    if (input.sowId !== undefined) {
      state.initialProposal.sow = input.sowId || "";
      if (state.initialProposal.status === "ACCEPTED") {
        state.sow = input.sowId || null;
      }
    }
    if (input.paymentTermsId !== undefined) {
      state.initialProposal.paymentTerms = input.paymentTermsId || "";
      if (state.initialProposal.status === "ACCEPTED") {
        state.paymentTerms = input.paymentTermsId || null;
      }
    }
    if (input.status !== undefined) {
      state.initialProposal.status = input.status || "DRAFT";
      if (input.status === "ACCEPTED") {
        if (state.alternativeProposals.length > 0) {
          state.alternativeProposals.forEach((proposal) => {
            if (proposal.status === "ACCEPTED") {
              proposal.status = "REJECTED";
            }
          });
        }
        const initialProposalPaymentTerms = state.initialProposal.paymentTerms;
        const intialProposalSow = state.initialProposal.sow;
        state.paymentTerms = initialProposalPaymentTerms || null;
        state.sow = intialProposalSow || null;
      } else {
        state.paymentTerms = null;
        state.sow = null;
      }
    }
    if (input.proposalAuthor !== undefined) {
      if (input.proposalAuthor) {
        state.initialProposal.author = {
          id: input.proposalAuthor.id,
          name: input.proposalAuthor.name || null,
          icon: input.proposalAuthor.icon || null,
        };
      }
    }
  },
  addAlternativeProposalOperation(state, action) {
    const input = action.input;

    const existingIndex = state.alternativeProposals.findIndex(
      (proposal) => proposal.id === input.id,
    );

    if (existingIndex === -1) {
      const newProposal = {
        id: input.id,
        sow: input.sowId || "",
        paymentTerms: input.paymentTermsId || "",
        status: input.status || "DRAFT",
        author: input.proposalAuthor
          ? {
              id: input.proposalAuthor.id,
              name: input.proposalAuthor.name || null,
              icon: input.proposalAuthor.icon || null,
            }
          : {
              id: "",
              name: null,
              icon: null,
            },
      };

      state.alternativeProposals.push(newProposal);
    }
  },
  editAlternativeProposalOperation(state, action) {
    const input = action.input;

    const proposalIndex = state.alternativeProposals.findIndex(
      (proposal) => proposal.id === input.id,
    );

    if (proposalIndex > -1) {
      const proposal = state.alternativeProposals[proposalIndex];

      if (input.sowId !== undefined) {
        proposal.sow = input.sowId || "";
        if (proposal.status === "ACCEPTED") {
          state.sow = proposal.sow || null;
        }
      }
      if (input.paymentTermsId !== undefined) {
        proposal.paymentTerms = input.paymentTermsId || "";
        if (proposal.status === "ACCEPTED") {
          state.paymentTerms = proposal.paymentTerms || null;
        }
      }
      if (input.status !== undefined) {
        const wasAccepted = proposal.status === "ACCEPTED";
        proposal.status = input.status || "DRAFT";
        if (input.status === "ACCEPTED") {
          if (
            state.initialProposal &&
            state.initialProposal.status === "ACCEPTED"
          ) {
            state.initialProposal.status = "REJECTED";
          }
          if (state.alternativeProposals.length > 0) {
            state.alternativeProposals.forEach((p) => {
              if (p.status === "ACCEPTED" && p.id !== input.id) {
                p.status = "REJECTED";
              }
            });
          }
          if (proposal) {
            state.paymentTerms = proposal.paymentTerms || null;
            state.sow = proposal.sow || null;
          }
        } else if (wasAccepted) {
          const hasAcceptedInitialProposal =
            state.initialProposal?.status === "ACCEPTED";
          const hasAcceptedAlternativeProposal =
            state.alternativeProposals.some(
              (p) => p.status === "ACCEPTED" && p.id !== input.id,
            );
          if (!hasAcceptedInitialProposal && !hasAcceptedAlternativeProposal) {
            state.paymentTerms = null;
            state.sow = null;
          }
        }
      }
      if (input.proposalAuthor !== undefined) {
        if (input.proposalAuthor) {
          proposal.author = {
            id: input.proposalAuthor.id,
            name: input.proposalAuthor.name || null,
            icon: input.proposalAuthor.icon || null,
          };
        }
      }
    }
  },
  removeAlternativeProposalOperation(state, action) {
    const input = action.input;

    const proposalIndex = state.alternativeProposals.findIndex(
      (proposal) => proposal.id === input.id,
    );

    if (proposalIndex > -1) {
      const proposalToRemove = state.alternativeProposals[proposalIndex];
      const wasAccepted = proposalToRemove.status === "ACCEPTED";

      state.alternativeProposals.splice(proposalIndex, 1);

      if (wasAccepted) {
        const hasAcceptedInitialProposal =
          state.initialProposal?.status === "ACCEPTED";
        const hasAcceptedAlternativeProposal = state.alternativeProposals.some(
          (p) => p.status === "ACCEPTED",
        );
        if (!hasAcceptedInitialProposal && !hasAcceptedAlternativeProposal) {
          state.paymentTerms = null;
          state.sow = null;
        }
      }
    }
  },
};
