import { Tabs, TabsContent, TabsList, TabsTrigger } from "@achra/ui/tabs";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import type { PaymentAccountState } from "document-models/payment-account";
import {
  usePaymentAccountDocumentsInSelectedDrive,
  useSelectedPaymentAccountDocument,
} from "document-models/payment-account";
import { useState } from "react";
import { OperatorSection } from "./components/OperatorSection.js";
import { PaymentsSection } from "./components/PaymentsSection.js";
import { VerificationSection } from "./components/VerificationSection.js";
import { Alert } from "./components/ui.js";

type TabId = "overview" | "verification";

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "verification", label: "Verification" },
];

function kycStatus(state: PaymentAccountState): {
  label: string;
  className: string;
} {
  if (state.stripeChargesEnabled) {
    return {
      label: "Payments enabled",
      className: "bg-status-success/30 text-status-success",
    };
  }
  if (state.stripeAccountId) {
    return {
      label: "KYC in progress",
      className: "bg-status-warning/30 text-status-warning",
    };
  }
  return { label: "Not started", className: "bg-muted text-muted-foreground" };
}

export default function Editor() {
  const [document, dispatch] = useSelectedPaymentAccountDocument();
  const state = document.state.global;
  const accountsInDrive = usePaymentAccountDocumentsInSelectedDrive();
  const hasDuplicates = (accountsInDrive?.length ?? 0) > 1;
  const status = kycStatus(state);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  // The Verification tab mounts lazily (first visit) and then stays mounted
  // but hidden, so the Stripe embedded form loads at most once per opened
  // document — switching tabs doesn't reload the iframes.
  const [verificationMounted, setVerificationMounted] = useState(false);

  function openTab(id: TabId) {
    setActiveTab(id);
    if (id === "verification") setVerificationMounted(true);
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <DocumentToolbar />

      <div className="mt-6 space-y-6">
        <header>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-foreground">
              Payment setup
            </h1>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}
            >
              {status.label}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Before you can publish your service offerings, complete the payment
            KYC. Verification is handled securely by Stripe; once approved, your
            services can accept payments and your earnings are paid out to you.
          </p>
        </header>

        {hasDuplicates && (
          <Alert
            variant="warning"
            title="Multiple payment accounts in this drive"
          >
            This drive holds more than one payment account document. Keep a
            single one — Stripe onboarding and payouts are tracked per account,
            and offerings should settle through the same account.
          </Alert>
        )}

        {/* Both panes stay mounted once created (Radix forceMount) and are
            toggled via CSS: the Stripe embedded form is heavy to initialize,
            so it mounts on the first Verification visit and is then only
            hidden/shown. */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => openTab(value as TabId)}
        >
          <TabsList>
            {TABS.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value="overview"
            forceMount
            className="mt-2 space-y-6 data-[state=inactive]:hidden"
          >
            <OperatorSection state={state} />
            <PaymentsSection
              state={state}
              dispatch={dispatch}
              documentId={document.header.id}
              onOpenVerification={() => openTab("verification")}
            />
          </TabsContent>
          {verificationMounted && (
            <TabsContent
              value="verification"
              forceMount
              className="mt-2 data-[state=inactive]:hidden"
            >
              <VerificationSection state={state} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
