import Image from 'next/image'
import React from 'react'
import { cn } from '@/shared/lib/utils'

interface Props {
  title: string
  icon: string
  className?: string
  code: string
}

export default function IconTitleWithCode({ icon, title, className, code }: Props) {
  return (
    <div
      data-slot="icon-title-container"
      className={cn('flex flex-row items-center gap-2 md:gap-4', className)}
    >
      <div
        data-slot="icon-wrapper"
        className={cn(
          'flex size-8 min-h-8 min-w-8 items-center justify-center overflow-hidden rounded-full',
          'bg-muted shadow-md',
          'md:size-10 md:min-h-10 md:min-w-10',
        )}
      >
        <Image
          src={icon}
          width={42}
          height={42}
          alt="Picture"
          unoptimized
          className="min-w-7 rounded-3xl md:min-w-8"
        />
      </div>
      <span
        data-slot="icon-title"
        className={cn('text-foreground m-0 text-lg/[120%] font-bold', 'md:text-xl', 'xl:text-2xl')}
      >
        <span
          data-slot="icon-title-code"
          className={cn(
            'text-foreground/50 mr-2 inline-block text-lg/[120%] font-bold',
            'md:mr-4 md:text-xl',
            'xl:text-2xl',
          )}
        >
          {code}
        </span>
        {title}
      </span>
    </div>
  )
}
