import { EllipsisIcon } from 'lucide-react'

export function TriggerIcon({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`sm:bg-accent flex cursor-pointer items-center justify-center rounded-lg bg-transparent px-1 ${className}`}
      {...props}
    >
      <EllipsisIcon />
    </div>
  )
}
