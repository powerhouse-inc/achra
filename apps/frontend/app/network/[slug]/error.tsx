'use client'

import { GenericError } from '@/modules/shared/components/generic-error'

export default function NetworkError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <GenericError error={error} reset={reset} />
}
