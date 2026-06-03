import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  id: "powerhouse/builders",
  name: "Builders",
  author: {
    name: "Powerhouse",
    website: "https://powerhouse.inc",
  },
  extension: "",
  description: "A list of builders that a SNO can have.",
  specifications: [
    {
      state: {
        local: {
          schema: "",
          examples: [],
          initialValue: "",
        },
        global: {
          schema: "type BuildersState {\n  builders: [PHID!]!\n}",
          examples: [],
          initialValue: '{\n  "builders": []\n}',
        },
      },
      modules: [
        {
          id: "builders-module",
          name: "builders",
          description: "",
          operations: [
            {
              id: "add-builder-op",
              name: "ADD_BUILDER",
              description: "",
              schema: "input AddBuilderInput {\n  builderPhid: PHID!\n}",
              template: "",
              reducer: "state.builders.push(action.input.builderPhid);",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "remove-builder-op",
              name: "REMOVE_BUILDER",
              description: "",
              schema: "input RemoveBuilderInput {\n  builderPhid: PHID!\n}",
              template: "",
              reducer:
                "state.builders = state.builders.filter(\n  (builder) => builder !== action.input.builderPhid,\n);",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
      ],
      version: 1,
      changeLog: [],
    },
  ],
};
