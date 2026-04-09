import { Phone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { OPERATIONAL_HUB_URL } from '@/shared/config/constants'

function BookCallButton() {
  return (
    <Button variant="outline" className="w-full" asChild>
      <Link href={OPERATIONAL_HUB_URL}>
        Book a Call
        <Phone className="size-4" />
      </Link>
    </Button>
  )
}

export { BookCallButton }
