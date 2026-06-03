'use client'

import { Spinner } from '@/modules/shared/components/ui/spinner'

function FullPageSpinner() {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <Spinner className="text-muted-foreground size-6" />
    </div>
  )
}

export { FullPageSpinner }
