'use client'

import { useRenownAuth } from '@powerhousedao/reactor-browser'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { Route } from 'next'

function PostLoginRedirect() {
  const auth = useRenownAuth()
  const router = useRouter()
  // Captured once at first render — before the Renown SDK's effect strips
  // `?user=<DID>` from the URL. Its presence is the intrinsic signal that this
  // page load came from a Renown OAuth round-trip (vs. a session restored on
  // a plain page load).
  const [arrivedFromRenown] = useState(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('user'),
  )
  const redirected = useRef(false)

  useEffect(() => {
    if (!arrivedFromRenown || redirected.current) return
    if (auth.status !== 'authorized') return
    redirected.current = true
    router.replace('/get-started' as Route)
  }, [arrivedFromRenown, auth.status, router])

  return null
}

export { PostLoginRedirect }
