'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { Route } from 'next'

// Matches `/services/[serviceSlug]/purchase` so we don't yank the user
// out of an in-progress service purchase flow after they log in.
function isServicePurchasePath(pathname: string): boolean {
  const segments = pathname.split('/')
  return segments[1] === 'services' && segments[3] === 'purchase'
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
  const redirected = useRef(false)

  useEffect(() => {
    if (!arrivedFromRenown || redirected.current || auth.status !== 'authorized') return
    redirected.current = true
    if (isServicePurchasePath(pathname)) return
    router.replace('/get-started' as Route)
  }, [arrivedFromRenown, auth.status, pathname, router])

  return null
}

export { PostLoginRedirect }
