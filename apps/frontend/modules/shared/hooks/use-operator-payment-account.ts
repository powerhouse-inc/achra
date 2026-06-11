'use client'

import { useClient } from '@achra/sdk/react'
import { useQuery } from '@tanstack/react-query'
import { useOperatorDrive } from '@/modules/shared/hooks/use-operator-drive'

/**
 * Resolves the payment-account (Stripe KYC) state living in the current
 * user's operator/service-offering drive. Composes with `useOperatorDrive`
 * (same cached drives query), so for non-operators it adds no extra fetch.
 */
function useOperatorPaymentAccount() {
  const client = useClient()
  const { drivesQuery, operatorDrive, hasOperatorDrive } = useOperatorDrive()
  const driveId = operatorDrive?.driveId

  const paymentAccountQuery = useQuery({
    queryKey: ['OperatorPaymentAccount', driveId ?? ''],
    queryFn: async () => client.payments.getOperatorAccount({ driveId: driveId ?? '' }),
    enabled: Boolean(driveId),
    staleTime: 30_000,
  })

  return {
    drivesQuery,
    paymentAccountQuery,
    operatorDrive,
    hasOperatorDrive,
  }
}

export { useOperatorPaymentAccount }
