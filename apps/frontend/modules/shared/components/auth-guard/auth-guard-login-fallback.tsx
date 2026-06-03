'use client'

import { Button } from '@achra/ui/button'
import { Card, CardContent } from '@achra/ui/card'
import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { LogIn } from 'lucide-react'

function AuthGuardLoginFallback() {
  const { login } = useRenownAuth()

  return (
    <Card className="mx-auto w-full max-w-md overflow-hidden">
      <CardContent className="flex flex-col items-center gap-5 px-8 py-12 text-center">
        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
          <LogIn className="size-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">Log in to continue</h2>
          <p className="text-muted-foreground max-w-md text-sm">
            This page is private. Log in to access it.
          </p>
        </div>
        <Button onClick={login} className="min-w-44">
          Log in
        </Button>
      </CardContent>
    </Card>
  )
}

export { AuthGuardLoginFallback }
