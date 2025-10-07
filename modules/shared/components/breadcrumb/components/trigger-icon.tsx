import { EllipsisIcon } from 'lucide-react'

export function TriggerIcon({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`hover:bg-accent text-accent-foreground flex cursor-pointer items-center justify-center rounded-lg bg-transparent px-1 sm:bg-transparent ${className}`}
      {...props}
    >
      <EllipsisIcon />
    </div>
  )
}
