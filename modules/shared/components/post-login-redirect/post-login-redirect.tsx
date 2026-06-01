'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useHasBuilderDrive } from '@/modules/my-account/hooks/use-has-builder-drive'
import type { Route } from 'next'

// Paths where we keep the user where they are after login instead of sending
// them to onboarding — they either arrived intentionally (account pages) or are
// mid-flow (service purchase). Add new exempt routes here.
function isRedirectExemptPath(pathname: string): boolean {
  const segments = pathname.split('/')
  const section = segments[1]

  // `/my-account` and its sub-routes (e.g. login via the account AuthGuard).
  if (section === 'my-account') return true

  // `/services/[serviceSlug]/purchase` — an in-progress purchase flow.
  if (section === 'services' && segments[3] === 'purchase') return true

  return false
}

function PostLoginRedirect() {
  const auth = useRenownAuth()
  const router = useRouter()
  const pathname = usePathname()
  // Captured once at first render — before the Renown SDK's effect strips
  // `?user=<DID>` from the URL. Its presence is the intrinsic signal that this
  // page load came from a Renown OAuth round-trip (vs. a session restored on
  // a plain page load).
  const [arrivedFromRenown] = useState(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('user'),
  )
  const handled = useRef(false)
  const hasBuilderDriveQuery = useHasBuilderDrive()

  useEffect(() => {
    if (!arrivedFromRenown || handled.current) return
    if (auth.status !== 'authorized') return
    if (hasBuilderDriveQuery.isPending) return
    handled.current = true
    if (isRedirectExemptPath(pathname)) return
    if (hasBuilderDriveQuery.data) return
    router.replace('/get-started' as Route)
  }, [
    arrivedFromRenown,
    auth.status,
    hasBuilderDriveQuery.isPending,
    hasBuilderDriveQuery.data,
    pathname,
    router,
  ])

  return null
}

export { PostLoginRedirect }
