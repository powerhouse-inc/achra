'use client'

import { scrollToSection } from '@/modules/shared/components/section-activation/section-id-utils'
import { Button } from '@/modules/shared/components/ui/button'
import type { ComponentProps } from 'react'

interface ScrollToSectionButtonProps extends Omit<ComponentProps<typeof Button>, 'onClick'> {
  sectionId: string
}

function ScrollToSectionButton({
  sectionId,
  children,
  ...props
}: Readonly<ScrollToSectionButtonProps>) {
  return (
    <Button
      onClick={() => {
        scrollToSection(sectionId)
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export { ScrollToSectionButton }
