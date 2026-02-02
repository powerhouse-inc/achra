import React from 'react'

interface PageBackgroundProps {
  children: React.ReactNode
  /** @deprecated className is no longer used - background is now in layout */
  className?: string
  /** @deprecated as is no longer used - background is now in layout */
  as?: React.ElementType
}

/**
 * @deprecated The background gradient is now rendered in the (achra) layout.
 * This component is kept for backwards compatibility but can be safely removed.
 * Just use the children directly without wrapping in PageBackground.
 */
export function PageBackground({ children }: Readonly<PageBackgroundProps>) {
  return <>{children}</>
}
