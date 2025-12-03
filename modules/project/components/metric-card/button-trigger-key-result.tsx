'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import type { ScopeOfWork_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { KeyResultsModal } from '@/modules/project/components/key-results-modal/key-results-modal'
import { Button } from '@/modules/shared/components/ui/button'

interface ButtonTriggerKeyResultProps {
  deliverables: ScopeOfWork_Deliverable[]
}

export function ButtonTriggerKeyResult({ deliverables }: ButtonTriggerKeyResultProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        aria-label="View key results"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(true)
        }}
      >
        <ArrowRight className="size-4" />
      </Button>

      <KeyResultsModal
        deliverables={deliverables}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      />
    </>
  )
}
