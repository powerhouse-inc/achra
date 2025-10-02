import { type Command as CommandPrimitive, useCommandState } from 'cmdk'
import * as React from 'react'
import { cn } from '@/shared/lib/utils'

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  const render = useCommandState((state) => state.filtered.count === 0)

  if (!render) return null

  return (
    <div
      className={cn('px-2 py-4 text-center text-sm', className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  )
}

CommandEmpty.displayName = 'CommandEmpty'

export { CommandEmpty }
