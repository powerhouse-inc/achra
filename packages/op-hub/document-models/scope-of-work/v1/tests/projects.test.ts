import { generateMock } from "document-model";
import {
  addProject,
  addProjectDeliverable,
  AddProjectDeliverableInputSchema,
  AddProjectInputSchema,
  isScopeOfWorkDocument,
  reducer,
  removeProject,
  removeProjectDeliverable,
  RemoveProjectDeliverableInputSchema,
  RemoveProjectInputSchema,
  setProjectMargin,
  SetProjectMarginInputSchema,
  setProjectTotalBudget,
  SetProjectTotalBudgetInputSchema,
  updateProject,
  UpdateProjectInputSchema,
  updateProjectOwner,
  UpdateProjectOwnerInputSchema,
  utils,
} from "document-models/scope-of-work/v1";
import { describe, expect, it } from "vitest";

describe("ProjectsOperations", () => {
  it("should handle addProject operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddProjectInputSchema());

    const updatedDocument = reducer(document, addProject(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_PROJECT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateProject operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateProjectInputSchema());

    const updatedDocument = reducer(document, updateProject(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_PROJECT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateProjectOwner operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateProjectOwnerInputSchema());

    const updatedDocument = reducer(document, updateProjectOwner(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_PROJECT_OWNER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeProject operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveProjectInputSchema());

    const updatedDocument = reducer(document, removeProject(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_PROJECT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setProjectMargin operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetProjectMarginInputSchema());

    const updatedDocument = reducer(document, setProjectMargin(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_PROJECT_MARGIN",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setProjectTotalBudget operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetProjectTotalBudgetInputSchema());

    const updatedDocument = reducer(document, setProjectTotalBudget(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_PROJECT_TOTAL_BUDGET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addProjectDeliverable operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddProjectDeliverableInputSchema());

    const updatedDocument = reducer(document, addProjectDeliverable(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_PROJECT_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeProjectDeliverable operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveProjectDeliverableInputSchema());

    const updatedDocument = reducer(document, removeProjectDeliverable(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_PROJECT_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
