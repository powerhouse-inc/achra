'use client'

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

function Fallback() {
  return (
    <div role="alert">
      <h2>Something went wrong during rendering</h2>
    </div>
  )
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <ReactErrorBoundary FallbackComponent={Fallback}>{children}</ReactErrorBoundary>
}
