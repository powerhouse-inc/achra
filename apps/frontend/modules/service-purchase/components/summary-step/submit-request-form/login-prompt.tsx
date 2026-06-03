'use client'

import { Button } from '@achra/ui/button'
import { Card, CardContent } from '@achra/ui/card'
import { LogIn } from 'lucide-react'

interface LoginPromptProps {
  onLogin: () => void
}

function LoginPrompt({ onLogin }: LoginPromptProps) {
  return (
    <Card className="mx-auto w-full max-w-218.5 border-none py-0! lg:mx-0 lg:max-w-none">
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center lg:p-8">
        <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
          <LogIn className="text-primary size-6" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-foreground text-base font-semibold lg:text-lg">Log in to continue</h3>
          <p className="text-muted-foreground text-sm">
            Please log in to continue with your service purchase.
          </p>
        </div>
        <Button onClick={onLogin} className="w-full">
          <LogIn className="size-4" aria-hidden="true" />
          Log in
        </Button>
      </CardContent>
    </Card>
  )
}

export { LoginPrompt }
