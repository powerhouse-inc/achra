import { CheckCircle2 } from 'lucide-react'
import RealisticConfetti from 'react-canvas-confetti/dist/presets/realistic'
import { JoinedUsersBadge } from '../joined-users-badge'

export function SuccessView() {
  return (
    <>
      <RealisticConfetti
        onInit={(instance) => {
          void instance.confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
        }}
      />
      <div className="relative z-20 mb-6 flex items-center justify-center">
        <CheckCircle2 className="text-primary animate-in zoom-in-50 size-16 duration-300 md:size-20" />
      </div>
      <h2 className="relative z-20 py-2 text-center font-sans text-4xl font-semibold tracking-tighter md:py-10 md:text-7xl">
        You&apos;re on the list!
      </h2>
      <p className="text-md text-muted-foreground mx-auto max-w-xl text-center lg:text-lg">
        Thank you for joining our waitlist. We&apos;ll notify you as soon as we launch. Stay tuned
        for updates!
      </p>
      <JoinedUsersBadge count={100} />
    </>
  )
}
