function MetricCardSkeleton() {
  return (
    <div className="border-border bg-card w-full max-w-sm rounded-lg border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="bg-muted mb-2 h-4 w-24 animate-pulse rounded" />
          <div className="space-y-2">
            <div className="bg-muted h-8 w-32 animate-pulse rounded" />
          </div>
        </div>
        <div className="bg-muted h-10 w-10 animate-pulse rounded" />
      </div>
    </div>
  )
}

export { MetricCardSkeleton }
