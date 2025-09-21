'use client'

import { BookX, FolderGit2, FolderKanban } from 'lucide-react'
import { motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/modules/shared/components/ui/button'
import { WORKSTREAM_BANNER_HIDDEN_STORAGE_KEY } from '../../config/constants'

export default function WorkstreamBanner() {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const storedValue = localStorage.getItem(WORKSTREAM_BANNER_HIDDEN_STORAGE_KEY)
    if (storedValue !== null) {
      setIsHidden(storedValue === 'true')
    }
  }, [])

  const handleHide = useCallback(() => {
    setIsHidden(true)
    localStorage.setItem(WORKSTREAM_BANNER_HIDDEN_STORAGE_KEY, 'true')
  }, [])

  return (
    <motion.div
      className="shadow-primary relative overflow-hidden rounded-xl"
      animate={{
        opacity: isHidden ? 0 : 1,
        height: isHidden ? 0 : 'auto',
        marginBottom: isHidden ? 0 : 'auto',
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
        height: { duration: 0.3, ease: 'easeInOut' },
        marginBottom: { duration: 0.3, ease: 'easeInOut' },
      }}
      style={{ overflow: 'hidden' }}
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="bg-primary absolute -top-11 left-[48.1%] h-50 w-50 rounded-full opacity-30 blur-[75px]" />
        <div className="bg-primary absolute -bottom-40 -left-1 size-50 rounded-full opacity-30 blur-[50px]" />
        <div className="bg-primary absolute -top-6 -right-24 size-24 rounded-full blur-[50px]" />

        <FolderKanban className="text-border absolute -top-3 right-[29%] size-24 rotate-[19deg]" />
        <FolderKanban className="text-border absolute -bottom-10 -left-4 size-39 -rotate-[19deg]" />
        <FolderGit2 className="text-border absolute right-0 bottom-0 size-32 -rotate-[15deg]" />

        <div className="border-accent absolute inset-0 rounded-lg border-[3px] bg-[rgba(244,244,244,0.50)] backdrop-blur-[2px]" />
      </div>

      {/* content */}
      <div className="relative z-10 w-full px-16 pt-7 pb-8 xl:px-26">
        <div className="flex w-full flex-col gap-6 xl:max-w-222">
          <h1 className="text-3xl font-bold">Workstreams</h1>
          <p className="text-lg font-bold">
            Find work, submit your proposal and start getting paid for your contributions
          </p>
          <p className="text-sm">
            The Powerhouse finances section offers a complete breakdown of budget and expenditure
            data for contributor teams since the Network&apos;s launch in 2025
          </p>
        </div>
      </div>

      {/* white shadow content overlay */}
      <div className="absolute inset-0 z-10">
        <div className="bg-popover absolute top-32 -right-7 size-112 rounded-full blur-[50px]" />
        <div className="bg-popover absolute -top-17 -left-10 size-50 rounded-full blur-[50px]" />
      </div>

      <Button variant="ghost" className="absolute top-3 right-3 z-20 h-6 w-6" onClick={handleHide}>
        <BookX className="text-primary" />
      </Button>
    </motion.div>
  )
}
