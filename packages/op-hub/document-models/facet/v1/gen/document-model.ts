import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  id: "powerhouse/facet",
  name: "Facet",
  author: {
    name: "Powerhouse",
    website: "https://www.powerhouse.inc/",
  },
  extension: "",
  description:
    "Document model for defining categorical options (facets) used to customize service offerings. Examples include SNO Function, Legal Entity Type, Team configurations, and Anonymity settings",
  specifications: [
    {
      state: {
        local: {
          schema: "",
          examples: [],
          initialValue: "",
        },
        global: {
          schema:
            "type FacetState {\n    id: PHID\n    name: String!\n    description: String\n    lastModified: DateTime\n    options: [FacetOption!]!\n}\n\ntype FacetOption {\n    id: OID!\n    label: String!\n    description: String\n    displayOrder: Int\n    isDefault: Boolean!\n}",
          examples: [],
          initialValue:
            '{\n    "id": null,\n    "name": "",\n    "description": null,\n    "lastModified": null,\n    "options": []\n}',
        },
      },
      modules: [
        {
          id: "facet-management",
          name: "Facet Management",
          description: "Operations for managing facet metadata",
          operations: [
            {
              id: "set-facet-name",
              name: "SET_FACET_NAME",
              description: "Sets the facet name",
              schema:
                "input SetFacetNameInput {\n    name: String!\n    lastModified: DateTime!\n}",
              template: "Sets the facet name",
              reducer:
                "state.name = action.input.name;\nstate.lastModified = action.input.lastModified;",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "set-facet-description",
              name: "SET_FACET_DESCRIPTION",
              description: "Sets the facet description",
              schema:
                "input SetFacetDescriptionInput {\n    description: String\n    lastModified: DateTime!\n}",
              template: "Sets the facet description",
              reducer:
                "state.description = action.input.description || null;\nstate.lastModified = action.input.lastModified;",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "option-management",
          name: "Option Management",
          description: "Operations for managing facet options",
          operations: [
            {
              id: "add-option",
              name: "ADD_OPTION",
              description: "Adds a new option to the facet",
              schema:
                "input AddOptionInput {\n    id: OID!\n    label: String!\n    description: String\n    displayOrder: Int\n    isDefault: Boolean\n    lastModified: DateTime!\n}",
              template: "Adds a new option to the facet",
              reducer:
                "state.options.push({\n    id: action.input.id,\n    label: action.input.label,\n    description: action.input.description || null,\n    displayOrder: action.input.displayOrder || null,\n    isDefault: action.input.isDefault || false\n});\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "duplicate-option-id",
                  name: "DuplicateOptionIdError",
                  code: "DUPLICATE_OPTION_ID",
                  description: "An option with this ID already exists",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "update-option",
              name: "UPDATE_OPTION",
              description: "Updates an existing option",
              schema:
                "input UpdateOptionInput {\n    id: OID!\n    label: String\n    description: String\n    displayOrder: Int\n    isDefault: Boolean\n    lastModified: DateTime!\n}",
              template: "Updates an existing option",
              reducer:
                "const option = state.options.find(o => o.id === action.input.id);\nif (option) {\n    if (action.input.label) {\n        option.label = action.input.label;\n    }\n    if (action.input.description !== undefined) {\n        option.description = action.input.description || null;\n    }\n    if (action.input.displayOrder !== undefined && action.input.displayOrder !== null) {\n        option.displayOrder = action.input.displayOrder;\n    }\n    if (action.input.isDefault !== undefined && action.input.isDefault !== null) {\n        option.isDefault = action.input.isDefault;\n    }\n}\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "option-not-found",
                  name: "OptionNotFoundError",
                  code: "OPTION_NOT_FOUND",
                  description: "Option with the specified ID does not exist",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "remove-option",
              name: "REMOVE_OPTION",
              description: "Removes an option from the facet",
              schema:
                "input RemoveOptionInput {\n    id: OID!\n    lastModified: DateTime!\n}",
              template: "Removes an option from the facet",
              reducer:
                "const optionIndex = state.options.findIndex(o => o.id === action.input.id);\nif (optionIndex !== -1) {\n    state.options.splice(optionIndex, 1);\n}\nstate.lastModified = action.input.lastModified;",
              errors: [
                {
                  id: "remove-option-not-found",
                  name: "RemoveOptionNotFoundError",
                  code: "REMOVE_OPTION_NOT_FOUND",
                  description: "Option with the specified ID does not exist",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "reorder-options",
              name: "REORDER_OPTIONS",
              description: "Reorders options in the facet",
              schema:
                "input ReorderOptionsInput {\n    optionIds: [OID!]!\n    lastModified: DateTime!\n}",
              template: "Reorders options in the facet",
              reducer:
                "const orderedOptions: typeof state.options = [];\naction.input.optionIds.forEach((id, index) => {\n    const option = state.options.find(o => o.id === id);\n    if (option) {\n        option.displayOrder = index;\n        orderedOptions.push(option);\n    }\n});\nstate.options.forEach(option => {\n    if (!action.input.optionIds.includes(option.id)) {\n        orderedOptions.push(option);\n    }\n});\nstate.options = orderedOptions;\nstate.lastModified = action.input.lastModified;",
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
