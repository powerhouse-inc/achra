'use client'

import { FolderGit2, FolderKanban, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useCallback } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import { WORKSTREAM_BANNER_VISIBLE_STORAGE_KEY } from '../../config/constants'

export default function WorkstreamBanner() {
  const [isVisible, setIsVisible] = useLocalStorage(WORKSTREAM_BANNER_VISIBLE_STORAGE_KEY, true, {
    deserializer(value) {
      return value !== 'false'
    },
  })

  const handleHide = useCallback(() => {
    setIsVisible(false)
  }, [setIsVisible])

  return (
    <motion.div
      className="shadow-primary relative overflow-hidden rounded-xl"
      initial={{
        opacity: 0,
        height: 0,
        marginBottom: 0,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        height: isVisible ? 'auto' : 0,
        marginBottom: isVisible ? 'calc(var(--spacing) * 8)' : 0,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
        height: { duration: 0.3, ease: 'easeInOut' },
        marginBottom: { duration: 0.3, ease: 'easeInOut' },
      }}
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className={cn(
            'bg-primary absolute size-50 rounded-full opacity-30 blur-[75px] transition-all duration-1000 ease-in-out',
            '-top-18 -right-13',
            'sm:-top-11 sm:left-[48.1%]',
            'xl:-top-11 xl:left-[59%]',
            '2xl:left-[53%]',
          )}
        />
        <div
          className={cn(
            'bg-primary absolute size-50 rounded-full opacity-50 blur-[50px] transition-all duration-1000 ease-in-out',
            '-bottom-33 -left-1',
            'lg:-bottom-40',
            'xl:-bottom-39',
          )}
        />
        <div
          className={cn(
            'bg-primary absolute hidden size-24 rounded-full blur-[50px] transition-all duration-1000 ease-in-out',
            '-top-6 -right-24',
            'sm:-top-4 sm:-right-27 sm:block',
            'md:-top-3 md:-right-22',
            '2xl:right-6',
          )}
        />

        <FolderKanban
          className={cn(
            'text-border absolute -top-4 right-1 size-24 rotate-[19deg] transition-all duration-500 ease-in-out',
            'sm:right-[15%]',
            'lg:-top-0 lg:right-[25%]',
            'xl:-top-1 xl:right-[22%]',
          )}
        />
        <FolderKanban
          className={cn(
            'text-muted-foreground/50 absolute -bottom-10 -left-4 size-39 -rotate-[19deg] transition-all duration-500 ease-in-out',
            'lg:-bottom-7 lg:-left-3',
          )}
        />
        <FolderGit2
          className={cn(
            'text-muted-foreground/50 absolute right-0 bottom-0 hidden size-32 -rotate-[15deg] transition-all duration-500 ease-in-out',
            'sm:-right-5 sm:-bottom-4 sm:block',
            'md:-right-2 md:-bottom-1',
            'lg:-right-1 lg:bottom-3',
            'xl:right-1',
          )}
        />

        <div className="border-accent bg-secondary/50 absolute inset-0 rounded-lg border-[3px] backdrop-blur-[2px] transition-all duration-300 ease-in-out" />
      </div>

      {/* content */}
      <div className="relative z-10 w-full px-4 pt-4 pb-8 sm:px-6 md:px-10 md:pt-7 md:pb-12 lg:px-16 lg:pb-10.5 xl:px-16 xl:px-26 xl:pt-7 xl:pb-9">
        <div className="flex w-full max-w-105 flex-col gap-4 md:max-w-148 md:gap-6 lg:max-w-full xl:max-w-223">
          <h1 className="text-2xl leading-[120%] font-bold lg:text-3xl">Workstreams</h1>
          <p className="font-semibold lg:text-lg lg:leading-[120%] lg:font-bold xl:text-xl">
            Find work, submit your proposal and start getting paid for your contributions
          </p>
          <p className="text-sm/5.5 xl:text-base/6">
            The Powerhouse finances section offers a complete breakdown of budget and expenditure
            data for contributor teams since the Network&apos;s launch in 2025
          </p>
        </div>
      </div>

      {/* white shadow content overlay */}
      <div className="absolute inset-0 z-10">
        <div
          className={cn(
            'bg-popover absolute -right-94 -bottom-33 size-112 rounded-full blur-[50px] transition-all duration-300 ease-in-out',
            'sm:-right-32 sm:-bottom-88',
            'lg:-right-10',
            'xl:top-32 xl:-right-7',
            '2xl:right-20 2xl:-bottom-97',
          )}
        />
        <div
          className={cn(
            'bg-popover absolute -top-25 -left-23 size-50 rounded-full blur-[50px] transition-all duration-300 ease-in-out',
            'md:-top-17 md:-left-22',
            'lg:-left-10',
          )}
        />
      </div>

      <Button variant="ghost" className="absolute top-3 right-3 z-20 h-6 w-6" onClick={handleHide}>
        <X className="text-primary" />
      </Button>
    </motion.div>
  )
}
