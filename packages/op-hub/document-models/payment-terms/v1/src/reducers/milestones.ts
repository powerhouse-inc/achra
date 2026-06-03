import type { PaymentTermsMilestonesOperations } from "document-models/payment-terms/v1";
import {
  DuplicateMilestoneIdError,
  MilestoneNotFoundError,
} from "../../gen/milestones/error.js";

export const paymentTermsMilestonesOperations: PaymentTermsMilestonesOperations =
  {
    addMilestoneOperation(state, action) {
      const existingIndex = state.milestoneSchedule.findIndex(
        (m) => m.id === action.input.id,
      );
      if (existingIndex !== -1) {
        throw new DuplicateMilestoneIdError(
          `Milestone with ID ${action.input.id} already exists`,
        );
      }

      const newMilestone = {
        id: action.input.id,
        name: action.input.name,
        amount: action.input.amount,
        expectedCompletionDate: action.input.expectedCompletionDate || null,
        requiresApproval: action.input.requiresApproval,
        payoutStatus: "PENDING" as const,
      };

      state.milestoneSchedule.push(newMilestone);
    },
    updateMilestoneOperation(state, action) {
      const milestoneIndex = state.milestoneSchedule.findIndex(
        (m) => m.id === action.input.id,
      );
      if (milestoneIndex === -1) {
        throw new MilestoneNotFoundError(
          `Milestone with ID ${action.input.id} not found`,
        );
      }

      const milestone = state.milestoneSchedule[milestoneIndex];
      if (action.input.name) milestone.name = action.input.name;
      if (action.input.amount) milestone.amount = action.input.amount;
      if (action.input.expectedCompletionDate !== undefined)
        milestone.expectedCompletionDate =
          action.input.expectedCompletionDate || null;
      if (
        action.input.requiresApproval !== undefined &&
        action.input.requiresApproval !== null
      )
        milestone.requiresApproval = action.input.requiresApproval;
    },
    updateMilestoneStatusOperation(state, action) {
      const milestoneIndex = state.milestoneSchedule.findIndex(
        (m) => m.id === action.input.id,
      );
      if (milestoneIndex === -1) {
        throw new MilestoneNotFoundError(
          `Milestone with ID ${action.input.id} not found`,
        );
      }

      state.milestoneSchedule[milestoneIndex].payoutStatus =
        action.input.payoutStatus;
    },
    deleteMilestoneOperation(state, action) {
      const milestoneIndex = state.milestoneSchedule.findIndex(
        (m) => m.id === action.input.id,
      );
      if (milestoneIndex === -1) {
        throw new MilestoneNotFoundError(
          `Milestone with ID ${action.input.id} not found`,
        );
      }

      state.milestoneSchedule.splice(milestoneIndex, 1);
    },
    reorderMilestonesOperation(state, action) {
      const reorderedMilestones = [];
      for (const id of action.input.order) {
        const milestone = state.milestoneSchedule.find((m) => m.id === id);
        if (milestone) {
          reorderedMilestones.push(milestone);
        }
      }
      state.milestoneSchedule = reorderedMilestones;
    },
  };
