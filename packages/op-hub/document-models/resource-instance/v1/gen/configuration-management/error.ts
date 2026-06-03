export type ErrorCode =
  | "ConfigurationLockedError"
  | "ConfigurationLockedRemoveInstanceFacetError"
  | "ConfigurationLockedUpdateInstanceFacetError"
  | "ConfigurationLockedApplyConfigurationChangesError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class ConfigurationLockedError extends Error implements ReducerError {
  errorCode = "ConfigurationLockedError" as ErrorCode;
  constructor(message = "ConfigurationLockedError") {
    super(message);
  }
}

export class ConfigurationLockedRemoveInstanceFacetError
  extends Error
  implements ReducerError
{
  errorCode = "ConfigurationLockedRemoveInstanceFacetError" as ErrorCode;
  constructor(message = "ConfigurationLockedRemoveInstanceFacetError") {
    super(message);
  }
}

export class ConfigurationLockedUpdateInstanceFacetError
  extends Error
  implements ReducerError
{
  errorCode = "ConfigurationLockedUpdateInstanceFacetError" as ErrorCode;
  constructor(message = "ConfigurationLockedUpdateInstanceFacetError") {
    super(message);
  }
}

export class ConfigurationLockedApplyConfigurationChangesError
  extends Error
  implements ReducerError
{
  errorCode = "ConfigurationLockedApplyConfigurationChangesError" as ErrorCode;
  constructor(message = "ConfigurationLockedApplyConfigurationChangesError") {
    super(message);
  }
}

export const errors = {
  SetInstanceFacet: { ConfigurationLockedError },
  RemoveInstanceFacet: { ConfigurationLockedRemoveInstanceFacetError },
  UpdateInstanceFacet: { ConfigurationLockedUpdateInstanceFacetError },
  ApplyConfigurationChanges: {
    ConfigurationLockedApplyConfigurationChangesError,
  },
};
