/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  SetFacetDescriptionInputSchema,
  SetFacetNameInputSchema,
} from "../schema/zod.js";
import type { SetFacetDescriptionInput, SetFacetNameInput } from "../types.js";
import type {
  SetFacetDescriptionAction,
  SetFacetNameAction,
} from "./actions.js";

export const setFacetName = (input: SetFacetNameInput) =>
  createAction<SetFacetNameAction>(
    "SET_FACET_NAME",
    { ...input },
    undefined,
    SetFacetNameInputSchema,
    "global",
  );

export const setFacetDescription = (input: SetFacetDescriptionInput) =>
  createAction<SetFacetDescriptionAction>(
    "SET_FACET_DESCRIPTION",
    { ...input },
    undefined,
    SetFacetDescriptionInputSchema,
    "global",
  );
