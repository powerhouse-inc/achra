import type { ScopeOfWorkDeliverablesOperations } from "document-models/scope-of-work/v1";
import type {
  Deliverable,
  KeyResult,
  Progress,
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

export const scopeOfWorkDeliverablesOperations: ScopeOfWorkDeliverablesOperations =
  {
    addDeliverableOperation(state, action) {
      const deliverable: Deliverable = {
        id: action.input.id,
        owner: action.input.owner || null,
        icon: null,
        title: action.input.title || "",
        code: action.input.code || "",
        description: action.input.description || "",
        status: action.input.status || "DRAFT",
        workProgress: null,
        keyResults: [],
        budgetAnchor: {
          project: "",
          unit: "Hours",
          unitCost: 0,
          quantity: 0,
          margin: 0,
        },
      };

      state.deliverables.push(deliverable);
    },
    removeDeliverableOperation(state, action) {
      const deliverable = state.deliverables.find(
        (d) => String(d.id) === String(action.input.id),
      );
      if (!deliverable) {
        throw new Error("Deliverable not found");
      }

      // remove deliverable from deliverable sets in milestone and project
      const roadmap = state.roadmaps.find((r) =>
        r.milestones.find((m) =>
          m.scope?.deliverables.includes(action.input.id),
        ),
      );
      const milestone = roadmap?.milestones.find((m) =>
        m.scope?.deliverables.includes(action.input.id),
      );
      if (milestone?.scope) {
        milestone.scope.deliverables = milestone.scope.deliverables.filter(
          (d) => String(d) !== String(action.input.id),
        );
      }

      const project = state.projects.find((p) =>
        p.scope?.deliverables.includes(action.input.id),
      );
      if (project?.scope) {
        project.scope.deliverables = project.scope.deliverables.filter(
          (d) => String(d) !== String(action.input.id),
        );
      }

      state.deliverables = state.deliverables.filter(
        (d) => String(d.id) !== String(action.input.id),
      );
      applyInvariants(state, ["budget", "margin", "progress"]);
    },
    editDeliverableOperation(state, action) {
      const deliverable = state.deliverables.find(
        (d) => String(d.id) === String(action.input.id),
      );
      if (!deliverable) {
        throw new Error("Deliverable not found");
      }

      const updatedDeliverable: Deliverable = {
        ...deliverable,
        owner:
          action.input.owner !== undefined
            ? action.input.owner
            : deliverable.owner,
        icon:
          action.input.icon !== undefined
            ? action.input.icon
            : deliverable.icon,
        title:
          action.input.title !== undefined
            ? (action.input.title ?? "")
            : deliverable.title,
        code:
          action.input.code !== undefined
            ? (action.input.code ?? "")
            : deliverable.code,
        description:
          action.input.description !== undefined
            ? (action.input.description ?? "")
            : deliverable.description,
        status:
          action.input.status !== undefined && action.input.status !== null
            ? action.input.status
            : deliverable.status,
      };

      state.deliverables = state.deliverables.map((d) =>
        String(d.id) === String(action.input.id) ? updatedDeliverable : d,
      );
      applyInvariants(state, ["progress"]);
    },
    setDeliverableProgressOperation(state, action) {
      const deliverable = state.deliverables.find(
        (d) => String(d.id) === String(action.input.id),
      );
      if (!deliverable) {
        throw new Error("Deliverable not found");
      }

      const inputProgress = action.input.workProgress;
      let nextWorkProgress: Progress | null = deliverable.workProgress ?? null;
      if (inputProgress) {
        if (
          inputProgress.percentage !== undefined &&
          inputProgress.percentage !== null
        ) {
          nextWorkProgress = makeProgress({ value: inputProgress.percentage });
        } else if (inputProgress.storyPoints) {
          nextWorkProgress = makeProgress({
            total: inputProgress.storyPoints.total,
            completed: inputProgress.storyPoints.completed,
          });
        } else if (
          inputProgress.done !== undefined &&
          inputProgress.done !== null
        ) {
          nextWorkProgress = makeProgress({ done: inputProgress.done });
        }
      }
      const updatedDeliverable: Deliverable = {
        ...deliverable,
        workProgress: nextWorkProgress,
      };

      updatedDeliverable.status = "IN_PROGRESS";
      if (
        deliverableIsCompleted(updatedDeliverable.workProgress) &&
        !["WONT_DO", "DELIVERED", "CANCELED"].includes(
          updatedDeliverable.status,
        )
      ) {
        updatedDeliverable.status = "DELIVERED";
      }

      state.deliverables = state.deliverables.map((d) =>
        String(d.id) === String(action.input.id) ? updatedDeliverable : d,
      );
      applyInvariants(state, ["progress"]);
    },
    addKeyResultOperation(state, action) {
      const updatedDeliverable = state.deliverables.find(
        (d) => String(d.id) === String(action.input.deliverableId),
      );
      if (!updatedDeliverable) {
        throw new Error("Deliverable not found");
      }

      const keyResult = {
        id: action.input.id,
        title: action.input.title || "",
        link: action.input.link || "",
      };

      updatedDeliverable.keyResults.push(keyResult);
      state.deliverables = state.deliverables.map((d) =>
        String(d.id) === String(action.input.deliverableId)
          ? updatedDeliverable
          : d,
      );
    },
    removeKeyResultOperation(state, action) {
      const updatedDeliverable = state.deliverables.find(
        (d) => String(d.id) === String(action.input.deliverableId),
      );
      if (!updatedDeliverable) {
        throw new Error("Deliverable not found");
      }

      updatedDeliverable.keyResults = updatedDeliverable.keyResults.filter(
        (kr) => String(kr.id) !== String(action.input.id),
      );
      state.deliverables = state.deliverables.map((d) =>
        String(d.id) === String(action.input.deliverableId)
          ? updatedDeliverable
          : d,
      );
    },
    editKeyResultOperation(state, action) {
      const updatedDeliverable = state.deliverables.find(
        (d) => String(d.id) === String(action.input.deliverableId),
      );
      if (!updatedDeliverable) {
        throw new Error("Deliverable not found");
      }

      const keyResult = updatedDeliverable.keyResults.find(
        (kr) => String(kr.id) === String(action.input.id),
      );

      const updatedKeyResult = {
        ...keyResult,
        title: action.input.title || keyResult?.title,
        link: action.input.link || keyResult?.link,
      };

      updatedDeliverable.keyResults = updatedDeliverable.keyResults.map((kr) =>
        String(kr.id) === String(action.input.id) ? updatedKeyResult : kr,
      ) as KeyResult[];
      state.deliverables = state.deliverables.map((d) =>
        String(d.id) === String(action.input.deliverableId)
          ? updatedDeliverable
          : d,
      );
    },
    setDeliverableBudgetAnchorProjectOperation(state, action) {
      const foundDeliverable = state.deliverables.find(
        (d) => String(d.id) === String(action.input.deliverableId),
      );
      if (!foundDeliverable) {
        throw new Error("Deliverable not found");
      }

      Object.assign(foundDeliverable, {
        budgetAnchor: { ...foundDeliverable.budgetAnchor, ...action.input },
      });

      state.deliverables = state.deliverables.map((d) =>
        String(d.id) === String(action.input.deliverableId)
          ? foundDeliverable
          : d,
      );

      // Only apply budget and progress invariants, not margin invariant when setting margin
      // This prevents the margin from being recalculated and overriding user input
      applyInvariants(state, ["budget", "progress"]);
    },
  };

const deliverableIsCompleted = (
  workProgress: Progress | null | undefined,
): boolean => {
  if (!workProgress) return false;

  if (workProgress.done === true) {
    return true;
  }

  if (workProgress.value === 100) {
    return true;
  }

  if (
    workProgress.completed != null &&
    workProgress.total != null &&
    workProgress.total > 0 &&
    workProgress.completed === workProgress.total
  ) {
    return true;
  }

  return false;
};
