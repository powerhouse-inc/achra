/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { ScopeOfWorkAction } from "./actions.js";
import type { ScopeOfWorkState as ScopeOfWorkGlobalState } from "./schema/types.js";

type ScopeOfWorkLocalState = Record<PropertyKey, never>;

type ScopeOfWorkPHState = PHBaseState & {
  global: ScopeOfWorkGlobalState;
  local: ScopeOfWorkLocalState;
};
type ScopeOfWorkDocument = PHDocument<ScopeOfWorkPHState>;

export * from "./schema/types.js";

export type {
  ScopeOfWorkAction,
  ScopeOfWorkDocument,
  ScopeOfWorkGlobalState,
  ScopeOfWorkLocalState,
  ScopeOfWorkPHState,
};
