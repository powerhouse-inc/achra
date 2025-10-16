import { LucideExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function ConnectLink() {
  return (
    <Link href="https://connect.achra.network" target="_blank">
      <div className="outline-border bg-primary flex items-center gap-2 rounded-xl py-[6px] pr-4 pl-2 outline-[2px]">
        <div className="relative size-10">
          <Image
            src="/networks/logos/connect-light.png"
            alt="Connect Link"
            fill
            objectFit="cover"
            className="absolute"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-[11px]/[18px] uppercase">Edit in Connect</span>
            <LucideExternalLink className="size-3" />
          </div>
          <span className="text-4 font-semibold">Sky Network Admin</span>
        </div>
      </div>
    </Link>
  )
}
