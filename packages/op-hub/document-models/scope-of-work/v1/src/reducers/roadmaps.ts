import type { ScopeOfWorkRoadmapsOperations } from "document-models/scope-of-work/v1";

export const scopeOfWorkRoadmapsOperations: ScopeOfWorkRoadmapsOperations = {
  editRoadmapOperation(state, action) {
    const roadmap = state.roadmaps.find(
      (roadmap) => String(roadmap.id) === String(action.input.id),
    );
    if (!roadmap) {
      throw new Error("Roadmap not found");
    }

    const updatedRoadmap = {
      ...roadmap,
      title: action.input.title || roadmap.title,
      slug: action.input.slug || roadmap.slug,
      description: action.input.description || roadmap.description,
    };

    state.roadmaps = state.roadmaps.map((roadmap) =>
      String(roadmap.id) === String(action.input.id) ? updatedRoadmap : roadmap,
    );
  },
  addRoadmapOperation(state, action) {
    const roadmap = {
      id: action.input.id,
      title: action.input.title,
      slug: action.input.slug || "",
      description: action.input.description || "",
      milestones: [],
    };

    state.roadmaps.push(roadmap);
  },
  removeRoadmapOperation(state, action) {
    const roadmap = state.roadmaps.find(
      (roadmap) => String(roadmap.id) === String(action.input.id),
    );
    if (!roadmap) {
      throw new Error("Roadmap not found");
    }

    roadmap.milestones.forEach((milestone) => {
      if (milestone.scope?.deliverables) {
        milestone.scope.deliverables.forEach((deliverableId) => {
          state.deliverables = state.deliverables.filter(
            (deliverable) => String(deliverable.id) !== String(deliverableId),
          );
        });
      }
    });

    state.roadmaps = state.roadmaps.filter(
      (roadmap) => String(roadmap.id) !== String(action.input.id),
    );
  },
};
