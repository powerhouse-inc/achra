import type { ScopeOfWorkMilestonesOperations } from "document-models/scope-of-work/v1";
import type { EditMilestoneAction } from "../../gen/milestones/actions.js";
import type {
  Deliverable,
  Milestone,
  Progress,
  ScopeOfWorkState,
} from "../../gen/schema/types.js";
import { applyInvariants } from "./projects.js";

// Progress is a flat tagged-union: { completed, done, total, value }, all
// nullable. Use this factory to keep field counts consistent.
const makeProgress = (partial: Partial<Progress>): Progress => ({
  completed: partial.completed ?? null,
  done: partial.done ?? null,
  total: partial.total ?? null,
  value: partial.value ?? null,
});

export const scopeOfWorkMilestonesOperations: ScopeOfWorkMilestonesOperations =
  {
    editMilestoneOperation(
      state: ScopeOfWorkState,
      action: EditMilestoneAction,
    ) {
      const foundRoadmap = state.roadmaps.find(
        (roadmap) => String(roadmap.id) === String(action.input.roadmapId),
      );
      if (!foundRoadmap) {
        throw new Error("Roadmap not found");
      }

      const foundMilestone = foundRoadmap.milestones.find(
        (milestone) => String(milestone.id) === String(action.input.id),
      );
      if (!foundMilestone) {
        throw new Error("Milestone not found");
      }

      const updatedMilestone = {
        ...foundMilestone,
        sequenceCode: action.input.sequenceCode || foundMilestone.sequenceCode,
        title: action.input.title || foundMilestone.title,
        description: action.input.description || foundMilestone.description,
        deliveryTarget:
          action.input.deliveryTarget || foundMilestone.deliveryTarget,
      };

      foundRoadmap.milestones = foundRoadmap.milestones.map((milestone) =>
        String(milestone.id) === String(action.input.id)
          ? updatedMilestone
          : milestone,
      );
      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(action.input.roadmapId)
          ? foundRoadmap
          : roadmap;
      });
    },
    addCoordinatorOperation(state, action) {
      const foundRoadmap = state.roadmaps.find((roadmap) => {
        return roadmap.milestones.some(
          (milestone) =>
            String(milestone.id) === String(action.input.milestoneId),
        );
      });
      if (!foundRoadmap) {
        throw new Error(
          `Roadmap with milestone ${action.input.milestoneId} not found`,
        );
      }

      const foundMilestone = foundRoadmap.milestones.find(
        (milestone) =>
          String(milestone.id) === String(action.input.milestoneId),
      );
      if (!foundMilestone) {
        throw new Error("Milestone not found");
      }

      if (!foundMilestone.coordinators.includes(action.input.id)) {
        foundMilestone.coordinators.push(action.input.id);
      }

      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(foundRoadmap.id)
          ? foundRoadmap
          : roadmap;
      });
    },
    removeCoordinatorOperation(state, action) {
      const foundRoadmap = state.roadmaps.find((roadmap) => {
        return roadmap.milestones.some(
          (milestone) =>
            String(milestone.id) === String(action.input.milestoneId),
        );
      });
      if (!foundRoadmap) {
        throw new Error(
          `Roadmap with milestone ${action.input.milestoneId} not found`,
        );
      }

      const foundMilestone = foundRoadmap.milestones.find(
        (milestone) =>
          String(milestone.id) === String(action.input.milestoneId),
      );
      if (!foundMilestone) {
        throw new Error("Milestone not found");
      }

      foundMilestone.coordinators = foundMilestone.coordinators.filter(
        (coordinatorId) => coordinatorId !== action.input.id,
      );

      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(foundRoadmap.id)
          ? foundRoadmap
          : roadmap;
      });
    },
    addMilestoneOperation(state, action) {
      const foundRoadmap = state.roadmaps.find(
        (roadmap) => String(roadmap.id) === String(action.input.roadmapId),
      );
      if (!foundRoadmap) {
        throw new Error("Roadmap not found");
      }

      const milestone: Milestone = {
        id: action.input.id,
        sequenceCode: action.input.sequenceCode || "",
        title: action.input.title || "",
        description: action.input.description || "",
        deliveryTarget: action.input.deliveryTarget || "",
        coordinators: [],
        scope: {
          deliverables: [],
          status: "DRAFT",
          progress: makeProgress({ value: 0 }),
          deliverablesCompleted: {
            total: 0,
            completed: 0,
          },
        },
        budget: 0,
      };

      foundRoadmap.milestones.push(milestone);
      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(action.input.roadmapId)
          ? foundRoadmap
          : roadmap;
      });
    },
    removeMilestoneOperation(state, action) {
      const foundRoadmap = state.roadmaps.find(
        (roadmap) => String(roadmap.id) === String(action.input.roadmapId),
      );
      if (!foundRoadmap) {
        throw new Error("Roadmap not found");
      }

      const foundMilestone = foundRoadmap.milestones.find(
        (milestone) => String(milestone.id) === String(action.input.id),
      );
      if (!foundMilestone) {
        throw new Error("Milestone not found");
      }

      // remove deliverables linked to milestone from milestone.scope.deliverables
      if (foundMilestone.scope?.deliverables) {
        foundMilestone.scope.deliverables.forEach((deliverableId) => {
          state.deliverables = state.deliverables.filter(
            (deliverable) => String(deliverable.id) !== String(deliverableId),
          );
        });
      }

      foundRoadmap.milestones = foundRoadmap.milestones.filter(
        (milestone) => String(milestone.id) !== String(action.input.id),
      );
      state.roadmaps = state.roadmaps.map((roadmap) => {
        return String(roadmap.id) === String(foundRoadmap.id)
          ? foundRoadmap
          : roadmap;
      });
      applyInvariants(state, ["budget", "margin"]);
    },
    addMilestoneDeliverableOperation(state, action) {
      // add deliverable to deliverables
      const newDeliverable: Deliverable = {
        id: action.input.deliverableId,
        owner: "",
        icon: "",
        title: action.input.title,
        code: "",
        description: "",
        status: "DRAFT",
        workProgress: makeProgress({ value: 0 }),
        keyResults: [],
        budgetAnchor: {
          project: "",
          unit: "Hours",
          unitCost: 0,
          quantity: 0,
          margin: 0,
        },
      };

      state.deliverables.push(newDeliverable);

      // add deliverable to milestone.scope.deliverables
      const roadmap = state.roadmaps.find((roadmap) => {
        return roadmap.milestones.find(
          (milestone) =>
            String(milestone.id) === String(action.input.milestoneId),
        );
      });
      const foundMilestone = roadmap?.milestones.find(
        (milestone) =>
          String(milestone.id) === String(action.input.milestoneId),
      );
      if (!foundMilestone) {
        throw new Error("Milestone not found");
      }
      if (!foundMilestone.scope) {
        throw new Error("Milestone deliverable set not found");
      }
      foundMilestone.scope.deliverables.push(newDeliverable.id);
    },
    removeMilestoneDeliverableOperation(state, action) {
      const roadmap = state.roadmaps.find((roadmap) => {
        return roadmap.milestones.find(
          (milestone) =>
            String(milestone.id) === String(action.input.milestoneId),
        );
      });
      if (!roadmap) {
        throw new Error("Roadmap not found");
      }
      const foundMilestone = roadmap.milestones.find(
        (milestone) =>
          String(milestone.id) === String(action.input.milestoneId),
      );
      if (!foundMilestone) {
        throw new Error("Milestone not found");
      }
      if (!foundMilestone.scope) {
        throw new Error("Milestone deliverable set not found");
      }
      foundMilestone.scope.deliverables =
        foundMilestone.scope.deliverables.filter(
          (deliverableId) => deliverableId !== action.input.deliverableId,
        );

      state.deliverables = state.deliverables.map((deliverable) => {
        return String(deliverable.id) === String(action.input.deliverableId)
          ? {
              ...deliverable,
              budgetAnchor: {
                project: "",
                unit: deliverable.budgetAnchor?.unit || "Hours",
                unitCost: deliverable.budgetAnchor?.unitCost || 0,
                quantity: deliverable.budgetAnchor?.quantity || 0,
                margin: deliverable.budgetAnchor?.margin || 0,
              },
            }
          : deliverable;
      });
      applyInvariants(state, ["budget", "margin", "progress"]);
    },
  };
