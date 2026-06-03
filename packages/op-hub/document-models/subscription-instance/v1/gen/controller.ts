/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { PHDocumentController } from "document-model";
import { SubscriptionInstance } from "../module.js";
import type {
  SubscriptionInstanceAction,
  SubscriptionInstancePHState,
} from "./types.js";

export const SubscriptionInstanceController =
  PHDocumentController.forDocumentModel<
    SubscriptionInstancePHState,
    SubscriptionInstanceAction
  >(SubscriptionInstance);
