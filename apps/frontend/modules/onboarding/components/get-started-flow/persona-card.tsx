'use client'

import { Badge } from '@achra/ui/badge'
import { cn } from '@achra/ui/lib/utils'
import { Check } from 'lucide-react'
import type { PersonaOption } from '@/modules/onboarding/lib/personas'

interface PersonaCardProps {
  persona: PersonaOption
  selected: boolean
  onSelect: () => void
  disabled?: boolean
}

function PersonaCard({ persona, selected, onSelect, disabled }: PersonaCardProps) {
  const Icon = persona.icon
  const isDisabled = persona.disabled === true || disabled === true

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onSelect}
      className={cn(
        'group bg-card text-card-foreground relative flex flex-col gap-3 rounded-xl border p-5 text-left shadow-sm transition-all',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
        !isDisabled && 'hover:border-ring/60 cursor-pointer hover:-translate-y-0.5',
        selected && 'border-primary ring-primary/30 ring-[3px]',
        isDisabled && 'cursor-not-allowed opacity-55',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            'flex size-10 items-center justify-center rounded-lg',
            persona.iconClassName,
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
        {persona.disabled && persona.disabledLabel ? (
          <Badge variant="secondary" className="text-[10px] tracking-wider uppercase">
            {persona.disabledLabel}
          </Badge>
        ) : (
          <span
            aria-hidden="true"
            className={cn(
              'flex size-5 items-center justify-center rounded-full border transition-colors',
              selected
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-input bg-background',
            )}
          >
            {selected ? <Check className="size-3" /> : null}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="text-base font-semibold">{persona.title}</div>
        <p className="text-muted-foreground text-sm leading-snug">{persona.description}</p>
      </div>
      <div className="text-muted-foreground mt-auto text-xs">{persona.meta}</div>
    </button>
  )
}

export { PersonaCard }
