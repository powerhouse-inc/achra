'use client'

import { Spinner } from '@achra/ui/spinner'

function FullPageSpinner() {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <Spinner className="text-muted-foreground size-6" />
    </div>
  )
}

export { FullPageSpinner }
