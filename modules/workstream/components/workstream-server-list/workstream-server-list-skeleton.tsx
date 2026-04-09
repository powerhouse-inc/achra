import type { HTMLAttributes } from 'react'

function WorkstreamServerListSkeleton({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex flex-col gap-8" {...props}>
      {children}
    </div>
  )
}

export { WorkstreamServerListSkeleton }
