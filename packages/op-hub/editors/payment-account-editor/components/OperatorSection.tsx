import type { PaymentAccountState } from "document-models/payment-account";
import { useEffect, useState } from "react";
import {
  fetchBuilderProfileById,
  type RemoteBuilderProfile,
} from "../../shared/graphql-client.js";
import { Alert, SectionCard } from "./ui.js";

interface OperatorProfileDisplay {
  name: string | null;
  slug: string | null;
  icon: string | null;
}

/**
 * Resolves the operator's builder profile for display via the Switchboard
 * GraphQL endpoint. Deliberately NOT the local `useBuilderProfileDocumentById`
 * hook: the profile document lives in the operator's team-admin drive, which
 * is usually not synced into the Connect instance showing the offering drive,
 * and the local hook THROWS "Document not found" in that case — taking the
 * whole editor down via the drive explorer's error boundary.
 */
function useOperatorProfile(operatorId: string | null | undefined): {
  profile: OperatorProfileDisplay | null;
  loading: boolean;
} {
  const [remote, setRemote] = useState<RemoteBuilderProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!operatorId) {
      setRemote(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    void fetchBuilderProfileById(operatorId)
      .then((profile) => {
        if (!cancelled) setRemote(profile);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [operatorId]);

  return { profile: remote?.state ?? null, loading };
}

type Props = {
  state: PaymentAccountState;
};

/**
 * Read-only presentation of the operator profile this payment account
 * belongs to. The linkage (`operatorId`) is internal — it is set when the
 * operator workspace is provisioned and must not be edited by hand.
 */
export function OperatorSection({ state }: Props) {
  const { profile, loading } = useOperatorProfile(state.operatorId);

  if (!state.operatorId) {
    return (
      <Alert variant="warning" title="No operator profile linked">
        This payment account isn&apos;t linked to an operator profile yet, so
        the payment KYC can&apos;t start. The link is created automatically when
        the operator workspace is set up.
      </Alert>
    );
  }

  return (
    <SectionCard title="Operator">
      <div className="flex items-center gap-3">
        {profile?.icon ? (
          <img
            src={profile.icon}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
            {(profile?.name ?? "O").charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {profile?.name ??
              (loading ? "Loading profile…" : "Operator profile")}
          </p>
          {profile?.slug ? (
            <p className="truncate text-xs text-muted-foreground">
              @{profile.slug}
            </p>
          ) : null}
        </div>
      </div>
    </SectionCard>
  );
}
