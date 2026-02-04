import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

function AboutUsSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-62" />
        <div className="flex items-center gap-2 lg:hidden">
          <Skeleton className="size-4 sm:size-13.5" />
          <Skeleton className="size-4 sm:hidden" />
          <ConnectButtonSkeleton className="hidden sm:flex" />
        </div>
      </div>
      <ConnectButtonSkeleton className="w-full sm:hidden" />
      <div className="flex flex-col gap-2">
        <Skeleton className="mb-1.5 h-5.5 w-[10%]" />
        <Skeleton className="h-3.75 w-[91%]" />
        <Skeleton className="h-3.75 w-full" />
        <Skeleton className="h-3.75 w-[97%]" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="mb-1.5 h-5.5 w-[17%]" />
        <Skeleton className="h-3.75 w-[98%]" />
        <Skeleton className="h-3.75 w-[96%]" />
        <Skeleton className="h-3.75 w-[23%]" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="mb-1.5 h-5.5 w-[57%]" />
        <Skeleton className="h-3.75 w-[90%]" />
        <Skeleton className="h-3.75 w-full" />
        <Skeleton className="h-3.75 w-[54%]" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="mb-1.5 h-5.5 w-[37%]" />
        <Skeleton className="h-3.75 w-full" />
        <Skeleton className="h-3.75 w-[95%]" />
        <Skeleton className="h-3.75 w-[66%]" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="mb-1.5 h-5.5 w-[38%]" />
        <Skeleton className="h-3.75 w-[97%]" />
        <Skeleton className="h-3.75 w-[88%]" />
      </div>
    </div>
  )
}

interface ActionsSkeletonProps {
  className?: string
}

function ConnectButtonSkeleton({ className }: ActionsSkeletonProps) {
  return (
    <div className={cn('bg-accent flex w-56.25 max-w-85 gap-6 rounded-md', className)}>
      <div className="flex items-center gap-4 py-2 pr-2 pl-4">
        <Skeleton className="bg-border size-7.5 rounded-full" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Skeleton className="bg-border h-4.5 w-24.25" />
            <Skeleton className="bg-border size-3 rounded-sm" />
          </div>
          <Skeleton className="bg-border h-4 w-38.25" />
        </div>
      </div>
    </div>
  )
}

function FinancesSkeleton({ className }: ActionsSkeletonProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Skeleton className="h-6 w-22.25" />
      <div className="bg-popover flex w-full flex-col gap-4 rounded-xl p-4 shadow-sm">
        <Skeleton className="h-5.5 w-full" />
        <div className="grid w-full grid-cols-[55%_1fr] gap-4">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="border-border bg-background relative mt-2 flex w-full gap-6 rounded-lg border p-4">
          <div className="border-popover absolute -top-2.5 left-4 h-4.5 border-x-8">
            <Skeleton className="h-4.5 w-12.5" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-4 w-10.75" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-4 w-15" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillsSkeleton() {
  return (
    <div className="bg-popover flex w-full flex-col gap-2 rounded-xl px-4 pt-2 pb-4 shadow-sm">
      <div className="flex justify-between gap-4">
        <Skeleton className="h-6 w-10" />
        <Skeleton className="size-4" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-5.5 w-44" />
        <Skeleton className="h-5.5 w-38" />
        <Skeleton className="h-5.5 w-52" />
        <Skeleton className="h-5.5 w-47" />
        <Skeleton className="h-5.5 w-38" />
        <Skeleton className="h-5.5 w-40" />
        <Skeleton className="h-5.5 w-18" />
        <Skeleton className="h-5.5 w-20" />
        <Skeleton className="h-5.5 w-14" />
        <Skeleton className="h-5.5 w-22" />
      </div>
    </div>
  )
}

function ProjectSkeleton() {
  return (
    <div className="border-border bg-popover flex w-full flex-col gap-4 rounded-xl border p-3 shadow-sm">
      <div className="flex w-full justify-between">
        <div className="flex items-end gap-1">
          <Skeleton className="h-7.5 w-30 sm:w-70" />
          <Skeleton className="h-5 w-11.25" />
        </div>
        <Skeleton className="h-9 w-20 sm:w-35.25" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[44%]" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="border-border bg-popover flex w-full flex-col gap-2 rounded-lg border px-4 py-2">
          <Skeleton className="h-4.5 w-10.5" />
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <Skeleton className="h-6 w-10.75" />
              <Skeleton className="h-6 w-8.5" />
            </div>
            <Skeleton className="h-4.5 w-10" />
          </div>
        </div>
        <div className="border-border bg-popover flex w-full flex-col gap-2 rounded-lg border px-4 py-2">
          <Skeleton className="h-4.5 w-10.5" />
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <Skeleton className="h-6 w-10.75" />
              <Skeleton className="h-6 w-8.5" />
            </div>
            <Skeleton className="h-4.5 w-10" />
          </div>
        </div>
        <div className="border-border bg-popover flex w-full flex-col gap-2 rounded-lg border px-4 py-2">
          <Skeleton className="h-4.5 w-10.5" />
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <Skeleton className="h-6 w-10.75" />
              <Skeleton className="h-6 w-8.5" />
            </div>
            <Skeleton className="h-4.5 w-10" />
          </div>
        </div>
      </div>
    </div>
  )
}

function BuilderProfileSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[65%_1fr] xl:grid-cols-[60%_1fr] 2xl:grid-cols-[65%_1fr]">
        <AboutUsSkeleton />
        <div className="flex flex-col gap-6">
          <FinancesSkeleton className="hidden lg:flex" />
          <SkillsSkeleton />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <ProjectSkeleton />
        <ProjectSkeleton />
      </div>
    </div>
  )
}

export { BuilderProfileSkeleton }
