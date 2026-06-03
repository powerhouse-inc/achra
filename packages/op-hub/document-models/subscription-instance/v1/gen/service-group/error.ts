export type ErrorCode =
  | "StructuralChangeNotAllowedAddGroupError"
  | "RemoveServiceGroupNotFoundError"
  | "StructuralChangeNotAllowedRemoveGroupError"
  | "AddServiceToGroupGroupNotFoundError"
  | "SubscriptionNotActiveAddToGroupError"
  | "RemoveServiceFromGroupGroupNotFoundError"
  | "RemoveServiceFromGroupServiceNotFoundError"
  | "SubscriptionNotActiveRemoveFromGroupError"
  | "UpdateServiceGroupCostNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class StructuralChangeNotAllowedAddGroupError
  extends Error
  implements ReducerError
{
  errorCode = "StructuralChangeNotAllowedAddGroupError" as ErrorCode;
  constructor(message = "StructuralChangeNotAllowedAddGroupError") {
    super(message);
  }
}

export class RemoveServiceGroupNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveServiceGroupNotFoundError" as ErrorCode;
  constructor(message = "RemoveServiceGroupNotFoundError") {
    super(message);
  }
}

export class StructuralChangeNotAllowedRemoveGroupError
  extends Error
  implements ReducerError
{
  errorCode = "StructuralChangeNotAllowedRemoveGroupError" as ErrorCode;
  constructor(message = "StructuralChangeNotAllowedRemoveGroupError") {
    super(message);
  }
}

export class AddServiceToGroupGroupNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "AddServiceToGroupGroupNotFoundError" as ErrorCode;
  constructor(message = "AddServiceToGroupGroupNotFoundError") {
    super(message);
  }
}

export class SubscriptionNotActiveAddToGroupError
  extends Error
  implements ReducerError
{
  errorCode = "SubscriptionNotActiveAddToGroupError" as ErrorCode;
  constructor(message = "SubscriptionNotActiveAddToGroupError") {
    super(message);
  }
}

export class RemoveServiceFromGroupGroupNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveServiceFromGroupGroupNotFoundError" as ErrorCode;
  constructor(message = "RemoveServiceFromGroupGroupNotFoundError") {
    super(message);
  }
}

export class RemoveServiceFromGroupServiceNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "RemoveServiceFromGroupServiceNotFoundError" as ErrorCode;
  constructor(message = "RemoveServiceFromGroupServiceNotFoundError") {
    super(message);
  }
}

export class SubscriptionNotActiveRemoveFromGroupError
  extends Error
  implements ReducerError
{
  errorCode = "SubscriptionNotActiveRemoveFromGroupError" as ErrorCode;
  constructor(message = "SubscriptionNotActiveRemoveFromGroupError") {
    super(message);
  }
}

export class UpdateServiceGroupCostNotFoundError
  extends Error
  implements ReducerError
{
  errorCode = "UpdateServiceGroupCostNotFoundError" as ErrorCode;
  constructor(message = "UpdateServiceGroupCostNotFoundError") {
    super(message);
  }
}

export const errors = {
  AddServiceGroup: { StructuralChangeNotAllowedAddGroupError },
  RemoveServiceGroup: {
    RemoveServiceGroupNotFoundError,
    StructuralChangeNotAllowedRemoveGroupError,
  },
  AddServiceToGroup: {
    AddServiceToGroupGroupNotFoundError,
    SubscriptionNotActiveAddToGroupError,
  },
  RemoveServiceFromGroup: {
    RemoveServiceFromGroupGroupNotFoundError,
    RemoveServiceFromGroupServiceNotFoundError,
    SubscriptionNotActiveRemoveFromGroupError,
  },
  UpdateServiceGroupCost: { UpdateServiceGroupCostNotFoundError },
};
