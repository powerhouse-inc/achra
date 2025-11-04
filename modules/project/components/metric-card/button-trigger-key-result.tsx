'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { KeyResultsModal } from '@/modules/project/components/key-results-modal/key-results-modal'
import { Button } from '@/modules/shared/components/ui/button'

export function ButtonTriggerKeyResult() {
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
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      />
    </>
  )
}
