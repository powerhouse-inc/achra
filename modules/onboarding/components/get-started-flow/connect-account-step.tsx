'use client'

import { LogIn } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'

interface ConnectAccountStepProps {
  onLogin: () => void
}

function ConnectAccountStep({ onLogin }: ConnectAccountStepProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col items-center gap-5 px-8 py-12 text-center">
        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
          <LogIn className="size-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Connect your account</h1>
          <p className="text-muted-foreground max-w-md text-sm">
            Sign in with your wallet to start setting up your Achra workspace.
          </p>
        </div>
        <Button onClick={onLogin} className="min-w-44">
          Log in
        </Button>
      </CardContent>
    </Card>
  )
}

export { ConnectAccountStep }
