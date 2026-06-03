import type { ResourceTemplateContentSectionManagementOperations } from "document-models/resource-template/v1";

export const resourceTemplateContentSectionManagementOperations: ResourceTemplateContentSectionManagementOperations =
  {
    addContentSectionOperation(state, action) {
      state.contentSections.push({
        id: action.input.id,
        title: action.input.title,
        content: action.input.content,
        displayOrder: action.input.displayOrder,
      });
      state.lastModified = action.input.lastModified;
    },
    updateContentSectionOperation(state, action) {
      const section = state.contentSections.find(
        (s) => s.id === action.input.id,
      );
      if (section) {
        if (action.input.title) {
          section.title = action.input.title;
        }
        if (
          action.input.content !== undefined &&
          action.input.content !== null
        ) {
          section.content = action.input.content;
        }
        if (
          action.input.displayOrder !== undefined &&
          action.input.displayOrder !== null
        ) {
          section.displayOrder = action.input.displayOrder;
        }
      }
      state.lastModified = action.input.lastModified;
    },
    deleteContentSectionOperation(state, action) {
      const sectionIndex = state.contentSections.findIndex(
        (s) => s.id === action.input.id,
      );
      if (sectionIndex !== -1) {
        state.contentSections.splice(sectionIndex, 1);
      }
      state.lastModified = action.input.lastModified;
    },
    reorderContentSectionsOperation(state, action) {
      action.input.sectionIds.forEach((id, index) => {
        const section = state.contentSections.find((s) => s.id === id);
        if (section) {
          section.displayOrder = index;
        }
      });
      state.lastModified = action.input.lastModified;
    },
  };
