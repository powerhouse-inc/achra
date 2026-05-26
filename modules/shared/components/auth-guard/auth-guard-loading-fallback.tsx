import { Spinner } from '@/modules/shared/components/ui/spinner'

function AuthGuardLoadingFallback() {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <Spinner className="text-muted-foreground size-6" />
    </div>
  )
}

export { AuthGuardLoadingFallback }
