'use client'

import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useSpinUpDrive } from '@/modules/onboarding/hooks/use-spin-up-drive'
import { Card, CardContent } from '@/modules/shared/components/ui/card'

interface SpinUpStepProps {
  onSuccess: () => void
}

function SpinUpStep({ onSuccess }: SpinUpStepProps) {
  const { mutate, isIdle, isSuccess } = useSpinUpDrive()

  useEffect(() => {
    if (isIdle) mutate()
  }, [isIdle, mutate])

  useEffect(() => {
    if (isSuccess) onSuccess()
  }, [isSuccess, onSuccess])

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col items-center gap-5 px-8 py-12 text-center">
        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">Spinning up your drive</h2>
          <p className="text-muted-foreground max-w-md text-sm">
            Hang tight — this takes just a few seconds.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export { SpinUpStep }
