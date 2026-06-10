'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@achra/ui/card'
import { Skeleton } from '@achra/ui/skeleton'
import { ExternalLink } from '@/modules/shared/components/external-link/external-link'
import { useOperatorPaymentAccount } from '@/modules/shared/hooks/use-operator-payment-account'
import { driveDocumentLinkFor, driveLinkFor } from '@/modules/shared/lib/switchboard-urls'
import type { OperatorPaymentAccount } from '@achra/sdk'
import type { Route } from 'next'

interface KycPresentation {
  label: string
  badgeClassName: string
  description: string
  cta: string
}

function kycPresentation(account: OperatorPaymentAccount | null): KycPresentation {
  if (account?.stripeChargesEnabled) {
    return {
      label: 'Payments enabled',
      badgeClassName: 'bg-status-success/30 text-status-success',
      description: 'Your services can accept payments and your earnings are paid out to you.',
      cta: 'Manage payments',
    }
  }
  if (account?.stripeAccountId) {
    return {
      label: 'KYC in progress',
      badgeClassName: 'bg-status-warning/30 text-status-warning',
      description: 'Finish the Stripe verification to start publishing your service offerings.',
      cta: 'Complete KYC',
    }
  }
  return {
    label: 'Not started',
    badgeClassName: 'bg-muted text-muted-foreground',
    description: 'Complete the payment KYC to publish your service offerings and get paid.',
    cta: 'Start KYC',
  }
}

/**
 * Stripe payment-KYC status for operators, with a link into the
 * service-offering drive (where the onboarding lives). Renders nothing for
 * non-operators — becoming an operator is handled by `BecomeAnOperator`.
 */
function PaymentKyc() {
  const { paymentAccountQuery, operatorDrive, hasOperatorDrive } = useOperatorPaymentAccount()

  if (!hasOperatorDrive || !operatorDrive) return null

  const account = paymentAccountQuery.data ?? null
  const { label, badgeClassName, description, cta } = kycPresentation(account)
  // Deep-link straight to the payment-account document when it exists;
  // fall back to the drive root otherwise.
  const driveHref = account
    ? driveDocumentLinkFor(operatorDrive.driveSlug, account.id)
    : driveLinkFor(operatorDrive.driveSlug)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
        <CardDescription>Stripe payment verification for selling your services.</CardDescription>
      </CardHeader>
      <CardContent>
        {paymentAccountQuery.isPending ? (
          <div className="flex flex-col gap-2 rounded-lg border p-4">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4">
            <div className="flex min-w-0 flex-col gap-1.5">
              <span
                className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClassName}`}
              >
                {label}
              </span>
              <span className="text-muted-foreground text-sm">
                {paymentAccountQuery.isError
                  ? "Couldn't load the payment status — you can still open your drive."
                  : description}
              </span>
            </div>
            <ExternalLink href={driveHref as Route}>{cta}</ExternalLink>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { PaymentKyc }
