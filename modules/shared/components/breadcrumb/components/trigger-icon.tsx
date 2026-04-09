import { EllipsisIcon } from 'lucide-react'

export function TriggerIcon({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label="Open breadcrumb menu"
      className={`hover:bg-accent text-foreground flex cursor-pointer items-center justify-center rounded-lg bg-transparent px-1 px-2 py-1 hover:px-2 hover:py-1 sm:bg-transparent ${className}`}
      {...props}
    >
      <EllipsisIcon size={16} />
    </button>
  )
}
