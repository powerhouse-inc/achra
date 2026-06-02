import { NextResponse } from 'next/server'

export function proxy(request: Request) {
  const requestHeaders = new Headers(request.headers)
  // add current URL to the header for server-side url detection/redirection
  requestHeaders.set('x-url', request.url)

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: '/network/:slug/builders/:builderSlug/budget-statements',
}
