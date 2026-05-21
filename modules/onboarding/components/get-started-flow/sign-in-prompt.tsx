'use client'

import { Lock } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'

interface SignInPromptProps {
  onSignIn: () => void
  isLoading?: boolean
}

function SignInPrompt({ onSignIn, isLoading }: SignInPromptProps) {
  return (
    <div className="bg-muted/40 border-border flex flex-col items-center gap-4 rounded-xl border border-dashed px-6 py-8 text-center">
      <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
        <Lock className="size-5" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Sign in to begin onboarding</h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          We&apos;ll link this Achra workspace to your Renown identity. Sign in to pick a role and
          claim your display name.
        </p>
      </div>
      <Button onClick={onSignIn} disabled={isLoading} className="min-w-44">
        Sign in with Renown
      </Button>
    </div>
  )
}

export { SignInPrompt }
