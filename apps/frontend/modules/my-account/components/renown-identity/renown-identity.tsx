'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@achra/ui/avatar'
import { useRenownAuth } from '@powerhousedao/reactor-browser'
import {
  CopyAnimatedIcon,
  CopyButton,
  CopyTrigger,
} from '@/modules/shared/components/copy-button/copy-button'
import { ExternalLink } from '@/modules/shared/components/external-link/external-link'
import { Identicon } from '@/modules/shared/components/identicon/identicon'
import { RenownIsotype } from '@/modules/shared/components/svgs'

function RenownIdentity() {
  const auth = useRenownAuth()

  if (auth.status !== 'authorized' || !auth.address) {
    return null
  }

  const address = auth.address
  const displayAddress = auth.displayAddress ?? address

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage
            src={auth.avatarUrl}
            alt={auth.displayName ?? displayAddress}
            className="object-cover"
          />
          <AvatarFallback className="bg-transparent">
            <Identicon value={address} className="size-full" />
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-col gap-0.5">
          {auth.displayName && <span className="truncate font-medium">{auth.displayName}</span>}
          <CopyButton value={address}>
            <span className="text-muted-foreground flex items-center gap-1 font-mono text-sm">
              {displayAddress}
              <CopyTrigger className="text-muted-foreground hover:text-accent-foreground">
                <CopyAnimatedIcon />
              </CopyTrigger>
            </span>
          </CopyButton>
        </div>
      </div>
      <ExternalLink href={`https://renown.id/profile/${address}`}>
        <RenownIsotype className="size-4" />
        Renown Profile
      </ExternalLink>
    </div>
  )
}

export { RenownIdentity }
