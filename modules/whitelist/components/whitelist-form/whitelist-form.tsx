'use client'

import { JoinedUsersBadge } from '../joined-users-badge'

export function WhitelistForm() {
  return (
    <>
      <h2 className="relative z-20 py-2 text-center font-sans text-4xl font-semibold tracking-tighter md:py-10 md:text-8xl">
        Join the Waitlist
      </h2>
      <p className="text-md text-muted-foreground mx-auto max-w-xl text-center lg:text-lg">
        Get early access to Achra, the operations marketplace for open networks. Scope work, choose
        providers, pay in stablecoins, and track results in one place.
      </p>
      <div className="relative z-20 mt-10 w-full max-w-md">
        <iframe
          src="https://paragraph.com/@powerhouse/embed?minimal=true"
          width="480"
          height="45"
          style={{ background: 'var(--background)' }}
          tabIndex={0}
          frameBorder="0"
          scrolling="no"
        />
      </div>
      <JoinedUsersBadge />
    </>
  )
}
